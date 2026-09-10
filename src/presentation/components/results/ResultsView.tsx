"use client";

import React, { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileDown,
  Printer,
  RotateCcw,
  Share2,
  Sparkles,
} from "lucide-react";
import {
  clearCompletedAssessment,
  loadCompletedAssessment,
} from "@/infrastructure/storage/local-storage-adapter";
import {
  EnrichedDimension,
  generateAssessmentReport,
} from "@/application/recommendation-service";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadarChartHse } from "./RadarChartHse";
import { QuickVerdictHero } from "./QuickVerdictHero";
import { DimensionInteractiveExplorer } from "./DimensionInteractiveExplorer";
import { DimensionDetailModal } from "./DimensionDetailModal";
import { LeadMagnetB2BCard } from "./LeadMagnetB2BCard";

import { prepareSocialCardData } from "@/application/share-orchestrator";
import { ShareModal } from "@/presentation/components/share/ShareModal";

export function ResultsView() {
  const router = useRouter();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedDimension, setSelectedDimension] = useState<EnrichedDimension | null>(null);

  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const result = useMemo(() => {
    if (!isHydrated) return null;
    return loadCompletedAssessment();
  }, [isHydrated]);

  const report = useMemo(() => {
    if (!result) return null;
    return generateAssessmentReport(result);
  }, [result]);

  const cardData = useMemo(() => {
    if (!report) return null;
    const origin = typeof window !== "undefined" ? window.location.origin : undefined;
    return prepareSocialCardData(report, origin);
  }, [report]);

  const handleRestart = () => {
    clearCompletedAssessment();
    router.push("/teste");
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isHydrated) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 bg-[#090514] text-purple-200">
        <div className="w-10 h-10 border-3 border-purple-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
        <p className="text-sm text-purple-300/80 font-medium">
          Gerando seu laudo psicossocial...
        </p>
      </div>
    );
  }

  // Estado Vazio (quando acessado diretamente sem ter feito o teste)
  if (!report) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 bg-[#090514]">
        <Card className="max-w-md w-full p-8 text-center space-y-6 bg-[#120A24]/90 rounded-3xl shadow-2xl border-purple-500/30 backdrop-blur-xl">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-950/80 border border-purple-500/30 text-purple-300 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)]">
            <Sparkles className="w-7 h-7 text-purple-300" />
          </div>

          <div className="space-y-2">
            <h1 className="font-display text-xl sm:text-2xl font-bold text-white tracking-wide">
              Nenhuma avaliação encontrada
            </h1>
            <p className="text-xs sm:text-sm text-purple-200/70 leading-relaxed">
              Para visualizar seu diagnóstico em tempo real e os roteiros de alinhamento com a chefia,
              responda à autoavaliação (leva apenas 3 a 5 minutos).
            </p>
          </div>

          <Link href="/teste" className="inline-block w-full">
            <Button size="lg" variant="cyber" className="w-full font-display text-xs sm:text-sm tracking-wider cursor-pointer">
              Fazer Minha Avaliação Agora
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <>
      {/* ============================================================ */}
      {/* 1. VISUALIZAÇÃO INTERATIVA EM TELA (ZERO FRICÇÃO, ALTO TCHAM) */}
      {/* ============================================================ */}
      <div className="min-h-screen bg-[#090514] text-slate-100 py-6 sm:py-8 px-4 sm:px-6 relative print:hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="w-full max-w-5xl mx-auto space-y-8">
          {/* Cabeçalho do Dashboard */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-500/20">
            <div className="space-y-1">
              <Link
                href="/"
                className="text-xs text-purple-300/70 hover:text-white inline-flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Início
              </Link>
              <h1 className="font-display text-xl sm:text-2xl font-bold text-white tracking-wide">
                Seu Veredito Psicossocial
              </h1>
            </div>

            {/* Ações de Topo */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="gap-1.5 text-xs text-purple-200 hover:text-white cursor-pointer"
                title="Salvar laudo completo em PDF"
              >
                <FileDown className="w-3.5 h-3.5 text-purple-400" />
                <span>Salvar Laudo (PDF)</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsShareModalOpen(true)}
                className="gap-1.5 text-xs text-purple-200 hover:text-white cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Compartilhar</span>
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRestart}
                className="gap-1.5 text-xs text-purple-300/70 hover:text-white hover:bg-purple-950/40"
                title="Limpar e refazer avaliação"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Novo Teste</span>
              </Button>
            </div>
          </header>

          {/* ============================================================ */}
          {/* O "TCHAM" INICIAL: Veredito + Drenador vs Escudo + Radar 7D  */}
          {/* ============================================================ */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Veredito Geral e Extremos (Drenador x Escudo) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <QuickVerdictHero
                score={report.overallScore}
                risk={report.overallRisk}
                benchmarkPosition={report.overallBenchmark.position}
                benchmarkDescription={report.overallBenchmark.description}
                primaryVulnerability={report.primaryVulnerability}
                primaryProtectiveFactor={report.primaryProtectiveFactor}
                onSelectDimension={setSelectedDimension}
              />
            </div>

            {/* Radar Visual Tecnológico */}
            <div className="lg:col-span-5 bg-[#120A24]/80 p-4 sm:p-5 rounded-2xl border border-purple-500/25 shadow-xl backdrop-blur-xl flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-mono font-semibold text-purple-300/80 uppercase tracking-wider">
                  Radar Psicossocial 7D
                </span>
                <span className="text-[10px] text-purple-400/60 font-mono">1.00 a 5.00</span>
              </div>
              <RadarChartHse dimensions={report.allDimensions} />
            </div>
          </section>

          {/* ============================================================ */}
          {/* EXPLORAÇÃO SOB DEMANDA: Sem pergaminho infinito               */}
          {/* ============================================================ */}
          <section>
            <DimensionInteractiveExplorer
              criticalDimensions={report.criticalDimensions}
              moderateDimensions={report.moderateDimensions}
              healthyDimensions={report.healthyDimensions}
              onSelectDimension={setSelectedDimension}
            />
          </section>

          {/* Lead Magnet Corporativo */}
          <section>
            <LeadMagnetB2BCard />
          </section>

          {/* Disclaimer Ético e Rodapé */}
          <footer className="pt-6 pb-10 border-t border-purple-500/20 text-center text-xs text-purple-300/50 space-y-2">
            <p>
              Instrumento psicométrico fundamentado nos padrões do Health and Safety Executive (UK HSE-IT).
            </p>
            <p className="text-purple-400/40 text-[11px]">
              Nota ética: Instrumento de reflexão pessoal e autoconhecimento. Não substitui avaliação clínica médica ou psicológica.
            </p>
          </footer>
        </div>

        {/* Modal de Compartilhamento Social */}
        {cardData && (
          <ShareModal
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
            cardData={cardData}
          />
        )}

        {/* Modal de Detalhamento Aprofundado sob Demanda */}
        <DimensionDetailModal
          dimension={selectedDimension}
          onClose={() => setSelectedDimension(null)}
        />
      </div>

      {/* ============================================================ */}
      {/* 2. TEMPLATE DE IMPRESSÃO / SALVAR EM PDF (Apenas no Print)   */}
      {/* ============================================================ */}
      <div className="hidden print:block p-8 bg-white text-black font-sans max-w-4xl mx-auto space-y-6">
        <div className="border-b pb-4">
          <h1 className="text-2xl font-bold text-black">
            Antes do Burnout — Laudo Psicossocial Ocupacional (UK HSE-IT)
          </h1>
          <p className="text-sm text-gray-600">
            Relatório confidencial individual gerado em {new Date().toLocaleDateString("pt-BR")}.
          </p>
        </div>

        <div className="p-4 bg-gray-50 border rounded-lg flex items-center justify-between">
          <div>
            <span className="text-xs uppercase text-gray-500 font-bold">Classificação Geral:</span>
            <h2 className="text-xl font-bold text-black">{report.overallRisk}</h2>
            <p className="text-xs text-gray-600">{report.overallBenchmark.description}</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500">Índice Geral:</span>
            <div className="text-3xl font-bold text-black">{report.overallScore.toFixed(2)} / 5.00</div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold border-b pb-1">Detalhamento das 7 Dimensões</h3>
          {report.allDimensions.map((dim) => (
            <div key={dim.code} className="p-4 border rounded-lg space-y-2 break-inside-avoid">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-base text-black">{dim.name}</h4>
                <span className="text-sm font-bold">Score: {dim.score.toFixed(2)} ({dim.risk})</span>
              </div>
              <p className="text-xs text-gray-700">{dim.diagnosis.diagnostico}</p>
              {dim.diagnosis.roteiro_conversa && (
                <div className="p-2.5 bg-gray-50 rounded border text-xs italic text-gray-800">
                  <strong>Sugestão de Alinhamento com Liderança:</strong> &ldquo;{dim.diagnosis.roteiro_conversa}&rdquo;
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-[10px] text-gray-500 border-t pt-4">
          Instrumento de reflexão pessoal e prevenção ocupacional baseado no UK HSE-IT. Não substitui laudo médico pericial.
        </div>
      </div>
    </>
  );
}
