"use client";
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const PomodoroTimer = () => {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('FOCUS'); // FOCUS, REST

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isActive, seconds]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center py-12 px-6 bg-zinc-950/40 border border-zinc-900 rounded-lg">
      <div className="flex items-center space-x-2 mb-8">
         <span className={`w-1.5 h-1.5 rounded-full ${mode === 'FOCUS' ? 'bg-zinc-400' : 'bg-emerald-500'}`}></span>
         <span className="text-[10px] uppercase font-semibold tracking-widest text-zinc-500">{mode} MODE</span>
      </div>

      <div className="text-[84px] font-light text-zinc-100 mb-10 tracking-tighter tabular-nums leading-none">
        {formatTime(seconds)}
      </div>

      <div className="flex space-x-6 items-center">
        <button
          onClick={() => setIsActive(!isActive)}
          className="w-12 h-12 flex items-center justify-center rounded-full border border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900 transition-all text-zinc-300"
        >
          {isActive ? <Pause size={18} strokeWidth={1.5} /> : <Play size={18} strokeWidth={1.5} className="ml-0.5" />}
        </button>
        
        <button
          onClick={() => { setIsActive(false); setSeconds(25 * 60); }}
          className="p-2 text-zinc-600 hover:text-zinc-400 transition-colors"
        >
          <RotateCcw size={14} strokeWidth={1.5} />
        </button>
      </div>

      <div className="mt-12 text-[10px] text-zinc-600 font-medium uppercase tracking-[0.2em]">
        DAILY GOAL: <span className="text-zinc-400">1/4 SESSIONS</span>
      </div>
    </div>
  );
};

export default PomodoroTimer;
