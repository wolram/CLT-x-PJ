//
//  PaywallView.swift
//  CalcCLTPJ
//
//  Tela de upgrade para versão Premium
//

import SwiftUI
import StoreKit

struct PaywallView: View {
    @Environment(\.dismiss) private var dismiss
    let storeManager = StoreManager.shared

    @State private var isPurchasing = false
    @State private var showError = false
    @State private var errorMessage = ""

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    // Header
                    VStack(spacing: 12) {
                        Image(systemName: "crown.fill")
                            .font(.system(size: 60))
                            .foregroundStyle(.yellow)

                        Text("Calculadora Premium")
                            .font(.title)
                            .fontWeight(.bold)

                        Text("Desbloqueie todo o potencial da calculadora")
                            .font(.subheadline)
                            .foregroundStyle(.secondary)
                            .multilineTextAlignment(.center)
                    }
                    .padding(.top, 20)

                    // Features comparison
                    VStack(spacing: 16) {
                        FeatureComparisonRow(
                            feature: "Benefícios CLT",
                            free: "5 primeiros",
                            premium: "Todos ilimitados"
                        )

                        Divider()

                        FeatureComparisonRow(
                            feature: "Propostas salvas",
                            free: "1 proposta",
                            premium: "Ilimitadas"
                        )

                        Divider()

                        FeatureComparisonRow(
                            feature: "Detalhamento completo",
                            free: "Resumido",
                            premium: "Completo com gráficos"
                        )

                        Divider()

                        FeatureComparisonRow(
                            feature: "Exportar relatório",
                            free: "—",
                            premium: "PDF e compartilhar"
                        )
                    }
                    .padding()
                    .background(Color(.secondarySystemGroupedBackground))
                    .clipShape(RoundedRectangle(cornerRadius: 16))
                    .padding(.horizontal)

                    // Price and purchase button
                    VStack(spacing: 16) {
                        if storeManager.isLoading {
                            ProgressView()
                                .frame(height: 60)
                        } else if let product = storeManager.products.first {
                            VStack(spacing: 8) {
                                Text(product.displayPrice)
                                    .font(.system(size: 40, weight: .bold, design: .rounded))

                                Text("Pagamento único • Acesso vitalício")
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }

                            Button {
                                Task {
                                    await purchase(product)
                                }
                            } label: {
                                HStack {
                                    if isPurchasing {
                                        ProgressView()
                                            .tint(.white)
                                    } else {
                                        Text("Desbloquear Premium")
                                            .fontWeight(.semibold)
                                    }
                                }
                                .frame(maxWidth: .infinity)
                                .frame(height: 54)
                                .background(.blue)
                                .foregroundStyle(.white)
                                .clipShape(RoundedRectangle(cornerRadius: 14))
                            }
                            .disabled(isPurchasing)
                            .padding(.horizontal)
                        } else {
                            Text("Produto não disponível")
                                .foregroundStyle(.secondary)
                        }

                        Button("Restaurar Compra") {
                            Task {
                                await storeManager.restorePurchases()
                                if storeManager.isPremium {
                                    dismiss()
                                }
                            }
                        }
                        .font(.subheadline)
                        .foregroundStyle(.blue)
                    }
                    .padding(.vertical)

                    // Footer
                    VStack(spacing: 8) {
                        Text("Desenvolvido por devs, para devs")
                            .font(.caption)
                            .foregroundStyle(.secondary)

                        HStack(spacing: 16) {
                            Link("Termos de Uso", destination: URL(string: "https://apple.com/legal/internet-services/itunes/dev/stdeula/")!)
                            Link("Privacidade", destination: URL(string: "https://apple.com/legal/privacy/")!)
                        }
                        .font(.caption2)
                    }
                    .padding(.bottom)
                }
            }
            .background(Color(.systemGroupedBackground))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button {
                        dismiss()
                    } label: {
                        Image(systemName: "xmark.circle.fill")
                            .foregroundStyle(.secondary)
                    }
                }
            }
            .alert("Erro", isPresented: $showError) {
                Button("OK", role: .cancel) { }
            } message: {
                Text(errorMessage)
            }
            .onChange(of: storeManager.isPremium) { _, isPremium in
                if isPremium {
                    dismiss()
                }
            }
        }
    }

    private func purchase(_ product: Product) async {
        isPurchasing = true
        do {
            let success = try await storeManager.purchase(product)
            if success {
                dismiss()
            }
        } catch {
            errorMessage = "Não foi possível completar a compra. Tente novamente."
            showError = true
        }
        isPurchasing = false
    }
}

// MARK: - Feature Comparison Row

struct FeatureComparisonRow: View {
    let feature: String
    let free: String
    let premium: String

    var body: some View {
        HStack {
            Text(feature)
                .font(.subheadline)

            Spacer()

            VStack(alignment: .trailing, spacing: 4) {
                HStack(spacing: 4) {
                    Image(systemName: "crown.fill")
                        .font(.caption2)
                        .foregroundStyle(.yellow)
                    Text(premium)
                        .font(.caption)
                        .fontWeight(.medium)
                        .foregroundStyle(.primary)
                }

                Text(free)
                    .font(.caption2)
                    .foregroundStyle(.secondary)
            }
        }
    }
}

#Preview {
    PaywallView()
}
