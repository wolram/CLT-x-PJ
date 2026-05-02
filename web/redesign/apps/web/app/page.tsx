'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MaterialSymbol } from '@/components/MaterialSymbol'
import { Navbar } from '@/components/Navbar'
import { calculateSimulation } from '@/lib/simulation'

export default function HomePage() {
  const [grossSalary, setGrossSalary] = useState(15000)
  const results = useMemo(() => calculateSimulation(grossSalary), [grossSalary])

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val)

  return (
    <main className="bg-surface-container-lowest overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-10 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-secondary/10"
            >
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Algoritmo Fiscal 2024
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-9xl font-black text-on-surface leading-[1.1] tracking-tighter"
            >
              Arquitetura de <span className="text-secondary">Liberdade.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-on-surface-variant text-xl leading-relaxed max-w-xl font-medium"
            >
              Deixe de lado as planilhas confusas. Projetamos uma plataforma premium para você decidir entre CLT e PJ com a autoridade de um especialista.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-6 pt-6"
            >
              <Link href="/calculator" className="bg-primary text-on-primary px-10 py-5 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] premium-gradient shadow-2xl shadow-primary/20 flex items-center gap-3 hover:scale-105 transition-all">
                Começar Simulação
                <MaterialSymbol name="arrow_forward" />
              </Link>
              <button className="px-10 py-5 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] text-on-surface border-2 border-outline-variant/30 hover:bg-surface-container transition-all">
                Ver Metodologia
              </button>
            </motion.div>
          </div>

          {/* Interactive Widget */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="bg-white p-10 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-100 relative z-10"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/40">Simulação Rápida</span>
                <MaterialSymbol name="bolt" className="text-secondary text-2xl" />
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-4">Salário Mensal Bruto</label>
                  <div className="bg-surface-container-low rounded-3xl p-6 group transition-all focus-within:ring-2 focus-within:ring-secondary/20">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-black text-on-surface/20">R$</span>
                      <input 
                        className="no-border-input bg-transparent w-full text-4xl font-black text-on-surface tabular-nums" 
                        type="number" 
                        value={grossSalary}
                        onChange={(e) => setGrossSalary(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-surface-container-high rounded-3xl">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-on-surface/40 block mb-2">Líquido CLT</span>
                    <span className="text-xl font-black text-on-surface tabular-nums">{formatCurrency(results.clt.net)}</span>
                  </div>
                  <div className="p-6 bg-secondary-fixed rounded-3xl">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-on-secondary-fixed-variant block mb-2">Líquido PJ</span>
                    <span className="text-xl font-black text-on-secondary-fixed tabular-nums">{formatCurrency(results.pj.net)}</span>
                  </div>
                </div>

                <div className="bg-primary text-on-primary p-8 rounded-3xl relative overflow-hidden group">
                  <div className="relative z-10 flex justify-between items-center">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-secondary block mb-1">Diferença Anual</span>
                      <span className="text-4xl font-black tabular-nums">{formatCurrency(results.comparison.annualDiff)}</span>
                    </div>
                    <div className="text-right">
                      <span className="bg-secondary text-on-secondary px-3 py-1 rounded-full text-[10px] font-black">
                        +{results.comparison.percentageGain.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  {/* Decorative shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </div>
            </motion.div>
            
            {/* Background elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 border-y border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/30 mb-16">Arquitetando o futuro de profissionais em</p>
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 opacity-20 grayscale hover:grayscale-0 transition-all duration-700">
            {['NUBANK', 'IFOOD', 'Loggi', 'QUITO', 'HOTMART'].map((company) => (
              <span key={company} className="font-black text-3xl tracking-tighter">{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-40 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 space-y-4 text-center"
          >
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">Estratégia Pura</h2>
            <p className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter">Onde sua carreira performa melhor.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-surface-container-low p-12 rounded-[3rem] space-y-6 hover:scale-[1.02] transition-transform"
            >
              <MaterialSymbol name="gavel" className="text-4xl text-secondary" />
              <h3 className="text-2xl font-black">Segurança Jurídica</h3>
              <p className="text-on-surface-variant font-medium leading-relaxed">
                Análise completa de riscos de pejotização e conformidade com a legislação brasileira.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-primary text-on-primary p-12 rounded-[3rem] space-y-6 premium-gradient shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-transform"
            >
              <MaterialSymbol name="monitoring" className="text-4xl text-secondary" />
              <h3 className="text-2xl font-black">Simulação Real</h3>
              <p className="text-on-primary/60 font-medium leading-relaxed">
                Consideramos cada centavo: do décimo terceiro ao custo variável de contabilidade e impostos.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-surface-container-low p-12 rounded-[3rem] space-y-6 hover:scale-[1.02] transition-transform"
            >
              <MaterialSymbol name="picture_as_pdf" className="text-4xl text-secondary" />
              <h3 className="text-2xl font-black">Relatórios PDF</h3>
              <p className="text-on-surface-variant font-medium leading-relaxed">
                Gere um dossiê executivo para apresentar em sua próxima negociação salarial.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40">
        <div className="max-w-5xl mx-auto px-6 text-center bg-slate-950 rounded-[4rem] p-24 relative overflow-hidden">
          <div className="relative z-10 space-y-10">
            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter">Pronto para<br/>assumir o controle?</h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto font-medium">Inicie sua transição com dados, não com suposições.</p>
            <div className="pt-6">
              <Link href="/calculator" className="bg-secondary-gradient text-on-secondary px-16 py-7 rounded-[2.5rem] text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-secondary/30 inline-block hover:scale-105 transition-all">
                Acessar Calculadora
              </Link>
            </div>
          </div>
          {/* Abstract background icon */}
          <MaterialSymbol name="calculate" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40rem] text-white/[0.02] pointer-events-none" />
        </div>
      </section>
      
      <footer className="py-20 text-center border-t border-outline-variant/10">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-on-surface/20">© 2024 The Fiscal Architect. Inteligência que transforma burocracia em patrimônio.</p>
      </footer>
    </main>
  )
}