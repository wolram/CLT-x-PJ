import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { useCalculator } from '../context/CalculatorContext';

export const Calculator = () => {
    const navigate = useNavigate();
    const { 
        salarioBruto, setSalarioBruto, 
        vaVr, setVaVr, 
        planoSaude, setPlanoSaude,
        pjIdeal
    } = useCalculator();

    const formatCurrency = (val: number) => {
        return val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const parseCurrency = (val: string) => {
        const numericStr = val.replace(/\D/g, '');
        return numericStr ? parseInt(numericStr, 10) / 100 : 0;
    };

    return (
        <main className="flex-1 px-5 pb-32 pt-4">
            <div className="mt-4 mb-6">
                <h2 className="text-2xl font-extrabold leading-tight">Olá! 👋<br/><span className="text-primary">Vamos calcular sua migração de CLT para PJ</span></h2>
                <p className="text-slate-500 dark:text-white/50 text-sm mt-2 font-medium">Preenchemos alguns dados com base no seu perfil.</p>
            </div>
            <div className="mb-8 p-4 bg-primary/5 border border-primary/20 rounded-2xl flex gap-3 items-start">
                <span className="material-symbols-outlined text-primary">lightbulb</span>
                <p className="text-xs font-medium text-slate-600 dark:text-white/70">Como você quer migrar com segurança, não esqueça de considerar o custo do contador no seu planejamento mensal.</p>
            </div>
            <div className="space-y-5">
                <div className="relative group">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">Salário Bruto Mensal</label>
                    <input 
                        className="block w-full px-4 py-4 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 rounded-xl text-brand-deep dark:text-white font-bold text-xl" 
                        value={`R$ ${formatCurrency(salarioBruto)}`}
                        onChange={(e) => setSalarioBruto(parseCurrency(e.target.value))}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative group">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">VA / VR</label>
                        <input 
                            className="block w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border-slate-200 rounded-xl text-sm font-semibold" 
                            value={`R$ ${formatCurrency(vaVr)}`}
                            onChange={(e) => setVaVr(parseCurrency(e.target.value))}
                        />
                    </div>
                    <div className="relative group">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">Plano Saúde</label>
                        <input 
                            className="block w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border-slate-200 rounded-xl text-sm font-semibold" 
                            value={`R$ ${formatCurrency(planoSaude)}`}
                            onChange={(e) => setPlanoSaude(parseCurrency(e.target.value))}
                        />
                    </div>
                </div>
            </div>
            <div className="bg-primary dark:bg-white/10 rounded-2xl p-6 text-white shadow-2xl relative overflow-hidden mt-8">
                <div className="relative z-10">
                    <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-brand-cyan">Equivalente PJ Ideal</span>
                    <p className="text-white/80 text-sm mb-2">Faturamento mensal sugerido:</p>
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-2xl font-bold">R$</span>
                        <span className="text-5xl font-extrabold tracking-tighter">{formatCurrency(pjIdeal)}</span>
                    </div>
                    <div className="mt-6 pt-5 border-t border-white/10 flex justify-between items-center">
                        <div><span className="block text-[10px] text-white/50 font-bold">IMPOSTO ESTIMADO</span><span className="font-bold text-sm text-brand-cyan">~ 6% (Anexo III)</span></div>
                        <button onClick={() => navigate('/detail')} className="bg-white/10 text-white text-xs font-bold py-2.5 px-4 rounded-lg">Detalhes</button>
                    </div>
                </div>
            </div>
            <button onClick={() => navigate('/detail')} className="w-full mt-6 bg-primary text-white font-extrabold py-5 rounded-xl shadow-lg flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">calculate</span> Ver Comparativo
            </button>
            <BottomNav />
        </main>
    );
};
