//
//  SettingsView.swift
//  CalcCLTPJ
//
//  Created by Marlow Sousa on 28/11/2025.
//

import SwiftUI

private enum SettingsField: Hashable {
    case accountingCost
    case newBenefitName
}

struct SettingsView: View {
    @Bindable var viewModel: CalculatorViewModel
    @FocusState private var focusedField: SettingsField?

    @State private var showingAddCLTBenefit = false
    @State private var showingAddPJExtra = false
    @State private var newBenefitName = ""
    @State private var showingResetAlert = false
    @State private var showingPaywall = false

    private let storeManager = StoreManager.shared

    var body: some View {
        NavigationStack {
            Form {
                // Default Settings
                Section {
                    CurrencyField(
                        title: "Custo Padrão de Contabilidade PJ",
                        value: $viewModel.defaultAccountingCost,
                        focusedField: $focusedField,
                        field: .accountingCost
                    )

                    Button("Aplicar aos Cálculos") {
                        viewModel.applyDefaultAccountingCost()
                    }
                    .frame(maxWidth: .infinity)
                } header: {
                    Text("Configurações Padrão")
                }

                // CLT Benefits Management
                // MARK: - Premium Check: Adicionar benefícios é exclusivo Premium
                Section {
                    ForEach(viewModel.cltBenefits) { benefit in
                        HStack {
                            Text(benefit.name)
                            Spacer()
                            if benefit.value > 0 {
                                Text(benefit.value, format: .currency(code: "BRL"))
                                    .foregroundStyle(.secondary)
                                    .font(.caption)
                            }
                        }
                    }
                    .onDelete { indexSet in
                        // Apenas premium pode remover/editar
                        if storeManager.isPremium {
                            for index in indexSet {
                                viewModel.removeCLTBenefit(at: index)
                            }
                        }
                    }
                    .deleteDisabled(!storeManager.isPremium)

                    // Botão de adicionar - mostra paywall para free
                    Button {
                        if storeManager.isPremium {
                            newBenefitName = ""
                            showingAddCLTBenefit = true
                        } else {
                            showingPaywall = true
                        }
                    } label: {
                        HStack {
                            Label("Adicionar Benefício", systemImage: "plus.circle.fill")
                            if !storeManager.isPremium {
                                Spacer()
                                Image(systemName: "crown.fill")
                                    .font(.caption)
                                    .foregroundStyle(.yellow)
                            }
                        }
                    }

                    Button("Restaurar Padrões") {
                        viewModel.resetCLTBenefits()
                    }
                    .foregroundStyle(.orange)
                } header: {
                    Text("Benefícios CLT")
                } footer: {
                    if storeManager.isPremium {
                        Text("Deslize para a esquerda para remover benefícios personalizados.")
                    } else {
                        Text("Desbloqueie o Premium para adicionar benefícios personalizados.")
                    }
                }

                // PJ Extras Management
                // MARK: - Premium Check: Adicionar extras PJ é exclusivo Premium
                Section {
                    ForEach(viewModel.pjExtras) { extra in
                        HStack {
                            Text(extra.name)
                            Spacer()
                            if extra.value > 0 {
                                Text(extra.value, format: .currency(code: "BRL"))
                                    .foregroundStyle(.secondary)
                                    .font(.caption)
                            }
                        }
                    }
                    .onDelete { indexSet in
                        // Apenas premium pode remover/editar
                        if storeManager.isPremium {
                            for index in indexSet {
                                viewModel.removePJExtra(at: index)
                            }
                        }
                    }
                    .deleteDisabled(!storeManager.isPremium)

                    // Botão de adicionar - mostra paywall para free
                    Button {
                        if storeManager.isPremium {
                            newBenefitName = ""
                            showingAddPJExtra = true
                        } else {
                            showingPaywall = true
                        }
                    } label: {
                        HStack {
                            Label("Adicionar Extra", systemImage: "plus.circle.fill")
                            if !storeManager.isPremium {
                                Spacer()
                                Image(systemName: "crown.fill")
                                    .font(.caption)
                                    .foregroundStyle(.yellow)
                            }
                        }
                    }

                    Button("Restaurar Padrões") {
                        viewModel.resetPJExtras()
                    }
                    .foregroundStyle(.orange)
                } header: {
                    Text("Extras PJ")
                } footer: {
                    if storeManager.isPremium {
                        Text("Bônus, ajudas de custo e outros valores extras do PJ.")
                    } else {
                        Text("Desbloqueie o Premium para adicionar extras personalizados.")
                    }
                }

                // Reset All
                Section {
                    Button("Limpar Todos os Dados") {
                        showingResetAlert = true
                    }
                    .foregroundStyle(.red)
                    .frame(maxWidth: .infinity)
                }


                // Premium Section
                Section {
                    if storeManager.isPremium {
                        HStack {
                            Image(systemName: "checkmark.seal.fill")
                                .foregroundStyle(.green)
                            Text("Premium Ativo")
                                .fontWeight(.medium)
                            Spacer()
                            Image(systemName: "crown.fill")
                                .foregroundStyle(.yellow)
                        }
                    } else {
                        Button {
                            showingPaywall = true
                        } label: {
                            HStack {
                                VStack(alignment: .leading, spacing: 4) {
                                    HStack {
                                        Image(systemName: "crown.fill")
                                            .foregroundStyle(.yellow)
                                        Text("Upgrade para Premium")
                                            .fontWeight(.semibold)
                                    }
                                    Text("Benefícios ilimitados, propostas sem limite")
                                        .font(.caption)
                                        .foregroundStyle(.secondary)
                                }
                                Spacer()
                                Image(systemName: "chevron.right")
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }
                        }
                        .foregroundStyle(.primary)

                        Button("Restaurar Compra") {
                            Task {
                                await storeManager.restorePurchases()
                            }
                        }
                        .foregroundStyle(.blue)
                    }
                } header: {
                    Text("Premium")
                }

                // About
                Section {
                    LabeledContent("Versão", value: "2.0.0")
                    LabeledContent("Tabelas Fiscais", value: "2024/2025")
                } header: {
                    Text("Sobre o App")
                }

                // How it works
                Section {
                    VStack(alignment: .leading, spacing: 12) {
                        InfoItem(
                            icon: "building.2.fill",
                            title: "CLT Completo",
                            description: "Calcula todos os componentes: salário líquido, 13º, férias, FGTS e benefícios personalizáveis."
                        )

                        Divider()

                        InfoItem(
                            icon: "briefcase.fill",
                            title: "PJ Flexível",
                            description: "Considera impostos, contabilidade e extras como bônus e ajudas de custo."
                        )

                        Divider()

                        InfoItem(
                            icon: "percent",
                            title: "Impostos Reais",
                            description: "INSS e IRRF calculados com tabelas progressivas oficiais 2024/2025."
                        )

                        Divider()

                        InfoItem(
                            icon: "chart.bar.fill",
                            title: "Comparação Anualizada",
                            description: "O CLT é anualizado (÷12) para comparação justa com o PJ mensal."
                        )
                    }
                    .padding(.vertical, 4)
                } header: {
                    Text("Como Funciona")
                }
            }
            .navigationTitle("Ajustes")
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
            .alert("Limpar Dados?", isPresented: $showingResetAlert) {
                Button("Cancelar", role: .cancel) { }
                Button("Limpar", role: .destructive) {
                    viewModel.clearAll()
                }
            } message: {
                Text("Isso irá zerar todos os valores da calculadora.")
            }
            .sheet(isPresented: $showingAddCLTBenefit) {
                AddBenefitSheet(
                    title: "Novo Benefício CLT",
                    benefitName: $newBenefitName
                ) {
                    if !newBenefitName.trimmingCharacters(in: .whitespaces).isEmpty {
                        viewModel.addCLTBenefit(name: newBenefitName)
                    }
                }
            }
            .sheet(isPresented: $showingAddPJExtra) {
                AddBenefitSheet(
                    title: "Novo Extra PJ",
                    benefitName: $newBenefitName
                ) {
                    if !newBenefitName.trimmingCharacters(in: .whitespaces).isEmpty {
                        viewModel.addPJExtra(name: newBenefitName)
                    }
                }
            }
            .sheet(isPresented: $showingPaywall) {
                PaywallView()
            }
        }
    }
}

