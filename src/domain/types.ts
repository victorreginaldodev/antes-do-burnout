/**
 * Tipos centrais do Domínio Psicométrico HSE-IT (UK Health and Safety Executive)
 * Camada: Domain (Zero dependências externas)
 */

export type DimensionCode =
  | "demanda"
  | "controle"
  | "apoio_chefia"
  | "apoio_colegas"
  | "relacionamentos"
  | "papel"
  | "mudancas";

export type RiskLevel = "BAIXO" | "MODERADO" | "CRITICO";

export type ScaleType = "frequencia" | "concordancia";

export interface LikertOption {
  valor: number;
  rotulo: string;
}

export interface Question {
  numero: number;
  texto: string;
  dimensao: DimensionCode;
  dimensao_nome: string;
  escala: ScaleType;
  inverter: boolean;
  opcoes: LikertOption[];
}

export interface DimensionScore {
  code: DimensionCode;
  name: string;
  score: number;
  risk: RiskLevel;
  itemCount: number;
}

export interface AssessmentResult {
  dimensions: Record<DimensionCode, DimensionScore>;
  dimensionsList: DimensionScore[];
  overallScore: number;
  overallRisk: RiskLevel;
  criticalDimensions: DimensionScore[];
  moderateDimensions: DimensionScore[];
  healthyDimensions: DimensionScore[];
}

export type RawAnswers = Record<number, number>;

export interface DimensionDiagnosisContent {
  titulo: string;
  diagnostico: string;
  riscos?: string;
  acoes?: string[];
  roteiro_conversa?: string;
}

export interface DimensionDiagnosis {
  nome: string;
  CRITICO: DimensionDiagnosisContent;
  MODERADO: DimensionDiagnosisContent;
  BAIXO: DimensionDiagnosisContent;
}

export interface BenchmarkPercentiles {
  p20: number;
  p50: number;
  p80: number;
}
