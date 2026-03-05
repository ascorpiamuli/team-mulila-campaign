"use client";

import { CountUp } from "@/components/ui/CountUp";
import { ScrollReveal } from "@/components/terminal";
import { Card } from "@/components/ui/Card";
import { 
  Code2, 
  Briefcase, 
  Users, 
  Award,
  Coffee,
  Star,
  GitBranch,
  Clock
} from "lucide-react";

interface Stat {
  target: number;
  suffix: string;
  label: string;
  icon?: React.ElementType;
  prefix?: string;
}

const stats: Stat[] = [
  { 
    target: 3, 
    suffix: "+", 
    label: "Years Experience",
    icon: Briefcase
  },
  { 
    target: 8, 
    suffix: "+", 
    label: "Projects Completed",
    icon: Code2
  },
  { 
    target: 4, 
    suffix: "+", 
    label: "Happy Clients",
    icon: Users
  },
  { 
    target: 12, 
    suffix: "+", 
    label: "Technologies Mastered",
    icon: Award
  },
  // Alternative stats if you prefer:
  // { 
  //   target: 1000, 
  //   suffix: "+", 
  //   label: "Coffee Cups",
  //   icon: Coffee
  // },
  // { 
  //   target: 50, 
  //   suffix: "+", 
  //   label: "Git Repos",
  //   icon: GitBranch
  // },
  // { 
  //   target: 5, 
  //   suffix: "k+", 
  //   label: "Hours Coding",
  //   icon: Clock
  // },
  // { 
  //   target: 95, 
  //   suffix: "%", 
  //   label: "Client Satisfaction",
  //   icon: Star
  // },
];

export function StatsBar() {
  return (
    <ScrollReveal
      stagger={100}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        
        return (
          <Card
            key={stat.label}
            showDots={false}
            padding="sm"
            className="text-center group hover:border-green-primary/30 transition-all duration-300"
          >
            <div className="py-4 relative">
              {/* Icon */}
              {Icon && (
                <div className="mb-3 flex justify-center">
                  <div className="p-2 rounded-lg bg-green-primary/10 border border-green-primary/20 group-hover:border-green-primary/40 group-hover:bg-green-primary/20 transition-all duration-300">
                    <Icon className="w-5 h-5 text-green-primary" />
                  </div>
                </div>
              )}
              
              {/* Count with animation */}
              <CountUp
                target={stat.target}
                suffix={stat.suffix}
                prefix={stat.prefix}
                className="block font-mono text-3xl font-bold text-green-primary group-hover:scale-110 transition-transform duration-300"
              />
              
              {/* Label */}
              <span className="mt-2 block font-mono text-xs uppercase tracking-wider text-text-dim group-hover:text-text-secondary transition-colors duration-300">
                {stat.label}
              </span>
              
              {/* Decorative element */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-12 h-0.5 bg-gradient-to-r from-transparent via-green-primary/50 to-transparent transition-all duration-500" />
            </div>
          </Card>
        );
      })}
    </ScrollReveal>
  );
}

// Alternative version with tooltips and more details:
export function StatsBarWithTooltips() {
  return (
    <ScrollReveal
      stagger={100}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        
        return (
          <Card
            key={stat.label}
            showDots={false}
            padding="sm"
            className="text-center group hover:border-green-primary/30 transition-all duration-300 relative"
          >
            <div className="py-4">
              {/* Icon with glow effect */}
              {Icon && (
                <div className="mb-3 flex justify-center relative">
                  <div className="absolute inset-0 bg-green-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-2 rounded-lg bg-green-primary/10 border border-green-primary/20 group-hover:border-green-primary/40 group-hover:bg-green-primary/20 transition-all duration-300">
                    <Icon className="w-5 h-5 text-green-primary" />
                  </div>
                </div>
              )}
              
              {/* Count with animation */}
              <div className="relative">
                <CountUp
                  target={stat.target}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  className="block font-mono text-3xl font-bold text-green-primary group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Tooltip with more info (appears on hover) */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-bg-card border border-green-primary/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10 pointer-events-none">
                  <span className="text-xs font-mono text-green-primary">
                    {getTooltipText(stat.label, stat.target)}
                  </span>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-bg-card border-r border-b border-green-primary/30 rotate-45" />
                </div>
              </div>
              
              {/* Label */}
              <span className="mt-2 block font-mono text-xs uppercase tracking-wider text-text-dim group-hover:text-text-secondary transition-colors duration-300">
                {stat.label}
              </span>
            </div>
          </Card>
        );
      })}
    </ScrollReveal>
  );
}

// Helper function for tooltip text
function getTooltipText(label: string, value: number): string {
  const tooltips: Record<string, string> = {
    "Years Experience": `Since ${new Date().getFullYear() - value}`,
    "Projects Completed": `${value}+ successful deliveries`,
    "Happy Clients": `${value}+ satisfied clients`,
    "Technologies Mastered": `${value} tech stacks`,
    "Coffee Cups": "And counting! ☕",
    "Git Repos": "Public & private",
    "Hours Coding": "And still learning",
    "Client Satisfaction": `${value}% positive feedback`,
  };
  
  return tooltips[label] || `More about ${label.toLowerCase()}`;
}

// If you want the original simple version without icons:
export function SimpleStatsBar() {
  return (
    <ScrollReveal
      stagger={100}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((stat) => (
        <Card
          key={stat.label}
          showDots={false}
          padding="sm"
          className="text-center group hover:border-green-primary/30 transition-all duration-300"
        >
          <div className="py-4">
            <CountUp
              target={stat.target}
              suffix={stat.suffix}
              prefix={stat.prefix}
              className="block font-mono text-3xl font-bold text-green-primary group-hover:scale-110 transition-transform duration-300"
            />
            <span className="mt-2 block font-mono text-xs uppercase tracking-wider text-text-dim group-hover:text-text-secondary transition-colors duration-300">
              {stat.label}
            </span>
          </div>
        </Card>
      ))}
    </ScrollReveal>
  );
}

// Default export of the main version with icons
export default StatsBar;