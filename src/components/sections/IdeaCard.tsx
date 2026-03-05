// components/sections/IdeaCard.tsx
"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { 
  Github, 
  MessageSquare, 
  Users, 
  ChevronRight,
  Clock,
  Calendar,
  Tag
} from "lucide-react";
import { useState } from "react";

// Project from projects table
interface Project {
  id: string;
  name: string;
  builder: string;
  description: string;
  stack: string[];
  status: "live" | "in-production" | "in-development" | "completed" | null;
  demo_url?: string;
  repo_url?: string;
  featured: boolean;
  client?: string;
  year?: number;
  highlights?: string[];
  is_open_source?: boolean;
  seeking_contributors?: boolean;
}

// ProjectIdea from project_ideas table
interface ProjectIdea {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: "planning" | "in-progress" | "seeking-collaborators" | "on-hold" | "almost-complete" | "started";
  seeking_collaborators: boolean;
  estimated_timeline?: string;
  category: string;
  github_url?: string;
  discussion_url?: string;
  collaborators_needed?: string[];
  priority: "low" | "medium" | "high";
  date_added: string;
}

interface IdeaCardProps {
  project: Project | ProjectIdea;
  variant?: "default" | "compact" | "featured";
}

// Status colors for different project types
const statusColors: Record<string, string> = {
  // Project statuses
  "live": "bg-green-500/10 text-green-500 border-green-500/30",
  "in-production": "bg-blue-500/10 text-blue-500 border-blue-500/30",
  "in-development": "bg-amber-500/10 text-amber-500 border-amber-500/30",
  "completed": "bg-purple-500/10 text-purple-500 border-purple-500/30",
  // Idea statuses
  "planning": "bg-blue-500/10 text-blue-500 border-blue-500/30",
  "in-progress": "bg-amber-500/10 text-amber-500 border-amber-500/30",
  "seeking-collaborators": "bg-green-primary/10 text-green-primary border-green-primary/30",
  "on-hold": "bg-text-dim/10 text-text-dim border-text-dim/30",
  "almost-complete": "bg-purple-500/10 text-purple-500 border-purple-500/30",
  "started": "bg-amber-500/10 text-amber-500 border-amber-500/30",
};

const statusLabels: Record<string, string> = {
  // Project statuses
  "live": "Live 🚀",
  "in-production": "In Production",
  "in-development": "In Development",
  "completed": "Completed ✓",
  // Idea statuses
  "planning": "Planning",
  "in-progress": "In Progress",
  "seeking-collaborators": "Seeking Collaborators",
  "on-hold": "On Hold",
  "almost-complete": "Almost Complete 🎯",
  "started": "Started 🚀",
};

// Helper component for social links that stops event propagation
const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className="p-2 text-text-dim hover:text-green-primary transition-colors rounded-lg hover:bg-green-primary/5"
      aria-label={label}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
};

