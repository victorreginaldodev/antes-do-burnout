import rawDiagnosticos from "./data/catalogo-diagnosticos-b2c.json";
import {
  DimensionCode,
  DimensionDiagnosis,
  DimensionDiagnosisContent,
  RiskLevel,
} from "./types";

/**
 * Catálogo canônico imutável de diagnósticos humanizados B2C, riscos associados,
 * ações práticas de enfrentamento (coping) e roteiros de conversa assertiva com a liderança.
 */
export const DIAGNOSTICOS_CATALOG: Record<DimensionCode, DimensionDiagnosis> =
  rawDiagnosticos as unknown as Record<DimensionCode, DimensionDiagnosis>;

/**
 * Retorna o conteúdo de diagnóstico específico para uma dada dimensão e nível de risco.
 */
export function getDiagnosis(
  dimension: DimensionCode,
  risk: RiskLevel
): DimensionDiagnosisContent {
  const dim = DIAGNOSTICOS_CATALOG[dimension];
  if (!dim) {
    throw new Error(`Dimensão psicossocial inválida ou não encontrada: "${dimension}"`);
  }
  const content = dim[risk];
  if (!content) {
    throw new Error(
      `Conteúdo de diagnóstico não encontrado para a dimensão "${dimension}" no nível "${risk}"`
    );
  }
  return content;
}

/**
 * Retorna o catálogo completo de diagnósticos de uma dimensão.
 */
export function getDimensionDiagnosisConfig(
  dimension: DimensionCode
): DimensionDiagnosis {
  const dim = DIAGNOSTICOS_CATALOG[dimension];
  if (!dim) {
    throw new Error(`Dimensão psicossocial inválida ou não encontrada: "${dimension}"`);
  }
  return dim;
}
