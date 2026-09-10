import { beforeEach, describe, expect, it } from "vitest";
import {
  clearCompletedAssessment,
  clearDraft,
  DRAFT_STORAGE_KEY,
  loadCompletedAssessment,
  loadDraft,
  RESULT_STORAGE_KEY,
  saveCompletedAssessment,
  saveDraft,
} from "@/infrastructure/storage/local-storage-adapter";
import { AssessmentResult } from "@/domain/types";

describe("LocalStorageAdapter (Persistência Resiliente)", () => {
  let mockStore: Record<string, string> = {};

  beforeEach(() => {
    mockStore = {};

    const mockLocalStorage = {
      getItem: (key: string) => mockStore[key] ?? null,
      setItem: (key: string, value: string) => {
        mockStore[key] = value;
      },
      removeItem: (key: string) => {
        delete mockStore[key];
      },
      clear: () => {
        mockStore = {};
      },
      length: 0,
      key: () => null,
    };

    // Define window e localStorage no ambiente de teste
    // @ts-expect-error mock controlado
    globalThis.window = {
      localStorage: mockLocalStorage,
    };
  });

  it("deve salvar e carregar rascunho de respostas corretamente", () => {
    saveDraft({ 1: 5, 2: 3 }, 1);

    const draft = loadDraft();
    expect(draft).not.toBeNull();
    expect(draft?.answers).toEqual({ 1: 5, 2: 3 });
    expect(draft?.currentIndex).toBe(1);
    expect(draft?.lastUpdated).toBeDefined();
  });

  it("deve limpar o rascunho com sucesso", () => {
    saveDraft({ 1: 4 }, 0);
    expect(loadDraft()).not.toBeNull();

    clearDraft();
    expect(loadDraft()).toBeNull();
    expect(mockStore[DRAFT_STORAGE_KEY]).toBeUndefined();
  });

  it("deve retornar null se o rascunho contiver JSON corrompido", () => {
    mockStore[DRAFT_STORAGE_KEY] = "invalid json {";
    expect(loadDraft()).toBeNull();
  });

  it("deve salvar, carregar e limpar snapshot do resultado final da avaliação", () => {
    const mockResult = {
      overallScore: 4.5,
      overallRisk: "BAIXO",
    } as unknown as AssessmentResult;

    saveCompletedAssessment(mockResult);

    const loaded = loadCompletedAssessment();
    expect(loaded).toEqual(mockResult);

    clearCompletedAssessment();
    expect(loadCompletedAssessment()).toBeNull();
    expect(mockStore[RESULT_STORAGE_KEY]).toBeUndefined();
  });

  it("deve operar graciosamente caso window seja undefined (ambiente SSR)", () => {
    // @ts-expect-error simulando SSR puro
    delete globalThis.window;

    expect(() => saveDraft({ 1: 5 }, 0)).not.toThrow();
    expect(loadDraft()).toBeNull();
    expect(loadCompletedAssessment()).toBeNull();
  });
});
