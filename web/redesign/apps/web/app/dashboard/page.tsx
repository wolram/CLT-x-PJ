import Link from 'next/link'
import { MaterialSymbol } from '@/components/MaterialSymbol'

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen bg-surface-container-lowest">
      {/* SideNavBar Shell */}
      <aside className="hidden md:flex flex-col h-screen w-64 bg-slate-950 transition-transform duration-300 ease-out sticky top-0 shrink-0">
        <div className="flex flex-col h-full py-8">
          <div className="px-6 mb-12">
            <h1 className="text-lg font-black text-slate-50 uppercase tracking-widest">Fiscal Architect</h1>
            <p className="text-slate-400 text-[10px] mt-1 tracking-widest uppercase">Consultoria Premium</p>
          </div>
          <nav className="flex-1 space-y-1">
            <Link href="/calculator" className="flex items-center gap-4 text-amber-500 bg-slate-900/50 border-l-4 border-amber-600 px-4 py-3 font-sans text-sm uppercase tracking-widest">
              <MaterialSymbol name="calculate" />
              Calculadora
            </Link>
            <Link href="#" className="flex items-center gap-4 text-slate-400 px-4 py-3 hover:bg-slate-900/80 hover:text-slate-100 transition-all duration-300 font-sans text-sm uppercase tracking-widest">
              <MaterialSymbol name="history" />
              Histórico
            </Link>
            <Link href="/blog" className="flex items-center gap-4 text-slate-400 px-4 py-3 hover:bg-slate-900/80 hover:text-slate-100 transition-all duration-300 font-sans text-sm uppercase tracking-widest">
              <MaterialSymbol name="menu_book" />
              Educação
            </Link>
            <Link href="#" className="flex items-center gap-4 text-slate-400 px-4 py-3 hover:bg-slate-900/80 hover:text-slate-100 transition-all duration-300 font-sans text-sm uppercase tracking-widest">
              <MaterialSymbol name="settings" />
              Configurações
            </Link>
          </nav>
          <div className="px-6 mt-auto">
            <div className="bg-slate-900 p-4 rounded-xl border-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-slate-50 font-bold text-xs">JD</div>
                <div>
                  <p className="text-slate-100 text-xs font-bold">João Diniz</p>
                  <p className="text-slate-500 text-[10px]">Plano Free</p>
                </div>
              </div>
              <button className="w-full bg-amber-600 text-slate-50 text-[10px] font-black uppercase tracking-widest py-3 rounded-lg hover:bg-amber-500 transition-colors">
                Assinar Pro
              </button>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 min-w-0">
        {/* TopAppBar Navigation */}
        <header className="fixed top-0 w-full z-50 bg-slate-950/60 backdrop-blur-xl md:hidden">
          <div className="flex justify-between items-center px-6 h-20">
            <span className="text-xl font-bold tracking-tighter text-slate-50">Calculadora CLT x CNPJ</span>
            <button className="text-slate-50">
              <MaterialSymbol name="menu" />
            </button>
          </div>
        </header>
        <div className="pt-24 md:pt-12 px-6 md:px-12 max-w-7xl mx-auto pb-24">
          {/* Hero Header Section */}
          <section className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="text-on-surface text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                  Sua arquitetura <br/><span className="text-secondary">financeira otimizada.</span>
                </h2>
                <p className="text-on-surface-variant text-lg leading-relaxed max-w-lg">
                  Analisamos as nuances entre o modelo tradicional (CLT) e a agilidade empresarial (PJ). Descubra onde sua remuneração realmente performa melhor.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="bg-surface-container-low px-6 py-4 rounded-xl text-center">
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Dólar Hoje</p>
                  <p className="text-xl font-bold tabular-nums">R$ 5,12</p>
                </div>
                <div className="bg-secondary-container/10 px-6 py-4 rounded-xl text-center border-b-2 border-secondary">
                  <p className="text-[10px] uppercase tracking-widest text-secondary mb-1">Sugerido</p>
                  <p className="text-xl font-bold text-secondary">Modelo PJ</p>
                </div>
              </div>
            </div>
          </section>
          {/* Main Comparison Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            {/* CLT Column */}
            <div className="lg:col-span-6 flex flex-col gap-8">
              <div className="bg-surface-container-low rounded-xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary-container"></div>
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <span className="bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">Modelo Tradicional</span>
                    <h3 className="text-2xl font-bold">Consolidado (CLT)</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-on-surface-variant text-xs uppercase tracking-widest">Salário Bruto</p>
                    <p className="text-2xl font-bold tabular-nums">R$ 15.000,00</p>
                  </div>
                </div>
                <div className="space-y-6 mb-12">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-on-surface-variant">INSS (Teto)</span>
                    <span className="font-medium text-error tabular-nums">- R$ 908,85</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-on-surface-variant">IRRF (27,5%)</span>
                    <span className="font-medium text-error tabular-nums">- R$ 3.120,40</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-on-surface-variant">Benefícios (VR/VT/Saúde)</span>
                    <span className="font-medium text-secondary tabular-nums">+ R$ 1.800,00</span>
                  </div>
                </div>
                <div className="pt-8 border-t border-outline-variant/20">
                  <p className="text-on-surface-variant text-xs uppercase tracking-widest mb-2">Remuneração Líquida Estimada</p>
                  <p className="text-6xl font-black tracking-tighter tabular-nums">R$ 10.970,<span className="text-3xl">75</span></p>
                </div>
              </div>
              {/* CLT Pros/Cons */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-container rounded-xl p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                    <MaterialSymbol name="check_circle" className="text-sm" /> Vantagens
                  </p>
                  <ul className="text-sm space-y-3 text-on-surface-variant">
                    <li>13º Salário Garantido</li>
                    <li>Férias Remuneradas + 1/3</li>
                    <li>Estabilidade (FGTS/Aviso)</li>
                  </ul>
                </div>
                <div className="bg-surface-container rounded-xl p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-error mb-4 flex items-center gap-2">
                    <MaterialSymbol name="cancel" className="text-sm" /> Desvantagens
                  </p>
                  <ul className="text-sm space-y-3 text-on-surface-variant">
                    <li>Alta Carga Tributária</li>
                    <li>Menor Flexibilidade</li>
                    <li>Teto do INSS Limitado</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* PJ Column */}
            <div className="lg:col-span-6 flex flex-col gap-8">
              <div className="bg-surface-container-high rounded-xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <span className="bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">Modelo Empresarial</span>
                    <h3 className="text-2xl font-bold">Prestador (PJ)</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-on-surface-variant text-xs uppercase tracking-widest">Faturamento Bruto</p>
                    <p className="text-2xl font-bold tabular-nums">R$ 15.000,00</p>
                  </div>
                </div>
                <div className="space-y-6 mb-12">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-on-surface-variant">Simples Nac. (Anexo III)</span>
                    <span className="font-medium text-error tabular-nums">- R$ 900,00</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-on-surface-variant">Contabilidade + Taxas</span>
                    <span className="font-medium text-error tabular-nums">- R$ 350,00</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-on-surface-variant">Pró-labore (Mínimo)</span>
                    <span className="font-medium text-secondary-container tabular-nums">Retenção Zero*</span>
                  </div>
                </div>
                <div className="pt-8 border-t border-outline-variant/20">
                  <p className="text-on-surface-variant text-xs uppercase tracking-widest mb-2 text-secondary font-bold">Remuneração Líquida Estimada</p>
                  <p className="text-6xl font-black tracking-tighter tabular-nums text-secondary">R$ 13.750,<span className="text-3xl text-secondary/80">00</span></p>
                </div>
              </div>
              {/* PJ Pros/Cons */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-container-highest rounded-xl p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-4 flex items-center gap-2">
                    <MaterialSymbol name="rocket_launch" className="text-sm" /> Vantagens
                  </p>
                  <ul className="text-sm space-y-3 text-on-surface-variant">
                    <li>Maior Salário Líquido</li>
                    <li>Flexibilidade de Horário</li>
                    <li>Múltiplas Fontes de Renda</li>
                  </ul>
                </div>
                <div className="bg-surface-container-highest rounded-xl p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-error mb-4 flex items-center gap-2">
                    <MaterialSymbol name="warning" className="text-sm" /> Desvantagens
                  </p>
                  <ul className="text-sm space-y-3 text-on-surface-variant">
                    <li>Ausência de 13º e Férias</li>
                    <li>Custos de Saúde Próprios</li>
                    <li>Risco de Gestão Fiscal</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Visual Charts & Impact Section */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Tax Impact Visualization */}
            <div className="lg:col-span-2 bg-surface-container-low p-8 rounded-xl">
              <h4 className="text-xl font-bold mb-8">Distribuição de Encargos</h4>
              <div className="flex flex-col gap-12">
                <div className="space-y-4">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Custo Total CLT (Empresa)</span>
                    <span className="text-xl font-bold tabular-nums">R$ 25.800,00</span>
                  </div>
                  <div className="h-8 w-full bg-surface-container flex rounded-lg overflow-hidden">
                    <div className="h-full bg-primary-container flex items-center justify-center text-[10px] text-white font-bold" style={{width: '58%'}}>SALÁRIO LÍQUIDO</div>
                    <div className="h-full bg-error flex items-center justify-center text-[10px] text-white font-bold" style={{width: '25%'}}>IMPOSTOS</div>
                    <div className="h-full bg-amber-600 flex items-center justify-center text-[10px] text-white font-bold" style={{width: '17%'}}>BENEFÍCIOS</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Custo Total PJ (Contrato)</span>
                    <span className="text-xl font-bold tabular-nums">R$ 15.000,00</span>
                  </div>
                  <div className="h-8 w-full bg-surface-container flex rounded-lg overflow-hidden">
                    <div className="h-full bg-secondary flex items-center justify-center text-[10px] text-white font-bold" style={{width: '91%'}}>SALÁRIO LÍQUIDO</div>
                    <div className="h-full bg-error flex items-center justify-center text-[10px] text-white font-bold" style={{width: '9%'}}>IMPOSTOS</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Insights Card */}
            <div className="bg-slate-950 text-slate-50 p-8 rounded-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mb-6">
                  <MaterialSymbol name="lightbulb" />
                </div>
                <h4 className="text-xl font-bold mb-4 italic">O Veredito do Arquiteto</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  No faturamento de 15k, o modelo PJ oferece uma vantagem líquida de <span className="text-amber-500 font-bold">25.3%</span>. Para equiparar o CLT ao PJ neste nível, o salário bruto CLT precisaria ser de aproximadamente R$ 19.800,00.
                </p>
              </div>
              <Link href="/calculator" className="mt-8 flex items-center gap-2 text-amber-500 text-sm font-bold uppercase tracking-widest hover:gap-4 transition-all">
                Ver simulação completa <MaterialSymbol name="arrow_forward" />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </main>
  )
}