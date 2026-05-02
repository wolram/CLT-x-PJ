'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { MaterialSymbol } from './MaterialSymbol'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet'

const routes = [
  { label: 'Calculadora', href: '/calculator' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Blog', href: '/blog' },
  { label: 'App', href: '/app' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={cn(
      "fixed top-0 w-full z-[100] transition-all duration-500",
      scrolled ? "py-4" : "py-8"
    )}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={cn(
          "flex justify-between items-center px-8 h-20 rounded-[2.5rem] transition-all duration-500",
          scrolled ? "glass-nav shadow-2xl shadow-primary/5" : "bg-transparent"
        )}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <MaterialSymbol name="architecture" className="text-white text-2xl" />
            </div>
            <span className="text-xl font-black tracking-tighter text-on-surface">
              Fiscal<span className="text-secondary">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {routes.map((route) => (
              <Link 
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-bold uppercase tracking-widest transition-colors",
                  pathname === route.href
                    ? "text-secondary"
                    : "text-on-surface/60 hover:text-secondary"
                )}
              >
                {route.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <Button
              render={<Link href="/dashboard" />}
              variant="ghost"
              className="text-on-surface/40 hover:text-on-surface"
            >
              Entrar
            </Button>
            <Button
              render={<Link href="/calculator" />}
              className="bg-secondary hover:bg-secondary/90 text-on-secondary font-black uppercase tracking-widest text-[10px] shadow-xl shadow-secondary/20"
            >
              Simulação Grátis
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon-sm">
                    <MaterialSymbol name="menu" className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                }
              />
              <SheetContent side="right" className="w-72">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 mt-6">
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={cn(
                        "px-4 py-3 rounded-lg font-bold uppercase tracking-widest text-sm transition-all",
                        pathname === route.href
                          ? "bg-secondary/10 text-secondary border border-secondary/20"
                          : "text-on-surface/60 hover:bg-surface-container hover:text-on-surface"
                      )}
                    >
                      {route.label}
                    </Link>
                  ))}
                  <div className="mt-4 flex flex-col gap-2 border-t border-outline/10 pt-4">
                    <Button
                      render={<Link href="/dashboard" />}
                      variant="outline"
                      className="w-full"
                    >
                      Entrar
                    </Button>
                    <Button
                      render={<Link href="/calculator" />}
                      className="w-full bg-secondary hover:bg-secondary/90 text-on-secondary font-black uppercase tracking-widest text-xs"
                    >
                      Simulação Grátis
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
