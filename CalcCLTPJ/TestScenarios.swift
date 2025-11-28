//
//  TestScenarios.swift
//  CalcCLTPJ
//
//  Cenários de teste baseados em propostas reais do mercado tech brasileiro
//

import Foundation

// MARK: - Test Scenarios

enum TestScenarios {

    // MARK: - Big Tech (Google, Meta, Microsoft, Amazon)

    /// Google Brasil - Senior Software Engineer (L5)
    /// CLT com pacote premium de benefícios
    static let googleSenior = TestCase(
        name: "Google Brasil - Senior SWE (L5)",
        clt: CLTData(
            grossSalary: 35_000,
            benefits: [
                ("Vale Refeição (VR)", 2_000),
                ("Vale Alimentação (VA)", 1_500),
                ("Plano de Saúde", 2_500),  // Bradesco Top
                ("Plano Odontológico", 300),
                ("Seguro de Vida", 200),
                ("Gympass / Academia", 250),
                ("Auxílio Home Office", 500),
                ("Previdência Privada", 1_750),  // 5% match
                ("PLR / Bônus Anual", 8_750)  // ~3 salários/12
            ]
        ),
        pj: PJData(
            grossRevenue: 55_000,
            taxRate: 6.0,
            accountingCost: 350,
            extras: [
                ("Bônus Anual", 4_500)  // Target bonus ~15%
            ]
        ),
        notes: "Google oferece CLT com benefícios excepcionais. PJ precisaria ser muito maior."
    )

    /// Meta (Facebook) Brasil - Senior Software Engineer (E5)
    static let metaSenior = TestCase(
        name: "Meta Brasil - Senior SWE (E5)",
        clt: CLTData(
            grossSalary: 38_000,
            benefits: [
                ("Vale Refeição (VR)", 2_200),
                ("Vale Alimentação (VA)", 1_800),
                ("Plano de Saúde", 2_800),
                ("Plano Odontológico", 350),
                ("Seguro de Vida", 250),
                ("Auxílio Creche", 2_000),
                ("Gympass / Academia", 300),
                ("Auxílio Home Office", 600),
                ("Auxílio Educação", 1_500),  // Learning budget
                ("PLR / Bônus Anual", 9_500)  // ~3 salários/12
            ]
        ),
        pj: PJData(
            grossRevenue: 60_000,
            taxRate: 6.0,
            accountingCost: 400,
            extras: []
        ),
        notes: "Meta tem um dos melhores pacotes CLT do Brasil."
    )

    // MARK: - Unicórnios Brasileiros

    /// Nubank - Staff Software Engineer
    static let nubankStaff = TestCase(
        name: "Nubank - Staff Engineer",
        clt: CLTData(
            grossSalary: 32_000,
            benefits: [
                ("Vale Refeição (VR)", 1_800),
                ("Vale Alimentação (VA)", 1_200),
                ("Plano de Saúde", 2_200),  // Bradesco
                ("Plano Odontológico", 280),
                ("Seguro de Vida", 180),
                ("Gympass / Academia", 200),
                ("Auxílio Home Office", 400),
                ("NuCare (Saúde Mental)", 300),
                ("PLR / Bônus Anual", 5_333)  // ~2 salários/12
            ]
        ),
        pj: PJData(
            grossRevenue: 45_000,
            taxRate: 6.0,
            accountingCost: 300,
            extras: []
        ),
        notes: "Nubank tem cultura forte de CLT. Raramente contrata PJ."
    )

