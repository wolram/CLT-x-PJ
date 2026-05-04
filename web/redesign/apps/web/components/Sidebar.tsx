'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { MaterialSymbol } from './MaterialSymbol'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Dashboard', icon: 'dashboard', href: '/dashboard' },
  { name: 'Calculadora', icon: 'calculate', href: '/calculator' },
  { name: 'Educação', icon: 'menu_book', href: '/blog' },
  { name: 'Configurações', icon: 'settings', href: '/dashboard?section=config' },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (href: string) => {
    if (href.includes('?')) {
      return pathname === href.split('?')[0] && new URLSearchParams(href.split('?')[1]).has('section')
    }
    return pathname === href
  }

  const handleConfigClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push('/dashboard?section=config')
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col h-screen w-72 bg-slate-950 sticky top-0 shrink-0 z-[60]">
        <div className="flex flex-col h-full py-10">
          {/* Brand */}
          <div className="px-8 mb-12">
            <h1 className="text-xl font-black text-slate-50 uppercase tracking-[0.2em]">
              Fiscal<span className="text-secondary">.</span>
            </h1>
            <p className="text-slate-500 text-[10px] mt-1 tracking-widest uppercase font-bold">
              Architect Premium
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 px-4">
            {navItems.map((item) => {
              const itemClasses = cn(
                "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group"
              )

              if (item.href.includes('?')) {
                return (
                  <button
                    key={item.name}
                    onClick={handleConfigClick}
                    className={cn(
                      itemClasses,
                      "w-full justify-start cursor-pointer",
                      pathname === '/dashboard' && new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '').get('section') === 'config'
                        ? "bg-secondary/10 text-secondary border border-secondary/20 shadow-lg shadow-secondary/5"
                        : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-100"
                    )}
                  >
                    <MaterialSymbol
                      name={item.icon}
                      className={cn(
                        "transition-transform duration-300 group-hover:scale-110",
                        pathname === '/dashboard' && new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '').get('section') === 'config'
                          ? "text-secondary"
                          : "text-slate-500"
                      )}
                    />
                    <span className="text-sm font-bold uppercase tracking-widest">{item.name}</span>
                  </button>
                )
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    itemClasses,
                    isActive(item.href)
                      ? "bg-secondary/10 text-secondary border border-secondary/20 shadow-lg shadow-secondary/5"
                      : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-100"
                  )}
                >
                  <MaterialSymbol
                    name={item.icon}
                    className={cn(
                      "transition-transform duration-300 group-hover:scale-110",
                      isActive(item.href) ? "text-secondary" : "text-slate-500"
                    )}
                  />
                  <span className="text-sm font-bold uppercase tracking-widest">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* User / Upgrade */}
          <div className="px-6 mt-auto">
            <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[2rem] backdrop-blur-md">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-secondary-gradient flex items-center justify-center text-slate-50 font-bold text-sm shadow-lg">
                  MS
                </div>
                <div>
                  <p className="text-slate-100 text-xs font-bold">Marlow Sousa</p>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-tighter">
                    Membro Platinum
                  </p>
                </div>
              </div>
              <Button
                className="w-full bg-secondary-gradient hover:shadow-2xl hover:shadow-secondary/20 text-on-secondary text-[10px] font-black uppercase tracking-widest py-4 rounded-xl transition-all hover:scale-[1.02]"
              >
                Configurar IA
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Button variant="ghost" size="icon-sm" className="fixed bottom-6 right-6 z-40">
              <MaterialSymbol name="menu" className="h-5 w-5" />
              <span className="sr-only">Toggle navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col h-full py-6">
              {/* Brand */}
              <div className="px-6 mb-8">
                <h1 className="text-lg font-black text-slate-50 uppercase tracking-[0.2em]">
                  Fiscal<span className="text-secondary">.</span>
                </h1>
                <p className="text-slate-500 text-[10px] mt-1 tracking-widest uppercase font-bold">
                  Mobile Menu
                </p>
              </div>

              {/* Navigation */}
              <nav className="flex-1 space-y-2 px-2">
                {navItems.map((item) => {
                  const itemClasses = cn(
                    "flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 group"
                  )

                  if (item.href.includes('?')) {
                    return (
                      <button
                        key={item.name}
                        onClick={handleConfigClick}
                        className={cn(
                          itemClasses,
                          "w-full justify-start cursor-pointer",
                          pathname === '/dashboard' && new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '').get('section') === 'config'
                            ? "bg-secondary/10 text-secondary border border-secondary/20"
                            : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-100"
                        )}
                      >
                        <MaterialSymbol
                          name={item.icon}
                          className={cn(
                            "transition-transform duration-300 group-hover:scale-110",
                            pathname === '/dashboard' && new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '').get('section') === 'config'
                              ? "text-secondary"
                              : "text-slate-500"
                          )}
                        />
                        <span className="text-sm font-bold uppercase tracking-widest">{item.name}</span>
                      </button>
                    )
                  }

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        itemClasses,
                        isActive(item.href)
                          ? "bg-secondary/10 text-secondary border border-secondary/20"
                          : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-100"
                      )}
                    >
                      <MaterialSymbol
                        name={item.icon}
                        className={cn(
                          "transition-transform duration-300 group-hover:scale-110",
                          isActive(item.href) ? "text-secondary" : "text-slate-500"
                        )}
                      />
                      <span className="text-sm font-bold uppercase tracking-widest">{item.name}</span>
                    </Link>
                  )
                })}
              </nav>

              {/* User / Upgrade */}
              <div className="px-4 mt-auto">
                <div className="bg-slate-900/50 border border-white/5 p-4 rounded-xl backdrop-blur-md">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-secondary-gradient flex items-center justify-center text-slate-50 font-bold text-xs shadow-lg">
                      MS
                    </div>
                    <div>
                      <p className="text-slate-100 text-xs font-bold">Marlow Sousa</p>
                      <p className="text-slate-500 text-[9px] font-bold uppercase tracking-tighter">
                        Platinum
                      </p>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-secondary-gradient hover:shadow-lg hover:shadow-secondary/20 text-on-secondary text-[9px] font-black uppercase tracking-widest py-3 rounded-lg transition-all hover:scale-[1.02]"
                  >
                    Configurar IA
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
