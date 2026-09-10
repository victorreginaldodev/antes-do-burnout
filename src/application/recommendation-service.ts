import {
  BenchmarkPosition,
  compareWithBenchmark,
} from "@/domain/benchmarks";
import { getDiagnosis } from "@/domain/catalogo-diagnosticos";
import {
  AssessmentResult,
  BenchmarkPercentiles,
  DimensionCode,
  DimensionDiagnosisContent,
  DimensionScore,
  RiskLevel,
} from "@/domain/types";

export interface EnrichedDimension {
  code: DimensionCode;
  name: string;
  score: number;
  risk: RiskLevel;
  itemCount: number;
  diagnosis: DimensionDiagnosisContent;
  benchmark: {
    position: BenchmarkPosition;
    percentiles: BenchmarkPercentiles;
    description: string;
  };
}

export interface AssessmentReport {
  overallScore: number;
  overallRisk: RiskLevel;
  overallBenchmark: {
    position: BenchmarkPosition;
    percentiles: BenchmarkPercentiles;
    description: string;
  };
  criticalDimensions: EnrichedDimension[];
  moderateDimensions: EnrichedDimension[];
  healthyDimensions: EnrichedDimension[];
  allDimensions: EnrichedDimension[];
  primaryVulnerability?: EnrichedDimension;
  primaryProtectiveFactor?: EnrichedDimension;
}

function enrichDimension(dim: DimensionScore): EnrichedDimension {
  const diagnosis = getDiagnosis(dim.code, dim.risk);
  const benchmark = compareWithBenchmark(dim.code, dim.score);

  return {
    code: dim.code,
    name: dim.name,
    score: dim.score,
    risk: dim.risk,
    itemCount: dim.itemCount,
    diagnosis,
    benchmark,
  };
}

/**
 * Traduz o resultado numérico bruto do UK HSE-IT em um laudo estruturado e enriquecido,
 * associando diagnósticos humanizados, ações de enfrentamento e benchmark populacional.
 */
export function generateAssessmentReport(
  result: AssessmentResult
): AssessmentReport {
  const allDimensions = result.dimensionsList.map(enrichDimension);

  const criticalDimensions = allDimensions
    .filter((d) => d.risk === "CRITICO")
    .sort((a, b) => a.score - b.score);

  const moderateDimensions = allDimensions
    .filter((d) => d.risk === "MODERADO")
    .sort((a, b) => a.score - b.score);

  const healthyDimensions = allDimensions
    .filter((d) => d.risk === "BAIXO")
    .sort((a, b) => b.score - a.score);

  // Maior vulnerabilidade: dimensão com o menor score geral
  const sortedByScoreAsc = [...allDimensions].sort((a, b) => a.score - b.score);
  const primaryVulnerability =
    sortedByScoreAsc[0].risk === "CRITICO" || sortedByScoreAsc[0].risk === "MODERADO"
      ? sortedByScoreAsc[0]
      : undefined;

  // Maior fator protetor: dimensão com o maior score geral
  const sortedByScoreDesc = [...allDimensions].sort((a, b) => b.score - a.score);
  const primaryProtectiveFactor =
    sortedByScoreDesc[0].risk === "BAIXO" ? sortedByScoreDesc[0] : undefined;

  const overallBenchmark = compareWithBenchmark("geral", result.overallScore);

  return {
    overallScore: result.overallScore,
    overallRisk: result.overallRisk,
    overallBenchmark,
    criticalDimensions,
    moderateDimensions,
    healthyDimensions,
    allDimensions,
    primaryVulnerability,
    primaryProtectiveFactor,
  };
}
