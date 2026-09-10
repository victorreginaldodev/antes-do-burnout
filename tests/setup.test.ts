import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("Smoke Test - Ambiente de Engenharia (Fase 1)", () => {
  it("deve carregar o Vitest e resolver aliases de caminho (@/*) corretamente", () => {
    const combinedClasses = cn("bg-brand-500", false && "hidden", "p-4");
    expect(combinedClasses).toBe("bg-brand-500 p-4");
  });

  it("deve validar paridade matemática básica para reverse scoring (6 - x)", () => {
    const reverse = (score: number) => 6 - score;
    expect(reverse(1)).toBe(5);
    expect(reverse(5)).toBe(1);
    expect(reverse(3)).toBe(3);
  });
});
