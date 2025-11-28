//
//  AnalysisView.swift
//  CalcCLTPJ
//
//  Created by Marlow Sousa on 28/11/2025.
//

import SwiftUI
import SwiftData
import Charts

struct AnalysisView: View {
    @Environment(\.modelContext) private var modelContext
    @Query private var proposals: [Proposal]
    @Bindable var viewModel: CalculatorViewModel

    @State private var showingSaveSheet = false
    @State private var companyName = ""
    @State private var showingSavedAlert = false
    @State private var showingPaywall = false

    private let storeManager = StoreManager.shared

    // MARK: - Premium Check Helpers

    private var canSave: Bool {
        viewModel.cltGrossSalary > 0 && viewModel.pjGrossRevenue > 0
    }

    /// Verifica se o usuário atingiu o limite de propostas (apenas para free)
    private var hasReachedProposalLimit: Bool {
        !storeManager.isPremium && proposals.count >= FreeTierLimits.maxProposals
    }

    /// Indica se o usuário é premium (centraliza verificação)
    private var isPremium: Bool {
        storeManager.isPremium
    }

    var body: some View {
        // MARK: - Layout Fix: Usa NavigationStack simples para evitar split view no iPad
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // MARK: - Resultado Final (Disponível para TODOS)
                    // Usuários free veem apenas esta seção

                    if viewModel.cltGrossSalary > 0 && viewModel.pjGrossRevenue > 0 {
                        // Verdict Card - Disponível para todos
                        GradientVerdictCard(
                            isPJBetter: viewModel.isPJBetter,
                            difference: viewModel.comparisonDifference,
                            message: viewModel.verdictMessage
                        )

                        // Resumo simples dos valores finais - Disponível para todos
                        InfoCard(title: "Resultado") {
                            VStack(spacing: 16) {
                                HStack {
                                    VStack(alignment: .leading, spacing: 4) {
                                        Text("CLT Mensal Equiv.")
                                            .font(.caption)
                                            .foregroundStyle(.secondary)
                                        Text(viewModel.cltResult.monthlyEquivalent, format: .currency(code: "BRL"))
                                            .font(.title3)
                                            .fontWeight(.bold)
                                            .foregroundStyle(.blue)
                                    }

                                    Spacer()

                                    VStack(alignment: .trailing, spacing: 4) {
                                        Text("PJ Líquido")
                                            .font(.caption)
                                            .foregroundStyle(.secondary)
                                        Text(viewModel.pjResult.netMonthly, format: .currency(code: "BRL"))
                                            .font(.title3)
                                            .fontWeight(.bold)
                                            .foregroundStyle(.green)
                                    }
                                }
                            }
                        }
                    } else if viewModel.cltGrossSalary > 0 || viewModel.pjGrossRevenue > 0 {
                        // Mostra apenas o valor preenchido
                        InfoCard(title: "Resultado Parcial") {
                            VStack(spacing: 12) {
                                if viewModel.cltGrossSalary > 0 {
                                    HStack {
                                        Text("CLT Mensal Equivalente:")
                                            .font(.subheadline)
                                            .foregroundStyle(.secondary)
                                        Spacer()
                                        Text(viewModel.cltResult.monthlyEquivalent, format: .currency(code: "BRL"))
                                            .font(.headline)
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
                                            .font(.headline)
                                            .foregroundStyle(.green)
                                    }
                                }

                                Text("Preencha ambos os valores para ver a comparação completa")
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                                    .multilineTextAlignment(.center)
                                    .padding(.top, 8)
                            }
                        }
                    } else {
                        // Nenhum valor preenchido
                        ContentUnavailableView(
                            "Sem Dados",
                            systemImage: "chart.bar.xaxis",
                            description: Text("Preencha os valores na aba Calculadora para ver a análise.")
                        )
                    }

                    // MARK: - Conteúdo Premium (Gráficos e Detalhamentos)

                    if viewModel.cltGrossSalary > 0 || viewModel.pjGrossRevenue > 0 {
                        if isPremium {
                            // PREMIUM: Mostra gráfico e detalhamentos completos
                            premiumAnalysisContent
                        } else {
                            // FREE: Mostra preview bloqueado
                            lockedAnalysisContent
                        }
                    }
                }
                .padding()
            }
            .background(Color(uiColor: .systemGroupedBackground))
            .navigationTitle("Análise")
            .navigationBarTitleDisplayMode(.large)
            .toolbar {
                ToolbarItem(placement: .primaryAction) {
                    Button {
                        if hasReachedProposalLimit {
                            showingPaywall = true
                        } else {
                            companyName = ""
                            showingSaveSheet = true
                        }
                    } label: {
                        HStack(spacing: 4) {
                            Image(systemName: "square.and.arrow.down.fill")
                            if hasReachedProposalLimit {
                                Image(systemName: "crown.fill")
                                    .font(.caption2)
                                    .foregroundStyle(.yellow)
                            }
                        }
                    }
                    .disabled(!canSave)
                }
            }
            .sheet(isPresented: $showingSaveSheet) {
                SaveProposalSheet(
                    companyName: $companyName,
                    onSave: saveProposal
                )
                .presentationDetents([.height(220)])
            }
            .alert("Proposta Salva!", isPresented: $showingSavedAlert) {
                Button("OK") { }
            } message: {
                Text("\(companyName) foi salva com sucesso.")
            }
            .sheet(isPresented: $showingPaywall) {
                PaywallView()
            }
        }
    }

    // MARK: - Premium Analysis Content

    @ViewBuilder
    private var premiumAnalysisContent: some View {
        // Gráfico de comparação
        if viewModel.cltGrossSalary > 0 && viewModel.pjGrossRevenue > 0 {
            InfoCard(title: "Comparação Mensal") {
                Chart {
                    BarMark(
                        x: .value("Valor", viewModel.cltResult.monthlyEquivalent),
                        y: .value("Tipo", "CLT Equivalente")
                    )
                    .foregroundStyle(.blue.gradient)
                    .annotation(position: .trailing, alignment: .leading) {
                        Text(viewModel.cltResult.monthlyEquivalent, format: .currency(code: "BRL"))
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }

                    BarMark(
                        x: .value("Valor", viewModel.pjResult.netMonthly),
                        y: .value("Tipo", "PJ Líquido")
                    )
                    .foregroundStyle(.green.gradient)
                    .annotation(position: .trailing, alignment: .leading) {
                        Text(viewModel.pjResult.netMonthly, format: .currency(code: "BRL"))
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                }
                .frame(height: 150)
                .chartXAxis(.hidden)
            }
        }

        // Detalhes CLT
        if viewModel.cltGrossSalary > 0 {
            InfoCard(title: "Detalhes CLT") {
                VStack(spacing: 12) {
                    DetailRow(label: "Salário Bruto", value: viewModel.cltResult.grossSalary)
                    DetailRow(label: "INSS", value: -viewModel.cltResult.inss, color: .red)
                    DetailRow(label: "IRRF", value: -viewModel.cltResult.irrf, color: .red)

                    Divider()

                    DetailRow(label: "Líquido Mensal", value: viewModel.cltResult.netMonthlySalary, isBold: true)
                    DetailRow(label: "13º Salário", value: viewModel.cltResult.thirteenthSalaryNet)
                    DetailRow(label: "1/3 Férias", value: viewModel.cltResult.vacationBonusNet)
                    DetailRow(label: "FGTS Mensal", value: viewModel.cltResult.fgtsMonthly, color: .green)

                    if !viewModel.cltActiveBenefits.isEmpty {
                        Divider()

                        ForEach(viewModel.cltActiveBenefits) { benefit in
                            DetailRow(label: benefit.name, value: benefit.value, color: .green)
                        }
                    }

                    if viewModel.cltTotalBenefits > 0 {
                        DetailRow(label: "Total Benefícios", value: viewModel.cltTotalBenefits, color: .green, isBold: true)
                    }

                    Divider()

                    DetailRow(label: "Total Anual", value: viewModel.cltResult.annualTotal, color: .blue, isBold: true)
                    DetailRow(label: "Mensal Equivalente", value: viewModel.cltResult.monthlyEquivalent, color: .blue, isBold: true)
                }
            }
        }

        // Detalhes PJ
        if viewModel.pjGrossRevenue > 0 {
            InfoCard(title: "Detalhes PJ") {
                VStack(spacing: 12) {
                    DetailRow(label: "Faturamento Bruto", value: viewModel.pjResult.grossRevenue)
                    DetailRow(label: "Impostos (\(String(format: "%.1f", viewModel.pjResult.taxRate))%)", value: -viewModel.pjResult.taxAmount, color: .red)
                    DetailRow(label: "Contabilidade", value: -viewModel.pjResult.accountingCost, color: .red)

                    if !viewModel.pjActiveExtras.isEmpty {
                        Divider()

                        ForEach(viewModel.pjActiveExtras) { extra in
                            DetailRow(label: extra.name, value: extra.value, color: .green)
                        }

                        DetailRow(label: "Total Extras", value: viewModel.pjTotalExtras, color: .green, isBold: true)
                    }

                    Divider()

                    DetailRow(label: "Líquido Mensal", value: viewModel.pjResult.netMonthly, color: .green, isBold: true)
                    DetailRow(label: "Líquido Anual", value: viewModel.pjResult.netMonthly * 12, color: .green, isBold: true)
                }
            }
        }
    }

    // MARK: - Locked Analysis Content (Free Users)

    @ViewBuilder
    private var lockedAnalysisContent: some View {
        InfoCard(title: "Análise Detalhada") {
            VStack(spacing: 16) {
                Image(systemName: "chart.bar.doc.horizontal.fill")
                    .font(.system(size: 40))
                    .foregroundStyle(.secondary)

                Text("Desbloqueie a Análise Completa")
                    .font(.headline)

                VStack(alignment: .leading, spacing: 8) {
                    LockedFeatureRow(text: "Gráfico comparativo interativo")
                    LockedFeatureRow(text: "Detalhamento completo CLT")
                    LockedFeatureRow(text: "Detalhamento completo PJ")
                    LockedFeatureRow(text: "Breakdown de impostos e benefícios")
                    LockedFeatureRow(text: "Valores anualizados")
                }
                .padding(.vertical, 8)

                Button {
                    showingPaywall = true
                } label: {
                    HStack {
                        Image(systemName: "crown.fill")
                        Text("Desbloquear Premium")
                    }
                    .font(.headline)
                    .foregroundStyle(.white)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(.orange.gradient)
                    .clipShape(RoundedRectangle(cornerRadius: 12))
                }
                .buttonStyle(.plain)
            }
            .padding(.vertical, 8)
        }
    }

    private func saveProposal() {
        let proposal = Proposal(
            companyName: companyName,
            cltGrossSalary: viewModel.cltGrossSalary,
            cltBenefits: viewModel.cltBenefits,
            pjGrossRevenue: viewModel.pjGrossRevenue,
            pjTaxRate: viewModel.pjTaxRate,
            pjAccountingCost: viewModel.pjAccountingCost,
            pjExtras: viewModel.pjExtras,
            cltMonthlyEquivalent: viewModel.cltResult.monthlyEquivalent,
            pjNetMonthly: viewModel.pjResult.netMonthly
        )
        modelContext.insert(proposal)

        do {
            try modelContext.save()
            showingSavedAlert = true
        } catch {
            print("Erro ao salvar proposta: \(error)")
        }
    }
}

