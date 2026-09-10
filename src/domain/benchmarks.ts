import { BenchmarkPercentiles, DimensionCode } from "./types";
export type { BenchmarkPercentiles };

/**
 * Tabela percentílica de referência (benchmark normativo nacional do UK HSE / Amostra Ocupacional).
 * P20: 20% piores condições (Atenção prioritária)
 * P50: Mediana da população trabalhadora
 * P80: 20% melhores condições (Condição de excelência)
 */
export const HSE_BENCHMARKS: Record<DimensionCode | "geral", BenchmarkPercentiles> = {
  demanda: {
    p20: 2.8,
    p50: 3.33,
    p80: 3.8,
  },
  controle: {
    p20: 3.2,
    p50: 3.8,
    p80: 4.2,
  },
  apoio_chefia: {
    p20: 3.2,
    p50: 3.8,
    p80: 4.4,
  },
  apoio_colegas: {
    p20: 3.5,
    p50: 4.0,
    p80: 4.5,
  },
  relacionamentos: {
    p20: 3.75,
    p50: 4.25,
    p80: 4.75,
  },
  papel: {
    p20: 4.14,
    p50: 4.57,
    p80: 4.86,
  },
  mudancas: {
    p20: 2.75,
    p50: 3.25,
    p80: 3.75,
  },
  geral: {
    p20: 3.4,
    p50: 3.85,
    p80: 4.25,
  },
};

export type BenchmarkPosition = "ABAIXO_P20" | "MEDIANA" | "ACIMA_P80";

/**
 * Compara uma pontuação obtida com o benchmark oficial do UK HSE.
 */
export function compareWithBenchmark(
  dimension: DimensionCode | "geral",
  score: number
): {
  position: BenchmarkPosition;
  percentiles: BenchmarkPercentiles;
  description: string;
} {
  const percentiles = HSE_BENCHMARKS[dimension];
  if (score < percentiles.p20) {
    return {
      position: "ABAIXO_P20",
      percentiles,
      description: "Abaixo dos 20% mais vulneráveis da amostra de referência.",
    };
  }
  if (score >= percentiles.p80) {
    return {
      position: "ACIMA_P80",
      percentiles,
      description: "Entre os 20% melhores ambientes da amostra de referência.",
    };
  }
  return {
    position: "MEDIANA",
    percentiles,
    description: "Dentro da faixa intermediária (mediana) da amostra de referência.",
  };
}
