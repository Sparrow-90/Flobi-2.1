
import React from 'react';
import { OfflineChallenge } from '../types';

const OFFLINE_CHALLENGES: OfflineChallenge[] = [
  { id: 'clean_room', title: 'Bibliotekarz', description: 'Uporządkuj swoją półkę z książkami lub biurko.', icon: '📚', rewardText: '+15m Czasu | +5 Kropli' },
  { id: 'water_plants', title: 'Domowy Ogrodnik', description: 'Podlej kwiaty w całym domu (nie zapomnij o tych w kuchni!).', icon: '🪴', rewardText: '+15m Czasu | +5 Kropli' },
  { id: 'help_kitchen', title: 'Mały Kucharz', description: 'Pomóż rodzicom przygotować zdrowy posiłek lub sałatkę.', icon: '🥗', rewardText: '+15m Czasu | +5 Kropli' },
  { id: 'exercise', title: 'Sportowiec', description: 'Wykonaj 15-minutową sesję ćwiczeń, jogi lub wyjdź na szybki spacer.', icon: '🏃', rewardText: '+15m Czasu | +5 Kropli' },
  { id: 'recycling', title: 'Eko-Strażnik', description: 'Posegreguj śmieci lub zanieś butelki do recyklingu.', icon: '♻️', rewardText: '+15m Czasu | +5 Kropli' },
];

interface OfflineMissionSelectorProps {
  onSelect: (challenge: OfflineChallenge) => void;
  onCancel: () => void;
}

const OfflineMissionSelector: React.FC<OfflineMissionSelectorProps> = ({ onSelect, onCancel }) => {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-slate-900 to-black z-[120] flex flex-col p-0 animate-in fade-in slide-in-from-bottom duration-300">
      <header className="relative shrink-0 z-20 flex items-center justify-between px-6 mb-8 mt-12">
        <button 
          onClick={onCancel} 
          className="w-12 h-12 flex items-center justify-center bg-white/10 border border-white/10 rounded-2xl text-white active:scale-90 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-center">
            <span className="font-black text-indigo-400 text-[9px] uppercase tracking-[0.3em] block mb-0.5">Wyzwanie Offline</span>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Świat Realny</h2>
        </div>
        <div className="w-12" />
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 space-y-4 pb-12">
        <p className="text-slate-400 text-xs font-medium text-center mb-6">Wybierz misję, którą wykonasz teraz bez telefonu. Gdy skończysz, rodzic musi potwierdzić Twój sukces!</p>
        
        {OFFLINE_CHALLENGES.map((challenge) => (
          <button
            key={challenge.id}
            onClick={() => onSelect(challenge)}
            className="w-full flex items-center p-6 bg-white/5 border border-white/10 rounded-[32px] transition-all active:scale-[0.97] group text-left hover:bg-white/10"
          >
            <div className="text-5xl mr-5 group-hover:scale-110 transition-transform duration-300 shrink-0">
              {challenge.icon}
            </div>
            <div className="flex-1">
              <h4 className="text-white font-black text-lg uppercase tracking-tighter leading-none mb-1">{challenge.title}</h4>
              <p className="text-slate-400 text-[10px] font-medium leading-tight mb-2">{challenge.description}</p>
              <div className="inline-flex items-center px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <span className="text-emerald-400 font-black text-[9px] uppercase tracking-widest">{challenge.rewardText}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OfflineMissionSelector;
