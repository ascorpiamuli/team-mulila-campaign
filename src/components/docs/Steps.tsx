import { ReactNode } from "react";

export function Steps({ children }: { children: ReactNode[] }) {
  return (
    <div className="my-6 space-y-4">
      {children.map((step, index) => (
        <div key={index} className="flex gap-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-primary/10 border border-green-primary/20 flex items-center justify-center">
            <span className="text-xs font-mono text-green-primary">{index + 1}</span>
          </div>
          <div className="flex-1">{step}</div>
        </div>
      ))}
    </div>
  );
}
