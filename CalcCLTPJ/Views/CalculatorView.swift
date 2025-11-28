//
//  CalculatorView.swift
//  CalcCLTPJ
//
//  Created by Marlow Sousa on 28/11/2025.
//

import SwiftUI

enum InputField: Hashable {
    case cltSalary
    case pjRevenue, pjTax, pjAccounting
    case cltBenefit(UUID)
    case pjExtra(UUID)
}

struct CalculatorView: View {
    @Bindable var viewModel: CalculatorViewModel
    @FocusState private var focusedField: InputField?

    @State private var showingPaywall = false
    private let storeManager = StoreManager.shared

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // CLT Section
                    InfoCard(title: "CLT") {
                        VStack(spacing: 16) {
                            CurrencyField(
                                title: "Salário Bruto",
                                value: $viewModel.cltGrossSalary,
                                focusedField: $focusedField,
                                field: .cltSalary
                            )

                            Divider()

                            // Benefits Section
                            BenefitsSectionHeader(
                                title: "Benefícios",
                                total: viewModel.cltTotalBenefits
                            )

                            ForEach(Array(viewModel.cltBenefits.enumerated()), id: \.element.id) { index, benefit in
                                let isLocked = !storeManager.isPremium && index >= FreeTierLimits.maxBenefits

                                if isLocked {
                                    LockedBenefitRow(
                                        name: benefit.name,
                                        onUnlock: { showingPaywall = true }
                                    )
                                } else {
                                    BenefitRow(
                                        benefit: $viewModel.cltBenefits[index],
                                        focusedField: $focusedField,
                                        field: .cltBenefit(benefit.id)
                                    )
                                }
                            }
                        }
                    }

                    // PJ Section
                    // MARK: - Premium Check: PJ mostra apenas campos básicos no free
                    InfoCard(title: "PJ") {
                        VStack(spacing: 16) {
                            // Campos básicos - disponíveis para todos
                            CurrencyField(
                                title: "Faturamento Mensal",
                                value: $viewModel.pjGrossRevenue,
                                focusedField: $focusedField,
                                field: .pjRevenue
                            )

                            PercentageField(
                                title: "Alíquota de Imposto",
                                value: $viewModel.pjTaxRate,
                                focusedField: $focusedField,
                                field: .pjTax
                            )

                            CurrencyField(
                                title: "Custo de Contabilidade",
                                value: $viewModel.pjAccountingCost,
                                focusedField: $focusedField,
                                field: .pjAccounting
                            )

                            // Seção de Extras - PREMIUM ONLY
                            if storeManager.isPremium {
                                Divider()

                                BenefitsSectionHeader(
                                    title: "Extras / Bônus",
                                    total: viewModel.pjTotalExtras
                                )

                                ForEach($viewModel.pjExtras) { $extra in
                                    BenefitRow(
                                        benefit: $extra,
                                        focusedField: $focusedField,
                                        field: .pjExtra(extra.id)
                                    )
                                }
                            } else {
                                // Seção bloqueada para usuários free
                                Divider()

                                LockedSectionView(
                                    title: "Extras / Bônus",
                                    description: "Adicione bônus, ajudas de custo e outros extras PJ",
                                    onUnlock: { showingPaywall = true }
                                )
                            }
                        }
                    }

                    // Quick Results Preview
                    if viewModel.cltGrossSalary > 0 || viewModel.pjGrossRevenue > 0 {
                        InfoCard(title: "Resultado Rápido") {
                            VStack(spacing: 12) {
                                if viewModel.cltGrossSalary > 0 {
                                    HStack {
                                        Text("CLT Mensal Equivalente:")
                                            .font(.subheadline)
                                            .foregroundStyle(.secondary)
                                        Spacer()
                                        Text(viewModel.cltResult.monthlyEquivalent, format: .currency(code: "BRL"))
                                            .font(.system(.body, design: .rounded))
                                            .fontWeight(.semibold)
                                            .foregroundStyle(.blue)
                                    }
                                }

                                if viewModel.pjGrossRevenue > 0 {
                                    HStack {
                                        Text("PJ Líquido:")
                                            .font(.subheadline)
                                            .foregroundStyle(.secondary)
                                        Spacer()
                                        Text(viewModel.pjResult.netMonthly, format: .currency(code: "BRL"))
                                            .font(.system(.body, design: .rounded))
                                            .fontWeight(.semibold)
                                            .foregroundStyle(.green)
                                    }
                                }
                            }
                        }
                    }
                }
                .padding()
            }
            .scrollDismissesKeyboard(.interactively)
            .background(Color(uiColor: .systemGroupedBackground))
            .navigationTitle("Calculadora")
            .navigationBarTitleDisplayMode(.large)
            .toolbar {
                ToolbarItemGroup(placement: .keyboard) {
                    Spacer()
                    Button("OK") {
                        focusedField = nil
                    }
                    .fontWeight(.semibold)
                }
            }
            .sheet(isPresented: $showingPaywall) {
                PaywallView()
            }
        }
    }
}

