// components/sections/TeamMemberCard.tsx
"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Linkedin, Github, Twitter, Globe, Mail, MapPin, Award } from "lucide-react";
import type { TeamMember } from "@/types/team";

interface TeamMemberCardProps {
  member: TeamMember;
  variant?: "default" | "compact" | "featured";
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function TeamMemberCard({ member, variant = "default" }: TeamMemberCardProps) {
  const hasSocials = member.linkedin || member.github || member.twitter || member.website;
  const location = member.city || member.location || member.country;
  const isLead = member.is_lead || member.role === 'lead' || member.role === 'founder';

  if (variant === "compact") {
    return (
      <Link href={`/team/${member.slug}`} className="block group">
        <div className="border border-border-default bg-bg-card rounded-lg p-4 hover:border-green-primary/30 transition-all duration-200 hover:-translate-y-0.5">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            {member.avatar_url ? (
              <img 
                src={member.avatar_url} 
                alt={member.name}
                className="h-10 w-10 rounded-full border border-green-primary/30 object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-green-primary/30 bg-green-primary/10">
                <span className="font-mono text-sm font-bold text-green-primary">
                  {getInitials(member.name)}
                </span>
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-mono text-sm font-semibold text-green-primary group-hover:text-amber truncate">
                  {member.name}
                </h4>
                {isLead && (
                  <span className="text-[8px] px-1.5 py-0.5 bg-amber/10 text-amber rounded-full">
                    LEAD
                  </span>
                )}
              </div>
              <p className="font-mono text-xs text-text-dim truncate">
                {member.title}
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link href={`/team/${member.slug}`} className="block group h-full">
        <div className="h-full border border-border-default bg-bg-card rounded-xl overflow-hidden hover:border-green-primary/30 transition-all duration-300 hover:-translate-y-1">
          {/* Header with gradient */}
          <div className="relative h-24 bg-gradient-to-r from-green-primary/20 to-amber/20">
            {member.avatar_url ? (
              <div className="absolute -bottom-8 left-6">
                <img 
                  src={member.avatar_url} 
                  alt={member.name}
                  className="h-16 w-16 rounded-full border-2 border-bg-card object-cover"
                />
              </div>
            ) : (
              <div className="absolute -bottom-8 left-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-bg-card bg-green-primary/20">
                <span className="font-mono text-xl font-bold text-green-primary">
                  {getInitials(member.name)}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="pt-10 p-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-mono text-lg font-bold text-green-primary group-hover:text-amber">
                  {member.name}
                </h3>
                <p className="font-mono text-sm text-amber">{member.title}</p>
              </div>
              {member.is_mentor && (
                <span className="text-[10px] px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  Mentor
                </span>
              )}
            </div>

            {/* Bio */}
            {member.bio && (
              <p className="text-sm text-text-secondary mb-4 line-clamp-3">
                {member.bio}
              </p>
            )}

            {/* Skills */}
            {member.skills && member.skills.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-1.5">
                {member.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 text-[9px] font-mono bg-bg-secondary/50 text-text-dim rounded-full border border-border-default"
                  >
                    {skill}
                  </span>
                ))}
                {member.skills.length > 3 && (
                  <span className="px-2 py-0.5 text-[9px] font-mono text-text-dim">
                    +{member.skills.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Location */}
            {location && (
              <div className="flex items-center gap-1.5 text-xs text-text-dim mb-3">
                <MapPin className="h-3.5 w-3.5" />
                <span className="font-mono text-[10px]">{location}</span>
              </div>
            )}

            {/* Social links */}
            {hasSocials && (
              <div className="flex items-center gap-3 pt-3 border-t border-border-default">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-text-dim hover:text-green-primary transition-colors"
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-text-dim hover:text-green-primary transition-colors"
                    aria-label={`${member.name} on GitHub`}
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
                {member.twitter && (
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-text-dim hover:text-green-primary transition-colors"
                    aria-label={`${member.name} on Twitter`}
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                )}
                {member.website && (
                  <a
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-text-dim hover:text-green-primary transition-colors"
                    aria-label={`${member.name}'s website`}
                  >
                    <Globe className="h-4 w-4" />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-text-dim hover:text-green-primary transition-colors ml-auto"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={`/team/${member.slug}`} className="block group h-full">
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
          <span className="ml-2 font-mono text-xs text-text-dim">
            team/{member.slug || member.id}
          </span>
          {member.is_core && (
            <span className="ml-auto text-[8px] px-1.5 py-0.5 bg-green-primary/10 text-green-primary rounded-full">
              CORE
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Avatar + Name */}
          <div className="mb-4 flex items-center gap-4">
            {/* Avatar */}
            {member.avatar_url ? (
              <img 
                src={member.avatar_url} 
                alt={member.name}
                className="h-14 w-14 rounded-full border border-green-primary/30 object-cover"
              />
            ) : (
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-green-primary/30 bg-green-primary/10"
                aria-hidden="true"
              >
                <span className="font-mono text-lg font-bold text-green-primary">
                  {getInitials(member.name)}
                </span>
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h3 className="font-mono text-base font-semibold text-green-primary group-hover:text-amber truncate">
                {member.name}
              </h3>
              <p className="font-mono text-xs text-amber truncate">{member.title}</p>
              
              {/* Location */}
              {location && (
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3 text-text-dim" />
                  <span className="font-mono text-[9px] text-text-dim truncate">
                    {location}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Bio */}
          {member.bio && (
            <p className="mb-4 text-sm text-text-secondary leading-relaxed line-clamp-3">
              {member.bio}
            </p>
          )}

          {/* Skills */}
          {member.skills && member.skills.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {member.skills.slice(0, 4).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 text-[9px] font-mono bg-bg-secondary/50 text-text-dim rounded-full border border-border-default"
                >
                  {skill}
                </span>
              ))}
              {member.skills.length > 4 && (
                <span className="px-2 py-0.5 text-[9px] font-mono text-text-dim">
                  +{member.skills.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Social links */}
          {hasSocials && (
            <div className="flex items-center gap-3 border-t border-border-default pt-3">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-text-dim hover:text-green-primary transition-colors"
                  aria-label={`${member.name} on LinkedIn`}
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-text-dim hover:text-green-primary transition-colors"
                  aria-label={`${member.name} on GitHub`}
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {member.twitter && (
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-text-dim hover:text-green-primary transition-colors"
                  aria-label={`${member.name} on Twitter`}
                >
                  <Twitter className="h-4 w-4" />
                </a>
              )}
              {member.website && (
                <a
                  href={member.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-text-dim hover:text-green-primary transition-colors"
                  aria-label={`${member.name}'s website`}
                >
                  <Globe className="h-4 w-4" />
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-text-dim hover:text-green-primary transition-colors ml-auto"
                  aria-label={`Email ${member.name}`}
                >
                  <Mail className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}