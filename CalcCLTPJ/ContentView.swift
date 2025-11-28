//
//  ContentView.swift
//  CalcCLTPJ
//
//  Created by Antigravity on 28/11/2025.
//

import SwiftUI

struct ContentView: View {
    @State private var viewModel = CalculatorViewModel()

    var body: some View {
        TabView {
            CalculatorView(viewModel: viewModel)
                .tabItem {
                    Label("Calculadora", systemImage: "function")
                }

            AnalysisView(viewModel: viewModel)
                .tabItem {
                    Label("Análise", systemImage: "chart.bar.fill")
                }

            ProposalsView(viewModel: viewModel)
                .tabItem {
                    Label("Propostas", systemImage: "folder.fill")
                }

            SettingsView(viewModel: viewModel)
                .tabItem {
                    Label("Ajustes", systemImage: "gearshape.fill")
                }
        }
    }
}

#Preview {
    ContentView()
}
