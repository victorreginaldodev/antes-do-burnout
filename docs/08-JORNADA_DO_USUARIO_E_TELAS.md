# Jornada do Usuário & Especificação Funcional de Telas

> **Projeto:** Antes do Burnout  
> **Papel:** Product Requirements Document (PRD) Funcional e Wireframes Textuais  
> **Público:** Trabalhador individual (Mobile & Desktop)  
> **Status:** Homologado para Desenvolvimento  

---

## 1. Visão Geral da Jornada (User Journey)

A experiência foi desenhada com foco em **Zero Atrito Inicial**, **Acolhimento Sensorial** e **Alta Compartilhabilidade**:

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│ 1. LANDING PAGE │ ───►  │ 2. QUESTIONÁRIO │ ───►  │ 3. DASHBOARD    │ ───►  │ 4. VIRALIDADE & │
│                 │       │                 │       │    DE RESULTADO │       │    AÇÃO         │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ • Hero Acolhedor│       │ • 35 Perguntas  │       │ • Score Geral   │       │ • Card 1080x1080│
│ • Autoridade UK │       │ • Stepper Suave │       │ • Gráfico Radar │       │ • Roteiro Conversa│
│ • "3 minutos"   │       │ • Escala Likert │       │ • 7 Dimensões   │       │ • Indicar ao RH │
│ • CTA sem login │       │ • Auto-save     │       │ • Planos Coping │       │ • Relatório PDF │
└─────────────────┘       └─────────────────┘       └─────────────────┘       └─────────────────┘
```

---

## 2. Anatomia das Telas e Wireframes Textuais

---

### Tela 1: Landing Page (`/`)
* **Objetivo:** Converter o visitante em respondente imediatamente, validando autoridade técnica sem sobrecarregar com jargões.

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo: Antes do Burnout]                  [Metodologia UK]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Badge: Padrão Científico UK HSE-IT / OIT]                 │
│                                                             │
│  Descubra se o seu trabalho está                            │
│  esgotando você antes que vire Burnout.                      │
│                                                             │
│  Uma avaliação psicossocial científica, anônima e gratuita  │
│  para mapear sobrecarga, autonomia e relacionamentos.       │
│                                                             │
│  [ ▶ Iniciar Avaliação Gratuita (3 minutos) ]               │
│  🔒 100% confidencial • Sem necessidade de cadastro         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  [Seção: As 7 Dimensões Mapeadas]                           │
│  • Carga e Prazos     • Autonomia      • Apoio da Liderança │
│  • Clima entre Pares  • Assédio/Atritos • Metas e Mudanças  │
├─────────────────────────────────────────────────────────────┤
│  [Seção: Autoridade Científica]                             │
│  "Baseado no HSE Indicator Tool, padrão britânico..."       │
├─────────────────────────────────────────────────────────────┤
│  [Footer: Termos de Privacidade • Isenção Médica / FAQ]     │
└─────────────────────────────────────────────────────────────┘
```

* **Comportamentos Interativos:**
  * O botão primário direciona imediatamente para `/teste`.
  * Nenhum modal ou campo de captura de e-mail é exigido.

---

### Tela 2: O Questionário Interativo (`/teste`)
* **Objetivo:** Conduzir o usuário pelas 35 perguntas sem tédio ou cansaço visual, garantindo 100% de preenchimento.

```
┌─────────────────────────────────────────────────────────────┐
│ [◀ Voltar]         Questão 14 de 35 (40%)    [Encerrar (X)] │
│ [████████████████░░░░░░░░░░░░░░░░░░░░░░░░]                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Tag da Dimensão: DEMANDAS E RITMO]                        │
│                                                             │
│  "Tenho tempo suficiente para realizar todas                │
│   as minhas tarefas"                                        │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ ( 1 ) Nunca                                           │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ ( 2 ) Raramente                                       │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ ( 3 ) Às vezes                                        │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ ( 4 ) Frequentemente                                  │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ ( 5 ) Sempre                                          │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  💡 Dica: No teclado, você pode pressionar os números de 1 a 5│
└─────────────────────────────────────────────────────────────┘
```

* **Regras de Interação:**
  * Ao clicar em uma opção Likert (ou pressionar tecla 1 a 5 no teclado), a seleção acende e o card transiciona suavemente (300ms) para a próxima questão via Framer Motion.
  * O botão `[◀ Voltar]` permite rever e alterar a resposta da pergunta anterior a qualquer momento.
  * Cada resposta é imediatamente gravada no `localStorage`.
  * Ao responder a questão 35, o botão final se torna: `[ Ver Meu Diagnóstico Completo ]`.

---

