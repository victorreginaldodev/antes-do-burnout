"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useSyncExternalStore,
} from "react";
import { QUESTIONS_CATALOG } from "@/domain/catalogo-hse";
import { calculateAssessment } from "@/domain/scoring-engine";
import { AssessmentResult, Question, RawAnswers } from "@/domain/types";
import {
  clearDraft,
  loadDraft,
  saveCompletedAssessment,
  saveDraft,
} from "@/infrastructure/storage/local-storage-adapter";
import {
  computeSessionMetrics,
  createInitialSessionData,
  sessionReducer,
} from "./assessment-session-machine";

export interface AssessmentSessionState {
  currentIndex: number;
  currentQuestion: Question;
  currentAnswer: number | undefined;
  answers: RawAnswers;
  answeredCount: number;
  progressPercentage: number;
  isHydrated: boolean;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  isComplete: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  direction: 1 | -1;
  answerQuestion: (value: number, autoAdvance?: boolean) => void;
  goToPrevious: () => void;
  goToNext: () => void;
  goToQuestion: (index: number) => void;
  resetSession: () => void;
  finishAssessment: (explicitAnswers?: RawAnswers) => AssessmentResult;
  fillRandomAnswersAndFinish: () => AssessmentResult;
}

export function useAssessmentSession(): AssessmentSessionState {
  const [state, dispatch] = useReducer(sessionReducer, null, () =>
    createInitialSessionData()
  );

  // Detecção segura de hidratação no cliente via useSyncExternalStore
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Restaura rascunho anterior ao montar no cliente
  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      dispatch({ type: "RESTORE_DRAFT", draft });
    }
  }, []);

  const metrics = useMemo(() => computeSessionMetrics(state), [state]);

  const answerQuestion = useCallback(
    (value: number, autoAdvance = true) => {
      const qNum = metrics.currentQuestion.numero;
      dispatch({ type: "ANSWER_QUESTION", questionNumber: qNum, value });

      const updatedAnswers = {
        ...state.answers,
        [qNum]: value,
      };

      if (autoAdvance && state.currentIndex < QUESTIONS_CATALOG.length - 1) {
        const nextIdx = state.currentIndex + 1;
        saveDraft(updatedAnswers, nextIdx);

        setTimeout(() => {
          dispatch({ type: "GO_TO_NEXT" });
        }, 180);
      } else {
        saveDraft(updatedAnswers, state.currentIndex);
      }
    },
    [metrics.currentQuestion.numero, state.answers, state.currentIndex]
  );

  const goToPrevious = useCallback(() => {
    if (state.currentIndex > 0) {
      const prevIdx = state.currentIndex - 1;
      saveDraft(state.answers, prevIdx);
      dispatch({ type: "GO_TO_PREVIOUS" });
    }
  }, [state.currentIndex, state.answers]);

  const goToNext = useCallback(() => {
    if (state.currentIndex < QUESTIONS_CATALOG.length - 1) {
      const nextIdx = state.currentIndex + 1;
      saveDraft(state.answers, nextIdx);
      dispatch({ type: "GO_TO_NEXT" });
    }
  }, [state.currentIndex, state.answers]);

  const goToQuestion = useCallback(
    (targetIndex: number) => {
      if (targetIndex >= 0 && targetIndex < QUESTIONS_CATALOG.length) {
        saveDraft(state.answers, targetIndex);
        dispatch({ type: "GO_TO_QUESTION", targetIndex });
      }
    },
    [state.answers]
  );

  const resetSession = useCallback(() => {
    clearDraft();
    dispatch({ type: "RESET_SESSION" });
  }, []);

  const finishAssessment = useCallback(
    (explicitAnswers?: RawAnswers): AssessmentResult => {
      const rawAnswers = explicitAnswers || state.answers;
      // Garante que todos os 35 itens estejam preenchidos para blindar contra falhas
      const completeAnswers: RawAnswers = {};
      for (let i = 1; i <= QUESTIONS_CATALOG.length; i++) {
        completeAnswers[i] = rawAnswers[i] ?? 3;
      }

      const result = calculateAssessment(completeAnswers);
      saveCompletedAssessment(result);
      clearDraft();
      return result;
    },
    [state.answers]
  );

  const fillRandomAnswersAndFinish = useCallback((): AssessmentResult => {
    const randomAnswers: RawAnswers = {};
    for (let i = 1; i <= QUESTIONS_CATALOG.length; i++) {
      randomAnswers[i] = Math.floor(Math.random() * 5) + 1;
    }
    const result = calculateAssessment(randomAnswers);
    saveCompletedAssessment(result);
    clearDraft();
    return result;
  }, []);

  return {
    currentIndex: state.currentIndex,
    currentQuestion: metrics.currentQuestion,
    currentAnswer: metrics.currentAnswer,
    answers: state.answers,
    answeredCount: metrics.answeredCount,
    progressPercentage: metrics.progressPercentage,
    isHydrated,
    isFirstQuestion: metrics.isFirstQuestion,
    isLastQuestion: metrics.isLastQuestion,
    isComplete: metrics.isComplete,
    canGoBack: metrics.canGoBack,
    canGoForward: metrics.canGoForward,
    direction: state.direction,
    answerQuestion,
    goToPrevious,
    goToNext,
    goToQuestion,
    resetSession,
    finishAssessment,
    fillRandomAnswersAndFinish,
  };
}
