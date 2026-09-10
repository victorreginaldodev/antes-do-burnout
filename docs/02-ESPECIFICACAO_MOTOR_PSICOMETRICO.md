# Especificação Formal do Motor Psicométrico (HSE-IT)

> **Projeto:** Antes do Burnout (Avaliação Psicossocial Individual B2C)  
> **Instrumento:** Health and Safety Executive — Indicator Tool (UK HSE)  
> **Versão da Especificação:** 1.0.0  
> **Implementação Alvo:** TypeScript puro (`src/domain/scoring-engine.ts`)  

---

## 1. Visão Geral Matemática

O motor psicométrico processa as respostas das **35 perguntas canônicas** do HSE-IT, aplicando tratamento matemático determinístico para calcular:
1. O score individual de cada uma das **7 dimensões psicossociais** (escala de 1.00 a 5.00).
2. O **Índice Geral de Bem-Estar e Sustentabilidade** (média global de 1.00 a 5.00).
3. O enquadramento em **3 faixas normativas de risco** (Verde, Âmbar e Vermelho).

### A Regra de Ouro da Pontuação HSE
$$\mathbf{5{,}00} \longrightarrow \text{Condição Ideal / Fator de Proteção / Baixo Risco}$$
$$\mathbf{1{,}00} \longrightarrow \text{Condição Crítica / Sobrecarga Severa / Alto Risco}$$

Valores mais altos **sempre** representam ambientes mais saudáveis e protegidos contra o esgotamento profissional.

---

## 2. Estrutura dos 35 Itens e Escalas Likert

O catálogo de perguntas divide-se em dois blocos psicométricos com escalas de 1 a 5:

### 2.1 Bloco 1: Escala de Frequência (Questões 01 a 22)
* `1`: Nunca
* `2`: Raramente
* `3`: Às vezes
* `4`: Frequentemente
* `5`: Sempre

### 2.2 Bloco 2: Escala de Concordância (Questões 23 a 35)
* `1`: Discordo totalmente
* `2`: Discordo
* `3`: Neutro
* `4`: Concordo
* `5`: Concordo totalmente

---

## 3. Algoritmo de Reverse Scoring (Inversão dos 8 Itens Negativos)

Exatamente **8 perguntas** foram formuladas de maneira negativa na literatura científica (avaliando a presença de estressores como assédio, prazos inalcançáveis ou conflitos).

Para preservar a Regra de Ouro, a pontuação informada pelo usuário nesses itens **deve ser invertida** antes do cálculo de qualquer média:

$$\text{Score}(x) = 6 - x$$

### Conjunto Canônico dos 8 Itens Negativos
$$\mathbf{I_{\text{rev}} = \{3, 5, 6, 10, 13, 16, 18, 21\}}$$

### Tabela de Inversão Direta:
| Resposta Informada | Significado Bruto | Score Corrigido | Interpretação no Motor |
|:---:|:---|:---:|:---|
| `5` | Sempre / Concordo totalmente | **`1.00`** | Crítico (exposição máxima ao estressor) |
| `4` | Frequentemente / Concordo | **`2.00`** | Alto desgaste |
| `3` | Às vezes / Neutro | **`3.00`** | Atenção moderada |
| `2` | Raramente / Discordo | **`4.00`** | Condição protetiva |
| `1` | Nunca / Discordo totalmente | **`5.00`** | Saudável (ausência total do estressor) |

> **Regra de Não-Inversão:** Para os demais 27 itens ($i \notin I_{\text{rev}}$), a pontuação é direta: $\text{Score}(x) = x$.

---

## 4. As 7 Dimensões do HSE-IT e Mapeamento de Itens

A tabela abaixo define a composição exata de cada dimensão e os itens pertencentes:

| Código | Nome da Dimensão | Qtd. Itens | Itens Pertencentes | Itens com Inversão ($6 - x$) |
|:---|:---|:---:|:---|:---|
| `demanda` | **Demandas** | 6 | 3, 6, 10, 14, 16, 21 | 3, 6, 10, 16, 21 |
| `controle` | **Controle e Autonomia** | 5 | 2, 9, 12, 17, 19 | *Nenhum* |
| `apoio_chefia` | **Apoio da Chefia** | 5 | 23, 24, 25, 26, 33 | *Nenhum* |
| `apoio_colegas` | **Apoio dos Colegas** | 4 | 7, 8, 15, 22 | *Nenhum* |
| `relacionamentos` | **Relacionamentos** | 4 | 5, 13, 18, 30 | 5, 13, 18 |
| `papel` | **Clareza de Papel** | 7 | 1, 4, 11, 20, 31, 34, 35 | *Nenhum* |
| `mudancas` | **Gestão de Mudanças** | 4 | 27, 28, 29, 32 | *Nenhum* |
| **TOTAL** | | **35** | | **8 itens invertidos** |

---

## 5. Fórmulas de Cálculo das Médias

Seja $R_i \in \{1, 2, 3, 4, 5\}$ a resposta informada para o item $i \in \{1, \dots, 35\}$, e seja:

$$S_i = \begin{cases} 6 - R_i, & \text{se } i \in I_{\text{rev}} \\ R_i, & \text{se } i \notin I_{\text{rev}} \end{cases}$$

