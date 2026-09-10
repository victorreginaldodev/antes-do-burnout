import rawQuestions from "./data/catalogo-35-perguntas.json";
import { DimensionCode, Question } from "./types";

/**
 * Catálogo canônico imutável das 35 perguntas do UK HSE Indicator Tool.
 */
export const QUESTIONS_CATALOG: readonly Question[] = rawQuestions as unknown as Question[];

/**
 * Conjunto canônico exato dos 8 itens formulados negativamente que exigem reverse scoring (6 - x).
 * Definição imutável da literatura HSE: 3, 5, 6, 10, 13, 16, 18, 21.
 */
export const REVERSE_ITEMS: ReadonlySet<number> = new Set([
  3, 5, 6, 10, 13, 16, 18, 21,
]);

/**
 * Nomes amigáveis oficiais das 7 dimensões psicossociais.
 */
export const DIMENSION_NAMES: Record<DimensionCode, string> = {
  demanda: "Demandas",
  controle: "Controle e Autonomia",
  apoio_chefia: "Apoio da Chefia",
  apoio_colegas: "Apoio dos Colegas",
  relacionamentos: "Relacionamentos",
  papel: "Clareza de Papel",
  mudancas: "Gestão de Mudanças",
};

/**
 * Mapeamento exato de quais perguntas compõem cada uma das 7 dimensões.
 */
export const DIMENSION_ITEMS: Record<DimensionCode, readonly number[]> = {
  demanda: [3, 6, 10, 14, 16, 21],
  controle: [2, 9, 12, 17, 19],
  apoio_chefia: [23, 24, 25, 26, 33],
  apoio_colegas: [7, 8, 15, 22],
  relacionamentos: [5, 13, 18, 30],
  papel: [1, 4, 11, 20, 31, 34, 35],
  mudancas: [27, 28, 29, 32],
};

/**
 * Retorna uma pergunta pelo seu número sequencial (1 a 35).
 */
export function getQuestionByNumber(numero: number): Question | undefined {
  return QUESTIONS_CATALOG.find((q) => q.numero === numero);
}

/**
 * Verifica se uma pergunta exige inversão psicométrica (6 - x).
 */
export function isReverseItem(numero: number): boolean {
  return REVERSE_ITEMS.has(numero);
}