// MARK: - Locked Benefit Row
// Componente reutilizável para itens individuais bloqueados

struct LockedBenefitRow: View {
    let name: String
    let onUnlock: () -> Void

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: "lock.fill")
                .foregroundStyle(.secondary)
                .frame(width: 30)

            Text(name)
                .font(.subheadline)
                .foregroundStyle(.secondary)

            Spacer()

            Button {
                onUnlock()
            } label: {
                HStack(spacing: 4) {
                    Image(systemName: "crown.fill")
                        .font(.caption2)
                    Text("Premium")
                        .font(.caption)
                        .fontWeight(.medium)
                }
                .padding(.horizontal, 10)
                .padding(.vertical, 6)
                .background(.yellow.opacity(0.2))
                .foregroundStyle(.orange)
                .clipShape(Capsule())
            }
            .buttonStyle(.plain)
        }
        .padding(.vertical, 4)
    }
}

// MARK: - Locked Section View
// Componente reutilizável para seções inteiras bloqueadas (usado em PJ Extras, Análise, etc.)

struct LockedSectionView: View {
    let title: String
    let description: String
    let onUnlock: () -> Void

    var body: some View {
        VStack(spacing: 12) {
            HStack {
                Text(title)
                    .font(.subheadline)
                    .fontWeight(.semibold)
                    .foregroundStyle(.secondary)

                Spacer()

                Image(systemName: "lock.fill")
                    .foregroundStyle(.secondary)
            }

            VStack(spacing: 16) {
                Image(systemName: "crown.fill")
                    .font(.title)
                    .foregroundStyle(.yellow)

                Text(description)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)

                Button {
                    onUnlock()
                } label: {
                    Text("Desbloquear Premium")
                        .font(.subheadline)
                        .fontWeight(.semibold)
                        .foregroundStyle(.white)
                        .padding(.horizontal, 20)
                        .padding(.vertical, 10)
                        .background(.orange.gradient)
                        .clipShape(Capsule())
                }
                .buttonStyle(.plain)
            }
            .frame(maxWidth: .infinity)
            .padding()
            .background(Color.yellow.opacity(0.05))
            .clipShape(RoundedRectangle(cornerRadius: 12))
        }
    }
}

// MARK: - Benefits Section Header

struct BenefitsSectionHeader: View {
    let title: String
    let total: Double

    private let currencyFormatter: NumberFormatter = {
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        formatter.locale = Locale(identifier: "pt_BR")
        formatter.maximumFractionDigits = 0
        return formatter
    }()

    var body: some View {
        HStack {
            Text(title)
                .font(.subheadline)
                .fontWeight(.semibold)
                .foregroundStyle(.secondary)

            Spacer()

            if total > 0 {
                Text("Total: \(currencyFormatter.string(from: NSNumber(value: total)) ?? "R$ 0")")
                    .font(.caption)
                    .fontWeight(.medium)
                    .foregroundStyle(.green)
            }
        }
    }
}

// MARK: - Benefit Row

struct BenefitRow<F: Hashable>: View {
    @Binding var benefit: Benefit
    var focusedField: FocusState<F?>.Binding
    let field: F

    @State private var textValue: String = ""

    private let formatter: NumberFormatter = {
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        formatter.locale = Locale(identifier: "pt_BR")
        formatter.maximumFractionDigits = 2
        formatter.minimumFractionDigits = 2
        return formatter
    }()

    var body: some View {
        HStack(spacing: 12) {
            Toggle("", isOn: $benefit.isEnabled)
                .labelsHidden()
                .tint(.green)

            VStack(alignment: .leading, spacing: 2) {
                Text(benefit.name)
                    .font(.subheadline)
                    .foregroundStyle(benefit.isEnabled ? .primary : .secondary)
            }
            .frame(maxWidth: .infinity, alignment: .leading)

            TextField("R$ 0,00", text: $textValue)
                .keyboardType(.decimalPad)
                .textFieldStyle(.roundedBorder)
                .font(.system(.body, design: .rounded))
                .frame(width: 120)
                .focused(focusedField, equals: field)
                .disabled(!benefit.isEnabled)
                .opacity(benefit.isEnabled ? 1 : 0.5)
                .onChange(of: textValue) { _, newValue in
                    updateValue(from: newValue)
                }
                .onAppear {
                    if benefit.value > 0 {
                        textValue = formatCurrency(benefit.value)
                    }
                }
        }
    }

    private func updateValue(from text: String) {
        let digits = text.filter { $0.isNumber }
        guard !digits.isEmpty else {
            benefit.value = 0
            textValue = ""
            return
        }
        if let number = Double(digits) {
            benefit.value = number / 100.0
            textValue = formatCurrency(benefit.value)
        }
    }

    private func formatCurrency(_ amount: Double) -> String {
        formatter.string(from: NSNumber(value: amount)) ?? "R$ 0,00"
    }
}

#Preview {
    CalculatorView(viewModel: CalculatorViewModel())
}
