import React from 'react';
import { useNavigate } from 'react-router-dom';

export const OnboardingWelcome = () => {
    const navigate = useNavigate();
    return (
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-6 pt-4 animate-in fade-in duration-500">
            <div className="w-full aspect-[4/3] relative mb-8 rounded-2xl overflow-hidden bg-primary/5 dark:bg-primary/10 flex items-center justify-center">
                <div className="w-full h-full bg-center bg-contain bg-no-repeat" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAk2-AkcVaMh6aVIgFR3jTK1b3ENkDS_CPNRNgbhnh6aLIQaJV49Tms6A0QQoZkYJuHA3x0XWcM_Ja_89nvdrNkTsA3kQE5KoMKtY_UpM18wU_xG9GmGFDkUFywWM7N1KixuALs4E_HkiPfnZcIYTPCyy8He8LkyH4YhwfAJz3IIxQ2hr6ZBLdZ-c7ghP2gfao7avMybNos3KfDbCLlDZySuDI22EKrqQ7x7J6nQ57fGqDxwS13BTQELEL2rj9vX9vlCTaQyqXHGJQ')"}}></div>
            </div>
            <div className="flex flex-col items-center gap-4 text-center max-w-[320px]">
                <h1 className="text-3xl font-bold tracking-tight text-primary dark:text-white">Bem-vindo ao <br/>Calculadora CLT x PJ</h1>
                <p className="text-base font-normal text-slate-600 dark:text-slate-300 leading-relaxed">A ferramenta definitiva para você decidir o seu futuro profissional com base em números reais.</p>
            </div>
            <div className="w-full mt-12 px-6">
                <button onClick={() => navigate('/onboarding-profile')} className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-primary px-8 py-4 text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 active:scale-[0.98]">
                    <span className="text-lg font-bold">Próximo</span>
                    <span className="material-symbols-outlined ml-2 text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                </button>
            </div>
        </div>
    );
};

