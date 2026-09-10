import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Lock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CyberHeroVisual } from "@/presentation/components/landing/CyberHeroVisual";

export default function HomePage() {
  return (
    <div className="min-h-dvh w-full flex flex-col justify-between relative bg-[#090514] text-slate-100 select-none overflow-x-hidden">
      {/* Background Gradients & Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-fuchsia-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none -z-10" />

      {/* Header Limpo & Editorial (Sem badges soltas) */}
      <header className="w-full max-w-6xl mx-auto px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <Brain className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-display text-sm sm:text-base tracking-wider text-white">
            Antes do <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400">Burnout</span>
          </span>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 1. VERSÃO MOBILE FIRST (Com Densidade Visual & Impacto)       */}
      {/* ============================================================ */}
      <main className="lg:hidden flex-1 flex flex-col justify-around px-5 py-2 text-center max-w-sm sm:max-w-md mx-auto w-full z-10">
        {/* Arte Central com Presença Visual Real e Glow Volumétrico */}
        <div className="relative mx-auto my-1">
          <div className="absolute -inset-4 bg-gradient-to-tr from-purple-600/40 via-fuchsia-600/30 to-cyan-500/25 rounded-3xl blur-2xl opacity-80 animate-pulse-glow" />

          <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-3xl overflow-hidden border border-purple-400/40 shadow-[0_12px_40px_rgba(0,0,0,0.8)] bg-[#120A24] p-1.5 animate-float">
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src="/images/cyber_mind_hero.jpg"
                alt="Mapeamento Cognitivo e Saúde Mental"
                fill
                className="object-cover scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090514]/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Bloco de Mensagem Principal */}
        <div className="space-y-2.5 my-2">
          <h1 className="font-display text-xl sm:text-2xl text-white tracking-wide leading-snug">
            O que drena sua energia?{" "}
            <span className="text-gradient-cyber block pt-1">
              Descubra antes da exaustão.
            </span>
          </h1>

          <p className="font-sans text-xs sm:text-sm text-purple-200/80 leading-relaxed max-w-xs mx-auto">
            Mapeie cientificamente 7 dimensões da sua rotina profissional.
            Em 3 minutos, direto no seu aparelho e 100% anônimo.
          </p>

          {/* Linha de Confiança Editorial Compacta (Sem pills pesadas) */}
          <div className="flex items-center justify-center gap-3 pt-1 text-[11px] text-purple-300/70 font-sans">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-purple-400" /> 100% Anônimo
            </span>
            <span className="text-purple-500/40">•</span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> 3 a 5 min
            </span>
            <span className="text-purple-500/40">•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Gratuito
            </span>
          </div>
        </div>

        {/* Botão de Ação Touch-Ergonômico */}
        <div className="space-y-2 pt-1 pb-2">
          <Link href="/teste" className="block w-full">
            <Button
              size="lg"
              variant="cyber"
              className="w-full font-display text-xs sm:text-sm tracking-wider py-4 rounded-2xl shadow-[0_0_28px_rgba(168,85,247,0.55)] cursor-pointer"
            >
              <span>Iniciar Avaliação Gratuita</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>

          <p className="font-sans text-[10px] text-purple-300/60 flex items-center justify-center gap-1.5">
            <span>Processamento local no navegador • Zero cadastro</span>
          </p>
        </div>
      </main>

      {/* ============================================================ */}
      {/* 2. VERSÃO DESKTOP (Composição Tipográfica Pura & Elegante)   */}
      {/* ============================================================ */}
      <main className="hidden lg:grid lg:grid-cols-12 gap-8 xl:gap-14 items-center flex-1 max-w-6xl mx-auto px-6 xl:px-8 py-4 xl:py-8 w-full z-10">
        {/* Coluna Esquerda: Tipografia Michroma + Plus Jakarta Sans */}
        <div className="lg:col-span-7 space-y-5 text-left">
          
          <h1 className="font-display text-2xl xl:text-3xl 2xl:text-[2.2rem] text-white tracking-wide leading-[1.25]">
            Descubra o que está drenando sua energia no trabalho —{" "}
            <span className="text-gradient-cyber block pt-1.5">
              antes que vire exaustão.
            </span>
          </h1>

          <p className="font-sans text-sm xl:text-base text-purple-200/80 max-w-lg leading-relaxed font-normal">
            Mapeie com rigor psicométrico 7 dimensões essenciais da sua rotina profissional.
            Leva apenas 3 a 5 minutos, é 100% confidencial no seu navegador e não exige cadastro prévio.
          </p>

          <div className="pt-2 space-y-4">
            <Link href="/teste" className="inline-block">
              <Button
                size="lg"
                variant="cyber"
                className="font-display text-xs xl:text-sm tracking-wider px-8 py-4 rounded-xl shadow-[0_0_28px_rgba(168,85,247,0.45)] cursor-pointer"
              >
                <span>Iniciar Avaliação Gratuita</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            {/* Linha de Confiança Discreta e Editorial */}
            <div className="flex items-center gap-5 text-xs text-purple-300/60 font-sans">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-purple-400" /> 100% Confidencial
              </span>
              <span className="text-purple-500/40">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Metodologia Científica
              </span>
              <span className="text-purple-500/40">•</span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Devolução Instantânea
              </span>
            </div>
          </div>
        </div>

        {/* Coluna Direita: Obra Visual Cyber Mind com Moldura Minimalista */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <CyberHeroVisual />
        </div>
      </main>

      {/* Footer Minimalista */}
      <footer className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-3 border-t border-purple-500/15 flex flex-col sm:flex-row items-center justify-between text-[11px] text-purple-300/50 z-20 shrink-0 gap-1 text-center sm:text-left bg-[#090514]/40 backdrop-blur-xs font-sans">
        <p>
          © {new Date().getFullYear()} Antes do Burnout • Prevenção ocupacional e autoconhecimento individual.
        </p>
        <p className="text-purple-400/50">
          Nota ética: Instrumento de reflexão pessoal. Não substitui avaliação médica ou psicológica clínica.
        </p>
      </footer>
    </div>
  );
}
