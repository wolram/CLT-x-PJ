//
//  Models.swift
//  CalcCLTPJ
//
//  Created by Antigravity on 28/11/2025.
//

import Foundation
import SwiftData

// MARK: - Benefit Model

struct Benefit: Identifiable, Codable, Equatable {
    var id: UUID
    var name: String
    var value: Double
    var isEnabled: Bool

    init(id: UUID = UUID(), name: String, value: Double = 0, isEnabled: Bool = true) {
        self.id = id
        self.name = name
        self.value = value
        self.isEnabled = isEnabled
    }

    var activeValue: Double {
        isEnabled ? value : 0
    }
}

// MARK: - Default Benefits Templates

enum BenefitTemplates {
    static let cltDefaults: [Benefit] = [
        Benefit(name: "Vale Refeição (VR)"),
        Benefit(name: "Vale Alimentação (VA)"),
        Benefit(name: "Vale Transporte (VT)"),
        Benefit(name: "Plano de Saúde"),
        Benefit(name: "Plano Odontológico"),
        Benefit(name: "Seguro de Vida"),
        Benefit(name: "Auxílio Creche"),
        Benefit(name: "Auxílio Educação"),
        Benefit(name: "Auxílio Idiomas"),
        Benefit(name: "Gympass / Academia"),
        Benefit(name: "PLR / Bônus Anual"),
        Benefit(name: "Previdência Privada"),
        Benefit(name: "Auxílio Home Office"),
        Benefit(name: "Outros")
    ]

    static let pjExtras: [Benefit] = [
        Benefit(name: "Bônus por Projeto"),
        Benefit(name: "Bônus Anual"),
        Benefit(name: "Ajuda de Custo"),
        Benefit(name: "Reembolso Equipamentos"),
        Benefit(name: "Auxílio Coworking"),
        Benefit(name: "Outros Extras")
    ]
}

// MARK: - Proposal Model (SwiftData)

@Model
final class Proposal {
    var id: UUID
    var companyName: String
    var createdAt: Date

    // CLT Values
    var cltGrossSalary: Double
    var cltBenefitsData: Data // Encoded [Benefit]
    var cltTotalBenefits: Double

    // PJ Values
    var pjGrossRevenue: Double
    var pjTaxRate: Double
    var pjAccountingCost: Double
    var pjExtrasData: Data // Encoded [Benefit]
    var pjTotalExtras: Double

    // Calculated Results (cached)
    var cltMonthlyEquivalent: Double
    var pjNetMonthly: Double

    var isPJBetter: Bool {
        pjNetMonthly > cltMonthlyEquivalent
    }

    var difference: Double {
        abs(pjNetMonthly - cltMonthlyEquivalent)
    }

    // Decode benefits
    var cltBenefits: [Benefit] {
        (try? JSONDecoder().decode([Benefit].self, from: cltBenefitsData)) ?? []
    }

    var pjExtras: [Benefit] {
        (try? JSONDecoder().decode([Benefit].self, from: pjExtrasData)) ?? []
    }

    init(
        companyName: String,
        cltGrossSalary: Double,
        cltBenefits: [Benefit],
        pjGrossRevenue: Double,
        pjTaxRate: Double,
        pjAccountingCost: Double,
        pjExtras: [Benefit],
        cltMonthlyEquivalent: Double,
        pjNetMonthly: Double
    ) {
        self.id = UUID()
        self.companyName = companyName
        self.createdAt = Date()
        self.cltGrossSalary = cltGrossSalary
        self.cltBenefitsData = (try? JSONEncoder().encode(cltBenefits)) ?? Data()
        self.cltTotalBenefits = cltBenefits.reduce(0) { $0 + $1.activeValue }
        self.pjGrossRevenue = pjGrossRevenue
        self.pjTaxRate = pjTaxRate
        self.pjAccountingCost = pjAccountingCost
        self.pjExtrasData = (try? JSONEncoder().encode(pjExtras)) ?? Data()
        self.pjTotalExtras = pjExtras.reduce(0) { $0 + $1.activeValue }
        self.cltMonthlyEquivalent = cltMonthlyEquivalent
        self.pjNetMonthly = pjNetMonthly
    }
}

// MARK: - Tax Calculator (Brazilian 2024/2025 Tables)

struct TaxCalculator {
    
    /// Calcula INSS (Progressivo) - Tabela 2024/2025
    static func calculateINSS(grossSalary: Double) -> Double {
        var inss: Double = 0.0
        
        let brackets: [(limit: Double, rate: Double, previousLimit: Double)] = [
            (1412.00, 0.075, 0.0),
            (2666.68, 0.09, 1412.00),
            (4000.03, 0.12, 2666.68),
            (7786.02, 0.14, 4000.03)
        ]
        
        for bracket in brackets {
            if grossSalary > bracket.previousLimit {
                let taxableAmount = min(grossSalary, bracket.limit) - bracket.previousLimit
                inss += taxableAmount * bracket.rate
            }
        }
        
        return inss
    }
    
