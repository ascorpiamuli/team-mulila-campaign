"use client";

import { useState } from "react";
import { Heart, DollarSign, Megaphone, Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2, Users, ExternalLink, ArrowRight, Sparkles, Shield, Target, Star, ChevronDown, Clock } from "lucide-react";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { submitContact } from "../../lib/supabase/functions";
import { useToast } from "./ui/Toast";

export default function SupportSection() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    supportType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || formData.name.length < 3) {
      showToast("Please enter your full name (minimum 3 characters)", "error");
      return;
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }

    if (!formData.message || formData.message.length < 10) {
      showToast("Please enter a message (minimum 10 characters)", "error");
      return;
    }

    if (!formData.supportType) {
      showToast("Please select how you would like to support", "error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      console.log("📧 Submitting contact message...");

      const result = await submitContact({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        supportType: formData.supportType
      });

      if (result.success) {
        setSubmitStatus("success");
        showToast("Thank you for your support! We'll get back to you within 24 hours.", "success");

        // Reset form
        setFormData({
          name: "",
          email: "",
          message: "",
          supportType: "",
        });

        setTimeout(() => {
          setSubmitStatus("idle");
        }, 3000);
      } else {
        throw new Error(result.error || "Submission failed");
      }
    } catch (error) {
      console.error("Error submitting contact:", error);
      setSubmitStatus("error");
      showToast(error instanceof Error ? error.message : "Failed to send message. Please try again.", "error");
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Support options data with enhanced details
  const supportOptions = [
    {
      icon: Megaphone,
      title: "Ambassador",
      subtitle: "Spread the Message",
      desc: "Become a Mulla ambassador in your ward and help spread our message to every corner of Kitui County.",
      color: "text-gold",
      bgColor: "bg-gold/10",
      borderColor: "border-gold/30",
      hoverColor: "hover:bg-gold/20",
      details: "Contact our team to join our ambassador program",
      benefits: ["Represent your community", "Lead local initiatives", "Connect with leadership"]
    },
    {
      icon: Users,
      title: "Volunteer",
      subtitle: "Active Participation",
      desc: "Join our volunteer team and actively participate in campaign activities across Kitui County.",
      color: "text-gold",
      bgColor: "bg-gold/10",
      borderColor: "border-gold/30",
      hoverColor: "hover:bg-gold/20",
      details: "Sign up to volunteer and make a difference in your community",
      benefits: ["Gain experience", "Build networks", "Make impact"]
    },
    {
      icon: DollarSign,
      title: "Donate",
      subtitle: "Financial Support",
      desc: "Support our campaign financially to help us reach more voters across Kitui County.",
      color: "text-gold",
      bgColor: "bg-gold/10",
      borderColor: "border-gold/30",
      hoverColor: "hover:bg-gold/20",
      details: "MPESA Paybill: 123456 | Account: MULILA2027",
      benefits: ["Power campaign activities", "Reach more voters", "Fuel the movement"]
    },
  ];

  // Social media links with proper icons
  const socialLinks = [
    { name: "Facebook", url: "https://facebook.com/teammulila", icon: "📘", color: "hover:bg-blue-600/20" },
    { name: "Twitter", url: "https://twitter.com/teammulila", icon: "🐦", color: "hover:bg-sky-400/20" },
    { name: "Instagram", url: "https://instagram.com/teammulila", icon: "📸", color: "hover:bg-pink-600/20" },
    { name: "WhatsApp", url: "https://wa.me/254795751700", icon: "💬", color: "hover:bg-green-500/20" },
    { name: "TikTok", url: "https://tiktok.com/@teammulila", icon: "🎵", color: "hover:bg-black/20" },
  ];

  return (
    <section id="support" className="relative bg-gradient-to-b from-bg-dark via-bg-card/50 to-bg-dark py-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-1.5 mb-4 border border-gold/20">
            <Heart className="h-4 w-4 text-gold animate-pulse" />
            <span className="text-xs font-semibold text-gold uppercase tracking-wider">Join the Movement</span>
          </div>
          <h2 className="font-montserrat text-4xl font-bold md:text-5xl lg:text-6xl">
            <span className="text-gold">SUPPORT</span> THE MOVEMENT
          </h2>
          <p className="mt-4 text-text-dim max-w-2xl mx-auto text-sm md:text-base">
            Every contribution, whether time, resources, or voice, brings us closer to a better Kitui County.
            Join us in building a prosperous future for all.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Support Options */}
          <div className="space-y-6">
            {supportOptions.map((option, idx) => (
              <div
                key={idx}
                className="group relative bg-bg-dark/60 backdrop-blur-sm rounded-2xl border border-gold/20 hover:border-gold/40 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10 hover:-translate-y-1 overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative p-6">
                  <div className="flex items-start gap-5">
                    <div className="p-3 rounded-xl bg-gold/10 group-hover:bg-gold/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <option.icon className="h-8 w-8 text-gold" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold text-text-light group-hover:text-gold transition-colors duration-300">
                          {option.title}
                        </h3>
                        <span className="text-xs text-gold/60 font-medium">{option.subtitle}</span>
                      </div>
                      <p className="text-text-dim mb-3 text-sm leading-relaxed">{option.desc}</p>

                      {/* Benefits chips */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {option.benefits.map((benefit, i) => (
                          <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold/5 border border-gold/10 text-[10px] text-gold/70">
                            <Sparkles className="h-2.5 w-2.5" />
                            {benefit}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs text-gold/80 font-mono">{option.details}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gold/30 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-2" />
                  </div>
                </div>
              </div>
            ))}

            {/* Contact Info Card - Enhanced */}
            <Card className="relative bg-gradient-to-br from-gold/5 to-gold/10 backdrop-blur-sm border border-gold/30 hover:border-gold/50 transition-all duration-300 hover:shadow-xl hover:shadow-gold/10 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl" />
              <div className="relative p-6">
                <div className="flex items-start gap-5">
                  <div className="p-3 rounded-xl bg-gold/20">
                    <Phone className="h-8 w-8 text-gold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-text-light mb-2 flex items-center gap-2">
                      Need Help?
                      <span className="text-xs font-normal text-gold/60">We're here for you</span>
                    </h3>
                    <p className="text-text-dim mb-3 text-sm">Call or WhatsApp us directly:</p>
                    <div className="flex items-center gap-3 mb-3">
                      <a
                        href="tel:+254795751700"
                        className="text-gold hover:underline font-semibold inline-flex items-center gap-2 text-lg"
                      >
                        <Phone className="h-4 w-4" />
                        +254 795 751 700
                      </a>
                      <span className="text-text-dim/30">|</span>
                      <a
                        href="https://wa.me/254795751700"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:underline font-semibold inline-flex items-center gap-2"
                      >
                        <span className="text-lg">💬</span>
                        WhatsApp
                      </a>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-text-dim">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Mon-Fri: 8AM - 6PM
                      </span>
                      <span className="flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        24/7 Support
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form - Enhanced */}
          <Card className="relative bg-bg-dark/60 backdrop-blur-sm border border-gold/20 hover:border-gold/30 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold/20 via-gold to-gold/20" />
            <div className="p-6 md:p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-text-light">Get in Touch</h3>
                <p className="text-text-dim text-sm">We'd love to hear from you</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-gold mb-1.5 uppercase tracking-wider">
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <div className={`relative transition-all duration-300 ${focusedField === 'name' ? 'transform scale-[1.01]' : ''}`}>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g., John Mwangi"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full rounded-lg border-2 border-gold/20 bg-bg-dark/50 p-3 pl-4 text-text-light placeholder:text-text-dim/50 focus:border-gold focus:outline-none transition-all duration-300"
                      required
                      disabled={isSubmitting}
                    />
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gold to-gold-light transition-all duration-500 ${focusedField === 'name' ? 'w-full' : 'w-0'}`} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gold mb-1.5 uppercase tracking-wider">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <div className={`relative transition-all duration-300 ${focusedField === 'email' ? 'transform scale-[1.01]' : ''}`}>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g., john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full rounded-lg border-2 border-gold/20 bg-bg-dark/50 p-3 pl-4 text-text-light placeholder:text-text-dim/50 focus:border-gold focus:outline-none transition-all duration-300"
                      required
                      disabled={isSubmitting}
                    />
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gold to-gold-light transition-all duration-500 ${focusedField === 'email' ? 'w-full' : 'w-0'}`} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gold mb-1.5 uppercase tracking-wider">
                    Support Type <span className="text-red-400">*</span>
                  </label>
                  <div className={`relative transition-all duration-300 ${focusedField === 'supportType' ? 'transform scale-[1.01]' : ''}`}>
                    <select
                      name="supportType"
                      value={formData.supportType}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('supportType')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full rounded-lg border-2 border-gold/20 bg-bg-dark/50 p-3 pl-4 text-text-light focus:border-gold focus:outline-none transition-all duration-300 cursor-pointer appearance-none"
                      required
                      disabled={isSubmitting}
                    >
                      <option value="">Select how you'd like to support</option>
                      <option value="ambassador">🌟 Ambassador - Represent us in your ward</option>
                      <option value="volunteer">🤝 Volunteer - Offer your time and skills</option>
                      <option value="donate">💰 Donate - Financial contribution</option>
                      <option value="other">💡 Other - Share your ideas</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronDown className="h-4 w-4 text-text-dim" />
                    </div>
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gold to-gold-light transition-all duration-500 ${focusedField === 'supportType' ? 'w-full' : 'w-0'}`} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gold mb-1.5 uppercase tracking-wider">
                    Your Message <span className="text-red-400">*</span>
                  </label>
                  <div className={`relative transition-all duration-300 ${focusedField === 'message' ? 'transform scale-[1.01]' : ''}`}>
                    <textarea
                      name="message"
                      placeholder="Tell us how you'd like to support or ask any questions..."
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      rows={4}
                      maxLength={500}
                      className="w-full rounded-lg border-2 border-gold/20 bg-bg-dark/50 p-3 pl-4 text-text-light placeholder:text-text-dim/50 focus:border-gold focus:outline-none transition-all duration-300 resize-none"
                      required
                      disabled={isSubmitting}
                    />
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gold to-gold-light transition-all duration-500 ${focusedField === 'message' ? 'w-full' : 'w-0'}`} />
                  </div>
                  <div className="flex justify-between items-center mt-1.5">
                    <p className="text-[10px] text-text-dim/50">Minimum 10 characters</p>
                    <p className={`text-[10px] ${formData.message.length > 450 ? 'text-yellow-400' : 'text-text-dim/50'}`}>
                      {formData.message.length}/500
                    </p>
                  </div>
                </div>

                {/* Success/Error Messages */}
                {submitStatus === "success" && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/30 animate-fade-in">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <p className="text-xs text-green-400">
                      Message sent successfully! We'll respond within 24 hours. 🎉
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 animate-fade-in">
                    <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <p className="text-xs text-red-400">
                      Failed to send message. Please try again or contact us directly.
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full justify-center gap-2 group relative overflow-hidden"
                  disabled={isSubmitting}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gold-light to-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                        <Sparkles className="h-3 w-3" />
                      </>
                    )}
                  </span>
                </Button>

                <div className="flex items-center justify-center gap-2 text-center text-[10px] text-text-dim/60">
                  <Shield className="h-3 w-3" />
                  <span>Your information is secure and protected</span>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
