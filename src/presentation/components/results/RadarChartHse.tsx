"use client";

import React, { useSyncExternalStore } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { EnrichedDimension } from "@/application/recommendation-service";

interface RadarChartHseProps {
  dimensions: EnrichedDimension[];
}

export function RadarChartHse({ dimensions }: RadarChartHseProps) {
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Mapeamento na ordem canônica das 7 dimensões do HSE-IT
  const chartData = dimensions.map((dim) => ({
    dimensao: dim.name,
    score: dim.score,
    fullMark: 5.0,
  }));

  if (!isMounted) {
    return (
      <div className="w-full h-72 sm:h-96 flex items-center justify-center bg-[#120A24]/50 rounded-2xl border border-purple-500/20">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin shadow-[0_0_12px_rgba(168,85,247,0.5)]" />
      </div>
    );
  }

  return (
    <div className="w-full h-80 sm:h-[400px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <PolarGrid stroke="rgba(168, 85, 247, 0.25)" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="dimensao"
            tick={{
              fill: "#E9D5FF",
              fontSize: 12,
              fontWeight: 600,
            }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 5]}
            tickCount={6}
            tick={{ fill: "#A79BBF", fontSize: 10 }}
            stroke="rgba(168, 85, 247, 0.3)"
          />
          <Radar
            name="Seu Score"
            dataKey="score"
            stroke="#C084FC"
            fill="#A855F7"
            fillOpacity={0.38}
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#C084FC", stroke: "#FFFFFF", strokeWidth: 1.5 }}
            activeDot={{ r: 6, fill: "#E879F9", stroke: "#FFFFFF", strokeWidth: 2 }}
          />
          <Tooltip
            formatter={(value) => [`${value} / 5.00`, "Pontuação"]}
            contentStyle={{
              backgroundColor: "#120A24",
              border: "1px solid rgba(168, 85, 247, 0.35)",
              borderRadius: "0.75rem",
              color: "#FFFFFF",
              fontSize: "0.8125rem",
              boxShadow: "0 10px 25px -3px rgba(0, 0, 0, 0.7)",
            }}
            itemStyle={{ color: "#E9D5FF" }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
