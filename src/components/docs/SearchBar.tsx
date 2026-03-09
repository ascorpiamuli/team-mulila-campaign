// components/docs/SearchBar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, FileText, GraduationCap, Clock, Loader2 } from "lucide-react";
import { supabase } from '../../../lib/supabase/client';

interface SearchResult {
  id: string;
  title: string;
  href: string;
  description: string;
  difficulty: string;
  category: string;
}

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setQuery('');
        setResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      }

      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
        setResults([]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);

      const { data } = await supabase
        .from('resources')
        .select(`
          id,
          title,
          href,
          description,
          difficulty,
          categories (title)
        `)
        .ilike('title', `%${query}%`)
        .limit(5);

      if (data) {
        setResults(data.map((item: any) => ({
          ...item,
          category: item.categories.title
        })));
      }

      setLoading(false);
      setSelectedIndex(-1);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      window.location.href = results[selectedIndex].href;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400';
      case 'Intermediate': return 'text-amber-400';
      case 'Advanced': return 'text-orange-400';
      case 'Expert': return 'text-red-400';
      default: return 'text-text-dim';
    }
  };

  return (
    <div ref={searchRef} className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-2 text-sm text-text-dim border border-border-default rounded-lg hover:border-green-primary/30 hover:text-green-primary transition-colors"
      >
        <Search className="h-4 w-4" />
        <span>Search docs...</span>
        <kbd className="px-1.5 py-0.5 text-xs bg-bg-secondary rounded border border-border-default">⌘K</kbd>
      </button>

      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 text-text-dim hover:text-green-primary hover:bg-green-primary/5 rounded-lg transition-colors"
      >
        <Search className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-bg-primary/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-bg-secondary border border-border-default rounded-xl shadow-2xl overflow-hidden">
            {/* Search Input */}
            <div className="flex items-center gap-2 p-3 border-b border-border-default">
              <Search className="h-5 w-5 text-text-dim" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search documentation..."
                className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder-text-dim"
                autoFocus
              />
              {loading && <Loader2 className="h-4 w-4 text-green-primary animate-spin" />}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-bg-card rounded-lg transition-colors"
              >
                <X className="h-4 w-4 text-text-dim" />
              </button>
            </div>

            {/* Search Results */}
            {results.length > 0 && (
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {results.map((result, index) => (
                  <Link
                    key={result.id}
                    href={result.href}
                    className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${index === selectedIndex
                        ? 'bg-green-primary/10'
                        : 'hover:bg-green-primary/5'
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <FileText className="h-5 w-5 text-green-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-mono text-text-primary mb-1">{result.title}</h4>
                      <p className="text-sm text-text-dim line-clamp-1">{result.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs px-2 py-0.5 bg-bg-card rounded-full text-text-dim">
                          {result.category}
                        </span>
                        <span className={`text-xs ${getDifficultyColor(result.difficulty)}`}>
                          {result.difficulty}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {query.length >= 2 && results.length === 0 && !loading && (
              <div className="p-8 text-center">
                <p className="text-text-dim">No results found for "{query}"</p>
              </div>
            )}

            {query.length < 2 && (
              <div className="p-8 text-center">
                <p className="text-text-dim">Type at least 2 characters to search</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
