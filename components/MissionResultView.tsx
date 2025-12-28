
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
  const isPerfect = score === total && total > 0;

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#e0f7fa] via-[#e8f5e9] to-[#f8fafc] z-[200] flex flex-col px-6 py-8 overflow-hidden animate-in zoom-in-95 fade-in duration-500">
      
      {/* Dekoracyjne elementy tła */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />

      <div className="relative z-10 flex-1 flex flex-col justify-between">
        
        <div className="flex flex-col items-center pt-8">
          <div className={`w-24 h-24 rounded-[40px] flex items-center justify-center text-6xl mb-6 shadow-2xl border-4 animate-bounce-subtle ${
            success 
              ? 'bg-white/80 border-emerald-400 text-emerald-500 shadow-emerald-200' 
              : 'bg-white/80 border-amber-400 text-amber-500 shadow-amber-200'
          }`}>
            {isPerfect ? '🌟' : success ? '🏆' : '💪'}
          </div>
          
          <div className="text-center space-y-2">
            <h2 className={`text-4xl font-black tracking-tighter uppercase leading-none ${
              success ? 'text-emerald-700' : 'text-amber-700'
            }`}>
              {isPerfect ? 'PERFEKCYJNIE!' : success ? 'ZNAKOMICIE!' : 'DOBRY WYSIŁEK!'}
            </h2>
            <div className="inline-block px-4 py-1 bg-white/50 backdrop-blur-sm rounded-full border border-black/5">
                <p className="text-slate-600 font-black uppercase text-[10px] tracking-[0.2em]">
                    Ukończono: {mission.title}
                </p>
            </div>
          </div>
        </div>

        {/* Reward Grid */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="bg-white/80 backdrop-blur-md border border-white p-5 rounded-[32px] flex flex-col items-center shadow-lg shadow-emerald-900/5">
            <span className="text-3xl mb-2">✨</span>
            <span className="text-2xl font-black bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">+{xpEarned}</span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">XP Wiedzy</span>
          </div>
          
          <div className="bg-white/80 backdrop-blur-md border border-white p-5 rounded-[32px] flex flex-col items-center shadow-lg shadow-emerald-900/5">
            <span className="text-3xl mb-2">💧</span>
            <span className="text-2xl font-black text-blue-600">+{dewdropsEarned}</span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Krople Rosy</span>
          </div>

          {fertilizerEarned > 0 && (
            <div className="col-span-2 bg-gradient-to-r from-amber-400/20 to-orange-400/20 border border-amber-200 p-5 rounded-[32px] flex items-center justify-center animate-in slide-in-from-bottom duration-700 shadow-lg">
                <span className="text-4xl mr-4 animate-pulse">🧪</span>
                <div>
                    <span className="text-xl font-black text-amber-700 uppercase tracking-tighter block">EKSTRA NAWÓZ!</span>
                    <p className="text-[9px] font-bold text-amber-600/80 uppercase tracking-widest">Bonus za 100% poprawności</p>
                </div>
            </div>
          )}
        </div>

        {/* Vitality Progress Section */}
        <div className="space-y-4">
          <div className="bg-white/60 backdrop-blur-md p-6 rounded-[32px] border border-white shadow-md relative overflow-hidden">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                    <span className="text-xl mr-2">🌱</span>
                    <span className="text-[11px] font-black text-emerald-800 uppercase tracking-widest">Energia Flobi</span>
                </div>
                <span className="text-sm font-black text-emerald-600">+{vitalityBonus}%</span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden border border-slate-300/30">
                <div 
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-1000 delay-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]" 
                    style={{ width: `${vitalityBonus}%` }} 
                />
            </div>
            <p className="text-center text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-3">Twoja roślina czuje się wspaniale!</p>
          </div>
        </div>

        {/* Close Button */}
        <div className="pt-4 pb-4">
          <button
            onClick={onClose}
            className={`w-full py-6 rounded-[32px] font-black text-xl uppercase tracking-tighter transition-all active:scale-95 shadow-xl ${
              success 
                ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-emerald-900/20' 
                : 'bg-white border-2 border-slate-200 text-slate-600 shadow-slate-900/5'
            }`}
          >
            {success ? 'Odbierz Nagrody!' : 'Wróć do ogrodu'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bounce-subtle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .animate-bounce-subtle { animation: bounce-subtle 3s infinite ease-in-out; }
      `}</style>
    </div>
  );
};

export default MissionResultView;
