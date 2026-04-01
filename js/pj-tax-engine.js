// CLT x PJ — PJ Tax Engine (2026)
// Pure functions, zero dependencies. Simples Nacional + MEI + Lucro Presumido.

// ============================================================
// CONSTANTS — Simples Nacional 2026 Tables
// ============================================================

const SIMPLES_NACIONAL_ANEXOS = {
  anexo1: {
    nome: "Anexo I — Comércio",
    faixas: [
      { limite: 180000, aliquota: 0.04, deducao: 0 },
      { limite: 360000, aliquota: 0.073, deducao: 5940 },
      { limite: 720000, aliquota: 0.095, deducao: 13860 },
      { limite: 1800000, aliquota: 0.107, deducao: 22500 },
      { limite: 3600000, aliquota: 0.143, deducao: 87300 },
      { limite: 4800000, aliquota: 0.19, deducao: 378000 },
    ],
  },
  anexo2: {
    nome: "Anexo II — Indústria",
    faixas: [
      { limite: 180000, aliquota: 0.045, deducao: 0 },
      { limite: 360000, aliquota: 0.078, deducao: 5940 },
      { limite: 720000, aliquota: 0.10, deducao: 13860 },
      { limite: 1800000, aliquota: 0.112, deducao: 22500 },
      { limite: 3600000, aliquota: 0.147, deducao: 85500 },
      { limite: 4800000, aliquota: 0.30, deducao: 720000 },
    ],
  },
  anexo3: {
    nome: "Anexo III — Serviços (contabilidade, agências, academias)",
    faixas: [
      { limite: 180000, aliquota: 0.06, deducao: 0 },
      { limite: 360000, aliquota: 0.112, deducao: 9360 },
      { limite: 720000, aliquota: 0.135, deducao: 17640 },
      { limite: 1800000, aliquota: 0.16, deducao: 35640 },
      { limite: 3600000, aliquota: 0.21, deducao: 125640 },
      { limite: 4800000, aliquota: 0.33, deducao: 648000 },
    ],
  },
  anexo4: {
    nome: "Anexo IV — Serviços (advocacia, medicina, engenharia civil)",
    faixas: [
      { limite: 180000, aliquota: 0.045, deducao: 0 },
      { limite: 360000, aliquota: 0.09, deducao: 8100 },
      { limite: 720000, aliquota: 0.102, deducao: 12420 },
      { limite: 1800000, aliquota: 0.14, deducao: 39780 },
      { limite: 3600000, aliquota: 0.22, deducao: 183780 },
      { limite: 4800000, aliquota: 0.33, deducao: 828000 },
    ],
  },
  anexo5: {
    nome: "Anexo V — Serviços intelectuais (TI, engenharia, consultoria)",
    faixas: [
      { limite: 180000, aliquota: 0.155, deducao: 0 },
      { limite: 360000, aliquota: 0.18, deducao: 4500 },
      { limite: 720000, aliquota: 0.195, deducao: 9900 },
      { limite: 1800000, aliquota: 0.205, deducao: 17100 },
      { limite: 3600000, aliquota: 0.23, deducao: 62100 },
      { limite: 4800000, aliquota: 0.305, deducao: 540000 },
    ],
  },
};

const SIMPLES_NACIONAL_LIMITE = 4800000;
const FATOR_R_LIMITE = 0.28;

const MEI_DAS_2026 = 81.05;
const MEI_LIMITE_FATURAMENTO_ANUAL = 81000;

const CUSTO_CONTADOR_MENSAL_MIN = 200;
const CUSTO_CONTADOR_MENSAL_MAX = 800;

const INSS_PRO_LABORE_MINIMO = 0.11;
const SALARIO_MINIMO_2026 = 1621.00;

// ============================================================
// Simples Nacional — Effective Rate Calculation
// ============================================================

function getFaixaSimplesNacional(rbt12, anexo) {
  const faixas = SIMPLES_NACIONAL_ANEXOS[anexo].faixas;
  for (let i = 0; i < faixas.length; i++) {
    if (rbt12 <= faixas[i].limite) {
      return { faixa: i + 1, ...faixas[i] };
    }
  }
  return null;
}

