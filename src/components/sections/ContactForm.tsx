// components/sections/ContactForm.tsx
"use client";

import { useState, useEffect } from "react";
import { Mail, Github, Linkedin, MapPin, Clock } from "lucide-react";
import { TerminalWindow } from "@/components/terminal";
import { ScrollReveal } from "@/components/terminal";
import { CommandPrefix } from "@/components/terminal";
import { cn } from "@/lib/utils";
import { supabase } from "../../../lib/supabase/client";
import { useToast } from "@/hooks/useToast";
import { ToastContainer } from "../ui/Toast";

interface ContactFormProps {
  email?: string;
  github?: string;
  linkedin?: string;
  location?: string;
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm({ 
  email = "stephen.muli@tum.ac.ke",
  github = "stephenmuli",
  linkedin = "stephenmuli",
  location = "Nairobi, Kenya",
  className 
}: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const { 
    currentToast,
    removeToast,
    showSuccess, 
    showError, 
    showWarning, 
    showInfo, 
    checkRateLimit 
  } = useToast();

  // Cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting || cooldown > 0) {
      showWarning(`Please wait ${cooldown} seconds before sending another message.`);
      return;
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      showError("Please enter a valid email address.");
      return;
    }

    // Check rate limit
    const rateLimit = await checkRateLimit(formData.email);
    if (!rateLimit.allowed) {
      showWarning(rateLimit.reason!);
      return;
    }

    setIsSubmitting(true);

