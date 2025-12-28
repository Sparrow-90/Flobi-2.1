
import React, { useState } from 'react';
import { Mission } from '../types';

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
    <div className="absolute inset-0 bg-white z-[200] flex flex-col p-6 animate-in slide-in-from-bottom duration-500">
      <header className="flex justify-between items-center mb-6">
        <button onClick={onCancel} className="p-2 text-slate-400"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg></button>
        <h3 className="font-black text-lg uppercase tracking-tighter">{mission.title}</h3>
        <div className="w-10" />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center">
        {mission.questions ? (
          <div className="w-full space-y-6">
            <div className="text-center"><span className="text-[10px] font-black text-emerald-600 uppercase">Pytanie {currentQuestion + 1} / {mission.questions.length}</span><h3 className="text-xl font-black text-slate-800 mt-2">{mission.questions[currentQuestion].question}</h3></div>
            <div className="space-y-3">
              {mission.questions[currentQuestion].options.map((option, idx) => (
                <button key={idx} onClick={() => handleAnswer(idx)} className="w-full p-5 text-left bg-slate-50 border-2 border-slate-100 rounded-3xl font-bold hover:border-emerald-500 active:scale-95 transition-all">{option}</button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
             <div className="text-6xl mb-6">📜</div>
             <p className="text-slate-600 mb-8 font-medium">{mission.description}</p>
             <button onClick={() => onComplete(true, 1, 1)} className="w-full py-5 bg-emerald-500 text-white rounded-[32px] font-black text-lg uppercase tracking-tighter shadow-xl active:scale-95">Rozpocznij Wyzwanie</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionView;
