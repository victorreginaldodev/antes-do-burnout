import type { Metadata } from "next";
import { Michroma, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const michroma = Michroma({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-michroma",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Antes do Burnout — Avaliação Psicossocial Científica",
  description:
    "Avaliação individual, anônima e gratuita baseada no padrão científico britânico UK HSE-IT para mapear sobrecarga, estresse e fatores psicossociais no trabalho.",
  keywords: [
    "burnout",
    "estresse no trabalho",
    "saúde mental",
    "avaliação psicossocial",
    "UK HSE",
    "qualidade de vida no trabalho",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${michroma.variable} ${plusJakarta.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
