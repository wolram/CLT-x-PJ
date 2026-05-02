import type { Metadata } from 'next'
import { Inter, Geist } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Calculadora CLT x CNPJ | The Fiscal Architect',
  description: 'Descubra a melhor opção para sua carreira: CLT ou PJ. Análise completa com metodologia архитектура fiscal.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={cn("light", "font-sans", geist.variable)}>
      <body className={`${inter.variable} font-body selection:bg-secondary-fixed selection:text-on-secondary-fixed`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}