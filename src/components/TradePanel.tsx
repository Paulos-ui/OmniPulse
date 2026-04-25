'use client';
import { useState } from 'react';
import { Market } from '@/types';
import { TrendingUp, CheckCircle2, Wallet } from 'lucide-react';

const QUICK = [10, 25, 50, 100];

export default function TradePanel({ market, expired }: { market: Market; expired: boolean }) {
  const [side,   setSide]   = useState<'YES'|'NO'>('YES');
  const [amount, setAmount] = useState('');
  const [busy,   setBusy]   = useState(false);
  const [done,   setDone]   = useState(false);

  const price   = side === 'YES' ? market.yesPrice : market.noPrice;
  const num     = parseFloat(amount) || 0;
  const tokens  = num > 0 ? (num / price).toFixed(2) : '—';
  const winAmt  = num > 0 ? (num / price).toFixed(2) : '—';

  async function trade() {
    if (num <= 0) return;
    setBusy(true);
    await new Promise(r => setTimeout(r, 1600));
    setBusy(false); setDone(true); setAmount('');
    setTimeout(() => setDone(false), 3000);
  }

  if (expired) return (
    <div className="card p-6 space-y-4">
      <h3 className="font-display font-bold text-white">Awaiting Resolution</h3>
      <p className="text-sm text-[#6B7A94]">
        Market has ended. The mock oracle is calculating the outcome…
      </p>
      <div className="h-1.5 rounded-full bg-[#111820] overflow-hidden">
        <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-yellow to-cyan animate-shimmer"
          style={{ backgroundSize:'200% 100%' }}/>
      </div>
    </div>
  );

  return (
    <div className="sticky top-24 card p-6 space-y-5">
      <h3 className="font-display font-bold text-lg text-white">Trade</h3>

      {/* Side toggle */}
      <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#111820]">
        {(['YES','NO'] as const).map(s => (
          <button key={s} onClick={() => setSide(s)}
            className={`py-2.5 rounded-lg text-sm font-display font-bold transition-all ${
              side === s
                ? s === 'YES'
                  ? 'bg-green/20 text-green border border-green/30'
                  : 'bg-red/20 text-red border border-red/30'
                : 'text-[#4A5568] hover:text-[#AAB4C8]'
            }`}>
            {s} · {s === 'YES' ? Math.round(market.yesPrice*100) : Math.round(market.noPrice*100)}¢
          </button>
        ))}
      </div>

      {/* Amount */}
      <div>
        <label className="text-xs font-mono text-[#4A5568] block mb-2">Amount (USDC)</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5568] font-mono text-sm">$</span>
          <input className="inp pl-7" type="number" placeholder="0.00" min="0"
            value={amount} onChange={e => setAmount(e.target.value)}/>
        </div>
        <div className="flex gap-2 mt-2">
          {QUICK.map(q => (
            <button key={q} onClick={() => setAmount(String(q))}
              className="flex-1 py-1.5 text-xs font-mono rounded-lg border border-[#1A2535]
                         text-[#4A5568] hover:text-cyan hover:border-cyan/30 transition-all">
              ${q}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="rounded-xl bg-[#111820] border border-[#1A2535] p-4 space-y-2.5 text-xs font-mono">
        <div className="flex justify-between">
          <span className="text-[#4A5568]">Tokens out</span>
          <span className={`font-bold ${side==='YES'?'text-green':'text-red'}`}>{tokens} {side}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#4A5568]">Avg price</span>
          <span className="text-white">{Math.round(price*100)}¢</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#4A5568]">If correct you win</span>
          <span className="text-green">${winAmt}</span>
        </div>
        <div className="border-t border-[#1A2535] pt-2 flex justify-between">
          <span className="text-[#4A5568]">Fee (0.5%)</span>
          <span className="text-[#4A5568]">{num>0 ? `$${(num*.005).toFixed(2)}` : '—'}</span>
        </div>
      </div>

      {/* CTA */}
      {done ? (
        <div className="flex items-center justify-center gap-2 py-3.5 rounded-lg
                        bg-green/10 border border-green/30 text-green">
          <CheckCircle2 size={16}/>
          <span className="font-display font-bold text-sm">Trade Confirmed!</span>
        </div>
      ) : (
        <button onClick={trade} disabled={busy || num <= 0}
          className={`btn w-full justify-center py-3.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed
            ${side==='YES' ? 'btn-yes' : 'btn-no'}`}>
          {busy
            ? <><span className="w-4 h-4 rounded-full border-2 border-current/30 border-t-current animate-spin"/>Submitting…</>
            : <><TrendingUp size={15}/>Buy {side}{num>0 ? ` · $${num}` : ''}</>}
        </button>
      )}

      <button className="w-full text-center text-xs font-mono text-[#4A5568] hover:text-cyan transition-colors flex items-center justify-center gap-1.5">
        <Wallet size={12}/>Connect Wallet to Trade on-chain
      </button>
    </div>
  );
}
