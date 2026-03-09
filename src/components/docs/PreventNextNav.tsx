// components/docs/PrevNextNav.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUp } from "lucide-react";
import { supabase } from '../../../lib/supabase/client';

interface PrevNextNavProps {
  currentId: string;
}

interface NavResource {
  id: string;
  title: string;
  href: string;
}

export function PrevNextNav({ currentId }: PrevNextNavProps) {
  const [prev, setPrev] = useState<NavResource | null>(null);
  const [next, setNext] = useState<NavResource | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNavigation() {
      setLoading(true);

      try {
        // First, get current resource's category and order
        const { data: current } = await supabase
          .from('resources')
          .select('category_id, display_order')
          .eq('id', currentId)
          .single();

        if (!current) return;

        // Get previous resource
        const { data: prevData } = await supabase
          .from('resources')
          .select('id, title, href')
          .eq('category_id', current.category_id)
          .eq('is_published', true)
          .lt('display_order', current.display_order || 0)
          .order('display_order', { ascending: false })
          .limit(1)
          .maybeSingle();

        // Get next resource
        const { data: nextData } = await supabase
          .from('resources')
          .select('id, title, href')
          .eq('category_id', current.category_id)
          .eq('is_published', true)
          .gt('display_order', current.display_order || 0)
          .order('display_order', { ascending: true })
          .limit(1)
          .maybeSingle();

        if (prevData) setPrev(prevData);
        if (nextData) setNext(nextData);
      } catch (error) {
        console.error('Error fetching navigation:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNavigation();
  }, [currentId]);

  if (loading) {
    return (
      <div className="mt-6 pt-4 border-t border-border-default">
        <div className="h-10 bg-bg-secondary/50 animate-pulse rounded" />
      </div>
    );
  }

  if (!prev && !next) {
    return null;
  }

  return (
    <div className="mt-6 pt-4 border-t border-border-default">
      <h4 className="font-mono text-xs font-semibold text-text-dim mb-3">CONTINUE READING</h4>

      <div className="space-y-2">
        {prev && (
          <Link
            href={prev.href}
            className="group flex items-center gap-2 p-3 rounded-lg bg-bg-secondary/30 border border-border-default hover:border-green-primary/30 transition-all hover:-translate-y-0.5"
          >
            <ChevronLeft className="h-4 w-4 text-green-primary flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
            <div className="flex-1 min-w-0">
              <div className="text-xs text-text-dim mb-0.5">Previous</div>
              <div className="text-sm text-text-primary truncate group-hover:text-green-primary transition-colors">
                {prev.title}
              </div>
            </div>
          </Link>
        )}

        {next && (
          <Link
            href={next.href}
            className="group flex items-center gap-2 p-3 rounded-lg bg-bg-secondary/30 border border-border-default hover:border-green-primary/30 transition-all hover:-translate-y-0.5"
          >
            <div className="flex-1 min-w-0 text-right">
              <div className="text-xs text-text-dim mb-0.5">Next</div>
              <div className="text-sm text-text-primary truncate group-hover:text-green-primary transition-colors">
                {next.title}
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-green-primary flex-shrink-0 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="mt-3 w-full py-2 text-xs text-text-dim hover:text-green-primary transition-colors flex items-center justify-center gap-1 border border-border-default rounded-lg hover:border-green-primary/30"
      >
        <ArrowUp className="h-3 w-3" />
        Back to top
      </button>
    </div>
  );
}
