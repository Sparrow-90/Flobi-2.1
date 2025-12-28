
import React, { useState } from 'react';
import { WeeklyGoal } from '../types';

interface WeeklyGoalSelectorProps {
  onConfirm: (goal: WeeklyGoal) => void;
  onCancel: () => void;
}

const templates: Partial<WeeklyGoal>[] = [
  { title: "3 Dni Offline", description: "Brak rozrywki ekranowej przed 18:00 przez 3 dni.", target: 3, type: 'offline', reward: "Wyjście na lody" },
  { title: "5 Misji Edu", description: "Ukończ 5 dodatkowych misji wiedzy w tym tygodniu.", target: 5, type: 'missions', reward: "15 min ekstra zabawy" },
  { title: "Seryjny Uczeń", description: "Utrzymaj serię (streak) przez 4 dni z rzędu.", target: 4, type: 'streak', reward: "Złota Odznaka" },
  { title: "Samodzielny Koniec", description: "Zakończ czas ekranowy bez przypomnienia 5 razy.", target: 5, type: 'streak', reward: "Wspólna gra planszowa" },
];

const WeeklyGoalSelector: React.FC<WeeklyGoalSelectorProps> = ({ onConfirm, onCancel }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [customReward, setCustomReward] = useState('');

  const handleCreate = () => {
    if (selectedIdx === null) return;
    const template = templates[selectedIdx];
    onConfirm({
      ...template as WeeklyGoal,
      id: Math.random().toString(36).substr(2, 9),
      current: 0,
      status: 'pending',
      reward: customReward || template.reward || ''
    });
  };

  return (
    <div className="absolute inset-0 bg-[#020617] z-[150] flex flex-col p-6 animate-in slide-in-from-right duration-300">
      <header className="flex justify-between items-center mb-8 mt-4 shrink-0">
        <button onClick={onCancel} className="text-white/40 uppercase font-black text-[10px] tracking-widest">Anuluj</button>
        <h2 className="text-white font-black text-lg uppercase tracking-tighter text-center">Dodaj Cel z Dzieckiem</h2>
        <div className="w-10" />
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pb-10">
        <p className="text-slate-400 text-xs font-medium text-center mb-6">Wybierz jeden z gotowych celów lub ustalcie własny. Pamiętaj o wspólnej akceptacji!</p>
        
        {templates.map((t, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIdx(idx)}
            className={`w-full p-5 rounded-3xl border text-left transition-all ${
              selectedIdx === idx 
                ? 'bg-indigo-600 border-indigo-400 shadow-xl shadow-indigo-900/40' 
                : 'bg-white/5 border-white/10 opacity-70'
            }`}
          >
            <div className="font-black text-white uppercase tracking-tight text-base mb-1">{t.title}</div>
            <p className="text-[10px] text-white/50 leading-tight">{t.description}</p>
          </button>
        ))}

        <div className="mt-8">
            <label className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-2 block">Ustalcie Nagrodę Offline</label>
            <input 
              type="text" 
              placeholder="np. Wspólny basen, lody, nowa książka..." 
              value={customReward}
              onChange={(e) => setCustomReward(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm outline-none focus:border-indigo-500"
            />
        </div>
      </div>

      <button
        disabled={selectedIdx === null}
        onClick={handleCreate}
        className="w-full py-5 bg-indigo-500 text-white rounded-[32px] font-black text-lg uppercase tracking-tighter shadow-2xl shadow-indigo-900/40 active:scale-95 disabled:opacity-30 mb-4"
      >
        Zaproponuj Dziecku
      </button>
    </div>
  );
};

export default WeeklyGoalSelector;
