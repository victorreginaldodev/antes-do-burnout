import React from "react";
import { Building2, ExternalLink, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function LeadMagnetB2BCard() {
  return (
    <Card className="p-6 sm:p-8 bg-gradient-to-br from-[#1A0826] via-[#120A24] to-[#25103F] text-white rounded-2xl shadow-xl border border-purple-500/30 space-y-6 backdrop-blur-xl relative overflow-hidden">
      {/* Halo de luz decorativo */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center gap-2 text-purple-300 text-xs font-semibold uppercase tracking-wider">
        <Building2 className="w-4 h-4 text-purple-400" />
        <span>Solução para Empresas e RHs</span>
      </div>

      <div className="space-y-3 relative z-10">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Sente que o seu time inteiro está sobrecarregado?
        </h3>
        <p className="text-sm text-purple-200/80 leading-relaxed max-w-2xl">
          A avaliação individual é o primeiro passo. No entanto, estressores psicossociais crônicos
          costumam ser sistêmicos. O <strong className="text-white">SSTSuite</strong> oferece
          diagnóstico psicossocial coletivo para organizações, com matriz de risco NR-01 (GRO/PGR)
          e planos de intervenção corporativos com total respaldo legal e anonimato aos colaboradores.
        </p>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-purple-500/20 relative z-10">
        <div className="flex items-center gap-2 text-xs text-purple-300/70">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Atendimento às diretrizes do MTE, OIT e NR-01</span>
        </div>

        <a
          href="https://sstsuite.com.br"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <Button
            type="button"
            variant="cyber"
            size="md"
            className="w-full sm:w-auto gap-2 text-white font-bold cursor-pointer"
          >
            <span>Conhecer Solução para Empresas</span>
            <ExternalLink className="w-4 h-4" />
          </Button>
        </a>
      </div>
    </Card>
  );
}
