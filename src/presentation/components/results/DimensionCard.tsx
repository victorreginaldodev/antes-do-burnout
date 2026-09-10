"use client";

import React, { useState } from "react";
import { Check, Copy, MessageSquareQuote, ShieldAlert, Sparkles } from "lucide-react";
import { EnrichedDimension } from "@/application/recommendation-service";
import { RISK_CONFIG } from "@/domain/classification";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DimensionCardProps {
  dimension: EnrichedDimension;
}

export function DimensionCard({ dimension }: DimensionCardProps) {
  const [copied, setCopied] = useState(false);
  const riskMeta = RISK_CONFIG[dimension.risk];

  const handleCopyScript = () => {
    if (!dimension.diagnosis.roteiro_conversa) return;
    navigator.clipboard.writeText(dimension.diagnosis.roteiro_conversa);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Card className="p-6 bg-[#120A24]/85 border-purple-500/20 shadow-lg shadow-purple-950/20 rounded-2xl space-y-5 transition-all hover:border-purple-400/40 backdrop-blur-xl">
      {/* Cabeçalho do Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-purple-500/20">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            {dimension.name}
          </h3>
          <p className="text-xs text-purple-300/70">{dimension.diagnosis.titulo}</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xl font-bold font-mono text-white">
            {dimension.score.toFixed(2)}
          </span>
          <Badge
            className={`${riskMeta.tailwindBg} ${riskMeta.tailwindText} ${riskMeta.tailwindBorder} border text-xs font-semibold`}
          >
            {riskMeta.badgeLabel}
          </Badge>
        </div>
      </div>

      {/* Diagnóstico Humanizado */}
      <p className="text-sm text-purple-200/85 leading-relaxed">
        {dimension.diagnosis.diagnostico}
      </p>

      {/* Riscos Ocupacionais (quando aplicável) */}
      {dimension.diagnosis.riscos && (
        <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-200 space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-rose-300">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>Riscos Associados:</span>
          </div>
          <p className="leading-relaxed text-rose-200/90">{dimension.diagnosis.riscos}</p>
        </div>
      )}

      {/* Ações Práticas de Enfrentamento (Coping) */}
      {dimension.diagnosis.acoes && dimension.diagnosis.acoes.length > 0 && (
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-300 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>O que você pode fazer na prática:</span>
          </div>
          <ul className="space-y-2 text-xs text-purple-200/80">
            {dimension.diagnosis.acoes.map((acao, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.6)] mt-1.5 shrink-0" />
                <span className="leading-relaxed">{acao}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Roteiro de Conversa com a Liderança */}
      {dimension.diagnosis.roteiro_conversa && (
        <div className="p-4 rounded-xl bg-[#1A0F33]/80 border border-purple-500/25 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-200">
              <MessageSquareQuote className="w-4 h-4 text-purple-400" />
              <span>Roteiro de Alinhamento com a Chefia:</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCopyScript}
              className="h-7 px-2.5 text-xs text-purple-300 hover:text-white hover:bg-purple-900/40 gap-1.5 cursor-pointer"
              title="Copiar texto para área de transferência"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-purple-400" />
                  <span>Copiar Roteiro</span>
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-purple-100 italic leading-relaxed bg-[#090514]/60 p-3 rounded-lg border border-purple-500/20">
            &ldquo;{dimension.diagnosis.roteiro_conversa}&rdquo;
          </p>
        </div>
      )}
    </Card>
  );
}
