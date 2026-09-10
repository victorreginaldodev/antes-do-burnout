import { SocialCardData } from "@/application/share-orchestrator";

/**
 * Desenha um card de alta resolução (1080x1080) diretamente em um elemento HTMLCanvasElement.
 */
export function renderSocialCardToCanvas(
  canvas: HTMLCanvasElement,
  data: SocialCardData
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const width = 1080;
  const height = 1080;
  canvas.width = width;
  canvas.height = height;

  // 1. Fundo com gradiente sofisticado
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#08131F");
  bgGrad.addColorStop(0.5, "#0D1B2A");
  bgGrad.addColorStop(1, "#050C14");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Efeito de brilho radial sutil no centro
  const glowGrad = ctx.createRadialGradient(540, 540, 50, 540, 540, 500);
  glowGrad.addColorStop(0, "rgba(14, 116, 144, 0.12)");
  glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = glowGrad;
  ctx.fillRect(0, 0, width, height);

  // Moldura interna refinada
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 40, width - 80, height - 80);

  // 2. Cabeçalho de Marca
  // Ícone do Logo
  ctx.fillStyle = "#0891B2";
  ctx.beginPath();
  ctx.roundRect(70, 70, 54, 54, 14);
  ctx.fill();

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 32px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("B", 97, 97);

  // Texto do Logo
  ctx.textAlign = "left";
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 34px sans-serif";
  ctx.fillText("Antes do Burnout", 140, 88);

  ctx.fillStyle = "#94A3B8";
  ctx.font = "18px sans-serif";
  ctx.fillText("Autoavaliação Psicossocial • Metodologia UK HSE-IT", 140, 114);

  // 3. Card do Score Central
  ctx.textAlign = "center";
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 88px monospace";
  ctx.fillText(data.overallScore.toFixed(2), 540, 225);

  ctx.fillStyle = "#64748B";
  ctx.font = "28px sans-serif";
  ctx.fillText("/ 5.00", 690, 225);

  // Badge do Nível de Risco
  ctx.font = "bold 20px sans-serif";
  const badgeText = data.riskLabel.toUpperCase();
  const badgeWidth = ctx.measureText(badgeText).width + 36;
  const badgeHeight = 38;
  const badgeX = 540 - badgeWidth / 2;
  const badgeY = 250;

  ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
  ctx.beginPath();
  ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 19);
  ctx.fill();
  ctx.strokeStyle = data.riskHexColor;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = data.riskHexColor;
  ctx.textBaseline = "middle";
  ctx.fillText(badgeText, 540, badgeY + badgeHeight / 2);

  // Perfil Sintetizado
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "500 24px sans-serif";
  ctx.fillText(data.profileTitle, 540, 325);

  // 4. Desenho do Gráfico de Radar Polar das 7 Dimensões
  const radarCx = 540;
  const radarCy = 590;
  const radarRadius = 180;
  const numAxes = 7;
  const angleStep = (Math.PI * 2) / numAxes;

  // Grade concêntrica (4 níveis: 1.25, 2.50, 3.75, 5.00)
  for (let level = 1; level <= 4; level++) {
    const r = (level / 4) * radarRadius;
    ctx.beginPath();
    for (let i = 0; i < numAxes; i++) {
      const angle = -Math.PI / 2 + i * angleStep;
      const x = radarCx + r * Math.cos(angle);
      const y = radarCy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Linhas radiais dos eixos
  for (let i = 0; i < numAxes; i++) {
    const angle = -Math.PI / 2 + i * angleStep;
    const x = radarCx + radarRadius * Math.cos(angle);
    const y = radarCy + radarRadius * Math.sin(angle);
    ctx.beginPath();
    ctx.moveTo(radarCx, radarCy);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Polígono de Scores do Usuário
  ctx.beginPath();
  const points: Array<{ x: number; y: number }> = [];
  data.radarPoints.forEach((point, i) => {
    const angle = -Math.PI / 2 + i * angleStep;
    const scoreFraction = Math.max(0, Math.min(5, point.score)) / 5.0;
    const r = scoreFraction * radarRadius;
    const x = radarCx + r * Math.cos(angle);
    const y = radarCy + r * Math.sin(angle);
    points.push({ x, y });
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();

  ctx.fillStyle = "rgba(8, 145, 178, 0.45)";
  ctx.fill();
  ctx.strokeStyle = "#22D3EE";
  ctx.lineWidth = 3.5;
  ctx.stroke();

  // Vértices do Polígono
  points.forEach((pt) => {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.strokeStyle = "#0891B2";
    ctx.lineWidth = 2.5;
    ctx.stroke();
  });

  // Rótulos dos Eixos ao redor do Radar
  ctx.font = "bold 17px sans-serif";
  data.radarPoints.forEach((point, i) => {
    const angle = -Math.PI / 2 + i * angleStep;
    const labelDistance = radarRadius + 38;
    const lx = radarCx + labelDistance * Math.cos(angle);
    const ly = radarCy + labelDistance * Math.sin(angle);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#F8FAFC";
    ctx.fillText(`${point.name}`, lx, ly - 9);

    ctx.font = "14px monospace";
    ctx.fillStyle = "#38BDF8";
    ctx.fillText(`${point.score.toFixed(2)}`, lx, ly + 11);
    ctx.font = "bold 17px sans-serif";
  });

  // 5. Destaques das Forças e Pontos de Atenção (Abaixo do Radar)
  const highlightsY = 880;
  if (data.attentionDimension || data.strongestDimension) {
    ctx.textAlign = "center";
    ctx.font = "500 20px sans-serif";

    if (data.attentionDimension && data.strongestDimension) {
      ctx.fillStyle = "#FDA4AF";
      ctx.fillText(`• Maior Atenção: ${data.attentionDimension.name} (${data.attentionDimension.score.toFixed(2)})`, 340, highlightsY);

      ctx.fillStyle = "#6EE7B7";
      ctx.fillText(`• Maior Fortaleza: ${data.strongestDimension.name} (${data.strongestDimension.score.toFixed(2)})`, 740, highlightsY);
    } else if (data.strongestDimension) {
      ctx.fillStyle = "#6EE7B7";
      ctx.fillText(`• Principal Fortaleza: ${data.strongestDimension.name} (${data.strongestDimension.score.toFixed(2)})`, 540, highlightsY);
    }
  }

  // 6. Rodapé com URL da Plataforma
  ctx.textAlign = "center";
  ctx.fillStyle = "#94A3B8";
  ctx.font = "18px sans-serif";
  ctx.fillText("Faça sua autoavaliação gratuita e confidencial em:", 540, 970);

  ctx.fillStyle = "#38BDF8";
  ctx.font = "bold 22px sans-serif";
  ctx.fillText("antesdoburnout.com.br", 540, 1005);
}

/**
 * Converte o card em PNG e dispara o download automático no navegador.
 */
export function downloadSocialCard(
  data: SocialCardData,
  filename = "meu-diagnostico-antes-do-burnout.png"
): void {
  if (typeof window === "undefined") return;

  const canvas = document.createElement("canvas");
  renderSocialCardToCanvas(canvas, data);

  const dataUrl = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
