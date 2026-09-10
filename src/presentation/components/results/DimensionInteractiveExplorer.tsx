"use client";

import React, { useState } from "react";
import { EnrichedDimension } from "@/application/recommendation-service";
import { RISK_CONFIG } from "@/domain/classification";
import { ArrowRight, MessageSquareQuote } from "lucide-react";

interface DimensionInteractiveExplorerProps {
  criticalDimensions: EnrichedDimension[];
  moderateDimensions: EnrichedDimension[];
  healthyDimensions: EnrichedDimension[];
  onSelectDimension: (dimension: EnrichedDimension) => void;
}

type FilterTab = "todas" | "criticas" | "atencao" | "saudaveis";

export function DimensionInteractiveExplorer({
  criticalDimensions,
  moderateDimensions,
  healthyDimensions,
  onSelectDimension,
}: DimensionInteractiveExplorerProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>("todas");

  const allDimensions = [
    ...criticalDimensions,
    ...moderateDimensions,
    ...healthyDimensions,
  ];

  const getFilteredList = () => {
    switch (activeTab) {
      case "criticas":
        return criticalDimensions;
      case "atencao":
        return moderateDimensions;
      case "saudaveis":
        return healthyDimensions;
      case "todas":
      default:
        return allDimensions;
    }
  };

  const filteredList = getFilteredList();

  return (
    <div className="space-y-4">
      {/* Cabeçalho do Explorador */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-purple-500/20">
        <div>
          <h2 className="font-display text-base sm:text-lg font-bold text-white tracking-wide">
            Explorar as 7 Dimensões
          </h2>
          <p className="text-xs text-purple-200/70">
            Toque em qualquer dimensão para abrir o diagnóstico e o roteiro de alinhamento com a chefia.
          </p>
        </div>

        {/* Filtros em Abas Rápidas */}
        <div className="flex items-center gap-1.5 p-1 bg-[#120A24] border border-purple-500/25 rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("todas")}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "todas"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-purple-300 hover:text-white"
            }`}
          >
            Todas ({allDimensions.length})
          </button>

          {criticalDimensions.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveTab("criticas")}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === "criticas"
                  ? "bg-rose-600 text-white shadow-sm"
                  : "text-rose-300 hover:text-white"
              }`}
            >
              Críticas ({criticalDimensions.length})
            </button>
          )}

          {moderateDimensions.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveTab("atencao")}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === "atencao"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-amber-300 hover:text-white"
              }`}
            >
              Atenção ({moderateDimensions.length})
            </button>
          )}

          {healthyDimensions.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveTab("saudaveis")}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === "saudaveis"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-emerald-300 hover:text-white"
              }`}
            >
              Protetoras ({healthyDimensions.length})
            </button>
          )}
        </div>
      </div>

      {/* Grade de Cards Compactos e Interativos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredList.map((dim) => {
          const riskMeta = RISK_CONFIG[dim.risk];

          return (
            <div
              key={dim.code}
              onClick={() => onSelectDimension(dim)}
              className="p-3.5 sm:p-4 rounded-xl border border-purple-500/20 bg-[#120A24]/70 hover:bg-[#1A0F33] hover:border-purple-400/40 transition-all cursor-pointer group flex flex-col justify-between space-y-2 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      dim.risk === "CRITICO"
                        ? "bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.8)]"
                        : dim.risk === "MODERADO"
                        ? "bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                        : "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                    }`}
                  />
                  <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-purple-100 transition-colors">
                    {dim.name}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-mono font-bold text-xs text-white">
                    {dim.score.toFixed(2)}
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded border ${riskMeta.tailwindBg} ${riskMeta.tailwindText} ${riskMeta.tailwindBorder}`}
                  >
                    {riskMeta.badgeLabel}
                  </span>
                </div>
              </div>

              <p className="text-xs text-purple-200/70 line-clamp-1">
                {dim.diagnosis.titulo}
              </p>

              <div className="flex items-center justify-between text-[11px] text-purple-300/60 pt-1 border-t border-purple-500/10">
                <span className="flex items-center gap-1">
                  <MessageSquareQuote className="w-3 h-3 text-purple-400" />
                  Roteiro de alinhamento
                </span>
                <span className="text-purple-300 group-hover:text-white flex items-center gap-0.5 font-medium transition-colors">
                  Ver detalhes
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