    try {
      // Check for duplicate submission today
      const today = new Date().toISOString().split('T')[0];
      const { data: existing, error: checkError } = await supabase
        .from('contact_messages')
        .select('id')
        .eq('email', formData.email)
        .eq('submitted_at', today);

      if (checkError) throw checkError;

      if (existing && existing.length > 0) {
        showWarning("You've already sent a message today. Please wait until tomorrow to send another.");
        setIsSubmitting(false);
        return;
      }

      // Insert the message into Supabase
      const { error: insertError } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || null,
          message: formData.message,
          source: 'portfolio',
          created_at: new Date().toISOString(),
          submitted_at: today,
          read: false
        });

      if (insertError) throw insertError;


        const { data: emailData, error: emailError } = await supabase.functions.invoke('send-contact-email', {
          body: {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message
          }
        });

      if (emailError) {
        console.error('Edge function error:', emailError);
        showWarning(`Message saved, but email notification may be delayed. I'll still get back to you!`);
      } else {
        console.log('✅ Edge function response:', emailData);
        showSuccess(`✨ Message sent successfully! Thank you for reaching out, ${formData.name}! I've sent a confirmation to your email and will get back to you within 24 hours.`);
      }
      
      // Clear form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Set cooldown (60 seconds)
      setCooldown(60);

    } catch (err) {
      console.error('Submission error:', err);
      showError(`⚠️ Oops! Something went wrong. You can still reach me directly at ${email}`);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section
        className={cn("border-y border-border-default bg-bg-secondary py-24", className)}
        aria-label="Contact me"
        id="contact"
      >
        <div className="mx-auto max-w-6xl px-4">
          <ScrollReveal>
            <h2 className="mb-2 text-center font-mono text-xl text-green-primary">
              <CommandPrefix />
              contact --get-in-touch
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center font-sans text-text-secondary">
              Have a project in mind, an opportunity to discuss, or just want to say hello? 
              I'd love to hear from you. Fill out the form below and I'll get back to you within 24 hours.
            </p>
          </ScrollReveal>

          <ScrollReveal stagger={100}>
            <div className="grid gap-8 md:grid-cols-3">
              {/* Contact Form - Takes 2 columns on desktop */}
              <div className="md:col-span-2">
                <TerminalWindow
                  title="contact-form.sh"
                  variant="command"
                  className="h-full"
                >
                  <form onSubmit={handleSubmit} className="space-y-6 p-2">
                    {/* Rate limit indicator */}
                    {cooldown > 0 && (
                      <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                        <Clock className="h-4 w-4 text-amber-500 animate-pulse" />
                        <span className="font-mono text-xs text-amber-500">
                          Cooldown: {cooldown}s - Please wait before sending another message
                        </span>
                      </div>
                    )}

                    {/* Name field */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="flex items-center gap-2 font-mono text-sm text-text-secondary">
                        <span className="text-green-primary">$</span>
                        <span>name --required</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        disabled={isSubmitting || cooldown > 0}
                        className="w-full bg-bg-primary border border-border-default rounded-lg px-4 py-3 font-mono text-sm text-text-primary placeholder:text-text-dim/50 focus:border-green-primary/50 focus:outline-none focus:ring-1 focus:ring-green-primary/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>

                    {/* Email field */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="flex items-center gap-2 font-mono text-sm text-text-secondary">
                        <span className="text-green-primary">$</span>
                        <span>email --required</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        disabled={isSubmitting || cooldown > 0}
                        className="w-full bg-bg-primary border border-border-default rounded-lg px-4 py-3 font-mono text-sm text-text-primary placeholder:text-text-dim/50 focus:border-green-primary/50 focus:outline-none focus:ring-1 focus:ring-green-primary/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>

                    {/* Subject field */}
                    <div className="space-y-2">
                      <label htmlFor="subject" className="flex items-center gap-2 font-mono text-sm text-text-secondary">
                        <span className="text-green-primary">$</span>
                        <span>subject --optional</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Project inquiry, collaboration, etc."
                        disabled={isSubmitting || cooldown > 0}
                        className="w-full bg-bg-primary border border-border-default rounded-lg px-4 py-3 font-mono text-sm text-text-primary placeholder:text-text-dim/50 focus:border-green-primary/50 focus:outline-none focus:ring-1 focus:ring-green-primary/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>

                    {/* Message field */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="flex items-center gap-2 font-mono text-sm text-text-secondary">
                        <span className="text-green-primary">$</span>
                        <span>message --required</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project or idea..."
                        required
                        disabled={isSubmitting || cooldown > 0}
                        className="w-full bg-bg-primary border border-border-default rounded-lg px-4 py-3 font-mono text-sm text-text-primary placeholder:text-text-dim/50 focus:border-green-primary/50 focus:outline-none focus:ring-1 focus:ring-green-primary/30 transition-all duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>

                    {/* Submit button */}
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center gap-2 text-text-dim font-mono text-xs">
                        <span className={cn(
                          "relative flex h-2 w-2",
                          (isSubmitting || cooldown > 0) && "animate-pulse"
                        )}>
                          <span className={cn(
                            "absolute inline-flex h-full w-full rounded-full opacity-75",
                            isSubmitting ? "bg-amber" : cooldown > 0 ? "bg-amber" : "bg-green-primary animate-ping"
                          )} />
                          <span className={cn(
                            "relative inline-flex rounded-full h-2 w-2",
                            isSubmitting ? "bg-amber" : cooldown > 0 ? "bg-amber" : "bg-green-primary"
                          )} />
                        </span>
                        <span>
                          {isSubmitting ? "Sending..." : cooldown > 0 ? `Wait ${cooldown}s` : "Ready to send"}
                        </span>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting || cooldown > 0}
                        className="group relative px-8 py-3 bg-green-primary/10 border border-green-primary/30 rounded-lg font-mono text-sm text-green-primary hover:bg-green-primary/20 transition-all duration-200 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-primary/10"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {isSubmitting ? "SENDING..." : "SEND_MESSAGE"}
                          {!isSubmitting && !cooldown && (
                            <span className="text-green-primary group-hover:translate-x-1 transition-transform duration-200">→</span>
                          )}
                          {isSubmitting && (
                            <span className="animate-spin">⚡</span>
                          )}
                          {cooldown > 0 && (
                            <span>⏳</span>
                          )}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-green-primary/0 via-green-primary/10 to-green-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      </button>
                    </div>

                    {/* Form footer with rate limit info */}
                    <div className="mt-4 text-[10px] font-mono text-text-dim border-t border-border-default pt-4">
                      <div className="flex flex-wrap items-center gap-4">
                        <span className="flex items-center gap-1">
                          <span>🔒</span> Stored securely in Supabase
                        </span>
                        <span className="flex items-center gap-1">
                          <span>⚡</span> Response within 24h
                        </span>
                        <span className="flex items-center gap-1">
                          <span>🛡️</span> Rate limited (3/day)
                        </span>
                        <span className="flex items-center gap-1">
                          <span>📋</span> No spam, ever
                        </span>
                        <span className="flex items-center gap-1">
                          <span>✉️</span> Confirmation sent to you
                        </span>
                      </div>
                    </div>
                  </form>
                </TerminalWindow>
              </div>

              {/* Quick Contact Info - Takes 1 column */}
              <div className="space-y-6">
                {/* Email contact */}
                <TerminalWindow title="quick-contact.sh" variant="output" className="h-auto">
                  <div className="space-y-4 p-2">
                    <ContactLink
                      icon={Mail}
                      label="EMAIL"
                      value={email}
                      href={`mailto:${email}`}
                    />

                    <ContactLink
                      icon={Github}
                      label="GITHUB"
                      value={`@${github}`}
                      href={`https://github.com/${github}`}
                    />

                    <ContactLink
                      icon={Linkedin}
                      label="LINKEDIN"
                      value={linkedin}
                      href={`https://linkedin.com/in/${linkedin}`}
                    />

                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg border border-green-primary/20 bg-green-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-green-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-mono text-xs text-text-dim">LOCATION</p>
                        <p className="font-mono text-sm text-text-primary truncate">{location}</p>
                      </div>
                    </div>
                  </div>
                </TerminalWindow>

                {/* Availability Status */}
                <TerminalWindow title="status.sh" variant="output" className="h-auto">
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-primary"></span>
                      </span>
                      <span className="font-mono text-sm text-green-primary">Available for work</span>
                    </div>
                    
                    <div className="space-y-2 text-xs font-mono text-text-dim">
                      <div className="flex justify-between">
                        <span>Response time:</span>
                        <span className="text-text-primary">&lt; 24 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rate limit:</span>
                        <span className="text-text-primary">3 messages/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Timezone:</span>
                        <span className="text-text-primary">EAT (UTC+3)</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border-default">
                      <div className="flex flex-wrap gap-2">
                        <StatusTag color="blue" text="Open to freelance" />
                        <StatusTag color="amber" text="Remote OK" />
                        <StatusTag color="green" text="Available now" />
                      </div>
                    </div>
                  </div>
                </TerminalWindow>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Single Toast Container */}
      <ToastContainer toast={currentToast} onRemove={removeToast} />
    </>
  );
}

