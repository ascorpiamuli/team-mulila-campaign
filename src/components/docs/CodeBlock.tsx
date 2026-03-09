"use client";

import { Copy } from "lucide-react";

export function CodeBlock({ children, language }: { children: string; language?: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(children);
  };

  return (
    <div className="relative group my-4">
      {language && (
        <div className="absolute top-2 left-3 text-xs text-text-dim font-mono">
          {language}
        </div>
      )}
      <pre className="bg-bg-card p-4 rounded-lg border border-border-default overflow-x-auto pt-8">
        <code className={`language-${language || 'bash'}`}>{children}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 bg-bg-secondary rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Copy className="h-4 w-4" />
      </button>
    </div>
  );
}
