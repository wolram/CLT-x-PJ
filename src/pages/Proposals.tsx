import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';

export const ProposalsList = () => {
    const navigate = useNavigate();
    const proposals = [
        { id: 1, company: 'Google', date: '28 de nov, 7:43 AM', type: 'CLT', cltEq: 'R$ 23.565', pjLiq: 'R$ 23.250', diff: 'R$ 315', color: 'accent-blue' },
        { id: 2, company: 'Meta', date: '27 de nov, 14:20 PM', type: 'PJ', cltEq: 'R$ 18.200', pjLiq: 'R$ 21.000', diff: 'R$ 2.800', color: 'purple-600' },
        { id: 3, company: 'Amazon', date: '25 de nov, 9:00 AM', type: 'CLT', cltEq: 'R$ 15.000', pjLiq: 'R$ 14.800', diff: 'R$ 200', color: 'accent-blue' }
    ];

    return (
        <main className="flex-1 overflow-y-auto no-scrollbar px-5 pb-32 pt-4">
            <h1 className="text-4xl font-bold mb-6 tracking-tight">Propostas</h1>
            <div className="space-y-4">
                {proposals.map(p => (
                    <div key={p.id} className="bg-white dark:bg-card-dark rounded-3xl p-5 shadow-sm border border-transparent dark:border-white/5">
                        <div className="flex justify-between items-start mb-4">
                            <div><h2 className="text-xl font-bold mb-1">{p.company}</h2><p className="text-xs text-slate-400">{p.date}</p></div>
                            <span className={`bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase`}>{p.type}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mb-6">
                            <div><p className="text-[11px] text-slate-400 uppercase font-medium">CLT Equiv.</p><p className="text-primary font-bold">{p.cltEq}</p></div>
                            <div><p className="text-[11px] text-slate-400 uppercase font-medium">PJ Líquido</p><p className="text-success font-bold">{p.pjLiq}</p></div>
                            <div className="text-right"><p className="text-[11px] text-slate-400 uppercase font-medium">Diferença</p><p className="font-bold">{p.diff}</p></div>
                        </div>
                        <button onClick={() => navigate('/calculator')} className="w-full bg-slate-100 dark:bg-white/10 text-primary font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined">file_download</span> Carregar
                        </button>
                    </div>
                ))}
            </div>
            <BottomNav />
        </main>
    );
};