    /// Calcula IRRF (Imposto de Renda) - Tabela Simplificada 2024/2025
    static func calculateIRRF(grossSalary: Double, inssDeduction: Double) -> Double {
        let taxableBase = grossSalary - inssDeduction
        
        if taxableBase <= 2259.20 {
            return 0.0
        } else if taxableBase <= 2826.65 {
            return taxableBase * 0.075 - 169.44
        } else if taxableBase <= 3751.05 {
            return taxableBase * 0.15 - 381.44
        } else if taxableBase <= 4664.68 {
            return taxableBase * 0.225 - 662.77
        } else {
            return taxableBase * 0.275 - 896.00
        }
    }
}

// MARK: - Calculation Results

struct CLTCalculation {
    let grossSalary: Double
    let inss: Double
    let irrf: Double
    let netMonthlySalary: Double

    let thirteenthSalaryNet: Double
    let vacationBonusNet: Double
    let fgtsMonthly: Double

    let benefits: [Benefit]
    let totalBenefits: Double

    let annualTotal: Double
    let monthlyEquivalent: Double

    // Benefícios ativos para exibição
    var activeBenefits: [Benefit] {
        benefits.filter { $0.isEnabled && $0.value > 0 }
    }
}

struct PJCalculation {
    let grossRevenue: Double
    let taxRate: Double
    let accountingCost: Double

    let taxAmount: Double
    let extras: [Benefit]
    let totalExtras: Double

    let netMonthly: Double

    // Extras ativos para exibição
    var activeExtras: [Benefit] {
        extras.filter { $0.isEnabled && $0.value > 0 }
    }
}

// MARK: - Calculator Logic

struct CalculatorLogic {

    /// Calcula CLT Anualizado (Comparação justa considerando todos os benefícios)
    static func calculateCLT(
        grossSalary: Double,
        benefits: [Benefit]
    ) -> CLTCalculation {

        // 1. Salário Mensal Líquido
        let inss = TaxCalculator.calculateINSS(grossSalary: grossSalary)
        let irrf = TaxCalculator.calculateIRRF(grossSalary: grossSalary, inssDeduction: inss)
        let netMonthlySalary = grossSalary - inss - irrf

        // 2. 13º Salário (mesmo cálculo do mensal)
        let thirteenthSalaryNet = netMonthlySalary

        // 3. 1/3 Férias Líquido
        let vacationBase = grossSalary / 3.0
        let vacationINSS = TaxCalculator.calculateINSS(grossSalary: vacationBase)
        let vacationIRRF = TaxCalculator.calculateIRRF(grossSalary: vacationBase, inssDeduction: vacationINSS)
        let vacationBonusNet = vacationBase - vacationINSS - vacationIRRF

        // 4. FGTS Mensal (8% sobre bruto)
        let fgtsMonthly = grossSalary * 0.08

        // 5. Benefícios Totais (soma dos ativos)
        let totalBenefits = benefits.reduce(0.0) { $0 + $1.activeValue }

        // 6. Total Anual
        let annualTotal = (netMonthlySalary * 12) + thirteenthSalaryNet + vacationBonusNet + (fgtsMonthly * 12) + (totalBenefits * 12)

        // 7. Mensal Equivalente (Dividir por 12)
        let monthlyEquivalent = annualTotal / 12.0

        return CLTCalculation(
            grossSalary: grossSalary,
            inss: inss,
            irrf: irrf,
            netMonthlySalary: netMonthlySalary,
            thirteenthSalaryNet: thirteenthSalaryNet,
            vacationBonusNet: vacationBonusNet,
            fgtsMonthly: fgtsMonthly,
            benefits: benefits,
            totalBenefits: totalBenefits,
            annualTotal: annualTotal,
            monthlyEquivalent: monthlyEquivalent
        )
    }

    /// Calcula PJ
    static func calculatePJ(
        grossRevenue: Double,
        taxRate: Double,
        accountingCost: Double,
        extras: [Benefit]
    ) -> PJCalculation {

        let taxAmount = grossRevenue * (taxRate / 100.0)
        let totalExtras = extras.reduce(0.0) { $0 + $1.activeValue }
        let netMonthly = grossRevenue - taxAmount - accountingCost + totalExtras

        return PJCalculation(
            grossRevenue: grossRevenue,
            taxRate: taxRate,
            accountingCost: accountingCost,
            taxAmount: taxAmount,
            extras: extras,
            totalExtras: totalExtras,
            netMonthly: netMonthly
        )
    }
}
