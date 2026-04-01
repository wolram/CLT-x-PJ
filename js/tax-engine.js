// CLT x PJ — Tax Engine (2026)
// Pure functions, zero dependencies. All values from official 2026 tables.

// ============================================================
// CONSTANTS — 2026 Official Tables
// ============================================================

const SALARIO_MINIMO_2026 = 1621.00;

const INSS_FAIXAS_2026 = [
  { limite: 1621.00, aliquota: 0.075 },
  { limite: 2902.84, aliquota: 0.09 },
  { limite: 4354.27, aliquota: 0.12 },
  { limite: 8475.55, aliquota: 0.14 },
];

const TETO_INSS_2026 = 8475.55;

const IRRF_FAIXAS_MENSAIS_2026 = [
  { limite: 2428.80, aliquota: 0.0, deducao: 0.0 },
  { limite: 2826.65, aliquota: 0.075, deducao: 182.16 },
  { limite: 3751.05, aliquota: 0.15, deducao: 394.16 },
  { limite: 4664.68, aliquota: 0.225, deducao: 675.49 },
  { limite: Infinity, aliquota: 0.275, deducao: 884.96 },
];

const DESCONTO_PROGRESSIVO_LIMITE = 5000.00;
const DESCONTO_PROGRESSIVO_PARCIAL_LIMITE = 7350.00;
const DESCONTO_PROGRESSIVO_FORMULA_A = 978.62;
const DESCONTO_PROGRESSIVO_FORMULA_B = 0.133145;

const DEDUCAO_DEPENDENTE_IRRF = 189.59;

const FGTS_ALIQUOTA = 0.08;

const BENEFICIOS_PADRAO = {
  junior: { vr: 550, vt: 220, saude: 350, odontologico: 40, seguro_vida: 30, gym: 0, educacao: 0, plr: 0 },
  mid:    { vr: 700, vt: 280, saude: 500, odontologico: 50, seguro_vida: 40, gym: 80, educacao: 200, plr: 0 },
  senior: { vr: 900, vt: 350, saude: 700, odontologico: 60, seguro_vida: 50, gym: 150, educacao: 500, plr: 3000 },
};

// ============================================================
// INSS — Progressive Calculation
// ============================================================

function calcularINSS(salarioBruto) {
  if (salarioBruto <= 0) return 0;
  const base = Math.min(salarioBruto, TETO_INSS_2026);
  let inss = 0;
  let limiteAnterior = 0;

  for (const faixa of INSS_FAIXAS_2026) {
    if (base <= limiteAnterior) break;
    const baseFaixa = Math.min(base, faixa.limite) - limiteAnterior;
    inss += baseFaixa * faixa.aliquota;
    limiteAnterior = faixa.limite;
  }

  return Math.round(inss * 100) / 100;
}

// ============================================================
// IRRF — Monthly Calculation
// ============================================================

function calcularIRRFBaseTributavel(salarioBruto, inss, numDependentes = 0) {
  const deducaoDependentes = numDependentes * DEDUCAO_DEPENDENTE_IRRF;
  const base = salarioBruto - inss - deducaoDependentes;
  return Math.max(0, Math.round(base * 100) / 100);
}

function calcularIRRFPelaTabela(baseTributavel) {
  for (const faixa of IRRF_FAIXAS_MENSAIS_2026) {
    if (baseTributavel <= faixa.limite) {
      const irrf = baseTributavel * faixa.aliquota - faixa.deducao;
      return Math.max(0, Math.round(irrf * 100) / 100);
    }
  }
  return 0;
}

function aplicarDescontoProgressivo(irrfTabela, baseTributavel) {
  if (baseTributavel <= DESCONTO_PROGRESSIVO_LIMITE) {
    return 0;
  }
  if (baseTributavel <= DESCONTO_PROGRESSIVO_PARCIAL_LIMITE) {
    const desconto = DESCONTO_PROGRESSIVO_FORMULA_A - (DESCONTO_PROGRESSIVO_FORMULA_B * baseTributavel);
    const irrfFinal = irrfTabela - desconto;
    return Math.max(0, Math.round(irrfFinal * 100) / 100);
  }
  return irrfTabela;
}

function calcularIRRF(salarioBruto, inss, numDependentes = 0) {
  const baseTributavel = calcularIRRFBaseTributavel(salarioBruto, inss, numDependentes);
  const irrfTabela = calcularIRRFPelaTabela(baseTributavel);
  return aplicarDescontoProgressivo(irrfTabela, baseTributavel);
}

// ============================================================
// FGTS
// ============================================================

