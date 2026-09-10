import { describe, expect, it } from "vitest";
import {
  DIMENSION_ITEMS,
  DIMENSION_NAMES,
  QUESTIONS_CATALOG,
  REVERSE_ITEMS,
  getQuestionByNumber,
  isReverseItem,
} from "@/domain/catalogo-hse";
import { classifyRisk, RISK_CONFIG } from "@/domain/classification";
import { compareWithBenchmark, HSE_BENCHMARKS } from "@/domain/benchmarks";
import {
  DIAGNOSTICOS_CATALOG,
  getDiagnosis,
  getDimensionDiagnosisConfig,
} from "@/domain/catalogo-diagnosticos";
import {
  calculateAssessment,
  DomainValidationError,
  reverseScore,
  roundTo2Decimals,
  validateRawAnswers,
} from "@/domain/scoring-engine";
import { DimensionCode, RawAnswers, RiskLevel } from "@/domain/types";

describe("Catálogo Canônico HSE-IT (35 Perguntas)", () => {
  it("deve conter exatamente 35 perguntas numeradas de 1 a 35 sequencialmente", () => {
    expect(QUESTIONS_CATALOG).toHaveLength(35);
    QUESTIONS_CATALOG.forEach((q, idx) => {
      expect(q.numero).toBe(idx + 1);
      expect(q.texto.trim().length).toBeGreaterThan(10);
      expect(q.opcoes).toHaveLength(5);
    });
  });

  it("deve ter exatamente 8 itens de reverse scoring: {3, 5, 6, 10, 13, 16, 18, 21}", () => {
    const expectedReverse = [3, 5, 6, 10, 13, 16, 18, 21];
    expect(Array.from(REVERSE_ITEMS).sort((a, b) => a - b)).toEqual(expectedReverse);

    expectedReverse.forEach((num) => {
      expect(isReverseItem(num)).toBe(true);
      const q = getQuestionByNumber(num);
      expect(q?.inverter).toBe(true);
    });

    const catalogReverse = QUESTIONS_CATALOG.filter((q) => q.inverter).map((q) => q.numero);
    expect(catalogReverse.sort((a, b) => a - b)).toEqual(expectedReverse);
  });

  it("deve garantir partição exata dos 35 itens entre as 7 dimensões sem repetição ou omissão", () => {
    const allAssignedItems: number[] = [];
    const dimensionEntries = Object.entries(DIMENSION_ITEMS) as [
      DimensionCode,
      readonly number[],
    ][];

    expect(dimensionEntries).toHaveLength(7);

    // Valida contagem específica de cada dimensão
    expect(DIMENSION_ITEMS.demanda).toHaveLength(6);
    expect(DIMENSION_ITEMS.controle).toHaveLength(5);
    expect(DIMENSION_ITEMS.apoio_chefia).toHaveLength(5);
    expect(DIMENSION_ITEMS.apoio_colegas).toHaveLength(4);
    expect(DIMENSION_ITEMS.relacionamentos).toHaveLength(4);
    expect(DIMENSION_ITEMS.papel).toHaveLength(7);
    expect(DIMENSION_ITEMS.mudancas).toHaveLength(4);

    for (const [, items] of dimensionEntries) {
      allAssignedItems.push(...items);
    }

    expect(allAssignedItems).toHaveLength(35);
    const sorted = [...allAssignedItems].sort((a, b) => a - b);
    const expected = Array.from({ length: 35 }, (_, i) => i + 1);
    expect(sorted).toEqual(expected);
  });

  it("deve mapear nomes amigáveis para todas as 7 dimensões", () => {
    const keys = Object.keys(DIMENSION_NAMES);
    expect(keys).toHaveLength(7);
    expect(DIMENSION_NAMES.demanda).toBe("Demandas");
    expect(DIMENSION_NAMES.controle).toBe("Controle e Autonomia");
    expect(DIMENSION_NAMES.apoio_chefia).toBe("Apoio da Chefia");
    expect(DIMENSION_NAMES.apoio_colegas).toBe("Apoio dos Colegas");
    expect(DIMENSION_NAMES.relacionamentos).toBe("Relacionamentos");
    expect(DIMENSION_NAMES.papel).toBe("Clareza de Papel");
    expect(DIMENSION_NAMES.mudancas).toBe("Gestão de Mudanças");
  });
});

describe("Algoritmo de Reverse Scoring (6 - x)", () => {
  it("deve inverter perfeitamente a escala Likert de 1 a 5", () => {
    expect(reverseScore(1)).toBe(5);
    expect(reverseScore(2)).toBe(4);
    expect(reverseScore(3)).toBe(3);
    expect(reverseScore(4)).toBe(2);
    expect(reverseScore(5)).toBe(1);
  });
});

