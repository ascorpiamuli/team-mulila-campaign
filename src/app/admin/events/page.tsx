"use client";

import { useState, useEffect } from "react";
import {
  Plus, Edit, Trash2, Calendar, Clock, MapPin, Users,
  Search, X, CheckCircle, AlertCircle, RefreshCw,
  Mail, Phone, Download, UserPlus, Activity, Send,
  MessageSquare, Eye, Filter, ChevronDown, Loader2,
  Bell, Smartphone, Globe, Clock as ClockIcon
} from "lucide-react";
import { supabase } from '../../../../lib/supabase/client';
import { useToast } from '../../../hooks/useToast';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  type: string;
  expected_attendees?: number;
  status?: string;
  image_url?: string;
  registration_link?: string;
  created_at?: string;
}

interface EventRegistration {
  id: string;
  event_id: string;
  full_name: string;
  email: string;
  phone: string;
  constituency: string;
  registered_at: string;
  attended: boolean;
  ip_address?: string;
  user_agent?: string;
}

interface MessageLog {
  id: string;
  event_id: string;
  event_title: string;
  subject: string;
  message: string;
  recipients_count: number;
  email_success: number;
  email_failed: number;
  sms_sent: boolean;
  sms_success: number;
  sms_failed: number;
  status: string;
  sent_at: string;
  completed_at: string | null;
}