export function IdeaCard({ project, variant = "default" }: IdeaCardProps) {
  // Determine if this is a Project or ProjectIdea
  const isProject = 'name' in project;
  const isIdea = 'title' in project;
  
  // Get the display name
  const displayName = isProject ? project.name : (isIdea ? (project as ProjectIdea).title : '');
  
  // Get the builder/creator
  const builder = isProject ? (project as Project).builder : 'Stephen Muli';
  
  // Get the description
  const description = project.description;
  
  // Get the technologies/stack
  const technologies = isProject 
    ? (project as Project).stack || [] 
    : (project as ProjectIdea).technologies || [];
  
  // Get the status
  const status = project.status || 'planning';
  
  // Check if seeking contributors
  const isSeekingContributors = isProject 
    ? (project as Project).seeking_contributors 
    : (project as ProjectIdea).seeking_collaborators;
  
  // Get the year/date
  const year = isProject ? (project as Project).year : null;
  
  // Get category/priority for ideas
  const category = isIdea ? (project as ProjectIdea).category : null;
  const priority = isIdea ? (project as ProjectIdea).priority : null;
  
  // Get GitHub URL
  const githubUrl = isProject 
    ? (project as Project).repo_url 
    : (project as ProjectIdea).github_url;
  
  // Get discussion URL
  const discussionUrl = isIdea ? (project as ProjectIdea).discussion_url : null;
  
  // Get collaborators needed
  const collaboratorsNeeded = isIdea ? (project as ProjectIdea).collaborators_needed : null;
  
  // Get the detail URL
  const detailUrl = isProject ? `/projects/${project.id}` : `/ideas/${project.id}`;

  // Compact variant - smaller card for sidebars
  if (variant === "compact") {
    return (
      <Link href={detailUrl} className="block group">
        <div className="border border-border-default bg-bg-card rounded-lg p-4 hover:border-green-primary/30 transition-all duration-200 hover:-translate-y-0.5">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-mono text-base font-semibold text-green-primary group-hover:text-amber line-clamp-1">
              {displayName}
            </h4>
            <span className={cn("text-[9px] px-1.5 py-0.5 rounded-full", statusColors[status])}>
              {statusLabels[status]}
            </span>
          </div>
          <p className="text-sm text-text-secondary line-clamp-2 mb-3">
            {description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-text-dim">
              {isProject ? `by ${builder}` : 'idea'}
            </span>
            <ChevronRight className="h-4 w-4 text-green-primary group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </Link>
    );
  }

  // Featured variant - larger, more prominent card
  if (variant === "featured") {
    return (
      <div className="relative group h-full">
        <Link href={detailUrl} className="block h-full">
          <div className={cn(
            "h-full border-2 border-border-default bg-gradient-to-br from-bg-card to-bg-secondary/50 rounded-2xl overflow-hidden",
            "hover:border-green-primary/40 hover:-translate-y-1 transition-all duration-300",
            "hover:shadow-[0_12px_40px_rgba(0,255,65,0.15)]",
            isSeekingContributors && "border-green-primary/30"
          )}>
            {/* Header with gradient */}
            <div className={cn(
              "h-2 w-full",
              status === "live" && "bg-gradient-to-r from-green-500 to-green-400",
              status === "seeking-collaborators" && "bg-gradient-to-r from-green-primary to-amber",
              status === "planning" && "bg-gradient-to-r from-blue-500 to-blue-400",
              status === "in-progress" && "bg-gradient-to-r from-amber-500 to-amber-400",
              !status && "bg-border-default"
            )} />
            
            <div className="p-8">
              {/* Header with status and metadata */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className={cn("text-xs px-3 py-1", statusColors[status])}>
                    {statusLabels[status]}
                  </Badge>
                  {priority && (
                    <span className={cn(
                      "text-[10px] px-2 py-1 rounded-full font-mono",
                      priority === "high" && "bg-red/10 text-red border border-red/30",
                      priority === "medium" && "bg-amber/10 text-amber border border-amber/30",
                      priority === "low" && "bg-blue-500/10 text-blue-500 border border-blue-500/30"
                    )}>
                      {priority.toUpperCase()} PRIORITY
                    </span>
                  )}
                </div>
                {year && (
                  <span className="text-sm font-mono text-text-dim bg-bg-secondary/50 px-3 py-1 rounded-full">
                    {year}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-mono text-2xl font-bold text-green-primary group-hover:text-amber transition-colors mb-3 line-clamp-2">
                {displayName}
              </h3>

              {/* Builder/Creator */}
              {isProject && (
                <p className="text-sm font-mono text-text-dim mb-4">
                  by {builder}
                </p>
              )}

              {/* Description */}
              <p className="text-base text-text-secondary leading-relaxed mb-6 line-clamp-3">
                {description}
              </p>

              {/* Tech stack - larger */}
              {technologies.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs font-mono text-text-dim mb-2">Technologies:</p>
                  <div className="flex flex-wrap gap-2">
                    {technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-mono bg-bg-secondary/50 text-text-dim rounded-full border border-border-default"
                      >
                        {tech}
                      </span>
                    ))}
                    {technologies.length > 5 && (
                      <span className="px-3 py-1 text-xs font-mono text-text-dim">
                        +{technologies.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Additional metadata for ideas */}
              {isIdea && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {category && (
                    <div className="flex items-center gap-2 text-sm text-text-dim">
                      <Tag className="h-4 w-4" />
                      <span className="font-mono">{category}</span>
                    </div>
                  )}
                  {(project as ProjectIdea).estimated_timeline && (
                    <div className="flex items-center gap-2 text-sm text-text-dim">
                      <Calendar className="h-4 w-4" />
                      <span className="font-mono">{(project as ProjectIdea).estimated_timeline}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Collaborators needed */}
              {collaboratorsNeeded && collaboratorsNeeded.length > 0 && (
                <div className="mb-6 p-4 bg-green-primary/5 border border-green-primary/20 rounded-lg">
                  <p className="text-xs font-mono text-green-primary mb-2">Looking for:</p>
                  <div className="flex flex-wrap gap-2">
                    {collaboratorsNeeded.slice(0, 3).map((role) => (
                      <span key={role} className="text-xs px-3 py-1 bg-green-primary/10 text-green-primary rounded-full">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer with actions */}
              <div className="flex items-center justify-between pt-6 border-t border-border-default">
                <div className="flex items-center gap-4">
                  {githubUrl && (
                    <SocialLink 
                      href={githubUrl} 
                      icon={Github} 
                      label="GitHub repository" 
                    />
                  )}
                  {discussionUrl && (
                    <SocialLink 
                      href={discussionUrl} 
                      icon={MessageSquare} 
                      label="Discussion" 
                    />
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {isSeekingContributors && (
                    <div className="flex items-center gap-2 text-green-primary">
                      <Users className="h-5 w-5" />
                      <span className="text-sm font-mono hidden sm:inline">Contributors needed</span>
                    </div>
                  )}
                  <span className="flex items-center gap-2 text-green-primary group-hover:text-amber transition-colors">
                    <span className="font-mono text-sm">View details</span>
                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  // Default variant - medium sized, good balance
  return (
    <div className="relative group h-full">
      <Link
        href={detailUrl}
        className="block h-full"
        aria-label={displayName}
      >
        <div
          className={cn(
            "h-full border border-border-default bg-bg-card rounded-xl transition-all duration-300",
            "hover:border-border-hover hover:-translate-y-1",
            "hover:shadow-[0_8px_30px_rgba(0,255,65,0.12)]",
            isSeekingContributors && "border-green-primary/20 hover:border-green-primary/40"
          )}
        >
          {/* Top accent bar */}
          <div className={cn(
            "h-1.5 w-full rounded-t-xl",
            status === "live" && "bg-green-500",
            status === "in-development" && "bg-amber-500",
            status === "completed" && "bg-purple-500",
            status === "planning" && "bg-blue-500",
            status === "seeking-collaborators" && "bg-green-primary",
            !status && "bg-border-default"
          )} />

          {/* Content */}
          <div className="p-6">
            {/* Header with status */}
            <div className="flex items-start justify-between mb-3">
              <Badge variant="default" className={cn("text-xs px-3 py-1", statusColors[status])}>
                {statusLabels[status]}
              </Badge>
              {priority && (
                <span className={cn(
                  "text-[9px] px-2 py-1 rounded-full font-mono",
                  priority === "high" && "bg-red/10 text-red",
                  priority === "medium" && "bg-amber/10 text-amber",
                  priority === "low" && "bg-blue-500/10 text-blue-500"
                )}>
                  {priority}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="font-mono text-xl font-bold text-green-primary group-hover:text-amber transition-colors mb-2 line-clamp-2">
              {displayName}
            </h3>

            {/* Builder/Creator */}
            {isProject && (
              <p className="text-sm font-mono text-text-dim mb-3">
                by {builder}
              </p>
            )}

            {/* Metadata row */}
            <div className="flex items-center gap-3 mb-4 text-sm text-text-dim">
              {year && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span className="font-mono text-xs">{year}</span>
                </div>
              )}
              {isIdea && (project as ProjectIdea).estimated_timeline && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="font-mono text-xs">{(project as ProjectIdea).estimated_timeline}</span>
                </div>
              )}
              {category && (
                <div className="flex items-center gap-1">
                  <Tag className="h-3.5 w-3.5" />
                  <span className="font-mono text-xs">{category}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-base text-text-secondary mb-5 line-clamp-3">
              {description}
            </p>

            {/* Tech stack */}
            {technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-mono bg-bg-secondary/50 text-text-dim rounded-full border border-border-default"
                  >
                    {tech}
                  </span>
                ))}
                {technologies.length > 4 && (
                  <span className="px-3 py-1 text-xs font-mono text-text-dim">
                    +{technologies.length - 4}
                  </span>
                )}
              </div>
            )}

            {/* Collaborators needed preview */}
            {collaboratorsNeeded && collaboratorsNeeded.length > 0 && (
              <div className="mb-5 flex flex-wrap gap-2">
                {collaboratorsNeeded.slice(0, 2).map((role) => (
                  <span key={role} className="text-xs px-3 py-1 bg-green-primary/10 text-green-primary rounded-full">
                    {role}
                  </span>
                ))}
                {collaboratorsNeeded.length > 2 && (
                  <span className="text-xs px-3 py-1 text-text-dim">
                    +{collaboratorsNeeded.length - 2} roles
                  </span>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-border-default">
              <div className="flex items-center gap-3">
                {githubUrl && (
                  <SocialLink 
                    href={githubUrl} 
                    icon={Github} 
                    label="GitHub repository" 
                  />
                )}
                {discussionUrl && (
                  <SocialLink 
                    href={discussionUrl} 
                    icon={MessageSquare} 
                    label="Discussion" 
                  />
                )}
              </div>

              <div className="flex items-center gap-3">
                {isSeekingContributors && (
                  <div className="flex items-center gap-1 text-green-primary">
                    <Users className="h-4 w-4" />
                    <span className="text-xs font-mono hidden sm:inline">Join</span>
                  </div>
                )}
                <ChevronRight className="h-5 w-5 text-green-primary group-hover:text-amber transition-colors group-hover:translate-x-1 duration-200" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}