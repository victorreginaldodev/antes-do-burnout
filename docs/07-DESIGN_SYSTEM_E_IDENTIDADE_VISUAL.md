# Design System & Identidade Visual — Antes do Burnout

> **Projeto:** Antes do Burnout (Avaliação Psicossocial Individual B2C)  
> **Papel:** Documentação de Design System, UI e Diretrizes de UX  
> **Versão:** 1.0.0  
> **Status:** Homologado para Engenharia & Design  

---

## 1. Filosofia de Design & Psicologia de UX

O projeto **Antes do Burnout** atende a pessoas que, frequentemente, chegam à plataforma em momentos de **vulnerabilidade emocional, sobrecarga cognitiva, estresse crônico ou exaustão mental**. 

Em termos de UX/UI, uma interface com excesso de estímulos, alarmista ou confusa pode amplificar a ansiedade do usuário. A identidade visual foi desenhada sobre **três pilares fundamentais**:

```
 ┌──────────────────────┐      ┌──────────────────────┐      ┌──────────────────────┐
 │ 1. ACOLHIMENTO E     │      │ 2. BAIXA CARGA       │      │ 3. RIGOR CLÍNICO E   │
 │    SERENIDADE        │      │    COGNITIVA         │      │    CREDIBILIDADE     │
 ├──────────────────────┤      ├──────────────────────┤      ├──────────────────────┤
 │ Cores terapêuticas,  │      │ Espaço em branco     │      │ Tipografia precisa,  │
 │ cantos orgânicos,    │  ──► │ generoso, foco em    │  ──► │ visualização de dados│
 │ ausência de tons     │      │ uma pergunta por     │      │ nítida, feedback     │
 │ estridentes ou       │      │ tela, ritmo de       │      │ acolhedor sem ser    │
 │ punitivos.           │      │ leitura cadenciado.  │      │ simplista ou frívolo.│
 └──────────────────────┘      └──────────────────────┘      └──────────────────────┘
```

### 1.1 Princípios de Design
1. **Calma & Clareza (Low Sensory Load):** Contrastes bem calibrados sem usar preto puro (`#000000`) nem brancos ofuscantes sobre fundos escuros de alto contraste. 
2. **Semáforo Empático (Não Punitivo):** O indicador de risco crítico (vermelho) deve comunicar cuidado e necessidade de atenção imediata, jamais reprovação, perigo mortal ou erro de sistema.
3. **Escaneabilidade e Ritmo:** Cada tela do questionário possui um ponto focal único: o texto da pergunta e as 5 opções da escala Likert com touch targets generosos.
4. **Acessibilidade Universal (WCAG 2.1 AA+):** Taxa de contraste de no mínimo 4.5:1 para textos corporais e 3:1 para componentes visuais interativos.

---

## 2. Sistema de Cores (Color Tokens)

A paleta combina a profundidade e estabilidade de um **Azul Petróleo / Slate Profundo** com acentos de calma em **Verde Sálvia / Mint Suave** (recuperação, respiração e clareza mental).

### 2.1 Paleta Primária (Brand & Interface)

| Token | Hex | Tailwind Class | Uso no Produto |
|---|---|---|---|
| `brand-50` | `#F0F7F7` | `bg-brand-50` | Fundo suave de cards em destaque, badges neutros |
| `brand-100` | `#DBEFEF` | `bg-brand-100` | Hover states, seleções suaves de fundo |
| `brand-200` | `#BCE0E0` | `border-brand-200` | Bordas secundárias, divisores de seção |
| `brand-500` | `#1D7A82` | `bg-brand-500` | Acentos secundários, botões secundários ativos |
| `brand-600` | `#0F5B63` | `bg-brand-600` | **Cor Primária da Marca**, botões principais, chamadas de ação (CTA) |
| `brand-700` | `#0B464C` | `bg-brand-700` | Estado Hover dos botões primários |
| `brand-900` | `#072B2F` | `text-brand-900` | Títulos de grande impacto, headers institucionais |

### 2.2 Neutros Acolhedores (Slate Quente / Muted Slate)

Evita tons frios industriais em favor de ardósia natural e equilibrada:

| Token | Hex (Light) | Hex (Dark) | Uso Principal |
|---|---|---|---|
| `background` | `#F8FAFB` | `#0D1117` | Fundo geral da página (off-white acolhedor / dark profundo) |
| `card` | `#FFFFFF` | `#161B22` | Superfície de cartões, formulários e modais |
| `card-hover` | `#F4F6F8` | `#1F242C` | Estado de foco/hover de cards |
| `border` | `#E2E8F0` | `#30363D` | Bordas de separação e contornos de botões neutros |
| `text-primary`| `#0F172A` | `#F1F5F9` | Título principal, textos de alta ênfase |
| `text-secondary`| `#475569` | `#94A3B8` | Enunciados de perguntas, descrições secundárias |
| `text-muted` | `#64748B` | `#6E7681` | Metadados, legendas, notas de rodapé |

