"use client";
import React from 'react';
import { Circle, CheckCircle2, MoreHorizontal } from 'lucide-react';

const EisenhowerMatrix = () => {
  const quadrants = [
    {
      id: 'Q1',
      title: 'Do Now',
      tasks: [
        { id: 1, text: 'Core API Documentation', urgency: true, importance: true },
        { id: 2, text: 'DB Persistence Fix', urgency: true, importance: true },
      ]
    },
    {
      id: 'Q2',
      title: 'Schedule',
      tasks: [
        { id: 3, text: 'Gamification Engine Refactor', urgency: false, importance: true },
        { id: 4, text: 'Phase 3 Planning', urgency: false, importance: true },
      ]
    },
    {
      id: 'Q3',
      title: 'Delegate',
      tasks: [
        { id: 5, text: 'Reply QA Emails', urgency: true, importance: false },
      ]
    },
    {
      id: 'Q4',
      title: 'Eliminate',
      tasks: [
        { id: 6, text: 'Tech News Subscription', urgency: false, importance: false },
      ]
    }
  ];

  return (
    <div className="grid grid-cols-2 grid-rows-2 w-full h-full border border-zinc-900 overflow-hidden">
      {quadrants.map((q, idx) => (
        <div key={q.id} className={`p-6 min-h-[300px] border-zinc-900 ${idx % 2 === 0 ? 'border-r' : ''} ${idx < 2 ? 'border-b' : ''}`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
              {q.title}
            </h3>
            <span className="text-[10px] text-zinc-700 font-mono">/0{idx+1}</span>
          </div>
          
          <div className="space-y-4">
            {q.tasks.map((task) => (
              <div 
                key={task.id} 
                className="group flex items-start space-x-3 text-zinc-300 hover:text-white cursor-pointer transition-colors"
              >
                <Circle size={14} className="mt-0.5 text-zinc-700 group-hover:text-zinc-400 shrink-0" strokeWidth={1.5} />
                <span className="text-sm font-light tracking-tight">{task.text}</span>
              </div>
            ))}
            
            <button className="text-[10px] font-semibold text-zinc-600 hover:text-zinc-400 tracking-wide uppercase mt-4 block">
              + New Task
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EisenhowerMatrix;