export const OnboardingProfile = () => {
    const navigate = useNavigate();
    const profiles = [
        { id: 'estudante', title: 'Estudante', desc: 'Buscando estágio ou primeiro emprego', icon: 'school' },
        { id: 'clt', title: 'CLT', desc: 'Trabalho com carteira assinada', icon: 'badge', active: true },
        { id: 'pj', title: 'PJ', desc: 'Prestador de serviço ou MEI', icon: 'business_center' },
        { id: 'desempregado', title: 'Desempregado', desc: 'Em transição de carreira', icon: 'search' }
    ];

    return (
        <div className="px-6 pt-4 pb-8 flex-1 flex flex-col">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">Qual o seu perfil atual?</h1>
            <p className="mt-2 text-base text-slate-500 dark:text-slate-400">Isso nos ajuda a personalizar as comparações para sua realidade.</p>
            <div className="space-y-4 mt-8">
                {profiles.map(p => (
                    <div key={p.id} onClick={() => navigate('/onboarding-objective')} className={`group relative flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${p.active ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50'}`}>
                        <div className={`w-12 h-12 flex items-center justify-center rounded-xl mr-4 group-hover:scale-110 transition-transform ${p.active ? 'bg-primary/10 text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                            <span className="material-symbols-outlined text-2xl">{p.icon}</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-slate-900 dark:text-white text-lg">{p.title}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{p.desc}</p>
                        </div>
                        {p.active && <span className="material-symbols-outlined text-primary">check_circle</span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export const OnboardingObjective = () => {
    const navigate = useNavigate();
    return (
        <div className="flex-1 flex flex-col px-6 pb-8">
            <div className="mt-8 mb-10">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">Qual seu maior objetivo hoje?</h1>
                <p className="mt-2 text-slate-500 dark:text-slate-400">Selecione a opção que melhor descreve sua necessidade atual.</p>
            </div>
            <div className="flex-1 space-y-4">
                {['Migrar para PJ com segurança', 'Comparar propostas', 'Entender meus impostos'].map((obj, i) => (
                    <label key={i} className="relative flex items-center p-4 bg-white dark:bg-slate-800/50 border-2 border-transparent rounded-2xl cursor-pointer transition-all duration-200 hover:border-slate-200 dark:hover:border-slate-700 shadow-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                        <input name="objective" type="radio" className="hidden peer" defaultChecked={i === 0}/>
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 transition-colors mr-4 group-peer-checked:bg-primary group-peer-checked:text-white">
                            <span className="material-symbols-outlined text-[28px]">{i === 0 ? 'shield_person' : i === 1 ? 'compare_arrows' : 'account_balance_wallet'}</span>
                        </div>
                        <span className="flex-1 font-semibold">{obj}</span>
                        <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-slate-200 peer-checked:border-primary peer-checked:bg-primary transition-all">
                            <span className="material-symbols-outlined text-white text-sm font-bold opacity-0 peer-checked:opacity-100">check</span>
                        </div>
                    </label>
                ))}
            </div>
            <button onClick={() => navigate('/onboarding-salary')} className="mt-12 group relative w-full h-14 bg-primary text-white font-bold text-lg rounded-xl shadow-lg transition-all flex items-center justify-center">
                Próximo <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
        </div>
    );
};

export const OnboardingSalary = () => {
    const navigate = useNavigate();
    return (
        <div className="flex-1 flex flex-col px-6 pb-8">
            <div className="mt-8 mb-10">
                <h1 className="text-3xl font-bold tracking-tight mb-4">Qual sua faixa salarial mensal bruta?</h1>
                <p className="text-slate-500 text-sm">Isso nos ajuda a calcular os impostos e benefícios proporcionais ao seu rendimento.</p>
            </div>
            <div className="space-y-3">
                {['Até R$ 3.000', 'R$ 3.000 - R$ 7.000', 'R$ 7.000 - R$ 12.000', 'Mais de R$ 12.000'].map((f, i) => (
                    <label key={i} className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer ${i === 1 ? 'border-primary bg-white dark:bg-slate-800 shadow-sm' : 'border-slate-100 dark:border-slate-800'}`}>
                        <input name="salary" type="radio" className="hidden" defaultChecked={i === 1}/>
                        <div className="flex-1">
                            {i === 1 && <span className="block text-xs font-semibold uppercase tracking-wider text-primary mb-0.5">Média Mercado</span>}
                            <span className="text-lg font-bold">{f}</span>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${i === 1 ? 'border-primary' : 'border-slate-200'}`}>
                            {i === 1 && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                        </div>
                    </label>
                ))}
            </div>
            <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Valor Customizado</span>
                        <span className="text-2xl font-black text-primary">R$ 5.500</span>
                    </div>
                    <span className="material-symbols-outlined text-slate-300">edit_note</span>
                </div>
                <input className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary" type="range" defaultValue="5500" min="1000" max="30000" />
            </div>
            <button onClick={() => navigate('/onboarding-cnpj')} className="mt-12 w-full h-14 bg-primary text-white font-bold text-lg rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2">
                Próximo <span className="material-symbols-outlined">arrow_forward</span>
            </button>
        </div>
    );
};

export const OnboardingCnpj = () => {
    const navigate = useNavigate();
    return (
        <div className="flex-1 flex flex-col px-6 pb-8">
            <div className="mt-8 mb-10">
                <h1 className="text-2xl font-bold tracking-tight leading-tight">Você já possui empresa aberta (CNPJ)?</h1>
                <p className="mt-3 text-base text-slate-500 font-normal">Precisamos dessa informação para calcular os impostos corretamente.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800 border-2 border-primary rounded-2xl cursor-pointer bg-primary/5">
                    <input name="cnpj" type="radio" className="hidden" defaultChecked />
                    <span className="material-symbols-outlined text-3xl mb-2 text-primary">check_circle</span>
                    <span className="font-bold text-lg">Sim</span>
                </label>
                <label className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800 border-2 border-transparent rounded-2xl cursor-pointer">
                    <input name="cnpj" type="radio" className="hidden" />
                    <span className="material-symbols-outlined text-3xl mb-2 text-slate-400">cancel</span>
                    <span className="font-bold text-lg">Não</span>
                </label>
            </div>
            <div className="mt-6">
                <label className="text-sm font-semibold text-slate-600 mb-2 block">Tipo de Empresa</label>
                <select className="w-full h-14 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 text-slate-900 dark:text-white font-medium">
                    <option>MEI - Microempreendedor Individual</option>
                    <option>ME - Microempresa</option>
                </select>
            </div>
            <button onClick={() => navigate('/onboarding-final')} className="mt-auto group relative w-full h-14 bg-primary text-white font-bold text-lg rounded-xl shadow-lg transition-all flex items-center justify-center">
                Próximo <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
        </div>
    );
};

export const OnboardingFinal = () => {
    const navigate = useNavigate();
    return (
        <div className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="w-full max-w-[320px] aspect-square relative mb-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-primary/20 rounded-full blur-3xl transform scale-90"></div>
                <div className="relative w-full h-full bg-contain bg-center bg-no-repeat z-10" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCe7xSGeKi0fL5mpwgP91dxkYGXgoQWXIlSwmv5CjI818sSe5izPk7WPP6ZHvkMhxFfBfMfISfObspR34r-0gWMwFEaSDYSS0S2QbKmPc_O8qxGwGmNRBuE0wPZ8aQ9N4hUzFMej-8YA7tIv5uY3jhrSCwp2BW_1sr5zvPaGKQpQfMWVtJs185twdEM7HX3Kfx6dvQln3WJta30fMEg5roWWllR6vkGhssc3EyE_Tvz_-zlgqMhHlHZHvxcJFzlKW8AMMHv_CKbpy8')"}}></div>
            </div>
            <h1 className="text-3xl font-bold text-center mb-3">Tudo pronto!</h1>
            <p className="text-lg text-slate-500 text-center mb-8">Vamos calcular e tirar suas dúvidas agora mesmo?</p>
            <button onClick={() => navigate('/calculator')} className="w-full h-14 bg-primary text-white font-bold text-lg rounded-xl shadow-lg shadow-primary/25">Começar Agora</button>
        </div>
    );
};

export const OnboardingPremium = () => {
    const navigate = useNavigate();
    return (
        <div className="flex-1 flex flex-col items-center px-6 pb-8 bg-primary text-white">
            <div className="flex-1 w-full flex items-center justify-center py-4 min-h-[260px]">
                <div className="relative w-full aspect-square max-w-[280px] rounded-3xl bg-gradient-to-br from-brand-cyan via-primary to-blue-900 flex items-center justify-center p-0.5 shadow-2xl overflow-hidden">
                    <div className="w-full h-full bg-[#1e1f35] rounded-[calc(1.5rem-2px)] flex flex-col items-center justify-center relative">
                        <span className="material-symbols-outlined text-brand-cyan text-7xl font-bold">workspace_premium</span>
                    </div>
                </div>
            </div>
            <div className="w-full text-center space-y-4 mb-6">
                <h1 className="text-3xl font-bold text-white tracking-tight leading-tight px-4">Maximize seus Ganhos com o Plano Pro</h1>
            </div>
            <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 mb-8">
                <ul className="space-y-4">
                    {['Simulações ilimitadas', 'Exportação de PDF personalizada', 'Suporte prioritário'].map((feat, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-brand-cyan/20 flex items-center justify-center"><span className="material-symbols-outlined text-brand-cyan text-lg font-bold">check</span></div>
                            <span className="text-slate-100 font-medium">{feat}</span>
                        </li>
                    ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-white/10 text-center">
                    <p className="text-sm text-slate-300 mb-1">Assinatura mensal</p>
                    <div className="text-2xl font-bold">Apenas <span className="text-brand-cyan">R$ 9,90/mês</span></div>
                </div>
            </div>
            <button onClick={() => navigate('/calculator')} className="w-full h-14 bg-brand-cyan text-primary font-bold text-lg rounded-xl shadow-lg flex items-center justify-center gap-2">Assinar Agora <span className="material-symbols-outlined font-bold">bolt</span></button>
            <button onClick={() => navigate('/calculator')} className="w-full py-4 text-slate-300 text-sm font-semibold">Continuar com versão grátis</button>
        </div>
    );
};
