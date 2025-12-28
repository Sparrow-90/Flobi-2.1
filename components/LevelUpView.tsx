
import React, { useEffect, useState } from 'react';
import { GrowthStage } from '../types';
import { STAGE_CONFIG } from '../constants';

interface LevelUpViewProps {
  newLevel: number;
  newStage: GrowthStage;
  petName: string;
  onClose: () => void;
}

export default function LevelUpView({ newLevel, newStage, petName, onClose }: LevelUpViewProps) {
  const [particles, setParticles] = useState<any[]>([]);
  const stageData = STAGE_CONFIG[newStage as keyof typeof STAGE_CONFIG] || STAGE_CONFIG['Ziarenko'];

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 1.5 + Math.random() * 2,
      size: 3 + Math.random() * 6,
      color: ['#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#ffffff', '#818cf8'][Math.floor(Math.random() * 6)]
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#e0f7fa] via-[#e8f5e9] to-[#ffffff] z-[400] flex flex-col items-center pt-10 pb-8 px-6 overflow-hidden animate-in fade-in duration-700">
      
      {/* Przycisk zamknięcia - dopasowany margines */}
      <button 
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 bg-white/70 border border-white/80 rounded-2xl flex items-center justify-center text-[#365357] shadow-lg backdrop-blur-md active:scale-90 transition-all z-[450]"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Konfetti w tle */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(p => (
          <div 
            key={p.id}
            className="absolute rounded-sm animate-confetti-fall"
            style={{
              left: `${p.x}%`,
              top: '-20px',
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              opacity: 0.7
            }}
          />
        ))}
      </div>

      {/* Header - Bardziej kompaktowy */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-1 shrink-0 mb-4">
        <div className="px-4 py-1.5 bg-emerald-500 text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-md shadow-emerald-200 animate-bounce mb-1">
          NIESAMOWITE!
        </div>
        <h2 className="text-3xl font-black text-[#365357] tracking-tighter uppercase leading-none">
          NOWY POZIOM!
        </h2>
        <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest opacity-70">
          Wiedza zasiliła świat Flobi
        </p>
      </div>

      {/* Centralna sekcja wizualna - Skalowanie dla mniejszych ekranów */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full flex-grow max-h-[340px] mb-4">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[220px] h-[220px] border-[1.5px] border-emerald-400/20 rounded-full animate-spin-slow" />
          <div className="absolute inset-0 bg-emerald-400/10 blur-[80px] rounded-full scale-110 animate-pulse" />
        </div>

        {/* Cień platformy */}
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-36 h-6 bg-black/5 rounded-[100%] blur-lg scale-x-125 animate-pulse" />
        
        <div className="relative flex flex-col items-center animate-evolution-zoom">
           <div className="relative z-20">
              <div className="text-[90px] mb-[-35px] drop-shadow-[0_15px_30px_rgba(16,185,129,0.4)] animate-float-high">
                 {stageData.icon}
              </div>
           </div>
           
           <div className="w-36 h-36 rounded-[54px] bg-gradient-to-br from-emerald-400 to-emerald-600 border-[8px] border-white shadow-xl flex items-center justify-center relative animate-float">
              <div className="absolute inset-3 bg-white/20 blur-lg rounded-full animate-pulse" />
              <div className="flex space-x-3 relative z-10">
                <div className="w-8 h-8 bg-black rounded-full relative overflow-hidden"><div className="w-2.5 h-2.5 bg-white rounded-full absolute top-1 left-1" /></div>
                <div className="w-8 h-8 bg-black rounded-full relative overflow-hidden"><div className="w-2.5 h-2.5 bg-white rounded-full absolute top-1 left-1" /></div>
              </div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="absolute w-1.5 h-1.5 bg-white rounded-full animate-orbit" style={{ animationDelay: `${i * 0.5}s`, top: '50%', left: '50%', marginLeft: '-3px', marginTop: '-3px' }} />
              ))}
           </div>
        </div>

        <div className="mt-4 text-center shrink-0">
           <div className="flex items-center justify-center space-x-2">
              <span className="h-[1.5px] w-8 bg-emerald-300/30" />
              <span className="text-emerald-800 font-black text-2xl uppercase tracking-tighter">POZIOM {newLevel}</span>
              <span className="h-[1.5px] w-8 bg-emerald-300/30" />
           </div>
           <p className="text-slate-400 font-black text-[8px] uppercase tracking-[0.3em] mt-1 opacity-70">{petName.toUpperCase()}</p>
        </div>
      </div>

      {/* Sekcja nagród - Zoptymalizowana wysokość */}
      <div className="relative z-10 w-full space-y-4 shrink-0">
        <div className="bg-white/70 backdrop-blur-xl p-5 rounded-[32px] border border-white shadow-lg text-center">
           <h4 className="text-slate-500 font-black text-[9px] mb-4 uppercase tracking-[0.15em] opacity-80">Nowe nagrody:</h4>
           <div className="flex justify-around items-center">
              <div className="flex flex-col items-center">
                 <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-amber-100/50 mb-2">🏺</div>
                 <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">DESIGN</span>
              </div>
              <div className="flex flex-col items-center">
                 <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-indigo-100/50 mb-2">🎖️</div>
                 <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">STATUS</span>
              </div>
              <div className="flex flex-col items-center">
                 <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-emerald-100/50 mb-2">⚡</div>
                 <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">MOC</span>
              </div>
           </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-5 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-[28px] font-black text-lg uppercase tracking-tighter shadow-xl shadow-emerald-900/10 active:scale-[0.98] transition-all"
        >
          Super, wracam do ogrodu!
        </button>
      </div>

      <style>{`
        @keyframes confetti-fall { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
        @keyframes evolution-zoom { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes float-high { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes spin-rays { from { transform: rotate(0deg); } to { transform: rotate(180deg); } }
        @keyframes orbit { from { transform: rotate(0deg) translateX(85px) rotate(0deg); opacity: 0; } 20%, 80% { opacity: 1; } to { transform: rotate(360deg) translateX(85px) rotate(-360deg); opacity: 0; } }
        .animate-confetti-fall { animation: confetti-fall linear infinite; }
        .animate-evolution-zoom { animation: evolution-zoom 1.2s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-float { animation: float 4s infinite ease-in-out; }
        .animate-float-high { animation: float-high 3s infinite ease-in-out; }
        .animate-orbit { animation: orbit 3.5s linear infinite; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
