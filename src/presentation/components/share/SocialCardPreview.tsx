"use client";

import React, { useEffect, useRef } from "react";
import { SocialCardData } from "@/application/share-orchestrator";
import { renderSocialCardToCanvas } from "@/infrastructure/image/canvas-card-generator";

interface SocialCardPreviewProps {
  data: SocialCardData;
}

export function SocialCardPreview({ data }: SocialCardPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      renderSocialCardToCanvas(canvasRef.current, data);
    }
  }, [data]);

  return (
    <div className="w-full max-w-[420px] mx-auto aspect-square rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 bg-slate-950">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain block"
        width={1080}
        height={1080}
      />
    </div>
  );
}
