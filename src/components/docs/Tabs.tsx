"use client";

import { ReactNode, useState } from "react";

interface TabProps {
  label: string;
  children: ReactNode;
}

export function Tabs({ children }: { children: ReactNode[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = children.filter(child =>
    (child as any).type === Tab
  ) as React.ReactElement<TabProps>[];

  return (
    <div className="my-4">
      <div className="flex gap-1 border-b border-border-default">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 text-sm font-mono transition-colors ${index === activeIndex
                ? 'text-green-primary border-b-2 border-green-primary'
                : 'text-text-dim hover:text-green-primary'
              }`}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs[activeIndex]?.props.children}
      </div>
    </div>
  );
}

export function Tab({ children }: TabProps) {
  return <>{children}</>;
}
