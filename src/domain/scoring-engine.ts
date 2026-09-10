import { DIMENSION_ITEMS, DIMENSION_NAMES, REVERSE_ITEMS } from "./catalogo-hse";
import { classifyRisk } from "./classification";
import {
  AssessmentResult,
  DimensionCode,
  DimensionScore,
  RawAnswers,
  RiskLevel,
} from "./types";

/**
 * Erro específico disparado quando o payload de respostas viola regras psicométricas.
 */
export class DomainValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DomainValidationError";
  }
}

/**
 * Inverte a pontuação de um item Likert formulado negativamente (fórmula 6 - x).
 *
 * @param value Valor da resposta Likert (1 a 5)
 * @returns Pontuação invertida na direção da saúde mental (5 = saudável, 1 = crítico)
 */
export function reverseScore(value: number): number {
  return 6 - value;
}

/**
 * Arredonda um valor numérico para 2 casas decimais de forma consistente.
 */
export function roundTo2Decimals(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/**
 * Validação rigorosa (Fail-Fast) do payload de respostas do questionário.
 * Garante que exatamente os 35 itens obrigatórios existam e que suas notas sejam válidas (1 a 5).
 */
export function validateRawAnswers(rawAnswers: RawAnswers): void {
  if (!rawAnswers || typeof rawAnswers !== "object") {
    throw new DomainValidationError("Respostas inválidas: o payload deve ser um objeto.");
  }

  const keys = Object.keys(rawAnswers).map((k) => Number(k));

  // Verifica chaves inválidas ou fora do intervalo 1..35
  const invalidKeys = keys.filter(
    (k) => !Number.isInteger(k) || k < 1 || k > 35 || isNaN(k)
  );
  if (invalidKeys.length > 0) {
    throw new DomainValidationError(
      `Payload contém questões inválidas ou fora do intervalo 1 a 35: [${invalidKeys.join(", ")}].`
    );
  }

  // Verifica se faltam respostas (deve conter todos os 35 itens)
  const missingItems: number[] = [];
  for (let i = 1; i <= 35; i++) {
    if (!(i in rawAnswers) || rawAnswers[i] === undefined || rawAnswers[i] === null) {
      missingItems.push(i);
    }
  }

  if (missingItems.length > 0) {
    throw new DomainValidationError(
      `Respostas incompletas. Faltam ${missingItems.length} itens obrigatórios: [${missingItems.join(", ")}].`
    );
  }

  // Verifica validade das respostas (devem ser inteiros de 1 a 5)
  for (let i = 1; i <= 35; i++) {
    const val = rawAnswers[i];
    if (!Number.isInteger(val) || val < 1 || val > 5) {
      throw new DomainValidationError(
        `Questão ${i} contém valor fora da escala Likert (1 a 5): ${val}`
      );
    }
  }
}

/**
 * Calcula o diagnóstico psicométrico completo a partir das respostas dos 35 itens do HSE-IT.
 *
 * Aplica:
 * 1. Reverse scoring (6 - x) nos 8 itens negativos canônicos (3, 5, 6, 10, 13, 16, 18, 21).
 * 2. Cálculo da média de cada uma das 7 dimensões.
 * 3. Cálculo do Índice Geral de Bem-Estar (média dos 35 itens corrigidos).
 * 4. Classificação normativa de risco (BAIXO >= 4.0, MODERADO 3.0-3.99, CRITICO < 3.0).
 * 5. Agrupamento e ordenação de prioridades (críticos, moderados e saudáveis).
 *
 * @param rawAnswers Objeto com mapeamento { [numeroQuestao: number]: nota (1..5) }
 * @returns Objeto consolidado AssessmentResult
 */
export function calculateAssessment(rawAnswers: RawAnswers): AssessmentResult {
  validateRawAnswers(rawAnswers);

  // Calcula os scores individuais corrigidos dos 35 itens
  const correctedScores: Record<number, number> = {};
  for (let i = 1; i <= 35; i++) {
    const rawVal = rawAnswers[i];
    correctedScores[i] = REVERSE_ITEMS.has(i) ? reverseScore(rawVal) : rawVal;
  }

  const dimensionCodes: DimensionCode[] = [
    "demanda",
    "controle",
    "apoio_chefia",
    "apoio_colegas",
    "relacionamentos",
    "papel",
    "mudancas",
  ];

  const dimensions = {} as Record<DimensionCode, DimensionScore>;
  const dimensionsList: DimensionScore[] = [];

  for (const code of dimensionCodes) {
    const items = DIMENSION_ITEMS[code];
    const sum = items.reduce((acc, itemNum) => acc + correctedScores[itemNum], 0);
    const avg = roundTo2Decimals(sum / items.length);
    const risk: RiskLevel = classifyRisk(avg);

    const dimScore: DimensionScore = {
      code,
      name: DIMENSION_NAMES[code],
      score: avg,
      risk,
      itemCount: items.length,
    };

    dimensions[code] = dimScore;
    dimensionsList.push(dimScore);
  }

  // Média Geral dos 35 itens
  const totalSum = Object.values(correctedScores).reduce((acc, val) => acc + val, 0);
  const overallScore = roundTo2Decimals(totalSum / 35);
  const overallRisk = classifyRisk(overallScore);

  // Segmentação por criticidade
  // Dimensões críticas ordenadas pelo menor score (pior primeiro)
  const criticalDimensions = dimensionsList
    .filter((d) => d.risk === "CRITICO")
    .sort((a, b) => a.score - b.score);

  // Dimensões moderadas ordenadas pelo menor score
  const moderateDimensions = dimensionsList
    .filter((d) => d.risk === "MODERADO")
    .sort((a, b) => a.score - b.score);

  // Dimensões saudáveis ordenadas pelo maior score (melhor primeiro)
  const healthyDimensions = dimensionsList
    .filter((d) => d.risk === "BAIXO")
    .sort((a, b) => b.score - a.score);

  return {
    dimensions,
    dimensionsList,
    overallScore,
    overallRisk,
    criticalDimensions,
    moderateDimensions,
    healthyDimensions,
  };
}
