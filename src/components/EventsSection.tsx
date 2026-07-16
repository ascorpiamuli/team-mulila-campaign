"use client";

import { useEffect, useState, useCallback, useRef, JSX } from "react";
import { Calendar, Clock, MapPin, Users, Ticket, X, CheckCircle, AlertCircle, User, Mail, Phone, ChevronDown, CalendarDays, Clock3, MapPinned, UsersRound, ArrowRight, Sparkles, Shield, Info, Image as ImageIcon, ChevronLeft, ChevronRight, CheckSquare, CalendarX } from "lucide-react";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { supabase } from '../../lib/supabase/client';
import { registerForEvent } from "../../lib/supabase/functions";
import { useToast } from "./ui/Toast";
import { getConstituencies } from "kenya-locations";
import Image from "next/image";

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
  created_at?: string;
  agenda?: string | null;
  speakers?: string | null;
  image_url?: string | null;
  registration_link?: string | null;
}

interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  constituency: string;
}

interface ConstituencyOption {
  code: string;
  name: string;
  county: string;
}

export default function EventsSection() {
  const { showToast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState<"idle" | "success" | "error">("idle");
  const [constituencies, setConstituencies] = useState<ConstituencyOption[]>([]);
  const [showConstituencyDropdown, setShowConstituencyDropdown] = useState(false);
  const [selectedEventDetails, setSelectedEventDetails] = useState<Event | null>(null);
  const [showEventDetailsModal, setShowEventDetailsModal] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: "",
    email: "",
    phone: "",
    constituency: ""
  });

  // Load constituencies from kenya-locations
  useEffect(() => {
    try {
      const allConstituencies = getConstituencies();
      const constituenciesList: ConstituencyOption[] = allConstituencies.map((c: any) => ({
        code: c.code,
        name: c.name,
        county: c.county
      }));
      const kituiConstituencies = constituenciesList.filter(c => c.county === "Kitui");
      setConstituencies(kituiConstituencies);
    } catch (error) {
      console.error("Error loading constituencies:", error);
    }
  }, []);

  // Fetch events from Supabase
  const fetchEvents = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("campaign_events")
        .select("*")
        .order("date", { ascending: true });

      if (fetchError) {
        throw fetchError;
      }

      setEvents(data || []);
    } catch (error) {
      console.error("❌ [EventsSection] Failed to fetch events:", error);
      setError("Unable to load events. Please try again later.");
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Check scroll position
  const checkScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [checkScroll, events]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380;
      const target = direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      scrollContainerRef.current.scrollTo({ left: target, behavior: 'smooth' });
    }
  };

  const handleRegisterClick = (event: Event) => {
    setSelectedEvent(event);
    setShowRegistrationModal(true);
    setRegistrationStatus("idle");
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      constituency: ""
    });
  };

  const handleViewDetails = (event: Event) => {
    setSelectedEventDetails(event);
    setShowEventDetailsModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectConstituency = (constituencyName: string) => {
    setFormData(prev => ({ ...prev, constituency: constituencyName }));
    setShowConstituencyDropdown(false);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone || !formData.constituency) {
      showToast("Please fill in all fields", "error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }

    if (!/^(07|01|02)[0-9]{8}$/.test(formData.phone)) {
      showToast("Please enter a valid Kenyan phone number (e.g., 0712345678)", "error");
      return;
    }

    setIsSubmitting(true);
    setRegistrationStatus("idle");

    try {
      const result = await registerForEvent(selectedEvent!.id, {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        constituency: formData.constituency
      });

      if (result.success) {
        setRegistrationStatus("success");
        showToast(`Successfully registered for ${selectedEvent?.title}!`, "success");

        setTimeout(() => {
          setShowRegistrationModal(false);
          setSelectedEvent(null);
          setRegistrationStatus("idle");
        }, 2000);
      } else {
        throw new Error(result.error || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setRegistrationStatus("error");
      showToast(error instanceof Error ? error.message : "Registration failed. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-KE', options);
  };

  const getEventTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Rally': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Summit': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Meeting': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Forum': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Workshop': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    };
    return colors[type] || 'bg-gold/20 text-gold border-gold/30';
  };

  const getEventTypeIcon = (type: string) => {
    const icons: Record<string, JSX.Element> = {
      'Rally': <Shield className="h-4 w-4" />,
      'Summit': <Sparkles className="h-4 w-4" />,
      'Meeting': <UsersRound className="h-4 w-4" />,
      'Forum': <Info className="h-4 w-4" />,
      'Workshop': <Calendar className="h-4 w-4" />
    };
    return icons[type] || <Calendar className="h-4 w-4" />;
  };

  const getStatusBadge = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'upcoming':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-[10px] font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            UPCOMING
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-[10px] font-medium">
            <CheckSquare className="h-3 w-3" />
            COMPLETED
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-[10px] font-medium">
            <CalendarX className="h-3 w-3" />
            CANCELLED
          </span>
        );
      default:
        return null;
    }
  };

  const isEventCompleted = (event: Event) => {
    return event.status?.toLowerCase() === 'completed' || event.status?.toLowerCase() === 'cancelled';
  };

  if (isLoading) {
    return (
      <section id="events" className="py-16 bg-gradient-to-b from-bg-dark to-bg-dark/80">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-1.5 mb-4">
              <Calendar className="h-4 w-4 text-gold animate-pulse" />
              <span className="text-xs font-semibold text-gold">LOADING EVENTS</span>
            </div>
            <h2 className="font-montserrat text-3xl font-bold md:text-4xl">
              <span className="text-gold">UPCOMING</span> EVENTS
            </h2>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="min-w-[320px] max-w-[380px] flex-shrink-0 bg-bg-card/50 rounded-2xl border border-gold/20 p-5 animate-pulse">
                <div className="h-8 w-24 bg-gold/10 rounded-full mb-4"></div>
                <div className="h-6 bg-gold/10 rounded w-3/4 mb-3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gold/10 rounded w-full"></div>
                  <div className="h-4 bg-gold/10 rounded w-full"></div>
                  <div className="h-4 bg-gold/10 rounded w-2/3"></div>
                </div>
                <div className="mt-4 h-10 bg-gold/10 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="events" className="py-16 bg-gradient-to-b from-bg-dark to-bg-dark/80">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <p className="text-text-dim">{error}</p>
          <button onClick={fetchEvents} className="mt-4 text-gold hover:underline">
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="events" className="py-16 bg-gradient-to-b from-bg-dark to-bg-dark/80">
        <div className="container mx-auto px-4 md:px-6">
          {/* Section Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-1.5 mb-4 border border-gold/20">
              <Calendar className="h-4 w-4 text-gold" />
              <span className="text-xs font-semibold text-gold uppercase tracking-wider">COMMUNITY CONNECT</span>
            </div>
            <h2 className="font-montserrat text-3xl font-bold md:text-5xl lg:text-6xl">
              <span className="text-gold">MEET</span> <span className="text-text-light">US IN PERSON</span>
            </h2>
            <p className="mt-2 text-sm text-text-dim max-w-xl mx-auto">
              Your voice matters. Join us at these events to share your ideas and be part of the conversation.
            </p>
          </div>

          {/* Scroll Buttons - Positioned at top right on desktop, below title on mobile */}
          <div className="flex justify-end mb-4">
            {events.length > 3 && (
              <div className="flex gap-2">
                <button
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  className="p-2 rounded-full border border-gold/30 text-gold hover:bg-gold/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  className="p-2 rounded-full border border-gold/30 text-gold hover:bg-gold/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          {events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-dim">No events available at the moment. Check back soon!</p>
            </div>
          ) : (
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
              onScroll={checkScroll}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className="min-w-[320px] max-w-[380px] flex-shrink-0 snap-start animate-fade-up opacity-0 group"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
                >
                  <div className="relative bg-bg-card/80 backdrop-blur-sm rounded-2xl border border-gold/20 overflow-hidden hover:border-gold/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10 hover:-translate-y-1 h-full flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Event Image */}
                    {event.image_url ? (
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image
                          src={event.image_url}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-card/80 via-transparent to-transparent" />
                      </div>
                    ) : (
                      <div className="relative w-full h-48 bg-gradient-to-br from-gold/10 to-gold/5 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2 text-text-dim/30">
                          <ImageIcon className="h-12 w-12" />
                          <span className="text-xs">No image</span>
                        </div>
                      </div>
                    )}

                    {/* Event Type Badge */}
                    <div className="relative px-5 pt-4">
                      <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border ${getEventTypeColor(event.type)}`}>
                        {getEventTypeIcon(event.type)}
                        {event.type}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative p-5 pt-3 flex-1 flex flex-col">
                      {/* Title - UPPERCASE */}
                      <h3 className="font-montserrat text-base font-bold text-text-light mb-2 leading-tight line-clamp-2 group-hover:text-gold transition-colors duration-300 uppercase tracking-wide">
                        {event.title}
                      </h3>

                      {/* Event Details Grid - Compact */}
                      <div className="space-y-1.5 mb-3 flex-1">
                        <div className="flex items-center gap-2 text-xs text-text-dim">
                          <CalendarDays className="h-3.5 w-3.5 text-gold flex-shrink-0" />
                          <span className="truncate">{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-text-dim">
                          <Clock3 className="h-3.5 w-3.5 text-gold flex-shrink-0" />
                          <span className="truncate">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-text-dim">
                          <MapPinned className="h-3.5 w-3.5 text-gold flex-shrink-0" />
                          <span className="truncate">{event.venue}</span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      {event.status && (
                        <div className="mb-3">
                          {getStatusBadge(event.status)}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-auto">
                        <button
                          onClick={() => handleViewDetails(event)}
                          className="flex-1 px-3 py-2 rounded-lg border border-gold/30 text-gold hover:bg-gold/10 transition-all duration-300 text-xs font-medium flex items-center justify-center gap-1 group/btn"
                        >
                          <Info className="h-3.5 w-3.5" />
                          Details
                        </button>
                        {!isEventCompleted(event) ? (
                          <button
                            onClick={() => handleRegisterClick(event)}
                            className="flex-1 px-3 py-2 rounded-lg bg-gradient-to-r from-gold to-gold-light text-bg-dark font-semibold text-xs hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 flex items-center justify-center gap-1"
                          >
                            <Ticket className="h-3.5 w-3.5" />
                            Register
                          </button>
                        ) : (
                          <button
                            disabled
                            className="flex-1 px-3 py-2 rounded-lg bg-bg-dark/50 text-text-dim font-semibold text-xs cursor-not-allowed flex items-center justify-center gap-1 border border-gold/10"
                          >
                            <CheckSquare className="h-3.5 w-3.5" />
                            Closed
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Status Badge - Top Right */}
                    {event.status && (
                      <div className="absolute top-4 right-4">
                        {getStatusBadge(event.status)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CSS for scrollbar hiding */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `
      }} />

      {/* Event Details Modal */}
      {showEventDetailsModal && selectedEventDetails && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setShowEventDetailsModal(false)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-bg-dark to-bg-card rounded-2xl border border-gold/30 shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowEventDetailsModal(false)}
              className="absolute top-4 right-4 z-20 rounded-full bg-black/50 p-2 text-text-dim hover:text-gold transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6 md:p-8">
              {/* Event Image */}
              {selectedEventDetails.image_url && (
                <div className="relative w-full h-56 rounded-xl overflow-hidden mb-6">
                  <Image
                    src={selectedEventDetails.image_url}
                    alt={selectedEventDetails.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/50 via-transparent to-transparent" />
                </div>
              )}

              {/* Header */}
              <div className="mb-5">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                  <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold border ${getEventTypeColor(selectedEventDetails.type)}`}>
                    {getEventTypeIcon(selectedEventDetails.type)}
                    {selectedEventDetails.type}
                  </div>
                  {selectedEventDetails.status && getStatusBadge(selectedEventDetails.status)}
                </div>
                <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-gold uppercase tracking-wide">
                  {selectedEventDetails.title}
                </h2>
              </div>

              {/* Event Details Grid */}
              <div className="grid gap-3 mb-5">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-bg-dark/50 border border-gold/10">
                  <CalendarDays className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-text-dim">Date</p>
                    <p className="text-text-light font-medium text-sm">{formatDate(selectedEventDetails.date)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-bg-dark/50 border border-gold/10">
                  <Clock3 className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-text-dim">Time</p>
                    <p className="text-text-light font-medium text-sm">{selectedEventDetails.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-bg-dark/50 border border-gold/10">
                  <MapPinned className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-text-dim">Venue</p>
                    <p className="text-text-light font-medium text-sm">{selectedEventDetails.venue}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6 p-4 rounded-lg bg-gold/5 border border-gold/20">
                <h4 className="text-xs font-semibold text-gold mb-2">ABOUT THIS EVENT</h4>
                <p className="text-sm text-text-light leading-relaxed">
                  {selectedEventDetails.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {!isEventCompleted(selectedEventDetails) ? (
                  <button
                    onClick={() => {
                      setShowEventDetailsModal(false);
                      handleRegisterClick(selectedEventDetails);
                    }}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-gold to-gold-light text-bg-dark font-semibold hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Ticket className="h-4 w-4" />
                    Register Now
                  </button>
                ) : (
                  <button
                    disabled
                    className="flex-1 py-3 rounded-xl bg-bg-dark/50 text-text-dim font-semibold cursor-not-allowed flex items-center justify-center gap-2 border border-gold/10"
                  >
                    <CheckSquare className="h-4 w-4" />
                    Registration Closed
                  </button>
                )}
                <button
                  onClick={() => setShowEventDetailsModal(false)}
                  className="px-6 py-3 rounded-xl border border-gold/30 text-gold hover:bg-gold/10 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {showRegistrationModal && selectedEvent && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => !isSubmitting && setShowRegistrationModal(false)}
        >
          <div
            className="relative w-full max-w-md bg-gradient-to-br from-bg-dark to-bg-card rounded-2xl border border-gold/30 shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => !isSubmitting && setShowRegistrationModal(false)}
              className="absolute top-4 right-4 z-20 rounded-full bg-black/50 p-1.5 text-text-dim hover:text-gold transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="text-center p-6 border-b border-gold/20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 mb-4">
                <Ticket className="h-8 w-8 text-gold" />
              </div>
              <h3 className="font-montserrat text-xl font-bold text-gold">Register for Event</h3>
              <p className="mt-2 text-sm text-text-dim">
                {selectedEvent.title}
                <br />
                <span className="text-xs text-gold">{formatDate(selectedEvent.date)}</span>
              </p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gold mb-1">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-dim" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g., John Mwangi"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light placeholder:text-text-dim focus:border-gold focus:outline-none transition-colors"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold mb-1">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-dim" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g., john@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light placeholder:text-text-dim focus:border-gold focus:outline-none transition-colors"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold mb-1">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-dim" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g., 0712345678"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light placeholder:text-text-dim focus:border-gold focus:outline-none transition-colors"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-xs font-semibold text-gold mb-1">
                  Constituency <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-dim z-10" />
                  <button
                    type="button"
                    onClick={() => setShowConstituencyDropdown(!showConstituencyDropdown)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light text-left focus:border-gold focus:outline-none transition-colors cursor-pointer"
                  >
                    {formData.constituency || "Select Constituency"}
                  </button>
                  <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-dim pointer-events-none"
                  />
                </div>
                {showConstituencyDropdown && constituencies.length > 0 && (
                  <div className="absolute z-20 mt-1 w-full max-h-48 overflow-y-auto rounded-lg border border-gold/20 bg-bg-dark shadow-lg">
                    {constituencies.map(c => (
                      <button
                        key={c.code}
                        type="button"
                        className="w-full px-4 py-2 text-left text-sm text-text-light hover:bg-gold/10 transition-colors"
                        onClick={() => handleSelectConstituency(c.name)}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {registrationStatus === "success" && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <p className="text-xs text-green-400">
                    Successfully registered! You will receive confirmation via email.
                  </p>
                </div>
              )}

              {registrationStatus === "error" && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <p className="text-xs text-red-400">
                    Registration failed. Please try again.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-full bg-gradient-to-r from-gold to-gold-light text-bg-dark font-semibold transition-all hover:shadow-lg hover:shadow-gold/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 border-2 border-bg-dark border-t-transparent rounded-full animate-spin" />
                    Registering...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Ticket className="h-4 w-4" />
                    Confirm Registration
                  </span>
                )}
              </button>

              <p className="text-center text-[10px] text-text-dim">
                By registering, you agree to receive event updates and confirm that you are a supporter of Team Mulila.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
