import Link from 'next/link'
import Image from 'next/image'
import { MaterialSymbol } from '@/components/MaterialSymbol'

export default function HomePage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[921px] flex items-center overflow-hidden bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-8 py-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-fixed text-on-secondary-fixed text-xs font-bold uppercase tracking-widest rounded-full">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              Atualizado 2024
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-on-surface leading-[0.95] tracking-tighter">
              A clareza que seu <span className="text-secondary">patrimônio</span> exige.
            </h1>
            <p className="text-on-surface-variant text-xl leading-relaxed max-w-xl">
              Deixe de lado as planilhas confusas. Projetamos uma arquitetura fiscal premium para você decidir entre CLT e PJ com a autoridade de um especialista.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/calculator" className="bg-primary text-on-primary px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest bg-gradient-to-br from-primary to-primary-container shadow-2xl shadow-primary/20 flex items-center gap-2 hover:opacity-90 transition-all">
                Começar Simulação Completa
                <MaterialSymbol name="arrow_forward" className="text-xl" />
              </Link>
              <button className="px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest text-on-surface border-2 border-outline-variant/15 hover:bg-surface-container-low transition-colors">
                Ver Metodologia
              </button>
            </div>
          </div>
          {/* Quick Simulation Widget */}
          <div className="lg:col-span-5 relative">
            <div className="bg-surface-container-low p-8 rounded-full shadow-2xl shadow-on-surface/5 relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Simulação Rápida</h3>
                <MaterialSymbol name="speed" className="text-secondary text-2xl" />
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Salário Mensal Bruto (R$)</label>
                  <div className="bg-surface-container-high rounded-xl p-4 transition-all focus-within:bg-surface-bright group relative">
                    <input className="no-border-input bg-transparent w-full text-2xl font-black text-on-surface tabular-nums" type="text" defaultValue="15.000,00" />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-focus-within:w-full transition-all duration-300"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-primary-fixed rounded-xl border-l-4 border-primary">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-on-primary-fixed-variant block mb-1">Líquido CLT</span>
                    <span className="text-xl font-black text-on-primary-fixed tabular-nums">R$ 11.240</span>
                  </div>
                  <div className="p-6 bg-secondary-fixed rounded-xl border-l-4 border-secondary">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-fixed-variant block mb-1">Líquido PJ</span>
                    <span className="text-xl font-black text-on-secondary-fixed tabular-nums">R$ 13.820</span>
                  </div>
                </div>
                <div className="bg-surface-container-highest p-6 rounded-xl relative overflow-hidden">
                  <div className="relative z-10 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-secondary block">Diferença Anual</span>
                      <span className="text-3xl font-black text-on-surface tabular-nums">R$ 30.960</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-secondary">+23%</span>
                      <span className="block text-[10px] uppercase text-on-surface-variant">em PJ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative back element */}
          <div className="absolute -top-6 -right-6 w-full h-full bg-secondary/5 rounded-full -z-0 rotate-3"></div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-12">Utilizado por profissionais das maiores Techs do Brasil</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            {['NUBANK', 'IFOOD', 'Loggi', 'QUITO', 'HOTMART'].map((company) => (
              <div key={company} className="h-8 w-32 flex items-center justify-center font-black text-2xl text-on-surface italic">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Insights */}
      <section className="py-32 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-secondary">Inteligência Fiscal</h2>
            <p className="text-4xl md:text-5xl font-black text-on-surface tracking-tight max-w-2xl">Mais do que números. Estratégia de carreira.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
            {/* Large Card */}
            <div className="md:col-span-8 bg-surface-container-low rounded-full p-12 flex flex-col justify-between relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">Metodologia &quot;Architect&quot;</h3>
                <p className="text-on-surface-variant text-lg max-w-md leading-relaxed">
                  Consideramos décimo terceiro, férias, benefícios, impostos municipais (ISS), DAS e contabilidade. Nada fica de fora da nossa análise.
                </p>
              </div>
              <div className="relative z-10 mt-8">
                <button className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest text-secondary group-hover:gap-4 transition-all">
                  Explorar Algoritmo
                  <MaterialSymbol name="chevron_right" />
                </button>
              </div>
            </div>
            {/* Small Card 1 */}
            <div className="md:col-span-4 bg-secondary-fixed rounded-full p-12 flex flex-col justify-center gap-6">
              <MaterialSymbol name="account_balance" className="text-4xl text-secondary" />
              <div>
                <h3 className="text-xl font-black text-on-secondary-fixed mb-2">Segurança Jurídica</h3>
                <p className="text-on-secondary-fixed-variant text-sm leading-relaxed">
                  Orientações baseadas nas leis vigentes para evitar riscos de pejotização indevida.
                </p>
              </div>
            </div>
            {/* Small Card 2 */}
            <div className="md:col-span-4 bg-primary-container rounded-full p-12 text-on-primary-fixed-variant flex flex-col justify-center gap-6">
              <MaterialSymbol name="monitoring" className="text-4xl text-on-primary-fixed" />
              <div>
                <h3 className="text-xl font-black text-on-primary-fixed mb-2">Simulação de Gastos</h3>
                <p className="text-sm leading-relaxed">
                  Projete gastos com plano de saúde e previdência privada para uma comparação real de poder de compra.
                </p>
              </div>
            </div>
            {/* Medium Card */}
            <div className="md:col-span-8 bg-surface-container-highest rounded-full p-12 flex items-center justify-between">
              <div className="max-w-sm">
                <h3 className="text-2xl font-bold mb-4">Exportação Premium</h3>
                <p className="text-on-surface-variant text-sm">
                  Gere um PDF executivo para apresentar em sua negociação salarial, detalhando cada centavo economizado.
                </p>
              </div>
              <div className="hidden md:block">
                <MaterialSymbol name="picture_as_pdf" className="text-6xl text-on-surface/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-surface-container-low overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-12 relative">
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter">Pronto para<br/>assumir o controle?</h2>
            <p className="text-on-surface-variant text-xl max-w-2xl mx-auto mt-6">Inicie sua transição com dados, não com suposições.</p>
            <div className="pt-10">
              <Link href="/calculator" className="bg-primary text-on-primary px-12 py-6 rounded-xl text-md font-bold uppercase tracking-widest bg-gradient-to-br from-primary to-primary-container shadow-2xl shadow-primary/20">
                Fazer Simulação Completa
              </Link>
            </div>
          </div>
          {/* Backdrop icon */}
          <MaterialSymbol name="calculate" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] text-on-surface/[0.02] pointer-events-none" />
        </div>
      </section>
    </main>
  )
}