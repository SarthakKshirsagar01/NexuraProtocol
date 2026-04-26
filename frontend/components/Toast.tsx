"use client";

import { useEffect } from "react";
import type { ToastItem, ToastType } from "@/hooks/useToast";

interface ToastProps {
  id: number;
  message: string;
  type: ToastType;
  onClose: (id: number) => void;
}

export function Toast({ id, message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), 5000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  const config = {
    success: {
      bg: "bg-green-500/20 border-green-500/50",
      icon: "✅",
      text: "text-green-400",
    },
    error: {
      bg: "bg-red-500/20 border-red-500/50",
      icon: "❌",
      text: "text-red-400",
    },
    info: {
      bg: "bg-blue-500/20 border-blue-500/50",
      icon: "ℹ️",
      text: "text-blue-400",
    },
    warning: {
      bg: "bg-yellow-500/20 border-yellow-500/50",
      icon: "⚠️",
      text: "text-yellow-400",
    },
  };

  const style = config[type];

  return (
    <div
      className={`${style.bg} backdrop-blur-lg border rounded-lg p-4 shadow-lg flex items-start gap-3 min-w-[300px] max-w-md animate-slide-in`}
    >
      <span className="text-xl flex-shrink-0">{style.icon}</span>
      <div className="flex-1">
        <p className={`${style.text} font-medium text-sm`}>{message}</p>
      </div>
      <button
        onClick={() => onClose(id)}
        className="text-slate-400 hover:text-white flex-shrink-0"
      >
        ✕
      </button>
    </div>
  );
}

export function ToastContainer({
  toasts,
  onClose,
}: {
  toasts: ToastItem[];
  onClose: (id: number) => void;
}) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  );
}
