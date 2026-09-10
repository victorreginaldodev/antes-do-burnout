import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "cyber";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 disabled:pointer-events-none disabled:opacity-50 cursor-pointer rounded-xl select-none";

    const variantStyles = {
      primary:
        "bg-gradient-to-r from-purple-600 via-brand-500 to-fuchsia-600 hover:from-purple-500 hover:via-brand-400 hover:to-fuchsia-500 text-white shadow-[0_0_24px_rgba(168,85,247,0.35)] active:scale-[0.98]",
      secondary:
        "bg-[#1A0F33] text-purple-200 hover:bg-[#251647] hover:text-white border border-purple-500/30",
      outline:
        "border border-purple-500/30 bg-[#120A24]/60 text-slate-200 hover:bg-purple-950/40 hover:text-white hover:border-purple-400/50 backdrop-blur-sm",
      ghost: "text-slate-300 hover:bg-purple-950/40 hover:text-purple-200",
      danger: "bg-rose-600 text-white hover:bg-rose-500 shadow-sm shadow-rose-900/40",
      cyber: "neon-glow-btn bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 text-white font-semibold active:scale-[0.98]",
    };

    const sizeStyles = {
      sm: "h-9 px-3.5 text-xs",
      md: "h-11 px-5 text-sm",
      lg: "h-13 px-8 text-base font-semibold",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
