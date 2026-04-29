import Link from 'next/link'
import Image from 'next/image'
import { MaterialSymbol } from '@/components/MaterialSymbol'

export default function BlogPage() {
  return (
    <main className="pt-24 pb-20">
      {/* Hero Section: Featured Article */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="relative group overflow-hidden rounded-xl bg-surface-container-low min-h-[500px] flex items-end">
          <img alt="Financial Planning" className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYjRmIu3al10-JB3m5zt6ZFXLxHPoCEm3WTekvEYBDRBPIOsvwTH1jJr5W--_FQzGyY7X8hOd34kd1sTo6BwT1gvqi7uuy1Y2Ey46EjeGwZWBnOKd_iE7rsV8ry7bsI8xwVOvrR1n6zTCCTNUkdmbZks9wGJlSs96h3ZQBszJHLScNQL-gF0rs_nVOwkNtBU2i-6bwQ5jMkuWG0LYEXzu8qKt4gbNMFJjASWohu0lDVdMG8w_A7lW6GYoicJq24F7I7-BYaZ_9MUc" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          <div className="relative p-8 md:p-16 max-w-3xl">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-secondary-container text-on-secondary-fixed text-xs font-bold tracking-widest uppercase">
              Featured Analysis
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-50 leading-tight tracking-tighter mb-6">
              A Grande Migração: Transição de CLT para PJ em 2024.
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl font-light">
              Uma análise profunda sobre a viabilidade fiscal, benefícios ocultos e os riscos contratuais que você precisa considerar antes de assinar seu próximo contrato.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-amber-600">
                <img alt="Author" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4Ewg7Pnw4r5lVyTPYjxogjmxTMrJ4wA1iVeHrtGV7l1EUi1Y3K1xfvwOmetElJqOgFRpTEpdI0NUtAVGChmfv8BpdL1Mg1G_ram5P4W_sH9DpBwyyO-1Y_sAj_YXLztH03NpJKq6fIdBrPqazUZ0F8UNb2uGwHMXd6ATnZ63PEpddJ0YIx9tTUfHcQRmrsjUM_yAb6dXL94BsnnT_BMYbbSxEaGz8KFhH8NWolEpOEdjGzJJbOqh1WNEsF3BPPd6Ua8TAf8CONG4" />
              </div>
              <div>
                <p className="text-slate-100 font-bold text-sm">Ricardo S. Architect</p>
                <p className="text-slate-400 text-xs">Sócio Sênior de Estratégia Fiscal</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Categories & Filter Navigation */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap items-center gap-4 py-4 overflow-x-auto border-b border-outline-variant/10">
          <button className="px-6 py-2 rounded-full bg-primary text-on-primary font-bold text-sm tracking-wide">Tudo</button>
          <button className="px-6 py-2 rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-colors text-on-surface-variant font-medium text-sm tracking-wide">CLT vs PJ</button>
          <button className="px-6 py-2 rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-colors text-on-surface-variant font-medium text-sm tracking-wide">Impostos</button>
          <button className="px-6 py-2 rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-colors text-on-surface-variant font-medium text-sm tracking-wide">Carreira</button>
          <button className="px-6 py-2 rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-colors text-on-surface-variant font-medium text-sm tracking-wide">Planejamento</button>
          <button className="px-6 py-2 rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-colors text-on-surface-variant font-medium text-sm tracking-wide">Jurisprudência</button>
        </div>
      </section>
      {/* Editorial Grid Layout (Bento Style) */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Long Article Card (Large Spanning) */}
        <article className="md:col-span-8 flex flex-col md:flex-row gap-8 p-8 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all group">
          <div className="w-full md:w-1/2 aspect-video md:aspect-square rounded-lg overflow-hidden bg-surface-container-highest">
            <img alt="Taxes" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIG3Sw3WZw5SXSTkskU33yPvGPGjg78pIryVR4jd1-QbDdr0VQiKNwdqCMZJzI8vJxNY9hQvY1c951ncfMn7Blw5_1k-WxwLPaEADw-YIKpUzk3YIJd-O6QYDoqSNScX_ZaJCjL1bs7t-VLZu-3NBdO1JjIF3AP_JUrgmKEymKjB3hgsMIzz8-pSVLzTYSwG0kR0rCxzx7a5CdEewoy90yq7miJORtkaQp0LzK2-M7n-JEOpNto6LUssnyKssDIQKL1Cx4yTNzgak" />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest mb-4">Taxes & Compliance</span>
            <h2 className="text-2xl font-bold text-on-surface leading-tight mb-4 group-hover:text-secondary transition-colors">
              O Labirinto do Simples Nacional: Anexo III vs V.
            </h2>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
              Entenda o Fator R e como ele pode reduzir sua carga tributária de 15,5% para apenas 6% legalmente.
            </p>
            <div className="flex items-center gap-2 text-on-surface font-bold text-xs uppercase tracking-tighter">
              <span>Ler mais</span>
              <MaterialSymbol name="arrow_forward" className="text-sm" />
            </div>
          </div>
        </article>
        {/* Small Card 1 */}
        <article className="md:col-span-4 p-8 rounded-xl bg-surface-container-high hover:bg-surface-container-highest transition-all group">
          <span className="text-amber-600 font-bold text-xs uppercase tracking-widest mb-4 block">Carreira</span>
          <h3 className="text-xl font-bold text-on-surface leading-snug mb-4 group-hover:text-amber-600">
            Negociando como PJ: O Guia de Valor de Mercado.
          </h3>
          <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
            Como converter seu salário CLT em uma tarifa horária competitiva sem perder margem de lucro.
          </p>
          <div className="mt-auto pt-4 border-t border-outline-variant/20 flex justify-between items-center text-xs text-on-surface-variant font-medium">
            <span>5 min de leitura</span>
            <span>12 Out 2024</span>
          </div>
        </article>
        {/* Small Card 2 */}
        <article className="md:col-span-4 p-8 rounded-xl bg-surface-container-high hover:bg-surface-container-highest transition-all group border-l-4 border-secondary">
          <span className="text-secondary font-bold text-xs uppercase tracking-widest mb-4 block">Checklist</span>
          <h3 className="text-xl font-bold text-on-surface leading-snug mb-4 group-hover:text-secondary">
            Documentação Essencial para Abrir sua ME.
          </h3>
          <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
            De contrato social a certificados digitais: tudo o que você precisa para começar em 48 horas.
          </p>
          <div className="mt-auto pt-4 border-t border-outline-variant/20 flex justify-between items-center text-xs text-on-surface-variant font-medium">
            <span>8 min de leitura</span>
            <span>10 Out 2024</span>
          </div>
        </article>
        {/* Medium Article Card (Asymmetric Layout) */}
        <article className="md:col-span-8 relative rounded-xl overflow-hidden bg-primary p-12 flex flex-col justify-end min-h-[350px]">
          <div className="absolute inset-0 opacity-20">
            <img alt="Architecture" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvwKw8EK2wnCPXQPJLooT8f9_xCCWM6tPWokN_yHDZqDpED-unXhzZ_UK_QeaVmT1Py8TTmOGLyZDymLapX6ryxdOWTJGomvHfqP94Mcx1d3lKbA6y6koy4UCm6pIZVHfggJMM1u3bdqzA5af0JSW2n0mX247hocQ8HkjUr7ebLmfJ8YDpT7ZU3GnFR18Of28A5znUxD4NgHhKjLkO8Ja4LwiOTSgoxU0hMebdLnV5XU2PuAxVxJHa1OHNbDyY1LdGFqwuAOhwntQ" />
          </div>
          <div className="relative z-10">
            <span className="text-secondary-fixed-dim font-black text-xs uppercase tracking-[0.2em] mb-4 block">Fiscal Intelligence</span>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6 max-w-xl">
              A Matemática da Liberdade: Por que o salário líquido não é tudo.
            </h2>
            <div className="flex items-center gap-6">
              <button className="px-8 py-3 bg-secondary text-white font-bold rounded-xl text-xs uppercase tracking-widest hover:scale-105 transition-transform">
                Acessar Estudo
              </button>
              <span className="text-white/60 text-xs">Exclusivo para assinantes Fiscal Architect</span>
            </div>
          </div>
        </article>
      </section>
      {/* Newsletter Section (Editorial Treatment) */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <div className="bg-surface-container-lowest p-12 md:p-24 rounded-xl flex flex-col md:flex-row items-center gap-12 border-l-8 border-secondary">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-black text-on-surface tracking-tighter mb-6 leading-none">
              Mantenha-se <br/><span className="text-secondary">Arquitetonicamente</span> <br/>Informado.
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed font-light">
              Receba análises fiscais de alto nível e insights sobre o mercado PJ brasileiro diretamente na sua caixa de entrada, toda terça-feira.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <form className="flex flex-col gap-4">
              <div className="relative">
                <input className="w-full px-6 py-5 bg-surface-container-high border-0 rounded-xl text-on-surface focus:ring-2 focus:ring-secondary transition-all placeholder:text-on-surface-variant/50" placeholder="Seu melhor e-mail corporativo" type="email" />
                <button className="absolute right-3 top-3 bottom-3 px-6 bg-primary text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors" type="submit">
                  Assinar
                </button>
              </div>
              <p className="text-[10px] text-on-surface-variant px-2">
                Respeitamos sua privacidade. Sem spam, apenas inteligência fiscal.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}