### 5.1 Score de uma Dimensão $D$
$$\bar{S}_D = \frac{1}{|D|} \sum_{i \in D} S_i$$

*(Arredondado para 2 casas decimais).*

### 5.2 Índice Geral de Bem-Estar
$$\bar{S}_{\text{geral}} = \frac{1}{35} \sum_{i=1}^{35} S_i$$

*(Arredondado para 2 casas decimais).*

---

## 6. Faixas Normativas de Classificação de Risco

Cada dimensão e o score geral são classificados em três zonas de diagnóstico:

| Faixa de Pontuação | Nível de Risco | Cor Semântica | Significado Clínico / Ocupacional |
|:---:|:---:|:---:|:---|
| **$\bar{S} \ge 4{,}00$** | **BAIXO** | 🟢 Verde (`emerald-500`) | **Fator Protetor:** Condição equilibrada e sustentável. |
| **$3{,}00 \le \bar{S} < 4{,}00$** | **MODERADO** | 🟡 Âmbar (`amber-500`) | **Ponto de Atenção:** Desgaste inicial que exige ajustes preventivos. |
| **$\bar{S} < 3{,}00$** | **CRÍTICO** | 🔴 Vermelho (`rose-500`) | **Sobrecarga Aguda:** Estressor severo com risco iminente de esgotamento. |

---

## 7. Matriz de Casos de Teste Canônicos (Fixtures)

Para garantir paridade matemática na implementação em TypeScript (`scoring-engine.test.ts`), o motor deve satisfazer rigorosamente os seguintes casos de teste:

### Caso 1: Ambiente Totalmente Saudável (Cenário Protetivo)
* **Entrada:**
  * Itens normais ($i \notin I_{\text{rev}}$): Resposta = `5` (Sempre / Concordo totalmente)
  * Itens negativos ($i \in I_{\text{rev}}$): Resposta = `1` (Nunca sofri assédio, nunca tive prazos impossíveis)
* **Processamento:** Todos os 35 itens resultam em $S_i = 5.00$.
* **Saída Esperada:**
  * Todas as 7 dimensões = **`5.00`**
  * Score Geral = **`5.00`**
  * Todas as classificações = **`BAIXO` (Verde)**

### Caso 2: Respostas Máximas Teóricas (Todas as Notas = 5)
* **Entrada:** Todas as 35 respostas com valor `5`.
* **Processamento:**
  * Itens normais viram `5.00`.
  * Os 8 itens negativos viram $6 - 5 = \mathbf{1.00}$.
* **Saída Esperada:**
  * `demanda`: Itens (3, 6, 10, 16, 21 viram 1.0; 14 vira 5.0) $\rightarrow (1+1+1+5+1+1)/6 = 10/6 \approx \mathbf{1.67}$ (CRÍTICO)
  * `relacionamentos`: Itens (5, 13, 18 viram 1.0; 30 vira 5.0) $\rightarrow (1+1+1+5)/4 = 8/4 = \mathbf{2.00}$ (CRÍTICO)
  * `controle`: $(5 \times 5)/5 = \mathbf{5.00}$ (BAIXO)
  * `apoio_chefia`: $(5 \times 5)/5 = \mathbf{5.00}$ (BAIXO)
  * `apoio_colegas`: $(4 \times 5)/4 = \mathbf{5.00}$ (BAIXO)
  * `papel`: $(7 \times 5)/7 = \mathbf{5.00}$ (BAIXO)
  * `mudancas`: $(4 \times 5)/4 = \mathbf{5.00}$ (BAIXO)
  * `geral`: $(27 \times 5 + 8 \times 1)/35 = (135 + 8)/35 = 143/35 \approx \mathbf{4.09}$ (BAIXO)

### Caso 3: Validação de Erros de Payload (Fail-Fast)
* **Payload com menos de 35 respostas:** Deve lançar erro explícito (`Respostas incompletas. Faltam X itens`).
* **Nota fora da escala (ex: 0 ou 6):** Deve rejeitar com erro (`Valor fora da escala Likert (1 a 5)`).
* **Chave não numérica ou fora de 1..35:** Deve rejeitar como inválido.

---

## 8. Contrato de Interfaces TypeScript Proposto

```typescript
export type DimensionCode = 
  | 'demanda' 
  | 'controle' 
  | 'apoio_chefia' 
  | 'apoio_colegas' 
  | 'relacionamentos' 
  | 'papel' 
  | 'mudancas';

export type RiskLevel = 'BAIXO' | 'MODERADO' | 'CRITICO';

export interface DimensionScore {
  code: DimensionCode;
  name: string;
  score: number;
  risk: RiskLevel;
  itemCount: number;
}

export interface AssessmentResult {
  dimensions: Record<DimensionCode, DimensionScore>;
  dimensionsList: DimensionScore[];
  overallScore: number;
  overallRisk: RiskLevel;
  criticalDimensions: DimensionScore[];
  moderateDimensions: DimensionScore[];
  healthyDimensions: DimensionScore[];
}

export function calculateAssessment(rawAnswers: Record<number, number>): AssessmentResult;
```
