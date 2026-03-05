// components/sections/BlogCard.tsx
"use client";

import Link from "next/link";
import { Calendar, Clock, User, ArrowRight, Eye, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "compact" | "featured";
}

export function BlogCard({ post, variant = "default" }: BlogCardProps) {
  const publishedDate = post.published_at 
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : null;

  const authorName = post.author_name;
  const thumbnail = post.thumbnail_url || post.featured_image;
  const readingTime = post.reading_time_minutes || Math.ceil(post.content.length / 1000);

  // Compact variant for sidebars
  if (variant === "compact") {
    return (
      <Link href={`/blog/${post.slug}`} className="block group">
        <div className="bg-bg-card rounded-lg p-4 hover:bg-bg-secondary/50 transition-colors border border-transparent hover:border-border-default">
          <h4 className="font-mono text-sm font-semibold text-text-primary group-hover:text-green-primary transition-colors line-clamp-1 mb-1">
            {post.title}
          </h4>
          <p className="text-xs text-text-secondary line-clamp-2 mb-2">
            {post.excerpt || post.content.substring(0, 80)}...
          </p>
          <div className="flex items-center justify-between text-[10px] font-mono text-text-dim">
            <span>{authorName}</span>
            <span>{readingTime} min</span>
          </div>
        </div>
      </Link>
    );
  }

  // Featured variant - Hero section
  if (variant === "featured") {
    return (
      <Link href={`/blog/${post.slug}`} className="block group h-full">
        <div className="relative h-full bg-gradient-to-br from-green-primary/5 via-bg-card to-bg-card rounded-2xl border border-border-default overflow-hidden hover:border-green-primary/30 transition-all duration-300">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-primary rounded-full filter blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber rounded-full filter blur-3xl" />
          </div>
          
          <div className="relative p-8 h-full flex flex-col">
            {/* Category chip */}
            {post.category && (
              <div className="mb-4">
                <span className="text-xs font-mono px-3 py-1 bg-green-primary/10 text-green-primary rounded-full">
                  {post.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h3 className="font-mono text-2xl md:text-3xl font-bold text-text-primary group-hover:text-green-primary transition-colors mb-4">
              {post.title}
            </h3>

            {/* Description */}
            <p className="text-text-secondary mb-6 line-clamp-3 flex-grow">
              {post.excerpt || post.content.substring(0, 150)}...
            </p>

            {/* Meta grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-text-dim">
                <User className="h-4 w-4" />
                <span className="font-mono text-sm">{authorName}</span>
              </div>
              <div className="flex items-center gap-2 text-text-dim">
                <Calendar className="h-4 w-4" />
                <span className="font-mono text-sm">{publishedDate}</span>
              </div>
              <div className="flex items-center gap-2 text-text-dim">
                <Clock className="h-4 w-4" />
                <span className="font-mono text-sm">{readingTime} min read</span>
              </div>
              {post.views_count !== undefined && (
                <div className="flex items-center gap-2 text-text-dim">
                  <Eye className="h-4 w-4" />
                  <span className="font-mono text-sm">{post.views_count} views</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-xs px-3 py-1 bg-bg-secondary/50 text-text-dim rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Read more button */}
            <div className="flex items-center justify-between pt-4 border-t border-border-default">
              <span className="text-sm font-mono text-text-dim">Continue reading</span>
              <ArrowRight className="h-5 w-5 text-green-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Default variant - Clean, modern card for grid
  return (
    <Link href={`/blog/${post.slug}`} className="block group h-full">
      <div className="h-full bg-bg-card rounded-xl border border-border-default overflow-hidden hover:border-green-primary/30 hover:shadow-lg transition-all duration-200">
        {/* Optional thumbnail */}
        {thumbnail && (
          <div className="relative h-40 overflow-hidden bg-bg-secondary">
            <img 
              src={thumbnail} 
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Category badge overlay */}
            {post.category && (
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-mono px-2 py-1 bg-bg-card/90 backdrop-blur-sm text-green-primary rounded-full border border-green-primary/30">
                  {post.category}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h3 className="font-mono text-lg font-semibold text-text-primary group-hover:text-green-primary transition-colors mb-2 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-text-secondary mb-4 line-clamp-2">
            {post.excerpt || post.content.substring(0, 100)}...
          </p>

          {/* Author and meta row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-mono text-text-dim">
              <User className="h-3.5 w-3.5" />
              <span>{authorName}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-text-dim">
              <BookOpen className="h-3.5 w-3.5" />
              <span>{readingTime} min</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {post.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-[9px] font-mono px-2 py-0.5 bg-bg-secondary/50 text-text-dim rounded-full">
                  #{tag}
                </span>
              ))}
              {post.tags.length > 2 && (
                <span className="text-[9px] font-mono px-2 py-0.5 text-text-dim">
                  +{post.tags.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-border-default">
            <div className="flex items-center gap-2 text-xs text-text-dim">
              <Calendar className="h-3.5 w-3.5" />
              <span className="font-mono text-[10px]">{publishedDate}</span>
            </div>
            <div className="flex items-center gap-1 text-green-primary">
              <span className="text-xs font-mono">Read</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}