import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CalculatorState {
  salarioBruto: number;
  vaVr: number;
  planoSaude: number;
  setSalarioBruto: (val: number) => void;
  setVaVr: (val: number) => void;
  setPlanoSaude: (val: number) => void;
  pjIdeal: number;
  cltLiquido: number;
  pjLiquido: number;
  inss: number;
  irrf: number;
}

const CalculatorContext = createContext<CalculatorState | undefined>(undefined);

export const CalculatorProvider = ({ children }: { children: ReactNode }) => {
  const [salarioBruto, setSalarioBruto] = useState(5000);
  const [vaVr, setVaVr] = useState(800);
  const [planoSaude, setPlanoSaude] = useState(350);

  // Simplified calculations for demonstration
  const inss = salarioBruto * 0.11; 
  const irrf = salarioBruto * 0.15; 
  const cltLiquido = salarioBruto - inss - irrf;
  
  // PJ Ideal calculation (simplified logic)
  const pjIdeal = salarioBruto + vaVr + planoSaude + (salarioBruto * 0.3); // +30% for benefits/taxes
  const pjLiquido = pjIdeal * 0.94; // 6% tax

  return (
    <CalculatorContext.Provider
      value={{
        salarioBruto,
        vaVr,
        planoSaude,
        setSalarioBruto,
        setVaVr,
        setPlanoSaude,
        pjIdeal,
        cltLiquido,
        pjLiquido,
        inss,
        irrf
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
};
