
import React from 'react';
import { UserStats } from '../types.ts';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  color: string;
  action: 'vitality' | 'xp' | 'cosmetic';
}

const SHOP_ITEMS: ShopItem[] = [
  { id: 'watering_can', name: 'Złota Konewka', description: 'Przywraca energię Flobi do 100%!', price: 10, icon: '🚿', color: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30', action: 'vitality' },
  { id: 'fertilizer', name: 'Super Nawóz', description: 'Jednorazowy zastrzyk +100 punktów EXP.', price: 15, icon: '🧪', color: 'bg-green-500/20 text-green-600 border-green-500/30', action: 'xp' },
  { id: 'rainbow_aura', name: 'Tęczowa Aura', description: 'Twoje Flobi będzie lśnić kolorami tęczy.', price: 25, icon: '🌈', color: 'bg-purple-500/20 text-purple-600 border-purple-500/30', action: 'cosmetic' },
  { id: 'stone_pot', name: 'Kamienna Donica', description: 'Elegancka donica, która dodaje prestiżu.', price: 40, icon: '🏺', color: 'bg-stone-500/20 text-stone-600 border-stone-500/30', action: 'cosmetic' }
];

interface ShopViewProps {
  stats: UserStats;
  pendingGifts: {id: string, type: string, label: string}[];
  onClaimGift: (id: string) => void;
  onBuy: (item: ShopItem) => void;
}

const ShopView: React.FC<ShopViewProps> = ({ stats, pendingGifts, onClaimGift, onBuy }) => {
  return (
    <div className="pb-24 animate-in fade-in slide-in-from-right duration-500">
      <header className="mb-6">
        <h2 className="text-4xl font-black text-[#365357] tracking-tighter uppercase drop-shadow-md">Sklep Ewolucji</h2>
        <p className="text-sm text-white/80 font-bold uppercase tracking-wide">Wykorzystaj swoje zasoby</p>
      </header>

      {pendingGifts.length > 0 && (
        <section className="mb-8 space-y-3">
          <h3 className="text-[10px] font-black text-orange-600 uppercase tracking-widest flex items-center">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-ping mr-2" /> Paczka od Rodziców!
          </h3>
          {pendingGifts.map(gift => (
            <div key={gift.id} className="bg-gradient-to-br from-orange-400 to-amber-500 p-5 rounded-[28px] shadow-lg border border-orange-300 flex items-center justify-between group animate-in slide-in-from-top">
              <div className="flex items-center">
                <div className="text-3xl mr-4 bg-white/20 p-2 rounded-xl">🎁</div>
                <div>
                  <div className="text-white font-black uppercase text-sm leading-none">{gift.label}</div>
                  <div className="text-orange-900/60 text-[9px] font-bold uppercase mt-1 tracking-tighter">Specjalny bonus dla Ciebie</div>
                </div>
              </div>
              <button onClick={() => onClaimGift(gift.id)} className="bg-white text-orange-600 font-black text-[10px] uppercase px-4 py-2.5 rounded-xl shadow-md active:scale-95 transition-all">Odbierz</button>
            </div>
          ))}
        </section>
      )}

      <div className="bg-indigo-950/80 backdrop-blur-md rounded-[32px] p-6 text-white mb-8 border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 mb-2">Dostępne środki</div>
              <div className="flex items-center space-x-8">
                <div className="flex items-center"><span className="text-2xl font-black mr-2">{stats.dewdrops}</span><span className="text-xl">💧</span></div>
                <div className="w-[1px] h-6 bg-white/10" />
                <div className="flex items-center"><span className="text-2xl font-black mr-2">{stats.fertilizer}</span><span className="text-xl">🧪</span></div>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl text-[10px] font-black tracking-widest">KOLEKCJONER</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {SHOP_ITEMS.map((item) => {
          const canAfford = stats.dewdrops >= item.price;
          return (
            <div key={item.id} className={`bg-white/70 backdrop-blur-md p-5 rounded-[28px] border transition-all flex items-center relative overflow-hidden ${
              canAfford ? 'border-white hover:bg-white/90 shadow-xl' : 'border-slate-200 grayscale opacity-70 cursor-not-allowed bg-slate-100/50'
            }`}>
              {!canAfford && <div className="absolute top-2 right-4 bg-red-100 text-red-500 font-black text-[7px] px-2 py-0.5 rounded-full uppercase tracking-widest border border-red-200">Brak środków</div>}
              
              <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-3xl mr-5 shadow-inner border transition-transform ${canAfford ? 'group-hover:scale-110' : ''}`}>
                {item.icon}
              </div>
              <div className="flex-1 mr-2">
                <h4 className={`font-black text-lg leading-tight uppercase tracking-tighter ${canAfford ? 'text-slate-900' : 'text-slate-400'}`}>{item.name}</h4>
                <p className={`text-[10px] font-bold leading-tight mt-1 uppercase ${canAfford ? 'text-slate-500' : 'text-slate-400'}`}>{item.description}</p>
              </div>
              <button
                disabled={!canAfford}
                onClick={() => onBuy(item)}
                className={`px-5 py-3 rounded-2xl font-black text-xs transition-all ${
                  canAfford 
                    ? 'bg-emerald-500 text-white shadow-lg active:scale-95' 
                    : 'bg-slate-200 text-slate-400 border border-slate-300'
                }`}
              >
                {item.price} 💧
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-12 p-8 bg-white/40 rounded-[36px] border border-white/20 text-center shadow-inner">
        <span className="text-4xl mb-4 block animate-bounce">🎁</span>
        <h4 className="font-black text-emerald-800 text-sm mb-2 uppercase tracking-widest">Centrum Podarunków</h4>
        <p className="text-[10px] text-slate-700 px-6 leading-relaxed font-bold uppercase tracking-tight">
          Tutaj pojawią się specjalne prezenty i nagrody od Twoich Rodziców za wspaniałe postępy!
        </p>
      </div>
    </div>
  );
};

export default ShopView;
