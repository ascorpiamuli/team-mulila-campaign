// components/sections/FAQCard.tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, HelpCircle, Tag, Eye, ThumbsUp } from "lucide-react";

// Add the missing interface - this makes the props type-safe
interface FAQCardProps {
  faq: FAQ;  // FAQ is globally available from your global.d.ts
  variant?: "default" | "compact" | "featured";
}

export function FAQCard({ faq, variant = "default" }: FAQCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (variant === "compact") {
    return (
      <div className="border border-border-default bg-bg-card rounded-lg p-4 hover:border-green-primary/30 transition-all duration-200">
        <div className="flex items-start gap-3">
          <HelpCircle className="h-4 w-4 text-green-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="font-mono text-sm font-semibold text-text-primary mb-1">
              {faq.question}
            </h4>
            <p className="text-xs text-text-secondary line-clamp-2">
              {faq.answer}
            </p>
            {faq.category && (
              <span className="inline-block mt-2 text-[8px] font-mono px-1.5 py-0.5 bg-green-primary/10 text-green-primary rounded-full">
                {faq.category}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div className="border border-border-default bg-gradient-to-br from-bg-card to-bg-secondary/50 rounded-xl overflow-hidden hover:border-green-primary/30 transition-all duration-300">
        {/* Header with accent */}
        <div className="h-1 w-full bg-gradient-to-r from-green-primary to-amber" />
        
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-primary/10">
              <HelpCircle className="h-5 w-5 text-green-primary" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-mono text-lg font-bold text-green-primary mb-2">
                {faq.question}
              </h3>
              
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                {faq.answer}
              </p>
              
              {/* Metadata */}
              <div className="flex items-center gap-4 text-xs font-mono text-text-dim">
                {faq.category && (
                  <div className="flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5" />
                    <span>{faq.category}</span>
                  </div>
                )}
                
                {faq.views_count !== undefined && (
                  <div className="flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5" />
                    <span>{faq.views_count}</span>
                  </div>
                )}
                
                {faq.helpful_count !== undefined && (
                  <div className="flex items-center gap-1.5">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span>{faq.helpful_count}</span>
                  </div>
                )}
              </div>
              
              {/* Tags */}
              {faq.tags && faq.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {faq.tags.map(tag => (
                    <span key={tag} className="text-[8px] font-mono px-2 py-0.5 bg-bg-secondary/50 text-text-dim rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant with accordion
  return (
    <div className={cn(
      "border border-border-default bg-bg-card rounded-lg overflow-hidden transition-all duration-200",
      "hover:border-green-primary/30",
      isOpen && "border-green-primary/30"
    )}>
      {/* Question (clickable) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-5 flex items-start justify-between gap-4 hover:bg-bg-secondary/30 transition-colors"
      >
        <div className="flex items-start gap-3 flex-1">
          <HelpCircle className={cn(
            "h-5 w-5 shrink-0 mt-0.5 transition-colors",
            isOpen ? "text-green-primary" : "text-text-dim"
          )} />
          <div className="flex-1">
            <h3 className="font-mono text-base font-semibold text-text-primary pr-8">
              {faq.question}
            </h3>
            
            {/* Category tag for quick reference */}
            {faq.category && !isOpen && (
              <span className="inline-block mt-2 text-[8px] font-mono px-1.5 py-0.5 bg-green-primary/10 text-green-primary rounded-full">
                {faq.category}
              </span>
            )}
          </div>
        </div>
        
        <ChevronDown className={cn(
          "h-5 w-5 text-text-dim transition-transform duration-300 shrink-0",
          isOpen && "rotate-180 text-green-primary"
        )} />
      </button>
      
      {/* Answer (expandable) */}
      <div className={cn(
        "grid transition-all duration-300",
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}>
        <div className="overflow-hidden">
          <div className="p-5 pt-0 border-t border-border-default mt-2">
            <div className="flex gap-4">
              <div className="w-5 shrink-0" /> {/* Spacer to align with icon */}
              <div className="flex-1">
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  {faq.answer}
                </p>
                
                {/* Tags and metadata */}
                <div className="flex flex-wrap items-center gap-4">
                  {faq.tags && faq.tags.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      <Tag className="h-3.5 w-3.5 text-text-dim" />
                      <div className="flex flex-wrap gap-1.5">
                        {faq.tags.map(tag => (
                          <span key={tag} className="text-[8px] font-mono px-2 py-0.5 bg-bg-secondary/50 text-text-dim rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {faq.helpful_count !== undefined && (
                    <div className="flex items-center gap-1.5 text-text-dim">
                      <ThumbsUp className="h-3.5 w-3.5" />
                      <span className="font-mono text-xs">{faq.helpful_count} found this helpful</span>
                    </div>
                  )}
                </div>
                
                {/* Was this helpful? section */}
                <div className="mt-4 pt-3 border-t border-border-default flex items-center gap-4">
                  <span className="font-mono text-xs text-text-dim">Was this helpful?</span>
                  <button className="text-xs font-mono px-3 py-1 rounded-full border border-border-default hover:border-green-primary/30 hover:text-green-primary transition-colors">
                    Yes
                  </button>
                  <button className="text-xs font-mono px-3 py-1 rounded-full border border-border-default hover:border-green-primary/30 hover:text-green-primary transition-colors">
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton loader for FAQ cards
export function FAQCardSkeleton() {
  return (
    <div className="border border-border-default bg-bg-card rounded-lg p-5 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="h-5 w-5 rounded-full bg-bg-secondary" />
        <div className="flex-1">
          <div className="h-5 w-3/4 bg-bg-secondary rounded mb-2" />
          <div className="h-4 w-full bg-bg-secondary rounded mb-1" />
          <div className="h-4 w-2/3 bg-bg-secondary rounded" />
        </div>
      </div>
    </div>
  );
}

// Compact FAQ list item (for sidebars)
export function FAQListItem({ faq }: { faq: FAQ }) {
  return (
    <a href={`/faq#${faq.id}`} className="block group">
      <div className="py-2 px-3 rounded-lg hover:bg-bg-secondary/50 transition-colors">
        <div className="flex items-start gap-2">
          <HelpCircle className="h-3.5 w-3.5 text-green-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="font-mono text-xs font-medium text-text-primary group-hover:text-green-primary transition-colors line-clamp-1">
              {faq.question}
            </h4>
            {faq.category && (
              <span className="text-[8px] font-mono text-text-dim">
                {faq.category}
              </span>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}