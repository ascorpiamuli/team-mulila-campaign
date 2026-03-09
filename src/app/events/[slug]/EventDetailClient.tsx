// app/events/[slug]/EventDetailClient.tsx
"use client";

import { useState } from "react";
import { CheckCircle2, Copy } from "lucide-react";

interface EventDetailClientProps {
  eventUrl: string;
}

export function EventDetailClient({ eventUrl }: EventDetailClientProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className="inline-flex items-center gap-2 border border-border-default px-4 py-2 font-mono text-sm text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary"
      aria-label="Copy link"
    >
      {copied ? (
        <>
          <CheckCircle2 className="h-4 w-4 text-green-primary" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          Copy Link
        </>
      )}
    </button>
  );
}
