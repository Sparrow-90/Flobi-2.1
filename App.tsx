
import React, { useState, useEffect, useRef } from 'react';
import { GrowthStage, UserStats, Mission, WeeklyGoal, OfflineChallenge } from './types';
import { generateEducationalMission } from './services/geminiService';
import PlantView from './components/PlantView';
import MissionView from './components/MissionView';
import ParentDashboard from './components/ParentDashboard';
import ParentSignals from './components/ParentSignals';
import SubjectSelector from './components/SubjectSelector';
import ShopView from './components/ShopView';
import MissionResultView from './components/MissionResultView';
import LimitConfigView from './components/LimitConfigView';
import WeeklyGoalSelector from './components/WeeklyGoalSelector';
import OfflineMissionSelector from './components/OfflineMissionSelector';
import LevelUpView from './components/LevelUpView';

interface MissionResult {
  mission: Mission;
  success: boolean;
  score: number;
  total: number;
  xpEarned: number;
  dewdropsEarned: number;
  fertilizerEarned: number;
  vitalityBonus: number;
}

const App: React.FC = () => {
  const [view, setView] = useState<'child' | 'parent'>('child');
  const [childTab, setChildTab] = useState<'garden' | 'missions' | 'shop'>('garden');
  const [parentTab, setParentTab] = useState<'stats' | 'signals' | 'limits'>('stats');
  
  const [stats, setStats] = useState<UserStats>({
    petName: 'Flobi',
    xp: 288,
    level: 1,
    screenTimeMinutes: 48,
    educationTimeMinutes: 120,
    missionsCompleted: 12,
    currentStage: GrowthStage.LEAVES,
    vitality: 48,
    badges: ['Offline Hero', 'Prymus'],
    dewdrops: 6,
    fertilizer: 2,
    streak: 3,
    activeGoals: [],
    pendingOfflineMission: undefined
  });
  
  const [pendingGifts, setPendingGifts] = useState<{id: string, type: 'dewdrops' | 'vitality' | 'xp' | 'fertilizer', label: string}[]>([]);
  const [activeMission, setActiveMission] = useState<Mission | null>(null);
  const [missionResult, setMissionResult] = useState<MissionResult | null>(null);
  const [offlineResult, setOfflineResult] = useState<MissionResult | null>(null);
  const [levelUpData, setLevelUpData] = useState<{level: number, stage: GrowthStage} | null>(null);
  const [isSelectingSubject, setIsSelectingSubject] = useState(false);
  const [isSelectingOffline, setIsSelectingOffline] = useState(false);
  const [isSelectingGoal, setIsSelectingGoal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const prevLevelRef = useRef(stats.level);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    let newStage = GrowthStage.SEED;
    let newLevel = Math.floor(stats.xp / 500) + 1;
    
    if (stats.xp >= 2100) newStage = GrowthStage.FRUIT;
    else if (stats.xp >= 1500) newStage = GrowthStage.BLOOM;
    else if (stats.xp >= 1000) newStage = GrowthStage.TREE;
    else if (stats.xp >= 600) newStage = GrowthStage.BUSH;
    else if (stats.xp >= 300) newStage = GrowthStage.LEAVES;
    else if (stats.xp >= 100) newStage = GrowthStage.SPROUT;

    const levelChanged = newLevel > prevLevelRef.current;
    if (levelChanged || newStage !== stats.currentStage) {
      setStats(prev => ({ ...prev, currentStage: newStage, level: newLevel }));
      if (levelChanged && !isFirstLoad.current) {
         setLevelUpData({ level: newLevel, stage: newStage });
      }
      prevLevelRef.current = newLevel;
    }
    isFirstLoad.current = false;
  }, [stats.xp]);

  const handleStartMission = async (type: Mission['type'], subject?: string) => {
    setIsSelectingSubject(false);
    setIsGenerating(true);
    try {
      const mission = await generateEducationalMission(type, subject);
      setActiveMission(mission);
    } catch (error) {
      console.error("Failed to generate mission", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAcceptGoal = (goalId: string) => {
    setStats(prev => ({
      ...prev,
      activeGoals: prev.activeGoals.map(g => 
        g.id === goalId ? { ...g, status: 'active' } : g
      )
    }));
  };

  const handleRejectGoal = (goalId: string) => {
    setStats(prev => ({
      ...prev,
      activeGoals: prev.activeGoals.filter(g => g.id !== goalId)
    }));
  };

  const handleVerifyOfflineMission = (success: boolean) => {
    if (success && stats.pendingOfflineMission) {
      const rewardMinutes = 15;
      const xpEarned = 50;
      const dewdropsEarned = 5;
      const vitalityBonus = 15;
      setStats(prev => ({
        ...prev,
        pendingOfflineMission: undefined,
        screenTimeMinutes: prev.screenTimeMinutes + rewardMinutes,
        xp: prev.xp + xpEarned,
        dewdrops: prev.dewdrops + dewdropsEarned,
        vitality: Math.min(100, prev.vitality + vitalityBonus)
      }));
      setOfflineResult({
        mission: { id: 'off-' + Date.now(), type: 'offline', title: `Misja Offline: ${stats.pendingOfflineMission.title}`, description: 'Brawo!', rewardMinutes },
        success: true, score: 1, total: 1, xpEarned, dewdropsEarned, fertilizerEarned: 0, vitalityBonus
      });
    } else {
      setStats(prev => ({ ...prev, pendingOfflineMission: undefined }));
    }
  };

  const handleSendGift = (type: 'dewdrops' | 'vitality' | 'xp' | 'fertilizer') => {
    const labels = { dewdrops: 'Krople Rosy', vitality: 'Energia Życiowa', xp: 'Punkty Wiedzy', fertilizer: 'Super Nawóz' };
    setPendingGifts(prev => [...prev, { id: Math.random().toString(), type, label: labels[type] }]);
  };

  const handleClaimGift = (giftId: string) => {
    const gift = pendingGifts.find(g => g.id === giftId);
    if (!gift) return;
    setStats(prev => {
      let newState = { ...prev };
      switch (gift.type) {
        case 'dewdrops': newState.dewdrops += 5; break;
        case 'vitality': newState.vitality = Math.min(100, prev.vitality + 20); break;
        case 'xp': newState.xp += 50; break;
        case 'fertilizer': newState.fertilizer += 1; break;
      }
      return newState;
    });
    setPendingGifts(prev => prev.filter(g => g.id !== giftId));
  };

  const handleMissionComplete = (success: boolean, score: number, total: number) => {
    if (activeMission) {
      const isDaily = activeMission.type === 'daily';
      const xpEarned = success ? (isDaily ? 100 : 50) : 10;
      const dewdropsEarned = success ? (isDaily ? 5 : 2) : 0;
      const fertilizerEarned = (success && score === total) ? 1 : 0; 
      const vitalityBonus = success ? (isDaily ? 25 : 15) : 5;
      setStats(prev => ({
        ...prev,
        xp: prev.xp + xpEarned,
        educationTimeMinutes: prev.educationTimeMinutes + (success ? 10 : 2),
        screenTimeMinutes: prev.screenTimeMinutes + (success ? activeMission.rewardMinutes : 0),
        missionsCompleted: prev.missionsCompleted + (success ? 1 : 0),
        vitality: Math.min(100, prev.vitality + vitalityBonus),
        dewdrops: prev.dewdrops + dewdropsEarned,
        fertilizer: prev.fertilizer + fertilizerEarned,
        streak: (isDaily && success) ? prev.streak + 1 : prev.streak
      }));
      setMissionResult({ mission: activeMission, success, score, total, xpEarned, dewdropsEarned, fertilizerEarned, vitalityBonus });
    }
    setActiveMission(null);
  };

  return (
    <div className="min-h-screen bg-black flex justify-center overflow-x-hidden font-sans no-scrollbar">
      <div className={`w-full max-w-md h-screen shadow-2xl relative flex flex-col transition-all duration-1000 overflow-x-hidden no-scrollbar ${view === 'parent' ? 'bg-slate-950' : 'bg-slate-50'}`}>
        {view === 'child' && <div className="absolute top-0 left-0 right-0 h-[700px] bg-gradient-to-b from-[#4fc3f7] via-[#81c784] to-[#f8fafc] z-0 pointer-events-none" />}
        <header className="absolute top-0 left-0 right-0 px-6 pt-6 flex justify-between items-center z-50 shrink-0 pointer-events-none">
          <div className="flex flex-col pointer-events-auto"><h1 className="text-2xl font-black text-white mix-blend-difference tracking-tighter uppercase drop-shadow-lg">FLOBI</h1></div>
          <div className="flex bg-black/40 backdrop-blur-xl p-1 rounded-full border border-white/20 shadow-2xl pointer-events-auto">
            <button onClick={() => setView('child')} className={`px-4 py-2 rounded-full text-[10px] font-black transition-all ${view === 'child' ? 'bg-emerald-500 text-white shadow-lg' : 'text-white/40'}`}>DZIECKO</button>
            <button onClick={() => setView('parent')} className={`px-4 py-2 rounded-full text-[10px] font-black transition-all ${view === 'parent' ? 'bg-blue-600 text-white shadow-lg' : 'text-white/40'}`}>RODZIC</button>
          </div>
        </header>

        <main className={`flex-1 flex flex-col relative z-10 overflow-y-auto no-scrollbar ${view === 'parent' || childTab !== 'garden' ? 'px-6 pt-24 pb-32' : ''}`}>
          {view === 'child' ? (
            <>
              {childTab === 'garden' && <div className="flex-1 animate-in fade-in duration-700 no-scrollbar"><PlantView petName={stats.petName} stage={stats.currentStage} vitality={stats.vitality} xp={stats.xp} level={stats.level} screenTimeMinutes={stats.screenTimeMinutes} dewdrops={stats.dewdrops} fertilizer={stats.fertilizer} streak={stats.streak} onUseDewdrop={() => { if(stats.dewdrops > 0) { setStats(s => ({...s, dewdrops: s.dewdrops-1, vitality: Math.min(100, s.vitality+10)})); return true; } return false; }} onUseFertilizer={() => { if(stats.fertilizer > 0) { setStats(s => ({...s, fertilizer: s.fertilizer-1, xp: s.xp+100})); return true; } return false; }} onUpdatePetName={(n) => setStats(s => ({...s, petName: n}))} /></div>}
              {childTab === 'missions' && (
                <div className="space-y-6 pb-12 animate-in fade-in duration-500 no-scrollbar">
                  <header>
                    <h2 className="text-4xl font-black text-[#365357] tracking-tighter uppercase">Centrum Misji</h2>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Zdobądź czas na zabawę</p>
                  </header>

                  {stats.activeGoals.filter(g => g.status === 'pending').map(goal => (
                    <div key={goal.id} className="w-full bg-indigo-600 p-6 rounded-[32px] border border-white shadow-xl relative overflow-hidden">
                      <h3 className="text-white font-black text-xl uppercase tracking-tighter mb-2">Wyzwanie od Rodzica: {goal.title}</h3>
                      <p className="text-indigo-100 text-xs font-medium leading-relaxed mb-4">{goal.description}</p>
                      <div className="flex space-x-3">
                        <button onClick={() => handleAcceptGoal(goal.id)} className="flex-1 py-3.5 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-tighter shadow-lg active:scale-95 transition-all">Akceptuję!</button>
                        <button onClick={() => handleRejectGoal(goal.id)} className="px-6 py-3.5 bg-black/20 text-white/70 rounded-2xl font-black text-xs uppercase tracking-tighter active:scale-95 transition-all">Nie teraz</button>
                      </div>
                    </div>
                  ))}

                  <section className="space-y-4">
                    <button onClick={() => handleStartMission('daily')} className="w-full bg-gradient-to-br from-[#FF4E50] to-[#F9D423] p-7 rounded-[40px] text-white shadow-2xl relative overflow-hidden text-left group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
                      <h3 className="font-black text-2xl uppercase tracking-tighter leading-none mb-2">Misja Dnia</h3>
                      <p className="text-[10px] font-bold text-white/80 uppercase tracking-widest mb-6">Wymieszane zadania dla mistrza</p>
                      <div className="flex items-center space-x-4"><span className="bg-white/20 px-3 py-2 rounded-2xl text-[11px] font-black">+25 min</span><span className="bg-white/20 px-3 py-2 rounded-2xl text-[11px] font-black">+100 XP</span></div>
                    </button>

                    <button onClick={() => setIsSelectingSubject(true)} className="w-full bg-white/70 p-6 rounded-[32px] border border-white shadow-lg text-left flex items-center group">
                      <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl mr-5 group-hover:scale-110 transition-transform">📚</div>
                      <div className="flex-1">
                        <h3 className="font-black text-slate-800 text-lg uppercase tracking-tighter">Quiz Wiedzy</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">+15 min | +50 XP</p>
                      </div>
                    </button>

                    <button onClick={() => setIsSelectingOffline(true)} className="w-full bg-white/70 p-6 rounded-[32px] border border-white shadow-lg text-left flex items-center group">
                      <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-3xl mr-5 group-hover:scale-110 transition-transform">🌍</div>
                      <div className="flex-1">
                        <h3 className="font-black text-slate-800 text-lg uppercase tracking-tighter">Misja Offline</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">+15 min | +5 Kropli</p>
                      </div>
                    </button>
                  </section>
                </div>
              )}
              {childTab === 'shop' && <div className="no-scrollbar"><ShopView stats={stats} pendingGifts={pendingGifts} onClaimGift={handleClaimGift} onBuy={(item) => setStats(s => ({...s, dewdrops: s.dewdrops - item.price}))} /></div>}
              
              {missionResult && <MissionResultView {...missionResult} onClose={() => setMissionResult(null)} />}
              {offlineResult && <MissionResultView {...offlineResult} onClose={() => setOfflineResult(null)} />}
            </>
          ) : (
            <>
              {parentTab === 'stats' && <ParentDashboard stats={stats} />}
              {parentTab === 'signals' && <ParentSignals stats={stats} onSendGift={handleSendGift} onVerifyMission={handleVerifyOfflineMission} />}
              {parentTab === 'limits' && <LimitConfigView activeGoals={stats.activeGoals} onAddGoal={() => setIsSelectingGoal(true)} onSendGift={handleSendGift} />}
            </>
          )}
        </main>

        <nav className="absolute bottom-6 left-6 right-6 h-20 border border-white/20 flex items-center justify-around px-4 z-[100] backdrop-blur-xl rounded-[32px] shadow-2xl bg-emerald-950/80">
          {view === 'child' ? (
            <>
              <button onClick={() => setChildTab('garden')} className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl ${childTab === 'garden' ? "bg-white text-emerald-900" : "text-white/40"}`}><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg><span className="text-[8px] font-black uppercase mt-1">Ogród</span></button>
              <button onClick={() => setChildTab('missions')} className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl ${childTab === 'missions' ? "bg-white text-emerald-900" : "text-white/40"}`}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg><span className="text-[8px] font-black uppercase mt-1">Misje</span></button>
              <button onClick={() => setChildTab('shop')} className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl ${childTab === 'shop' ? "bg-white text-emerald-900" : "text-white/40"}`}><span className="text-xl">🏺</span><span className="text-[8px] font-black uppercase mt-1">Sklep</span></button>
            </>
          ) : (
            <>
              <button onClick={() => setParentTab('stats')} className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl ${parentTab === 'stats' ? 'bg-white text-emerald-950' : 'text-white/40'}`}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg><span className="text-[8px] font-black uppercase mt-1">Raport</span></button>
              <button onClick={() => setParentTab('signals')} className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl ${parentTab === 'signals' ? 'bg-white text-emerald-950' : 'text-white/40'}`}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg><span className="text-[8px] font-black uppercase mt-1">Sygnały</span></button>
              <button onClick={() => setParentTab('limits')} className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl ${parentTab === 'limits' ? 'bg-white text-emerald-950' : 'text-white/40'}`}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg><span className="text-[8px] font-black uppercase mt-1">Limity</span></button>
            </>
          )}
        </nav>

        {isSelectingSubject && <SubjectSelector onSelect={(subj) => handleStartMission('quiz', subj)} onCancel={() => setIsSelectingSubject(false)} />}
        {isSelectingOffline && <OfflineMissionSelector onSelect={(ch) => { setStats(s => ({...s, pendingOfflineMission: ch})); setIsSelectingOffline(false); }} onCancel={() => setIsSelectingOffline(false)} />}
        {isSelectingGoal && <WeeklyGoalSelector onConfirm={(g) => { setStats(s => ({...s, activeGoals: [...s.activeGoals, g]})); setIsSelectingGoal(false); }} onCancel={() => setIsSelectingGoal(false)} />}
        {levelUpData && <LevelUpView newLevel={levelUpData.level} newStage={levelUpData.stage} petName={stats.petName} onClose={() => setLevelUpData(null)} />}
        {activeMission && <MissionView mission={activeMission} onComplete={handleMissionComplete} onCancel={() => setActiveMission(null)} />}
        {isGenerating && <div className="fixed inset-0 bg-black/90 z-[1000] flex flex-col items-center justify-center"><div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-4" /><p className="font-black text-emerald-400 uppercase">Generuję wyzwanie...</p></div>}
      </div>
    </div>
  );
};

export default App;