describe("Validação de Respostas Brutas (Fail-Fast)", () => {
  const createValidPayload = (): RawAnswers => {
    const payload: RawAnswers = {};
    for (let i = 1; i <= 35; i++) {
      payload[i] = 3;
    }
    return payload;
  };

  it("deve aceitar um payload completo de 35 respostas válidas (1 a 5)", () => {
    const payload = createValidPayload();
    expect(() => validateRawAnswers(payload)).not.toThrow();
  });

  it("deve rejeitar payload que não é objeto", () => {
    // @ts-expect-error teste de robustez em runtime
    expect(() => validateRawAnswers(null)).toThrow(DomainValidationError);
  });

  it("deve rejeitar payload com respostas faltando", () => {
    const payload = createValidPayload();
    delete payload[35];
    expect(() => validateRawAnswers(payload)).toThrow(/Respostas incompletas/);
  });

  it("deve rejeitar valores fora do intervalo 1 a 5 (ex: 0 ou 6)", () => {
    const payloadZero = createValidPayload();
    payloadZero[10] = 0;
    expect(() => validateRawAnswers(payloadZero)).toThrow(/fora da escala Likert/);

    const payloadSix = createValidPayload();
    payloadSix[10] = 6;
    expect(() => validateRawAnswers(payloadSix)).toThrow(/fora da escala Likert/);
  });

  it("deve rejeitar valores não inteiros ou decimais", () => {
    const payloadDecimal = createValidPayload();
    payloadDecimal[5] = 3.5;
    expect(() => validateRawAnswers(payloadDecimal)).toThrow(/fora da escala Likert/);
  });

  it("deve rejeitar chaves fora do intervalo 1..35", () => {
    const payloadExtra = createValidPayload();
    payloadExtra[36] = 4;
    expect(() => validateRawAnswers(payloadExtra)).toThrow(/fora do intervalo 1 a 35/);
  });
});

