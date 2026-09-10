import { describe, expect, it } from "vitest";
import { calculateAssessment } from "@/domain/scoring-engine";
import { generateAssessmentReport } from "@/application/recommendation-service";
import { prepareSocialCardData } from "@/application/share-orchestrator";
import { RawAnswers } from "@/domain/types";
import { REVERSE_ITEMS } from "@/domain/catalogo-hse";

describe("ShareOrchestrator (Preparação de Dados para Redes Sociais)", () => {
  it("deve estruturar card para ambiente com fatores de proteção (BAIXO risco)", () => {
    const answers: RawAnswers = {};
    for (let i = 1; i <= 35; i++) {
      answers[i] = REVERSE_ITEMS.has(i) ? 1 : 5;
    }

    const report = generateAssessmentReport(calculateAssessment(answers));
    const cardData = prepareSocialCardData(report, "https://antesdoburnout.com.br");

    expect(cardData.overallScore).toBe(5.0);
    expect(cardData.overallRisk).toBe("BAIXO");
    expect(cardData.profileTitle).toContain("Equilíbrio");
    expect(cardData.radarPoints).toHaveLength(7);
    expect(cardData.strongestDimension).toBeDefined();
    expect(cardData.attentionDimension).toBeUndefined();
    expect(cardData.shareText).toContain("5.00/5.00");
    expect(cardData.shareText).toContain("antesdoburnout.com.br");
  });

  it("deve destacar a dimensão de atenção prioritária para perfis críticos", () => {
    const answers: RawAnswers = {};
    for (let i = 1; i <= 35; i++) {
      answers[i] = 5; // Demanda (1.67) e Relacionamentos (2.00)
    }

    const report = generateAssessmentReport(calculateAssessment(answers));
    const cardData = prepareSocialCardData(report);

    expect(cardData.radarPoints).toHaveLength(7);
    expect(cardData.attentionDimension).toBeDefined();
    expect(cardData.attentionDimension?.name).toBe("Demandas");
    expect(cardData.attentionDimension?.score).toBe(1.67);
    expect(cardData.profileTitle).toContain("Demandas");
  });
});
