import { AssessmentReport } from "./recommendation-service";
import { RISK_CONFIG } from "@/domain/classification";
import { RiskLevel } from "@/domain/types";

export interface SocialCardData {
  overallScore: number;
  overallRisk: RiskLevel;
  riskLabel: string;
  riskHexColor: string;
  profileTitle: string;
  radarPoints: Array<{ name: string; score: number }>;
  strongestDimension?: { name: string; score: number };
  attentionDimension?: { name: string; score: number };
  websiteUrl: string;
  shareText: string;
}

/**
 * Prepara e consolida os dados do laudo para a geração do card visual 1080x1080.
 */
export function prepareSocialCardData(
  report: AssessmentReport,
  originUrl = "https://antesdoburnout.com.br"
): SocialCardData {
  const riskMeta = RISK_CONFIG[report.overallRisk];

  // Título de perfil empático sintetizado
  let profileTitle = "Perfil: Equilíbrio e Fatores Protetores";
  if (report.overallRisk === "CRITICO") {
    profileTitle = report.primaryVulnerability
      ? `Sobrecarga Severa em ${report.primaryVulnerability.name}`
      : "Sobrecarga Aguda no Trabalho";
  } else if (report.overallRisk === "MODERADO") {
    profileTitle = report.primaryVulnerability
      ? `Resiliência com Atenção em ${report.primaryVulnerability.name}`
      : "Desgaste Moderado Pontual";
  } else if (report.primaryVulnerability) {
    profileTitle = `Alta Resiliência com Atenção em ${report.primaryVulnerability.name}`;
  }

  const radarPoints = report.allDimensions.map((d) => ({
    name: d.name,
    score: d.score,
  }));

  const strongestDimension = report.primaryProtectiveFactor
    ? {
        name: report.primaryProtectiveFactor.name,
        score: report.primaryProtectiveFactor.score,
      }
    : undefined;

  const attentionDimension = report.primaryVulnerability
    ? {
        name: report.primaryVulnerability.name,
        score: report.primaryVulnerability.score,
      }
    : undefined;

  const shareText = `Fiz minha autoavaliação psicossocial no "Antes do Burnout" (baseada na metodologia britânica UK HSE-IT).
Meu Índice de Sustentabilidade Geral foi ${report.overallScore.toFixed(2)}/5.00 (${riskMeta.badgeLabel}).

Conhecer nossos limites e fatores estressores é o primeiro passo para prevenir a exaustão.
Faça sua avaliação gratuita e anônima em: ${originUrl}`;

  return {
    overallScore: report.overallScore,
    overallRisk: report.overallRisk,
    riskLabel: riskMeta.label,
    riskHexColor: riskMeta.hexColor,
    profileTitle,
    radarPoints,
    strongestDimension,
    attentionDimension,
    websiteUrl: originUrl,
    shareText,
  };
}
