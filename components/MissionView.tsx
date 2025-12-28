
import React, { useState } from 'react';
import { Mission } from '../types.ts';

interface MissionViewProps {
  mission: Mission;
  onComplete: (success: boolean, score: number, total: number) => void;
  onCancel: () => void;
}

const MissionView: React.FC<MissionViewProps> = ({ mission, onComplete, onCancel }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (index: number) => {
    const isCorrect = index === mission.questions![currentQuestion].correctIndex;
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);
    
    if (currentQuestion < mission.questions!.length - 1) {
      setCurrentQuestion(q => q + 1);
    } else {
      const total = mission.questions!.length;
      const isSuccess = newScore >= total / 2;
      onComplete(isSuccess, newScore, total);
    }
  };

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#e0f7fa] via-[#e8f5e9] to-[#f8fafc] z-[200] flex flex-col p-6 overflow-hidden animate-in slide-in-from-bottom duration-500">
      <div className="absolute top-[-5%] right-[-10%] w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <header className="relative z-10 flex justify-between items-center mb-6 mt-4 shrink-0">
        <button 
          onClick={onCancel} 
          className="w-12 h-12 flex items-center justify-center bg-white/40 border border-white/60 rounded-2xl text-[#365357] active:scale-90 transition-all shadow-md backdrop-blur-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div className="text-center">
            <span className="font-black text-emerald-800 text-[10px] uppercase tracking-[0.3em] block mb-0.5 opacity-60">Misja Aktywna</span>
            <h3 className="text-[#365357] font-black text-lg tracking-tighter truncate max-w-[200px] uppercase">{mission.title}</h3>
        </div>
        <div className="w-12" />
      </header>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full overflow-y-auto no-scrollbar pb-10">
        {mission.questions ? (
          <div className="w-full space-y-6">
            <div className="text-center mb-4">
              <div className="inline-flex items-center bg-white/60 text-emerald-900 border border-white/40 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm">
                Pytanie {currentQuestion + 1} z {mission.questions.length}
              </div>
              <h3 className="text-2xl font-black text-[#365357] leading-tight px-2 tracking-tight drop-shadow-sm">
                {mission.questions[currentQuestion].question}
              </h3>
            </div>
            
            <div className="space-y-4 w-full px-2">
              {mission.questions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="w-full p-6 text-left bg-white/70 border border-white hover:border-emerald-500/50 hover:bg-emerald-50 rounded-[32px] transition-all group active:scale-[0.97] backdrop-blur-md shadow-lg"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-2xl border border-slate-100 flex items-center justify-center mr-5 bg-slate-50 group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all font-black text-base text-slate-400 group-hover:text-white">
                        {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="flex-1 font-bold text-slate-700 group-hover:text-[#365357] text-lg leading-snug">
                      {option}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full text-center px-4">
             <div className="w-28 h-28 bg-white/60 border border-white/40 rounded-[40px] flex items-center justify-center text-6xl mx-auto mb-8 animate-pulse shadow-xl backdrop-blur-md">
                📜
             </div>
             <h3 className="text-3xl font-black text-[#365357] mb-4 tracking-tighter uppercase">{mission.title}</h3>
             <p className="text-slate-600 mb-10 text-lg font-medium leading-relaxed max-w-sm mx-auto">{mission.description}</p>
             <button
               onClick={() => onComplete(true, 1, 1)}
               className="w-full py-6 bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white rounded-[32px] font-black text-xl shadow-xl uppercase tracking-tighter transition-all active:scale-95 shadow-emerald-900/10"
             >
               Rozpocznij Wyzwanie
             </button>
          </div>
        )}
      </div>

      {mission.questions && (
        <div className="relative z-10 flex justify-center items-center space-x-3 py-8">
            {mission.questions.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    i === currentQuestion 
                      ? 'w-12 bg-emerald-600 shadow-[0_0_10px_rgba(5,150,105,0.4)]' 
                      : i < currentQuestion 
                        ? 'w-2.5 bg-emerald-800/30' 
                        : 'w-2.5 bg-slate-400/20'
                  }`} 
                />
            ))}
        </div>
      )}

      <div className="relative z-10 text-center pb-6">
        <p className="text-[10px] text-emerald-800/60 font-bold uppercase tracking-widest">
          Zalicz misję, aby zdobyć <span className="text-emerald-700 underline underline-offset-2">Krople Rosy</span>
        </p>
      </div>
    </div>
  );
};

export default MissionView;
