"use client";
import React, { useState, useEffect } from 'react';
import { CheckCircle2, Trash2 } from 'lucide-react';

const TaskHistory = () => {
  const [tasks, setTasks] = useState<any[]>([]);

  const fetchTasks = () => {
    fetch('http://localhost:8000/tasks')
      .then(res => res.json())
      .then(data => {
        const completed = data
          .filter((t: any) => t.is_completed)
          .sort((a: any, b: any) => new Date(b.updated_at || b.created_at).getTime() - new Date(a.updated_at || a.created_at).getTime());
        setTasks(completed);
      })
      .catch(err => console.error("API error:", err));
  };

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(fetchTasks, 10000);
    return () => clearInterval(interval);
  }, []);

  const deleteTask = (taskId: number) => {
    if (!confirm("Deseja remover esta tarefa do histórico permanentemente?")) return;

    fetch(`http://localhost:8000/tasks/${taskId}`, {
      method: 'DELETE',
    })
    .then(() => fetchTasks())
    .catch(err => console.error("Delete task error:", err));
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (tasks.length === 0) return null;

  return (
    <div className="mt-12 pt-12 border-t border-zinc-900">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xs font-semibold text-zinc-600 uppercase tracking-[0.2em]">Recently Completed</h2>
        <div className="h-[0.5px] flex-1 bg-zinc-900/50 mx-6"></div>
      </div>
      
      <div className="space-y-3">
        {tasks.slice(0, 5).map((task) => (
          <div key={task.id} className="group flex items-center justify-between px-2 py-1">
            <div className="flex items-center space-x-3 text-zinc-600">
              <CheckCircle2 size={12} className="shrink-0 text-emerald-900/50" />
              <span className="text-[11px] font-light tracking-tight line-through opacity-50">{task.title}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-[10px] font-mono text-zinc-800">{formatTime(task.updated_at || task.created_at)}</span>
              <button 
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 text-zinc-700 hover:text-rose-500 transition-all"
              >
                <Trash2 size={10} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskHistory;
