import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-slate-950 w-full py-12 px-6 border-t-0 tonal-shift">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-sm font-bold text-slate-300">
            The Fiscal Architect
          </div>
          <p className="font-sans text-xs leading-relaxed text-slate-500 opacity-80">
            © 2024 The Fiscal Architect. Todos os direitos reservados.
          </p>
        </div>
        <div className="flex gap-8">
          <Link href="#" className="font-sans text-xs leading-relaxed text-slate-500 hover:text-slate-300 transition-colors opacity-80 hover:opacity-100">
            Privacidade
          </Link>
          <Link href="#" className="font-sans text-xs leading-relaxed text-slate-500 hover:text-slate-300 transition-colors opacity-80 hover:opacity-100">
            Termos de Uso
          </Link>
          <Link href="#" className="font-sans text-xs leading-relaxed text-slate-500 hover:text-slate-300 transition-colors opacity-80 hover:opacity-100">
            FAQ
          </Link>
          <Link href="#" className="font-sans text-xs leading-relaxed text-slate-500 hover:text-slate-300 transition-colors opacity-80 hover:opacity-100">
            Suporte
          </Link>
        </div>
        <div className="flex gap-4">
          <button className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-amber-600 hover:bg-slate-800 transition-all cursor-pointer">
            <span className="material-symbols-outlined">share</span>
          </button>
          <button className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-amber-600 hover:bg-slate-800 transition-all cursor-pointer">
            <span className="material-symbols-outlined">mail</span>
          </button>
        </div>
      </div>
    </footer>
  )
}