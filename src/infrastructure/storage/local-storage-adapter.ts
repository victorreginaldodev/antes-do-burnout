import { AssessmentResult, RawAnswers } from "@/domain/types";

export const DRAFT_STORAGE_KEY = "antes_burnout_draft_v1";
export const RESULT_STORAGE_KEY = "antes_burnout_result_v1";

export interface AssessmentDraft {
  answers: RawAnswers;
  currentIndex: number;
  lastUpdated: string;
}

function isStorageAvailable(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    const testKey = "__storage_test__";
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Salva o rascunho de respostas e a pergunta atual no localStorage.
 */
export function saveDraft(answers: RawAnswers, currentIndex: number): void {
  if (!isStorageAvailable()) return;
  try {
    const draft: AssessmentDraft = {
      answers,
      currentIndex,
      lastUpdated: new Date().toISOString(),
    };
    window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
  } catch (err) {
    console.warn("Não foi possível salvar o rascunho no localStorage:", err);
  }
}

/**
 * Recupera o rascunho salvo do localStorage, se existente.
 */
export function loadDraft(): AssessmentDraft | null {
  if (!isStorageAvailable()) return null;
  try {
    const raw = window.localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.answers === "object" && typeof parsed.currentIndex === "number") {
      return parsed as AssessmentDraft;
    }
    return null;
  } catch (err) {
    console.warn("Erro ao ler o rascunho do localStorage:", err);
    return null;
  }
}

/**
 * Limpa o rascunho de respostas do localStorage.
 */
export function clearDraft(): void {
  if (!isStorageAvailable()) return;
  try {
    window.localStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch (err) {
    console.warn("Erro ao limpar rascunho do localStorage:", err);
  }
}

/**
 * Salva o resultado final concluído no localStorage para consumo da tela /resultado.
 */
export function saveCompletedAssessment(result: AssessmentResult): void {
  if (!isStorageAvailable()) return;
  try {
    window.localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(result));
  } catch (err) {
    console.warn("Não foi possível salvar o resultado no localStorage:", err);
  }
}

/**
 * Recupera o resultado final salvo do localStorage.
 */
export function loadCompletedAssessment(): AssessmentResult | null {
  if (!isStorageAvailable()) return null;
  try {
    const raw = window.localStorage.getItem(RESULT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AssessmentResult;
  } catch (err) {
    console.warn("Erro ao ler o resultado do localStorage:", err);
    return null;
  }
}

/**
 * Limpa o resultado final salvo do localStorage.
 */
export function clearCompletedAssessment(): void {
  if (!isStorageAvailable()) return;
  try {
    window.localStorage.removeItem(RESULT_STORAGE_KEY);
  } catch (err) {
    console.warn("Erro ao limpar resultado do localStorage:", err);
  }
}
