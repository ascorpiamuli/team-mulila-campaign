"use client";

import { useState, useEffect } from "react";
import {
  Send, Mail, Users, Heart, DollarSign, Megaphone,
  CheckCircle, AlertCircle, RefreshCw, X,
  User, Filter, Clock, Eye, TrendingUp,
  MessageSquare, FileText, Copy, Trash2
} from "lucide-react";
import { supabase } from '../../../../lib/supabase/client';

interface MessageTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  created_at: string;
}

interface EmailRecipient {
  email: string;
  name: string;
  type: string;
}

interface MessageLog {
  id: string;
  event_id: string | null;
  event_title: string | null;
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

export default function AdminMessages() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [recipientType, setRecipientType] = useState("all");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [recipientCount, setRecipientCount] = useState(0);
  const [recipients, setRecipients] = useState<EmailRecipient[]>([]);
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [customEmail, setCustomEmail] = useState("");
  const [customName, setCustomName] = useState("");
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [showTemplates, setShowTemplates] = useState(false);
  const [messageLogs, setMessageLogs] = useState<MessageLog[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [sendSMS, setSendSMS] = useState(false);

  useEffect(() => {
    fetchTemplates();
    fetchMessageLogs();
    fetchRecipients();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from("email_templates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error && error.code === 'PGRST205') {
        setTemplates([]);
        return;
      }
      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error("Error fetching templates:", error);
      setTemplates([]);
    }
  };

  const fetchMessageLogs = async () => {
    try {
      const { data, error } = await supabase
        .from("event_message_logs")
        .select("*")
        .order("sent_at", { ascending: false })
        .limit(50);

      if (error && error.code === 'PGRST205') {
        setMessageLogs([]);
        return;
      }
      if (error) throw error;
      setMessageLogs(data || []);
    } catch (error) {
      console.error("Error fetching message logs:", error);
      setMessageLogs([]);
    }
  };

  const fetchRecipients = async () => {
    setIsLoading(true);
    try {
      let supporters: any[] = [];
      let registrations: any[] = [];

      const { data: supportersData, error: supportersError } = await supabase
        .from("campaign_supporters")
        .select("full_name, email, constituency")
        .not("email", "is", null);

      if (!supportersError && supportersData) {
        supporters = supportersData;
      }

      const { data: registrationsData, error: registrationsError } = await supabase
        .from("event_registrations")
        .select("full_name, email, constituency")
        .not("email", "is", null);

      if (!registrationsError && registrationsData) {
        registrations = registrationsData;
      }

      const allRecipients = [...supporters, ...registrations];
      const uniqueRecipients = allRecipients.reduce((acc: EmailRecipient[], curr) => {
        if (!acc.find(r => r.email === curr.email)) {
          acc.push({
            email: curr.email,
            name: curr.full_name || curr.name || "Valued Supporter",
            type: "supporter"
          });
        }
        return acc;
      }, []);

      let filtered = uniqueRecipients;
      if (recipientType === "specific" && selectedRecipient) {
        filtered = uniqueRecipients.filter(r => r.email === selectedRecipient);
      }

      setRecipients(filtered);
      setRecipientCount(filtered.length);
    } catch (error) {
      console.error("Error fetching recipients:", error);
      setErrorMessage("Failed to fetch recipients");
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const loadTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSubject(template.subject);
      setMessage(template.content);
      setSelectedTemplate(templateId);
    }
  };

  const sendEmails = async () => {
    if (!subject || !message) {
      setErrorMessage("Please enter both subject and message");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    if (recipients.length === 0 && recipientType !== "custom") {
      setErrorMessage("No recipients found for this selection");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      let emailRecipients = [...recipients];

      if (recipientType === "custom" && customEmail) {
        emailRecipients = [{
          email: customEmail,
          name: customName || "Valued Supporter",
          type: "custom"
        }];
      }

      if (emailRecipients.length === 0) {
        setErrorMessage("No recipients to send to");
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('send-event-messages', {
        body: JSON.stringify({
          eventId: null,
          eventTitle: "Bulk Message",
          subject: subject,
          message: message,
          recipients: emailRecipients.map(r => ({
            email: r.email,
            name: r.name,
            phone: ""
          })),
          sendSMS: sendSMS
        })
      });

      if (error) throw error;

      if (data.success) {
        setSuccessMessage(`✅ Successfully sent to ${emailRecipients.length} recipients!`);
        if (sendSMS) {
          setSuccessMessage(prev => prev + ` SMS notifications sent to ${data.data?.sms?.success || 0} recipients`);
        }

        await fetchMessageLogs();

        setSubject("");
        setMessage("");
        setShowComposeModal(false);
        setRecipientType("all");
        setCustomEmail("");
        setCustomName("");
        setSendSMS(false);

        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        setErrorMessage(data.message || "Failed to send messages");
      }
    } catch (error) {
      console.error("Error sending emails:", error);
      setErrorMessage("Failed to send messages. Please try again.");
      setTimeout(() => setErrorMessage(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const getRecipientTypeLabel = (type: string) => {
    switch (type) {
      case "volunteers": return "Volunteers";
      case "donors": return "Donors";
      case "ambassadors": return "Ambassadors";
      case "all": return "All Supporters";
      case "specific": return "Specific Person";
      case "custom": return "Custom Email";
      default: return type;
    }
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

  const statCards = [
    { label: "Total Supporters", value: recipients.length, icon: Users, color: "from-gold to-gold-light" },
    { label: "Templates", value: templates.length, icon: FileText, color: "from-blue-500 to-blue-600" },
    { label: "Sent Today", value: messageLogs.filter(e => new Date(e.sent_at).toDateString() === new Date().toDateString()).length, icon: Clock, color: "from-green-500 to-green-600" },
    { label: "Total Sent", value: messageLogs.length, icon: Mail, color: "from-purple-500 to-purple-600" },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="font-montserrat text-xl sm:text-2xl font-bold text-gold">Messages</h1>
          <p className="text-text-dim text-xs sm:text-sm mt-1">Send bulk emails to supporters, volunteers, donors, and ambassadors</p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gold/20 text-text-dim hover:text-gold hover:bg-gold/10 transition-colors text-sm"
          >
            <Clock className="h-4 w-4" />
            <span className="hidden xs:inline">{showHistory ? "Compose" : "View History"}</span>
          </button>
          {!showHistory && (
            <button
              onClick={() => setShowComposeModal(true)}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gradient-to-r from-gold to-gold-light text-bg-dark font-semibold hover:shadow-lg transition-all text-sm"
            >
              <Send className="h-4 w-4" />
              <span className="hidden xs:inline">Compose</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats Grid - Responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gold to-gold-light rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative bg-bg-card/50 backdrop-blur-sm rounded-xl border border-gold/20 p-3 md:p-6">
              <div className="flex justify-between items-start mb-2 md:mb-4">
                <div className={`p-1.5 md:p-3 rounded-xl bg-gradient-to-r ${card.color}`}>
                  <card.icon className="h-4 w-4 md:h-6 md:w-6 text-white" />
                </div>
              </div>
              <p className="text-text-dim text-[10px] md:text-sm">{card.label}</p>
              <p className="text-lg md:text-3xl font-bold text-text-light mt-0.5 md:mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/30 animate-fade-in">
          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
          <p className="text-sm text-green-400">{successMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 animate-fade-in">
          <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-400">{errorMessage}</p>
        </div>
      )}

      {/* History View - Responsive Table */}
      {showHistory ? (
        <div className="bg-bg-card/50 rounded-xl border border-gold/20 overflow-hidden">
          <div className="p-3 md:p-4 border-b border-gold/20">
            <h2 className="font-montserrat text-base md:text-lg font-bold text-text-light">Sent Messages History</h2>
            <p className="text-text-dim text-xs md:text-sm">Recently sent messages and their status</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gold/10">
                <tr>
                  <th className="p-2 md:p-4 text-left text-xs md:text-sm font-semibold text-gold">Subject</th>
                  <th className="p-2 md:p-4 text-left text-xs md:text-sm font-semibold text-gold hidden sm:table-cell">Recipients</th>
                  <th className="p-2 md:p-4 text-left text-xs md:text-sm font-semibold text-gold hidden md:table-cell">Status</th>
                  <th className="p-2 md:p-4 text-left text-xs md:text-sm font-semibold text-gold hidden lg:table-cell">Email</th>
                  <th className="p-2 md:p-4 text-left text-xs md:text-sm font-semibold text-gold hidden xl:table-cell">SMS</th>
                  <th className="p-2 md:p-4 text-left text-xs md:text-sm font-semibold text-gold hidden sm:table-cell">Date</th>
                  <th className="p-2 md:p-4 text-left text-xs md:text-sm font-semibold text-gold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messageLogs.map((log) => (
                  <tr key={log.id} className="border-b border-gold/10 hover:bg-gold/5 transition-colors">
                    <td className="p-2 md:p-4 text-text-light font-medium text-xs md:text-sm max-w-[100px] md:max-w-none truncate">{log.subject}</td>
                    <td className="p-2 md:p-4 text-text-dim text-xs md:text-sm hidden sm:table-cell">{log.recipients_count}</td>
                    <td className="p-2 md:p-4 hidden md:table-cell">{getMessageStatusBadge(log.status)}</td>
                    <td className="p-2 md:p-4 text-text-dim text-xs md:text-sm hidden lg:table-cell">
                      ✅ {log.email_success} / ❌ {log.email_failed}
                    </td>
                    <td className="p-2 md:p-4 text-text-dim text-xs md:text-sm hidden xl:table-cell">
                      {log.sms_sent ? `✅ ${log.sms_success} / ❌ ${log.sms_failed}` : '—'}
                    </td>
                    <td className="p-2 md:p-4 text-text-dim text-xs md:text-sm hidden sm:table-cell">
                      {new Date(log.sent_at).toLocaleDateString()}
                    </td>
                    <td className="p-2 md:p-4">
                      <button
                        onClick={() => {
                          setSubject(log.subject);
                          setMessage(log.message);
                          setShowPreviewModal(true);
                        }}
                        className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                        title="Preview"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {messageLogs.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center p-8 text-text-dim">No messages sent yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Compose View - Responsive Grid */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Recipient Type Selection */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-3 md:p-4">
              <h3 className="font-montserrat font-semibold text-text-light text-sm md:text-base mb-3">Select Recipients</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-1.5 md:gap-2">
                {[
                  { id: "all", label: "All Supporters", icon: Users, color: "text-gold" },
                  { id: "volunteers", label: "Volunteers", icon: Heart, color: "text-green-400" },
                  { id: "donors", label: "Donors", icon: DollarSign, color: "text-blue-400" },
                  { id: "ambassadors", label: "Ambassadors", icon: Megaphone, color: "text-purple-400" },
                  { id: "specific", label: "Specific Person", icon: User, color: "text-yellow-400" },
                  { id: "custom", label: "Custom Email", icon: Mail, color: "text-orange-400" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setRecipientType(option.id);
                      if (option.id !== "specific" && option.id !== "custom") {
                        fetchRecipients();
                      }
                    }}
                    className={`w-full flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg transition-all duration-300 text-xs md:text-sm ${recipientType === option.id
                        ? "bg-gold/10 border border-gold/30"
                        : "hover:bg-gold/5"
                      }`}
                  >
                    <option.icon className={`h-4 w-4 md:h-5 md:w-5 ${option.color} flex-shrink-0`} />
                    <span className="text-text-light truncate">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recipients List - Responsive */}
            {(recipientType === "all" || recipientType === "volunteers" || recipientType === "donors" || recipientType === "ambassadors") && (
              <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-3 md:p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-montserrat font-semibold text-text-light text-sm md:text-base">Recipients</h3>
                  <button
                    onClick={fetchRecipients}
                    className="p-1 text-gold hover:text-gold-light transition-colors"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xl md:text-2xl font-bold text-gold mb-2">{recipientCount}</p>
                <p className="text-text-dim text-xs md:text-sm">people will receive this message</p>
                {recipientCount > 0 && (
                  <div className="mt-3 max-h-32 md:max-h-40 overflow-y-auto space-y-1">
                    {recipients.slice(0, 5).map((r, idx) => (
                      <div key={idx} className="text-xs text-text-dim truncate">
                        {r.name} - {r.email}
                      </div>
                    ))}
                    {recipientCount > 5 && (
                      <div className="text-xs text-gold mt-1">+{recipientCount - 5} more</div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Specific Person Selection */}
            {recipientType === "specific" && (
              <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-3 md:p-4">
                <h3 className="font-montserrat font-semibold text-text-light text-sm md:text-base mb-3">Select Person</h3>
                <select
                  value={selectedRecipient}
                  onChange={(e) => {
                    setSelectedRecipient(e.target.value);
                    fetchRecipients();
                  }}
                  className="w-full px-3 md:px-4 py-2 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light focus:border-gold focus:outline-none text-sm mb-3"
                >
                  <option value="">Select a supporter</option>
                  {recipients.map((r, idx) => (
                    <option key={idx} value={r.email}>
                      {r.name} - {r.email}
                    </option>
                  ))}
                </select>
                {selectedRecipient && (
                  <p className="text-xs text-gold">1 person will receive this message</p>
                )}
              </div>
            )}

            {/* Custom Email */}
            {recipientType === "custom" && (
              <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-3 md:p-4">
                <h3 className="font-montserrat font-semibold text-text-light text-sm md:text-base mb-3">Custom Recipient</h3>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3 md:px-4 py-2 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light focus:border-gold focus:outline-none text-sm mb-3"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="w-full px-3 md:px-4 py-2 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light focus:border-gold focus:outline-none text-sm"
                />
                {customEmail && (
                  <p className="text-xs text-gold mt-2">1 person will receive this message</p>
                )}
              </div>
            )}
          </div>

          {/* Message Preview - Responsive */}
          <div className="lg:col-span-3">
            <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-4 md:p-6">
              <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                <h3 className="font-montserrat font-semibold text-text-light text-sm md:text-base">Message Preview</h3>
                <button
                  onClick={() => setShowTemplates(!showTemplates)}
                  className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 rounded-lg border border-gold/20 text-gold hover:bg-gold/10 transition-colors text-xs md:text-sm"
                >
                  <FileText className="h-3 w-3 md:h-4 md:w-4" />
                  Templates
                </button>
              </div>

              {/* Templates Dropdown */}
              {showTemplates && templates.length > 0 && (
                <div className="mb-4 p-2 md:p-3 bg-gold/5 rounded-lg border border-gold/20">
                  <p className="text-xs text-gold mb-2">Select a template:</p>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => loadTemplate(template.id)}
                        className="px-2 md:px-3 py-1 rounded-full bg-gold/10 text-gold text-[10px] md:text-xs hover:bg-gold/20 transition-colors"
                      >
                        {template.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Subject */}
              <div className="mb-3 md:mb-4">
                <label className="block text-xs font-semibold text-gold mb-1">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter email subject..."
                  className="w-full px-3 md:px-4 py-2 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light focus:border-gold focus:outline-none text-sm"
                />
              </div>

              {/* Message Body */}
              <div className="mb-3 md:mb-4">
                <label className="block text-xs font-semibold text-gold mb-1">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={8}
                  placeholder="Write your message here... You can use HTML for formatting."
                  className="w-full px-3 md:px-4 py-2 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light focus:border-gold focus:outline-none resize-none font-mono text-xs md:text-sm"
                />
              </div>

              {/* SMS Toggle */}
              <div className="mb-3 md:mb-4">
                <label className="flex items-center gap-2 text-text-light text-xs md:text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendSMS}
                    onChange={(e) => setSendSMS(e.target.checked)}
                    className="text-gold focus:ring-gold rounded"
                  />
                  <span>Send SMS notification (tells recipients to check their email)</span>
                </label>
              </div>

              {/* Preview Section */}
              <div className="mt-3 md:mt-4 p-3 md:p-4 bg-bg-dark/30 rounded-lg border border-gold/10">
                <h4 className="text-xs font-semibold text-gold mb-2">Preview</h4>
                <div className="prose prose-invert max-w-none">
                  <div className="text-text-light whitespace-pre-wrap text-xs md:text-sm">{message}</div>
                </div>
              </div>

              {/* Send Button */}
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mt-4 md:mt-6">
                <button
                  onClick={sendEmails}
                  disabled={isLoading || (!subject || !message) || (recipientType === "custom" && !customEmail) || (recipientType !== "custom" && recipientCount === 0)}
                  className="w-full sm:flex-1 py-2 md:py-3 rounded-lg bg-gradient-to-r from-gold to-gold-light text-bg-dark font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-bg-dark border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send to {recipientType === "custom" ? "1 person" : `${recipientCount} recipients`}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compose Modal - Responsive */}
      {showComposeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-bg-card rounded-2xl border border-gold/30 shadow-2xl">
            <div className="sticky top-0 bg-bg-card border-b border-gold/20 p-3 md:p-4 flex justify-between items-center">
              <h2 className="font-montserrat text-lg md:text-xl font-bold text-gold">Compose Message</h2>
              <button
                onClick={() => setShowComposeModal(false)}
                className="p-1 rounded-full hover:bg-gold/10 transition-colors"
              >
                <X className="h-5 w-5 text-text-dim" />
              </button>
            </div>
            <div className="p-4 md:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Recipient selection */}
                <div className="space-y-4">
                  {/* Same content as above but in modal */}
                  <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-3 md:p-4">
                    <h3 className="font-montserrat font-semibold text-text-light text-sm md:text-base mb-3">Select Recipients</h3>
                    <div className="space-y-1.5 md:space-y-2">
                      {[
                        { id: "all", label: "All Supporters", icon: Users, color: "text-gold" },
                        { id: "volunteers", label: "Volunteers", icon: Heart, color: "text-green-400" },
                        { id: "donors", label: "Donors", icon: DollarSign, color: "text-blue-400" },
                        { id: "ambassadors", label: "Ambassadors", icon: Megaphone, color: "text-purple-400" },
                        { id: "specific", label: "Specific Person", icon: User, color: "text-yellow-400" },
                        { id: "custom", label: "Custom Email", icon: Mail, color: "text-orange-400" },
                      ].map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            setRecipientType(option.id);
                            if (option.id !== "specific" && option.id !== "custom") {
                              fetchRecipients();
                            }
                          }}
                          className={`w-full flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg transition-all duration-300 text-xs md:text-sm ${recipientType === option.id
                              ? "bg-gold/10 border border-gold/30"
                              : "hover:bg-gold/5"
                            }`}
                        >
                          <option.icon className={`h-4 w-4 md:h-5 md:w-5 ${option.color} flex-shrink-0`} />
                          <span className="text-text-light truncate">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Message composition */}
                <div className="lg:col-span-2">
                  <div className="bg-bg-card/50 rounded-xl border border-gold/20 p-4 md:p-6">
                    <div className="mb-3 md:mb-4">
                      <label className="block text-xs font-semibold text-gold mb-1">Subject</label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Enter email subject..."
                        className="w-full px-3 md:px-4 py-2 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light focus:border-gold focus:outline-none text-sm"
                      />
                    </div>
                    <div className="mb-3 md:mb-4">
                      <label className="block text-xs font-semibold text-gold mb-1">Message</label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={8}
                        placeholder="Write your message here..."
                        className="w-full px-3 md:px-4 py-2 rounded-lg border border-gold/20 bg-bg-dark/50 text-text-light focus:border-gold focus:outline-none resize-none font-mono text-xs md:text-sm"
                      />
                    </div>
                    <button
                      onClick={sendEmails}
                      disabled={isLoading || (!subject || !message)}
                      className="w-full py-2 md:py-3 rounded-lg bg-gradient-to-r from-gold to-gold-light text-bg-dark font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                    >
                      {isLoading ? (
                        <>
                          <div className="h-4 w-4 border-2 border-bg-dark border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal - Responsive */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-bg-card rounded-2xl border border-gold/30 shadow-2xl">
            <div className="sticky top-0 bg-bg-card border-b border-gold/20 p-3 md:p-4 flex justify-between items-center">
              <h2 className="font-montserrat text-lg md:text-xl font-bold text-gold">Email Preview</h2>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-1 rounded-full hover:bg-gold/10 transition-colors"
              >
                <X className="h-5 w-5 text-text-dim" />
              </button>
            </div>
            <div className="p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-text-light mb-2">{subject}</h3>
              <div className="prose prose-invert max-w-none">
                <div className="text-text-light whitespace-pre-wrap text-sm md:text-base">{message}</div>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="mt-4 w-full py-2 md:py-3 rounded-lg bg-gold text-bg-dark font-semibold text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
