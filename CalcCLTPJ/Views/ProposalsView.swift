//
//  ProposalsView.swift
//  CalcCLTPJ
//
//  Created by Marlow Sousa on 28/11/2025.
//

import SwiftUI
import SwiftData

struct ProposalsView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \Proposal.createdAt, order: .reverse) private var proposals: [Proposal]
    @Bindable var viewModel: CalculatorViewModel

    @State private var showingDeleteAlert = false
    @State private var proposalToDelete: Proposal?
    @State private var showingPaywall = false

    private let storeManager = StoreManager.shared

    // MARK: - Premium Check
    /// Verifica se o usuário FREE atingiu o limite de propostas
    /// Regra: Usuário free pode ter no máximo FreeTierLimits.maxProposals propostas
    /// O banner "Limite atingido" só aparece quando esta condição é true
    private var hasReachedProposalLimit: Bool {
        !storeManager.isPremium && proposals.count >= FreeTierLimits.maxProposals
    }

    private let currencyFormatter: NumberFormatter = {
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        formatter.locale = Locale(identifier: "pt_BR")
        formatter.maximumFractionDigits = 0
        return formatter
    }()

    var body: some View {
        NavigationStack {
            Group {
                if proposals.isEmpty {
                    ContentUnavailableView(
                        "Nenhuma Proposta",
                        systemImage: "folder.badge.plus",
                        description: Text("Salve suas propostas na aba Análise para comparar depois.")
                    )
                } else {
                    List {
                        // MARK: - Premium Upsell Banner
                        // Só aparece quando hasReachedProposalLimit é true
                        // (usuário free com >= maxProposals propostas salvas)
                        if hasReachedProposalLimit {
                            Section {
                                Button {
                                    showingPaywall = true
                                } label: {
                                    HStack {
                                        Image(systemName: "crown.fill")
                                            .foregroundStyle(.yellow)
                                        VStack(alignment: .leading, spacing: 2) {
                                            Text("Limite atingido (\(proposals.count)/\(FreeTierLimits.maxProposals))")
                                                .font(.subheadline)
                                                .fontWeight(.semibold)
                                                .foregroundStyle(.primary)
                                            Text("Desbloqueie propostas ilimitadas")
                                                .font(.caption)
                                                .foregroundStyle(.secondary)
                                        }
                                        Spacer()
                                        Image(systemName: "chevron.right")
                                            .font(.caption)
                                            .foregroundStyle(.secondary)
                                    }
                                }
                                .listRowBackground(Color.yellow.opacity(0.1))
                            }
                        }

                        ForEach(proposals) { proposal in
                            ProposalRow(
                                proposal: proposal,
                                currencyFormatter: currencyFormatter,
                                onLoad: { loadProposal(proposal) }
                            )
                            .swipeActions(edge: .trailing, allowsFullSwipe: true) {
                                Button(role: .destructive) {
                                    proposalToDelete = proposal
                                    showingDeleteAlert = true
                                } label: {
                                    Label("Apagar", systemImage: "trash")
                                }
                            }
                        }
                    }
                    .listStyle(.insetGrouped)
                }
            }
            .navigationTitle("Propostas")
            .navigationBarTitleDisplayMode(.large)
            .alert("Apagar Proposta?", isPresented: $showingDeleteAlert) {
                Button("Cancelar", role: .cancel) { }
                Button("Apagar", role: .destructive) {
                    if let proposal = proposalToDelete {
                        deleteProposal(proposal)
                    }
                }
            } message: {
                Text("Esta ação não pode ser desfeita.")
            }
            .sheet(isPresented: $showingPaywall) {
                PaywallView()
            }
        }
    }

    private func loadProposal(_ proposal: Proposal) {
        viewModel.cltGrossSalary = proposal.cltGrossSalary
        viewModel.cltBenefits = proposal.cltBenefits
        viewModel.pjGrossRevenue = proposal.pjGrossRevenue
        viewModel.pjTaxRate = proposal.pjTaxRate
        viewModel.pjAccountingCost = proposal.pjAccountingCost
        viewModel.pjExtras = proposal.pjExtras
    }

    private func deleteProposal(_ proposal: Proposal) {
        modelContext.delete(proposal)
    }
}

// MARK: - Proposal Row

struct ProposalRow: View {
    let proposal: Proposal
    let currencyFormatter: NumberFormatter
    let onLoad: () -> Void

    private var formattedDate: String {
        proposal.createdAt.formatted(date: .abbreviated, time: .shortened)
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Header
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text(proposal.companyName)
                        .font(.headline)

                    Text(formattedDate)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }

                Spacer()

                // Verdict Badge
                Text(proposal.isPJBetter ? "PJ" : "CLT")
                    .font(.caption)
                    .fontWeight(.bold)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 4)
                    .background(proposal.isPJBetter ? Color.green : Color.blue)
                    .foregroundStyle(.white)
                    .clipShape(Capsule())
            }

            // Values Comparison
            HStack(spacing: 16) {
                VStack(alignment: .leading, spacing: 2) {
                    Text("CLT Equiv.")
                        .font(.caption2)
                        .foregroundStyle(.secondary)
                    Text(formatCurrency(proposal.cltMonthlyEquivalent))
                        .font(.system(.subheadline, design: .rounded))
                        .fontWeight(.semibold)
                        .foregroundStyle(.blue)
                }

                VStack(alignment: .leading, spacing: 2) {
                    Text("PJ Líquido")
                        .font(.caption2)
                        .foregroundStyle(.secondary)
                    Text(formatCurrency(proposal.pjNetMonthly))
                        .font(.system(.subheadline, design: .rounded))
                        .fontWeight(.semibold)
                        .foregroundStyle(.green)
                }

                Spacer()

                VStack(alignment: .trailing, spacing: 2) {
                    Text("Diferença")
                        .font(.caption2)
                        .foregroundStyle(.secondary)
                    Text(formatCurrency(proposal.difference))
                        .font(.system(.subheadline, design: .rounded))
                        .fontWeight(.semibold)
                }
            }

            // Load Button
            Button {
                onLoad()
            } label: {
                HStack {
                    Image(systemName: "arrow.down.doc.fill")
                    Text("Carregar na Calculadora")
                }
                .font(.subheadline)
                .fontWeight(.medium)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 10)
                .background(Color.accentColor.opacity(0.1))
                .foregroundColor(.accentColor)
                .clipShape(RoundedRectangle(cornerRadius: 8))
            }
            .buttonStyle(.plain)
        }
        .padding(.vertical, 8)
    }

    private func formatCurrency(_ value: Double) -> String {
        currencyFormatter.string(from: NSNumber(value: value)) ?? "R$ 0"
    }
}

#Preview {
    ProposalsView(viewModel: CalculatorViewModel())
        .modelContainer(for: Proposal.self, inMemory: true)
}