// Helper component for contact links
interface ContactLinkProps {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
}

function ContactLink({ icon: Icon, label, value, href }: ContactLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 group hover:bg-bg-primary/50 p-2 -m-2 rounded-lg transition-all duration-200"
    >
      <div className="h-10 w-10 rounded-lg border border-green-primary/20 bg-green-primary/10 flex items-center justify-center flex-shrink-0 group-hover:border-green-primary/40 group-hover:bg-green-primary/20 transition-all duration-200">
        <Icon className="h-5 w-5 text-green-primary" />
      </div>
      <div className="min-w-0">
        <p className="font-mono text-xs text-text-dim">{label}</p>
        <p className="font-mono text-sm text-text-primary group-hover:text-green-primary transition-colors truncate">
          {value}
        </p>
      </div>
    </a>
  );
}

// Helper component for status tags
interface StatusTagProps {
  color: "green" | "blue" | "amber";
  text: string;
}

function StatusTag({ color, text }: StatusTagProps) {
  const colorClasses = {
    green: "bg-green-500/10 text-green-500 border-green-500/30",
    blue: "bg-blue-500/10 text-blue-500 border-blue-500/30",
    amber: "bg-amber-500/10 text-amber-500 border-amber-500/30",
  };

  return (
    <span className={cn(
      "px-2 py-1 text-[10px] font-mono border rounded-full",
      colorClasses[color]
    )}>
      {text}
    </span>
  );
}