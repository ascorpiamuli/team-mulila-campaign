// components/sections/EventCard.tsx
"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { Calendar, MapPin, Clock, Tag, Users, Video, ChevronRight } from "lucide-react";

interface EventCardProps {
  event: AppEvent;
  variant?: "default" | "compact" | "featured";
}

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

export function EventCard({ event, variant = "default" }: EventCardProps) {
  const startDate = new Date(event.start_date);
  const endDate = new Date(event.end_date);
  
  const formattedDate = startDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  const formattedTime = startDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  const isUpcoming = event.status === "upcoming" || event.status === "ongoing";
  const location = event.venue_city || event.venue_name || (event.is_virtual ? 'Virtual' : 'TBD');
  const attendeesCount = event.current_attendees || 0;
  const maxAttendees = event.max_attendees;

  if (variant === "compact") {
    return (
      <Link href={`/events/${event.slug}`} className="block group">
        <div className="border border-border-default bg-bg-card rounded-lg p-4 hover:border-green-primary/30 transition-all duration-200 hover:-translate-y-0.5">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-mono text-sm font-semibold text-green-primary group-hover:text-amber line-clamp-1">
              {event.title}
            </h4>
            <span className={cn("text-[8px] px-1.5 py-0.5 rounded-full border", statusColors[event.status])}>
              {statusLabels[event.status]}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] font-mono text-text-dim mb-2">
            <Calendar className="h-3 w-3" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] font-mono text-text-dim">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link href={`/events/${event.slug}`} className="block group h-full">
        <div className="h-full border border-border-default bg-bg-card rounded-xl overflow-hidden hover:border-green-primary/30 transition-all duration-300 hover:-translate-y-1">
          {/* Header with gradient */}
          <div className="relative h-32 bg-gradient-to-r from-green-primary/20 to-amber/20 p-6">
            <div className="absolute top-4 right-4">
              <span className={cn("px-3 py-1 text-xs font-mono rounded-full border", statusColors[event.status])}>
                {statusLabels[event.status]}
              </span>
            </div>
            
            <div className="absolute bottom-4 left-6">
              <h3 className="font-mono text-xl font-bold text-green-primary group-hover:text-amber mb-1">
                {event.title}
              </h3>
              <p className="text-sm text-text-secondary line-clamp-1">
                {event.description}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Date and time */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-text-dim">
                <Calendar className="h-4 w-4 text-green-primary" />
                <div>
                  <div className="font-mono text-xs text-text-dim">Date</div>
                  <div className="font-mono text-sm text-text-primary">{formattedDate}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-text-dim">
                <Clock className="h-4 w-4 text-green-primary" />
                <div>
                  <div className="font-mono text-xs text-text-dim">Time</div>
                  <div className="font-mono text-sm text-text-primary">{formattedTime}</div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 mb-4">
              {event.is_virtual ? (
                <Video className="h-4 w-4 text-green-primary" />
              ) : (
                <MapPin className="h-4 w-4 text-green-primary" />
              )}
              <div>
                <div className="font-mono text-xs text-text-dim">Location</div>
                <div className="font-mono text-sm text-text-primary">
                  {event.is_virtual ? event.online_platform || 'Virtual Event' : location}
                  {event.venue_name && !event.is_virtual && (
                    <span className="text-text-dim text-xs ml-1">— {event.venue_name}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Attendees */}
            {maxAttendees && (
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-4 w-4 text-green-primary" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-text-dim">Attendees</span>
                    <span className="font-mono text-xs text-text-primary">
                      {attendeesCount}/{maxAttendees}
                    </span>
                  </div>
                  <div className="w-full h-1 bg-bg-secondary rounded-full mt-1">
                    <div 
                      className="h-full bg-green-primary rounded-full"
                      style={{ width: `${(attendeesCount / maxAttendees) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {event.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-[9px] font-mono px-2 py-0.5 bg-bg-secondary/50 text-text-dim rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-border-default">
              <span className="font-mono text-xs text-text-dim">
                by {event.organizer_name}
              </span>
              <div className="flex items-center gap-1 text-green-primary group-hover:text-amber">
                <span className="font-mono text-sm">
                  {event.requires_registration ? 'Register' : 'View Details'}
                </span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group block h-full"
      aria-label={`${event.title} — ${statusLabels[event.status]}`}
    >
      <div
        className={cn(
          "h-full border border-border-default bg-bg-card transition-all duration-300",
          "hover:border-border-hover hover:-translate-y-0.5",
          "hover:shadow-[0_4px_20px_rgba(0,255,65,0.08)]"
        )}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-border-default px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-primary" />
          </div>
          <span className="ml-2 font-mono text-xs text-text-dim truncate">
            event/{event.slug}
          </span>
          {event.is_featured && (
            <span className="ml-auto text-[8px] px-1.5 py-0.5 bg-amber/10 text-amber rounded-full">
              FEATURED
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Status badge */}
          <div className="mb-3">
            <Badge variant="default" className={cn("text-xs", statusColors[event.status])}>
              {statusLabels[event.status]}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="mb-3 font-mono text-lg font-semibold text-green-primary group-hover:text-amber transition-colors duration-200 line-clamp-2">
            {event.title}
          </h3>

          {/* Meta info */}
          <div className="mb-4 space-y-2 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-text-dim shrink-0" />
              <span className="font-mono text-xs">{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-text-dim shrink-0" />
              <span className="font-mono text-xs">{formattedTime}</span>
            </div>
            <div className="flex items-center gap-2">
              {event.is_virtual ? (
                <Video className="h-4 w-4 text-text-dim shrink-0" />
              ) : (
                <MapPin className="h-4 w-4 text-text-dim shrink-0" />
              )}
              <span className="font-mono text-xs line-clamp-1">
                {event.is_virtual ? event.online_platform || 'Virtual' : location}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="mb-4 text-sm text-text-secondary line-clamp-2">
            {event.description}
          </p>

          {/* Type tag */}
          <div className="mb-4 flex items-center gap-2">
            <Tag className="h-3.5 w-3.5 text-text-dim shrink-0" />
            <span className="font-mono text-xs uppercase tracking-wider text-text-dim">
              {event.event_type ? event.event_type.replace('-', ' ') : 'event'}
            </span>
          </div>

          {/* Registration indicator */}
          {event.requires_registration && isUpcoming && (
            <div className="mb-3">
              <span className="text-[9px] font-mono px-2 py-1 bg-green-primary/10 text-green-primary rounded-full">
                Registration {event.registration_url ? 'Open' : 'Required'}
              </span>
            </div>
          )}

          {/* CTA */}
          <div className="font-mono text-sm font-medium text-green-primary group-hover:text-amber transition-colors duration-200">
            <span className="text-text-dim">&gt; </span>
            {isUpcoming ? 'Register' : 'View Recap'} →
          </div>
        </div>
      </div>
    </Link>
  );
}

// Skeleton loader
export function EventCardSkeleton() {
  return (
    <div className="border border-border-default bg-bg-card p-6 animate-pulse">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-2 w-2 rounded-full bg-bg-secondary" />
        <div className="h-2 w-2 rounded-full bg-bg-secondary" />
        <div className="h-2 w-2 rounded-full bg-bg-secondary" />
        <div className="h-4 w-24 bg-bg-secondary rounded ml-2" />
      </div>
      <div className="h-5 w-3/4 bg-bg-secondary rounded mb-3" />
      <div className="space-y-2 mb-4">
        <div className="h-4 w-full bg-bg-secondary rounded" />
        <div className="h-4 w-full bg-bg-secondary rounded" />
        <div className="h-4 w-2/3 bg-bg-secondary rounded" />
      </div>
      <div className="h-4 w-20 bg-bg-secondary rounded" />
    </div>
  );
}