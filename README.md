# CalcCLTPJ - Calculadora CLT vs PJ

A calculadora CLT vs PJ **mais completa do mercado** para iOS. Compare propostas de trabalho considerando todos os benefícios e extras de forma justa e precisa.

## Funcionalidades

### Calculadora Completa
- **CLT**: Salário, INSS, IRRF, 13º, férias, FGTS + benefícios personalizáveis
- **PJ**: Faturamento, impostos, contabilidade + extras e bônus
- **Comparação Anualizada**: CLT anualizado ÷ 12 para comparação justa

### Benefícios Personalizáveis (CLT)
- Vale Refeição / Alimentação
- Vale Transporte
- Plano de Saúde / Odontológico
- Seguro de Vida
- Auxílio Creche / Educação / Idiomas
- Gympass / Academia
- PLR / Bônus Anual
- Previdência Privada
- Auxílio Home Office
- **Adicione seus próprios benefícios!**

### Extras PJ
- Bônus por Projeto / Anual
- Ajuda de Custo
- Reembolso de Equipamentos
- Auxílio Coworking
- **Adicione seus próprios extras!**

### Histórico de Propostas
- Salve propostas com nome da empresa
- Compare múltiplas ofertas
- Carregue propostas salvas para edição

## Requisitos

- iOS 17.0+
- Xcode 15.0+
- Swift 6.0

## Arquitetura

```
CalcCLTPJ/
├── Models.swift              # Modelos: Benefit, Proposal, Tax Calculator
├── ViewModels.swift          # Estado da aplicação (@Observable)
├── Components.swift          # Componentes UI reutilizáveis
├── Views/
│   ├── CalculatorView.swift  # Tela de entrada com benefícios
│   ├── AnalysisView.swift    # Análise detalhada + gráficos
│   ├── ProposalsView.swift   # Histórico de propostas
│   └── SettingsView.swift    # Configurações e gestão de benefícios
├── ContentView.swift         # TabView principal
└── CalcCLTPJApp.swift        # Entry point + SwiftData
```

## Tecnologias

- **SwiftUI** com iOS 17+ APIs
- **SwiftData** para persistência
- **Swift Charts** para visualização
- **@Observable** macro para estado
- **MVVM** architecture

## Como Usar

### 1. Abrir no Xcode

```bash
cd /Users/marlow/Documents/CalcCLTPJ
open CalcCLTPJ.xcodeproj
```

### 2. Build & Run

- Selecione um simulador iOS 17+
- Pressione `Cmd + R`

## Método de Cálculo

### CLT (Anualizado)
1. **Salário Líquido** = Bruto - INSS (progressivo) - IRRF (progressivo)
2. **13º Salário** = 1 salário líquido adicional
3. **1/3 Férias** = Salário ÷ 3 (com descontos)
4. **FGTS** = 8% × Bruto × 12 meses
5. **Benefícios** = Soma dos benefícios ativos × 12
6. **Total Anual ÷ 12** = Equivalente Mensal

### PJ
- **Líquido** = Faturamento - Impostos - Contabilidade + Extras

### Tabelas Fiscais 2024/2025

**INSS (Progressivo)**
| Faixa | Alíquota |
|-------|----------|
| Até R$ 1.412,00 | 7,5% |
| R$ 1.412,01 - R$ 2.666,68 | 9% |
| R$ 2.666,69 - R$ 4.000,03 | 12% |
| R$ 4.000,04 - R$ 7.786,02 | 14% |

**IRRF (Progressivo)**
| Base de Cálculo | Alíquota | Dedução |
|-----------------|----------|---------|
| Até R$ 2.259,20 | Isento | - |
| R$ 2.259,21 - R$ 2.826,65 | 7,5% | R$ 169,44 |
| R$ 2.826,66 - R$ 3.751,05 | 15% | R$ 381,44 |
| R$ 3.751,06 - R$ 4.664,68 | 22,5% | R$ 662,77 |
| Acima de R$ 4.664,68 | 27,5% | R$ 896,00 |

## Licença

Projeto educacional para comparação de propostas de trabalho CLT vs PJ no Brasil.
