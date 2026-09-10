import React from "react";
import { EnrichedDimension } from "@/application/recommendation-service";
import { DimensionCard } from "./DimensionCard";
import { AlertCircle, AlertTriangle, ShieldCheck } from "lucide-react";

interface DimensionGroupSectionsProps {
  criticalDimensions: EnrichedDimension[];
  moderateDimensions: EnrichedDimension[];
  healthyDimensions: EnrichedDimension[];
}

export function DimensionGroupSections({
  criticalDimensions,
  moderateDimensions,
  healthyDimensions,
}: DimensionGroupSectionsProps) {
  return (
    <div className="space-y-12">
      {/* 1. Dimensões Críticas (Prioritárias) */}
      {criticalDimensions.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-rose-400">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Áreas de Atenção Prioritária{" "}
              <span className="text-rose-400 font-semibold text-lg">
                ({criticalDimensions.length})
              </span>
            </h2>
          </div>
          <p className="text-sm text-purple-200/75 leading-relaxed">
            Estressores severos identificados que estão drenando sua energia. Exigem intervenção imediata,
            repactuação de expectativas e aplicação das ações práticas abaixo.
          </p>

          <div className="grid grid-cols-1 gap-4 pt-2">
            {criticalDimensions.map((dim) => (
              <DimensionCard key={dim.code} dimension={dim} />
            ))}
          </div>
        </section>
      )}

      {/* 2. Dimensões Moderadas (Pontos de Atenção) */}
      {moderateDimensions.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-amber-400">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Pontos de Atenção Preventiva{" "}
              <span className="text-amber-400 font-semibold text-lg">
                ({moderateDimensions.length})
              </span>
            </h2>
          </div>
          <p className="text-sm text-purple-200/75 leading-relaxed">
            Rotinas com desgaste incipiente. Pequenos ajustes operacionais agora evitam que essas
            questões evoluam para sobrecarga crônica.
          </p>

          <div className="grid grid-cols-1 gap-4 pt-2">
            {moderateDimensions.map((dim) => (
              <DimensionCard key={dim.code} dimension={dim} />
            ))}
          </div>
        </section>
      )}

      {/* 3. Dimensões Saudáveis (Fatores Protetores) */}
      {healthyDimensions.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-400">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Seus Fatores de Proteção Ativos{" "}
              <span className="text-emerald-400 font-semibold text-lg">
                ({healthyDimensions.length})
              </span>
            </h2>
          </div>
          <p className="text-sm text-purple-200/75 leading-relaxed">
            Condições equilibradas do seu trabalho que funcionam como verdadeiros escudos biológicos e
            psicológicos contra a exaustão.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {healthyDimensions.map((dim) => (
              <DimensionCard key={dim.code} dimension={dim} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
