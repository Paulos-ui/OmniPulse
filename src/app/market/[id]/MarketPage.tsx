'use client';
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { MARKETS, fmtVol, timeLeft } from '@/lib/data';
import { Market } from '@/types';
import Countdown from '@/components/Countdown';
import TradePanel from '@/components/TradePanel';
import Chart from '@/components/Chart';
import {
  ArrowLeft, ExternalLink, Share2, Users,
  BarChart3, TrendingUp, Clock, CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';

export default function MarketPage() {
  const { id }   = useParams<{ id: string }>();
  const sp       = useSearchParams();
  const isNew    = sp.get('new') === '1';
  const newQ     = sp.get('q');
  const newEnd   = sp.get('end');

  const [market, setMarket] = useState<Market | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let found: Market | null = MARKETS.find(m => m.id === id) ?? null;

    if (!found) {
      try {
        const stored: Market[] = JSON.parse(localStorage.getItem('op_markets') ?? '[]');
        found = stored.find(m => m.id === id) ?? null;
      } catch {}
    }

    if (!found && isNew && newQ && newEnd) {
      found = {
        id, question: decodeURIComponent(newQ),
        creator: 'You', createdAt: Date.now(),
        endTime: parseInt(newEnd), resolved: false, outcome: 'UNRESOLVED',
        yesPrice: 0.5, noPrice: 0.5, volume: 0, liquidity: 0,
        category: 'other', traders: 0,
      };
    }

    setMarket(found);
    setLoading(false);
  }, [id, isNew, newQ, newEnd]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <span className="w-6 h-6 rounded-full border-2 border-cyan/30 border-t-cyan animate-spin"/>
    </div>
  );

  if (!market) return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center">
      <p className="text-6xl mb-4">🔍</p>
      <h1 className="font-display font-extrabold text-3xl text-white mb-3">Market Not Found</h1>
      <p className="text-[#6B7A94] mb-6">This market doesn't exist or has been removed.</p>
      <Link href="/markets" className="btn btn-primary">
        <ArrowLeft size={15}/> Back to Markets
      </Link>
    </div>
  );

  const yes     = Math.round(market.yesPrice * 100);
  const no      = 100 - yes;
  const t       = timeLeft(market.endTime);
  const expired = t.expired;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      {/* Back */}
      <Link href="/markets"
        className="inline-flex items-center gap-1.5 text-sm font-mono text-[#4A5568]
                   hover:text-cyan transition-colors mb-6">
        <ArrowLeft size={14}/> All Markets
      </Link>

      {/* New-market success banner */}
      {isNew && (
        <div className="flex items-center gap-3 p-4 rounded-xl
                        bg-green/10 border border-green/20 mb-6">
          <CheckCircle2 size={16} className="text-green"/>
          <span className="text-green font-display font-semibold text-sm">
            Market created! Live on Solana.
          </span>
          <a href="#" className="ml-auto text-xs font-mono text-[#4A5568]
                                  hover:text-cyan flex items-center gap-1">
            View tx <ExternalLink size={11}/>
          </a>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Left: info ──────────────────────── */}
        <div className="lg:col-span-2 space-y-5">

          {/* Main card */}
          <div className="card p-7">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="tag text-[#4A5568] border-[#1A2535] capitalize">
                    {market.category}
                  </span>
                  {!expired ? (
                    <span className="flex items-center gap-1.5 tag text-green border-green/25 bg-green/8">
                      <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse"/> Live
                    </span>
                  ) : (
                    <span className="tag text-[#4A5568] border-[#1A2535] bg-[#111820]">
                      Expired
                    </span>
                  )}
                </div>
                <h1 className="font-display font-bold text-2xl text-white leading-snug">
                  {market.question}
                </h1>
              </div>
              <button className="shrink-0 p-2 rounded-lg border border-[#1A2535]
                                 text-[#4A5568] hover:text-cyan hover:border-cyan/30 transition-all">
                <Share2 size={14}/>
              </button>
            </div>

            {/* Countdown row */}
            <div className="flex items-center justify-between p-4 rounded-xl
                            bg-[#111820] border border-[#1A2535] mb-6">
              <span className="flex items-center gap-2 text-xs font-mono text-[#4A5568]">
                <Clock size={13}/>
                {expired ? 'Market ended' : 'Resolves in'}
              </span>
              {expired
                ? <span className="text-xs font-mono text-[#4A5568]">{new Date(market.endTime).toLocaleString()}</span>
                : <Countdown endTime={market.endTime}/>
              }
            </div>

            {/* Big probability */}
            <div className="space-y-3 mb-6">
              <div className="flex items-end justify-between">
                <div>
                  <span className="font-display font-extrabold text-5xl text-green">{yes}%</span>
                  <span className="text-[#4A5568] text-sm ml-2 font-mono">YES</span>
                </div>
                <div className="text-right">
                  <span className="font-display font-extrabold text-5xl text-red">{no}%</span>
                  <span className="text-[#4A5568] text-sm ml-2 font-mono">NO</span>
                </div>
              </div>
              <div className="h-3 rounded-full bg-red/20 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-green to-cyan transition-all duration-1000"
                  style={{ width:`${yes}%` }}/>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon:BarChart3,  label:'Volume',    val:fmtVol(market.volume)    },
                { icon:TrendingUp, label:'Liquidity', val:fmtVol(market.liquidity) },
                { icon:Users,      label:'Traders',   val:market.traders.toLocaleString() },
              ].map(({ icon:Icon, label, val }) => (
                <div key={label} className="text-center p-3 rounded-xl bg-[#111820]">
                  <Icon size={13} className="text-[#4A5568] mx-auto mb-1"/>
                  <p className="font-display font-bold text-sm text-white">{val || '—'}</p>
                  <p className="text-xs font-mono text-[#4A5568]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chart */}
          <Chart id={market.id} yesInit={yes}/>

          {/* Market info */}
          <div className="card p-5">
            <h3 className="font-display font-semibold text-sm text-white mb-4">Market Info</h3>
            <div className="space-y-2.5 text-xs font-mono">
              {[
                ['Creator',    market.creator],
                ['Created',    new Date(market.createdAt).toLocaleString()],
                ['Resolves',   new Date(market.endTime).toLocaleString()],
                ['Category',   market.category],
                ['Status',     expired ? 'Expired (awaiting oracle)' : 'Active'],
                ['Program',    'OmNiPu1se… (Phase 2)'],
              ].map(([k,v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <span className="text-[#4A5568]">{k}</span>
                  <span className="text-[#AAB4C8] text-right truncate">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: trade panel ──────────────── */}
        <div className="lg:col-span-1">
          <TradePanel market={market} expired={expired}/>
        </div>

      </div>
    </div>
  );
}
