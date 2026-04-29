import Link from 'next/link'
import { MaterialSymbol } from './MaterialSymbol'

export function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-slate-950/60 backdrop-blur-xl">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 h-20">
        <Link href="/" className="text-xl font-bold tracking-tighter text-slate-50">
          Calculadora CLT x CNPJ
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/calculator" className="text-amber-500 font-semibold border-b-2 border-amber-600 pb-1">
            Calculadora
          </Link>
          <Link href="/blog" className="text-slate-400 hover:text-slate-100 transition-colors hover:text-amber-500 transition-all">
            Recursos
          </Link>
          <Link href="/app" className="text-slate-400 hover:text-slate-100 transition-colors hover:text-amber-500 transition-all">
            Baixar App
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-slate-50 bg-amber-600 px-6 py-2 rounded-xl font-semibold scale-95 duration-200 ease-in-out hover:bg-amber-500">
            Entrar
          </button>
        </div>
      </nav>
    </header>
  )
}