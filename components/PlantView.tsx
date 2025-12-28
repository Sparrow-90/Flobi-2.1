
import React, { useState, useRef, useEffect } from 'react';
import { GrowthStage } from '../types';
import { STAGE_CONFIG } from '../constants';

interface PlantViewProps {
  petName: string;
  stage: GrowthStage;
  vitality: number;
  xp: number;
  level: number;
  screenTimeMinutes: number;
  dewdrops: number;
  fertilizer?: number;
  streak?: number;
  onUseDewdrop?: () => boolean;
  onUseFertilizer?: () => boolean;
  onUpdatePetName?: (newName: string) => void;
}

const PlantView: React.FC<PlantViewProps> = ({ 
  petName, stage, vitality, xp, level, screenTimeMinutes, dewdrops, fertilizer = 0, streak = 0,
  onUseDewdrop, onUseFertilizer, onUpdatePetName
}) => {
  const [isSmiling, setIsSmiling] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(petName);
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = useState(0);
  
  const stageData = STAGE_CONFIG[stage as keyof typeof STAGE_CONFIG] || STAGE_CONFIG['Ziarenko'];

  useEffect(() => {
    if (isEditingName && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditingName]);

  useEffect(() => {
    if (measureRef.current) {
      setInputWidth(measureRef.current.offsetWidth + 20);
    }
  }, [tempName, isEditingName]);

  const handleInteraction = () => {
    setIsJumping(true);
    setIsSmiling(true);
    setTimeout(() => {
      setIsJumping(false);
      setIsSmiling(false);
    }, 1000);
  };

  const handleSaveName = () => {
    if (tempName.trim() && onUpdatePetName) {
      onUpdatePetName(tempName.trim());
    } else {
      setTempName(petName);
    }
    setIsEditingName(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSaveName();
    if (e.key === 'Escape') {
      setTempName(petName);
      setIsEditingName(false);
    }
  };

  const xpProgress = (xp % 500) / 500;
  const radius = 140;
  const circumference = Math.PI * radius;
  const strokeDasharray = `${xpProgress * circumference} ${circumference}`;

  return (
    <div className="relative w-full flex flex-col items-center select-none min-h-full overflow-hidden">
      <div className="relative z-10 w-full flex flex-col items-center pt-24 pb-12 min-h-[420px]">
        <div className="flex flex-col items-center mb-2">
          <span className="text-[8px] font-normal text-white/80 uppercase tracking-[0.4em] drop-shadow-md mb-1">Stadium Rozwoju</span>
          <span className="text-xl font-normal text-white uppercase tracking-tighter drop-shadow-lg">{stage}</span>
        </div>

        <div className="absolute top-32 inset-x-0 flex justify-center opacity-80">
          <svg width="340" height="200" viewBox="0 0 340 200">
            <path d="M 20 180 A 150 150 0 0 1 320 180" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="8" strokeLinecap="round" />
            <path d="M 20 180 A 150 150 0 0 1 320 180" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" strokeDasharray={strokeDasharray} className="drop-shadow-lg" />
          </svg>
        </div>

        <div className="absolute top-44 right-6 flex flex-col space-y-6 z-30">
          <div className="flex flex-col items-center drop-shadow-lg"><span className="text-4xl mb-1">💧</span><span className="text-sm font-black text-white">{dewdrops}</span></div>
          <div className="flex flex-col items-center drop-shadow-lg"><span className="text-4xl mb-1">🧪</span><span className="text-sm font-black text-white">{fertilizer}</span></div>
        </div>

        <div 
          onClick={handleInteraction}
          className={`relative mt-4 flex flex-col items-center transition-all duration-500 cursor-pointer ${isJumping ? 'animate-jump' : 'animate-float'}`}
        >
          <div className="text-9xl mb-[-30px] z-20 animate-sway relative drop-shadow-2xl">{stageData.icon}</div>
          <div className={`w-36 h-36 rounded-full relative shadow-2xl border-8 border-white/40 flex items-center justify-center bg-gradient-to-br from-emerald-400 to-emerald-600`}>
            <div className="absolute top-[35%] inset-x-0 flex justify-around px-6">
              <div className="w-7 h-7 bg-black rounded-full relative"><div className="w-2.5 h-2.5 bg-white rounded-full absolute top-1 left-1" /></div>
              <div className="w-7 h-7 bg-black rounded-full relative"><div className="w-2.5 h-2.5 bg-white rounded-full absolute top-1 left-1" /></div>
            </div>
            <div className="absolute top-[65%] left-1/2 -translate-x-1/2">{isSmiling ? <div className="w-12 h-6 border-b-6 border-black/40 rounded-full" /> : <div className="w-3 h-3 bg-black/40 rounded-full" />}</div>
          </div>
        </div>
      </div>

      <div className="relative z-20 w-full bg-white rounded-t-[40px] shadow-2xl flex flex-col p-8 text-slate-800 -mt-10">
        <div className="flex flex-col items-center">
          <div className="relative flex items-center justify-center mb-4 w-full">
            {isEditingName ? (
              <input ref={inputRef} type="text" value={tempName} onChange={(e) => setTempName(e.target.value)} onBlur={handleSaveName} onKeyDown={handleKeyDown} className="text-3xl font-black text-[#365357] border-b-2 border-emerald-400 outline-none text-center bg-transparent" maxLength={12} />
            ) : (
              <h2 className="text-3xl font-black text-[#365357] uppercase cursor-pointer" onClick={() => setIsEditingName(true)}>{petName}</h2>
            )}
          </div>
          <div className="w-full">
            <div className="w-full h-6 bg-slate-100 rounded-full overflow-hidden border-2 border-slate-200 shadow-inner relative">
              <div className="h-full bg-gradient-to-r from-orange-600 to-amber-500" style={{ width: `${vitality}%` }} />
            </div>
            <div className="flex justify-between mt-2"><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Energia życiowa</span><span className="text-[10px] font-black text-orange-600 uppercase tracking-widest">{vitality} / 100</span></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8 pb-8 border-b text-center">
          <div className="flex flex-col"><span className="text-2xl font-black">{screenTimeMinutes}m</span><span className="text-[9px] font-black text-slate-400 uppercase">W użyciu</span></div>
          <div className="flex flex-col border-x"><span className="text-2xl font-black text-orange-600">{xp}</span><span className="text-[9px] font-black text-slate-400 uppercase">XP Wiedzy</span></div>
          <div className="flex flex-col"><span className="text-2xl font-black">{streak}</span><span className="text-[9px] font-black text-slate-400 uppercase">Dni serii</span></div>
        </div>

        <div className="space-y-4 pt-8 pb-32">
          <button onClick={onUseDewdrop} disabled={dewdrops <= 0} className="w-full flex items-center justify-between bg-emerald-500 text-white p-5 rounded-[24px] shadow-xl active:scale-95 disabled:opacity-50">
            <div className="flex items-center"><div className="text-2xl">💧</div><div className="ml-4 font-black uppercase text-sm">Podlej {petName}</div></div>
            <span className="bg-white/20 px-4 py-2 rounded-xl text-xs font-black">Użyj 1x 💧</span>
          </button>
          <button onClick={onUseFertilizer} disabled={fertilizer <= 0} className="w-full flex items-center justify-between bg-amber-500 text-white p-5 rounded-[24px] shadow-xl active:scale-95 disabled:opacity-50">
            <div className="flex items-center"><div className="text-2xl">🧪</div><div className="ml-4 font-black uppercase text-sm">Użyj Nawozu</div></div>
            <span className="bg-white/20 px-4 py-2 rounded-xl text-xs font-black">Użyj 1x 🧪</span>
          </button>
        </div>
      </div>
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes jump { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-40px); } }
        @keyframes sway { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
        .animate-float { animation: float 5s infinite ease-in-out; }
        .animate-jump { animation: jump 1s ease-in-out; }
        .animate-sway { animation: sway 4s infinite ease-in-out; }
      `}</style>
    </div>
  );
};

export default PlantView;
