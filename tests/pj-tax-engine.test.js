const test = require('node:test');
const assert = require('node:assert');
const {
  getFaixaSimplesNacional,
  calcularAliquotaEfetivaSimplesNacional,
  verificarFatorR,
  calcularSimplesNacionalComFatorR,
  calcularMEI,
  calcularLucroPresumido,
  calcularPJAnual,
  SIMPLES_NACIONAL_ANEXOS,
  MEI_DAS_2026,
} = require('../js/pj-tax-engine.js');

// ============================================================
// Simples Nacional — Bracket Tests
// ============================================================

test('getFaixaSimplesNacional', async (t) => {
  await t.test('should return faixa 1 for revenue up to 180k', () => {
    const faixa = getFaixaSimplesNacional(150000, 'anexo3');
    assert.strictEqual(faixa.faixa, 1);
    assert.strictEqual(faixa.aliquota, 0.06);
  });

  await t.test('should return faixa 2 for revenue between 180k and 360k', () => {
    const faixa = getFaixaSimplesNacional(300000, 'anexo3');
    assert.strictEqual(faixa.faixa, 2);
    assert.strictEqual(faixa.aliquota, 0.112);
  });

  await t.test('should return null for revenue above 4.8M', () => {
    const faixa = getFaixaSimplesNacional(5000000, 'anexo3');
    assert.strictEqual(faixa, null);
  });
});

// ============================================================
// Effective Rate Tests
// ============================================================

test('calcularAliquotaEfetivaSimplesNacional', async (t) => {
  await t.test('should calculate effective rate for Anexo I (comércio)', () => {
    const result = calcularAliquotaEfetivaSimplesNacional(300000, 25000, 'anexo1');
    assert.ok(result.aliquotaEfetiva > 0);
    assert.ok(result.aliquotaEfetiva < result.aliquotaNominal);
  });

  await t.test('should calculate effective rate for Anexo III (serviços)', () => {
    const result = calcularAliquotaEfetivaSimplesNacional(240000, 20000, 'anexo3');
    assert.ok(result.aliquotaEfetiva > 0);
  });

  await t.test('should calculate effective rate for Anexo V (TI)', () => {
    const result = calcularAliquotaEfetivaSimplesNacional(180000, 15000, 'anexo5');
    assert.ok(result.aliquotaEfetiva > 0);
  });

  await t.test('should return error for revenue above limit', () => {
    const result = calcularAliquotaEfetivaSimplesNacional(5000000, 400000, 'anexo3');
    assert.ok(result.erro);
  });
});

// ============================================================
// Fator R Tests
// ============================================================

test('verificarFatorR', async (t) => {
  await t.test('should return true when payroll >= 28% of revenue', () => {
    assert.strictEqual(verificarFatorR(28000, 100000), true);
  });

  await t.test('should return false when payroll < 28% of revenue', () => {
    assert.strictEqual(verificarFatorR(20000, 100000), false);
  });

  await t.test('should return false for zero revenue', () => {
    assert.strictEqual(verificarFatorR(5000, 0), false);
  });
});

test('calcularSimplesNacionalComFatorR', async (t) => {
  await t.test('should switch from Anexo V to Anexo III when Fator R >= 28%', () => {
    const result = calcularSimplesNacionalComFatorR(240000, 20000, 'anexo5', 70000);
    assert.strictEqual(result.fatorRAplicado, true);
    assert.ok(result.anexoUtilizado.includes('Anexo III'));
  });

  await t.test('should stay in Anexo V when Fator R < 28%', () => {
    const result = calcularSimplesNacionalComFatorR(240000, 20000, 'anexo5', 30000);
    assert.strictEqual(result.fatorRAplicado, false);
    assert.ok(result.anexoUtilizado.includes('Anexo V'));
  });
});

// ============================================================
// MEI Tests
// ============================================================

test('calcularMEI', async (t) => {
  await t.test('should return correct DAS for MEI within limit', () => {
    const result = calcularMEI(5000);
    assert.strictEqual(result.dasMensal, MEI_DAS_2026);
    assert.strictEqual(result.excedeLimiteMEI, false);
  });

  await t.test('should flag when MEI revenue limit is exceeded', () => {
    const result = calcularMEI(8000);
    assert.strictEqual(result.excedeLimiteMEI, true);
    assert.ok(result.aviso);
  });
});

// ============================================================
// Lucro Presumido Tests
// ============================================================

test('calcularLucroPresumido', async (t) => {
  await t.test('should calculate taxes for services', () => {
    const result = calcularLucroPresumido(15000, 'servicos');
    assert.ok(result.totalImpostos > 0);
    assert.ok(result.aliquotaEfetiva > 0);
  });

  await t.test('should calculate taxes for commerce', () => {
    const result = calcularLucroPresumido(15000, 'comercio');
    assert.ok(result.totalImpostos > 0);
  });

  await t.test('should include ISS for services', () => {
    const result = calcularLucroPresumido(15000, 'servicos');
    assert.ok(result.iss > 0);
    assert.strictEqual(result.icms, 0);
  });
});

// ============================================================
// PJ Annual Net Tests
// ============================================================

test('calcularPJAnual', async (t) => {
  await t.test('should return positive net for Simples Nacional (Anexo III)', () => {
    const result = calcularPJAnual(12000, { regime: 'simples', anexo: 'anexo3' });
    assert.ok(result.liquidoAnual > 0);
    assert.strictEqual(result.regime, 'simples');
  });

  await t.test('should return positive net for MEI', () => {
    const result = calcularPJAnual(6000, { regime: 'mei' });
    assert.ok(result.liquidoAnual > 0);
    assert.strictEqual(result.regime, 'mei');
  });

  await t.test('should return positive net for Lucro Presumido', () => {
    const result = calcularPJAnual(15000, { regime: 'lucroPresumido', atividade: 'servicos' });
    assert.ok(result.liquidoAnual > 0);
    assert.strictEqual(result.regime, 'lucroPresumido');
  });

  await t.test('should account for accountant cost', () => {
    const result = calcularPJAnual(12000, { regime: 'simples', anexo: 'anexo3', custoContadorMensal: 500 });
    assert.strictEqual(result.custoContadorAnual, 6000);
  });

  await t.test('should have lower effective rate for MEI vs Simples Nacional', () => {
    const mei = calcularPJAnual(6000, { regime: 'mei' });
    const simples = calcularPJAnual(6000, { regime: 'simples', anexo: 'anexo3' });
    assert.ok(mei.aliquotaEfetivaTotal < simples.aliquotaEfetivaTotal);
  });
});
