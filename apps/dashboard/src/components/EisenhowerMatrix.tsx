"use client";
import React, { useState, useEffect } from 'react';
import { Circle, CheckCircle2 } from 'lucide-react';

const EisenhowerMatrix = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [addingTo, setAddingTo] = useState<string | null>(null);

  const fetchTasks = () => {
    fetch('http://localhost:8000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("API error:", err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const completeTask = (task: any) => {
    if (task.is_completed) return;
    
    fetch(`http://localhost:8000/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...task, is_completed: true })
    })
    .then(res => res.json())
    .then(() => fetchTasks()) // Recarrega para ver o XP subindo no perfil
    .catch(err => console.error("Update task error:", err));
  };

  const createTask = (qId: string) => {
    if (!newTaskTitle.trim()) return;

    const isImportant = qId === 'Q1' || qId === 'Q2';
    const isUrgent = qId === 'Q1' || qId === 'Q3';

    fetch('http://localhost:8000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newTaskTitle,
        is_important: isImportant,
        is_urgent: isUrgent,
        is_completed: false
      })
    })
    .then(res => res.json())
    .then(() => {
      setNewTaskTitle("");
      setAddingTo(null);
      fetchTasks();
    })
    .catch(err => console.error("Create task error:", err));
  };

  const quadrants = [
    { id: 'Q1', title: 'Do Now', tasks: tasks.filter(t => t.is_important && t.is_urgent && !t.is_completed) },
    { id: 'Q2', title: 'Schedule', tasks: tasks.filter(t => t.is_important && !t.is_urgent && !t.is_completed) },
    { id: 'Q3', title: 'Delegate', tasks: tasks.filter(t => !t.is_important && t.is_urgent && !t.is_completed) },
    { id: 'Q4', title: 'Eliminate', tasks: tasks.filter(t => !t.is_important && !t.is_urgent && !t.is_completed) }
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
                onClick={() => completeTask(task)}
              >
                <Circle size={14} className="mt-0.5 text-zinc-700 group-hover:text-emerald-500 shrink-0 transition-colors" strokeWidth={1.5} />
                <span className="text-sm font-light tracking-tight">{task.title}</span>
              </div>
            ))}
            
            {addingTo === q.id ? (
              <div className="space-y-2">
                <input
                  autoFocus
                  className="w-full bg-zinc-900 border border-zinc-800 text-[11px] px-3 py-1.5 rounded-sm focus:outline-none focus:border-zinc-600 text-zinc-200"
                  placeholder="Task title..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && createTask(q.id)}
                  onBlur={() => !newTaskTitle && setAddingTo(null)}
                />
                <div className="flex space-x-2">
                  <button onClick={() => createTask(q.id)} className="text-[9px] font-bold text-zinc-300 uppercase">Save</button>
                  <button onClick={() => setAddingTo(null)} className="text-[9px] font-bold text-zinc-600 uppercase">Cancel</button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setAddingTo(q.id)}
                className="text-[10px] font-semibold text-zinc-600 hover:text-zinc-400 tracking-wide uppercase mt-4 block"
              >
                + New Task
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EisenhowerMatrix;
