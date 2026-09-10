"use client";

import React, { useState } from "react";
import { Check, Copy, Download, X } from "lucide-react";
import { SocialCardData } from "@/application/share-orchestrator";
import { downloadSocialCard } from "@/infrastructure/image/canvas-card-generator";
import { Button } from "@/components/ui/button";
import { SocialCardPreview } from "./SocialCardPreview";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardData: SocialCardData;
}

export function ShareModal({ isOpen, onClose, cardData }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setIsDownloading(true);
    try {
      downloadSocialCard(cardData);
    } finally {
      setTimeout(() => setIsDownloading(false), 1000);
    }
  };

  const handleCopyText = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(cardData.shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#120A24] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-white space-y-6 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between pb-2 border-b border-purple-500/20">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-white">
              Compartilhar Diagnóstico
            </h3>
            <p className="text-xs text-purple-300/70">
              Card quadrado em alta resolução (1080x1080) para redes sociais
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-purple-300 hover:text-white hover:bg-purple-900/40 transition-colors cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visualização Prévia do Card */}
        <div className="py-2 flex justify-center">
          <SocialCardPreview data={cardData} />
        </div>

        {/* Botões de Ação */}
        <div className="space-y-3">
          <Button
            type="button"
            size="lg"
            variant="cyber"
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full gap-2 cursor-pointer text-white font-bold"
          >
            <Download className="w-4 h-4" />
            <span>{isDownloading ? "Gerando PNG..." : "Baixar Imagem em Alta Resolução (PNG)"}</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={handleCopyText}
            className="w-full gap-2 border-purple-500/30 bg-[#1A0F33]/80 hover:bg-purple-950/60 text-purple-200 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300 font-medium">Texto e Link Copiados!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-purple-300" />
                <span>Copiar Mensagem para LinkedIn / WhatsApp</span>
              </>
            )}
          </Button>
        </div>

        {/* Sugestão de Legenda */}
        <div className="p-3 bg-[#090514]/70 rounded-xl border border-purple-500/20 text-xs text-purple-300/80 space-y-1">
          <span className="font-semibold text-purple-200">Dica para LinkedIn:</span>
          <p className="line-clamp-3 italic text-purple-300/70">
            &ldquo;{cardData.shareText}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
