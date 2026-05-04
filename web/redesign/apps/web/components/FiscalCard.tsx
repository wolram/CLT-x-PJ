'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { MaterialSymbol } from './MaterialSymbol'

interface FiscalCardProps {
  title: string
  value: string
  subtitle?: string
  icon: string
  variant?: 'primary' | 'secondary' | 'surface' | 'error'
  className?: string
  trend?: {
    value: string
    positive: boolean
  }
}

export function FiscalCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  variant = 'surface', 
  className,
  trend
}: FiscalCardProps) {
  const variants = {
    primary: "bg-primary-container text-on-primary-container border-primary/10",
    secondary: "bg-secondary-fixed text-on-secondary-fixed border-secondary/10",
    surface: "bg-surface-container-low text-on-surface border-outline-variant/15",
    error: "bg-error-container text-on-error-container border-error/10",
  }

  const iconColors = {
    primary: "text-on-primary-fixed",
    secondary: "text-secondary",
    surface: "text-secondary",
    error: "text-error",
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "bento-card border flex flex-col justify-between group",
        variants[variant],
        className
      )}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2 block">{title}</span>
          <h3 className="text-3xl font-black tabular-nums tracking-tighter">{value}</h3>
        </div>
        <div className={cn("p-3 rounded-2xl bg-white/10 backdrop-blur-md transition-transform group-hover:scale-110", iconColors[variant])}>
          <MaterialSymbol name={icon} className="text-2xl" />
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-current/5">
        <span className="text-xs font-bold opacity-60">{subtitle}</span>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter",
            trend.positive ? "bg-success/10 text-success" : "bg-error/10 text-error"
          )}>
            <MaterialSymbol name={trend.positive ? "trending_up" : "trending_down"} className="text-xs" />
            {trend.value}
          </div>
        )}
      </div>
    </motion.div>
  )
}
