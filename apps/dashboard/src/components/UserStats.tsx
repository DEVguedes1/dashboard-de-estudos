import React from 'react';

const UserStats = () => {
  return (
    <div className="w-full">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-xs font-medium text-zinc-400">
          UE
        </div>
        <div>
          <h2 className="text-sm font-medium text-zinc-200">Usuário Estudo</h2>
          <p className="text-[10px] text-zinc-500 uppercase tracking-tight">Nível 15 • Guardião do Foco</p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between text-[10px] mb-1.5 uppercase tracking-wider">
            <span className="text-zinc-500 font-medium">Experiência</span>
            <span className="text-zinc-400">75%</span>
          </div>
          <div className="w-full bg-zinc-900 h-[1.5px]">
            <div className="bg-zinc-200 h-full" style={{ width: '75%' }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[10px] mb-1.5 uppercase tracking-wider">
            <span className="text-zinc-500 font-medium">Consistência</span>
            <span className="text-zinc-400">12 dias</span>
          </div>
          <div className="w-full bg-zinc-900 h-[1.5px]">
            <div className="bg-zinc-200 h-full" style={{ width: '85%' }}></div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-zinc-900">
        <div className="flex items-start space-x-2">
           <div className="text-zinc-600 text-[10px] mt-0.5 tracking-tighter uppercase font-bold">Próximo:</div>
           <div className="text-[10px] text-zinc-400 font-medium leading-normal">
             Medalha de 2h Foco Ininterrupto (Faltam 15min)
           </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
