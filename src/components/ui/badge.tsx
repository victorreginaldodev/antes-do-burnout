import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "low" | "medium" | "high" | "outline" | "brand" | "cyber";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-slate-800/80 text-slate-200 border-slate-700/60",
    brand: "bg-brand-500/15 text-brand-200 border-brand-500/35 backdrop-blur-xs",
    low: "bg-emerald-500/15 text-emerald-300 border-emerald-500/35",
    medium: "bg-amber-500/15 text-amber-300 border-amber-500/35",
    high: "bg-rose-500/15 text-rose-300 border-rose-500/35",
    outline: "text-slate-300 border-purple-500/25 bg-transparent",
    cyber: "bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 text-purple-200 border-purple-400/40 shadow-[0_0_12px_rgba(168,85,247,0.2)]",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
