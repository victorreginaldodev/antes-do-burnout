"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Question } from "@/domain/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LikertOptionsGroup } from "./LikertOptionsGroup";

interface QuestionCardProps {
  question: Question;
  direction: 1 | -1;
  selectedScore: number | undefined;
  onSelect: (value: number) => void;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 30 : -30,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -30 : 30,
    opacity: 0,
  }),
};

export function QuestionCard({
  question,
  direction,
  selectedScore,
  onSelect,
}: QuestionCardProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={question.numero}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="w-full"
        >
          <Card className="p-6 sm:p-8 bg-[#120A24]/90 shadow-2xl border border-purple-500/30 rounded-3xl backdrop-blur-xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Badge variant="cyber" className="text-xs uppercase tracking-wider font-semibold">
                  {question.dimensao_nome}
                </Badge>
                <span className="text-xs text-purple-300/70 font-medium">
                  {question.escala === "frequencia"
                    ? "Escala de Frequência"
                    : "Escala de Concordância"}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-semibold text-white leading-snug">
                &ldquo;{question.texto}&rdquo;
              </h2>

              <LikertOptionsGroup
                options={question.opcoes}
                selectedScore={selectedScore}
                onSelect={onSelect}
              />

              <div className="pt-2 text-center text-xs text-purple-300/60">
                💡 Dica: Você pode responder diretamente pelo teclado pressionando os números de{" "}
                <span className="font-semibold text-purple-200">1 a 5</span>.
              </div>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
