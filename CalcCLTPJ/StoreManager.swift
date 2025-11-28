//
//  StoreManager.swift
//  CalcCLTPJ
//
//  Gerenciamento de compras in-app com StoreKit 2
//

import Foundation
import StoreKit

// MARK: - Product IDs

enum ProductID {
    static let premium = "com.calccltpj.premium"
}

// MARK: - Store Manager

@MainActor
@Observable
final class StoreManager {
    static let shared = StoreManager()

    private(set) var products: [Product] = []
    private(set) var purchasedProductIDs: Set<String> = []
    private(set) var isLoading = false

    var isPremium: Bool {
        purchasedProductIDs.contains(ProductID.premium)
    }

    private nonisolated(unsafe) var updateListenerTask: Task<Void, Error>?

    private init() {
        updateListenerTask = listenForTransactions()
        Task {
            await loadProducts()
            await updatePurchasedProducts()
        }
    }

    deinit {
        updateListenerTask?.cancel()
    }

    // MARK: - Load Products

    @MainActor
    func loadProducts() async {
        isLoading = true
        do {
            products = try await Product.products(for: [ProductID.premium])
        } catch {
            print("Erro ao carregar produtos: \(error)")
        }
        isLoading = false
    }

    // MARK: - Purchase

    @MainActor
    func purchase(_ product: Product) async throws -> Bool {
        let result = try await product.purchase()

        switch result {
        case .success(let verification):
            let transaction = try checkVerified(verification)
            await updatePurchasedProducts()
            await transaction.finish()
            return true

        case .userCancelled:
            return false

        case .pending:
            return false

        @unknown default:
            return false
        }
    }

    // MARK: - Restore Purchases

    @MainActor
    func restorePurchases() async {
        do {
            try await AppStore.sync()
            await updatePurchasedProducts()
        } catch {
            print("Erro ao restaurar compras: \(error)")
        }
    }

    // MARK: - Update Purchased Products

    @MainActor
    func updatePurchasedProducts() async {
        var purchased: Set<String> = []

        for await result in Transaction.currentEntitlements {
            if case .verified(let transaction) = result {
                purchased.insert(transaction.productID)
            }
        }

        purchasedProductIDs = purchased
    }

    // MARK: - Transaction Listener

    private func listenForTransactions() -> Task<Void, Error> {
        Task.detached {
            for await result in Transaction.updates {
                if case .verified(let transaction) = result {
                    await self.updatePurchasedProducts()
                    await transaction.finish()
                }
            }
        }
    }

    // MARK: - Verification

    private func checkVerified<T>(_ result: VerificationResult<T>) throws -> T {
        switch result {
        case .unverified:
            throw StoreError.verificationFailed
        case .verified(let item):
            return item
        }
    }
}

// MARK: - Store Errors

enum StoreError: Error {
    case verificationFailed
    case purchaseFailed
}

// MARK: - Free Tier Limits

enum FreeTierLimits {
    static let maxBenefits = 5  // Apenas 5 primeiros benefícios CLT
    static let maxProposals = 1  // Apenas 1 proposta salva
    static let showDetailedBreakdown = false  // Sem detalhamento completo
}
