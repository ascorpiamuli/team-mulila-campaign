// components/docs/TableOfContents.tsx
"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Get all headings from the article
    const article = document.querySelector('article');
    if (!article) return;

    const elements = article.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const items: Heading[] = [];

    elements.forEach((element) => {
      // Add id if not present
      if (!element.id) {
        element.id = element.textContent?.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '') || '';
      }

      items.push({
        id: element.id,
        text: element.textContent || '',
        level: parseInt(element.tagName[1]),
      });
    });

    setHeadings(items);

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          className={`
            block text-sm transition-colors hover:text-green-primary
            ${heading.level === 1 ? 'pl-0 font-medium' : ''}
            ${heading.level === 2 ? 'pl-3' : ''}
            ${heading.level === 3 ? 'pl-6 text-xs' : ''}
            ${heading.level >= 4 ? 'pl-9 text-xs text-text-dim' : ''}
            ${activeId === heading.id
              ? 'text-green-primary border-l-2 border-green-primary pl-2'
              : 'text-text-dim hover:text-text-secondary'
            }
          `}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(heading.id)?.scrollIntoView({
              behavior: 'smooth'
            });
          }}
        >
          {heading.text}
        </a>
      ))}
    </div>
  );
}
