import { QUESTIONS_CATALOG } from "@/domain/catalogo-hse";
import { Question, RawAnswers } from "@/domain/types";
import { AssessmentDraft } from "@/infrastructure/storage/local-storage-adapter";

export interface SessionData {
  currentIndex: number;
  answers: RawAnswers;
  direction: 1 | -1;
}

export type SessionAction =
  | { type: "RESTORE_DRAFT"; draft: AssessmentDraft }
  | { type: "ANSWER_QUESTION"; questionNumber: number; value: number }
  | { type: "GO_TO_PREVIOUS" }
  | { type: "GO_TO_NEXT" }
  | { type: "GO_TO_QUESTION"; targetIndex: number }
  | { type: "RESET_SESSION" };

export function createInitialSessionData(draft?: AssessmentDraft | null): SessionData {
  if (draft && typeof draft.currentIndex === "number" && draft.answers) {
    const safeIndex =
      draft.currentIndex >= 0 && draft.currentIndex < QUESTIONS_CATALOG.length
        ? draft.currentIndex
        : 0;
    return {
      currentIndex: safeIndex,
      answers: draft.answers,
      direction: 1,
    };
  }
  return {
    currentIndex: 0,
    answers: {},
    direction: 1,
  };
}

export function sessionReducer(state: SessionData, action: SessionAction): SessionData {
  switch (action.type) {
    case "RESTORE_DRAFT":
      return createInitialSessionData(action.draft);

    case "ANSWER_QUESTION": {
      const updatedAnswers = {
        ...state.answers,
        [action.questionNumber]: action.value,
      };
      return {
        ...state,
        answers: updatedAnswers,
      };
    }

    case "GO_TO_PREVIOUS": {
      if (state.currentIndex > 0) {
        return {
          ...state,
          currentIndex: state.currentIndex - 1,
          direction: -1,
        };
      }
      return state;
    }

    case "GO_TO_NEXT": {
      if (state.currentIndex < QUESTIONS_CATALOG.length - 1) {
        return {
          ...state,
          currentIndex: state.currentIndex + 1,
          direction: 1,
        };
      }
      return state;
    }

    case "GO_TO_QUESTION": {
      if (
        action.targetIndex >= 0 &&
        action.targetIndex < QUESTIONS_CATALOG.length &&
        action.targetIndex !== state.currentIndex
      ) {
        return {
          ...state,
          currentIndex: action.targetIndex,
          direction: action.targetIndex > state.currentIndex ? 1 : -1,
        };
      }
      return state;
    }

    case "RESET_SESSION":
      return {
        currentIndex: 0,
        answers: {},
        direction: 1,
      };

    default:
      return state;
  }
}

export interface ComputedSessionMetrics {
  currentQuestion: Question;
  currentAnswer: number | undefined;
  answeredCount: number;
  progressPercentage: number;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  isComplete: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
}

export function computeSessionMetrics(state: SessionData): ComputedSessionMetrics {
  const currentQuestion = QUESTIONS_CATALOG[state.currentIndex] || QUESTIONS_CATALOG[0];
  const currentAnswer = state.answers[currentQuestion.numero];
  const answeredCount = Object.keys(state.answers).length;
  const progressPercentage = Math.min(
    100,
    Math.round((answeredCount / QUESTIONS_CATALOG.length) * 100)
  );

  return {
    currentQuestion,
    currentAnswer,
    answeredCount,
    progressPercentage,
    isFirstQuestion: state.currentIndex === 0,
    isLastQuestion: state.currentIndex === QUESTIONS_CATALOG.length - 1,
    isComplete: answeredCount === QUESTIONS_CATALOG.length,
    canGoBack: state.currentIndex > 0,
    canGoForward:
      state.currentIndex < QUESTIONS_CATALOG.length - 1 && currentAnswer !== undefined,
  };
}