    /// iFood - Tech Lead
    static let ifoodTechLead = TestCase(
        name: "iFood - Tech Lead",
        clt: CLTData(
            grossSalary: 28_000,
            benefits: [
                ("Vale Refeição (VR)", 1_600),
                ("iFood Card", 1_000),  // Crédito no app
                ("Plano de Saúde", 1_800),
                ("Plano Odontológico", 250),
                ("Seguro de Vida", 150),
                ("Gympass / Academia", 180),
                ("Auxílio Home Office", 300),
                ("PLR / Bônus Anual", 4_667)  // ~2 salários/12
            ]
        ),
        pj: PJData(
            grossRevenue: 38_000,
            taxRate: 6.0,
            accountingCost: 280,
            extras: [
                ("iFood Card", 500)
            ]
        ),
        notes: "iFood oferece crédito mensal no próprio app como benefício."
    )

    /// 99 (DiDi) - Senior Backend
    static let didiSenior = TestCase(
        name: "99/DiDi - Senior Backend",
        clt: CLTData(
            grossSalary: 22_000,
            benefits: [
                ("Vale Refeição (VR)", 1_400),
                ("Vale Alimentação (VA)", 800),
                ("Plano de Saúde", 1_500),
                ("Plano Odontológico", 200),
                ("Créditos 99", 400),  // Corridas grátis
                ("Gympass / Academia", 150),
                ("PLR / Bônus Anual", 3_667)  // ~2 salários/12
            ]
        ),
        pj: PJData(
            grossRevenue: 30_000,
            taxRate: 6.0,
            accountingCost: 250,
            extras: []
        ),
        notes: "99 oferece créditos de corrida como benefício."
    )

    // MARK: - Bancos Digitais e Fintechs

    /// PicPay - Senior Engineer
    static let picpaySenior = TestCase(
        name: "PicPay - Senior Engineer",
        clt: CLTData(
            grossSalary: 20_000,
            benefits: [
                ("Vale Refeição (VR)", 1_300),
                ("Vale Alimentação (VA)", 700),
                ("Plano de Saúde", 1_400),
                ("Plano Odontológico", 180),
                ("Seguro de Vida", 120),
                ("Gympass / Academia", 150),
                ("PLR / Bônus Anual", 3_333)  // ~2 salários/12
            ]
        ),
        pj: PJData(
            grossRevenue: 28_000,
            taxRate: 6.0,
            accountingCost: 250,
            extras: []
        ),
        notes: "PicPay tem pacote competitivo para fintechs de médio porte."
    )

    /// C6 Bank - Tech Lead
    static let c6TechLead = TestCase(
        name: "C6 Bank - Tech Lead",
        clt: CLTData(
            grossSalary: 25_000,
            benefits: [
                ("Vale Refeição (VR)", 1_500),
                ("Vale Alimentação (VA)", 1_000),
                ("Plano de Saúde", 1_800),
                ("Plano Odontológico", 220),
                ("Seguro de Vida", 150),
                ("Auxílio Home Office", 350),
                ("PLR / Bônus Anual", 6_250)  // ~3 salários/12
            ]
        ),
        pj: PJData(
            grossRevenue: 35_000,
            taxRate: 6.0,
            accountingCost: 280,
            extras: []
        ),
        notes: "C6 Bank oferece PLR agressiva para retenção."
    )

    // MARK: - Consultorias

    /// Accenture - Senior Consultant
    static let accentureSenior = TestCase(
        name: "Accenture - Senior Consultant",
        clt: CLTData(
            grossSalary: 15_000,
            benefits: [
                ("Vale Refeição (VR)", 1_100),
                ("Vale Alimentação (VA)", 600),
                ("Plano de Saúde", 1_200),
                ("Plano Odontológico", 150),
                ("Seguro de Vida", 100),
                ("PLR / Bônus Anual", 2_500)  // ~2 salários/12
            ]
        ),
        pj: PJData(
            grossRevenue: 22_000,
            taxRate: 6.0,
            accountingCost: 200,
            extras: []
        ),
        notes: "Consultorias geralmente pagam menos mas oferecem estabilidade."
    )

