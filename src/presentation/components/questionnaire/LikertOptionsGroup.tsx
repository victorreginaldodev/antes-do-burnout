"use client";

import React from "react";
import { LikertOption } from "@/domain/types";
import { cn } from "@/lib/utils";

interface LikertOptionsGroupProps {
  options: LikertOption[];
  selectedScore: number | undefined;
  onSelect: (value: number) => void;
  disabled?: boolean;
}

export function LikertOptionsGroup({
  options,
  selectedScore,
  onSelect,
  disabled = false,
}: LikertOptionsGroupProps) {
  return (
    <div className="space-y-3 w-full" role="radiogroup">
      {options.map((option) => {
        const isSelected = selectedScore === option.valor;

        return (
          <button
            key={option.valor}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={disabled}
            onClick={() => onSelect(option.valor)}
            className={cn(
              "w-full flex items-center justify-between p-4 rounded-2xl border text-left font-medium transition-all duration-150 cursor-pointer select-none",
              isSelected
                ? "bg-purple-950/80 border-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.35)] ring-1 ring-purple-400"
                : "bg-[#1A0F33]/60 border-purple-500/20 text-purple-200/90 hover:bg-[#251647]/70 hover:border-purple-400/40 hover:text-white active:scale-[0.995]"
            )}
          >
            <div className="flex items-center gap-3.5">
              <span
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border transition-colors",
                  isSelected
                    ? "bg-purple-600 border-purple-400 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                    : "bg-purple-950/60 border-purple-500/30 text-purple-300"
                )}
              >
                {option.valor}
              </span>
              <span className="text-base font-normal">{option.rotulo}</span>
            </div>

            <span
              className={cn(
                "text-xs font-mono px-2 py-0.5 rounded transition-opacity hidden sm:inline-block",
                isSelected
                  ? "text-purple-200 bg-purple-900/60 border border-purple-400/30"
                  : "text-purple-400/60 bg-purple-950/40"
              )}
            >
              Tecla {option.valor}
            </span>
          </button>
        );
      })}
    </div>
  );
}
