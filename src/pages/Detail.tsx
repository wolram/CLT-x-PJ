import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCalculator } from '../context/CalculatorContext';

export const DetailView = () => {
    const navigate = useNavigate();
    const { 
        salarioBruto, cltLiquido, pjLiquido, inss, irrf 
    } = useCalculator();

    const formatCurrency = (val: number) => {
        return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const diff = pjLiquido - cltLiquido;
    const isPjBetter = diff > 0;
    
    // Calculate percentage for the progress bars
    const maxVal = Math.max(pjLiquido, cltLiquido);
    const pjPercent = maxVal > 0 ? (pjLiquido / maxVal) * 100 : 0;
    const cltPercent = maxVal > 0 ? (cltLiquido / maxVal) * 100 : 0;

    return (
        <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark animate-in slide-in-from-bottom duration-300">
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10 px-4 py-4 flex items-center">
                <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-neutral-blue"><span className="material-symbols-outlined">arrow_back_ios_new</span></button>
                <h1 className="text-base font-bold text-center flex-1 pr-10">Comparativo Detalhado</h1>
            </header>
            <main className="flex-1 px-4 py-6 flex flex-col gap-5 max-w-md mx-auto w-full">
                <div className="rounded-xl overflow-hidden shadow-xl bg-white dark:bg-slate-900 border border-primary/10">
                    <div className={`p-6 text-center text-white ${isPjBetter ? 'bg-gradient-to-br from-primary to-blue-900' : 'bg-gradient-to-br from-slate-600 to-slate-900'}`}>
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brand-cyan/20 text-brand-cyan text-[10px] font-extrabold uppercase mb-3">
                            {isPjBetter ? 'VENCEDOR PJ' : 'VENCEDOR CLT'}
                        </span>
                        <h2 className="text-3xl font-extrabold">{formatCurrency(Math.abs(diff))}</h2>
                        <p className="text-xs font-medium text-white/70">
                            {isPjBetter ? 'Economia mensal estimada' : 'Perda mensal estimada como PJ'}
                        </p>
                    </div>
                    <div className="p-5 space-y-4">
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-xs font-bold"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-cyan"></span> PJ (Líquido)</span><span>{formatCurrency(pjLiquido)}</span></div>
                            <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-primary" style={{width: `${pjPercent}%`}}></div></div>
                        </div>
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-xs font-bold"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-400"></span> CLT (Líquido)</span><span>{formatCurrency(cltLiquido)}</span></div>
                            <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-slate-400" style={{width: `${cltPercent}%`}}></div></div>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-primary/5 shadow-sm">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><span className="material-symbols-outlined">person</span></div>
                        <h3 className="font-extrabold">CLT (Consolidado)</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm"><span>Salário Bruto</span><span className="font-bold">{formatCurrency(salarioBruto)}</span></div>
                        <div className="flex justify-between text-xs text-red-500"><span>- INSS</span><span>- {formatCurrency(inss)}</span></div>
                        <div className="flex justify-between text-xs text-red-500"><span>- IRRF</span><span>- {formatCurrency(irrf)}</span></div>
                        <div className="pt-3 border-t dark:border-slate-800 flex justify-between font-black"><span>Total em mãos</span><span>{formatCurrency(cltLiquido)}</span></div>
                    </div>
                </div>
            </main>
            <div className="sticky bottom-0 bg-white/90 dark:bg-slate-900/90 p-4 pb-8 flex gap-3">
                <button onClick={() => navigate('/calculator')} className="flex-1 py-4 px-4 rounded-xl border-2 dark:border-slate-700 font-extrabold text-xs uppercase">Ajustar</button>
                <button onClick={() => navigate('/export')} className="flex-[2] py-4 px-4 rounded-xl bg-primary text-white font-extrabold text-xs uppercase shadow-xl flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">ios_share</span> Compartilhar
                </button>
            </div>
        </div>
    );
};;
