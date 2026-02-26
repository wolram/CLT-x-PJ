import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI } from '@google/genai';
import { BottomNav } from '../components/BottomNav';

export const AITools = () => {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setGeneratedImage(null);
            setError(null);
        }
    };

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleGenerate = async () => {
        if (!selectedFile || !prompt) return;

        setIsGenerating(true);
        setError(null);

        try {
            const fullBase64 = await fileToBase64(selectedFile);
            const base64Data = fullBase64.split(',')[1];
            const mimeType = selectedFile.type;

            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: {
                    parts: [
                        {
                            inlineData: {
                                data: base64Data,
                                mimeType: mimeType,
                            },
                        },
                        {
                            text: prompt,
                        },
                    ],
                },
            });

            let foundImage = false;
            for (const part of response.candidates?.[0]?.content?.parts || []) {
                if (part.inlineData) {
                    const base64EncodeString = part.inlineData.data;
                    const imageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${base64EncodeString}`;
                    setGeneratedImage(imageUrl);
                    foundImage = true;
                    break;
                }
            }

            if (!foundImage) {
                setError("Não foi possível gerar a imagem. Tente outro prompt.");
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Ocorreu um erro ao processar a imagem.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark min-h-screen pb-32">
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10 px-4 py-4 flex items-center">
                <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <span className="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
                <h1 className="text-base font-bold text-center flex-1 pr-10 flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-brand-cyan">auto_awesome</span>
                    Estúdio Premium AI
                </h1>
            </header>

            <main className="flex-1 px-5 py-6 flex flex-col gap-6 max-w-md mx-auto w-full">
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-extrabold tracking-tight">Edição Mágica</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Faça upload de uma foto e peça para a IA editar o que quiser. Ex: "Adicionar um filtro retrô" ou "Remover o fundo".</p>
                </div>

                {!previewUrl ? (
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full aspect-square rounded-3xl border-2 border-dashed border-primary/30 bg-primary/5 flex flex-col items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors"
                    >
                        <span className="material-symbols-outlined text-5xl text-primary mb-3">add_photo_alternate</span>
                        <span className="font-semibold text-primary">Toque para enviar foto</span>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-slate-900 shadow-xl border border-white/10">
                            <img src={generatedImage || previewUrl} alt="Preview" className="w-full h-full object-cover" />
                            {isGenerating && (
                                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                                    <span className="material-symbols-outlined animate-spin text-4xl text-brand-cyan mb-3">progress_activity</span>
                                    <span className="font-bold animate-pulse">Gerando mágica...</span>
                                </div>
                            )}
                        </div>
                        
                        <div className="flex gap-2">
                            <button 
                                onClick={() => {
                                    setSelectedFile(null);
                                    setPreviewUrl(null);
                                    setGeneratedImage(null);
                                    setPrompt('');
                                }}
                                className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">delete</span> Trocar
                            </button>
                            {generatedImage && (
                                <a 
                                    href={generatedImage} 
                                    download="imagem-editada.png"
                                    className="flex-1 py-3 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                                >
                                    <span className="material-symbols-outlined text-[18px]">download</span> Salvar
                                </a>
                            )}
                        </div>
                    </div>
                )}

                <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleFileChange}
                />

                <div className="space-y-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">O que você quer mudar?</label>
                    <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Ex: Transforme em uma pintura a óleo..."
                        className="w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none h-28 text-sm shadow-sm"
                    />
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium flex items-start gap-2 border border-red-100 dark:border-red-900/30">
                        <span className="material-symbols-outlined text-[20px]">error</span>
                        <p>{error}</p>
                    </div>
                )}

                <button 
                    onClick={handleGenerate}
                    disabled={!selectedFile || !prompt || isGenerating}
                    className="w-full h-14 bg-gradient-to-r from-primary to-brand-electric text-white font-bold text-lg rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    <span className="material-symbols-outlined">auto_fix</span>
                    {isGenerating ? 'Processando...' : 'Gerar Imagem'}
                </button>
            </main>
            <BottomNav />
        </div>
    );
};
