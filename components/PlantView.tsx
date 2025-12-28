
import React, { useState, useRef, useEffect } from 'react';
import { GrowthStage } from '../types.ts';
import { STAGE_CONFIG } from '../constants.ts';

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

  const auraOpacity = Math.min(0.6, 0.1 + (level * 0.05));
  const auraScale = 1 + (level * 0.05);
  const showEvoParticles = level >= 3;

  return (
    <div className="relative w-full flex flex-col items-center select-none min-h-full overflow-hidden">
      <div className="relative z-10 w-full flex flex-col items-center pt-24 pb-12 min-h-[420px]">
        <div className="flex flex-col items-center mb-2 pointer-events-none">
          <span className="text-[8px] font-normal text-white/80 uppercase tracking-[0.4em] drop-shadow-md mb-1">Stadium Rozwoju</span>
          <span className="text-xl font-normal text-white uppercase tracking-tighter drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">{stage}</span>
        </div>

        <div className="absolute top-32 inset-x-0 flex justify-center pointer-events-none opacity-80">
          <svg width="340" height="200" viewBox="0 0 340 200">
            <path 
              d="M 20 180 A 150 150 0 0 1 320 180" 
              fill="none" 
              stroke="rgba(255,255,255,0.3)" 
              strokeWidth="8" 
              strokeLinecap="round"
            />
            <path 
              d="M 20 180 A 150 150 0 0 1 320 180" 
              fill="none" 
              stroke="white" 
              strokeWidth="10" 
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              className="drop-shadow-[0_0_15px_rgba(255,255,255,1)]"
            />
          </svg>
        </div>

        <div className="absolute top-44 right-6 flex flex-col space-y-6 z-30">
          <div className="flex flex-col items-center drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)] animate-bounce-slow">
            <span className="text-4xl mb-1">💧</span>
            <span className="text-sm font-black text-white">{dewdrops}</span>
          </div>
          <div className="flex flex-col items-center drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)] animate-float-slow">
            <span className="text-4xl mb-1">🧪</span>
            <span className="text-sm font-black text-white">{fertilizer}</span>
          </div>
        </div>

        <div className="absolute top-[335px] left-1/2 -translate-x-1/2 w-44 h-8 bg-black/25 rounded-[100%] blur-md scale-x-125 animate-pulse" />

        <div 
          className="absolute top-[260px] left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-[60px] pointer-events-none transition-all duration-1000"
          style={{ 
            backgroundColor: 'rgba(16, 185, 129, ' + auraOpacity + ')',
            transform: 'translateX(-50%) scale(' + auraScale + ')'
          }}
        />

        <div 
          onClick={handleInteraction}
          className={`relative mt-4 flex flex-col items-center transition-all duration-500 cursor-pointer ${isJumping ? 'animate-jump' : 'animate-float'}`}
        >
          {showEvoParticles && (
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-4 -left-4 text-xl animate-float-fast opacity-40">🍃</div>
                <div className="absolute -top-10 right-0 text-lg animate-float-slow opacity-30 delay-700">🍃</div>
                <div className="absolute bottom-10 -right-4 text-xl animate-sway opacity-40 delay-300">🍃</div>
            </div>
          )}

          <div className="text-9xl mb-[-30px] z-20 animate-sway relative drop-shadow-2xl">
            {stageData.icon}
          </div>
          
          <div className={`w-36 h-36 rounded-full relative shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-8 border-white/40 flex items-center justify-center ${vitality < 30 ? 'bg-slate-500 grayscale' : 'bg-gradient-to-br from-emerald-400 to-emerald-600'}`}>
            <div className="absolute top-[35%] inset-x-0 flex justify-around px-6">
              <div className="w-7 h-7 bg-black rounded-full relative overflow-hidden border-2 border-white/10">
                <div className="w-2.5 h-2.5 bg-white rounded-full absolute top-1 left-1" />
              </div>
              <div className="w-7 h-7 bg-black rounded-full relative overflow-hidden border-2 border-white/10">
                <div className="w-2.5 h-2.5 bg-white rounded-full absolute top-1 left-1" />
              </div>
            </div>
            <div className="absolute top-[65%] left-1/2 -translate-x-1/2">
              {isSmiling ? (
                <div className="w-12 h-6 border-b-6 border-black/40 rounded-full" />
              ) : (
                <div className="w-3 h-3 bg-black/40 rounded-full" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 w-full bg-white rounded-t-[40px] shadow-[0_-20px_60px_rgba(0,0,0,0.15)] flex flex-col p-8 text-slate-800 -mt-10">
        <div className="flex flex-col items-center">
          <div className="relative flex items-center justify-center mb-4 group w-full min-h-[44px]">
            {isEditingName ? (
              <>
                <span ref={measureRef} className="absolute opacity-0 pointer-events-none text-3xl font-black tracking-tighter uppercase whitespace-pre px-2">{tempName || ' '}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onBlur={handleSaveName}
                  onKeyDown={handleKeyDown}
                  style={{ width: inputWidth }}
                  className="text-3xl font-black tracking-tighter uppercase text-[#365357] border-b border-emerald-400/50 outline-none text-center bg-transparent transition-all duration-200 animate-in fade-in zoom-in-95"
                  maxLength={12}
                />
              </>
            ) : (
              <div className="flex items-center cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setIsEditingName(true)}>
                <h2 className="text-3xl font-black tracking-tighter uppercase text-[#365357]">{petName}</h2>
                <button className="ml-3 p-1 text-slate-300/60 group-hover:text-emerald-500 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          
          <div className="w-full">
            <div className="w-full h-6 bg-slate-100 rounded-full overflow-hidden border-2 border-slate-200 shadow-inner relative">
              <div 
                className="h-full transition-all duration-1000 bg-gradient-to-r from-orange-600 via-orange-400 to-amber-500 animate-vitality-glow"
                style={{ width: `${vitality}%` }}
              />
              <div 
                className="absolute inset-y-0 left-0 bg-white/20 animate-pulse transition-all duration-1000"
                style={{ width: `${vitality}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 px-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Energia życiowa</span>
              <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest drop-shadow-sm">{vitality} / 100</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8 pb-8 border-b border-slate-100 text-center">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-900 leading-none">{screenTimeMinutes}m</span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">W użyciu</span>
          </div>
          <div className="flex flex-col border-x border-slate-100">
            <span className="text-2xl font-black bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(249,115,22,0.3)] leading-none tracking-tighter">
              {xp}
            </span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">XP Wiedzy</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-900 leading-none">{streak}</span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Dni serii</span>
          </div>
        </div>

        <div className="space-y-4 pt-8 pb-32">
          <button 
            onClick={onUseDewdrop}
            disabled={dewdrops <= 0}
            className="w-full flex items-center justify-between bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 disabled:opacity-50 p-5 rounded-[24px] shadow-xl shadow-emerald-900/20 transition-all active:scale-95 group"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl group-active:rotate-12 transition-transform">💧</div>
              <div className="flex flex-col items-start ml-4">
                <span className="text-white font-black uppercase tracking-widest text-sm">Podlej {petName}</span>
                <span className="text-emerald-100 text-[10px] font-bold">+10% Energii</span>
              </div>
            </div>
            <span className="bg-white/20 px-4 py-2 rounded-xl text-white font-black text-sm">Użyj 1x 💧</span>
          </button>

          <button 
            onClick={onUseFertilizer}
            disabled={fertilizer <= 0}
            className="w-full flex items-center justify-between bg-amber-500 hover:bg-amber-600 disabled:bg-slate-200 disabled:opacity-50 p-5 rounded-[24px] shadow-xl shadow-amber-900/20 transition-all active:scale-95 group"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl group-active:scale-110 transition-transform">🧪</div>
              <div className="flex flex-col items-start ml-4">
                <span className="text-white font-black uppercase tracking-widest text-sm">Użyj Nawozu</span>
                <span className="text-amber-100 text-[10px] font-bold">+100 XP Wiedzy</span>
              </div>
            </div>
            <span className="bg-white/20 px-4 py-2 rounded-xl text-white font-black text-sm">Użyj 1x 🧪</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-25px); } }
        @keyframes jump { 0%, 100% { transform: translateY(0) scale(1); } 30% { transform: translateY(-50px) scaleX(0.9); } 50% { transform: translateY(-60px) rotate(5deg); } }
        @keyframes sway { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
        @keyframes vitality-pulse {
          0%, 100% { filter: brightness(1) drop-shadow(0 0 5px rgba(249, 115, 22, 0.4)); }
          50% { filter: brightness(1.2) drop-shadow(0 0 15px rgba(249, 115, 22, 0.8)); }
        }
        @keyframes float-fast { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(10px, -20px); } }
        @keyframes bounce-slow { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        @keyframes float-slow { 0%, 100% { transform: translateY(0); opacity: 0.8; } 50% { transform: translateY(-10px); opacity: 1; } }
        .animate-float { animation: float 5s infinite ease-in-out; }
        .animate-jump { animation: jump 1s ease-in-out; }
        .animate-sway { animation: sway 4s infinite ease-in-out; }
        .animate-vitality-glow { animation: vitality-pulse 2s infinite ease-in-out; }
        .animate-float-fast { animation: float-fast 3s infinite ease-in-out; }
        .animate-bounce-slow { animation: bounce-slow 4s infinite ease-in-out; }
        .animate-float-slow { animation: float-slow 6s infinite ease-in-out; }
      `}</style>
    </div>
  );
};

export default PlantView;
