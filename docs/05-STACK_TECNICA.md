# Arquitetura e Stack Tecnológica — Antes do Burnout

> **Projeto:** Antes do Burnout (Avaliação Psicossocial Individual B2C)  
> **Versão:** 1.0.0  
> **Data:** Setembro/2026  
> **Status:** Definida e Homologada  

---

## 1. Visão Arquitetural

O **Antes do Burnout** é concebido como uma aplicação web moderna, responsiva (*mobile-first*), de alta performance e com processamento psicométrico 100% *client-side* para garantir **privacidade absoluta do usuário**, **zero latência** e **custo operacional zero de infraestrutura**.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CAMADA DE APRESENTAÇÃO                        │
│                                                                         │
│   Next.js 15 (App Router) + React 19 + TypeScript                       │
│   ├── UI: Tailwind CSS + shadcn/ui + Lucide Icons                       │
│   ├── Animações & Micro-interações: Framer Motion                       │
│   └── Visualização Psicométrica: Recharts (Radar / Teia + Gauge)        │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼────────────────────────────────────┐
│                       CAMADA DE MOTOR PSICOMÉTRICO                      │
│                                                                         │
│   TypeScript Puro (Client-side / In-browser)                            │
│   ├── Catálogo: 35 Perguntas Oficiais UK HSE-IT                         │
│   ├── Reverse Scoring: Inversão determinística de 8 itens (6 - x)       │
│   ├── Classificação Normativa: 3 faixas de corte (Verde/Âmbar/Vermelho) │
│   └── Motor de Recomendações: Aconselhamento prático individualizado    │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼────────────────────────────────────┐
│                    CAMADA DE VIRALIDADE & SERVIÇOS                      │
│                                                                         │
│   Compartilhamento & Serverless                                         │
│   ├── Geração de Cards Sociais: html-to-image / Canvas (1080x1080)      │
│   ├── Metatags & OpenGraph Dinâmico: Next Metadata API                  │
│   └── Rotas Serverless (Fase 2): Webhooks Pix + Emissão de Relatório PDF│
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Tecnologias Selecionadas

### 2.1 Core & Runtime
* **Runtime:** Node.js (v24.x LTS)
* **Gerenciador de Pacotes:** `pnpm` (v11.x) — Alta velocidade de instalação, eficiência de disco e resolução estrita de dependências.
* **Linguagem:** TypeScript (v5.x) — Tipagem estrita de todas as estruturas psicométricas (itens, dimensões, escalas, scores e níveis de risco).
* **Framework Web:** **Next.js 15 (App Router)**
  * *Motivo:* Permite SSR/SSG para a landing page (SEO de alta conversão para buscas como "teste de burnout" e "estresse no trabalho"), metatags OpenGraph ricas para redes sociais e suporte nativo a *Route Handlers* serverless quando ativarmos a monetização via Pix/PDF.

### 2.2 Estilização e Design System
* **Tailwind CSS (v4 / v3.4):** Design responsivo utilitário, *mobile-first* rigoroso, paleta técnica e tema moderno (Dark/Light).
* **shadcn/ui (Radix UI):** Componentes acessíveis (WAI-ARIA), sem dependência pesada de runtime, incluindo:
  * `Progress` (Barra de progresso de resposta fluida).
  * `Card` (Apresentação de blocos e recomendações).
  * `Badge` (Sinalizadores de risco: Verde, Âmbar e Vermelho).
  * `Dialog / Sheet` (Modais informativos sobre a metodologia UK HSE).
  * `Button` e `RadioGroup` (Seleção clara das opções da escala Likert).
* **Ícones:** `lucide-react` — Ícones modernos, leves e semanticamente consistentes.

### 2.3 Visualização de Dados (Data Viz)
* **Recharts:**
  * **`RadarChart` (Gráfico de Teia / Radar):** Componente central do resultado, plotando as 7 dimensões do HSE-IT em escala 1.00 a 5.00 com polígono sombreado translúcido e eixos polares bem definidos.
  * **`RadialBarChart` / Custom Gauge:** Indicador circular do Índice Geral com marcação visual da faixa de risco.

### 2.4 Experiência do Usuário (UX) & Transições
* **Framer Motion:**
  * Fluxo do questionário em cartões sequenciais animados com transição suave.
  * Evita a fadiga de exibir 35 perguntas de uma vez em tela longa.
  * Transição triunfal ao concluir o teste com efeito de revelação das métricas.

