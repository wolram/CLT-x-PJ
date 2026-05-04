import Link from 'next/link'
import { MaterialSymbol } from '@/components/MaterialSymbol'

export default function AppPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-surface-container-lowest overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold uppercase tracking-widest mb-6">
              Lançamento Mobile
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter leading-[1.1] mb-6">
              A arquitetura do seu <span className="text-secondary">sucesso financeiro</span>.
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed mb-10">
              Mude de CLT para PJ com segurança. Tenha o controle total das suas deduções, impostos e rentabilidade real na palma da sua mão.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button className="flex items-center gap-3 bg-primary text-on-primary px-8 py-4 rounded-xl shadow-lg hover:opacity-90 transition-all">
                <MaterialSymbol name="ios" className="text-2xl" />
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold tracking-widest leading-none">Download on the</div>
                  <div className="text-xl font-bold leading-tight">App Store</div>
                </div>
              </button>
              <button className="flex items-center gap-3 bg-primary text-on-primary px-8 py-4 rounded-xl shadow-lg hover:opacity-90 transition-all">
                <MaterialSymbol name="play_arrow" className="text-2xl" />
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold tracking-widest leading-none">Get it on</div>
                  <div className="text-xl font-bold leading-tight">Google Play</div>
                </div>
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]"></div>
            <div className="relative z-10 p-4">
              <img alt="App Interface" className="rounded-[3rem] shadow-2xl border-[12px] border-on-surface ring-4 ring-outline-variant/20 mx-auto w-full max-w-[320px]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBswPsXjH2yxLW6Nen4YYRy5eDjb82q9OuHfnc1KaDDNkmIxDlV6hSMpZmhEaZg7-jK_FqYHUcxm0Tvo1xOpTyElQIBJeXFskVXLKFTFBasFM15ovWkcydOLaJcYHe-zGtVu5mC43xs4qrndNWxYw89G06yYygqUGh0GrzIRb7JQKNUEaSG51SZ5QcZ7uYNhvm2J9VaPQn6Og2ImAo7K0PQOQsViG9fUzO7bEtfyIlt2J9sbifBuoUO8l8D5C5i8Lh-dC4FO56e7aY" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-24 px-6 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-on-surface mb-4">Ferramentas de precisão fiscal</h2>
            <p className="text-on-surface-variant">Construímos as ferramentas necessárias para você não apenas calcular, mas arquitetar seu futuro profissional.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px]">
            {/* History Card */}
            <div className="md:col-span-8 bg-surface-container-lowest rounded-full p-10 flex flex-col justify-end relative overflow-hidden">
              <div className="absolute top-10 right-10 flex flex-col gap-2">
                <div className="bg-surface-container h-12 w-48 rounded-lg flex items-center px-4 gap-3">
                  <MaterialSymbol name="history" className="text-secondary" />
                  <div className="h-2 w-24 bg-outline-variant rounded-full"></div>
                </div>
                <div className="bg-surface-container-high h-12 w-48 rounded-lg flex items-center px-4 gap-3 translate-x-4">
                  <MaterialSymbol name="history" className="text-secondary" />
                  <div className="h-2 w-20 bg-outline-variant rounded-full"></div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Histórico Inteligente</h3>
                <p className="text-on-surface-variant max-w-md">Salve suas simulações e compare diferentes propostas contratuais ao longo do tempo sem perder nenhum detalhe.</p>
              </div>
            </div>
            {/* Notification Card */}
            <div className="md:col-span-4 bg-secondary-container text-on-secondary-container rounded-full p-10 flex flex-col justify-center items-center text-center">
              <MaterialSymbol name="notifications_active" className="text-5xl mb-6" style={{fontVariationSettings: "'FILL' 1"}} />
              <h3 className="text-2xl font-bold mb-2">Alertas Fiscais</h3>
              <p className="opacity-90">Nunca mais perca um prazo de pagamento de DAS ou emissão de nota fiscal com notificações push inteligentes.</p>
            </div>
            {/* PDF Report Card */}
            <div className="md:col-span-4 bg-surface-container-highest rounded-full p-10 flex flex-col justify-between overflow-hidden relative">
              <MaterialSymbol name="picture_as_pdf" className="text-7xl text-primary/10 absolute -top-4 -right-4" />
              <div className="mt-auto">
                <h3 className="text-2xl font-bold mb-2">Relatórios PDF</h3>
                <p className="text-on-surface-variant">Gere propostas profissionais em PDF para apresentar em suas negociações, com gráficos e detalhamento técnico.</p>
              </div>
            </div>
            {/* Comparison Card */}
            <div className="md:col-span-8 bg-primary text-on-primary rounded-full p-10 flex items-center gap-12 overflow-hidden">
              <div className="hidden lg:block shrink-0">
                <div className="flex flex-col gap-4">
                  <div className="w-32 h-16 bg-on-primary-fixed rounded-xl flex flex-col justify-center items-center">
                    <span className="text-[10px] uppercase font-bold text-on-primary-fixed-variant">CLT</span>
                    <span className="text-lg font-black tabular-nums">R$ 8.5k</span>
                  </div>
                  <div className="w-32 h-16 bg-secondary rounded-xl flex flex-col justify-center items-center translate-x-8">
                    <span className="text-[10px] uppercase font-bold text-on-secondary-fixed">PJ</span>
                    <span className="text-lg font-black tabular-nums">R$ 14.2k</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Comparativo Lado a Lado</h3>
                <p className="text-on-primary-container leading-relaxed">Visualize instantaneamente a diferença real entre o salário bruto e líquido em cada regime de contratação com precisão matemática.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Preview / Mockup Section */}
      <section className="py-24 px-6 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-20">
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-on-surface mb-8 tracking-tight">O poder de um escritório de contabilidade <span className="text-secondary">no seu bolso</span>.</h2>
            <ul className="space-y-8">
              <li className="flex gap-6">
                <div className="shrink-0 w-12 h-12 rounded-full bg-surface-container flex items-center justify-center">
                  <MaterialSymbol name="calculate" className="text-secondary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Cálculo de Imposto Progressivo</h4>
                  <p className="text-on-surface-variant">Simule o IRPF, INSS e alíquotas do Simples Nacional de forma automatizada conforme a legislação atualizada.</p>
                </div>
              </li>
              <li className="flex gap-6">
                <div className="shrink-0 w-12 h-12 rounded-full bg-surface-container flex items-center justify-center">
                  <MaterialSymbol name="account_balance_wallet" className="text-secondary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Gestão de Benefícios</h4>
                  <p className="text-on-surface-variant">Adicione VR, VT, Planos de Saúde e outros benefícios para um cálculo de custo total empresa vs benefício real.</p>
                </div>
              </li>
              <li className="flex gap-6">
                <div className="shrink-0 w-12 h-12 rounded-full bg-surface-container flex items-center justify-center">
                  <MaterialSymbol name="query_stats" className="text-secondary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Análise de Break-even</h4>
                  <p className="text-on-surface-variant">Descubra exatamente qual o valor mínimo que você deve cobrar como PJ para manter o seu padrão de vida CLT.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex-1 relative flex justify-center">
            <div className="w-full aspect-square bg-slate-100 rounded-[4rem] flex items-center justify-center overflow-hidden">
              <img alt="Financial App Usage" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtnbVORrKxCXop3tB0cwinSVYIeotjRmevBKcIL0-6A-aPdjKtSBQLD7cCFOs_0zXkCNL2c6hBVG1baQZz0fhuTaStRQyegc5FLXVrJTmFGKlot7Em8PVEdkp065-Wv5Vq5IPQ0Qvc1oYJNKGUavyeXwsivd-ixf2TzvmZW_KbST-jP0bbbC_vLG1agZeC-SFqAJp2ljEjAbgJbdmvI7P2zYhP4hAdbblXi4lxdvAIPWdvxOmZaVKly7vq6tWNy-6TtxkKGKIqyWo" />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto bg-primary text-on-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">Pronto para ser o seu próprio arquiteto?</h2>
            <p className="text-lg text-on-primary-container mb-12 max-w-2xl mx-auto">
              Junte-se a milhares de profissionais que já otimizaram sua carreira com a ferramenta mais precisa do mercado brasileiro.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="bg-secondary text-on-secondary px-10 py-5 rounded-full font-bold text-lg hover:bg-secondary/90 transition-all flex items-center gap-3">
                <MaterialSymbol name="download" />
                Baixar Agora
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}