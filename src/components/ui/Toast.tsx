// components/ui/Toast.tsx
"use client";

import { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, Info, X, Ban } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ToastType } from "@/hooks/useToast";

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  onClose: () => void;
  isVisible: boolean;
}

export function Toast({ message, type, duration = 5000, onClose, isVisible }: ToastProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
    }, 100);

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [duration, onClose, isVisible]);

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    warning: <Ban className="h-5 w-5 text-amber-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
  };

  const colors = {
    success: "border-green-500/30 bg-green-500/10 text-green-500",
    error: "border-red-500/30 bg-red-500/10 text-red-500",
    warning: "border-amber-500/30 bg-amber-500/10 text-amber-500",
    info: "border-blue-500/30 bg-blue-500/10 text-blue-500",
  };

  const progressColors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-amber-500",
    info: "bg-blue-500",
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "relative min-w-[320px] max-w-md rounded-lg border backdrop-blur-md shadow-2xl overflow-hidden animate-slide-in",
        colors[type]
      )}
      role="alert"
    >
      {/* Progress bar */}
      <div 
        className={cn("absolute bottom-0 left-0 h-1 transition-all duration-100", progressColors[type])}
        style={{ width: `${progress}%` }}
      />
      
      <div className="flex items-start gap-3 p-4">
        <div className="flex-shrink-0 mt-0.5">
          {icons[type]}
        </div>
        
        <div className="flex-1">
          <p className="font-mono text-sm leading-relaxed whitespace-pre-line">{message}</p>
          
          <div className="mt-2">
            <span className={cn(
              "inline-block px-2 py-0.5 text-[10px] font-mono uppercase rounded-full border",
              colors[type]
            )}>
              {type}
            </span>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-2 text-current opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// Single Toast Container
interface ToastContainerProps {
  toast: {
    id: string;
    message: string;
    type: ToastType;
  } | null;
  onRemove: () => void;
}

export function ToastContainer({ toast, onRemove }: ToastContainerProps) {
  if (!toast) return null;

  return (
    <div className="fixed top-20 right-4 z-50 min-w-[320px]">
      <Toast
        key={toast.id}
        message={toast.message}
        type={toast.type}
        onClose={onRemove}
        isVisible={true}
      />
      
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}