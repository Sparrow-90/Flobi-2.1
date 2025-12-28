
import React, { useState } from 'react';
import { WeeklyGoal } from '../types.ts';

interface LimitSettings {
  baseMinutes: number;
  nightModeStart: string;
  bonusDewdropsPerLevel: boolean;
  strictMode: boolean;
}

interface LimitConfigViewProps {
  activeGoals: WeeklyGoal[];
  onAddGoal: () => void;
  onSendGift?: (type: 'dewdrops' | 'vitality' | 'xp' | 'fertilizer') => void;
}

const LimitConfigView: React.FC<LimitConfigViewProps> = ({ activeGoals, onAddGoal, onSendGift }) => {
  const [settings, setSettings] = useState<LimitSettings>({
    baseMinutes: 60,
    nightModeStart: '20:30',
    bonusDewdropsPerLevel: true,
    strictMode: false
  });

  const updateSetting = (key: keyof LimitSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col space-y-6 pb-24 animate-in fade-in slide-in-from-bottom duration-500">
      <header>
        <h3 className="text-xl font-black text-white tracking-tighter uppercase">Limity i Zasady</h3>
        <p className="text-xs text-slate-400 font-medium">Zarządzaj czasem rozrywki i nagrodami</p>
      </header>

      <section className="bg-gradient-to-br from-indigo-600 to-blue-800 p-6 rounded-[32px] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
        <div className="relative z-10">
          <h4 className="text-[11px] font-black text-indigo-200 uppercase tracking-widest mb-4 flex items-center">
            <span className="mr-2 text-base">🎁</span> Wyślij Prezent Dziecku
          </h4>
          <div className="grid grid-cols-3 gap-3">
            <button 
              onClick={() => onSendGift?.('dewdrops')}
              className="flex flex-col items-center p-3 bg-white/10 border border-white/10 rounded-2xl active:scale-95 transition-all hover:bg-white/20"
            >
              <span className="text-2xl mb-1">💧</span>
              <span className="text-[8px] font-black text-white uppercase tracking-tight">Krople (+5)</span>
            </button>
            <button 
              onClick={() => onSendGift?.('vitality')}
              className="flex flex-col items-center p-3 bg-white/10 border border-white/10 rounded-2xl active:scale-95 transition-all hover:bg-white/20"
            >
              <span className="text-2xl mb-1">🌱</span>
              <span className="text-[8px] font-black text-white uppercase tracking-tight">Energia (+20)</span>
            </button>
            <button 
              onClick={() => onSendGift?.('fertilizer')}
              className="flex flex-col items-center p-3 bg-white/10 border border-white/10 rounded-2xl active:scale-95 transition-all hover:bg-white/20"
            >
              <span className="text-2xl mb-1">🧪</span>
              <span className="text-[8px] font-black text-white uppercase tracking-tight">Nawóz (+1)</span>
            </button>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-indigo-900/40 to-slate-900/40 p-6 rounded-[32px] border border-indigo-500/20 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-black text-white uppercase tracking-tight">Cele i Nawyki</h4>
          <button 
            onClick={onAddGoal}
            className="bg-indigo-500 text-white text-[10px] font-black px-4 py-2 rounded-full shadow-lg active:scale-95 transition-all"
          >
            + DODAJ CEL
          </button>
        </div>

        <div className="space-y-3">
          {activeGoals.length === 0 ? (
            <div className="text-center py-4 border border-dashed border-white/10 rounded-2xl">
              <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Brak aktywnych celów</p>
            </div>
          ) : (
            activeGoals.map(goal => (
              <div key={goal.id} className="bg-black/20 p-4 rounded-2xl border border-white/5 relative overflow-hidden">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-black text-white uppercase tracking-tight">{goal.title}</span>
                  <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase ${
                    goal.status === 'pending' ? 'bg-amber-500/20 text-amber-500' : 'bg-emerald-500/20 text-emerald-500'
                  }`}>
                    {goal.status === 'pending' ? 'Czeka na akceptację' : 'Aktywny'}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: `${(goal.current / goal.target) * 100}%` }} />
                </div>
                <div className="flex justify-between mt-1.5 text-[8px] font-black text-white/30 uppercase tracking-widest">
                  <span>Postęp: {goal.current}/{goal.target}</span>
                  <span>Nagroda: {goal.reward}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="bg-white/5 p-6 rounded-[32px] border border-white/10 backdrop-blur-md shadow-xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-tight">Limit Czasu Rozrywki</h4>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">Gry, YouTube i Social Media</p>
          </div>
          <div className="text-2xl font-black text-blue-400 bg-blue-500/10 px-4 py-2 rounded-2xl border border-blue-500/20">
            {settings.baseMinutes}m
          </div>
        </div>
        
        <input 
          type="range" 
          min="0" 
          max="180" 
          step="15" 
          value={settings.baseMinutes}
          onChange={(e) => updateSetting('baseMinutes', parseInt(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        
        <div className="flex justify-between mt-3 px-1 text-[9px] font-black text-slate-600 uppercase tracking-widest">
          <span>0 min</span>
          <span>90 min</span>
          <span>180 min</span>
        </div>
      </section>

      <div className="pt-4">
        <button 
          onClick={() => alert('Limity zapisane!')}
          className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[32px] font-black text-lg uppercase tracking-tighter shadow-2xl shadow-blue-900/40 transition-all active:scale-95"
        >
          Zapisz Limity
        </button>
      </div>
    </div>
  );
};

export default LimitConfigView;
