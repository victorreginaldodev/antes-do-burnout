# Antes do Burnout — Documentação Técnica e de Produto

> **Plataforma:** Avaliação Psicossocial Individual e Prevenção ao Esgotamento Profissional (B2C)  
> **Fundamentação Científica:** UK Health and Safety Executive — Indicator Tool (HSE-IT)  
> **Status:** Documentação Saneada, Homologada e Pronta para Implementação  

---

## 1. Visão Geral do Projeto

O **Antes do Burnout** é uma aplicação web moderna, responsiva e de alta performance voltada ao trabalhador individual (CLT, PJ, autônomo e servidor público). A plataforma oferece uma autoavaliação psicossocial profunda, com **privacidade total (*client-side*)**, **zero atrito de entrada** e **devolução instantânea de diagnósticos humanizados**.

O projeto utiliza o consagrado instrumento psicométrico britânico **UK HSE-IT**, adaptando a linguagem regulatória e corporativa para uma experiência de **acolhimento, autoconhecimento e ação prática**.

---

## 2. Índice Mestre da Documentação

A pasta `docs/` é organizada de forma sequencial para cobrir todo o ciclo de vida do produto:

| # | Documento | Categoria | Descrição e Propósito |
|:---:|:---|:---:|:---|
| **00** | [`00-catalogo-35-perguntas.json`](00-catalogo-35-perguntas.json) | **Dados** | Catálogo bruto estruturado das 35 perguntas, dimensões, opções Likert e flags de inversão. |
| **01** | [`01-METODOLOGIA_CIENTIFICA_HSE.md`](01-METODOLOGIA_CIENTIFICA_HSE.md) | **Ciência** | Fundamentação psicométrica do UK HSE-IT, as 7 dimensões e faixas normativas de corte. |
| **02** | [`02-ESPECIFICACAO_MOTOR_PSICOMETRICO.md`](02-ESPECIFICACAO_MOTOR_PSICOMETRICO.md) | **Matemática** | Fórmulas, regras canônicas de reverse scoring ($6 - x$), validações e casos de teste. |
| **03** | [`03-CATALOGO_DIAGNOSTICOS_B2C.md`](03-CATALOGO_DIAGNOSTICOS_B2C.md) | **Copywriting** | Diagnósticos empáticos, estratégias de *coping* e roteiros de conversa com a chefia. |
| **03** | [`03-catalogo-diagnosticos-b2c.json`](03-catalogo-diagnosticos-b2c.json) | **Dados** | Matriz de diagnósticos e ações em formato JSON para importação direta no frontend. |
| **04** | [`04-ESTRATEGIA_PRODUTO_E_MONETIZACAO.md`](04-ESTRATEGIA_PRODUTO_E_MONETIZACAO.md) | **Negócios** | Posicionamento de autoridade, viralidade, modelo Freemium (PDF/Pix) e lead magnet B2B. |
| **05** | [`05-STACK_TECNICA.md`](05-STACK_TECNICA.md) | **Tecnologia** | Next.js 15, TypeScript, Tailwind CSS, Recharts, Framer Motion e Node.js v24 / pnpm. |
| **06** | [`06-ARQUITETURA_DE_SOFTWARE.md`](06-ARQUITETURA_DE_SOFTWARE.md) | **Engenharia** | Clean Architecture em 4 camadas, ciclo de vida da sessão, auto-save e fluxo de dados. |
| **07** | [`07-DESIGN_SYSTEM_E_IDENTIDADE_VISUAL.md`](07-DESIGN_SYSTEM_E_IDENTIDADE_VISUAL.md) | **UI/UX** | Paleta acolhedora, semáforo empático, tipografia, tokens de cor e psicologia visual. |
| **08** | [`08-JORNADA_DO_USUARIO_E_TELAS.md`](08-JORNADA_DO_USUARIO_E_TELAS.md) | **PRD / Telas** | Wireframes textuais, estados das 4 telas e especificação de interações. |
| 📁 | `kit-ferramentas/` | **Referência** | Planilhas oficiais do UK HSE e Fundacentro (.xlsx) para percentis amostrais. |
| 📁 | `legacy/` | **Arquivo** | Código Python de referência exportado do SSTSuite mantido para histórico. |

---

## 3. As Regras Psicométricas Canônicas (Imutáveis)

1. **A Regra de Ouro:**
   * **Scores altos ($\approx 5{,}00$):** Condições excelentes, saudáveis e de baixo risco (fatores protetores).
   * **Scores baixos ($\approx 1{,}00$):** Condições críticas, sobrecarga severa e alto risco de adoecimento.
2. **Reverse Scoring Mandatório ($6 - x$):**
   * Exatamente **8 itens negativos** devem ser invertidos antes de calcular as médias:
     $$\mathbf{3, 5, 6, 10, 13, 16, 18, 21}$$
3. **As 7 Dimensões Avaliadas:**
   * **Demandas** (`demanda` - 6 itens: 3, 6, 10, 14, 16, 21)
   * **Controle** (`controle` - 5 itens: 2, 9, 12, 17, 19)
   * **Apoio da Chefia** (`apoio_chefia` - 5 itens: 23, 24, 25, 26, 33)
   * **Apoio dos Colegas** (`apoio_colegas` - 4 itens: 7, 8, 15, 22)
   * **Relacionamentos** (`relacionamentos` - 4 itens: 5, 13, 18, 30)
   * **Clareza de Papel** (`papel` - 7 itens: 1, 4, 11, 20, 31, 34, 35)
   * **Gestão de Mudanças** (`mudancas` - 4 itens: 27, 28, 29, 32)
4. **Faixas de Corte Absolutas:**
   * 🟢 **$\ge 4{,}00$:** Baixo Risco (Fator Protetor / Verde)
   * 🟡 **$3{,}00 \le X < 4{,}00$:** Risco Moderado (Ponto de Atenção / Âmbar)
   * 🔴 **$< 3{,}00$:** Alto Risco (Crítico / Ação Imediata / Vermelho)

---

## 4. O Que Ficou no Passado (Desacoplamento do SSTSuite)

* **Trava de Cluster Mínimo ($N \ge 5$):** Eliminada. A avaliação individual é devolvida instantaneamente ($N = 1$).
* **Obrigações Regulatórias Corporativas:** Sem matriz NR-01/GRO ($P \times S$), GHEs, unidades, setores ou envio de eventos ao eSocial.
* **Linguagem Institucional Fria:** Substituída por aconselhamento empático em 2ª pessoa ("Você"), orientações práticas de negociação e autocuidado.

---

## 5. Próximo Passo: Implementação

Com a base documental 100% saneada, validada e sem redundâncias, o projeto está pronto para a **Fase 1 de Engenharia**:
* Inicialização do projeto Next.js 15 (App Router) + TypeScript + Tailwind CSS via `pnpm`.