### 2.3 Cores Semânticas do Motor Psicométrico (HSE-IT)

As 3 faixas normativas do UK HSE-IT têm representação visual cuidadosa:

```
🟢 Baixo Risco (Score ≥ 4.00)     --> Proteção, bem-estar, equilíbrio
🟡 Médio Risco (3.00 ≤ Score < 4.00) --> Atenção preventiva, desgaste inicial
🔴 Alto Risco (Score < 3.00)      --> Sobrecarga crítica, ação prioritária
```

| Nível | Token Base | Fundo Suave (Badge/Card) | Borda | Texto/Ícone | Significado Visual |
|---|---|---|---|---|---|
| **🟢 Baixo Risco** | `emerald-500` (`#10B981`) | `emerald-50` (`#ECFDF5`) | `emerald-200` (`#A7F3D0`) | `emerald-800` (`#065F46`) | Condição saudável, fator protetor ativo |
| **🟡 Médio Risco** | `amber-500` (`#F59E0B`) | `amber-50` (`#FFFBEB`) | `amber-200` (`#FDE68A`) | `amber-800` (`#92400E`) | Ponto de atenção e monitoramento |
| **🔴 Alto Risco** | `rose-500` (`#F43F5E`) | `rose-50` (`#FFF1F2`) | `rose-200` (`#FECDD3`) | `rose-800` (`#9F1239`) | Alerta empático para intervenção prioritária |

> **Nota de UX:** Nunca utilize vermelho puro de erro técnico (`#FF0000`). O tom `rose-500` (`#F43F5E`) transmite seriedade clínica com acolhimento, sem o impacto punitivo ou agressivo de uma falha de sistema.

---

## 3. Tipografia & Escala de Leitura

A tipografia do **Antes do Burnout** combina clareza geométrica moderna com excelente legibilidade para blocos de perguntas reflexivas e diagnósticos interpretativos.

### 3.1 Famílias Tipográficas
* **Primária (Sans-Serif):** `Plus Jakarta Sans` ou `Inter`
  * *Por que:* Excelente altura-x (x-height), formas abertas nas letras, zero fadiga em telas móveis e telas longas.
* **Mono / Dados Métricos:** `Geist Mono` ou `JetBrains Mono` para pontuações numéricas exatas (ex: `Score: 4.25`).

### 3.2 Escala Tipográfica Modular (Ratio 1.25 — Major Third)

| Nível / Tag | Tamanho (Desktop) | Tamanho (Mobile) | Peso | Line Height | Uso no Antes do Burnout |
|---|---|---|---|---|---|
| `Display / Hero` | `48px (3rem)` | `32px (2rem)` | Bold (700) | `1.15` | Chamada principal da Landing Page |
| `H1` | `36px (2.25rem)` | `28px (1.75rem)` | Bold (700) | `1.2` | Título da tela de Resultados / Diagnóstico |
| `H2` | `28px (1.75rem)` | `22px (1.375rem)` | SemiBold (600) | `1.3` | Títulos das Dimensões (Demandas, Controle, etc.) |
| `H3 / Pergunta` | `20px (1.25rem)` | `18px (1.125rem)` | Medium (500) | `1.45` | **Enunciado das 35 perguntas do HSE-IT** |
| `Body Large` | `18px (1.125rem)` | `16px (1rem)` | Regular (400) | `1.6` | Introdução explicativa da metodologia |
| `Body / Parágrafo` | `16px (1rem)` | `15px (0.9375rem)` | Regular (400) | `1.65` | Textos de intervenção e planos práticos |
| `Body Small` | `14px (0.875rem)` | `13px (0.8125rem)` | Regular / Medium | `1.5` | Labels de opções Likert, legendas |
| `Caption / Micro` | `12px (0.75rem)` | `12px (0.75rem)` | Medium (500) | `1.4` | Indicador "Pergunta 14 de 35", tags, badges |

### 3.3 Regras Tipográficas de UX
* **Comprimento de Linha de Ouro (Line Length):** Para a pergunta e recomendações, limitar a largura máxima do texto a **65 a 75 caracteres** (`max-w-xl` ou `max-w-2xl`). Linhas muito extensas cansam a vista e aumentam a taxa de abandono do teste.
* **Contraste de Peso:** Utilizar `SemiBold (600)` para conceitos-chave dentro do diagnóstico para permitir escaneamento dinâmico sem esforço.

---

## 4. Grid, Espaçamentos e Paddings (Spacing System)

O sistema de espaçamentos baseia-se na escala harmônica de **8px** (com sub-múltiplos de 4px para micro-ajustes).

### 4.1 Escala de Espaçamento Base