describe("Classificação Normativa de Risco e Limites", () => {
  it("deve classificar com precisão as faixas de corte nos limites exatos", () => {
    expect(classifyRisk(5.0)).toBe("BAIXO");
    expect(classifyRisk(4.0)).toBe("BAIXO");
    expect(classifyRisk(3.99)).toBe("MODERADO");
    expect(classifyRisk(3.0)).toBe("MODERADO");
    expect(classifyRisk(2.99)).toBe("CRITICO");
    expect(classifyRisk(1.0)).toBe("CRITICO");
  });

  it("deve possuir metadados visuais completos para cada nível de risco", () => {
    const levels: RiskLevel[] = ["BAIXO", "MODERADO", "CRITICO"];
    levels.forEach((lvl) => {
      const meta = RISK_CONFIG[lvl];
      expect(meta.label).toBeDefined();
      expect(meta.hexColor).toMatch(/^#[0-9A-F]{6}$/i);
      expect(meta.tailwindBg).toContain("bg-");
    });
  });
});

describe("Motor Psicométrico: Fixtures Canônicas de Paridade", () => {
  it("Caso 1: Ambiente Totalmente Saudável (Respostas normais = 5, Invertidas = 1)", () => {
    const answers: RawAnswers = {};
    for (let i = 1; i <= 35; i++) {
      answers[i] = REVERSE_ITEMS.has(i) ? 1 : 5;
    }

    const result = calculateAssessment(answers);

    // Todas as 7 dimensões devem ser 5.00 e BAIXO risco
    Object.values(result.dimensions).forEach((dim) => {
      expect(dim.score).toBe(5.0);
      expect(dim.risk).toBe("BAIXO");
    });

    expect(result.overallScore).toBe(5.0);
    expect(result.overallRisk).toBe("BAIXO");
    expect(result.criticalDimensions).toHaveLength(0);
    expect(result.moderateDimensions).toHaveLength(0);
    expect(result.healthyDimensions).toHaveLength(7);
  });

  it("Caso 2: Respostas Máximas Teóricas (Todas as 35 respostas = 5)", () => {
    const answers: RawAnswers = {};
    for (let i = 1; i <= 35; i++) {
      answers[i] = 5;
    }

    const result = calculateAssessment(answers);

    // Demanda: (1+1+1+5+1+1)/6 = 10/6 = 1.67 (CRÍTICO)
    expect(result.dimensions.demanda.score).toBe(1.67);
    expect(result.dimensions.demanda.risk).toBe("CRITICO");

    // Relacionamentos: (1+1+1+5)/4 = 8/4 = 2.00 (CRÍTICO)
    expect(result.dimensions.relacionamentos.score).toBe(2.0);
    expect(result.dimensions.relacionamentos.risk).toBe("CRITICO");

    // As outras 5 dimensões não têm itens invertidos, logo todas devem ser 5.00 (BAIXO)
    expect(result.dimensions.controle.score).toBe(5.0);
    expect(result.dimensions.controle.risk).toBe("BAIXO");
    expect(result.dimensions.apoio_chefia.score).toBe(5.0);
    expect(result.dimensions.apoio_colegas.score).toBe(5.0);
    expect(result.dimensions.papel.score).toBe(5.0);
    expect(result.dimensions.mudancas.score).toBe(5.0);

    // Média geral: (27*5 + 8*1) / 35 = 143 / 35 = 4.0857... -> 4.09 (BAIXO)
    expect(result.overallScore).toBe(4.09);
    expect(result.overallRisk).toBe("BAIXO");

    // Segmentação
    expect(result.criticalDimensions).toHaveLength(2);
    expect(result.criticalDimensions[0].code).toBe("demanda"); // 1.67 vem antes de 2.00
    expect(result.criticalDimensions[1].code).toBe("relacionamentos");
    expect(result.healthyDimensions).toHaveLength(5);
  });

  it("Caso 3: Respostas Mínimas Teóricas (Todas as 35 respostas = 1)", () => {
    const answers: RawAnswers = {};
    for (let i = 1; i <= 35; i++) {
      answers[i] = 1;
    }

    const result = calculateAssessment(answers);

    // Demanda: (5*5 + 1)/6 = 26/6 = 4.33 (BAIXO)
    expect(result.dimensions.demanda.score).toBe(4.33);
    expect(result.dimensions.demanda.risk).toBe("BAIXO");

    // Relacionamentos: (3*5 + 1)/4 = 16/4 = 4.00 (BAIXO)
    expect(result.dimensions.relacionamentos.score).toBe(4.0);
    expect(result.dimensions.relacionamentos.risk).toBe("BAIXO");

    // As outras 5 dimensões devem ser 1.00 (CRÍTICO)
    expect(result.dimensions.controle.score).toBe(1.0);
    expect(result.dimensions.controle.risk).toBe("CRITICO");
    expect(result.dimensions.apoio_chefia.score).toBe(1.0);
    expect(result.dimensions.apoio_chefia.risk).toBe("CRITICO");
    expect(result.dimensions.apoio_colegas.score).toBe(1.0);
    expect(result.dimensions.papel.score).toBe(1.0);
    expect(result.dimensions.mudancas.score).toBe(1.0);

    // Média geral: (8*5 + 27*1) / 35 = 67 / 35 = 1.9142... -> 1.91 (CRÍTICO)
    expect(result.overallScore).toBe(1.91);
    expect(result.overallRisk).toBe("CRITICO");

    expect(result.criticalDimensions).toHaveLength(5);
    expect(result.healthyDimensions).toHaveLength(2);
  });

  it("Caso 4: Precisão do arredondamento determinístico", () => {
    expect(roundTo2Decimals(1.666666)).toBe(1.67);
    expect(roundTo2Decimals(4.085714)).toBe(4.09);
    expect(roundTo2Decimals(3.000001)).toBe(3.0);
    expect(roundTo2Decimals(2.999)).toBe(3.0);
  });
});

describe("Catálogo de Diagnósticos B2C", () => {
  const dimensionCodes: DimensionCode[] = [
    "demanda",
    "controle",
    "apoio_chefia",
    "apoio_colegas",
    "relacionamentos",
    "papel",
    "mudancas",
  ];

  it("deve conter diagnósticos válidos e humanizados para todas as 7 dimensões e 3 níveis", () => {
    const levels: RiskLevel[] = ["CRITICO", "MODERADO", "BAIXO"];

    dimensionCodes.forEach((dim) => {
      const config = getDimensionDiagnosisConfig(dim);
      expect(config.nome).toBeDefined();

      levels.forEach((lvl) => {
        const diag = getDiagnosis(dim, lvl);
        expect(diag.titulo.length).toBeGreaterThan(5);
        expect(diag.diagnostico.length).toBeGreaterThan(15);

        if (lvl === "CRITICO") {
          expect(diag.riscos).toBeDefined();
          expect(diag.acoes).toBeDefined();
          expect(diag.acoes!.length).toBeGreaterThanOrEqual(2);
          expect(diag.roteiro_conversa).toBeDefined();
          expect(diag.roteiro_conversa!.length).toBeGreaterThan(20);
        }

        if (lvl === "MODERADO") {
          expect(diag.acoes).toBeDefined();
          expect(diag.acoes!.length).toBeGreaterThanOrEqual(1);
        }
      });
    });
  });

  it("deve disparar erro explicativo para dimensão inexistente", () => {
    // @ts-expect-error teste de runtime
    expect(() => getDiagnosis("invalida", "CRITICO")).toThrow(/Dimensão psicossocial inválida/);
  });

  it("deve conter todas as 7 dimensões no DIAGNOSTICOS_CATALOG", () => {
    expect(Object.keys(DIAGNOSTICOS_CATALOG)).toHaveLength(7);
  });
});

describe("Benchmarks Normativos Oficiais", () => {
  it("deve mapear pontuações corretamente nos percentis P20, P50 e P80", () => {
    // Demanda: P20 = 2.80, P80 = 3.80
    const below = compareWithBenchmark("demanda", 2.5);
    expect(below.position).toBe("ABAIXO_P20");

    const mid = compareWithBenchmark("demanda", 3.2);
    expect(mid.position).toBe("MEDIANA");

    const high = compareWithBenchmark("demanda", 4.5);
    expect(high.position).toBe("ACIMA_P80");
  });

  it("deve conter percentis para todas as 7 dimensões e geral no HSE_BENCHMARKS", () => {
    expect(Object.keys(HSE_BENCHMARKS)).toHaveLength(8);
    expect(HSE_BENCHMARKS.geral.p50).toBe(3.85);
  });
});
