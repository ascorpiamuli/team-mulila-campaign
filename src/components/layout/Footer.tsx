"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Github, Linkedin, Twitter, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";

export function Footer() {
  const [exitHovered, setExitHovered] = useState(false);
  const [email, setEmail] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const currentYear = new Date().getFullYear();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscriptionStatus("loading");
    
    // Simulate API call - replace with actual newsletter API
    setTimeout(() => {
      setSubscriptionStatus("success");
      setEmail("");
      setTimeout(() => setSubscriptionStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <footer className="relative border-t border-border-default bg-bg-secondary overflow-hidden" role="contentinfo">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff4110_1px,transparent_1px),linear-gradient(to_bottom,#00ff4110_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-primary/50 to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Terminal-style header */}
        <div className="flex items-center gap-2 border-b border-border-default py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red" />
            <span className="h-3 w-3 rounded-full bg-amber" />
            <span className="h-3 w-3 rounded-full bg-green-primary" />
          </div>
          <span className="ml-3 font-mono text-xs text-text-dim">
            <span className="text-green-primary">stephen@portfolio</span>:~/footer
          </span>
          <span className="ml-auto font-mono text-[10px] text-text-dim hidden sm:inline">
            [EOF]
          </span>
        </div>

        {/* Main footer content */}
        <div className="grid gap-8 py-12 lg:grid-cols-4">
          {/* Brand section - expanded */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              <h3 className="font-mono text-lg font-bold text-green-primary flex items-center gap-2">
                <span>┌──</span>
                <span>Stephen Muli</span>
              </h3>
              
              <p className="text-sm text-text-secondary leading-relaxed">
                3rd Year IT Student at Technical University of Mombasa. 
                Passionate about web development and network programming.
              </p>
              
              <div className="space-y-2 font-mono text-xs text-text-dim bg-bg-card/50 p-3 rounded-lg border border-border-default">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-green-primary" />
                  <span>Nairobi / Mombasa, Kenya</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-green-primary" />
                  <a href="mailto:stephen.muli@tum.ac.ke" className="hover:text-green-primary transition-colors">
                    stephen.muli@tum.ac.ke
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-mono text-sm font-bold text-text-primary flex items-center gap-2 mb-4">
              <span className="text-green-primary">├──</span>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "Projects", href: "/projects" },
                { label: "Ideas", href: "/ideas" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 font-mono text-sm text-text-secondary hover:text-green-primary transition-colors"
                  >
                    <span className="text-text-dim group-hover:text-green-primary">│</span>
                    {link.label}
                    <span className="opacity-0 group-hover:opacity-100 text-green-primary transition-opacity">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-mono text-sm font-bold text-text-primary flex items-center gap-2 mb-4">
              <span className="text-green-primary">├──</span>
              Connect
            </h3>
            <ul className="space-y-2">
              {[
                { icon: Github, label: "GitHub", href: "https://github.com/stephenmuli", handle: "@stephenmuli" },
                { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/stephenmuli", handle: "Stephen Muli" },
                { icon: Twitter, label: "X (Twitter)", href: "https://twitter.com/stephenmuli", handle: "@stephenmuli" },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between font-mono text-sm text-text-secondary hover:text-green-primary transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-text-dim group-hover:text-green-primary">│</span>
                        <Icon className="h-3.5 w-3.5" />
                        <span>{social.label}</span>
                      </div>
                      <span className="text-[10px] text-text-dim/50 group-hover:text-green-primary/50">
                        {social.handle}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="font-mono text-sm font-bold text-text-primary flex items-center gap-2 mb-4">
              <span className="text-green-primary">└──</span>
              Newsletter
            </h3>
            
            <div className="bg-bg-card/50 border border-border-default rounded-lg p-4">
              <p className="text-xs text-text-secondary mb-3 leading-relaxed">
                Get updates on my projects, network programming experiments, and tech insights.
              </p>
              
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    disabled={subscriptionStatus === "loading" || subscriptionStatus === "success"}
                    className="w-full bg-bg-primary border border-border-default rounded-lg px-3 py-2 pl-8 font-mono text-xs text-text-primary placeholder:text-text-dim/50 focus:border-green-primary/50 focus:outline-none focus:ring-1 focus:ring-green-primary/30 transition-all disabled:opacity-50"
                  />
                  <Mail className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-dim/50" />
                </div>
                
                <button
                  type="submit"
                  disabled={subscriptionStatus === "loading" || subscriptionStatus === "success"}
                  className="w-full flex items-center justify-center gap-2 bg-green-primary/10 border border-green-primary/30 rounded-lg px-3 py-2 font-mono text-xs text-green-primary hover:bg-green-primary/20 transition-all disabled:opacity-50"
                >
                  {subscriptionStatus === "loading" && (
                    <>
                      <span className="animate-spin">⚡</span>
                      Subscribing...
                    </>
                  )}
                  {subscriptionStatus === "success" && (
                    <>
                      <CheckCircle className="h-3.5 w-3.5" />
                      Subscribed!
                    </>
                  )}
                  {subscriptionStatus === "error" && (
                    <>
                      <AlertCircle className="h-3.5 w-3.5" />
                      Try again
                    </>
                  )}
                  {subscriptionStatus === "idle" && (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      Subscribe
                    </>
                  )}
                </button>
              </form>

              {subscriptionStatus === "success" && (
                <p className="mt-2 text-[10px] text-green-primary/70 text-center">
                  ✓ Check your inbox for confirmation
                </p>
              )}

              <p className="mt-3 text-[8px] font-mono text-text-dim/40 text-center">
                No spam • Unsubscribe anytime
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border-default py-6 sm:flex-row">
          <div className="flex items-center gap-4 font-mono text-xs text-text-dim">
            <span className="text-green-primary">└──</span>
            <span>© {currentYear} Stephen Muli Musyoki</span>
            <span className="hidden sm:inline text-text-dim/30">|</span>
            <span className="hidden sm:inline">3rd Year IT @ TUM</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/stephenmuli"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1 font-mono text-xs text-text-dim hover:text-green-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
            <span className="text-text-dim/30">/</span>
            <a
              href="https://linkedin.com/in/stephenmuli"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1 font-mono text-xs text-text-dim hover:text-green-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-3.5 w-3.5" />
              <span>LinkedIn</span>
            </a>
            <span className="text-text-dim/30">/</span>
            <a
              href="mailto:stephen.muli@tum.ac.ke"
              className="group flex items-center gap-1 font-mono text-xs text-text-dim hover:text-green-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Email</span>
            </a>
          </div>

          {/* Exit easter egg */}
          <span
            className="cursor-pointer font-mono text-xs text-text-dim transition-colors hover:text-amber relative group"
            onMouseEnter={() => setExitHovered(true)}
            onMouseLeave={() => setExitHovered(false)}
            role="presentation"
            title="You can check out any time you like, but you can never leave."
          >
            {exitHovered ? (
              <span className="absolute right-0 whitespace-nowrap bg-bg-card border border-amber/30 rounded-lg px-2 py-1 text-amber">
                🏨 Welcome to the Hotel California
              </span>
            ) : (
              "$ exit"
            )}
          </span>
        </div>

        {/* Status line */}
        <div className="flex items-center gap-2 py-2 text-[8px] font-mono text-text-dim/30 border-t border-border-default/50">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-primary"></span>
          </span>
          <span>System ready</span>
          <span className="ml-auto">Built with Next.js • TypeScript • Tailwind</span>
        </div>
      </div>
    </footer>
  );
}