export default function AdminEvents() {
  const { showToast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [messageLogs, setMessageLogs] = useState<MessageLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showRegistrationsModal, setShowRegistrationsModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showLogsModal, setShowLogsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedEventRegistrations, setSelectedEventRegistrations] = useState<EventRegistration[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<Partial<Event>>({
    title: "",
    date: "",
    time: "",
    venue: "",
    description: "",
    type: "Rally",
    expected_attendees: 0,
    status: "upcoming",
    image_url: "",
    registration_link: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [messageData, setMessageData] = useState({
    subject: "",
    message: "",
    sendTo: "all" as "all" | "selected",
    sendSMS: true
  });
  const [selectedRegistrations, setSelectedRegistrations] = useState<string[]>([]);
  const [messageResult, setMessageResult] = useState<any>(null);

  const eventTypes = ["Rally", "Summit", "Meeting", "Forum", "Workshop", "Conference"];
  const eventStatuses = ["upcoming", "ongoing", "completed", "cancelled"];

  useEffect(() => {
    fetchEvents();
    fetchRegistrations();
    fetchMessageLogs();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("campaign_events")
        .select("*")
        .order("date", { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
      showToast("Failed to load events", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRegistrations = async () => {
    try {
      const { data, error } = await supabase
        .from("event_registrations")
        .select("*")
        .order("registered_at", { ascending: false });

      if (error) throw error;
      setRegistrations(data || []);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  };

  const fetchMessageLogs = async () => {
    try {
      const { data, error } = await supabase
        .from("event_message_logs")
        .select("*")
        .order("sent_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      setMessageLogs(data || []);
    } catch (error) {
      console.error("Error fetching message logs:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const eventData = {
        title: formData.title,
        date: formData.date,
        time: formData.time,
        venue: formData.venue,
        description: formData.description,
        type: formData.type,
        expected_attendees: formData.expected_attendees || 0,
        status: formData.status || "upcoming",
        image_url: formData.image_url || null,
        registration_link: formData.registration_link || null
      };

      if (editingEvent) {
        const { error } = await supabase
          .from("campaign_events")
          .update(eventData)
          .eq("id", editingEvent.id);

        if (error) throw error;
        showToast("Event updated successfully!", "success");
      } else {
        const { error } = await supabase
          .from("campaign_events")
          .insert([eventData]);

        if (error) throw error;
        showToast("Event created successfully!", "success");
      }

      await fetchEvents();
      setShowModal(false);
      setEditingEvent(null);
      resetForm();

    } catch (error: any) {
      console.error("Error saving event:", error);
      showToast(error.message || "Failed to save event", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (event: Event) => {
    if (!confirm(`Are you sure you want to delete "${event.title}"? This will also delete all registrations.`)) return;

    try {
      await supabase.from("event_registrations").delete().eq("event_id", event.id);
      const { error } = await supabase.from("campaign_events").delete().eq("id", event.id);

      if (error) throw error;

      showToast("Event deleted successfully!", "success");
      await fetchEvents();
      await fetchRegistrations();
    } catch (error) {
      console.error("Error deleting event:", error);
      showToast("Failed to delete event", "error");
    }
  };

  const handleDeleteRegistration = async (registrationId: string, eventId: string) => {
    if (!confirm("Are you sure you want to remove this registration?")) return;

    try {
      const { error } = await supabase
        .from("event_registrations")
        .delete()
        .eq("id", registrationId);

      if (error) throw error;

      showToast("Registration removed successfully!", "success");
      await fetchRegistrations();

      if (selectedEvent && selectedEvent.id === eventId) {
        const updated = registrations.filter(r => r.event_id === eventId);
        setSelectedEventRegistrations(updated);
      }
    } catch (error) {
      console.error("Error deleting registration:", error);
      showToast("Failed to remove registration", "error");
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      venue: event.venue,
      description: event.description,
      type: event.type,
      expected_attendees: event.expected_attendees || 0,
      status: event.status || "upcoming",
      image_url: event.image_url || "",
      registration_link: event.registration_link || ""
    });
    setShowModal(true);
  };

  const viewRegistrations = (event: Event) => {
    const eventRegistrations = registrations.filter(r => r.event_id === event.id);
    setSelectedEvent(event);
    setSelectedEventRegistrations(eventRegistrations);
    setSelectedRegistrations([]);
    setMessageResult(null);
    setShowRegistrationsModal(true);
  };

  const openMessageModal = (event: Event) => {
    setSelectedEvent(event);
    const eventRegistrations = registrations.filter(r => r.event_id === event.id);
    setSelectedEventRegistrations(eventRegistrations);
    setMessageData({
      subject: `Update: ${event.title}`,
      message: "",
      sendTo: "all",
      sendSMS: true
    });
    setSelectedRegistrations([]);
    setMessageResult(null);
    setShowMessageModal(true);
  };

  const handleSendMessage = async () => {
    if (!messageData.message.trim()) {
      showToast("Please enter a message", "error");
      return;
    }

    if (!messageData.subject.trim()) {
      showToast("Please enter a subject", "error");
      return;
    }

    let recipients = selectedEventRegistrations;
    if (messageData.sendTo === "selected" && selectedRegistrations.length > 0) {
      recipients = selectedEventRegistrations.filter(r => selectedRegistrations.includes(r.id));
    }

    if (recipients.length === 0) {
      showToast("No recipients selected", "error");
      return;
    }

    setIsSendingMessage(true);
    setMessageResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('send-event-messages', {
        body: JSON.stringify({
          eventId: selectedEvent?.id,
          eventTitle: selectedEvent?.title,
          subject: messageData.subject,
          message: messageData.message,
          recipients: recipients.map(r => ({
            email: r.email,
            name: r.full_name,
            phone: r.phone
          })),
          sendSMS: messageData.sendSMS
        })
      });

      if (error) throw error;

      // Store the result for display
      setMessageResult(data);

      // Show success message based on response
      if (data.success) {
        const emailCount = data.data?.email?.success || 0;
        const smsCount = data.data?.sms?.success || 0;
        let successMsg = `✅ Email sent to ${emailCount} recipients`;
        if (messageData.sendSMS) {
          successMsg += `, SMS notifications sent to ${smsCount} recipients`;
        }
        showToast(successMsg, "success");

        // Refresh message logs
        await fetchMessageLogs();

        setTimeout(() => {
          setShowMessageModal(false);
          setMessageData({ subject: "", message: "", sendTo: "all", sendSMS: true });
          setSelectedRegistrations([]);
          setMessageResult(null);
        }, 2000);
      } else {
        showToast(data.message || "Failed to send messages", "error");
      }
    } catch (error) {
      console.error("Error sending messages:", error);
      showToast("Failed to send messages. Please try again.", "error");
    } finally {
      setIsSendingMessage(false);
    }
  };

  const toggleRegistrationSelection = (id: string) => {
    setSelectedRegistrations(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const toggleAllRegistrations = () => {
    if (selectedRegistrations.length === selectedEventRegistrations.length) {
      setSelectedRegistrations([]);
    } else {
      setSelectedRegistrations(selectedEventRegistrations.map(r => r.id));
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      time: "",
      venue: "",
      description: "",
      type: "Rally",
      expected_attendees: 0,
      status: "upcoming",
      image_url: "",
      registration_link: ""
    });
    setEditingEvent(null);
  };

  const exportRegistrationsToCSV = (event: Event) => {
    const eventRegistrations = registrations.filter(r => r.event_id === event.id);
    const headers = ["Name", "Email", "Phone", "Constituency", "Registered Date", "Attended"];
    const rows = eventRegistrations.map(r => [
      r.full_name,
      r.email,
      r.phone,
      r.constituency,
      new Date(r.registered_at).toLocaleDateString(),
      r.attended ? "Yes" : "No"
    ]);
    const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.title}_registrations_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Exported successfully!", "success");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "ongoing": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "completed": return "bg-gray-500/10 text-gray-400 border-gray-500/20";
      case "cancelled": return "bg-red-500/10 text-red-400 border-red-500/20";
      default: return "bg-gold/10 text-gold border-gold/20";
    }
  };

  const getRegistrationCount = (eventId: string) => {
    return registrations.filter(r => r.event_id === eventId).length;
  };

  const getMessageStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">✅ Completed</span>;
      case 'processing':
        return <span className="px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs animate-pulse">⏳ Processing...</span>;
      case 'pending':
        return <span className="px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs">📝 Pending</span>;
      case 'partial':
        return <span className="px-2 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs">⚠️ Partial</span>;
      default:
        return <span className="px-2 py-1 rounded-full bg-gray-500/10 text-gray-400 text-xs">Unknown</span>;
    }
  };

  const filteredEvents = events.filter(event =>
    event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.venue?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-montserrat text-2xl font-bold text-gold">Events Management</h1>
          <p className="text-text-dim text-sm mt-1">Create, edit, and manage campaign events with attendee tracking</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => { fetchEvents(); fetchRegistrations(); fetchMessageLogs(); }}
            className="p-2 rounded-lg border border-gold/20 text-text-dim hover:text-gold hover:bg-gold/10 transition-colors"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
          <button
            onClick={() => setShowLogsModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gold/20 text-gold hover:bg-gold/10 transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            Message Logs
          </button>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-gold to-gold-light text-bg-dark font-semibold hover:shadow-lg transition-all"
          >
            <Plus className="h-4 w-4" />
            Add Event
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-dim" />
        <input
          type="text"
          placeholder="Search events by title, venue, or type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light placeholder:text-text-dim focus:border-gold focus:outline-none"
        />
      </div>

      {/* Events Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold mx-auto mb-4"></div>
            <p className="text-text-dim">Loading events...</p>
          </div>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-12 bg-bg-card/50 rounded-xl border border-gold/20">
          <Calendar className="h-12 w-12 text-text-dim mx-auto mb-3" />
          <p className="text-text-dim">No events found</p>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="mt-3 text-gold hover:underline"
          >
            Create your first event
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const registrationCount = getRegistrationCount(event.id);
            const isExpanded = expandedEvent === event.id;

            return (
              <div key={event.id} className="bg-bg-card/50 rounded-xl border border-gold/20 overflow-hidden hover:border-gold/40 transition-all duration-300 group">
                {/* Event Image */}
                <div className="h-32 bg-gradient-to-r from-gold/20 to-gold/10 flex items-center justify-center relative">
                  {event.image_url ? (
                    <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <Calendar className="h-8 w-8 text-gold/50 mx-auto" />
                      <p className="text-xs text-text-dim mt-1">No image</p>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(event.status || "upcoming")}`}>
                      {event.status || "upcoming"}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-2 py-1 rounded-full bg-gold/10 text-gold text-xs font-semibold">
                      {event.type}
                    </span>
                    <button
                      onClick={() => viewRegistrations(event)}
                      className="flex items-center gap-1 text-xs text-gold hover:underline"
                    >
                      <Users className="h-3 w-3" />
                      {registrationCount} registered
                    </button>
                  </div>

                  <h3 className="font-montserrat text-lg font-bold text-text-light mb-2 line-clamp-1">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm text-text-dim">
                      <Calendar className="h-4 w-4 text-gold" />
                      <span>{new Date(event.date).toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-dim">
                      <Clock className="h-4 w-4 text-gold" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-dim">
                      <MapPin className="h-4 w-4 text-gold" />
                      <span className="line-clamp-1">{event.venue}</span>
                    </div>
                    {event.expected_attendees && event.expected_attendees > 0 && (
                      <div className="flex items-center gap-2 text-sm text-text-dim">
                        <Users className="h-4 w-4 text-gold" />
                        <span>{event.expected_attendees.toLocaleString()} expected</span>
                      </div>
                    )}
                  </div>

                  <p className={`text-text-dim text-sm mb-3 ${isExpanded ? '' : 'line-clamp-2'}`}>
                    {event.description}
                  </p>

                  {event.description && event.description.length > 100 && (
                    <button
                      onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                      className="text-xs text-gold hover:underline mb-3"
                    >
                      {isExpanded ? 'Show less' : 'Read more'}
                    </button>
                  )}

                  <div className="flex gap-2 pt-3 border-t border-gold/20">
                    <button
                      onClick={() => viewRegistrations(event)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-gold/20 text-gold hover:bg-gold/10 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      View ({registrationCount})
                    </button>
                    <button
                      onClick={() => handleEdit(event)}
                      className="px-3 py-2 rounded-lg border border-gold/20 text-gold hover:bg-gold/10 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(event)}
                      className="px-3 py-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Registrations Modal */}
      {showRegistrationsModal && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden bg-bg-card rounded-2xl border border-gold/30 shadow-2xl">
            <div className="sticky top-0 bg-bg-card border-b border-gold/20 p-4 flex flex-wrap justify-between items-center gap-2">
              <div>
                <h2 className="font-montserrat text-xl font-bold text-gold">Event Registrations</h2>
                <p className="text-text-dim text-sm">{selectedEvent.title} - {selectedEventRegistrations.length} registrations</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setShowRegistrationsModal(false);
                    openMessageModal(selectedEvent);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold/20 text-gold hover:bg-gold/30 transition-colors"
                >
                  <Send className="h-4 w-4" />
                  Message All
                </button>
                <button
                  onClick={() => exportRegistrationsToCSV(selectedEvent)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gold/20 text-gold hover:bg-gold/10 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </button>
                <button
                  onClick={() => setShowRegistrationsModal(false)}
                  className="p-2 rounded-full hover:bg-gold/10 transition-colors"
                >
                  <X className="h-5 w-5 text-text-dim" />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-4">
              {selectedEventRegistrations.length === 0 ? (
                <div className="text-center py-12">
                  <UserPlus className="h-12 w-12 text-text-dim mx-auto mb-3" />
                  <p className="text-text-dim">No registrations yet for this event</p>
                  <p className="text-text-dim text-sm mt-2">When users register, they will appear here</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gold/10 sticky top-0">
                      <tr>
                        <th className="p-3 text-left text-sm font-semibold text-gold">#</th>
                        <th className="p-3 text-left text-sm font-semibold text-gold">Name</th>
                        <th className="p-3 text-left text-sm font-semibold text-gold">Contact</th>
                        <th className="p-3 text-left text-sm font-semibold text-gold">Constituency</th>
                        <th className="p-3 text-left text-sm font-semibold text-gold">Registered</th>
                        <th className="p-3 text-left text-sm font-semibold text-gold">Status</th>
                        <th className="p-3 text-left text-sm font-semibold text-gold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedEventRegistrations.map((reg, index) => (
                        <tr key={reg.id} className="border-t border-gold/10 hover:bg-gold/5 transition-colors">
                          <td className="p-3 text-text-dim text-sm">{index + 1}</td>
                          <td className="p-3 text-text-light font-medium">{reg.full_name}</td>
                          <td className="p-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 text-text-dim text-xs">
                                <Mail className="h-3 w-3" />
                                <a href={`mailto:${reg.email}`} className="hover:text-gold transition-colors">{reg.email}</a>
                              </div>
                              <div className="flex items-center gap-1 text-text-dim text-xs">
                                <Phone className="h-3 w-3" />
                                <a href={`tel:${reg.phone}`} className="hover:text-gold transition-colors">{reg.phone}</a>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-text-dim">{reg.constituency}</td>
                          <td className="p-3 text-text-dim text-sm">
                            {new Date(reg.registered_at).toLocaleDateString()}
                            <br />
                            <span className="text-[10px] text-text-dim/50">
                              {new Date(reg.registered_at).toLocaleTimeString()}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${reg.attended ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                              <Activity className="h-3 w-3" />
                              {reg.attended ? 'Attended' : 'Registered'}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  window.location.href = `mailto:${reg.email}?subject=Event Update: ${selectedEvent.title}`;
                                }}
                                className="text-gold hover:text-gold/70 transition-colors"
                                title="Send email"
                              >
                                <Mail className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteRegistration(reg.id, selectedEvent.id)}
                                className="text-red-400 hover:text-red-300 transition-colors"
                                title="Remove registration"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-bg-card rounded-2xl border border-gold/30 shadow-2xl">
            <div className="sticky top-0 bg-bg-card border-b border-gold/20 p-4 flex justify-between items-center">
              <div>
                <h2 className="font-montserrat text-xl font-bold text-gold">Send Message</h2>
                <p className="text-text-dim text-sm">To: {selectedEvent.title} - {selectedEventRegistrations.length} registrants</p>
              </div>
              <button
                onClick={() => setShowMessageModal(false)}
                className="p-2 rounded-full hover:bg-gold/10 transition-colors"
              >
                <X className="h-5 w-5 text-text-dim" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6 space-y-4">
              {/* Message Result Display */}
              {messageResult && (
                <div className={`p-4 rounded-lg ${messageResult.success ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                  <h4 className="font-semibold text-text-light mb-2">Message Status</h4>
                  <div className="space-y-1 text-sm">
                    <p className="text-text-dim">📧 Emails: <span className="text-text-light">{messageResult.data?.email?.success || 0} sent, {messageResult.data?.email?.failed || 0} failed</span></p>
                    {messageData.sendSMS && (
                      <p className="text-text-dim">📱 SMS: <span className="text-text-light">{messageResult.data?.sms?.success || 0} sent, {messageResult.data?.sms?.failed || 0} failed</span></p>
                    )}
                    {messageResult.data?.email?.successRate !== undefined && (
                      <p className="text-text-dim">📊 Success Rate: <span className={`font-semibold ${messageResult.data.email.successRate >= 90 ? 'text-green-400' : messageResult.data.email.successRate >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>{messageResult.data.email.successRate}%</span></p>
                    )}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gold mb-1">Subject *</label>
                <input
                  type="text"
                  value={messageData.subject}
                  onChange={(e) => setMessageData(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Event subject line"
                  className="w-full px-4 py-2 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light focus:border-gold focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold mb-1">Message *</label>
                <textarea
                  value={messageData.message}
                  onChange={(e) => setMessageData(prev => ({ ...prev, message: e.target.value }))}
                  rows={6}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-2 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light focus:border-gold focus:outline-none resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold mb-1">Send To</label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 text-text-light">
                    <input
                      type="radio"
                      value="all"
                      checked={messageData.sendTo === "all"}
                      onChange={(e) => setMessageData(prev => ({ ...prev, sendTo: "all" as const }))}
                      className="text-gold focus:ring-gold"
                    />
                    All Registrants ({selectedEventRegistrations.length})
                  </label>
                  <label className="flex items-center gap-2 text-text-light">
                    <input
                      type="radio"
                      value="selected"
                      checked={messageData.sendTo === "selected"}
                      onChange={(e) => setMessageData(prev => ({ ...prev, sendTo: "selected" as const }))}
                      className="text-gold focus:ring-gold"
                    />
                    Selected ({selectedRegistrations.length})
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold mb-1">SMS Notification</label>
                <label className="flex items-center gap-2 text-text-light">
                  <input
                    type="checkbox"
                    checked={messageData.sendSMS}
                    onChange={(e) => setMessageData(prev => ({ ...prev, sendSMS: e.target.checked }))}
                    className="text-gold focus:ring-gold rounded"
                  />
                  <span>Send SMS notification to tell recipients to check their email</span>
                </label>
                <p className="text-[10px] text-text-dim mt-1">📱 Recipients will receive a short SMS: "Check your email for important event updates"</p>
              </div>

              {messageData.sendTo === "selected" && selectedEventRegistrations.length > 0 && (
                <div className="max-h-48 overflow-y-auto border border-gold/20 rounded-lg p-2">
                  <button
                    onClick={toggleAllRegistrations}
                    className="text-xs text-gold hover:underline mb-2"
                  >
                    {selectedRegistrations.length === selectedEventRegistrations.length ? 'Deselect All' : 'Select All'}
                  </button>
                  {selectedEventRegistrations.map(reg => (
                    <label key={reg.id} className="flex items-center gap-2 p-2 hover:bg-gold/5 rounded transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedRegistrations.includes(reg.id)}
                        onChange={() => toggleRegistrationSelection(reg.id)}
                        className="text-gold focus:ring-gold"
                      />
                      <span className="text-text-light text-sm">{reg.full_name}</span>
                      <span className="text-text-dim text-xs ml-auto">{reg.email}</span>
                    </label>
                  ))}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSendMessage}
                  disabled={isSendingMessage}
                  className="flex-1 py-3 rounded-lg bg-gradient-to-r from-gold to-gold-light text-bg-dark font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSendingMessage ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Messages
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="px-6 py-3 rounded-lg border border-gold/20 text-text-dim hover:bg-gold/10 transition-colors"
                >
                  Cancel
                </button>
              </div>

              <p className="text-center text-[10px] text-text-dim">
                ✉️ Emails will be sent with full message content.<br />
                📱 SMS will only notify recipients to check their email.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Message Logs Modal */}
      {showLogsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-bg-card rounded-2xl border border-gold/30 shadow-2xl">
            <div className="sticky top-0 bg-bg-card border-b border-gold/20 p-4 flex justify-between items-center">
              <div>
                <h2 className="font-montserrat text-xl font-bold text-gold">Message Logs</h2>
                <p className="text-text-dim text-sm">Recent message history</p>
              </div>
              <button
                onClick={() => setShowLogsModal(false)}
                className="p-2 rounded-full hover:bg-gold/10 transition-colors"
              >
                <X className="h-5 w-5 text-text-dim" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-4">
              {messageLogs.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-text-dim mx-auto mb-3" />
                  <p className="text-text-dim">No message logs yet</p>
                  <p className="text-text-dim text-sm mt-2">Messages sent to event registrants will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messageLogs.map((log) => (
                    <div key={log.id} className="bg-bg-dark/50 rounded-lg border border-gold/10 p-4 hover:border-gold/30 transition-colors">
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <div>
                          <h4 className="font-semibold text-text-light">{log.event_title}</h4>
                          <p className="text-sm text-text-dim">{log.subject}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getMessageStatusBadge(log.status)}
                          <span className="text-xs text-text-dim/50">
                            {new Date(log.sent_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-4 text-xs text-text-dim">
                        <span>👥 {log.recipients_count} recipients</span>
                        <span>📧 {log.email_success} sent, {log.email_failed} failed</span>
                        {log.sms_sent && (
                          <span>📱 {log.sms_success} SMS sent, {log.sms_failed} failed</span>
                        )}
                        {log.completed_at && (
                          <span>✅ Completed: {new Date(log.completed_at).toLocaleString()}</span>
                        )}
                      </div>
                      <div className="mt-2">
                        <button
                          onClick={() => {
                            // Show full message
                            alert(`Subject: ${log.subject}\n\nMessage:\n${log.message}`);
                          }}
                          className="text-xs text-gold hover:underline"
                        >
                          View Message
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Event Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-bg-card rounded-2xl border border-gold/30 shadow-2xl">
            <div className="sticky top-0 bg-bg-card border-b border-gold/20 p-4 flex justify-between items-center">
              <h2 className="font-montserrat text-xl font-bold text-gold">
                {editingEvent ? "Edit Event" : "Create New Event"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="p-2 rounded-full hover:bg-gold/10 transition-colors"
              >
                <X className="h-5 w-5 text-text-dim" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gold mb-1">Event Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Kitui Central Mega Rally"
                  className="w-full px-4 py-2 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light focus:border-gold focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gold mb-1">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light focus:border-gold focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gold mb-1">Time *</label>
                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    placeholder="e.g., 10:00 AM - 4:00 PM"
                    className="w-full px-4 py-2 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light focus:border-gold focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold mb-1">Venue *</label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  placeholder="e.g., Kitui Stadium, Kitui Town"
                  className="w-full px-4 py-2 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light focus:border-gold focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold mb-1">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Event description..."
                  className="w-full px-4 py-2 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light focus:border-gold focus:outline-none resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gold mb-1">Event Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light focus:border-gold focus:outline-none"
                  >
                    {eventTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gold mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light focus:border-gold focus:outline-none"
                  >
                    {eventStatuses.map(status => (
                      <option key={status} value={status}>{status.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gold mb-1">Expected Attendees</label>
                  <input
                    type="number"
                    name="expected_attendees"
                    value={formData.expected_attendees}
                    onChange={handleInputChange}
                    placeholder="e.g., 5000"
                    className="w-full px-4 py-2 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gold mb-1">Image URL</label>
                  <input
                    type="url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold mb-1">Registration Link</label>
                <input
                  type="url"
                  name="registration_link"
                  value={formData.registration_link}
                  onChange={handleInputChange}
                  placeholder="https://example.com/register"
                  className="w-full px-4 py-2 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light focus:border-gold focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-lg bg-gradient-to-r from-gold to-gold-light text-bg-dark font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : (editingEvent ? "Update Event" : "Create Event")}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-6 py-3 rounded-lg border border-gold/20 text-text-dim hover:bg-gold/10 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
