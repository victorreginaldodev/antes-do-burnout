"use client";

import React, { useState } from "react";
import { Check, Copy, MessageSquareQuote, ShieldAlert, Sparkles, X } from "lucide-react";
import { EnrichedDimension } from "@/application/recommendation-service";
import { RISK_CONFIG } from "@/domain/classification";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DimensionDetailModalProps {
  dimension: EnrichedDimension | null;
  onClose: () => void;
}

export function DimensionDetailModal({
  dimension,
  onClose,
}: DimensionDetailModalProps) {
  const [copied, setCopied] = useState(false);

  if (!dimension) return null;

  const riskMeta = RISK_CONFIG[dimension.risk];

  const handleCopyScript = () => {
    if (!dimension.diagnosis.roteiro_conversa) return;
    navigator.clipboard.writeText(dimension.diagnosis.roteiro_conversa);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#120A24] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-white space-y-6 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Topo do Modal */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-purple-500/20">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge
                className={`${riskMeta.tailwindBg} ${riskMeta.tailwindText} ${riskMeta.tailwindBorder} border text-xs font-semibold`}
              >
                {riskMeta.badgeLabel}
              </Badge>
              <span className="font-mono text-xs text-purple-300/70">
                Score: <strong className="text-white">{dimension.score.toFixed(2)}</strong> / 5.00
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {dimension.name}
            </h3>
            <p className="text-xs sm:text-sm text-purple-200/70 mt-0.5">
              {dimension.diagnosis.titulo}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-purple-300 hover:text-white hover:bg-purple-900/40 transition-colors cursor-pointer shrink-0"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Diagnóstico Humanizado */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
            O que significa na sua rotina:
          </h4>
          <p className="text-sm text-purple-100/90 leading-relaxed bg-[#1A0F33]/60 p-4 rounded-xl border border-purple-500/20">
            {dimension.diagnosis.diagnostico}
          </p>
        </div>

        {/* Riscos Ocupacionais (quando houver) */}
        {dimension.diagnosis.riscos && (
          <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-200 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-rose-300">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Riscos à Saúde Mental se Não Ajustado:</span>
            </div>
            <p className="leading-relaxed text-rose-200/90">{dimension.diagnosis.riscos}</p>
          </div>
        )}

        {/* Ações Práticas de Enfrentamento */}
        {dimension.diagnosis.acoes && dimension.diagnosis.acoes.length > 0 && (
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-200 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>O que você pode fazer na prática:</span>
            </div>
            <ul className="space-y-2 text-xs text-purple-200/80">
              {dimension.diagnosis.acoes.map((acao, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-purple-950/30 border border-purple-500/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.6)] mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{acao}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Roteiro de Conversa com a Liderança */}
        {dimension.diagnosis.roteiro_conversa && (
          <div className="p-4 rounded-xl bg-[#1A0F33]/90 border border-purple-500/30 space-y-3">
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
                className="h-7 px-2.5 text-xs text-purple-300 hover:text-white hover:bg-purple-900/50 gap-1.5 cursor-pointer"
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
                    <span>Copiar Fala</span>
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-purple-100 italic leading-relaxed bg-[#090514]/70 p-3.5 rounded-lg border border-purple-500/20">
              &ldquo;{dimension.diagnosis.roteiro_conversa}&rdquo;
            </p>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="cursor-pointer text-xs"
          >
            Fechar Detalhes
          </Button>
        </div>
      </div>
    </div>
  );
}
