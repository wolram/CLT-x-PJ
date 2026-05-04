export interface SimulationResult {
  clt: {
    gross: number;
    inss: number;
    irrf: number;
    benefits: number;
    net: number;
    annualTotal: number;
  };
  pj: {
    gross: number;
    tax: number;
    accounting: number;
    net: number;
    annualTotal: number;
  };
  comparison: {
    monthlyDiff: number;
    annualDiff: number;
    percentageGain: number;
    roi: number;
    requiredCltToMatchPj: number;
  };
}

export function calculateSimulation(
  grossMonthly: number,
  benefitsValue: number = 1800,
  simplesAliquota: number = 6
): SimulationResult {
  // CLT Math (2024 Estimates)
  // INSS calculation - capped at maximum contribution
  const inss = Math.min(grossMonthly * 0.11, 908.85);
  
  // IRRF calculation - progressive tax after INSS
  const irsfBase = grossMonthly - inss;
  let irrf = 0;
  if (irsfBase > 5000) {
    irrf = irsfBase * 0.275 - 896;
  }
  
  const cltNet = grossMonthly - inss - irrf + benefitsValue;
  const cltAnnual = cltNet * 13.33; // Including 13th month and 1/3 vacation

  // PJ Math (Simples Nacional Anexo III)
  // Aliquota is variable based on annual revenue
  const pjTax = grossMonthly * (simplesAliquota / 100);
  const accounting = 350; // Fixed monthly accounting cost
  const pjNet = grossMonthly - pjTax - accounting;
  const pjAnnual = pjNet * 12;

  // Comparison metrics
  const monthlyDiff = pjNet - cltNet;
  const annualDiff = pjAnnual - cltAnnual;
  const percentageGain = ((pjNet - cltNet) / cltNet) * 100;
  const roi = (annualDiff / (cltAnnual / 12)) * 100; // ROI based on monthly CLT salary
  
  // Required CLT salary to match PJ net income
  // Rough estimate: need to earn more because of additional taxes
  const requiredCltToMatchPj = pjNet * 1.35;

  return {
    clt: {
      gross: grossMonthly,
      inss,
      irrf,
      benefits: benefitsValue,
      net: cltNet,
      annualTotal: cltAnnual,
    },
    pj: {
      gross: grossMonthly,
      tax: pjTax,
      accounting,
      net: pjNet,
      annualTotal: pjAnnual,
    },
    comparison: {
      monthlyDiff,
      annualDiff,
      percentageGain,
      roi,
      requiredCltToMatchPj,
    },
  };
}
