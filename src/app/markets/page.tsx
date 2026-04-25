'use client';
import { useState, useMemo } from 'react';
import { MARKETS, CATEGORIES, fmtVol } from '@/lib/data';
import MarketCard from '@/components/MarketCard';
import { Search, SlidersHorizontal, Plus, Flame, Clock, BarChart3 } from 'lucide-react';
import Link from 'next/link';

const SORTS = [
  { label:'Ending Soon',    value:'endTime' },
  { label:'Highest Volume', value:'volume'  },
  { label:'Most Recent',    value:'recent'  },
];

export default function MarketsPage() {
  const [q,   setQ]   = useState('');
  const [cat, setCat] = useState('all');
  const [srt, setSrt] = useState('endTime');

  const list = useMemo(() => {
    let m = [...MARKETS];
    if (q)         m = m.filter(x => x.question.toLowerCase().includes(q.toLowerCase()));
    if (cat !== 'all') m = m.filter(x => x.category === cat);
    if (srt === 'endTime') m.sort((a,b) => a.endTime - b.endTime);
    if (srt === 'volume')  m.sort((a,b) => b.volume  - a.volume );
    if (srt === 'recent')  m.sort((a,b) => b.createdAt - a.createdAt);
    return m;
  }, [q, cat, srt]);

  const totalVol = MARKETS.reduce((s,m) => s + m.volume, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

      {/* ── Page header ─────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-green animate-pulse"/>
            <span className="text-xs font-mono text-green tracking-widest uppercase">Live</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl text-white">All Markets</h1>
          <p className="text-[#4A5568] text-sm font-mono mt-1">
            {list.length} markets · {fmtVol(totalVol)} total volume
          </p>
        </div>
        <Link href="/create" className="btn btn-primary text-sm py-2.5 px-5 self-start sm:self-auto">
          <Plus size={15}/> New Market
        </Link>
      </div>

      {/* ── Quick stats strip ───────────────────── */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { icon:Flame,    label:'Hottest',  val: MARKETS.sort((a,b)=>b.traders-a.traders)[0].question.slice(0,38)+'…' },
          { icon:Clock,    label:'Soonest',  val: MARKETS.sort((a,b)=>a.endTime-b.endTime)[0].question.slice(0,38)+'…' },
          { icon:BarChart3,label:'Biggest',  val: fmtVol(Math.max(...MARKETS.map(m=>m.volume)))+' volume'              },
        ].map(({ icon:Icon, label, val }) => (
          <div key={label} className="card p-4 flex items-start gap-3">
            <Icon size={16} className="text-cyan mt-0.5 shrink-0"/>
            <div className="min-w-0">
              <p className="text-xs font-mono text-[#4A5568] mb-0.5">{label}</p>
              <p className="text-xs text-white font-display leading-snug truncate">{val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filters ─────────────────────────────── */}
      <div className="flex flex-col gap-3 mb-8">
        {/* Search + sort row */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3A4A5E]"/>
            <input
              className="inp pl-9 py-2.5 text-sm"
              placeholder="Search markets…"
              value={q}
              onChange={e => setQ(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-[#4A5568] shrink-0"/>
            <select
              className="inp py-2 text-sm"
              style={{ width:'auto', paddingRight:'2rem' }}
              value={srt}
              onChange={e => setSrt(e.target.value)}
            >
              {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {['all', ...CATEGORIES].map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`tag cursor-pointer transition-all capitalize ${
                cat === c
                  ? 'text-cyan border-cyan/40 bg-cyan/10'
                  : 'text-[#4A5568] border-[#1A2535] hover:border-[#243044] hover:text-[#AAB4C8]'
              }`}
              style={{ padding:'5px 13px' }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid ────────────────────────────────── */}
      {list.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-5xl mb-4">🔍</p>
          <p className="font-display font-bold text-xl text-white mb-2">No markets found</p>
          <p className="text-[#4A5568] text-sm mb-6">Try a different search or category</p>
          <Link href="/create" className="btn btn-primary text-sm">
            <Plus size={15}/> Create one
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((m,i) => <MarketCard key={m.id} market={m} delay={i*50}/>)}
        </div>
      )}
    </div>
  );
}
