const test = require('node:test');
const assert = require('node:assert');
const {
  calcularINSS,
  calcularIRRF,
  calcularIRRFBaseTributavel,
  calcularFGTS,
  calcularDecimoTerceiro,
  calcularFerias,
  calcularCLTAnual,
  getBeneficiosPadrao,
  TETO_INSS_2026,
} = require('../js/tax-engine.js');

// ============================================================
// INSS Tests
// ============================================================

test('calcularINSS', async (t) => {
  await t.test('should return 0 for zero salary', () => {
    assert.strictEqual(calcularINSS(0), 0);
  });

  await t.test('should calculate 7.5% for minimum wage', () => {
    const result = calcularINSS(1621.00);
    assert.strictEqual(result, 121.57);
  });

  await t.test('should calculate progressive for R$3000', () => {
    const result = calcularINSS(3000);
    // Faixa 1: 1621 * 0.075 = 121.575
    // Faixa 2: (2902.84 - 1621) * 0.09 = 115.3656
    // Faixa 3: (3000 - 2902.84) * 0.12 = 11.6592
    // Total: 248.60
    assert.strictEqual(result, 248.60);
  });

  await t.test('should cap at INSS ceiling', () => {
    const result1 = calcularINSS(TETO_INSS_2026);
    const result2 = calcularINSS(15000);
    assert.strictEqual(result1, result2);
  });

  await t.test('should calculate for R$8000 (near ceiling)', () => {
    const result = calcularINSS(8000);
    // Faixa 1: 1621 * 0.075 = 121.575
    // Faixa 2: (2902.84 - 1621) * 0.09 = 115.3656
    // Faixa 3: (4354.27 - 2902.84) * 0.12 = 174.1716
    // Faixa 4: (8000 - 4354.27) * 0.14 = 510.4022
    // Total: 921.51
    assert.strictEqual(result, 921.51);
  });
});

// ============================================================
// IRRF Tests
// ============================================================

test('calcularIRRFBaseTributavel', async (t) => {
  await t.test('should subtract INSS from gross salary', () => {
    const base = calcularIRRFBaseTributavel(5000, 500, 0);
    assert.strictEqual(base, 4500);
  });

  await t.test('should subtract dependent deductions', () => {
    const base = calcularIRRFBaseTributavel(5000, 500, 2);
    // 5000 - 500 - (2 * 189.59) = 4120.82
    assert.strictEqual(base, 4120.82);
  });

  await t.test('should not return negative base', () => {
    const base = calcularIRRFBaseTributavel(1000, 1200, 0);
    assert.strictEqual(base, 0);
  });
});

test('calcularIRRF', async (t) => {
  await t.test('should return 0 for base below exemption threshold', () => {
    const irrf = calcularIRRF(2400, 180, 0);
    assert.strictEqual(irrf, 0);
  });

  await t.test('should return 0 for base up to R$5000 (progressive discount)', () => {
    const irrf = calcularIRRF(5000, 400, 0);
    assert.strictEqual(irrf, 0);
  });

  await t.test('should calculate IRRF for R$8000 salary', () => {
    const inss = calcularINSS(8000);
    const irrf = calcularIRRF(8000, inss, 0);
    assert.ok(irrf > 0);
  });

  await t.test('should reduce IRRF with dependents', () => {
    const inss = calcularINSS(8000);
    const irrf0 = calcularIRRF(8000, inss, 0);
    const irrf2 = calcularIRRF(8000, inss, 2);
    assert.ok(irrf2 < irrf0);
  });
});

// ============================================================
// FGTS Tests
// ============================================================

test('calcularFGTS', async (t) => {
  await t.test('should calculate 8% of gross salary', () => {
    assert.strictEqual(calcularFGTS(5000), 400);
  });

  await t.test('should calculate for minimum wage', () => {
    assert.strictEqual(calcularFGTS(1621), 129.68);
  });
});

// ============================================================
// 13th Salary Tests
// ============================================================

test('calcularDecimoTerceiro', async (t) => {
  await t.test('should return positive net 13th salary', () => {
    const result = calcularDecimoTerceiro(5000);
    assert.ok(result > 0);
  });

  await t.test('should be less than gross salary due to deductions', () => {
    const result = calcularDecimoTerceiro(5000);
    assert.ok(result < 5000);
  });
});

// ============================================================
// Vacation Tests
// ============================================================

test('calcularFerias', async (t) => {
  await t.test('should return positive net vacation pay', () => {
    const result = calcularFerias(5000);
    assert.ok(result > 0);
  });

  await t.test('should be more than monthly salary (includes 1/3 bonus)', () => {
    const result = calcularFerias(5000);
    assert.ok(result > 5000);
  });
});

// ============================================================
// CLT Annual Tests
// ============================================================

test('calcularCLTAnual', async (t) => {
  await t.test('should return positive annual net for R$6000 salary', () => {
    const result = calcularCLTAnual(6000);
    assert.ok(result.totalLiquidoAnual > 0);
  });

  await t.test('should include 13th salary and vacation in annual total', () => {
    const result = calcularCLTAnual(6000);
    assert.ok(result.decimoTerceiroLiquido > 0);
    assert.ok(result.feriasMaisUmTercoLiquido > 0);
  });

  await t.test('should calculate FGTS annual total', () => {
    const result = calcularCLTAnual(6000);
    assert.strictEqual(result.fgtsMensal, 480);
    assert.strictEqual(result.totalFGTSAnual, 5760);
  });

  await t.test('should include benefits in annual total', () => {
    const beneficios = { vr: 600, vt: 250, saude: 400 };
    const result = calcularCLTAnual(6000, beneficios);
    assert.ok(result.totalBeneficiosAnual > 0);
    assert.ok(result.totalAnualComBeneficios > result.totalLiquidoAnual);
  });

  await t.test('should handle minimum wage scenario', () => {
    const result = calcularCLTAnual(1621);
    assert.ok(result.totalLiquidoAnual > 0);
  });

  await t.test('should handle high salary scenario (R$20000)', () => {
    const result = calcularCLTAnual(20000);
    assert.ok(result.totalLiquidoAnual > 0);
    assert.ok(result.totalIRRFAnual > 0);
  });
});

// ============================================================
// Benefits Tests
// ============================================================

test('getBeneficiosPadrao', async (t) => {
  await t.test('should return junior benefits', () => {
    const b = getBeneficiosPadrao('junior');
    assert.ok(b.vr > 0);
    assert.ok(b.saude > 0);
  });

  await t.test('should return senior benefits with higher values', () => {
    const junior = getBeneficiosPadrao('junior');
    const senior = getBeneficiosPadrao('senior');
    assert.ok(senior.vr > junior.vr);
    assert.ok(senior.saude > junior.saude);
  });

  await t.test('should default to junior for unknown level', () => {
    const b = getBeneficiosPadrao('unknown');
    const j = getBeneficiosPadrao('junior');
    assert.deepStrictEqual(b, j);
  });
});
