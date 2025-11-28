//
//  CalcCLTPJApp.swift
//  CalcCLTPJ
//
//  Created by Marlow Sousa on 28/11/2025.
//

import SwiftUI
import SwiftData

@main
struct CalcCLTPJApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(for: Proposal.self)
    }
}
