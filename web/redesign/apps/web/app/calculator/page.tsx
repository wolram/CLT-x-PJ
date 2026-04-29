import Link from 'next/link'
import Image from 'next/image'
import { MaterialSymbol } from '@/components/MaterialSymbol'

export default function CalculatorPage() {
  return (
    <main className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Article Content */}
        <article className="lg:col-span-8">
          {/* Hero Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Carreira & PJ</span>
              <span className="text-on-surface-variant text-sm flex items-center gap-2">
                <MaterialSymbol name="calendar_today" className="text-sm" />
                14 de Outubro, 2024
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-on-surface mb-8 leading-[1.1]">
              Como negociar seu primeiro contrato PJ
            </h1>
            <p className="text-xl text-on-surface-variant leading-relaxed mb-10 border-l-4 border-secondary pl-6">
              A transição de CLT para PJ exige mais do que apenas uma mudança de contrato; exige uma mentalidade de arquiteto financeiro para garantir que sua liberdade venha acompanhada de segurança.
            </p>
            <div className="aspect-[21/9] rounded-full overflow-hidden mb-12 relative">
              <img alt="Professional negotiation" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmEa_-CUonOjPeMEFj2yDaWSpHd1HdfnHv4WHExSFRZNP9hGSedqJbjdZU69dvSV8T4QQJt9O-EjG9av9BW8EhJVWZoXGSMd_KJSRkN9ImTOv_O8FumwcSxbJzay-7dOHD0ToE9rU82kWSWCp8N2EL2YkQ19y9dCfBqOjnClg-qZHxr3be6XNWUhQ26OVTKZic_z5lS9RCDlLx-NnAqTR0K6JhlVreoColXWosIC1dvdOZ3NQk6Si8qc3xjgA25_9KQmUJKpXc8x4" />
            </div>
          </header>
          {/* Body Text */}
          <div className="space-y-8 text-lg leading-relaxed text-on-surface-variant">
            <p>
              A primeira proposta de contrato PJ costuma ser um misto de empolgação e medo. Para muitos profissionais, o valor bruto parece astronômico comparado ao salário CLT, mas sem o suporte de um &quot;arquiteto fiscal&quot;, é fácil cair em armadilhas de fluxo de caixa e impostos mal calculados.
            </p>
            <h2 className="text-3xl font-bold text-on-surface tracking-tight pt-4">1. O Valor da Hora não é o seu Salário</h2>
            <p>
              Diferente do CLT, onde o custo do seu trabalho é diluído em benefícios e encargos pagos pela empresa, no PJ você é a sua própria empresa. Ao negociar, você deve considerar o custo de férias, 13º salário, FGTS e, principalmente, a sua previdência privada. 
            </p>
            <div className="bg-surface-container-low p-8 rounded-full border-l-4 border-secondary my-10">
              <p className="text-on-surface italic font-medium">
                &quot;Uma regra de ouro no mercado brasileiro: seu faturamento bruto PJ deve ser, no mínimo, 60% a 70% superior ao seu antigo salário líquido CLT para manter o mesmo padrão de vida e segurança.&quot;
              </p>
            </div>
            <h2 className="text-3xl font-bold text-on-surface tracking-tight pt-4">2. Flexibilidade como Moeda de Troca</h2>
            <p>
              Se a empresa não consegue chegar no valor financeiro que você arquitetou, use a natureza do contrato PJ a seu favor. Você pode negociar menos horas semanais, entregas por projeto ou a possibilidade de atender outros clientes simultaneamente.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
              <div className="bg-surface-container-high p-8 rounded-xl">
                <MaterialSymbol name="gavel" className="text-secondary text-4xl mb-4" />
                <h3 className="text-xl font-bold text-on-surface mb-2">Cláusulas de Rescisão</h3>
                <p className="text-sm">Sempre negocie um aviso prévio de 30 a 60 dias. Sem a proteção do FGTS, o tempo é seu único seguro-desemprego.</p>
              </div>
              <div className="bg-surface-container-high p-8 rounded-xl">
                <MaterialSymbol name="payments" className="text-secondary text-4xl mb-4" />
                <h3 className="text-xl font-bold text-on-surface mb-2">Reajustes Anuais</h3>
                <p className="text-sm">Garanta que o contrato preveja reajuste automático por índices como IPCA ou IGPM para proteger seu poder de compra.</p>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-on-surface tracking-tight pt-4">3. A Anatomia do Contrato Perfeito</h2>
            <p>
              Não aceite contratos genéricos. Cada detalhe deve ser desenhado para sua proteção. Verifique se o escopo de trabalho está bem definido para evitar o &quot;escopo creeping&quot; (quando pedem mais do que o contratado sem pagar extra).
            </p>
            <div className="my-12">
              <img alt="Document and pen" className="w-full h-80 object-cover rounded-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJeBByGwkQNadv6XK-CMhenVfCLnNXcLK1UQIGBhYpwmGD7r_zy1NwCt5sUEv9Mnn-OK3EblXMaCaKpDyWGSqDyGnyeyHsEp_oF3R8iP8yFWOl_JPXjNc35MuNghKFqD6tXTmlRS1e44ng-pxMFhtbe2qmQLiGcYEzCFOlKQDHb3UUcuaEOlr2CtaGbNLlpoM8SzTb_lp9pPMPcJViS4JKyNa921-W8Nzv066Si4XYU44bsPLV7xuofGOtpL5FNOdTu5VbZlq4s_4" />
            </div>
            <p>
              Lembre-se: em uma negociação PJ, você não é um funcionário pedindo um favor, mas um prestador de serviço oferecendo uma solução estratégica. O tom deve ser de parceria comercial, não de subordinação.
            </p>
          </div>
          {/* Tags & Share */}
          <footer className="mt-16 pt-8 border-t border-outline-variant flex flex-wrap justify-between items-center gap-4">
            <div className="flex gap-2">
              <span className="text-xs bg-surface-container text-on-tertiary-container px-3 py-1 rounded-full">#Negociação</span>
              <span className="text-xs bg-surface-container text-on-tertiary-container px-3 py-1 rounded-full">#CarreiraPJ</span>
              <span className="text-xs bg-surface-container text-on-tertiary-container px-3 py-1 rounded-full">#Finanças</span>
            </div>
            <div className="flex gap-4">
              <button className="text-on-surface-variant hover:text-secondary transition-colors">
                <MaterialSymbol name="share" />
              </button>
              <button className="text-on-surface-variant hover:text-secondary transition-colors">
                <MaterialSymbol name="bookmark" />
              </button>
            </div>
          </footer>
        </article>
        {/* Sidebar CTA & Extras */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Calculator CTA */}
          <div className="sticky top-28 bg-primary-container text-on-primary rounded-xl p-8 overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-slate-50 mb-4 tracking-tight">Não negocie no escuro.</h3>
              <p className="text-on-primary-container mb-8 text-sm leading-relaxed">
                Use nossa calculadora exclusiva para descobrir exatamente quanto você deve pedir no seu contrato PJ para superar seu salário atual.
              </p>
              <Link href="/calculator" className="block w-full bg-gradient-to-br from-secondary to-secondary-container text-on-secondary text-center py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:scale-[1.02] transition-transform">
                Acessar Calculadora
              </Link>
            </div>
            {/* Abstract Background Shape */}
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-secondary opacity-20 rounded-full blur-3xl"></div>
          </div>
          {/* Related Posts */}
          <div className="bg-surface-container-low p-8 rounded-xl">
            <h4 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
              <MaterialSymbol name="trending_up" className="text-secondary" />
              Mais Lidos
            </h4>
            <ul className="space-y-6">
              <li className="group cursor-pointer">
                <Link href="#" className="block">
                  <span className="text-xs text-secondary font-bold uppercase tracking-widest mb-1 block">Impostos</span>
                  <h5 className="font-bold text-on-surface group-hover:text-secondary transition-colors leading-tight">Como escolher o CNAE correto para pagar menos impostos</h5>
                </Link>
              </li>
              <li className="group cursor-pointer">
                <Link href="#" className="block">
                  <span className="text-xs text-secondary font-bold uppercase tracking-widest mb-1 block">Planejamento</span>
                  <h5 className="font-bold text-on-surface group-hover:text-secondary transition-colors leading-tight">A reserva de emergência ideal para quem é PJ</h5>
                </Link>
              </li>
              <li className="group cursor-pointer">
                <Link href="#" className="block">
                  <span className="text-xs text-secondary font-bold uppercase tracking-widest mb-1 block">Direito</span>
                  <h5 className="font-bold text-on-surface group-hover:text-secondary transition-colors leading-tight">O que não pode faltar no seu contrato de prestação de serviços</h5>
                </Link>
              </li>
            </ul>
          </div>
          {/* Newsletter */}
          <div className="bg-surface-container-highest p-8 rounded-xl border border-white/20">
            <h4 className="text-lg font-bold text-on-surface mb-2">Newsletter</h4>
            <p className="text-sm text-on-surface-variant mb-6">Receba pílulas de inteligência fiscal toda segunda-feira.</p>
            <div className="space-y-3">
              <input className="w-full bg-surface-bright border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary/50" placeholder="seu@email.com" type="email" />
              <button className="w-full bg-on-surface text-surface-container-lowest py-3 rounded-xl text-sm font-bold uppercase tracking-widest">Inscrever-se</button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}