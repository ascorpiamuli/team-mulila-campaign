"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "command" | "code" | "output";
  showDots?: boolean;
  glowing?: boolean;
  accentColor?: "green" | "amber" | "blue";
}

const variantStyles = {
  default: "font-sans",
  command: "font-mono text-sm",
  code: "font-mono text-sm leading-relaxed",
  output: "font-mono text-sm text-text-secondary",
};

const accentColors = {
  green: {
    border: "border-green-primary/30",
    hoverBorder: "hover:border-green-primary/50",
    shadow: "rgba(0,255,65,0.1)",
    hoverShadow: "rgba(0,255,65,0.15)",
    glow: "rgba(0,255,65,0.2)",
    dot: "bg-green-primary",
  },
  amber: {
    border: "border-amber/30",
    hoverBorder: "hover:border-amber/50",
    shadow: "rgba(255,193,7,0.1)",
    hoverShadow: "rgba(255,193,7,0.15)",
    glow: "rgba(255,193,7,0.2)",
    dot: "bg-amber",
  },
  blue: {
    border: "border-blue/30",
    hoverBorder: "hover:border-blue/50",
    shadow: "rgba(59,130,246,0.1)",
    hoverShadow: "rgba(59,130,246,0.15)",
    glow: "rgba(59,130,246,0.2)",
    dot: "bg-blue",
  },
};

export function TerminalWindow({
  title = "stephen@portfolio:~$",
  children,
  className,
  variant = "default",
  showDots = true,
  glowing = false,
  accentColor = "green",
}: TerminalWindowProps) {
  const colors = accentColors[accentColor];

  return (
    <div
      className={cn(
        "group relative rounded-lg border bg-bg-card transition-all duration-300",
        colors.border,
        "hover:shadow-lg hover:-translate-y-0.5",
        colors.hoverBorder,
        glowing && "shadow-[0_0_15px_var(--shadow-color)] hover:shadow-[0_0_25px_var(--hover-shadow-color)]",
        className
      )}
      style={{
        "--shadow-color": colors.shadow,
        "--hover-shadow-color": colors.hoverShadow,
      } as React.CSSProperties}
    >
      {/* Title bar with window controls */}
      <div className="flex items-center justify-between border-b border-border-default bg-bg-secondary/50 px-4 py-2.5 rounded-t-lg">
        <div className="flex items-center gap-2">
          {showDots && (
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red/80 hover:bg-red transition-colors duration-200 cursor-default" />
              <span className="h-3 w-3 rounded-full bg-amber/80 hover:bg-amber transition-colors duration-200 cursor-default" />
              <span className={cn("h-3 w-3 rounded-full opacity-80 hover:opacity-100 transition-all duration-200 cursor-default", colors.dot)} />
            </div>
          )}
          {title && (
            <span className="ml-2 font-mono text-xs text-text-dim truncate max-w-[200px] sm:max-w-none">
              {title}
            </span>
          )}
        </div>
        
        {/* Optional path indicator */}
        <div className="hidden sm:flex items-center gap-1 text-text-dim font-mono text-[10px]">
          <span className="text-green-primary">●</span>
          <span>/home/developer</span>
        </div>
      </div>

      {/* ASCII border accent */}
      <div className="relative">
        <div className="absolute inset-x-0 top-0 flex justify-between px-4 font-mono text-[8px] text-border-default opacity-30 select-none">
          <span>┌─</span>
          <span className="flex-1 mx-2 border-t border-dashed border-border-default" />
          <span>─┐</span>
        </div>
      </div>

      {/* Content with improved padding */}
      <div className={cn(
        "px-4 sm:px-5 py-4 sm:py-5",
        variantStyles[variant],
        variant === "command" && "space-y-2"
      )}>
        {children}
      </div>

      {/* Bottom ASCII border */}
      <div className="relative">
        <div className="absolute inset-x-0 bottom-0 flex justify-between px-4 font-mono text-[8px] text-border-default opacity-30 select-none">
          <span>└─</span>
          <span className="flex-1 mx-2 border-b border-dashed border-border-default" />
          <span>─┘</span>
        </div>
      </div>

      {/* Terminal status line */}
      <div className="border-t border-border-default bg-bg-secondary/30 px-4 py-1.5 rounded-b-lg">
        <div className="flex items-center justify-between font-mono text-[10px] text-text-dim">
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                colors.dot
              )} />
              <span className={cn("relative inline-flex rounded-full h-1.5 w-1.5", colors.dot)} />
            </span>
            <span>ready</span>
          </div>
          <div className="flex items-center gap-3">
            <span>LIVE</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}