// MARK: - Locked Feature Row

struct LockedFeatureRow: View {
    let text: String

    var body: some View {
        HStack(spacing: 8) {
            Image(systemName: "lock.fill")
                .font(.caption)
                .foregroundStyle(.orange)
            Text(text)
                .font(.subheadline)
                .foregroundStyle(.secondary)
        }
    }
}

// MARK: - Save Proposal Sheet

struct SaveProposalSheet: View {
    @Environment(\.dismiss) private var dismiss
    @Binding var companyName: String
    let onSave: () -> Void
    @FocusState private var isFocused: Bool

    var body: some View {
        NavigationStack {
            Form {
                Section {
                    TextField("Nome da Empresa", text: $companyName)
                        .focused($isFocused)
                } footer: {
                    Text("Ex: Google, Nubank, iFood...")
                }
            }
            .navigationTitle("Salvar Proposta")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancelar") {
                        dismiss()
                    }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Salvar") {
                        onSave()
                        dismiss()
                    }
                    .disabled(companyName.trimmingCharacters(in: .whitespaces).isEmpty)
                    .fontWeight(.semibold)
                }
            }
            .onAppear {
                isFocused = true
            }
        }
    }
}

// MARK: - Detail Row Component

struct DetailRow: View {
    let label: String
    let value: Double
    var color: Color = .primary
    var isBold: Bool = false

    private var formattedValue: String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        formatter.locale = Locale(identifier: "pt_BR")
        formatter.maximumFractionDigits = 2
        formatter.minimumFractionDigits = 2

        return formatter.string(from: NSNumber(value: abs(value))) ?? "R$ 0,00"
    }

    var body: some View {
        HStack {
            Text(label)
                .font(isBold ? .body.weight(.semibold) : .body)
                .foregroundStyle(.secondary)

            Spacer()

            Text(value < 0 ? "- \(formattedValue)" : formattedValue)
                .font(.system(.body, design: .rounded, weight: isBold ? .bold : .regular))
                .foregroundStyle(color)
        }
    }
}

#Preview {
    let vm = CalculatorViewModel()
    vm.cltGrossSalary = 5000
    vm.pjGrossRevenue = 10000
    return AnalysisView(viewModel: vm)
        .modelContainer(for: Proposal.self, inMemory: true)
}
