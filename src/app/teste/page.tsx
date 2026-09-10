import { Metadata } from "next";
import { QuestionnaireView } from "@/presentation/components/questionnaire/QuestionnaireView";

export const metadata: Metadata = {
  title: "Autoavaliação Psicossocial (HSE-IT) | Antes do Burnout",
  description:
    "Avalie com rigor científico as 7 dimensões do seu trabalho e descubra fatores de risco e proteção antes do esgotamento profissional.",
};

export default function TestePage() {
  return (
    <div className="min-h-screen bg-[#090514] text-slate-100 flex flex-col justify-center relative overflow-x-hidden">
      {/* Luz ambiente de fundo */}
      <div className="absolute top-10 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <QuestionnaireView />
    </div>
  );
}
