"use client";

import React, { useState } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface QuestionStepperHeaderProps {
  currentIndex: number;
  totalQuestions: number;
  progressPercentage: number;
  canGoBack: boolean;
  onGoBack: () => void;
  onReset: () => void;
}

export function QuestionStepperHeader({
  currentIndex,
  totalQuestions,
  progressPercentage,
  canGoBack,
  onGoBack,
  onReset,
}: QuestionStepperHeaderProps) {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const handleResetClick = () => {
    if (showConfirmReset) {
      onReset();
      setShowConfirmReset(false);
    } else {
      setShowConfirmReset(true);
      setTimeout(() => setShowConfirmReset(false), 4000);
    }
  };

  return (
    <header className="w-full max-w-2xl mx-auto mb-8 space-y-4">
      <div className="flex items-center justify-between text-sm">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onGoBack}
          disabled={!canGoBack}
          aria-label="Voltar para a questão anterior"
          className="text-purple-300 hover:text-white hover:bg-purple-950/40 gap-1.5 px-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </Button>

        <div className="text-center font-medium text-purple-200">
          Questão <span className="font-bold text-white">{currentIndex + 1}</span> de{" "}
          {totalQuestions}{" "}
          <span className="text-xs font-normal text-purple-400">
            ({progressPercentage}%)
          </span>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleResetClick}
          className="text-purple-400 hover:text-rose-400 hover:bg-purple-950/40 gap-1 px-2 text-xs transition-colors cursor-pointer"
          title="Recomeçar do início"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{showConfirmReset ? "Confirmar?" : "Recomeçar"}</span>
        </Button>
      </div>

      <div className="w-full">
        <Progress value={progressPercentage} className="h-2" />
      </div>
    </header>
  );
}