function calcularAliquotaEfetivaSimplesNacional(rbt12, faturamentoMes, anexo) {
  const faixa = getFaixaSimplesNacional(rbt12, anexo);
  if (!faixa) {
    return {
      erro: "Faturamento acima do limite do Simples Nacional (R$ 4.8M)",
      aliquotaEfetiva: 0,
      aliquotaNominal: 0,
      das: 0,
    };
  }

  const aliquotaEfetiva = (rbt12 * faixa.aliquota - faixa.deducao) / rbt12;
  const das = faturamentoMes * aliquotaEfetiva;

  return {
    faixa: faixa.faixa,
    aliquotaNominal: faixa.aliquota,
    aliquotaEfetiva: Math.round(aliquotaEfetiva * 10000) / 10000,
    das: Math.round(das * 100) / 100,
    dasAnual: Math.round(das * 12 * 100) / 100,
  };
}

// ============================================================
// Fator R — Check if Anexo V qualifies for Anexo III rates
// ============================================================

function verificarFatorR(folhaPagamento12m, rbt12) {
  if (rbt12 <= 0) return false;
  return folhaPagamento12m / rbt12 >= FATOR_R_LIMITE;
}

function calcularSimplesNacionalComFatorR(rbt12, faturamentoMes, anexo, folhaPagamento12m = 0) {
  let anexoEfetivo = anexo;

  if (anexo === 'anexo5' && verificarFatorR(folhaPagamento12m, rbt12)) {
    anexoEfetivo = 'anexo3';
  }

  const resultado = calcularAliquotaEfetivaSimplesNacional(rbt12, faturamentoMes, anexoEfetivo);
  resultado.anexoUtilizado = SIMPLES_NACIONAL_ANEXOS[anexoEfetivo].nome;
  resultado.fatorRAplicado = anexoEfetivo !== anexo;

  return resultado;
}

// ============================================================
// MEI Calculation
// ============================================================

function calcularMEI(faturamentoMensal) {
  const faturamentoAnual = faturamentoMensal * 12;
  const excedeLimite = faturamentoAnual > MEI_LIMITE_FATURAMENTO_ANUAL;

  return {
    regime: 'MEI',
    dasMensal: MEI_DAS_2026,
    dasAnual: Math.round(MEI_DAS_2026 * 12 * 100) / 100,
    aliquotaEfetiva: faturamentoMensal > 0 ? Math.round((MEI_DAS_2026 / faturamentoMensal) * 10000) / 10000 : 0,
    faturamentoAnual,
    excedeLimiteMEI: excedeLimite,
    aviso: excedeLimite ? "Faturamento excede limite MEI (R$ 81.000/ano). Considere migrar para Simples Nacional." : null,
  };
}

// ============================================================
// Lucro Presumido — Simplified
// ============================================================

function calcularLucroPresumido(faturamentoMensal, atividade = 'servicos') {
  const faturamentoAnual = faturamentoMensal * 12;

  const presumcaoLucro = atividade === 'servicos' ? 0.32 : 0.08;
  const baseLucro = faturamentoAnual * presumcaoLucro;

  const irpj = baseLucro * 0.15;
  const irpjAdicional = Math.max(0, (baseLucro - 240000) * 0.10);
  const csll = baseLucro * 0.09;
  const pis = faturamentoAnual * 0.0065;
  const cofins = faturamentoAnual * 0.03;

  const iss = atividade === 'servicos' ? faturamentoAnual * 0.05 : 0;
  const icms = atividade === 'comercio' ? faturamentoAnual * 0.18 : 0;

  const totalImpostosFederais = irpj + irpjAdicional + csll + pis + cofins;
  const totalImpostos = totalImpostosFederais + iss + icms;
  const aliquotaEfetiva = faturamentoAnual > 0 ? totalImpostos / faturamentoAnual : 0;

  return {
    regime: 'Lucro Presumido',
    faturamentoAnual,
    irpj: Math.round(irpj * 100) / 100,
    irpjAdicional: Math.round(irpjAdicional * 100) / 100,
    csll: Math.round(csll * 100) / 100,
    pis: Math.round(pis * 100) / 100,
    cofins: Math.round(cofins * 100) / 100,
    iss: Math.round(iss * 100) / 100,
    icms: Math.round(icms * 100) / 100,
    totalImpostos: Math.round(totalImpostos * 100) / 100,
    aliquotaEfetiva: Math.round(aliquotaEfetiva * 10000) / 10000,
  };
}

// ============================================================
// INSS Pro-labore (PJ)
// ============================================================

