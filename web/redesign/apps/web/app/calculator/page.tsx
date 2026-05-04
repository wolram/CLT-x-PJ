'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MaterialSymbol } from '@/components/MaterialSymbol'
import { Navbar } from '@/components/Navbar'
import { FiscalCard } from '@/components/FiscalCard'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { calculateSimulation } from '@/lib/simulation'
import { cn } from '@/lib/utils'

export default function CalculatorPage() {
  const [grossSalary, setGrossSalary] = useState(15000)
  const [benefits, setBenefits] = useState(1800)
  const [taxRate, setTaxRate] = useState(6)

  const results = useMemo(() => 
    calculateSimulation(grossSalary, benefits, taxRate), 
    [grossSalary, benefits, taxRate]
  )

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)

  return (
    <main className="bg-surface-container-lowest min-h-screen">
      <Navbar />

      <div className="pt-40 pb-24 px-6 max-w-7xl mx-auto">
        {/* Editorial Header */}
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-8"
          >
            <MaterialSymbol name="analytics" className="text-sm" />
            Simulador de Precisão
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black text-on-surface leading-[1.1] tracking-tighter max-w-4xl"
          >
            A Matemática da sua <span className="text-secondary">Liberdade.</span>
          </motion.h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Input Panel */}
          <section className="lg:col-span-5 space-y-10">
            <div className="bg-white p-10 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] border border-slate-100">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/40 mb-10">Parâmetros Base</h2>
              
              <div className="space-y-12">
                {/* Gross Salary Input */}
                <div>
                  <Label className="block text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-4">Salário Mensal Bruto (CLT)</Label>
                  <div className="bg-surface-container-low rounded-3xl p-8 group transition-all focus-within:ring-2 focus-within:ring-secondary/20">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-black text-on-surface/20">R$</span>
                      <Input 
                        className="no-border-input bg-transparent w-full text-4xl font-black text-on-surface tabular-nums border-none focus-visible:ring-0 p-0" 
                        type="number" 
                        value={grossSalary}
                        onChange={(e) => setGrossSalary(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <Slider 
                    value={[grossSalary]}
                    onValueChange={(val) => setGrossSalary(Array.isArray(val) ? val[0] : val)}
                    min={2000}
                    max={50000}
                    step={500}
                    className="mt-6"
                  />
                </div>

                {/* Benefits Input */}
                <div>
                  <Label className="block text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/60 mb-4">Pacote de Benefícios (VR + Saúde)</Label>
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-2xl font-black text-on-surface">{formatCurrency(benefits)}</span>
                  </div>
                  <Slider 
                    value={[benefits]}
                    onValueChange={(val) => setBenefits(Array.isArray(val) ? val[0] : val)}
                    min={0}
                    max={5000}
                    step={100}
                  />
                </div>

                {/* Tax Rate Input */}
                <div>
                  <Label className="block text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/60 mb-4">Alíquota PJ (Simples Nacional)</Label>
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-2xl font-black text-on-surface">{taxRate}%</span>
                    <span className="text-[10px] font-bold text-on-surface/40 uppercase">Anexo III</span>
                  </div>
                  <Slider 
                    value={[taxRate]}
                    onValueChange={(val) => setTaxRate(Array.isArray(val) ? val[0] : val)}
                    min={6}
                    max={15.5}
                    step={0.5}
                  />
                </div>
              </div>
            </div>

            <div className="bg-primary text-on-primary p-10 rounded-[3rem] relative overflow-hidden group premium-gradient">
              <div className="relative z-10">
                <MaterialSymbol name="verified_user" className="text-secondary text-4xl mb-6" />
                <h3 className="text-xl font-bold mb-4">Por que confiar?</h3>
                <p className="text-on-primary/60 text-sm leading-relaxed">
                  Nossa calculadora utiliza as tabelas oficiais de 2024 para INSS, IRRF e Simples Nacional, garantindo uma precisão arquitetônica para sua decisão.
                </p>
              </div>
              <div className="absolute top-0 right-0 p-10 opacity-5">
                <MaterialSymbol name="gavel" className="text-[12rem]" />
              </div>
            </div>
          </section>

          {/* Results Panel */}
          <section className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FiscalCard 
                title="Líquido Mensal CLT"
                value={formatCurrency(results.clt.net)}
                subtitle="Bruto - Impostos + Benefícios"
                icon="account_balance"
                variant="surface"
              />
              <FiscalCard 
                title="Líquido Mensal PJ"
                value={formatCurrency(results.pj.net)}
                subtitle="Bruto - Simples - Contabilidade"
                icon="rocket_launch"
                variant="secondary"
                trend={{ 
                  value: `+${results.comparison.percentageGain.toFixed(1)}%`, 
                  positive: results.comparison.percentageGain > 0 
                }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={grossSalary}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-surface-container-low p-12 rounded-[3.5rem] border border-outline-variant/15"
              >
                <div className="flex justify-between items-center mb-12">
                  <h3 className="text-2xl font-black tracking-tighter">Detalhamento Comparativo</h3>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-black uppercase rounded-full">Mensal</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Row: Gross */}
                  <div className="flex justify-between items-center py-4 border-b border-outline-variant/5">
                    <span className="text-sm font-bold text-on-surface/60">Bruto Base</span>
                    <div className="flex gap-12">
                      <div className="text-right">
                        <span className="text-[9px] font-black text-primary uppercase block">CLT</span>
                        <span className="text-lg font-black">{formatCurrency(results.clt.gross)}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] font-black text-secondary uppercase block">PJ</span>
                        <span className="text-lg font-black">{formatCurrency(results.pj.gross)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Row: Taxes */}
                  <div className="flex justify-between items-center py-4 border-b border-outline-variant/5">
                    <span className="text-sm font-bold text-on-surface/60">Impostos & Deduções</span>
                    <div className="flex gap-12">
                      <div className="text-right">
                        <span className="text-lg font-black text-error/60">-{formatCurrency(results.clt.inss + results.clt.irrf)}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-black text-error/60">-{formatCurrency(results.pj.tax)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Row: Costs/Benefits */}
                  <div className="flex justify-between items-center py-4 border-b border-outline-variant/5">
                    <span className="text-sm font-bold text-on-surface/60">Benefícios / Custos Fixos</span>
                    <div className="flex gap-12">
                      <div className="text-right">
                        <span className="text-lg font-black text-secondary">+{formatCurrency(results.clt.benefits)}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-black text-on-surface-variant">-{formatCurrency(results.pj.accounting)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Row: Final Net */}
                  <div className="flex justify-between items-center pt-8">
                    <span className="text-xl font-black tracking-tighter">Líquido Final</span>
                    <div className="flex gap-12">
                      <div className="text-right">
                        <span className="text-2xl font-black text-on-surface">{formatCurrency(results.clt.net)}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-black text-secondary">{formatCurrency(results.pj.net)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-8 bg-slate-950 rounded-3xl text-slate-50 flex items-center justify-between overflow-hidden relative">
                  <div className="relative z-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-2 block">Vantagem PJ Anual</span>
                    <p className="text-3xl font-black tabular-nums">{formatCurrency(results.comparison.annualDiff)}</p>
                  </div>
                  <div className="text-right relative z-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 block">ROI da Transição</span>
                    <p className="text-3xl font-black text-secondary">{results.comparison.roi.toFixed(1)}%</p>
                  </div>
                  <MaterialSymbol name="trending_up" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] text-white/[0.03]" />
                </div>
              </motion.div>
            </AnimatePresence>
          </section>
        </div>
      </div>
      
      <footer className="py-20 text-center border-t border-outline-variant/10">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-on-surface/20">© 2024 The Fiscal Architect. Inteligência que transforma burocracia em patrimônio.</p>
      </footer>
    </main>
  )
}
