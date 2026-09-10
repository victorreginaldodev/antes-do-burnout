import { describe, expect, it } from "vitest";
import {
  computeSessionMetrics,
  createInitialSessionData,
  sessionReducer,
  SessionData,
} from "@/application/assessment-session-machine";

describe("AssessmentSessionMachine (Máquina de Estados da Sessão)", () => {
  it("deve inicializar sessão vazia na questão 0", () => {
    const session = createInitialSessionData();
    expect(session.currentIndex).toBe(0);
    expect(session.answers).toEqual({});
    expect(session.direction).toBe(1);

    const metrics = computeSessionMetrics(session);
    expect(metrics.isFirstQuestion).toBe(true);
    expect(metrics.isLastQuestion).toBe(false);
    expect(metrics.isComplete).toBe(false);
    expect(metrics.answeredCount).toBe(0);
    expect(metrics.progressPercentage).toBe(0);
    expect(metrics.canGoBack).toBe(false);
  });

  it("deve restaurar rascunho preservando limites de índice seguros", () => {
    const session = createInitialSessionData({
      answers: { 1: 5, 2: 4 },
      currentIndex: 2,
      lastUpdated: new Date().toISOString(),
    });

    expect(session.currentIndex).toBe(2);
    expect(session.answers).toEqual({ 1: 5, 2: 4 });

    const metrics = computeSessionMetrics(session);
    expect(metrics.answeredCount).toBe(2);
    expect(metrics.canGoBack).toBe(true);
  });

  it("deve registrar respostas e atualizar métricas de progresso", () => {
    let state = createInitialSessionData();
    state = sessionReducer(state, {
      type: "ANSWER_QUESTION",
      questionNumber: 1,
      value: 4,
    });

    expect(state.answers[1]).toBe(4);

    const metrics = computeSessionMetrics(state);
    expect(metrics.answeredCount).toBe(1);
    expect(metrics.progressPercentage).toBe(3); // 1/35 * 100 = 2.85 -> 3%
    expect(metrics.currentAnswer).toBe(4);
    expect(metrics.canGoForward).toBe(true);
  });

  it("deve navegar para frente (GO_TO_NEXT) com direction = 1 e travar no limite 34", () => {
    let state: SessionData = {
      currentIndex: 33,
      answers: {},
      direction: 1,
    };

    state = sessionReducer(state, { type: "GO_TO_NEXT" });
    expect(state.currentIndex).toBe(34);
    expect(state.direction).toBe(1);

    // Tentativa de ultrapassar limite de 35 itens (índice 34)
    state = sessionReducer(state, { type: "GO_TO_NEXT" });
    expect(state.currentIndex).toBe(34);
  });

  it("deve navegar para trás (GO_TO_PREVIOUS) com direction = -1 e travar no limite 0", () => {
    let state: SessionData = {
      currentIndex: 1,
      answers: {},
      direction: 1,
    };

    state = sessionReducer(state, { type: "GO_TO_PREVIOUS" });
    expect(state.currentIndex).toBe(0);
    expect(state.direction).toBe(-1);

    // Tentativa de retroceder abaixo de 0
    state = sessionReducer(state, { type: "GO_TO_PREVIOUS" });
    expect(state.currentIndex).toBe(0);
  });

  it("deve pular para questão específica definindo a direção correta", () => {
    let state = createInitialSessionData();

    // Avançar de 0 para 10
    state = sessionReducer(state, { type: "GO_TO_QUESTION", targetIndex: 10 });
    expect(state.currentIndex).toBe(10);
    expect(state.direction).toBe(1);

    // Retroceder de 10 para 5
    state = sessionReducer(state, { type: "GO_TO_QUESTION", targetIndex: 5 });
    expect(state.currentIndex).toBe(5);
    expect(state.direction).toBe(-1);
  });

  it("deve reiniciar a sessão (RESET_SESSION) zerando respostas e voltando à questão 0", () => {
    let state: SessionData = {
      currentIndex: 15,
      answers: { 1: 5, 2: 4, 3: 3 },
      direction: 1,
    };

    state = sessionReducer(state, { type: "RESET_SESSION" });
    expect(state.currentIndex).toBe(0);
    expect(state.answers).toEqual({});
    expect(state.direction).toBe(1);
  });

  it("deve reconhecer conclusão completa quando as 35 questões estiverem respondidas", () => {
    const fullAnswers: Record<number, number> = {};
    for (let i = 1; i <= 35; i++) {
      fullAnswers[i] = 3;
    }

    const state: SessionData = {
      currentIndex: 34,
      answers: fullAnswers,
      direction: 1,
    };

    const metrics = computeSessionMetrics(state);
    expect(metrics.isLastQuestion).toBe(true);
    expect(metrics.isComplete).toBe(true);
    expect(metrics.progressPercentage).toBe(100);
  });
});
