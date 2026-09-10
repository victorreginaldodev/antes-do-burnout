import { RiskLevel } from "./types";

/**
 * Classifica a pontuação média (escala de 1.00 a 5.00) nas 3 faixas normativas canônicas do HSE-IT.
 *
 * Faixas de corte:
 * - >= 4.00: BAIXO (Verde / Fator Protetor)
 * - 3.00 <= X < 4.00: MODERADO (Âmbar / Ponto de Atenção)
 * - < 3.00: CRITICO (Vermelho / Alto Risco / Sobrecarga)
 */
export function classifyRisk(score: number): RiskLevel {
  if (score >= 4.0) {
    return "BAIXO";
  }
  if (score >= 3.0) {
    return "MODERADO";
  }
  return "CRITICO";
}

export interface RiskMetadata {
  label: string;
  badgeLabel: string;
  description: string;
  hexColor: string;
  tailwindBg: string;
  tailwindText: string;
  tailwindBorder: string;
}

export const RISK_CONFIG: Record<RiskLevel, RiskMetadata> = {
  BAIXO: {
    label: "Baixo Risco (Fator Protetor)",
    badgeLabel: "Saudável",
    description: "Condição de trabalho equilibrada, sustentável e protetiva da saúde mental.",
    hexColor: "#10B981",
    tailwindBg: "bg-emerald-500/10",
    tailwindText: "text-emerald-700 dark:text-emerald-400",
    tailwindBorder: "border-emerald-200 dark:border-emerald-800",
  },
  MODERADO: {
    label: "Risco Moderado (Atenção)",
    badgeLabel: "Ponto de Atenção",
    description: "Desgaste inicial perceptível que exige atenção e ajustes de rotina.",
    hexColor: "#F59E0B",
    tailwindBg: "bg-amber-500/10",
    tailwindText: "text-amber-700 dark:text-amber-400",
    tailwindBorder: "border-amber-200 dark:border-amber-800",
  },
  CRITICO: {
    label: "Risco Crítico (Ação Imediata)",
    badgeLabel: "Crítico",
    description: "Sobrecarga aguda e estressor severo com risco iminente de esgotamento.",
    hexColor: "#F43F5E",
    tailwindBg: "bg-rose-500/10",
    tailwindText: "text-rose-700 dark:text-rose-400",
    tailwindBorder: "border-rose-200 dark:border-rose-800",
  },
};
