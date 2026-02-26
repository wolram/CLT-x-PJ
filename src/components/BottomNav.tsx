import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const BottomNav = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md glass-nav rounded-2xl px-2 py-2 flex justify-between items-center z-40 shadow-2xl">
            <button onClick={() => navigate('/calculator')} className={`flex flex-col items-center justify-center w-full h-14 transition-colors ${isActive('/calculator') ? 'text-primary' : 'text-slate-400 dark:text-slate-500 hover:text-primary'}`}>
                <span className="material-symbols-outlined text-2xl mb-0.5">calculate</span>
                <span className="text-[10px] font-bold tracking-tight uppercase">Simular</span>
            </button>
            <button onClick={() => navigate('/history')} className={`flex flex-col items-center justify-center w-full h-14 transition-colors ${isActive('/history') ? 'text-primary' : 'text-slate-400 dark:text-slate-500 hover:text-primary'}`}>
                <span className="material-symbols-outlined text-2xl mb-0.5">query_stats</span>
                <span className="text-[10px] font-bold tracking-tight uppercase">Dashboard</span>
            </button>
            <button onClick={() => navigate('/proposals')} className={`flex flex-col items-center justify-center w-full h-14 transition-colors ${isActive('/proposals') ? 'text-primary' : 'text-slate-400 dark:text-slate-500 hover:text-primary'}`}>
                <span className="material-symbols-outlined text-2xl mb-0.5">folder</span>
                <span className="text-[10px] font-extrabold tracking-tight uppercase">Salvas</span>
            </button>
            <button onClick={() => navigate('/ai-tools')} className={`flex flex-col items-center justify-center w-full h-14 transition-colors ${isActive('/ai-tools') ? 'text-primary' : 'text-slate-400 dark:text-slate-500 hover:text-primary'}`}>
                <span className="material-symbols-outlined text-2xl mb-0.5">smart_toy</span>
                <span className="text-[10px] font-bold tracking-tight uppercase">AI Tools</span>
            </button>
            <button onClick={() => navigate('/onboarding-premium')} className={`flex flex-col items-center justify-center w-full h-14 transition-colors ${isActive('/onboarding-premium') ? 'text-primary' : 'text-slate-400 dark:text-slate-500 hover:text-primary'}`}>
                <span className="material-symbols-outlined text-2xl mb-0.5">person</span>
                <span className="text-[10px] font-bold tracking-tight uppercase">Conta</span>
            </button>
        </nav>
    );
};
