/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StatusBar } from './components/StatusBar';
import { OnboardingWelcome, OnboardingProfile, OnboardingObjective, OnboardingSalary, OnboardingCnpj, OnboardingFinal, OnboardingPremium } from './pages/Onboarding';
import { Calculator } from './pages/Calculator';
import { DetailView } from './pages/Detail';
import { ProposalsList } from './pages/Proposals';
import { ExportView } from './pages/Export';
import { AITools } from './pages/AITools';
import { CalculatorProvider } from './context/CalculatorContext';

export default function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <CalculatorProvider>
      <BrowserRouter>
        <div className="max-w-md mx-auto min-h-screen bg-background-light dark:bg-background-dark relative flex flex-col shadow-2xl overflow-x-hidden">
          <StatusBar />
          <Routes>
            <Route path="/" element={<OnboardingWelcome />} />
            <Route path="/onboarding-profile" element={<OnboardingProfile />} />
            <Route path="/onboarding-objective" element={<OnboardingObjective />} />
            <Route path="/onboarding-salary" element={<OnboardingSalary />} />
            <Route path="/onboarding-cnpj" element={<OnboardingCnpj />} />
            <Route path="/onboarding-final" element={<OnboardingFinal />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/detail" element={<DetailView />} />
            <Route path="/proposals" element={<ProposalsList />} />
            <Route path="/onboarding-premium" element={<OnboardingPremium />} />
            <Route path="/export" element={<ExportView />} />
            <Route path="/history" element={<ProposalsList />} />
            <Route path="/ai-tools" element={<AITools />} />
          </Routes>
          <div className="fixed top-4 right-4 z-[60]">
            <button 
              className="w-10 h-10 rounded-full bg-white dark:bg-card-dark text-slate-900 dark:text-primary shadow-xl border flex items-center justify-center" 
              onClick={() => setIsDark(!isDark)}
            >
              <span className="material-symbols-outlined dark:hidden">dark_mode</span>
              <span className="material-symbols-outlined hidden dark:block">light_mode</span>
            </button>
          </div>
        </div>
      </BrowserRouter>
    </CalculatorProvider>
  );
}
