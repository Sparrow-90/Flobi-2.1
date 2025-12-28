
import React from 'react';

interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  glow: string;
}

const subjects: Subject[] = [
  { id: 'math', name: 'Matematyka', icon: '🔢', color: 'bg-blue-500/10 border-blue-500/20', glow: 'shadow-blue-500/10' },
  { id: 'nature', name: 'Przyroda', icon: '🌿', color: 'bg-emerald-500/10 border-emerald-500/20', glow: 'shadow-emerald-500/10' },
  { id: 'history', name: 'Historia', icon: '🏰', color: 'bg-orange-500/10 border-orange-500/20', glow: 'shadow-orange-500/10' },
  { id: 'polish', name: 'Język Polski', icon: '📖', color: 'bg-red-500/10 border-red-500/20', glow: 'shadow-red-500/10' },
  { id: 'english', name: 'Język Angielski', icon: '🇬🇧', color: 'bg-indigo-500/10 border-indigo-500/20', glow: 'shadow-indigo-500/10' },
  { id: 'logic', name: 'Logika', icon: '🧩', color: 'bg-yellow-500/10 border-yellow-500/20', glow: 'shadow-yellow-500/10' },
];

interface SubjectSelectorProps {
  onSelect: (subjectName: string) => void;
  onCancel: () => void;
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({ onSelect, onCancel }) => {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#4fc3f7] via-[#81c784] to-[#f8fafc] z-[120] flex flex-col p-0 animate-in fade-in slide-in-from-right duration-300 overflow-hidden">
      
      {/* Fixed Header */}
      <header className="relative shrink-0 z-20 flex items-center justify-between px-6 mb-4 mt-10">
        <button 
          onClick={onCancel} 
          className="w-12 h-12 flex items-center justify-center bg-white/20 border border-white/20 rounded-2xl text-white active:scale-90 transition-all hover:bg-white/30 backdrop-blur-md shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="text-center">
            <span className="font-black text-white/80 text-[9px] uppercase tracking-[0.3em] block mb-0.5 drop-shadow-sm">Wybierz Wiedzę</span>
            <h2 className="text-2xl font-black text-[#365357] uppercase tracking-tighter drop-shadow-md">Księga Wyzwań</h2>
        </div>
        <div className="w-12" />
      </header>

      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 space-y-4 pb-40">
        <div className="space-y-3">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => onSelect(subject.name)}
              className="w-full flex items-center p-6 rounded-[28px] border border-white/40 transition-all active:scale-[0.97] group relative overflow-hidden backdrop-blur-md bg-white/60 shadow-lg hover:bg-white/70"
            >
              <div className="text-5xl mr-5 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm shrink-0">
                {subject.icon}
              </div>
              
              <div className="flex-1 text-left">
                <span className="font-black text-slate-900 text-xl uppercase tracking-tighter block group-hover:text-emerald-600 transition-colors leading-none mb-1">
                  {subject.name}
                </span>
                <div className="flex items-center">
                  <span className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mr-3">Bonus: +20 min</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest ml-3">Quiz</span>
                </div>
              </div>

              <div className="w-8 h-8 flex items-center justify-center text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Info Box - Now inside the scrollable flow to avoid "sticking" issues */}
        <div className="mt-8 p-6 bg-white/30 border border-white/20 rounded-[32px] text-center backdrop-blur-md shadow-inner">
          <p className="text-slate-800 text-[10px] font-black uppercase tracking-widest leading-relaxed">
            Zalicz quiz, aby Twoje <span className="text-emerald-700 underline underline-offset-4 decoration-2">Flobi</span> wyewoluowało!
          </p>
          <p className="text-slate-500 text-[8px] font-bold uppercase tracking-[0.2em] mt-3 opacity-60">Wiedza to Twój największy skarb</p>
        </div>
      </div>
      
      {/* Fade out at the bottom of the scroll list to show bottom nav is below */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/20 to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default SubjectSelector;