function _getCLTEngine() {
  if (typeof module !== 'undefined' && typeof require === 'function') {
    return require('./tax-engine.js');
  }
  return { calcularINSS, calcularIRRF, calcularIRRFBaseTributavel, calcularIRRFPelaTabela, aplicarDescontoProgressivo };
}

// ============================================================
// PJ Annual Net — Comprehensive Calculation
// ============================================================

function calcularPJAnual(faturamentoMensal, opcoes = {}) {
  const {
    regime = 'simples',
    anexo = 'anexo3',
    rbt12 = faturamentoMensal * 12,
    folhaPagamento12m = 0,
    custoContadorMensal = 400,
    proLaboreMensal = SALARIO_MINIMO_2026,
    despesasOperacionaisMensais = 0,
    numDependentes = 0,
  } = opcoes;

  const faturamentoAnual = faturamentoMensal * 12;
  let impostosAnual = 0;
  let detalhesImpostos = {};

  if (regime === 'mei') {
    const mei = calcularMEI(faturamentoMensal);
    impostosAnual = mei.dasAnual;
    detalhesImpostos = { regime: 'MEI', dasAnual: mei.dasAnual, aviso: mei.aviso };
  } else if (regime === 'lucroPresumido') {
    const lp = calcularLucroPresumido(faturamentoMensal, opcoes.atividade);
    impostosAnual = lp.totalImpostos;
    detalhesImpostos = lp;
  } else {
    const sn = calcularSimplesNacionalComFatorR(rbt12, faturamentoMensal, anexo, folhaPagamento12m);
    impostosAnual = sn.dasAnual;
    detalhesImpostos = sn;
  }

  const engine = _getCLTEngine();
  const calcularINSS = engine.calcularINSS;
  const calcularIRRF = engine.calcularIRRF;
  const calcularIRRFBaseTributavel = engine.calcularIRRFBaseTributavel;
  const calcularIRRFPelaTabela = engine.calcularIRRFPelaTabela;
  const aplicarDescontoProgressivo = engine.aplicarDescontoProgressivo;

  const inssProLabore = calcularINSS(proLaboreMensal) * 12;
  const baseIRRF = calcularIRRFBaseTributavel(proLaboreMensal, calcularINSS(proLaboreMensal), numDependentes);
  let irrfProLaboreMensal = 0;
  if (baseIRRF > 0) {
    const irrfTabela = calcularIRRFPelaTabela(baseIRRF);
    irrfProLaboreMensal = aplicarDescontoProgressivo(irrfTabela, baseIRRF);
  }
  const irrfProLaboreAnual = irrfProLaboreMensal * 12;

  const custoContadorAnual = custoContadorMensal * 12;
  const despesasOperacionaisAnual = despesasOperacionaisMensais * 12;

  const totalCustos = impostosAnual + inssProLabore + irrfProLaboreAnual + custoContadorAnual + despesasOperacionaisAnual;
  const liquidoAnual = faturamentoAnual - totalCustos;
  const liquidoMensal = liquidoAnual / 12;

  return {
    faturamentoMensal,
    faturamentoAnual,
    regime,
    impostosAnual,
    detalhesImpostos,
    inssProLaboreAnual: Math.round(inssProLabore * 100) / 100,
    irrfProLaboreAnual: Math.round(irrfProLaboreAnual * 100) / 100,
    custoContadorAnual,
    despesasOperacionaisAnual,
    totalCustosAnual: Math.round(totalCustos * 100) / 100,
    liquidoAnual: Math.round(liquidoAnual * 100) / 100,
    liquidoMensal: Math.round(liquidoMensal * 100) / 100,
    aliquotaEfetivaTotal: faturamentoAnual > 0 ? Math.round((totalCustos / faturamentoAnual) * 10000) / 10000 : 0,
  };
}

// ============================================================
// Exports
// ============================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SIMPLES_NACIONAL_ANEXOS,
    SIMPLES_NACIONAL_LIMITE,
    FATOR_R_LIMITE,
    MEI_DAS_2026,
    MEI_LIMITE_FATURAMENTO_ANUAL,
    CUSTO_CONTADOR_MENSAL_MIN,
    CUSTO_CONTADOR_MENSAL_MAX,
    getFaixaSimplesNacional,
    calcularAliquotaEfetivaSimplesNacional,
    verificarFatorR,
    calcularSimplesNacionalComFatorR,
    calcularMEI,
    calcularLucroPresumido,
    calcularPJAnual,
  };
}
