//
//  ViewModels.swift
//  CalcCLTPJ
//
//  Created by Antigravity on 28/11/2025.
//

import Foundation

@Observable
class CalculatorViewModel {

    // MARK: - CLT Inputs
    var cltGrossSalary: Double = 0.0
    var cltBenefits: [Benefit] = BenefitTemplates.cltDefaults

    // MARK: - PJ Inputs
    var pjGrossRevenue: Double = 0.0
    var pjTaxRate: Double = 6.0 // Default 6% (Simples Nacional)
    var pjAccountingCost: Double = 250.0 // Default R$ 250
    var pjExtras: [Benefit] = BenefitTemplates.pjExtras

    // MARK: - Settings
    var defaultAccountingCost: Double = 250.0

    // MARK: - Computed Results

    var cltResult: CLTCalculation {
        CalculatorLogic.calculateCLT(
            grossSalary: cltGrossSalary,
            benefits: cltBenefits
        )
    }

    var pjResult: PJCalculation {
        CalculatorLogic.calculatePJ(
            grossRevenue: pjGrossRevenue,
            taxRate: pjTaxRate,
            accountingCost: pjAccountingCost,
            extras: pjExtras
        )
    }

    var comparisonDifference: Double {
        pjResult.netMonthly - cltResult.monthlyEquivalent
    }

    var isPJBetter: Bool {
        comparisonDifference > 0
    }

    var verdictMessage: String {
        if comparisonDifference > 0 {
            return "PJ é mais vantajoso!"
        } else if comparisonDifference < 0 {
            return "CLT é mais vantajoso!"
        } else {
            return "Empate técnico"
        }
    }

    // MARK: - CLT Benefits

    var cltTotalBenefits: Double {
        cltBenefits.reduce(0.0) { $0 + $1.activeValue }
    }

    var cltActiveBenefits: [Benefit] {
        cltBenefits.filter { $0.isEnabled && $0.value > 0 }
    }

    func addCLTBenefit(name: String) {
        cltBenefits.append(Benefit(name: name))
    }

    func removeCLTBenefit(at index: Int) {
        guard cltBenefits.indices.contains(index) else { return }
        cltBenefits.remove(at: index)
    }

    // MARK: - PJ Extras

    var pjTotalExtras: Double {
        pjExtras.reduce(0.0) { $0 + $1.activeValue }
    }

    var pjActiveExtras: [Benefit] {
        pjExtras.filter { $0.isEnabled && $0.value > 0 }
    }

    func addPJExtra(name: String) {
        pjExtras.append(Benefit(name: name))
    }

    func removePJExtra(at index: Int) {
        guard pjExtras.indices.contains(index) else { return }
        pjExtras.remove(at: index)
    }

    // MARK: - Actions

    func applyDefaultAccountingCost() {
        pjAccountingCost = defaultAccountingCost
    }

    func resetCLTBenefits() {
        cltBenefits = BenefitTemplates.cltDefaults
    }

    func resetPJExtras() {
        pjExtras = BenefitTemplates.pjExtras
    }

    func clearAll() {
        cltGrossSalary = 0
        cltBenefits = BenefitTemplates.cltDefaults
        pjGrossRevenue = 0
        pjTaxRate = 6.0
        pjAccountingCost = defaultAccountingCost
        pjExtras = BenefitTemplates.pjExtras
    }
}
