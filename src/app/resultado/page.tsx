import { Metadata } from "next";
import { ResultsView } from "@/presentation/components/results/ResultsView";

export const metadata: Metadata = {
  title: "Seu Diagnóstico Psicossocial | Antes do Burnout",
  description:
    "Confira seu índice geral de sustentabilidade, gráfico de radar das 7 dimensões psicossociais e roteiros práticos de alinhamento com a chefia.",
};

export default function ResultadoPage() {
  return <ResultsView />;
}
