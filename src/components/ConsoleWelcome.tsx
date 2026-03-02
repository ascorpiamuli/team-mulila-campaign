"use client";

import { useEffect } from "react";

export function ConsoleWelcome() {
  useEffect(() => {
    console.log(
      `%c
┌─────────────────────────────────────────────┐
│                                             │
│   Stephen Muli Musyoki                      │
│   3rd Year IT @ Technical University of Mombasa│
│                                             │
│   Web Dev × Network Programming              │
│   Building apps that talk to network devices │
│                                             │
│   🔍 Exploring:                              │
│   • Next.js • TypeScript • MikroTik API      │
│   • Python • Network Automation • Ruijie     │
│                                             │
│   📫 stephen.muli@tum.ac.ke                  │
│   🐙 github.com/stephenmuli                   │
│                                             │
│   💡 Fun fact: I'm combining web dev         │
│      with networking to build ISP tools!     │
│                                             │
│   🎮 Try the Konami code for a surprise!     │
│                                             │
└─────────────────────────────────────────────┘
`,
      "color: #00ff41; font-family: monospace; font-weight: bold;"
    );
    
    // Additional fun message
    console.log(
      `%c>> Press F12 and try the Konami code: ↑ ↑ ↓ ↓ ← → ← → B A`,
      "color: #ffaa00; font-style: italic;"
    );
  }, []);

  return null;
}