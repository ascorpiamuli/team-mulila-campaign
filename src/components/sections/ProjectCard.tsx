// components/sections/ProjectCard.tsx
"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { Github, Users, ChevronRight, Globe } from "lucide-react";


interface ProjectCardProps {
  project: Project;
  variant?: "default" | "compact";
}

const statusColors: Record<string, string> = {
  "live": "bg-green-500/10 text-green-500 border-green-500/30",
  "in-production": "bg-blue-500/10 text-blue-500 border-blue-500/30",
  "in-development": "bg-amber-500/10 text-amber-500 border-amber-500/30",
  "completed": "bg-purple-500/10 text-purple-500 border-purple-500/30",
};

const statusLabels: Record<string, string> = {
  "live": "Live 🚀",
  "in-production": "In Production",
  "in-development": "In Development",
  "completed": "Completed ✓",
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
      className="text-text-dim hover:text-green-primary transition-colors p-1 rounded-lg hover:bg-green-primary/5"
      aria-label={label}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
};

export function ProjectCard({ project, variant = "default" }: ProjectCardProps) {
  if (variant === "compact") {
    return (
      <Link href={`/projects/${project.id}`} className="block group">
        <div className="border border-border-default bg-bg-card rounded-lg p-4 hover:border-green-primary/30 transition-all duration-200 hover:-translate-y-0.5">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-mono text-sm font-semibold text-green-primary group-hover:text-amber line-clamp-1">
              {project.name}
            </h4>
            {project.seeking_contributors && (
              <span className="text-[8px] px-1.5 py-0.5 bg-green-primary/10 text-green-primary rounded-full flex items-center gap-1">
                <Users className="h-2.5 w-2.5" />
                Help wanted
              </span>
            )}
          </div>
          <p className="text-xs text-text-secondary line-clamp-2 mb-2">
            {project.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono text-text-dim">
              by {project.builder} {project.year && `· ${project.year}`}
            </span>
            <ChevronRight className="h-3 w-3 text-green-primary group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={`/projects/${project.id}`} className="block group h-full">
      <div className={cn(
        "h-full border border-border-default bg-bg-card rounded-lg overflow-hidden",
        "hover:border-green-primary/30 hover:-translate-y-1 transition-all duration-200",
        "hover:shadow-[0_8px_30px_rgba(0,255,65,0.12)]"
      )}>
        {/* Top accent bar */}
        <div className={cn(
          "h-1.5 w-full",
          project.status === "live" && "bg-green-500",
          project.status === "in-development" && "bg-amber-500",
          project.status === "completed" && "bg-purple-500",
          !project.status && "bg-border-default"
        )} />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-mono text-xl font-bold text-green-primary group-hover:text-amber line-clamp-1">
              {project.name}
            </h3>
            {project.status && (
              <Badge variant="default" className={cn("text-xs px-3 py-1", statusColors[project.status])}>
                {statusLabels[project.status]}
              </Badge>
            )}
          </div>

          {/* Builder and year */}
          <p className="text-sm font-mono text-text-dim mb-4">
            by {project.builder} {project.year && `· ${project.year}`}
          </p>

          {/* Description */}
          <p className="text-base text-text-secondary mb-5 line-clamp-3">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono bg-bg-secondary/50 text-text-dim rounded-full border border-border-default"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="px-3 py-1 text-xs font-mono text-text-dim">
                +{project.stack.length - 4}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border-default">
            <div className="flex items-center gap-2">
              {/* GitHub link - using button to avoid nested anchors */}
              {project.repo_url && (
                <SocialLink 
                  href={project.repo_url} 
                  icon={Github} 
                  label={`${project.name} on GitHub`} 
                />
              )}
              
              {/* Demo link if available */}
              {project.demo_url && (
                <SocialLink 
                  href={project.demo_url} 
                  icon={Globe} 
                  label={`${project.name} demo`} 
                />
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Seeking contributors indicator */}
              {project.seeking_contributors && (
                <div className="flex items-center gap-1 text-green-primary">
                  <Users className="h-4 w-4" />
                  <span className="text-xs font-mono hidden sm:inline">Contributors wanted</span>
                </div>
              )}
              
              {/* This is inside the Link, so it's safe */}
              <ChevronRight className="h-5 w-5 text-green-primary group-hover:text-amber transition-colors group-hover:translate-x-1 duration-200" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}