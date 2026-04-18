"use client";
import React, { useState, useEffect } from 'react';
import PomodoroTimer from "@/components/PomodoroTimer";
import EisenhowerMatrix from "@/components/EisenhowerMatrix";
import TaskHistory from "@/components/TaskHistory";
import UserStats from "@/components/UserStats";
import { Settings, ShieldCheck, Activity, AlertTriangle, X } from 'lucide-react';

export default function Home() {
  const [currentActivity, setCurrentActivity] = useState<any>(null);
  const [isDistracted, setIsDistracted] = useState(false);

  // Lista de processos considerados distrações (ajuste conforme necessário)
  const blacklistProcesses = [
    'Discord.exe', 
    'Spotify.exe', 
    'Steam.exe', 
    'EpicGamesLauncher.exe', 
    'League of Legends.exe',
    'Telegram.exe'
  ];

  // Palavras-chave no título da janela que indicam distração
  const blacklistKeywords = ['YouTube', 'Netflix', 'Twitch', 'Facebook', 'Instagram', 'Twitter', 'X.com', 'Reddit'];

  // Polling para obter a atividade atual capturada pelo Package 1
  useEffect(() => {
    const fetchActivity = () => {
      fetch('http://localhost:8000/activity/current')
        .then(res => res.json())
        .then(data => {
          if (data) {
            setCurrentActivity(data);
            const procName = data.process_name;
            const winTitle = data.window_title;
            const isBlacklistedProcess = blacklistProcesses.some(p => procName.toLowerCase().includes(p.toLowerCase()));
            const isBlacklistedTitle = blacklistKeywords.some(kw => winTitle.toLowerCase().includes(kw.toLowerCase()));
            setIsDistracted(isBlacklistedProcess || isBlacklistedTitle);
          }
        })
        .catch(err => console.error("Activity API error:", err));
    };

    fetchActivity(); // Inicial
    const interval = setInterval(fetchActivity, 3000); // Polling a cada 3s
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-black text-zinc-400 font-sans selection:bg-zinc-800 selection:text-zinc-200">
      
      {/* Notificação de Distração (Banner Fixo) */}
      {isDistracted && (
        <div className="fixed top-0 left-0 w-full z-50 animate-in fade-in slide-in-from-top duration-500">
          <div className="bg-rose-500 text-white px-6 py-2 flex items-center justify-between shadow-2xl">
            <div className="flex items-center gap-3">
              <AlertTriangle size={14} className="animate-pulse" />
              <p className="text-[10px] font-bold uppercase tracking-widest">
                Distração Detectada: {currentActivity?.process_name} • Volte ao foco
              </p>
            </div>
            <button onClick={() => setIsDistracted(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto px-8 py-12">
        
        {/* Header Minimalista */}
        <header className="flex justify-between items-end mb-16">
          <div className="space-y-1">
            <h1 className="text-sm font-semibold text-zinc-100 uppercase tracking-[0.3em]">
              Unified Management System
            </h1>
            <div className="flex items-center space-x-3 text-[10px] font-medium text-zinc-500 uppercase tracking-widest">
              <span className={`flex items-center gap-1.5 transition-colors duration-500 ${isDistracted ? 'text-rose-500' : 'text-zinc-500'}`}>
                <ShieldCheck size={12} className={isDistracted ? 'text-rose-600' : 'text-zinc-700'} /> 
                {isDistracted ? "Focus Disrupted" : "Focus Active"}
              </span>
              <span className="w-1 h-1 rounded-full bg-zinc-800"></span>
              <span className="flex items-center gap-1.5">
                <Activity size={12} className="text-zinc-700" /> 
                {currentActivity ? `${currentActivity.process_name}` : "Sincronizando..."}
              </span>
            </div>
          </div>
          
          <button className="text-zinc-700 hover:text-zinc-300 transition-colors">
            <Settings size={18} strokeWidth={1.5} />
          </button>
        </header>

        {/* Grid Principal */}
        <div className="grid grid-cols-12 gap-12">
          
          {/* Coluna Lateral */}
          <aside className="col-span-12 lg:col-span-3 space-y-12">
            <section>
              <UserStats />
            </section>
            
            <section>
              <PomodoroTimer />
            </section>

            <section className="pt-8 border-t border-zinc-900">
              <div className={`border p-4 rounded-lg transition-colors duration-500 ${isDistracted ? 'bg-rose-950/20 border-rose-900/50' : 'bg-zinc-950/40 border-zinc-900'}`}>
                <p className={`text-[9px] uppercase tracking-widest font-bold mb-2 ${isDistracted ? 'text-rose-500' : 'text-zinc-600'}`}>
                  Janela Atual
                </p>
                <p className={`text-[11px] leading-relaxed font-light truncate ${isDistracted ? 'text-rose-200' : 'text-zinc-400'}`}>
                  {currentActivity ? currentActivity.window_title : "..."}
                </p>
              </div>
            </section>
          </aside>

          {/* Coluna Central: Eisenhower Matrix */}
          <main className="col-span-12 lg:col-span-9">
             <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-[0.2em]">Tasks</h2>
                <div className="h-[0.5px] flex-1 bg-zinc-900 mx-6"></div>
             </div>
             
             <section className="rounded-sm overflow-hidden">
               <EisenhowerMatrix />
             </section>

             <section>
               <TaskHistory />
             </section>
          </main>

        </div>
      </div>
    </main>
  );
}