function calcularFGTS(salarioBruto) {
  return Math.round(salarioBruto * FGTS_ALIQUOTA * 100) / 100;
}

// ============================================================
// 13th Salary
// ============================================================

function calcularDecimoTerceiro(salarioBruto) {
  const inss = calcularINSS(salarioBruto);
  const baseTributavel = calcularIRRFBaseTributavel(salarioBruto, inss, 0);
  const irrf = calcularIRRFPelaTabela(baseTributavel);
  const irrfFinal = aplicarDescontoProgressivo(irrf, baseTributavel);
  const liquido = salarioBruto - inss - irrfFinal;
  return Math.round(liquido * 100) / 100;
}

// ============================================================
// Vacation + 1/3
// ============================================================

function calcularFerias(salarioBruto) {
  const tercoFerias = salarioBruto / 3;
  const baseFerias = salarioBruto + tercoFerias;
  const inss = calcularINSS(baseFerias);
  const baseTributavel = calcularIRRFBaseTributavel(baseFerias, inss, 0);
  const irrfTabela = calcularIRRFPelaTabela(baseTributavel);
  const irrf = aplicarDescontoProgressivo(irrfTabela, baseTributavel);
  const liquido = baseFerias - inss - irrf;
  return Math.round(liquido * 100) / 100;
}

// ============================================================
// CLT Annual Net
// ============================================================

function calcularCLTAnual(salarioBruto, beneficios = {}, numDependentes = 0) {
  const mesesTrabalho = 12;
  let totalLiquido = 0;
  let totalINSS = 0;
  let totalIRRF = 0;
  let totalFGTS = 0;
  let totalBeneficios = 0;

  for (let i = 0; i < mesesTrabalho; i++) {
    const inss = calcularINSS(salarioBruto);
    const irrf = calcularIRRF(salarioBruto, inss, numDependentes);
    const liquido = salarioBruto - inss - irrf;
    totalLiquido += liquido;
    totalINSS += inss;
    totalIRRF += irrf;
    totalFGTS += calcularFGTS(salarioBruto);
  }

  // 13th salary
  const decimoLiquido = calcularDecimoTerceiro(salarioBruto);
  totalLiquido += decimoLiquido;

  // Vacation + 1/3
  const feriasLiquido = calcularFerias(salarioBruto);
  totalLiquido += feriasLiquido;

  // Benefits (annual)
  for (const [key, valor] of Object.entries(beneficios)) {
    if (valor > 0) {
      totalBeneficios += valor * 12;
    }
  }

  // PLR is annual, not monthly
  if (beneficios.plr && beneficios.plr > 0) {
    totalBeneficios += beneficios.plr;
    totalBeneficios -= beneficios.plr * 12; // Remove the monthly multiplication
  }

  return {
    salarioBruto,
    salarioLiquidoMensal: Math.round((totalLiquido / 12) * 100) / 100,
    totalLiquidoAnual: Math.round(totalLiquido * 100) / 100,
    totalBeneficiosAnual: Math.round(totalBeneficios * 100) / 100,
    totalAnualComBeneficios: Math.round((totalLiquido + totalBeneficios) * 100) / 100,
    totalINSSAnual: Math.round(totalINSS * 100) / 100,
    totalIRRFAnual: Math.round(totalIRRF * 100) / 100,
    totalFGTSAnual: Math.round(totalFGTS * 100) / 100,
    decimoTerceiroLiquido: decimoLiquido,
    feriasMaisUmTercoLiquido: feriasLiquido,
    fgtsMensal: calcularFGTS(salarioBruto),
  };
}

// ============================================================
// Benefits Helpers
// ============================================================

function getBeneficiosPadrao(nivel) {
  return BENEFICIOS_PADRAO[nivel] || BENEFICIOS_PADRAO.junior;
}

function calcularValorBeneficiosAnual(beneficios) {
  let total = 0;
  for (const [key, valor] of Object.entries(beneficios)) {
    if (key === 'plr' || key === 'bonus') {
      total += valor; // Annual value
    } else {
      total += valor * 12; // Monthly * 12
    }
  }
  return Math.round(total * 100) / 100;
}

// ============================================================
// Exports
// ============================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SALARIO_MINIMO_2026,
    TETO_INSS_2026,
    calcularINSS,
    calcularIRRF,
    calcularIRRFBaseTributavel,
    calcularIRRFPelaTabela,
    aplicarDescontoProgressivo,
    calcularFGTS,
    calcularDecimoTerceiro,
    calcularFerias,
    calcularCLTAnual,
    getBeneficiosPadrao,
    calcularValorBeneficiosAnual,
    BENEFICIOS_PADRAO,
  };
}