### Tela 3: Dashboard de Diagnóstico (`/resultado`)
* **Objetivo:** Entregar alto valor imediato com impacto visual sofisticado e direcionamento prático.

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo: Antes do Burnout]                  [Novo Teste (↺)]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   SEU DIAGNÓSTICO PSICOSSOCIAL INDIVIDUAL                   │
│                                                             │
│  ┌────────────────────────┐  ┌───────────────────────────┐  │
│  │     SCORE GERAL        │  │   RADAR DAS 7 DIMENSÕES   │  │
│  │                        │  │                           │  │
│  │         3.28           │  │         [ Gráfico         │  │
│  │                        │  │           de Teia         │  │
│  │   🟡 RISCO MODERADO    │  │          Recharts ]       │  │
│  │  Ponto de Atenção      │  │                           │  │
│  └────────────────────────┘  └───────────────────────────┘  │
│                                                             │
│  [ 📤 Compartilhar Diagnóstico no LinkedIn / Instagram ]    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  SUAS ÁREAS DE ATENÇÃO PRIORITÁRIA                          │
│                                                             │
│  ┌─ 🔴 DEMANDAS E RITMO (Score: 1.67) ────────────────────┐ │
│  │ Diagnóstico: Você está em sobrecarga crônica severa.   │ │
│  │ Ações Imediatas:                                       │ │
│  │ • Triagem radical de tarefas essenciais.               │ │
│  │ • Bloqueio rígido de horário de desligamento.          │ │
│  │ Roteiro de Conversa com a Chefia:                      │ │
│  │ "Tenho mapeado minhas entregas e identifiquei..."      │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─ 🟢 APOIO DOS COLEGAS (Score: 4.75) ───────────────────┐ │
│  │ Fator Protetor: Você possui um time solidário que      │ │
│  │ amortece o estresse diário.                            │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  [Card Estratégico: Levar para a Empresa]                   │
│  "Sente que seu time inteiro está sobrecarregado?           │
│   O SSTSuite avalia empresas inteiras sob a NR-01."         │
│   [ Conhecer Solução para Empresas ]                        │
└─────────────────────────────────────────────────────────────┘
```

---

### Tela 4: Modal do Card Compartilhável (Social Share)
* **Objetivo:** Gerar um card visual de alta qualidade para download e postagem no LinkedIn / Instagram.

```
┌─────────────────────────────────────────────────────────────┐
│                  Compartilhar Diagnóstico                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │ [Card 1080x1080 Canvas Preview]                     │   │
│   │                                                     │   │
│   │   Antes do Burnout • Avaliação HSE-IT               │   │
│   │                                                     │   │
│   │   Índice de Sustentabilidade: 3.28 / 5.0            │   │
│   │   Perfil: Alta Resiliência com Sobrecarga Temporal  │   │
│   │                                                     │   │
│   │   [ Mini Gráfico Radar Colorido ]                   │   │
│   │                                                     │   │
│   │   Faça sua avaliação em: antesdoburnout.com.br      │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   [ ⬇ Baixar Imagem (PNG) ]   [ 📋 Copiar Link ]            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Matriz de Estados e Tratamento de Erros

| Cenário de Erro / Borda | Comportamento da Aplicação |
|---|---|
| **Usuário recarrega a página no meio do teste** | O hook recupera o estado do `localStorage` e exibe: *"Retomamos de onde você parou (Questão X)"*. |
| **Tentativa de acessar `/resultado` sem responder** | Redireciona automaticamente para `/teste` com aviso amigável. |
| **Usuário clica em "Reiniciar Avaliação"** | Modal de confirmação: *"Tem certeza? Suas respostas atuais serão limpas."* |
| **Navegação Offline / Falha de Rede** | Como o cálculo roda 100% no cliente, o usuário conclui o teste e vê seu resultado mesmo sem sinal de internet. |

---

## 4. Disclaimer Ético, Isenção Médica e Protocolo de Crise

Dada a natureza sensível da avaliação psicossocial e o risco de estresse crônico/burnout, a aplicação inclui salvaguardas éticas e legais padronizadas:

### 4.1 Texto Canônico de Isenção Médica
> *"Esta ferramenta é um instrumento educativo e de autoavaliação psicossocial baseado na metodologia científica britânica UK HSE-IT. Seus resultados refletem a percepção do respondente sobre o seu ambiente de trabalho e **não configuram diagnóstico clínico psiquiátrico ou psicológico**, nem substituem a consulta com profissionais de saúde mental habilitados."*

### 4.2 Protocolo de Acolhimento e Crise
Em telas com pontuação crítica (especialmente na dimensão de Relacionamentos com indício de assédio ou Score Geral crítico), um card discreto e acolhedor deve exibir:
> *"Se você está vivenciando sofrimento emocional agudo, desespero ou crise, não hesite em buscar apoio imediato. O **CVV (Centro de Valorização da Vida)** oferece atendimento confidencial e gratuito pelo telefone **188** (ligação nacional 24h) ou pelo site [cvv.org.br](https://www.cvv.org.br)."*

### 4.3 Posicionamento Obrigatório na Interface
1. **Rodapé da Landing Page (`/`):** Texto resumido de isenção médica com link para os termos.
2. **Card Inicial do Questionário (`/teste`):** Aviso prévio de que a ferramenta tem caráter preventivo e educativo.
3. **Rodapé do Dashboard de Resultados (`/resultado`):** Caixa de acolhimento ético com contato do CVV 188 e lembrete de suporte profissional.

