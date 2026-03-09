// app/events/EventsContent.tsx
"use client";

import { useState, useMemo } from "react";
import { EventCard } from "@/components/sections/EventCard";
import { TerminalWindow, ScrollReveal, CommandPrefix } from "@/components/terminal";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { cn } from "@/lib/utils";
import {
  Calendar,
  MapPin,
  CalendarDays,
  History,
  Globe,
  Sparkles,
  Filter
} from "lucide-react";
import { useUpcomingEvents, usePastEvents, useEventsByCity } from "@/hooks/useEvents";

type FilterKey = "all" | "upcoming" | "past" | "nairobi" | "mombasa";

const filters: { key: FilterKey; label: string; icon: any }[] = [
  { key: "all", label: "All Events", icon: CalendarDays },
  { key: "upcoming", label: "Upcoming", icon: Sparkles },
  { key: "past", label: "Past Events", icon: History },
  { key: "nairobi", label: "Nairobi", icon: MapPin },
  { key: "mombasa", label: "Mombasa", icon: Globe },
];

export function EventsContent() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  // Fetch data
  const { events: upcomingEvents, loading: upcomingLoading } = useUpcomingEvents(50);
  const { events: pastEvents, loading: pastLoading } = usePastEvents(50);
  const { events: nairobiEvents, loading: nairobiLoading } = useEventsByCity("Nairobi", 50);
  const { events: mombasaEvents, loading: mombasaLoading } = useEventsByCity("Mombasa", 50);

  // Determine loading state
  const isLoading = useMemo(() => {
    switch (activeFilter) {
      case "upcoming": return upcomingLoading;
      case "past": return pastLoading;
      case "nairobi": return nairobiLoading;
      case "mombasa": return mombasaLoading;
      default: return upcomingLoading || pastLoading;
    }
  }, [activeFilter, upcomingLoading, pastLoading, nairobiLoading, mombasaLoading]);

  // Get filtered events
  const displayEvents = useMemo(() => {
    switch (activeFilter) {
      case "upcoming": return upcomingEvents;
      case "past": return pastEvents;
      case "nairobi": return nairobiEvents;
      case "mombasa": return mombasaEvents;
      default: {
        // Combine all and sort by date (most recent first)
        const all = [...upcomingEvents, ...pastEvents];
        return all.sort((a, b) =>
          new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
        );
      }
    }
  }, [activeFilter, upcomingEvents, pastEvents, nairobiEvents, mombasaEvents]);

  return (
    <main className="min-h-screen bg-bg-primary">
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Events" }]} />
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-primary/10 via-transparent to-transparent" />

        {/* Decorative grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff4110_1px,transparent_1px),linear-gradient(to_bottom,#00ff4110_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Floating orbs */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-green-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-amber/5 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Terminal-style corner decorations */}
        <div className="absolute top-40 left-10 hidden lg:block">
          <div className="font-mono text-xs text-green-primary/30">
            {'>'} event_discovery.sh
          </div>
          <div className="font-mono text-xs text-green-primary/20 mt-1">
            {'>'} scanning calendar...
          </div>
        </div>

        <div className="absolute bottom-40 right-10 hidden lg:block">
          <div className="font-mono text-xs text-green-primary/30 text-right">
            {'>'} 5 events found
          </div>
          <div className="font-mono text-xs text-green-primary/20 mt-1 text-right">
            {'>'} filtering by location
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl">
              {/* Animated badge with typing effect */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-green-primary/10 to-green-primary/5 border border-green-primary/20 mb-6 backdrop-blur-sm group hover:border-green-primary/30 transition-all duration-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-primary"></span>
                </span>
                <Calendar className="h-4 w-4 text-green-primary group-hover:rotate-12 transition-transform" />
                <span className="font-mono text-xs text-green-primary">
                  <span className="text-text-dim">$</span> cat events/location
                </span>
                <span className="font-mono text-xs text-amber">Kenya</span>
                <div className="w-1 h-4 bg-green-primary/30 animate-pulse" />
              </div>

              {/* Title with gradient and typing effect */}
              <div className="relative">
                <h1 className="mb-4 font-mono text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                  <span className="text-text-primary relative">
                    Events
                    <span className="absolute -top-6 -right-8 text-xs font-mono text-green-primary/50 rotate-12 hidden md:inline">
                      {/* v2.0.0 */}
                    </span>
                  </span>
                  <br />
                  <span className="relative">
                    <span className="absolute -inset-1 bg-gradient-to-r from-green-primary/20 to-amber/20 blur-xl opacity-50" />
                    <span className="relative text-green-primary">&</span>
                  </span>{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-primary to-amber">
                    Meetups
                  </span>
                </h1>

                {/* Live counter */}
                <div className="absolute -top-4 right-0 hidden lg:block">
                  <div className="bg-bg-card/50 backdrop-blur-sm border border-border-default rounded-lg px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-primary"></span>
                      </div>
                      <span className="font-mono text-xs text-text-dim">LIVE</span>
                      <span className="w-px h-3 bg-border-default mx-1" />
                      <span className="font-mono text-xs text-green-primary">5+ events</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description with enhanced styling */}
              <p className="max-w-2xl font-sans text-lg text-text-secondary leading-relaxed mb-8 relative">
                <span className="absolute -left-4 top-0 text-green-primary/30 text-2xl font-mono hidden md:block">
                  &gt;
                </span>
                Join developer meetups, workshops, and tech talks across{' '}
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-green-primary/10 blur-md rounded-full px-2"></span>
                  <span className="relative text-green-primary font-medium">Nairobi</span>
                </span>{' '}
                and{' '}
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-amber/10 blur-md rounded-full px-2"></span>
                  <span className="relative text-amber font-medium">Mombasa</span>
                </span>
                . Connect with fellow developers and learn about the latest in web development,
                fintech, and open source.
              </p>

              {/* Quick stats */}
              <div className="flex flex-wrap items-center gap-6 mt-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-primary/5 border border-green-primary/20">
                    <Calendar className="h-4 w-4 text-green-primary" />
                  </div>
                  <div>
                    <div className="font-mono text-sm font-bold text-text-primary">Monthly</div>
                    <div className="font-mono text-xs text-text-dim">Regular meetups</div>
                  </div>
                </div>

                <div className="w-px h-8 bg-border-default" />

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber/5 border border-amber/20">
                    <MapPin className="h-4 w-4 text-amber" />
                  </div>
                  <div>
                    <div className="font-mono text-sm font-bold text-text-primary">2 Cities</div>
                    <div className="font-mono text-xs text-text-dim">Nairobi · Mombasa</div>
                  </div>
                </div>

                <div className="w-px h-8 bg-border-default" />

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/5 border border-purple-500/20">
                    <Sparkles className="h-4 w-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="font-mono text-sm font-bold text-text-primary">Free</div>
                    <div className="font-mono text-xs text-text-dim">Always free to attend</div>
                  </div>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap items-center gap-4 mt-10">
                <a
                  href="#events-grid"
                  className="group relative inline-flex items-center gap-2 px-6 py-3 bg-green-primary text-bg-primary rounded-lg font-mono text-sm font-medium overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,65,0.3)]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-green-primary to-amber opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-2">
                    Browse Events
                    <Calendar className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                  </span>
                </a>

                <a
                  href="/#contact"
                  className="group relative inline-flex items-center gap-2 px-6 py-3 border-2 border-green-primary/30 text-green-primary rounded-lg font-mono text-sm font-medium overflow-hidden hover:border-green-primary transition-all duration-300"
                >
                  <span className="absolute inset-0 bg-green-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center gap-2">
                    Host an Event
                    <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                  </span>
                </a>

                {/* Mini calendar preview */}
                <div className="hidden lg:flex items-center gap-2 ml-auto">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-bg-card bg-gradient-to-br from-green-primary/20 to-amber/20 flex items-center justify-center"
                      >
                        <span className="text-[8px] font-mono text-green-primary">
                          {['MAY', 'JUN', 'JUL'][i - 1]}
                        </span>
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-mono text-text-dim">+2 this month</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="border-y border-border-default bg-bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <ScrollReveal delay={100}>
            <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex items-center gap-2 text-text-dim mr-2">
                <Filter className="h-4 w-4" />
                <span className="font-mono text-xs">Filter by:</span>
              </div>
              {filters.map((filter) => {
                const Icon = filter.icon;
                return (
                  <button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    className={cn(
                      "flex items-center gap-2 shrink-0 px-4 py-2 font-mono text-sm transition-all duration-200 rounded-lg",
                      activeFilter === filter.key
                        ? "bg-green-primary/10 border border-green-primary text-green-primary"
                        : "border border-border-default text-text-dim hover:border-green-primary/30 hover:text-text-secondary hover:bg-green-primary/5"
                    )}
                    aria-pressed={activeFilter === filter.key}
                  >
                    <Icon className="h-4 w-4" />
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Events Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {/* Results count */}
        <ScrollReveal delay={150}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 text-text-dim">
              <CalendarDays className="h-4 w-4" />
              <span className="font-mono text-sm">
                {displayEvents.length} {displayEvents.length === 1 ? 'event' : 'events'} found
              </span>
            </div>
            <div className="text-xs font-mono text-text-dim">
              <CommandPrefix /> {activeFilter}
            </div>
          </div>
        </ScrollReveal>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-green-primary border-t-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-green-primary animate-pulse" />
              </div>
            </div>
            <p className="mt-4 font-mono text-sm text-text-dim">Loading events...</p>
          </div>
        ) : displayEvents.length > 0 ? (
          <>
            <ScrollReveal
              stagger={100}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {displayEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </ScrollReveal>

            {/* Load More Button (optional - if you implement pagination) */}
            {displayEvents.length >= 12 && (
              <div className="mt-12 text-center">
                <button className="px-6 py-3 border border-border-default rounded-lg font-mono text-sm text-text-dim hover:border-green-primary/30 hover:text-green-primary transition-all">
                  Load More Events
                </button>
              </div>
            )}
          </>
        ) : (
          <ScrollReveal>
            <TerminalWindow title="no-results" variant="command" className="max-w-2xl mx-auto">
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-text-dim/30 mx-auto mb-4" />
                <p className="text-text-dim mb-2">
                  <CommandPrefix symbol=">" />
                  No events found for this filter
                </p>
                <p className="text-sm text-text-dim/70">
                  Try selecting a different filter or check back later for new events.
                </p>
              </div>
            </TerminalWindow>
          </ScrollReveal>
        )}
      </section>

      {/* CTA Section */}
      <section className="border-t border-border-default bg-bg-secondary/50">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <ScrollReveal>
            <h2 className="font-mono text-2xl font-bold text-green-primary mb-4">
              Want to host an event?
            </h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Looking for a speaker for your meetup? Want to collaborate on a workshop?
              I'd love to connect and share knowledge with the developer community.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-green-primary text-green-primary hover:bg-green-primary hover:text-bg-primary transition-all duration-200 rounded-lg font-mono"
            >
              Get in Touch
              <Sparkles className="h-4 w-4" />
            </a>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
