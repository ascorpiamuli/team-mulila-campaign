// app/events/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { Badge } from "@/components/ui/Badge";
import { Timeline } from "@/components/ui/Timeline";
import { TerminalWindow, ScrollReveal } from "@/components/terminal";
import { SITE_CONFIG } from "@/lib/constants";
import { cookies } from "next/headers";
import {
  Calendar,
  Clock,
  MapPin,
  Tag,
  ArrowLeft,
  Users,
  Building2,
  Sparkles,
  Trophy,
  Shield,
  CheckCircle2,
  Globe,
  Link as LinkIcon,
  DollarSign,
  Hash,
  Video,
  Phone,
  Mail,
  Download,
  Image,
  BookOpen,
  Award,
  Star,
  Heart,
  ThumbsUp,
  MessageCircle,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import { EventDetailClient } from "./EventDetailClient";
import { supabase } from '../../../../lib/supabase/client';
import { cn } from '../../../lib/utils';

// ---------------------------------------------------------------------------
// Dynamic metadata
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const cookieStore = cookies();

  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!event) {
    return { title: "Event Not Found | Stephen Muli Musyoki" };
  }

  return {
    title: `${event.title} | Stephen Muli Musyoki`,
    description: event.description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/events/${event.slug}`,
    },
    openGraph: {
      title: event.title,
      description: event.description,
      url: `${SITE_CONFIG.url}/events/${event.slug}`,
      siteName: SITE_CONFIG.name,
      type: "article",
      images: event.thumbnail_url ? [{ url: event.thumbnail_url }] : undefined,
    },
  };
}

// ---------------------------------------------------------------------------
// Status helpers
// ---------------------------------------------------------------------------
const statusLabels: Record<string, string> = {
  upcoming: "Upcoming",
  ongoing: "Ongoing",
  completed: "Completed",
  cancelled: "Cancelled",
  postponed: "Postponed",
};

const statusColors: Record<string, string> = {
  upcoming: "bg-green-primary/10 text-green-primary border-green-primary/30",
  ongoing: "bg-amber/10 text-amber border-amber/30",
  completed: "bg-blue-500/10 text-blue-500 border-blue-500/30",
  cancelled: "bg-red/10 text-red border-red/30",
  postponed: "bg-orange-500/10 text-orange-500 border-orange-500/30",
};

const typeLabels: Record<string, string> = {
  workshop: "Workshop",
  webinar: "Webinar",
  meetup: "Meetup",
  conference: "Conference",
  hackathon: "Hackathon",
  training: "Training",
  seminar: "Seminar",
  panel_discussion: "Panel Discussion",
  networking: "Networking",
  other: "Other",
};

// Define types for complex data structures
interface Speaker {
  name: string;
  title?: string;
  bio?: string;
  photo?: string;
  social_links?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

interface AgendaItem {
  time: string;
  topic: string;
  speaker?: string;
  description?: string;
}

interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  discord?: string;
  slack?: string;
  telegram?: string;
  website?: string;
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------
export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !event) {
    notFound();
  }

  const isActionable = event.status === "upcoming" || event.status === "ongoing";
  const isVirtual = event.is_virtual || false;

  // Build agenda timeline entries with proper typing
  const agendaEntries = event.agenda?.map((item: AgendaItem, i: number) => ({
    date: item.time || `Session ${i + 1}`,
    title: item.topic || 'TBD',
    description: item.description || '',
    hash: `sess-${String(i + 1).padStart(2, "0")}`,
  }));

  // Description paragraphs
  const descriptionText = event.full_description || event.description;
  const descriptionParagraphs = descriptionText.split("\n\n").filter((p: string) => p.trim());

  // Format dates
  const startDate = new Date(event.start_date);
  const endDate = event.end_date ? new Date(event.end_date) : null;

  const formattedDate = startDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedStartTime = startDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: event.timezone || 'Africa/Nairobi'
  });

  const formattedEndTime = endDate ? endDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: event.timezone || 'Africa/Nairobi'
  }) : null;

  const formattedDateTime = formattedEndTime
    ? `${formattedStartTime} - ${formattedEndTime}`
    : formattedStartTime;

  // Share URLs
  const eventUrl = `${SITE_CONFIG.url}/events/${event.slug}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `${event.title} — Stephen Muli Musyoki`
  )}&url=${encodeURIComponent(eventUrl)}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    eventUrl
  )}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`${event.title} - ${eventUrl}`)}`;

  // JSON-LD structured data
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.start_date,
    endDate: event.end_date,
    eventStatus: event.status === "completed"
      ? "https://schema.org/EventScheduled"
      : "https://schema.org/EventScheduled",
    eventAttendanceMode: isVirtual
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    location: isVirtual ? {
      "@type": "VirtualLocation",
      url: event.meeting_link || event.online_platform,
    } : {
      "@type": "Place",
      name: event.venue_name,
      address: {
        "@type": "PostalAddress",
        streetAddress: event.venue_address,
        addressLocality: event.venue_city,
        addressRegion: event.venue_city,
        addressCountry: event.venue_country || "KE",
      },
    },
    organizer: {
      "@type": "Person",
      name: event.organizer_name,
      email: event.organizer_email,
    },
    performer: event.speakers?.map((speaker: Speaker) => ({
      "@type": "Person",
      name: speaker.name,
      description: speaker.bio,
    })),
    url: eventUrl,
    ...(event.registration_url && {
      offers: {
        "@type": "Offer",
        url: event.registration_url,
        price: event.ticket_price?.toString() || "0",
        priceCurrency: event.currency || "KES",
        availability: event.max_attendees && event.current_attendees && event.current_attendees >= event.max_attendees
          ? "https://schema.org/SoldOut"
          : "https://schema.org/InStock",
      }
    }),
    ...(event.thumbnail_url && { image: event.thumbnail_url }),
    ...(event.tags && { keywords: event.tags.join(", ") }),
  };

  return (
    <main className="min-h-screen bg-bg-primary px-4 py-16 sm:px-6 lg:px-8">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Events", url: "/events" },
          { name: event.title },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <div className="mx-auto max-w-4xl">
        {/* Back link */}
        <Link
          href="/events"
          className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-text-dim transition-colors hover:text-green-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Link>

        {/* Hero Image if available */}
        {event.banner_image && (
          <div className="mb-8 relative w-full h-64 md:h-96 rounded-xl overflow-hidden border border-border-default">
            <img
              src={event.banner_image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            {event.thumbnail_url && (
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full border border-border-default">
                <Image className="h-4 w-4 text-green-primary" />
                <span className="font-mono text-xs">Event Gallery</span>
              </div>
            )}
          </div>
        )}

        {/* Header section */}
        <ScrollReveal>
          <header className="mb-10">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Badge variant="default" className={cn("text-xs px-3 py-1", statusColors[event.status])}>
                {statusLabels[event.status] || event.status}
              </Badge>
              {event.is_featured && (
                <span className="text-[10px] px-2 py-1 bg-amber/10 text-amber rounded-full flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Featured Event
                </span>
              )}
              {isVirtual && (
                <span className="text-[10px] px-2 py-1 bg-purple-500/10 text-purple-400 rounded-full flex items-center gap-1">
                  <Video className="h-3 w-3" />
                  Virtual Event
                </span>
              )}
              {event.is_recurring && (
                <span className="text-[10px] px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Recurring
                </span>
              )}
            </div>

            <h1 className="mb-6 font-mono text-3xl font-bold text-text-primary sm:text-4xl lg:text-5xl">
              {event.title}
            </h1>

            {/* Meta info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 text-text-secondary">
                <Calendar className="h-5 w-5 text-green-primary shrink-0" />
                <div>
                  <div className="font-mono text-xs text-text-dim">Date</div>
                  <span className="font-sans text-sm">{formattedDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-text-secondary">
                <Clock className="h-5 w-5 text-green-primary shrink-0" />
                <div>
                  <div className="font-mono text-xs text-text-dim">Time</div>
                  <span className="font-sans text-sm">{formattedDateTime} {event.timezone ? `(${event.timezone})` : ''}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-text-secondary">
                {isVirtual ? (
                  <Video className="h-5 w-5 text-green-primary shrink-0" />
                ) : (
                  <MapPin className="h-5 w-5 text-green-primary shrink-0" />
                )}
                <div>
                  <div className="font-mono text-xs text-text-dim">Location</div>
                  <span className="font-sans text-sm">
                    {isVirtual
                      ? (event.online_platform || 'Virtual Event')
                      : (event.venue_name || event.venue_city || 'TBD')}
                    {!isVirtual && event.venue_city && `, ${event.venue_country || 'Kenya'}`}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-text-secondary">
                <Tag className="h-5 w-5 text-green-primary shrink-0" />
                <div>
                  <div className="font-mono text-xs text-text-dim">Event Type</div>
                  <span className="font-mono text-sm uppercase tracking-wider">
                    {typeLabels[event.event_type] || event.event_type}
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {event.tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-mono bg-bg-secondary/50 text-text-dim rounded-full border border-border-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>
        </ScrollReveal>

        {/* Description */}
        <ScrollReveal delay={100}>
          <section className="mb-10">
            <TerminalWindow title={`cat events/${event.slug}/README.md`} variant="default">
              <div className="space-y-4">
                {descriptionParagraphs.map((paragraph: string, i: number) => (
                  <p key={i} className="text-text-secondary leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </TerminalWindow>
          </section>
        </ScrollReveal>

        {/* Agenda */}
        {agendaEntries && agendaEntries.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-6 font-mono text-xl font-semibold text-green-primary">
              <span className="text-text-dim">## </span>Agenda / Schedule
            </h2>
            <Timeline entries={agendaEntries} />
          </section>
        )}

        {/* Speakers */}
        {event.speakers && event.speakers.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-6 font-mono text-xl font-semibold text-green-primary">
              <span className="text-text-dim">## </span>Speakers
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {event.speakers.map((speaker: Speaker, i: number) => (
                <div key={i} className="border border-border-default bg-bg-card p-5">
                  <div className="flex items-start gap-4">
                    {speaker.photo ? (
                      <img
                        src={speaker.photo}
                        alt={speaker.name}
                        className="w-12 h-12 rounded-full object-cover border border-green-primary/30"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-green-primary/10 border border-green-primary/30 flex items-center justify-center">
                        <span className="font-mono text-lg font-bold text-green-primary">
                          {speaker.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-mono text-base font-bold text-text-primary">
                        {speaker.name}
                      </h3>
                      {speaker.title && (
                        <p className="font-mono text-xs text-amber mb-2">{speaker.title}</p>
                      )}
                      {speaker.bio && (
                        <p className="text-xs text-text-secondary line-clamp-2">{speaker.bio}</p>
                      )}
                      {speaker.social_links && (
                        <div className="flex items-center gap-2 mt-2">
                          {speaker.social_links.twitter && (
                            <a href={speaker.social_links.twitter} target="_blank" rel="noopener noreferrer" className="text-text-dim hover:text-green-primary">
                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.337-5.464 13.94 13.94 0 001.415-5.97c0-.21-.005-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                            </a>
                          )}
                          {speaker.social_links.linkedin && (
                            <a href={speaker.social_links.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-dim hover:text-green-primary">
                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                            </a>
                          )}
                          {speaker.social_links.github && (
                            <a href={speaker.social_links.github} target="_blank" rel="noopener noreferrer" className="text-text-dim hover:text-green-primary">
                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                            </a>
                          )}
                          {speaker.social_links.website && (
                            <a href={speaker.social_links.website} target="_blank" rel="noopener noreferrer" className="text-text-dim hover:text-green-primary">
                              <Globe className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Organizer Info */}
        <section className="mb-10 grid gap-4 sm:grid-cols-2">
          {event.organizer_name && (
            <div className="border border-border-default bg-bg-card p-5">
              <div className="mb-2 flex items-center gap-2 text-text-dim">
                <Building2 className="h-4 w-4" />
                <span className="font-mono text-xs uppercase tracking-wider">
                  Organized by
                </span>
              </div>
              <p className="font-sans text-text-primary">{event.organizer_name}</p>
              {event.organizer_email && (
                <a href={`mailto:${event.organizer_email}`} className="text-xs text-green-primary hover:underline mt-1 inline-block">
                  {event.organizer_email}
                </a>
              )}
              {event.organizer_phone && (
                <p className="text-xs text-text-dim mt-1">{event.organizer_phone}</p>
              )}
              {event.organizer_website && (
                <a href={event.organizer_website} target="_blank" rel="noopener noreferrer" className="text-xs text-green-primary hover:underline mt-1 inline-block">
                  Visit Website
                </a>
              )}
            </div>
          )}

          {/* Registration Info */}
          {(event.requires_registration || event.registration_url || event.registration_deadline) && (
            <div className="border border-border-default bg-bg-card p-5">
              <div className="mb-2 flex items-center gap-2 text-text-dim">
                <BookOpen className="h-4 w-4" />
                <span className="font-mono text-xs uppercase tracking-wider">
                  Registration
                </span>
              </div>
              {event.requires_registration && (
                <p className="text-sm text-text-primary mb-2">
                  {event.registration_url ? 'Registration required' : 'Registration required - contact organizer'}
                </p>
              )}
              {event.registration_deadline && (
                <p className="text-xs text-text-dim">
                  Deadline: {new Date(event.registration_deadline).toLocaleDateString()}
                </p>
              )}
              {event.max_attendees && (
                <p className="text-xs text-text-dim mt-1">
                  Capacity: {event.current_attendees || 0} / {event.max_attendees}
                </p>
              )}
              {event.ticket_price !== undefined && event.ticket_price > 0 && (
                <p className="text-xs text-text-dim mt-1">
                  Price: {event.currency || 'KES'} {event.ticket_price}
                </p>
              )}
            </div>
          )}
        </section>

        {/* Virtual Event Info */}
        {isVirtual && (event.meeting_link || event.online_platform) && (
          <section className="mb-10">
            <div className="border border-border-default bg-bg-card p-5">
              <div className="flex items-center gap-2 text-text-dim mb-3">
                <Video className="h-4 w-4" />
                <span className="font-mono text-xs uppercase tracking-wider">
                  Virtual Event Access
                </span>
              </div>
              {event.online_platform && (
                <p className="text-sm text-text-primary mb-2">Platform: {event.online_platform}</p>
              )}
              {event.meeting_link && (
                <a
                  href={event.meeting_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-primary hover:underline text-sm"
                >
                  <LinkIcon className="h-3 w-3" />
                  Join Meeting
                </a>
              )}
              {event.meeting_password && (
                <p className="text-xs text-text-dim mt-2">Password: {event.meeting_password}</p>
              )}
            </div>
          </section>
        )}

        {/* Prizes (for hackathons/competitions) */}
        {event.prizes && event.prizes.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 font-mono text-xl font-semibold text-green-primary">
              <span className="text-text-dim">## </span>Prizes & Awards
            </h2>
            <TerminalWindow title="prizes.md" variant="command">
              <ul className="space-y-3">
                {event.prizes.map((prize: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                    <span className="text-text-secondary">{prize}</span>
                  </li>
                ))}
              </ul>
            </TerminalWindow>
          </section>
        )}

        {/* Rules / Guidelines */}
        {event.prerequisites && event.prerequisites.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 font-mono text-xl font-semibold text-green-primary">
              <span className="text-text-dim">## </span>Prerequisites & Guidelines
            </h2>
            <TerminalWindow title="guidelines.md" variant="default">
              <ul className="space-y-2">
                {event.prerequisites.map((rule: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <Shield className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                    <span className="text-text-secondary text-sm">{rule}</span>
                  </li>
                ))}
              </ul>
            </TerminalWindow>
          </section>
        )}

        {/* Resources */}
        {event.resource_links && event.resource_links.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 font-mono text-xl font-semibold text-green-primary">
              <span className="text-text-dim">## </span>Resources
            </h2>
            <div className="border border-border-default bg-bg-card p-5">
              <ul className="space-y-2">
                {event.resource_links.map((link: string, i: number) => (
                  <li key={i}>
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-green-primary hover:underline text-sm flex items-center gap-2">
                      <Download className="h-3 w-3" />
                      {link.split('/').pop() || `Resource ${i + 1}`}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Target Audience */}
        {event.target_audience && event.target_audience.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 font-mono text-xl font-semibold text-green-primary">
              <span className="text-text-dim">## </span>Target Audience
            </h2>
            <div className="border border-border-default bg-bg-card p-5">
              <div className="flex flex-wrap gap-2">
                {event.target_audience.map((audience: string, i: number) => (
                  <span key={i} className="px-3 py-1 text-xs bg-bg-secondary/50 text-text-dim rounded-full">
                    {audience}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Topics */}
        {event.topics && event.topics.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 font-mono text-xl font-semibold text-green-primary">
              <span className="text-text-dim">## </span>Topics Covered
            </h2>
            <div className="border border-border-default bg-bg-card p-5">
              <div className="flex flex-wrap gap-2">
                {event.topics.map((topic: string, i: number) => (
                  <span key={i} className="px-3 py-1 text-xs bg-green-primary/10 text-green-primary rounded-full">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Highlights (for completed events) */}
        {event.status === "completed" && event.highlights && event.highlights.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 font-mono text-xl font-semibold text-green-primary">
              <span className="text-text-dim">## </span>Event Highlights
            </h2>
            <TerminalWindow title="highlights.log" variant="command">
              <ul className="space-y-3">
                {event.highlights.map((highlight: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-primary" />
                    <span className="text-text-secondary">{highlight}</span>
                  </li>
                ))}
              </ul>
              {event.feedback_form_url && (
                <div className="mt-4 pt-4 border-t border-border-default">
                  <a href={event.feedback_form_url} target="_blank" rel="noopener noreferrer" className="text-green-primary hover:underline text-sm">
                    Leave Feedback
                  </a>
                </div>
              )}
            </TerminalWindow>
          </section>
        )}

        {/* Gallery */}
        {event.gallery_images && event.gallery_images.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 font-mono text-xl font-semibold text-green-primary">
              <span className="text-text-dim">## </span>Gallery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {event.gallery_images.map((img: string, i: number) => (
                <a key={i} href={img} target="_blank" rel="noopener noreferrer" className="block aspect-square rounded-lg overflow-hidden border border-border-default hover:border-green-primary/30 transition-all">
                  <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Recordings / Presentations */}
        {(event.video_recording_url || event.presentation_slides_url) && (
          <section className="mb-10">
            <h2 className="mb-4 font-mono text-xl font-semibold text-green-primary">
              <span className="text-text-dim">## </span>Recordings & Materials
            </h2>
            <div className="border border-border-default bg-bg-card p-5">
              <div className="space-y-3">
                {event.video_recording_url && (
                  <a href={event.video_recording_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-primary hover:underline">
                    <Video className="h-4 w-4" />
                    Watch Recording
                  </a>
                )}
                {event.presentation_slides_url && (
                  <a href={event.presentation_slides_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-primary hover:underline">
                    <Download className="h-4 w-4" />
                    Download Slides
                  </a>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Social Links */}
        {event.social_links && Object.keys(event.social_links).length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 font-mono text-xl font-semibold text-green-primary">
              <span className="text-text-dim">## </span>Connect
            </h2>
            <div className="border border-border-default bg-bg-card p-5">
              <div className="flex flex-wrap gap-4">
                {event.social_links.twitter && (
                  <a href={event.social_links.twitter} target="_blank" rel="noopener noreferrer" className="text-text-dim hover:text-green-primary">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.337-5.464 13.94 13.94 0 001.415-5.97c0-.21-.005-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                  </a>
                )}
                {event.social_links.linkedin && (
                  <a href={event.social_links.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-dim hover:text-green-primary">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  </a>
                )}
                {event.social_links.github && (
                  <a href={event.social_links.github} target="_blank" rel="noopener noreferrer" className="text-text-dim hover:text-green-primary">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                  </a>
                )}
                {event.social_links.website && (
                  <a href={event.social_links.website} target="_blank" rel="noopener noreferrer" className="text-text-dim hover:text-green-primary">
                    <Globe className="h-5 w-5" />
                  </a>
                )}
              </div>
              {event.event_hashtag && (
                <p className="mt-3 text-sm text-text-dim">
                  Hashtag: <span className="text-green-primary">{event.event_hashtag}</span>
                </p>
              )}
            </div>
          </section>
        )}

        {/* Registration CTA */}
        {isActionable && event.registration_url && (
          <section className="mb-10">
            <a
              href={event.registration_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-green-primary bg-green-primary/10 px-8 py-4 font-mono text-base font-medium text-green-primary transition-all duration-200 hover:bg-green-primary hover:text-bg-primary rounded-lg"
            >
              <span aria-hidden="true">&gt;</span>
              Register Now
              {event.ticket_price === 0 && <span className="text-xs ml-2">(Free)</span>}
            </a>
          </section>
        )}

        {/* Share section */}
        <section className="border-t border-border-default pt-8">
          <h2 className="mb-4 font-mono text-sm uppercase tracking-wider text-text-dim">
            Share this event
          </h2>
          <div className="flex flex-wrap gap-3">
            <EventDetailClient eventUrl={eventUrl} />
            <a
              href={twitterShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border-default px-4 py-2 font-mono text-sm text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary rounded-lg"
              aria-label="Share on Twitter"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.337-5.464 13.94 13.94 0 001.415-5.97c0-.21-.005-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
              Twitter
            </a>
            <a
              href={linkedInShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border-default px-4 py-2 font-mono text-sm text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary rounded-lg"
              aria-label="Share on LinkedIn"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              LinkedIn
            </a>
            <a
              href={facebookShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border-default px-4 py-2 font-mono text-sm text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary rounded-lg"
              aria-label="Share on Facebook"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              Facebook
            </a>
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border-default px-4 py-2 font-mono text-sm text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary rounded-lg"
              aria-label="Share on WhatsApp"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.123 1.523 5.857L.532 23.04l5.316-1.392A11.937 11.937 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.844 0-3.63-.497-5.176-1.426l-.37-.22-3.156.828.844-3.083-.24-.385A9.945 9.945 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z" /></svg>
              WhatsApp
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
