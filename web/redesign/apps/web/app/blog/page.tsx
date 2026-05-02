'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MaterialSymbol } from '@/components/MaterialSymbol'

export default function BlogPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <main className="pt-40 pb-20 bg-surface-container-lowest">
      {/* Hero Section: Featured Article */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative group overflow-hidden rounded-[3rem] bg-surface-container-low min-h-[600px] flex items-end shadow-2xl"
        >
          <img alt="Financial Planning" className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2000" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          <div className="relative p-12 md:p-24 max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-block px-4 py-2 mb-8 rounded-full bg-secondary text-on-secondary text-[10px] font-black tracking-[0.3em] uppercase"
            >
              Featured Analysis 2024
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-8xl font-black text-slate-50 leading-[1.1] tracking-tighter mb-8"
            >
              A Grande Migração: CLT para PJ.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-slate-300 text-xl leading-relaxed mb-10 max-w-2xl font-medium"
            >
              Uma análise profunda sobre a viabilidade fiscal, benefícios ocultos e os riscos contratuais que você precisa considerar.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4"
            >
              <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-secondary shadow-xl">
                <div className="w-full h-full bg-secondary-gradient flex items-center justify-center text-white font-black">MS</div>
              </div>
              <div>
                <p className="text-slate-100 font-black text-sm">Marlow Sousa</p>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Architect Sênior</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Editorial Grid Layout (Bento Style) */}
      <motion.section 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8"
      >
        {/* Long Article Card (Large Spanning) */}
        <motion.article 
          variants={item}
          className="md:col-span-8 flex flex-col md:flex-row gap-10 p-10 rounded-[3rem] bg-surface-container-low hover:bg-surface-container transition-all group border border-outline-variant/10"
        >
          <div className="w-full md:w-1/2 aspect-video md:aspect-square rounded-[2rem] overflow-hidden bg-surface-container-highest">
            <img alt="Taxes" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=1000" />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <span className="text-secondary font-black text-[10px] uppercase tracking-[0.3em] mb-6">Taxes & Compliance</span>
            <h2 className="text-3xl font-black text-on-surface leading-tight mb-6 group-hover:text-secondary transition-colors tracking-tighter">
              O Labirinto do Simples Nacional: Anexo III vs V.
            </h2>
            <p className="text-on-surface-variant text-sm font-medium leading-relaxed mb-8">
              Entenda o Fator R e como ele pode reduzir sua carga tributária de 15,5% para apenas 6% legalmente.
            </p>
            <div className="flex items-center gap-3 text-on-surface font-black text-[10px] uppercase tracking-[0.2em]">
              <span>Ler análise completa</span>
              <MaterialSymbol name="arrow_forward" className="text-lg text-secondary" />
            </div>
          </div>
        </motion.article>

        {/* Small Card 1 */}
        <motion.article 
          variants={item}
          className="md:col-span-4 p-10 rounded-[3rem] bg-surface-container-high hover:bg-surface-container-highest transition-all group border border-outline-variant/10"
        >
          <span className="text-secondary font-black text-[10px] uppercase tracking-[0.3em] mb-6 block">Carreira</span>
          <h3 className="text-2xl font-black text-on-surface leading-tight mb-6 group-hover:text-secondary tracking-tighter transition-colors">
            Negociando como PJ: Guia de Valor.
          </h3>
          <p className="text-on-surface-variant text-sm font-medium leading-relaxed mb-8">
            Como converter seu salário CLT em uma tarifa horária competitiva sem perder margem.
          </p>
          <div className="mt-auto pt-6 border-t border-outline-variant/10 flex justify-between items-center text-[10px] text-on-surface-variant font-black uppercase tracking-widest">
            <span>5 min leitura</span>
            <span>12 Out 2024</span>
          </div>
        </motion.article>

        {/* Small Card 2 */}
        <motion.article 
          variants={item}
          className="md:col-span-4 p-10 rounded-[3rem] bg-surface-container-low hover:bg-surface-container transition-all group border-l-8 border-secondary border-y border-r border-outline-variant/10"
        >
          <span className="text-secondary font-black text-[10px] uppercase tracking-[0.3em] mb-6 block">Checklist</span>
          <h3 className="text-2xl font-black text-on-surface leading-tight mb-6 group-hover:text-secondary tracking-tighter transition-colors">
            Documentação para Abrir sua ME.
          </h3>
          <p className="text-on-surface-variant text-sm font-medium leading-relaxed mb-8">
            De contrato social a certificados digitais: tudo o que você precisa para começar hoje.
          </p>
          <div className="mt-auto pt-6 border-t border-outline-variant/10 flex justify-between items-center text-[10px] text-on-surface-variant font-black uppercase tracking-widest">
            <span>8 min leitura</span>
            <span>10 Out 2024</span>
          </div>
        </motion.article>

        {/* Medium Article Card (Asymmetric Layout) */}
        <motion.article 
          variants={item}
          className="md:col-span-8 relative rounded-[3rem] overflow-hidden bg-primary p-16 flex flex-col justify-end min-h-[450px] premium-gradient"
        >
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
            <img alt="Architecture" className="w-full h-full object-cover grayscale" src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" />
          </div>
          <div className="relative z-10">
            <span className="text-secondary font-black text-[10px] uppercase tracking-[0.3em] mb-6 block">Fiscal Intelligence</span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-8 max-w-2xl tracking-tighter">
              A Matemática da Liberdade: Além do Salário Líquido.
            </h2>
            <div className="flex items-center gap-8">
              <button className="px-10 py-4 bg-secondary text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-2xl shadow-secondary/20">
                Acessar Estudo Premium
              </button>
              <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Acesso Exclusivo</span>
            </div>
          </div>
        </motion.article>
      </motion.section>

      {/* Newsletter Section (Editorial Treatment) */}
      <section className="max-w-7xl mx-auto px-6 mt-40">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-12 md:p-24 rounded-[4rem] flex flex-col md:flex-row items-center gap-16 shadow-[0_100px_150px_-50px_rgba(0,0,0,0.1)] border border-slate-50"
        >
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl md:text-7xl font-black text-on-surface tracking-tighter mb-8 leading-[0.9]">
              Mantenha-se <br/><span className="text-secondary">Arquitetonicamente</span> <br/>Informado.
            </h2>
            <p className="text-on-surface-variant text-xl leading-relaxed font-medium">
              Receba análises fiscais de alto nível e insights sobre o mercado PJ brasileiro.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <form className="space-y-6">
              <div className="relative">
                <input className="w-full px-8 py-7 bg-surface-container-low border-0 rounded-3xl text-on-surface focus:ring-2 focus:ring-secondary/20 transition-all placeholder:text-on-surface-variant/30 font-bold" placeholder="E-mail corporativo" type="email" />
                <button className="absolute right-3 top-3 bottom-3 px-10 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-800 transition-colors" type="submit">
                  Assinar
                </button>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/30 px-4">
                Privacidade garantida. Inteligência semanal.
              </p>
            </form>
          </div>
        </motion.div>
      </section>

      <footer className="py-20 text-center border-t border-outline-variant/10 mt-40">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-on-surface/20">© 2024 The Fiscal Architect. Inteligência que transforma burocracia em patrimônio.</p>
      </footer>
    </main>
  )
}