    /// ThoughtWorks - Senior Developer
    static let thoughtworksSenior = TestCase(
        name: "ThoughtWorks - Senior Dev",
        clt: CLTData(
            grossSalary: 18_000,
            benefits: [
                ("Vale Refeição (VR)", 1_300),
                ("Vale Alimentação (VA)", 700),
                ("Plano de Saúde", 1_600),
                ("Plano Odontológico", 200),
                ("Seguro de Vida", 120),
                ("Auxílio Educação", 500),
                ("Gympass / Academia", 180),
                ("PLR / Bônus Anual", 3_000)
            ]
        ),
        pj: PJData(
            grossRevenue: 25_000,
            taxRate: 6.0,
            accountingCost: 220,
            extras: []
        ),
        notes: "ThoughtWorks valoriza cultura e oferece auxílio educação."
    )

    // MARK: - Empresas Internacionais (Remote)

    /// Toptal / Turing - Senior Developer (USD remote)
    /// Convertido para BRL (~5.0)
    static let toptalRemote = TestCase(
        name: "Toptal - Senior Dev (Remote USD)",
        clt: CLTData(
            grossSalary: 0,  // Não oferece CLT
            benefits: []
        ),
        pj: PJData(
            grossRevenue: 40_000,  // ~$8k USD
            taxRate: 6.0,
            accountingCost: 400,
            extras: [
                ("Ajuda de Custo", 1_000),
                ("Reembolso Equipamentos", 500)
            ]
        ),
        notes: "Empresas remote USD geralmente só contratam PJ. Considere variação cambial."
    )

    /// Stripe - Senior Engineer (Remote)
    static let stripeRemote = TestCase(
        name: "Stripe - Senior Eng (Remote)",
        clt: CLTData(
            grossSalary: 0,
            benefits: []
        ),
        pj: PJData(
            grossRevenue: 50_000,  // ~$10k USD
            taxRate: 6.0,
            accountingCost: 450,
            extras: [
                ("Ajuda de Custo", 1_500),
                ("Auxílio Home Office", 800),
                ("Reembolso Equipamentos", 1_000)
            ]
        ),
        notes: "Stripe paga salários competitivos com dólar. Só PJ no Brasil."
    )

    /// GitLab - Staff Engineer (Remote)
    static let gitlabStaff = TestCase(
        name: "GitLab - Staff Eng (Remote)",
        clt: CLTData(
            grossSalary: 0,
            benefits: []
        ),
        pj: PJData(
            grossRevenue: 55_000,  // ~$11k USD
            taxRate: 6.0,
            accountingCost: 500,
            extras: [
                ("Bônus Anual", 5_000),
                ("Auxílio Coworking", 1_200),
                ("Reembolso Equipamentos", 800),
                ("Auxílio Home Office", 600)
            ]
        ),
        notes: "GitLab é 100% remote. Paga bem mas só PJ no Brasil."
    )

    // MARK: - Startups Early Stage

    /// Startup Série A - Senior Developer
    static let startupSerieA = TestCase(
        name: "Startup Série A - Senior Dev",
        clt: CLTData(
            grossSalary: 12_000,
            benefits: [
                ("Vale Refeição (VR)", 800),
                ("Plano de Saúde", 800),
                ("Gympass / Academia", 100)
            ]
        ),
        pj: PJData(
            grossRevenue: 18_000,
            taxRate: 6.0,
            accountingCost: 180,
            extras: []
        ),
        notes: "Startups early stage pagam menos mas podem oferecer equity."
    )

    /// Startup Seed - Full Stack
    static let startupSeed = TestCase(
        name: "Startup Seed - Full Stack",
        clt: CLTData(
            grossSalary: 8_000,
            benefits: [
                ("Vale Refeição (VR)", 600),
                ("Plano de Saúde", 500)
            ]
        ),
        pj: PJData(
            grossRevenue: 12_000,
            taxRate: 6.0,
            accountingCost: 150,
            extras: []
        ),
        notes: "Fase seed: salário baixo, potencial de equity alto."
    )

    // MARK: - Bancos Tradicionais

