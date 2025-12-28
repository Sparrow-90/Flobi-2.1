
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { UserStats } from '../types';

interface ParentDashboardProps {
  stats: UserStats;
}

const ParentDashboard: React.FC<ParentDashboardProps> = ({ stats }) => {
  const chartData = [
    { name: 'Pon', edu: 30, fun: 45 },
    { name: 'Wt', edu: 45, fun: 30 },
    { name: 'Śr', edu: 20, fun: 60 },
    { name: 'Czw', edu: 60, fun: 15 },
    { name: 'Pt', edu: 40, fun: 45 },
    { name: 'Sob', edu: 15, fun: 90 },
    { name: 'Nie', edu: stats.educationTimeMinutes, fun: stats.screenTimeMinutes },
  ];

  const totalEdu = chartData.reduce((acc, curr) => acc + curr.edu, 0);
  const totalFun = chartData.reduce((acc, curr) => acc + curr.fun, 0);
  const totalTime = totalEdu + totalFun;
  const balanceIndex = Math.round((totalEdu / totalTime) * 100);

  const pieData = [
    { name: 'Edukacja', value: totalEdu, color: '#10b981' },
    { name: 'Rozrywka', value: totalFun, color: '#3b82f6' },
  ];

  const formatTime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  return (
    <div className="flex flex-col space-y-6 pb-12 animate-in fade-in slide-in-from-left duration-500">
      {/* Summary Banner */}
      <section className="bg-gradient-to-br from-indigo-600 to-blue-800 p-6 rounded-[32px] text-white shadow-xl border border-white/10">
        <h3 className="text-xl font-black mb-1">Status Balansu</h3>
        <p className="opacity-70 text-[10px] mb-4 uppercase tracking-widest font-bold">Tryb: Zrównoważony Rozwój</p>
        <div className="flex items-center justify-between">
          <div className="text-center">
            <div className="text-2xl font-black">{balanceIndex}%</div>
            <div className="text-[9px] uppercase font-black opacity-60 tracking-widest">Nauka</div>
          </div>
          <div className="h-10 w-[1px] bg-white/20" />
          <div className="text-center">
            <div className="text-2xl font-black">{stats.missionsCompleted}</div>
            <div className="text-[9px] uppercase font-black opacity-60 tracking-widest">Misje</div>
          </div>
          <div className="h-10 w-[1px] bg-white/20" />
          <div className="text-center">
            <div className="text-2xl font-black">{stats.xp}</div>
            <div className="text-[9px] uppercase font-black opacity-60 tracking-widest">Wiedza</div>
          </div>
        </div>
      </section>

      {/* STYLOWANE: Wskazówki Przewodnika */}
      <section className="bg-white/5 border border-white/10 p-6 rounded-[32px] shadow-2xl backdrop-blur-md relative overflow-hidden group">
        <div className="absolute -top-10 -left-10 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-700" />
        <div className="flex items-center space-x-3 mb-4 relative z-10">
          <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-xl shadow-inner border border-indigo-500/30">✨</div>
          <h4 className="text-[11px] font-black text-indigo-300 uppercase tracking-[0.2em]">Wskazówki Przewodnika</h4>
        </div>
        <div className="space-y-4 relative z-10">
          <p className="text-slate-300 text-sm leading-relaxed font-medium italic">
            "Dziecko wykazuje dziś wyjątkową determinację w misjach logicznych. To świetny moment, aby pochwalić je za 'siłę spokoju' przy rozwiązywaniu trudnych zadań."
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="px-3 py-1 bg-white/5 text-indigo-400 text-[9px] font-black rounded-full border border-white/10 shadow-sm uppercase">Wysoka Koncentracja</span>
            <span className="px-3 py-1 bg-white/5 text-emerald-400 text-[9px] font-black rounded-full border border-white/10 shadow-sm uppercase">Progress Edu +15%</span>
          </div>
        </div>
      </section>

      {/* Weekly Goals Quick View */}
      {stats.activeGoals.filter(g => g.status === 'active').length > 0 && (
        <section className="bg-white/5 p-6 rounded-[32px] border border-white/10 backdrop-blur-md">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Postęp Celów Tygodniowych</h4>
            <div className="space-y-4">
                {stats.activeGoals.filter(g => g.status === 'active').map(goal => (
                    <div key={goal.id}>
                        <div className="flex justify-between text-[10px] font-black text-white/60 mb-1.5 uppercase tracking-wider">
                            <span>🎯 {goal.title}</span>
                            <span>{goal.current}/{goal.target}</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500" style={{ width: `${(goal.current / goal.target) * 100}%` }} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
      )}

      {/* Bar Chart */}
      <section className="bg-white/5 p-6 rounded-[32px] border border-white/10 backdrop-blur-md">
        <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-6">Aktywność Tygodniowa (Min)</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '16px' }} />
              <Bar dataKey="edu" fill="#10b981" radius={[4, 4, 0, 0]} name="Edu" />
              <Bar dataKey="fun" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Fun" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Donut Chart and Stats Table */}
      <section className="bg-white/5 p-6 rounded-[32px] border border-white/10">
        <div className="flex items-center justify-between">
          <div className="h-32 w-32 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={35} outerRadius={50} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center font-black text-white text-lg">{balanceIndex}%</div>
          </div>
          <div className="flex-1 ml-6 space-y-4">
            <div>
              <div className="flex justify-between text-[10px] font-black text-emerald-400 mb-1"><span>NAUKA</span><span>{formatTime(totalEdu)}</span></div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: `${(totalEdu/totalTime)*100}%` }} /></div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-black text-blue-400 mb-1"><span>ZABAWA</span><span>{formatTime(totalFun)}</span></div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-blue-500" style={{ width: `${(totalFun/totalTime)*100}%` }} /></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ParentDashboard;
