import React from "react";
import { RISK_CONFIG } from "@/domain/classification";
import { RiskLevel } from "@/domain/types";
import { BenchmarkPosition } from "@/domain/benchmarks";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, ShieldCheck, AlertTriangle } from "lucide-react";

interface OverallScoreCardProps {
  score: number;
  risk: RiskLevel;
  benchmarkPosition: BenchmarkPosition;
  benchmarkDescription: string;
}

export function OverallScoreCard({
  score,
  risk,
  benchmarkDescription,
}: OverallScoreCardProps) {
  const riskMeta = RISK_CONFIG[risk];

  const getRiskIcon = () => {
    switch (risk) {
      case "BAIXO":
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case "MODERADO":
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case "CRITICO":
        return <ShieldAlert className="w-5 h-5 text-rose-400" />;
    }
  };

  const getSynthesisText = () => {
    switch (risk) {
      case "BAIXO":
        return "Seu ambiente profissional apresenta sólidas condições de sustentabilidade e proteção à sua saúde mental, com baixo risco imediato de esgotamento.";
      case "MODERADO":
        return "Você está enfrentando desgastes pontuais em algumas rotinas. Embora não configure sobrecarga aguda generalizada, exige ajustes preventivos para evitar a cronificação.";
      case "CRITICO":
        return "Seu índice indica sobrecarga e pressão expressivas no trabalho. Há fatores estressores agudos que exigem alinhamentos de limites e intervenções de autocuidado imediatas.";
    }
  };

  return (
    <Card className="p-6 sm:p-8 bg-[#120A24]/85 border-purple-500/25 shadow-xl shadow-purple-950/20 rounded-2xl flex flex-col justify-between space-y-6 backdrop-blur-xl relative overflow-hidden h-full">
      {/* Luz ambiente de fundo no card */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-purple-600/15 rounded-full blur-2xl pointer-events-none" />

      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-purple-300/80 uppercase tracking-wider">
            Índice de Sustentabilidade Geral
          </span>
          <div className="flex items-center gap-1.5">
            {getRiskIcon()}
            <Badge
              className={`${riskMeta.tailwindBg} ${riskMeta.tailwindText} ${riskMeta.tailwindBorder} border font-semibold text-xs`}
            >
              {riskMeta.label}
            </Badge>
          </div>
        </div>

        <div className="flex items-baseline gap-2 pt-2">
          <span className="text-5xl sm:text-6xl font-black text-white tracking-tight font-mono drop-shadow-[0_0_15px_rgba(168,85,247,0.35)]">
            {score.toFixed(2)}
          </span>
          <span className="text-purple-300/60 text-lg font-medium">/ 5.00</span>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-purple-500/20 relative z-10">
        <p className="text-sm text-purple-200/80 leading-relaxed">
          {getSynthesisText()}
        </p>

        <div className="text-xs text-purple-300/80 bg-[#1A0F33]/80 p-3.5 rounded-xl border border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <span className="font-semibold text-purple-200">Benchmark Populacional:</span>
          <span className="text-purple-300/90">{benchmarkDescription}</span>
        </div>
      </div>
    </Card>
  );
}
