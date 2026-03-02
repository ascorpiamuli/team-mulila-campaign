"use client";

import { useState, useEffect } from "react";
import { TerminalWindow } from "@/components/terminal";
import { TypingAnimation } from "@/components/terminal";

const heroLines = [
  "$ whoami",
  "> Stephen Muli Musyoki",
  "",
  "$ education",
  "> Technical University of Mombasa",
  "  3rd Year - Bsc .Information Technology",
  "",
  "$ interests",
  "> Web Development",
  "  Network Programming",
  "  MikroTik & Ruijie Integration",
  "",
  "$ currently_learning",
  "> Next.js • Node.js • MikroTik API",
  "  Python • Network Automation",
  "",
  "$ goal",
  "> Build web apps that Solve problems & talk to",
  "  network devices (MikroTik/Ruijie)",
];

export function HeroTerminal() {
  const [typingComplete, setTypingComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <TerminalWindow
      variant="command"
      title="stephen@portfolio:~$"
      glowing
      className="w-full max-w-[95vw] sm:max-w-xl md:max-w-2xl mx-auto shadow-2xl"
    >
      <div className="px-3 sm:px-4 py-2 overflow-x-auto">
        <TypingAnimation
          text={heroLines}
          speed={isMobile ? 25 : 35}
          showCursor={!typingComplete}
          onComplete={() => setTypingComplete(true)}
        />
        
        {typingComplete && (
          <div className="min-h-[2.5em] sm:min-h-[1.5em] mt-3 sm:mt-4">
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://github.com/stephenmuli"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-green-primary hover:text-amber transition-all duration-200 border border-green-primary/20 hover:border-green-primary/40 px-3 py-1.5 rounded-md"
              >
                github
              </a>
              
              <a
                href="https://linkedin.com/in/stephenmuli"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-green-primary hover:text-amber transition-all duration-200 border border-green-primary/20 hover:border-green-primary/40 px-3 py-1.5 rounded-md"
              >
                linkedin
              </a>
              
              <a
                href="https://tum.ac.ke"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-green-primary hover:text-amber transition-all duration-200 border border-green-primary/20 hover:border-green-primary/40 px-3 py-1.5 rounded-md"
              >
                tum
              </a>
            </div>
            
            <div className="mt-3 flex items-center gap-1 text-text-dim font-mono text-xs">
              <span className="text-green-primary">❯</span>
              <span>3rd Year IT Student @ TUM</span>
              <span className="cursor-blink ml-1">_</span>
            </div>
          </div>
        )}
      </div>
    </TerminalWindow>
  );
}