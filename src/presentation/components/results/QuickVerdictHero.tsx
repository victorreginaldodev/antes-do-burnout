"use client";

import React from "react";
import { EnrichedDimension } from "@/application/recommendation-service";
import { RISK_CONFIG } from "@/domain/classification";
import { RiskLevel } from "@/domain/types";
import { BenchmarkPosition } from "@/domain/benchmarks";
import { AlertTriangle, ArrowUpRight, Flame, ShieldAlert, ShieldCheck, Sparkles, Zap } from "lucide-react";

interface QuickVerdictHeroProps {
  score: number;
  risk: RiskLevel;
  benchmarkPosition: BenchmarkPosition;
  benchmarkDescription: string;
  primaryVulnerability?: EnrichedDimension;
  primaryProtectiveFactor?: EnrichedDimension;
  onSelectDimension: (dimension: EnrichedDimension) => void;
}

export function QuickVerdictHero({
  score,
  risk,
  benchmarkDescription,
  primaryVulnerability,
  primaryProtectiveFactor,
  onSelectDimension,
}: QuickVerdictHeroProps) {
  const riskMeta = RISK_CONFIG[risk];

  const getVerdictLabel = () => {
    switch (risk) {
      case "BAIXO":
        return {
          title: "Zona de Sustentabilidade",
          subtitle: "Ambiente equilibrado com forte proteção à sua saúde mental.",
          color: "text-emerald-400",
          border: "border-emerald-500/30",
          bg: "bg-emerald-950/40",
          icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
        };
      case "MODERADO":
        return {
          title: "Zona de Atenção Preventiva",
          subtitle: "Desgaste perceptível em algumas rotinas que exige alinhamento de limites.",
          color: "text-amber-400",
          border: "border-amber-500/30",
          bg: "bg-amber-950/40",
          icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
        };
      case "CRITICO":
        return {
          title: "Zona de Sobrecarga Crítica",
          subtitle: "Pressão e estressores agudos com risco iminente de esgotamento.",
          color: "text-rose-400",
          border: "border-rose-500/30",
          bg: "bg-rose-950/40",
          icon: <Flame className="w-5 h-5 text-rose-400" />,
        };
    }
  };

  const verdict = getVerdictLabel();

  return (
    <div className="space-y-4">
      {/* 1. Card Principal do Veredito (O Tcham Imediato) */}
      <div className={`p-5 sm:p-6 rounded-2xl border ${verdict.border} ${verdict.bg} backdrop-blur-xl relative overflow-hidden space-y-4 shadow-xl`}>
        {/* Luz ambiente suave */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-purple-500/20">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#120A24] border border-purple-500/25">
              {verdict.icon}
            </div>
            <div>
              <span className="text-[11px] font-mono tracking-wider text-purple-300/70 uppercase">
                Resultado Oficial UK HSE-IT
              </span>
              <h2 className={`font-display text-lg sm:text-xl font-bold tracking-wide ${verdict.color}`}>
                {verdict.title}
              </h2>
            </div>
          </div>

          <div className="flex items-baseline gap-1.5 self-start sm:self-center">
            <span className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {score.toFixed(2)}
            </span>
            <span className="text-purple-300/60 font-mono text-xs">/ 5.00</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <p className="text-purple-100/90 leading-relaxed max-w-xl font-medium">
            {verdict.subtitle}
          </p>
          <span className="text-[11px] font-mono text-purple-300/60 bg-[#120A24]/70 px-2.5 py-1 rounded-lg border border-purple-500/20 whitespace-nowrap self-start sm:self-auto">
            Benchmark: {benchmarkDescription}
          </span>
        </div>
      </div>

      {/* 2. Destaques Binários: O Maior Drenador vs. O Maior Escudo (Curiosidade Direta) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* Drenador de Energia */}
        {primaryVulnerability ? (
          <div
            onClick={() => onSelectDimension(primaryVulnerability)}
            className="p-4 rounded-xl border border-rose-500/25 bg-[#120A24]/85 hover:border-rose-400/50 hover:bg-[#1A0D2E] transition-all cursor-pointer group space-y-2 relative backdrop-blur-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-rose-400 text-xs font-semibold">
                <ShieldAlert className="w-4 h-4" />
                <span>Maior Drenador de Energia</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-purple-300 group-hover:text-white transition-colors">
                <span className="font-mono font-bold text-rose-300">{primaryVulnerability.score.toFixed(2)}</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white group-hover:text-purple-100">
                {primaryVulnerability.name}
              </h3>
              <p className="text-xs text-purple-200/70 line-clamp-2 mt-0.5">
                {primaryVulnerability.diagnosis.titulo}
              </p>
            </div>

            <span className="inline-block text-[11px] text-purple-300/60 group-hover:text-purple-200 underline decoration-purple-500/40">
              Ver roteiro para conversar com a chefia →
            </span>
          </div>
        ) : (
          <div className="p-4 rounded-xl border border-purple-500/20 bg-[#120A24]/70 space-y-1">
            <span className="text-xs text-purple-300 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Sem Estressores Agudos
            </span>
            <p className="text-xs text-purple-300/70">
              Nenhuma das 7 dimensões atingiu nível crítico imediato.
            </p>
          </div>
        )}

        {/* Fator Protetor */}
        {primaryProtectiveFactor ? (
          <div
            onClick={() => onSelectDimension(primaryProtectiveFactor)}
            className="p-4 rounded-xl border border-emerald-500/25 bg-[#120A24]/85 hover:border-emerald-400/50 hover:bg-[#0D241E] transition-all cursor-pointer group space-y-2 relative backdrop-blur-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Seu Maior Escudo Protetor</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-purple-300 group-hover:text-white transition-colors">
                <span className="font-mono font-bold text-emerald-300">{primaryProtectiveFactor.score.toFixed(2)}</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white group-hover:text-purple-100">
                {primaryProtectiveFactor.name}
              </h3>
              <p className="text-xs text-purple-200/70 line-clamp-2 mt-0.5">
                {primaryProtectiveFactor.diagnosis.titulo}
              </p>
            </div>

            <span className="inline-block text-[11px] text-purple-300/60 group-hover:text-purple-200 underline decoration-emerald-500/40">
              Entenda como essa área protege sua saúde →
            </span>
          </div>
        ) : (
          <div className="p-4 rounded-xl border border-purple-500/20 bg-[#120A24]/70 space-y-1">
            <span className="text-xs text-amber-400 font-semibold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Atenção às Fontes de Apoio
            </span>
            <p className="text-xs text-purple-300/70">
              Seus fatores protetores estão abaixo da média. É essencial fortalecer redes de apoio.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
