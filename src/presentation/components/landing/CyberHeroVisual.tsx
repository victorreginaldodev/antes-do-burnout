"use client";

import React from "react";
import Image from "next/image";

export function CyberHeroVisual() {
  return (
    <div className="relative w-full max-w-[420px] mx-auto flex items-center justify-center select-none py-1">
      {/* Halo de luz volumétrico violeta */}
      <div className="absolute -inset-3 bg-gradient-to-tr from-purple-600/35 via-fuchsia-600/25 to-cyan-500/20 rounded-3xl blur-3xl opacity-70 animate-pulse-glow" />

      {/* Moldura Glassmorphism Minimalista */}
      <div className="relative w-full rounded-3xl border border-purple-500/25 bg-[#120A24]/80 backdrop-blur-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.7)] animate-float">
        
        {/* Janela Visual com a Obra Cyber Mind 100% Limpa */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-purple-500/20 bg-[#090514]">
          <Image
            src="/images/cyber_mind_hero.jpg"
            alt="Mapeamento Cognitivo e Prevenção do Burnout"
            fill
            className="object-cover object-center scale-[1.02] hover:scale-105 transition-transform duration-700 ease-out"
            priority
          />
        </div>
      </div>
    </div>
  );
}
