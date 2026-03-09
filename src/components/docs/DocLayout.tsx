import { ReactNode } from "react";
import Link from "next/link";
import { Home, ChevronRight, Clock, Calendar, User } from "lucide-react";

interface DocLayoutProps {
  children: ReactNode;
  frontmatter: {
    title: string;
    description: string;
    author?: string;
    date?: string;
    readingTime?: string;
    category?: string;
    tags?: string[];
  };
}

export function DocLayout({ children, frontmatter }: DocLayoutProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <nav className="flex items-center gap-2 text-sm mb-4">
          <Link href="/" className="text-text-dim hover:text-green-primary">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-text-dim" />
          <Link href="/resources" className="text-text-dim hover:text-green-primary">
            Resources
          </Link>
          <ChevronRight className="h-3 w-3 text-text-dim" />
          <span className="text-text-primary">{frontmatter.category || 'Documentation'}</span>
        </nav>

        <h1 className="font-mono text-4xl md:text-5xl font-bold text-text-primary mb-4">
          {frontmatter.title}
        </h1>

        <p className="text-xl text-text-secondary mb-6">
          {frontmatter.description}
        </p>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm border-y border-border-default py-4">
          {frontmatter.author && (
            <div className="flex items-center gap-1 text-text-dim">
              <User className="h-4 w-4" />
              <span>{frontmatter.author}</span>
            </div>
          )}
          {frontmatter.date && (
            <div className="flex items-center gap-1 text-text-dim">
              <Calendar className="h-4 w-4" />
              <span>{new Date(frontmatter.date).toLocaleDateString()}</span>
            </div>
          )}
          {frontmatter.readingTime && (
            <div className="flex items-center gap-1 text-text-dim">
              <Clock className="h-4 w-4" />
              <span>{frontmatter.readingTime}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {frontmatter.tags.map(tag => (
              <span key={tag} className="px-2 py-1 text-xs bg-green-primary/5 rounded-full text-green-primary">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <div className="prose prose-invert max-w-none">
        {children}
      </div>
    </article>
  );
}
