'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { MaterialSymbol } from '@/components/MaterialSymbol'
import { Sidebar } from '@/components/Sidebar'
import { FiscalCard } from '@/components/FiscalCard'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { calculateSimulation } from '@/lib/simulation'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { cn } from '@/lib/utils'

export default function DashboardPage() {
  const [grossMonthly, setGrossMonthly] = useState(15000)
  const [benefitsValue, setBenefitsValue] = useState(1800)
  const [simplesAliquota, setSimplesAliquota] = useState(6)

  const results = useMemo(() => 
    calculateSimulation(grossMonthly, benefitsValue, simplesAliquota), 
    [grossMonthly, benefitsValue, simplesAliquota]
  )

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)

  const formatPercentage = (val: number) => `${val.toFixed(1)}%`

  const handleBenefitsChange = (val: number | readonly number[]) => {
    const numVal = Array.isArray(val) ? val[0] : val
    setBenefitsValue(numVal as number)
  }

  const handleAliquotaChange = (val: number | readonly number[]) => {
    const numVal = Array.isArray(val) ? val[0] : val
    setSimplesAliquota(numVal as number)
  }

  // Chart data - Comparison
  const comparisonData = [
    {
      name: 'Bruto',
      CLT: results.clt.gross,
      PJ: results.pj.gross,
    },
    {
      name: 'Deduções',
      CLT: results.clt.inss + results.clt.irrf,
      PJ: results.pj.tax + results.pj.accounting,
    },
    {
      name: 'Benefícios',
      CLT: results.clt.benefits,
      PJ: 0,
    },
    {
      name: 'Líquido',
      CLT: results.clt.net,
      PJ: results.pj.net,
    },
  ]

  // Chart data - Annual Evolution (12 months)
  const annualData = Array.from({ length: 12 }, (_, i) => ({
    month: `M${i + 1}`,
    CLT: results.clt.net * (i + 1),
    PJ: results.pj.net * (i + 1),
    savings: (results.pj.net - results.clt.net) * (i + 1),
  }))

  // Chart data - PJ Cost Breakdown
  const pjBreakdown = [
    { name: 'Líquido', value: results.pj.net, color: '#904d00' },
    { name: 'Simples Nacional', value: results.pj.tax, color: '#ba1a1a' },
    { name: 'Contabilidade', value: results.pj.accounting, color: '#76777d' },
  ]

  // Detailed breakdown table
  const breakdownTableData = [
    { label: 'Bruto Mensal', clt: results.clt.gross, pj: results.pj.gross },
    { label: 'INSS / Simples', clt: results.clt.inss, pj: results.pj.tax },
    { label: 'IRRF / Contabilidade', clt: results.clt.irrf, pj: results.pj.accounting },
    { label: 'Benefícios (VR/Saúde)', clt: results.clt.benefits, pj: 0 },
    { label: 'Líquido Mensal', clt: results.clt.net, pj: results.pj.net },
    { label: 'Líquido Anual', clt: results.clt.annualTotal, pj: results.pj.annualTotal },
  ]

  const handlePdfExport = () => {
    alert('PDF export coming soon!')
  }

  const handleShare = () => {
    const url = `${window.location.origin}/dashboard?salary=${grossMonthly}`
    navigator.clipboard.writeText(url)
    alert('Link copiado para a área de transferência!')
  }

  return (
    <main className="flex min-h-screen bg-surface-container-lowest">
      <Sidebar />
      
      <div className="flex-1 min-w-0">
        {/* TopAppBar Navigation - Mobile Only */}
        <header className="fixed top-0 w-full z-50 bg-slate-950/60 backdrop-blur-xl md:hidden">
          <div className="flex justify-between items-center px-6 h-20">
            <span className="text-xl font-bold tracking-tighter text-slate-50">Fiscal Architect</span>
            <button className="text-slate-50">
              <MaterialSymbol name="menu" />
            </button>
          </div>
        </header>

        <div className="pt-24 md:pt-16 px-6 md:px-12 max-w-7xl mx-auto pb-24">
          {/* Header Section */}
          <section className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="max-w-2xl">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-on-surface text-4xl md:text-6xl font-black tracking-tighter mb-4"
              >
                Inteligência <span className="text-secondary">Estratégica.</span>
              </motion.h2>
              <p className="text-on-surface-variant text-lg leading-relaxed max-w-lg">
                Seu panorama fiscal em tempo real. Ajuste os valores abaixo para ver o impacto imediato na sua remuneração.
              </p>
            </div>
            
            {/* Salary Input Card */}
            <div className="w-full md:w-auto">
              <div className="bg-surface-container-low p-8 rounded-[2rem] border border-outline-variant/20 shadow-xl">
                <Label className="block text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-4">
                  Salário Mensal Base
                </Label>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-black text-on-surface/40">R$</span>
                  <Input 
                    type="number" 
                    value={grossMonthly}
                    onChange={(e) => setGrossMonthly(Number(e.target.value))}
                    className="no-border-input bg-transparent text-4xl font-black text-on-surface tabular-nums w-48 border-none focus-visible:ring-0"
                  />
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #904d00, #d97706)' }}>
                    <MaterialSymbol name="edit" className="text-xl" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* KPI Cards - 4 Columns */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            <FiscalCard 
              title="Líquido CLT Mensal"
              value={formatCurrency(results.clt.net)}
              subtitle="Poder de compra real"
              icon="account_balance"
              variant="surface"
            />
            <FiscalCard 
              title="Líquido PJ Mensal"
              value={formatCurrency(results.pj.net)}
              subtitle="Eficiência tributária"
              icon="rocket_launch"
              variant="secondary"
              trend={{ value: `+${results.comparison.percentageGain.toFixed(1)}%`, positive: results.comparison.percentageGain > 0 }}
            />
            <FiscalCard 
              title="Diferença Mensal"
              value={formatCurrency(results.comparison.monthlyDiff)}
              subtitle="Excedente operacional"
              icon="payments"
              variant="primary"
            />
            <FiscalCard 
              title="Diferença Anual"
              value={formatCurrency(results.comparison.annualDiff)}
              subtitle={`ROI: ${formatPercentage(results.comparison.roi)}`}
              icon="trending_up"
              variant="surface"
            />
          </motion.div>

          {/* Charts Section - Tabs */}
          <Card className="mb-12 bg-surface-container-low border-outline-variant/15">
            <div className="p-8">
              <h3 className="text-2xl font-black mb-8">Análise Comparativa</h3>
              
              <Tabs defaultValue="comparison" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-surface-container-high">
                  <TabsTrigger value="comparison">Comparação</TabsTrigger>
                  <TabsTrigger value="evolution">Evolução Anual</TabsTrigger>
                  <TabsTrigger value="distribution">Distribuição</TabsTrigger>
                </TabsList>

                {/* Tab 1: Comparison BarChart */}
                <TabsContent value="comparison" className="mt-8">
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--outline)" />
                        <XAxis dataKey="name" stroke="var(--on-surface-variant)" />
                        <YAxis stroke="var(--on-surface-variant)" />
                        <Tooltip 
                          formatter={(value) => formatCurrency(value as number)}
                          contentStyle={{ 
                            backgroundColor: 'var(--surface-container-low)', 
                            border: '1px solid var(--outline-variant)',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        <Bar dataKey="CLT" fill="var(--primary)" />
                        <Bar dataKey="PJ" fill="var(--secondary)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>

                {/* Tab 2: Evolution LineChart */}
                <TabsContent value="evolution" className="mt-8">
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={annualData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--outline)" />
                        <XAxis dataKey="month" stroke="var(--on-surface-variant)" />
                        <YAxis stroke="var(--on-surface-variant)" />
                        <Tooltip 
                          formatter={(value) => formatCurrency(value as number)}
                          contentStyle={{ 
                            backgroundColor: 'var(--surface-container-low)', 
                            border: '1px solid var(--outline-variant)',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="CLT" stroke="var(--primary)" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="PJ" stroke="var(--secondary)" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="savings" stroke="var(--tertiary)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>

                {/* Tab 3: Distribution PieChart */}
                <TabsContent value="distribution" className="mt-8">
                  <div className="h-80 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pjBreakdown}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pjBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </Card>

          {/* Detailed Breakdown Table */}
          <Card className="mb-12 bg-surface-container-low border-outline-variant/15">
            <div className="p-8">
              <h3 className="text-2xl font-black mb-6">Detalhamento Completo</h3>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-outline-variant/20">
                      <TableHead className="text-on-surface font-black">Item</TableHead>
                      <TableHead className="text-on-surface font-black text-right">CLT</TableHead>
                      <TableHead className="text-on-surface font-black text-right">PJ</TableHead>
                      <TableHead className="text-on-surface font-black text-right">Diferença</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {breakdownTableData.map((row, idx) => (
                      <TableRow key={idx} className="border-outline-variant/20">
                        <TableCell className="font-bold text-on-surface">{row.label}</TableCell>
                        <TableCell className="text-right font-mono">{formatCurrency(row.clt)}</TableCell>
                        <TableCell className="text-right font-mono">{formatCurrency(row.pj)}</TableCell>
                        <TableCell className={cn(
                          "text-right font-mono font-bold",
                          row.clt < row.pj ? "text-secondary" : "text-on-surface"
                        )}>
                          {formatCurrency(row.pj - row.clt)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Card>

          {/* Main Content Grid - Insight Card + Config */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Insight Card */}
            <Card className="lg:col-span-1 bg-slate-950 border-outline-variant/15 text-slate-50">
              <div className="p-8 h-full flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-8 shadow-2xl" style={{ background: 'linear-gradient(135deg, #904d00, #d97706)' }}>
                    <MaterialSymbol name="auto_awesome" className="text-2xl text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-4">Insight do Arquiteto</h4>
                  <p className="text-slate-400 leading-relaxed text-sm mb-6">
                    Você precisa de 
                    <span className="text-secondary font-black mx-1">
                      {formatCurrency(results.comparison.requiredCltToMatchPj)}
                    </span>
                    brutos CLT para empatar com PJ de
                    <span className="text-secondary font-black mx-1">
                      {formatCurrency(results.pj.net)}
                    </span>
                    mensais.
                  </p>
                  
                  <div className="flex gap-2 mb-6">
                    <Badge variant="default" className="bg-secondary">CLT</Badge>
                    <Badge variant="secondary">PJ</Badge>
                  </div>

                  <div className="flex gap-3 flex-col">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handlePdfExport}
                      className="w-full border-slate-700 text-slate-50 hover:bg-slate-900"
                    >
                      <MaterialSymbol name="picture_as_pdf" className="mr-2" />
                      Exportar PDF
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleShare}
                      className="w-full border-slate-700 text-slate-50 hover:bg-slate-900"
                    >
                      <MaterialSymbol name="share" className="mr-2" />
                      Compartilhar
                    </Button>
                  </div>
                </div>
                
                {/* Background decoration */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
              </div>
            </Card>

            {/* Quick Config Card */}
            <Card className="lg:col-span-2 bg-surface-container-low border-outline-variant/15">
              <div className="p-8 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-black mb-8">Configuração Rápida</h3>
                  
                  {/* Benefits Slider */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                      <Label className="text-sm font-bold text-on-surface">
                        Valor de Benefícios (VR + Saúde)
                      </Label>
                      <span className="text-2xl font-black text-secondary">
                        {formatCurrency(benefitsValue)}
                      </span>
                    </div>
                    <Slider 
                      value={[benefitsValue]}
                      onValueChange={handleBenefitsChange}
                      min={500}
                      max={3000}
                      step={100}
                      className="w-full"
                    />
                    <p className="text-xs text-on-surface-variant mt-2">Inclui Vale Refeição, Plano de Saúde, etc.</p>
                  </div>

                  {/* Simples Aliquota Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label className="text-sm font-bold text-on-surface">
                        Alíquota Simples Nacional
                      </Label>
                      <span className="text-2xl font-black text-secondary">
                        {simplesAliquota}%
                      </span>
                    </div>
                    <Slider 
                      value={[simplesAliquota]}
                      onValueChange={handleAliquotaChange}
                      min={6}
                      max={14}
                      step={1}
                      className="w-full"
                    />
                    <p className="text-xs text-on-surface-variant mt-2">Intervalo: 6% - 14% conforme faturamento anual</p>
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-outline-variant/20">
                  <div>
                    <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider mb-1">Ganho Mensal</p>
                    <p className="text-xl font-black text-secondary">
                      {formatCurrency(results.comparison.monthlyDiff)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider mb-1">Ganho Anual</p>
                    <p className="text-xl font-black text-secondary">
                      {formatCurrency(results.comparison.annualDiff)}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