// MARK: - Add Benefit Sheet

struct AddBenefitSheet: View {
    @Environment(\.dismiss) private var dismiss
    let title: String
    @Binding var benefitName: String
    let onAdd: () -> Void
    @FocusState private var isFocused: Bool

    var body: some View {
        NavigationStack {
            Form {
                Section {
                    TextField("Nome do benefício", text: $benefitName)
                        .focused($isFocused)
                } footer: {
                    Text("Ex: Stock Options, Auxílio Moradia...")
                }
            }
            .navigationTitle(title)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancelar") {
                        dismiss()
                    }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Adicionar") {
                        onAdd()
                        dismiss()
                    }
                    .disabled(benefitName.trimmingCharacters(in: .whitespaces).isEmpty)
                    .fontWeight(.semibold)
                }
            }
            .onAppear {
                isFocused = true
            }
        }
        .presentationDetents([.height(200)])
    }
}

// MARK: - Info Item Component

struct InfoItem: View {
    let icon: String
    let title: String
    let description: String

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: icon)
                .font(.title3)
                .foregroundStyle(.blue)
                .frame(width: 30)

            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(.subheadline)
                    .fontWeight(.semibold)

                Text(description)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .fixedSize(horizontal: false, vertical: true)
            }
        }
    }
}

#Preview {
    SettingsView(viewModel: CalculatorViewModel())
}