    /// Itaú - Especialista Tech
    static let itauEspecialista = TestCase(
        name: "Itaú - Especialista Tech",
        clt: CLTData(
            grossSalary: 22_000,
            benefits: [
                ("Vale Refeição (VR)", 1_600),
                ("Vale Alimentação (VA)", 1_000),
                ("Plano de Saúde", 2_000),
                ("Plano Odontológico", 250),
                ("Seguro de Vida", 200),
                ("Previdência Privada", 1_100),  // 5% match
                ("Auxílio Creche", 800),
                ("PLR / Bônus Anual", 7_333)  // ~4 salários/12 (bancários)
            ]
        ),
        pj: PJData(
            grossRevenue: 32_000,
            taxRate: 6.0,
            accountingCost: 280,
            extras: []
        ),
        notes: "Bancos tradicionais têm PLR forte (convenção coletiva bancária)."
    )

    /// BTG Pactual - Senior Developer
    static let btgSenior = TestCase(
        name: "BTG Pactual - Senior Dev",
        clt: CLTData(
            grossSalary: 28_000,
            benefits: [
                ("Vale Refeição (VR)", 1_800),
                ("Vale Alimentação (VA)", 1_200),
                ("Plano de Saúde", 2_400),
                ("Plano Odontológico", 300),
                ("Seguro de Vida", 250),
                ("Previdência Privada", 1_400),
                ("Gympass / Academia", 200),
                ("PLR / Bônus Anual", 9_333)  // Bônus agressivo
            ]
        ),
        pj: PJData(
            grossRevenue: 40_000,
            taxRate: 6.0,
            accountingCost: 350,
            extras: []
        ),
        notes: "BTG paga bem e tem bônus agressivo baseado em performance."
    )

    // MARK: - All Scenarios

    static let allScenarios: [TestCase] = [
        googleSenior,
        metaSenior,
        nubankStaff,
        ifoodTechLead,
        didiSenior,
        picpaySenior,
        c6TechLead,
        accentureSenior,
        thoughtworksSenior,
        toptalRemote,
        stripeRemote,
        gitlabStaff,
        startupSerieA,
        startupSeed,
        itauEspecialista,
        btgSenior
    ]
}

// MARK: - Data Structures

struct TestCase {
    let name: String
    let clt: CLTData
    let pj: PJData
    let notes: String
}

struct CLTData {
    let grossSalary: Double
    let benefits: [(name: String, value: Double)]

    var totalBenefits: Double {
        benefits.reduce(0) { $0 + $1.value }
    }
}

struct PJData {
    let grossRevenue: Double
    let taxRate: Double
    let accountingCost: Double
    let extras: [(name: String, value: Double)]

    var totalExtras: Double {
        extras.reduce(0) { $0 + $1.value }
    }
}

// MARK: - Extension to Load into ViewModel

extension CalculatorViewModel {

    func loadTestScenario(_ scenario: TestCase) {
        // Reset first
        clearAll()

        // Load CLT
        cltGrossSalary = scenario.clt.grossSalary

        // Map benefits
        for (index, benefit) in cltBenefits.enumerated() {
            if let match = scenario.clt.benefits.first(where: { $0.name == benefit.name }) {
                cltBenefits[index].value = match.value
                cltBenefits[index].isEnabled = true
            } else {
                cltBenefits[index].value = 0
                cltBenefits[index].isEnabled = false
            }
        }

        // Load PJ
        pjGrossRevenue = scenario.pj.grossRevenue
        pjTaxRate = scenario.pj.taxRate
        pjAccountingCost = scenario.pj.accountingCost

        // Map extras
        for (index, extra) in pjExtras.enumerated() {
            if let match = scenario.pj.extras.first(where: { $0.name == extra.name }) {
                pjExtras[index].value = match.value
                pjExtras[index].isEnabled = true
            } else {
                pjExtras[index].value = 0
                pjExtras[index].isEnabled = false
            }
        }
    }
}
