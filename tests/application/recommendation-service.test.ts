import { describe, expect, it } from "vitest";
import { calculateAssessment } from "@/domain/scoring-engine";
import { generateAssessmentReport } from "@/application/recommendation-service";
import { RawAnswers } from "@/domain/types";
import { REVERSE_ITEMS } from "@/domain/catalogo-hse";

describe("RecommendationService (Geração de Laudo Psicossocial)", () => {
  it("deve enriquecer um resultado de ambiente protetivo (todas as 7 dimensões saudáveis)", () => {
    const answers: RawAnswers = {};
    for (let i = 1; i <= 35; i++) {
      answers[i] = REVERSE_ITEMS.has(i) ? 1 : 5;
    }

    const assessmentResult = calculateAssessment(answers);
    const report = generateAssessmentReport(assessmentResult);

    expect(report.overallScore).toBe(5.0);
    expect(report.overallRisk).toBe("BAIXO");
    expect(report.criticalDimensions).toHaveLength(0);
    expect(report.moderateDimensions).toHaveLength(0);
    expect(report.healthyDimensions).toHaveLength(7);
    expect(report.primaryProtectiveFactor).toBeDefined();
    expect(report.primaryVulnerability).toBeUndefined();
    expect(report.overallBenchmark.position).toBe("ACIMA_P80");
  });

  it("deve enriquecer dimensões críticas com roteiro de liderança e ações de coping", () => {
    const answers: RawAnswers = {};
    for (let i = 1; i <= 35; i++) {
      answers[i] = 5; // Caso 2: demanda (1.67) e relacionamentos (2.00) ficam críticas
    }

    const assessmentResult = calculateAssessment(answers);
    const report = generateAssessmentReport(assessmentResult);

    expect(report.criticalDimensions).toHaveLength(2);
    expect(report.criticalDimensions[0].code).toBe("demanda");
    expect(report.criticalDimensions[0].score).toBe(1.67);
    expect(report.criticalDimensions[0].diagnosis.roteiro_conversa).toBeDefined();
    expect(report.criticalDimensions[0].diagnosis.roteiro_conversa!.length).toBeGreaterThan(20);
    expect(report.criticalDimensions[0].diagnosis.acoes).toBeDefined();
    expect(report.criticalDimensions[0].diagnosis.acoes!.length).toBeGreaterThanOrEqual(2);

    expect(report.primaryVulnerability).toBeDefined();
    expect(report.primaryVulnerability?.code).toBe("demanda");
  });

  it("deve mapear corretamente os percentis de benchmark para todas as dimensões", () => {
    const answers: RawAnswers = {};
    for (let i = 1; i <= 35; i++) {
      answers[i] = 3;
    }

    const assessmentResult = calculateAssessment(answers);
    const report = generateAssessmentReport(assessmentResult);

    expect(report.allDimensions).toHaveLength(7);
    report.allDimensions.forEach((dim) => {
      expect(dim.benchmark).toBeDefined();
      expect(dim.benchmark.position).toMatch(/^(ABAIXO_P20|MEDIANA|ACIMA_P80)$/);
      expect(dim.benchmark.percentiles.p50).toBeGreaterThan(0);
      expect(dim.benchmark.description.length).toBeGreaterThan(10);
    });
  });
});
