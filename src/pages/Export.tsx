import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCalculator } from '../context/CalculatorContext';

export const ExportView = () => {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const { 
        salarioBruto, pjIdeal, cltLiquido, pjLiquido 
    } = useCalculator();

    const formatCurrency = (val: number) => {
        return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const handleShare = async () => {
        const shareData = {
            title: 'Relatório Financeiro - CLT vs PJ',
            text: 'Confira meu comparativo de migração CLT para PJ!',
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(shareData.url);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            }
        } catch (err) {
            console.error('Erro ao compartilhar:', err);
        }
    };

    const diff = pjLiquido - cltLiquido;
    const isPjBetter = diff > 0;
    const diffPercent = cltLiquido > 0 ? ((pjLiquido - cltLiquido) / cltLiquido) * 100 : 0;

    return (
        <div className="flex-1 flex flex-col overflow-hidden h-screen animate-in slide-in-from-right duration-300 relative">
            {showToast && (
                <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
                    <span className="material-symbols-outlined text-[18px] text-brand-cyan">check_circle</span>
                    Link copiado!
                </div>
            )}
            <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-10 shrink-0">
                <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center"><span className="material-symbols-outlined">arrow_back_ios_new</span></button>
                <h2 className="text-base font-bold text-center flex-1 pr-10">Exportar Relatório</h2>
            </header>
            <main className="flex-1 overflow-y-auto px-4 py-6 bg-slate-100 dark:bg-slate-950">
                <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-lg rounded-lg max-w-2xl mx-auto overflow-hidden">
                    <div className="bg-primary p-6 text-white text-center">
                        <h1 className="text-xl font-bold">Relatório Financeiro</h1>
                        <p className="text-sm opacity-80">Comparativo CLT vs PJ</p>
                        <div className="flex justify-between w-full text-[10px] mt-4 font-mono opacity-60">
                            <span>Data: {new Date().toLocaleDateString('pt-BR')}</span>
                            <span>Ref: #{Math.floor(Math.random() * 10000)}X</span>
                        </div>
                    </div>
                    <div className="p-6 space-y-6">
                        <div>
                            <h3 className="text-sm font-bold uppercase text-slate-500 mb-3">Renda Bruta</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg"><p className="text-xs text-slate-500">Salário CLT</p><p className="font-bold">{formatCurrency(salarioBruto)}</p></div>
                                <div className="bg-primary/5 p-3 rounded-lg text-primary"><p className="text-xs">Faturamento PJ</p><p className="font-bold">{formatCurrency(pjIdeal)}</p></div>
                            </div>
                        </div>
                        <div className="border-t dark:border-slate-800 pt-6">
                            <h3 className="text-sm font-bold uppercase text-slate-500 mb-3">Resultado Final</h3>
                            <div className="space-y-3">
                                <div className="p-4 rounded-xl border dark:border-slate-800 flex justify-between">
                                    <div><p className="text-xs font-bold text-slate-500">CLT Líquido</p><p className="text-lg font-bold">{formatCurrency(cltLiquido)}</p></div>
                                    <div className="text-right"><p className="text-[10px] text-slate-400">Anual Estimado</p><p className="text-sm font-bold">{formatCurrency(cltLiquido * 12)}</p></div>
                                </div>
                                <div className={`p-4 rounded-xl text-white flex justify-between shadow-lg ${isPjBetter ? 'bg-primary' : 'bg-slate-700'}`}>
                                    <div><p className="text-xs font-bold opacity-80">PJ Líquido</p><p className="text-lg font-bold">{formatCurrency(pjLiquido)}</p></div>
                                    <div className="text-right">
                                        <span className="bg-white/20 px-2 py-0.5 rounded text-[10px]">
                                            {diffPercent > 0 ? '+' : ''}{diffPercent.toFixed(1)}%
                                        </span>
                                        <p className="text-sm font-bold">{formatCurrency(pjLiquido * 12)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 text-center bg-slate-50 dark:bg-slate-800 opacity-50 text-[10px]">Documento de simulação comparativa sem valor legal.</div>
                </div>
            </main>
            <footer className="p-4 bg-white dark:bg-slate-900 border-t dark:border-slate-800 flex gap-3">
                <button className="flex-1 h-14 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">download</span> Baixar PDF
                </button>
                <button onClick={handleShare} className="h-14 w-14 border dark:border-slate-700 rounded-xl flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <span className="material-symbols-outlined">share</span>
                </button>
            </footer>
        </div>
    );
};
