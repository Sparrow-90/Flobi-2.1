
import React from 'react';
import { UserStats } from '../types';

interface ParentSignalsProps {
  stats: UserStats;
  onSendGift?: (type: 'dewdrops' | 'vitality' | 'xp' | 'fertilizer') => void;
  onVerifyMission?: (success: boolean) => void;
}

const ParentSignals: React.FC<ParentSignalsProps> = ({ stats, onSendGift, onVerifyMission }) => {
  const predispositions = [
    { label: 'Analityka i Logika', value: 85, color: 'bg-blue-500', icon: '🧩' },
    { label: 'Przyroda i Ekologia', value: 72, color: 'bg-emerald-500', icon: '🌿' },
    { label: 'Języki Obce', value: 45, color: 'bg-indigo-500', icon: '🌍' },
    { label: 'Koncentracja', value: 60, color: 'bg-amber-500', icon: '🎯' },
  ];

  const behaviorPatterns = [
    { 
      title: 'Odporność na błędy', 
      desc: 'Dziecko powtórzyło trudny quiz 3 razy, aż do sukcesu. Wysoka determinacja.', 
      status: 'Wysoka', 
      color: 'text-emerald-400',
      icon: '💎' 
    },
    { 
      title: 'Eksploracja tematów', 
      desc: 'Często wybiera nowe przedmioty zamiast powtarzać ulubione. Duża ciekawość świata.', 
      status: 'Aktywna', 
      color: 'text-blue-400',
      icon: '🚀' 
    },
    { 
      title: 'Nawyk Samoregulacji', 
      desc: 'W 80% przypadków kończy zabawę przed twardą blokadą czasu.', 
      status: 'Stabilny', 
      color: 'text-indigo-400',
      icon: '⚖️' 
    }
  ];

  return (
    <div className="flex flex-col space-y-6 pb-24 animate-in fade-in slide-in-from-right duration-500">
      
      {/* Weryfikacja Misji Offline */}
      {stats.pendingOfflineMission && (
        <section className="bg-indigo-600 p-6 rounded-[32px] border border-white/20 shadow-2xl animate-pulse-subtle">
          <div className="flex items-center mb-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mr-4">
              {stats.pendingOfflineMission.icon}
            </div>
            <div>
              <h3 className="text-white font-black text-lg leading-tight uppercase tracking-tighter">Weryfikacja Misji</h3>
              <p className="text-[10px] text-indigo-200 font-bold uppercase tracking-widest">Dziecko czeka na potwierdzenie!</p>
            </div>
          </div>
          <div className="bg-black/20 p-4 rounded-2xl mb-6">
            <h4 className="text-white font-black text-sm uppercase mb-1">{stats.pendingOfflineMission.title}</h4>
            <p className="text-xs text-indigo-100/70 leading-tight">{stats.pendingOfflineMission.description}</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => onVerifyMission?.(true)}
              className="flex-1 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-black text-xs uppercase tracking-tighter shadow-lg transition-all active:scale-95"
            >
              Zatwierdź i daj nagrodę
            </button>
            <button 
              onClick={() => onVerifyMission?.(false)}
              className="px-4 py-4 bg-white/10 hover:bg-white/20 text-white/60 rounded-2xl font-black text-xs uppercase tracking-tighter transition-all"
            >
              Odrzuć
            </button>
          </div>
        </section>
      )}

      {/* Header Report */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-[32px] border border-white/10 shadow-xl">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-2xl mr-4 border border-indigo-500/30">
            📊
          </div>
          <div>
            <h3 className="text-white font-black text-lg uppercase tracking-tight">Raport Predyspozycji</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Aktualizacja: Dzisiaj, 08:30</p>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed mb-6 font-medium">
          Na podstawie ostatnich 14 misji, Twoje dziecko wykazuje silne skłonności do <span className="text-indigo-400 font-bold">nauk ścisłych</span> oraz wysoką empatię wobec natury.
        </p>
        
        <div className="space-y-4">
          {predispositions.map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-[11px] font-black text-slate-400 mb-1.5 uppercase tracking-wider">
                <span className="flex items-center">{item.icon} <span className="ml-2">{item.label}</span></span>
                <span className="text-white">{item.value}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${item.color} rounded-full transition-all duration-1000`} 
                  style={{ width: `${item.value}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NOWE: Wykryte Wzorce Zachowań */}
      <section className="bg-white/5 p-6 rounded-[32px] border border-white/10 backdrop-blur-md">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-xl border border-blue-500/30">🧠</div>
          <h4 className="text-[11px] font-black text-blue-300 uppercase tracking-[0.2em]">Wykryte Wzorce</h4>
        </div>
        
        <div className="space-y-4">
          {behaviorPatterns.map((pattern, idx) => (
            <div key={idx} className="bg-black/20 p-4 rounded-2xl border border-white/5 flex items-start group">
              <div className="w-10 h-10 shrink-0 bg-white/5 rounded-xl flex items-center justify-center text-xl mr-4 group-hover:scale-110 transition-transform">
                {pattern.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white font-black text-xs uppercase tracking-tight">{pattern.title}</span>
                  <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full bg-white/5 ${pattern.color}`}>
                    {pattern.status}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight font-medium">
                  {pattern.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Focus Insights */}
      <section className="bg-white/5 p-6 rounded-[32px] border border-white/10 backdrop-blur-md">
        <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-4">Dynamika Koncentracji</h4>
        <div className="flex items-center justify-between bg-black/20 p-4 rounded-2xl border border-white/5">
          <div className="flex-1">
            <div className="text-emerald-400 font-black text-sm">Złote Godziny: 16:00 - 18:00</div>
            <div className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tight">Najwyższa skuteczność w quizach</div>
          </div>
          <div className="text-2xl">🔥</div>
        </div>
        <div className="mt-3 flex items-center justify-between bg-black/20 p-4 rounded-2xl border border-white/5">
          <div className="flex-1">
            <div className="text-amber-400 font-black text-sm">Uwaga: Spadek po 20:30</div>
            <div className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tight">Zalecane wygaszenie ekranu</div>
          </div>
          <div className="text-2xl">🌙</div>
        </div>
      </section>

      <style>{`
        @keyframes pulse-subtle { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.95; transform: scale(0.99); } }
        .animate-pulse-subtle { animation: pulse-subtle 3s infinite ease-in-out; }
      `}</style>
    </div>
  );
};

export default ParentSignals;
