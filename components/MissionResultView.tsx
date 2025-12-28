
import React from 'react';
import { Mission } from '../types';

interface MissionResultViewProps {
  mission: Mission;
  success: boolean;
  score: number;
  total: number;
  xpEarned: number;
  dewdropsEarned: number;
  fertilizerEarned: number;
  vitalityBonus: number;
  onClose: () => void;
}

const MissionResultView: React.FC<MissionResultViewProps> = ({ 
  mission, success, score, total, xpEarned, dewdropsEarned, fertilizerEarned, vitalityBonus, onClose 
}) => {
  return (
    <div className="absolute inset-0 bg-white z-[200] flex flex-col p-6 animate-in zoom-in-95 duration-500">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="text-7xl mb-6 animate-bounce">{success ? '🏆' : '💪'}</div>
        <h2 className="text-4xl font-black text-slate-800 uppercase tracking-tighter mb-2">{success ? 'Brawo!' : 'Dobry wysiłek!'}</h2>
        <p className="text-slate-500 font-bold mb-10 uppercase text-xs">Ukończono: {mission.title}</p>
        
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 flex flex-col items-center">
            <span className="text-2xl font-black text-orange-600">+{xpEarned}</span>
            <span className="text-[9px] font-black text-slate-400 uppercase mt-1">XP Wiedzy</span>
          </div>
          <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 flex flex-col items-center">
            <span className="text-2xl font-black text-blue-600">+{dewdropsEarned}</span>
            <span className="text-[9px] font-black text-slate-400 uppercase mt-1">Krople Rosy</span>
          </div>
        </div>

        {fertilizerEarned > 0 && (
          <div className="mt-4 w-full bg-emerald-50 p-4 rounded-3xl border border-emerald-100 flex items-center justify-center">
            <span className="text-2xl mr-3">🧪</span>
            <span className="text-emerald-700 font-black text-xs uppercase">Otrzymano Super Nawóz!</span>
          </div>
        )}

        <div className="w-full mt-8">
            <div className="flex justify-between items-center mb-2"><span className="text-[10px] font-black text-slate-400 uppercase">Energia Flobi</span><span className="text-xs font-black text-emerald-600">+{vitalityBonus}%</span></div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${vitalityBonus}%` }} /></div>
        </div>
      </div>

      <button onClick={onClose} className="w-full py-5 bg-slate-900 text-white rounded-[32px] font-black text-lg uppercase tracking-tighter shadow-xl active:scale-95">Wróć do ogrodu</button>
    </div>
  );
};

export default MissionResultView;
