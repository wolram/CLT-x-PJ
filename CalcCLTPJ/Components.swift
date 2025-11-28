//
//  Components.swift
//  CalcCLTPJ
//
//  Created by Antigravity on 28/11/2025.
//

import SwiftUI

// MARK: - Currency Field (Real-time R$ Formatting)

struct CurrencyField<F: Hashable>: View {
    let title: String
    @Binding var value: Double
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
        VStack(alignment: .leading, spacing: 6) {
            Text(title)
                .font(.subheadline)
                .foregroundStyle(.secondary)
            
            TextField("R$ 0,00", text: $textValue)
                .keyboardType(.decimalPad)
                .textFieldStyle(.roundedBorder)
                .font(.system(.body, design: .rounded))
                .focused(focusedField, equals: field)
                .onChange(of: textValue) { oldValue, newValue in
                    updateValue(from: newValue)
                }
                .onAppear {
                    if value > 0 {
                        textValue = formatCurrency(value)
                    }
                }
        }
    }
    
    private func updateValue(from text: String) {
        // Remove tudo exceto números
        let digits = text.filter { $0.isNumber }
        
        guard !digits.isEmpty else {
            value = 0
            textValue = ""
            return
        }
        
        // Converter para Double (centavos)
        if let number = Double(digits) {
            value = number / 100.0
            textValue = formatCurrency(value)
        }
    }
    
    private func formatCurrency(_ amount: Double) -> String {
        return formatter.string(from: NSNumber(value: amount)) ?? "R$ 0,00"
    }
}

// MARK: - Info Card (White Card Container)

struct InfoCard<Content: View>: View {
    let title: String?
    @ViewBuilder let content: Content
    
    init(title: String? = nil, @ViewBuilder content: () -> Content) {
        self.title = title
        self.content = content()
    }
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            if let title = title {
                Text(title)
                    .font(.headline)
                    .foregroundStyle(.primary)
            }
            
            content
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(Color(uiColor: .systemBackground))
        .cornerRadius(12)
        .shadow(color: .black.opacity(0.05), radius: 8, x: 0, y: 2)
    }
}

// MARK: - Result Card (Display Monetary Values)

struct ResultCard: View {
    let label: String
    let value: Double
    let color: Color
    let showPositiveSign: Bool
    
    init(label: String, value: Double, color: Color = .primary, showPositiveSign: Bool = false) {
        self.label = label
        self.value = value
        self.color = color
        self.showPositiveSign = showPositiveSign
    }
    
    private var formattedValue: String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        formatter.locale = Locale(identifier: "pt_BR")
        formatter.maximumFractionDigits = 2
        formatter.minimumFractionDigits = 2
        
        var result = formatter.string(from: NSNumber(value: abs(value))) ?? "R$ 0,00"
        
        if showPositiveSign && value > 0 {
            result = "+ " + result
        } else if value < 0 {
            result = "- " + result
        }
        
        return result
    }
    
    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(label)
                .font(.subheadline)
                .foregroundStyle(.secondary)
            
            Text(formattedValue)
                .font(.system(.title3, design: .rounded))
                .fontWeight(.semibold)
                .foregroundStyle(color)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(Color(uiColor: .systemBackground))
        .cornerRadius(12)
        .shadow(color: .black.opacity(0.05), radius: 8, x: 0, y: 2)
    }
}

// MARK: - Gradient Verdict Card

struct GradientVerdictCard: View {
    let isPJBetter: Bool
    let difference: Double
    let message: String
    
    private var gradient: LinearGradient {
        let colors: [Color] = isPJBetter ? [.green, .mint] : [.blue, .cyan]
        return LinearGradient(
            colors: colors,
            startPoint: .topLeading,
            endPoint: .bottomTrailing
        )
    }
    
    private var formattedDifference: String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        formatter.locale = Locale(identifier: "pt_BR")
        formatter.maximumFractionDigits = 2
        formatter.minimumFractionDigits = 2
        
        let absValue = abs(difference)
        return formatter.string(from: NSNumber(value: absValue)) ?? "R$ 0,00"
    }
    
    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: isPJBetter ? "checkmark.circle.fill" : "info.circle.fill")
                .font(.system(size: 48))
                .foregroundStyle(.white)
            
            Text(message)
                .font(.title2)
                .fontWeight(.bold)
                .foregroundStyle(.white)
            
            Text("Diferença mensal: \(formattedDifference)")
                .font(.system(.body, design: .rounded))
                .foregroundStyle(.white.opacity(0.9))
        }
        .frame(maxWidth: .infinity)
        .padding(24)
        .background(gradient)
        .cornerRadius(16)
        .shadow(color: .black.opacity(0.1), radius: 12, x: 0, y: 4)
    }
}

// MARK: - Percentage Field

struct PercentageField<F: Hashable>: View {
    let title: String
    @Binding var value: Double
    var focusedField: FocusState<F?>.Binding
    let field: F

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(title)
                .font(.subheadline)
                .foregroundStyle(.secondary)

            HStack {
                TextField("0", value: $value, format: .number.precision(.fractionLength(2)))
                    .keyboardType(.decimalPad)
                    .textFieldStyle(.roundedBorder)
                    .font(.system(.body, design: .rounded))
                    .focused(focusedField, equals: field)

                Text("%")
                    .font(.body)
                    .foregroundStyle(.secondary)
            }
        }
    }
}
