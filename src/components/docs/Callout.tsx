// src/components/docs/Callout.tsx
import { ReactNode } from "react";
import { Info, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";

const variants = {
  info: { icon: Info, bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400" },
  warning: { icon: AlertTriangle, bg: "bg-yellow-500/10", border: "border-yellow-500/20", text: "text-yellow-400" },
  success: { icon: CheckCircle, bg: "bg-green-500/10", border: "border-green-500/20", text: "text-green-400" },
  error: { icon: AlertCircle, bg: "bg-red-500/10", border: "border-red-500/20", text: "text-red-400" },
};

export function Callout({
  children,
  type = "info"
}: {
  children: ReactNode;
  type?: keyof typeof variants;
}) {
  const { icon: Icon, bg, border, text } = variants[type];

  return (
    <div className={`flex gap-3 p-4 rounded-lg ${bg} border ${border} my-4`}>
      <Icon className={`h-5 w-5 flex-shrink-0 ${text}`} />
      <div className="text-text-secondary">{children}</div>
    </div>
  );
}