```
4px   (0.25rem) ── micro-gaps entre ícone e badge
8px   (0.5rem)  ── espaçamento interno de badges, gap entre tags
12px  (0.75rem) ── padding interno de botões compactos
16px  (1.0rem)  ── padding padrão mobile, gap entre alternativas Likert
24px  (1.5rem)  ── padding interno de cards de perguntas, separação de blocos
32px  (2.0rem)  ── respiro entre pergunta e bloco de respostas
48px  (3.0rem)  ── padding vertical de seções do questionário
64px  (4.0rem)  ── respiro entre módulos da Landing Page
```

### 4.2 Anatomia de Paddings por Componente

| Componente | Padding Horizontal | Padding Vertical | Gap Interno |
|---|---|---|---|
| **Botão Likert (Alternativa)** | `20px (1.25rem)` | `16px (1rem)` | `12px` (se com ícone/número) |
| **Card da Pergunta Atual** | `24px` (mobile) / `36px` (desktop) | `28px` (mobile) / `40px` (desktop) | `24px` |
| **Card de Dimensão no Resultado** | `20px` (mobile) / `28px` (desktop) | `20px` (mobile) / `28px` (desktop) | `16px` |
| **Container Central de Fluxo** | `16px` (mobile) / `24px` (desktop) | `32px` (mobile) / `56px` (desktop) | — |
| **Modal Informativo (UK HSE)** | `24px` | `28px` | `16px` |

### 4.3 Breakpoints e Max-Widths Canônicos

```css
/* Limites de largura focal para diminuir fadiga visual */
--container-quiz:    640px;  /* max-w-xl: foco estrito durante o questionário */
--container-result:  960px;  /* max-w-4xl: amplitude para gráficos e 2 colunas */
--container-landing: 1140px; /* max-w-6xl: espaçamento editorial e social proof */
```

* **Mobile (`< 640px`):** 1 coluna vertical, botões Likert ocupando 100% da largura (`w-full`), altura mínima de clique de **52px** para touch fácil.
* **Tablet / Desktop (`≥ 640px`):** Cards centralizados com elevação suave, alternativas Likert dispostas verticalmente ou horizontalmente com números de atalho no teclado (1 a 5).

---

## 5. Superfícies, Raios (Border Radius) e Elevação (Sombras)

Pessoas em estresse reagem melhor a **formas orgânicas e acolhedoras**. Cantos vivos e pontiagudos evocam rigidez institucional e frieza.

### 5.1 Border Radius Tokens

| Nome | Valor | Tailwind | Aplicação |
|---|---|---|---|
| `radius-sm` | `6px` | `rounded-md` | Badges de tag, tooltips |
| `radius-md` | `10px` | `rounded-lg` | Botões de ação, inputs de dados |
| `radius-lg` | `16px` | `rounded-xl` | **Botões de Resposta Likert**, mini-cards |
| `radius-xl` | `24px` | `rounded-2xl` | **Card Principal da Pergunta**, card do Radar |
| `radius-full`| `9999px` | `rounded-full` | Pílulas de progresso, avatares, indicadores |

### 5.2 Sistema de Elevação e Sombras (Soft Depth)

Sombras difusas, de cor neutra quente (sem bordas duras):

* **Superfície Nível 0 (Flat):** Fundo da página (`#F8FAFB`).
* **Superfície Nível 1 (Card Padrão):**  
  `box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.04);`  
  *Tailwind: `shadow-sm` + `border border-slate-200/80`*
* **Superfície Nível 2 (Card Focado / Hover):**  
  `box-shadow: 0 10px 25px -5px rgba(15, 91, 99, 0.08), 0 8px 10px -6px rgba(15, 91, 99, 0.04);`  
  *Tailwind: `shadow-md` ou custom `shadow-card-hover`*
* **Superfície Nível 3 (Modais / Sheet Flutuante):**  
  `box-shadow: 0 20px 35px -10px rgba(15, 23, 42, 0.12);`

---

## 6. Design dos Componentes Centrais

### 6.1 A Escala Likert de 5 Opções (O Coração da UX)

O usuário responde a 35 itens. O componente de resposta precisa ser **extremamente prazeroso, imediato e sem atrito**.

#### Estados Visuais da Alternativa:
1. **Padrão (Unselected):**  
   Fundo branco (`#FFFFFF`), borda sutil `border-slate-200`, texto em `text-slate-700`. Indicador numérico circular sutil (1 a 5) à esquerda.
2. **Hover:**  
   Fundo `brand-50` (`#F0F7F7`), borda `brand-300`, escala suave (`scale-[1.01]`), transição de 150ms.
3. **Selecionado (Selected / Active):**  
   Fundo `brand-50`, borda dupla com anel de foco `ring-2 ring-brand-600 border-brand-600`, texto em `text-brand-900` com font-semibold e ícone de check animado.
