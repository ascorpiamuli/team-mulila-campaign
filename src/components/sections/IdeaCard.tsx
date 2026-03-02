// components/sections/IdeaCard.tsx
"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { ProjectIdea } from "@/data/ideas";
import { cn } from "@/lib/utils";
import { 
  Lightbulb, 
  Clock, 
  Users, 
  MessageSquare, 
  GitPullRequest, 
  Calendar, 
  Tag,
  Server,
  Wifi,
  Banknote,
  CalendarClock,
  Box,
  ExternalLink
} from "lucide-react";

interface IdeaCardProps {
  idea: ProjectIdea;
  variant?: "default" | "compact";
}

const statusColors: Record<ProjectIdea["status"], string> = {
  "planning": "bg-blue-500/10 text-blue-500 border-blue-500/30",
  "in-progress": "bg-amber-500/10 text-amber-500 border-amber-500/30",
  "seeking-collaborators": "bg-green-primary/10 text-green-primary border-green-primary/30",
  "on-hold": "bg-text-dim/10 text-text-dim border-text-dim/30",
  "almost-complete": "bg-purple-500/10 text-purple-500 border-purple-500/30",
  "started": "bg-amber-500/10 text-amber-500 border-amber-500/30",
};

const statusLabels: Record<ProjectIdea["status"], string> = {
  "planning": "Planning",
  "in-progress": "In Progress",
  "seeking-collaborators": "Seeking Collaborators",
  "on-hold": "On Hold",
  "almost-complete": "Almost Complete 🎯",
  "started": "Started 🚀",
};
const complexityIcons = {
  "beginner": "🌱",
  "intermediate": "🌿", 
  "advanced": "🌳",
};

const categoryIcons = {
  "web": Server,
  "mobile": Server,
  "api": Server,
  "tool": Server,
  "ai": Server,
  "automation": Server,
  "opensource": Server,
  "isp": Wifi,
  "fintech": Banknote,
  "scheduling": CalendarClock,
};

export function IdeaCard({ idea, variant = "default" }: IdeaCardProps) {
  const CategoryIcon = categoryIcons[idea.category as keyof typeof categoryIcons] || Server;

  // Handle Docker link click without triggering the parent Link
  const handleDockerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="relative group">
      <Link
        href={`/ideas/${idea.slug}`}
        className="block h-full"
        aria-label={`${idea.title} — ${statusLabels[idea.status]}`}
      >
        <div
          className={cn(
            "border border-border-default bg-bg-card transition-all duration-300 h-full",
            "hover:border-border-hover hover:-translate-y-1",
            "hover:shadow-[0_8px_30px_rgba(0,255,65,0.12)]",
            idea.status === "seeking-collaborators" && "border-green-primary/20 hover:border-green-primary/40"
          )}
        >
          {/* Header with category icon */}
          <div className="flex items-center justify-between border-b border-border-default px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-primary" />
              </div>
              <span className="ml-1 font-mono text-xs text-text-dim truncate max-w-[120px]">
                {idea.slug}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Complexity indicator */}
              <div className="flex items-center gap-1 text-text-dim" title={`${idea.complexity} complexity`}>
                <span className="text-xs">{complexityIcons[idea.complexity]}</span>
              </div>
              {/* Category icon */}
              <CategoryIcon className="h-3.5 w-3.5 text-text-dim" />
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Status and timeline row */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="default" className={cn("border text-xs", statusColors[idea.status])}>
                {statusLabels[idea.status]}
              </Badge>
              
              {idea.estimatedTimeline && (
                <div className="flex items-center gap-1 text-text-dim bg-bg-secondary/50 px-2 py-0.5 rounded-full">
                  <Clock className="h-3 w-3" />
                  <span className="font-mono text-xs">{idea.estimatedTimeline}</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="mb-2 font-mono text-lg font-semibold text-green-primary group-hover:text-amber transition-colors duration-200 line-clamp-1">
              {idea.title}
            </h3>

            {/* Description */}
            <p className="mb-3 text-sm text-text-secondary line-clamp-2">
              {idea.description}
            </p>

            {/* Tech stack */}
            <div className="mb-3 flex flex-wrap gap-1.5">
              {idea.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[9px] font-mono border border-border-default rounded bg-bg-secondary/50 text-text-dim"
                >
                  {tech}
                </span>
              ))}
              {idea.technologies.length > 4 && (
                <span className="px-2 py-0.5 text-[9px] font-mono text-text-dim">
                  +{idea.technologies.length - 4}
                </span>
              )}
            </div>

            {/* Problem statement */}
            <div className="mb-3 text-xs text-text-secondary bg-bg-secondary/30 p-2 rounded border border-border-default">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-3.5 w-3.5 text-amber flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{idea.problem}</span>
              </div>
            </div>

            {/* Docker images if available - FIXED: Using span instead of a to avoid nested links */}
            {idea.dockerImages && idea.dockerImages.length > 0 && (
              <div className="mb-3 flex items-center gap-2">
                <Box className="h-3.5 w-3.5 text-blue-400 flex-shrink-0" />
                <div className="flex flex-wrap gap-1">
                  {idea.dockerImages.map((img, idx) => (
                    <span
                      key={idx}
                      onClick={handleDockerClick}
                      className="text-[9px] font-mono bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/30 cursor-default"
                      title={`Docker image: ${img}`}
                    >
                      {img.split('/').pop()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons - FIXED: Using button for GitHub links to avoid nested anchors */}
            <div className="flex items-center gap-3 mt-4 pt-2 border-t border-border-default">
              {/* GitHub link - using button with onClick */}
              {idea.githubUrl && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(idea.githubUrl, '_blank', 'noopener,noreferrer');
                  }}
                  className="flex items-center gap-1 text-xs font-mono text-text-dim hover:text-green-primary transition-colors bg-transparent border-none cursor-pointer"
                  aria-label={`View ${idea.title} on GitHub`}
                >
                  <GitPullRequest className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                </button>
              )}
              
              {/* Discussion link - using button with onClick */}
              {idea.discussionUrl && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(idea.discussionUrl, '_blank', 'noopener,noreferrer');
                  }}
                  className="flex items-center gap-1 text-xs font-mono text-text-dim hover:text-green-primary transition-colors bg-transparent border-none cursor-pointer"
                  aria-label={`Discuss ${idea.title}`}
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>Discuss</span>
                </button>
              )}

              {/* Collaborators needed indicator */}
              {idea.seekingCollaborators && (
                <div className="flex items-center gap-1 text-green-primary ml-auto" title="Seeking collaborators">
                  <Users className="h-3.5 w-3.5" />
                  <span className="font-mono text-xs hidden sm:inline">Join</span>
                </div>
              )}
              
              <span className="ml-auto font-mono text-xs text-green-primary group-hover:text-amber transition-colors">
                details →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}