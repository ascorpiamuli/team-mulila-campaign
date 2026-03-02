// components/sections/ContactForm.tsx
"use client";

import { useState } from "react";
import { Mail, Github, Linkedin, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { TerminalWindow } from "@/components/terminal";
import { ScrollReveal } from "@/components/terminal";
import { CommandPrefix } from "@/components/terminal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

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

interface FormStatus {
  type: "idle" | "submitting" | "success" | "error";
  message?: string;
}

export function ContactForm({ 
  email = "stephen.muli@example.com",
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

  const [formStatus, setFormStatus] = useState<FormStatus>({
    type: "idle",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ type: "submitting" });

    // Simulate form submission - replace with actual API call
    try {
      // Replace with your actual form endpoint
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Success
      setFormStatus({ 
        type: "success", 
        message: "Message sent successfully! I'll get back to you within 24 hours." 
      });
      
      // Clear form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus({ type: "idle" });
      }, 5000);
    } catch (error) {
      setFormStatus({ 
        type: "error", 
        message: "Something went wrong. Please try again or email me directly." 
      });
    }
  };

  const isSubmitting = formStatus.type === "submitting";

  return (
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
                      className="w-full bg-bg-primary border border-border-default rounded-lg px-4 py-3 font-mono text-sm text-text-primary placeholder:text-text-dim/50 focus:border-green-primary/50 focus:outline-none focus:ring-1 focus:ring-green-primary/30 transition-all duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* Status messages */}
                  {formStatus.type === "success" && (
                    <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <p className="text-sm font-mono text-green-500">{formStatus.message}</p>
                    </div>
                  )}

                  {formStatus.type === "error" && (
                    <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <p className="text-sm font-mono text-red-500">{formStatus.message}</p>
                    </div>
                  )}

                  {/* Submit button */}
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-2 text-text-dim font-mono text-xs">
                      <span className={cn(
                        "relative flex h-2 w-2",
                        isSubmitting && "animate-pulse"
                      )}>
                        <span className={cn(
                          "absolute inline-flex h-full w-full rounded-full opacity-75",
                          isSubmitting ? "bg-amber" : "bg-green-primary animate-ping"
                        )} />
                        <span className={cn(
                          "relative inline-flex rounded-full h-2 w-2",
                          isSubmitting ? "bg-amber" : "bg-green-primary"
                        )} />
                      </span>
                      <span>
                        {isSubmitting ? "Sending..." : "Ready to send"}
                      </span>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative px-8 py-3 bg-green-primary/10 border border-green-primary/30 rounded-lg font-mono text-sm text-green-primary hover:bg-green-primary/20 transition-all duration-200 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-primary/10"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {isSubmitting ? "SENDING..." : "SEND_MESSAGE"}
                        {!isSubmitting && (
                          <span className="text-green-primary group-hover:translate-x-1 transition-transform duration-200">→</span>
                        )}
                        {isSubmitting && (
                          <span className="animate-spin">⚡</span>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-primary/0 via-green-primary/10 to-green-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </button>
                  </div>

                  {/* Form footer */}
                  <div className="mt-4 text-[10px] font-mono text-text-dim border-t border-border-default pt-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="flex items-center gap-1">
                        <span>🔒</span> All messages encrypted
                      </span>
                      <span className="flex items-center gap-1">
                        <span>⚡</span> Response within 24h
                      </span>
                      <span className="flex items-center gap-1">
                        <span>📋</span> No spam, ever
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
                      <span>Current projects:</span>
                      <span className="text-text-primary">3 active</span>
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