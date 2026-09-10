"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, Sparkles, Zap } from "lucide-react";
import { useAssessmentSession } from "@/application/use-assessment-session";
import { Button } from "@/components/ui/button";
import { QuestionStepperHeader } from "./QuestionStepperHeader";
import { QuestionCard } from "./QuestionCard";

export function QuestionnaireView() {
  const router = useRouter();
  const [isFinishing, setIsFinishing] = useState(false);

  const {
    currentIndex,
    currentQuestion,
    currentAnswer,
    answers,
    answeredCount,
    progressPercentage,
    isHydrated,
    isLastQuestion,
    isComplete,
    canGoBack,
    canGoForward,
    direction,
    answerQuestion,
    goToPrevious,
    goToNext,
    resetSession,
    finishAssessment,
    fillRandomAnswersAndFinish,
  } = useAssessmentSession();

  const handleFinish = (explicitAnswers?: Record<number, number>) => {
    try {
      setIsFinishing(true);
      finishAssessment(explicitAnswers);
      router.push("/resultado");
    } catch (err) {
      console.error("Erro ao concluir a avaliação:", err);
      setIsFinishing(false);
    }
  };

  const handleAnswer = (val: number) => {
    answerQuestion(val, true);

    // Se estiver na última questão, conclui automaticamente após feedback visual
    if (isLastQuestion) {
      setIsFinishing(true);
      const updatedAnswers = {
        ...answers,
        [currentQuestion.numero]: val,
      };

      setTimeout(() => {
        handleFinish(updatedAnswers);
      }, 220);
    }
  };

  const handleDevFill = () => {
    try {
      setIsFinishing(true);
      fillRandomAnswersAndFinish();
      router.push("/resultado");
    } catch (err) {
      console.error("Erro no preenchimento dev:", err);
      setIsFinishing(false);
    }
  };

  // Atalhos de teclado globais (teclas 1 a 5 e setas)
  useEffect(() => {
    if (!isHydrated || isFinishing) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (["1", "2", "3", "4", "5"].includes(e.key)) {
        e.preventDefault();
        handleAnswer(Number(e.key));
      } else if (e.key === "ArrowLeft" && canGoBack) {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === "ArrowRight" && canGoForward) {
        e.preventDefault();
        goToNext();
      } else if (e.key === "Enter" && isLastQuestion) {
        e.preventDefault();
        handleFinish();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isHydrated,
    isFinishing,
    canGoBack,
    canGoForward,
    isLastQuestion,
    goToPrevious,
    goToNext,
    currentQuestion.numero,
    answers,
  ]);

  if (!isHydrated) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-3 border-purple-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
        <p className="text-sm text-purple-300/80 font-medium font-sans">
          Carregando sua avaliação psicossocial...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex flex-col justify-between py-6 px-4 sm:px-6 relative">
      <div className="w-full">
        <QuestionStepperHeader
          currentIndex={currentIndex}
          totalQuestions={35}
          progressPercentage={progressPercentage}
          canGoBack={canGoBack}
          onGoBack={goToPrevious}
          onReset={resetSession}
        />

        <main className="w-full">
          <QuestionCard
            question={currentQuestion}
            direction={direction}
            selectedScore={currentAnswer}
            onSelect={handleAnswer}
          />
        </main>
      </div>

      {/* Barra de Ação Inferior */}
      <footer className="w-full max-w-2xl mx-auto mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-purple-300/70 font-medium order-2 sm:order-1">
          {answeredCount} de 35 questões respondidas
          {isComplete && (
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold ml-2">
              <CheckCircle2 className="w-3.5 h-3.5" /> Completo!
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto order-1 sm:order-2 justify-end">
          {/* Na última questão, sempre exibe o botão ativo de conclusão */}
          {isLastQuestion ? (
            <Button
              type="button"
              variant="cyber"
              size="lg"
              onClick={() => handleFinish()}
              disabled={isFinishing}
              className="w-full sm:w-auto gap-2 text-white shadow-[0_0_24px_rgba(168,85,247,0.5)] cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>
                {isFinishing ? "Processando laudo..." : "Ver Meu Diagnóstico Completo"}
              </span>
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={goToNext}
              disabled={!canGoForward}
              className="w-full sm:w-auto gap-1 text-purple-200"
            >
              <span>Próxima</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </footer>

      {/* Botão Flutuante Dev no canto inferior direito (com capricho e sem poluir a interface) */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <button
          type="button"
          onClick={handleDevFill}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#120A24]/90 border border-purple-500/40 text-purple-200 hover:text-white hover:border-purple-300 shadow-[0_4px_20px_rgba(0,0,0,0.7)] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] backdrop-blur-md transition-all text-xs font-mono cursor-pointer active:scale-95"
          title="Preenche todas as 35 respostas aleatoriamente e abre o resultado"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline text-purple-400">Modo Dev:</span>
          <span>Preencher e Ver Resultado</span>
        </button>
      </div>
    </div>
  );
}
