import PomodoroTimer from "@/components/PomodoroTimer";
import EisenhowerMatrix from "@/components/EisenhowerMatrix";
import UserStats from "@/components/UserStats";
import { Settings, ShieldCheck, Activity } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-zinc-400 font-sans selection:bg-zinc-800 selection:text-zinc-200">
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        
        {/* Header Minimalista */}
        <header className="flex justify-between items-end mb-16">
          <div className="space-y-1">
            <h1 className="text-sm font-semibold text-zinc-100 uppercase tracking-[0.3em]">
              Unified Management System
            </h1>
            <div className="flex items-center space-x-3 text-[10px] font-medium text-zinc-500 uppercase tracking-widest">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <ShieldCheck size={12} className="text-zinc-600" /> Focus Lockdown Active
              </span>
              <span className="w-1 h-1 rounded-full bg-zinc-800"></span>
              <span className="flex items-center gap-1.5">
                <Activity size={12} className="text-zinc-600" /> Sincronizado: P1-Capture
              </span>
            </div>
          </div>
          
          <button className="text-zinc-600 hover:text-zinc-300 transition-colors">
            <Settings size={18} strokeWidth={1.5} />
          </button>
        </header>

        {/* Grid Principal */}
        <div className="grid grid-cols-12 gap-12">
          
          {/* Coluna Lateral: Perfil e Timer */}
          <aside className="col-span-12 lg:col-span-3 space-y-12">
            <section>
              <UserStats />
            </section>
            
            <section>
              <PomodoroTimer />
            </section>

            <section className="pt-8 border-t border-zinc-900">
              <h4 className="text-[10px] font-bold text-zinc-600 uppercase mb-4 tracking-widest">System Intelligence</h4>
              <p className="text-[11px] leading-relaxed text-zinc-500 font-light">
                O motor de IA está processando seu backlog Q2 para otimizar a sessão de foco de amanhã.
              </p>
            </section>
          </aside>

          {/* Coluna Central: Eisenhower Matrix */}
          <main className="col-span-12 lg:col-span-9">
             <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xs font-semibold text-zinc-300 uppercase tracking-[0.2em]">Prioritization Matrix</h2>
                <div className="h-[0.5px] flex-1 bg-zinc-900 mx-6"></div>
                <button className="text-[10px] font-bold text-zinc-600 hover:text-zinc-400 uppercase tracking-widest">Archive</button>
             </div>
             
             <section className="rounded-sm overflow-hidden">
               <EisenhowerMatrix />
             </section>
          </main>

        </div>
      </div>
    </main>
  );
}