### 2.5 Viralidade & Social Sharing
* **html-to-image / html2canvas:**
  * Captura direta do componente de resumo do diagnóstico.
  * Gera instantaneamente um card gráfico (1080x1080 para feed ou 1080x1920 para Stories) com o perfil psicossocial do usuário, radar e assinatura da plataforma, pronto para download ou postagem no LinkedIn / Instagram.

---

## 3. Estrutura Canônica de Diretórios

```
antes-do-burnout/
├── docs/                             # Dossiê técnico, metodologias e regras
│   ├── 00-catalogo-35-perguntas.json
│   ├── 01-metodologia-hse-it.md
│   ├── 02-motor-psicometrico-referencia.py
│   ├── 03-catalogo-orientacoes-e-intervencoes.py
│   ├── 04-testes-psicometricos-referencia.py
│   ├── ESTRATEGIA_PRODUTO_E_MONETIZACAO.md
│   ├── STACK_TECNICA.md              # Este documento
│   └── kit-ferramentas/
│
├── public/                           # Assets estáticos, logos, badges e favicon
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Shell global, fontes, metatags OpenGraph
│   │   ├── page.tsx                  # Landing page de conversão com call-to-action
│   │   ├── metodologia/page.tsx      # Explicação científica da metodologia UK HSE
│   │   ├── teste/
│   │   │   └── page.tsx              # Fluxo interativo das 35 questões
│   │   ├── resultado/
│   │   │   └── page.tsx              # Dashboard de resultado (Radar, Gauge, Diagnóstico)
│   │   └── api/                      # Futuros endpoints serverless (Pix, PDF)
│   │
│   ├── components/
│   │   ├── ui/                       # Componentes primitivos shadcn/ui
│   │   ├── landing/                  # Seções da landing page (Hero, Prova Social, FAQ)
│   │   ├── questionnaire/            # Pergunta ativa, escala Likert, barra de progresso
│   │   ├── charts/                   # RadarChartHse, ScoreGauge, MetricCards
│   │   └── share/                    # Gerador do card compartilhável para redes
│   │
│   ├── lib/
│   │   ├── hse-engine.ts             # Motor psicométrico puro (cálculos, inversão 6-x)
│   │   ├── questions.ts              # Carregamento e tipagem do catálogo de 35 perguntas
│   │   ├── recommendations.ts        # Matriz de diagnósticos e orientações individuais
│   │   └── utils.ts                  # Helpers de formatação e manipulação de classes
│   │
│   └── types/
│       └── hse.ts                    # Definição de tipos TypeScript canônicos
│
├── package.json
├── pnpm-lock.yaml
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## 4. Padrões de Código e Regras Não Negociáveis

1. **Fidelidade Psicométrica Absoluta:**
   * A implementação em TypeScript em `src/lib/hse-engine.ts` deve produzir resultados matematicamente idênticos ao script canônico de referência [`docs/02-motor-psicometrico-referencia.py`](02-motor-psicometrico-referencia.py).
   * Os 8 itens com redação negativa (`3, 5, 6, 10, 13, 16, 18, 21`) devem passar obrigatoriamente pela fórmula `6 - Resposta`.
2. **Zero Fricção de Entrada:**
   * Nenhuma pergunta de cadastro ou e-mail pode bloquear o início da avaliação. O usuário deve conseguir iniciar o teste com 1 clique a partir da landing page.
3. **Privacidade e Conformidade LGPD:**
   * O cálculo ocorre 100% no navegador. Nenhuma informação pessoal sensível ou identificável é exigida ou transmitida sem consentimento prévio.
4. **Performance Mobile:**
   * Tamanho de bundle controlado, fontes otimizadas via `next/font` e interatividade instantânea sem engasgos na digitação/toque.

---

## 5. Próximas Fases de Implementação

* [ ] **Fase 1:** Inicialização do workspace Next.js 15 com TypeScript, Tailwind CSS e shadcn/ui via `pnpm`.
* [ ] **Fase 2:** Implementação do motor psicométrico (`hse-engine.ts`) e suíte de testes unitários com Vitest para garantir paridade com o Python.
* [ ] **Fase 3:** Construção da interface do questionário (fluxo de 35 passos interativos com animações fluidas).
* [ ] **Fase 4:** Construção do Dashboard de Resultados com Gráfico de Radar e diagnóstico textual individual humanizado.
* [ ] **Fase 5:** Implementação do Card Compartilhável para redes sociais.