4. **Foco Teclado (A11y):**  
   Anel de foco de alto contraste `focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2`.

### 6.2 Indicador de Progresso Compassivo

Em vez de uma contagem fria ou barra acelerada, a barra de progresso do Antes do Burnout traz tranquilidade:

* **Visual:** Barra fina de 6px de altura, com preenchimento em gradiente suave (`from-brand-500 to-brand-600`), com pontas arredondadas (`rounded-full`).
* **Micro-cópia empática acima da barra:**
  * Perguntas 1-10: *"Iniciando sua reflexão sobre rotina e demandas..."*
  * Perguntas 11-20: *"Metade do caminho. Respire e continue no seu ritmo."*
  * Perguntas 21-35: *"Última etapa: apoio social e perspectivas futuras."*

### 6.3 Gráfico de Radar (Visualização Psicométrica das 7 Dimensões)

O gráfico de teia (Recharts) segue a paleta:
* **Eixos / Polígonos de Fundo:** Linhas de grade cinza suave (`#E2E8F0` em light, `#30363D` em dark), demarcando os anéis de 1.0 a 5.0.
* **Área Preenchida:** `fill="#1D7A82" fillOpacity={0.25} stroke="#0F5B63" strokeWidth={2.5}`.
* **Pontos (Vertices):** Círculos com preenchimento branco e borda na cor semântica do score de cada dimensão (Verde, Âmbar ou Vermelho).

---

## 7. Tokens de Tema para Implementação (Tailwind & CSS Variables)

Para integração direta com Next.js 15, Tailwind CSS e shadcn/ui:

```css
/* src/app/globals.css */
@layer base {
  :root {
    /* Cores de Fundo & Superfície */
    --background: 204 33% 98%;          /* #F8FAFB */
    --foreground: 222 47% 11%;          /* #0F172A */

    --card: 0 0% 100%;                  /* #FFFFFF */
    --card-foreground: 222 47% 11%;

    --popover: 0 0% 100%;
    --popover-foreground: 222 47% 11%;

    /* Brand Principal (Teal Profundo Terapêutico) */
    --primary: 186 73% 22%;             /* #0F5B63 */
    --primary-foreground: 0 0% 100%;

    --secondary: 184 32% 95%;           /* #F0F7F7 */
    --secondary-foreground: 186 73% 18%;

    --muted: 210 20% 96%;               /* #F1F5F9 */
    --muted-foreground: 215 16% 47%;    /* #64748B */

    --accent: 184 30% 92%;              /* #DBEFEF */
    --accent-foreground: 186 73% 22%;

    /* Semáforo Psicométrico */
    --risk-low: 160 84% 39%;            /* #10B981 - Baixo Risco */
    --risk-medium: 38 92% 50%;          /* #F59E0B - Médio Risco */
    --risk-high: 347 89% 60%;           /* #F43F5E - Alto Risco */

    --border: 214 32% 91%;              /* #E2E8F0 */
    --input: 214 32% 91%;
    --ring: 186 73% 22%;

    --radius: 1rem;                     /* 16px */
  }

  .dark {
    --background: 216 28% 7%;           /* #0D1117 */
    --foreground: 210 40% 98%;          /* #F1F5F9 */

    --card: 215 21% 11%;                /* #161B22 */
    --card-foreground: 210 40% 98%;

    --popover: 215 21% 11%;
    --popover-foreground: 210 40% 98%;

    --primary: 184 64% 38%;             /* #22949E */
    --primary-foreground: 216 28% 7%;

    --secondary: 215 21% 16%;
    --secondary-foreground: 210 40% 98%;

    --muted: 215 21% 16%;
    --muted-foreground: 215 14% 60%;

    --accent: 215 21% 18%;
    --accent-foreground: 210 40% 98%;

    --risk-low: 160 84% 45%;
    --risk-medium: 38 92% 55%;
    --risk-high: 347 89% 65%;

    --border: 215 21% 20%;              /* #30363D */
    --input: 215 21% 20%;
    --ring: 184 64% 45%;
  }
}
```

---

## 8. Guia de Aplicação e Checklist de Verificação de UI

Ao desenvolver qualquer tela ou componente do **Antes do Burnout**, valide os itens abaixo:

- [ ] **Acolhimento imediato:** O tom da página não é excessivamente hospitalar nem corporativo frio.
- [ ] **Alvos de toque confortáveis:** Todos os botões Likert têm altura mínima de **48px** (ideal **54px** no mobile).
- [ ] **Uma coisa por vez:** No questionário, evite poluir a tela com menus laterais, banners ou elementos concorrentes.
- [ ] **Feedback táctil e sonoro opcional:** Micro-transição fluida com `framer-motion` ao trocar de pergunta.
- [ ] **Zero constrangimento:** Os resultados comunicam caminhos de fortalecimento e acolhimento prático, sem rótulos patologizantes.
