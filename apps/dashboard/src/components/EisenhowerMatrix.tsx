"use client";
import React, { useState, useEffect } from 'react';
import { Circle } from 'lucide-react';

const EisenhowerMatrix = () => {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("API error:", err));
  }, []);

  const quadrants = [
    {
      id: 'Q1',
      title: 'Do Now',
      tasks: tasks.filter(t => t.is_important && t.is_urgent)
    },
    {
      id: 'Q2',
      title: 'Schedule',
      tasks: tasks.filter(t => t.is_important && !t.is_urgent)
    },
    {
      id: 'Q3',
      title: 'Delegate',
      tasks: tasks.filter(t => !t.is_important && t.is_urgent)
    },
    {
      id: 'Q4',
      title: 'Eliminate',
      tasks: tasks.filter(t => !t.is_important && !t.is_urgent)
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
                className={`group flex items-start space-x-3 hover:text-white cursor-pointer transition-colors ${task.is_completed ? 'text-zinc-600 line-through' : 'text-zinc-300'}`}
              >
                <Circle size={14} className="mt-0.5 text-zinc-700 group-hover:text-zinc-400 shrink-0" strokeWidth={1.5} />
                <span className="text-sm font-light tracking-tight">{task.title}</span>
              </div>
            ))}
            
            {q.tasks.length === 0 && (
              <p className="text-[10px] italic text-zinc-800 tracking-tight">Sem tarefas pendentes.</p>
            )}
            
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
