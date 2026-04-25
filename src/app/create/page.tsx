'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DURATIONS, CATEGORIES } from '@/lib/data';
import { Zap, Clock, CheckCircle2, HelpCircle, Eye } from 'lucide-react';

const EXAMPLES = [
  'Will SOL exceed $200 before midnight UTC?',
  'Will BTC reach $70k this week?',
  'Will the Fed signal a rate cut today?',
  'Will ETH gas drop below 10 gwei in 1 hour?',
  'Will a new AI model be announced today?',
];

export default function CreatePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    question:   '',
    duration:   DURATIONS[2].ms,
    category:   'crypto' as string,
    resolution: '',
  });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const endTime  = Date.now() + form.duration;
  const endLabel = new Date(endTime).toLocaleString(undefined, {
    month:'short', day:'numeric', hour:'2-digit', minute:'2-digit',
  });
  const durLabel = DURATIONS.find(d => d.ms === form.duration)?.label ?? '';
  const yes = 50;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.question.trim()) return;
    setBusy(true);
    await new Promise(r => setTimeout(r, 1500));

    const id = `mkt-${Date.now()}`;
    try {
      const prev = JSON.parse(localStorage.getItem('op_markets') ?? '[]');
      localStorage.setItem('op_markets', JSON.stringify([
        { id, ...form, createdAt: Date.now(), endTime,
          resolved:false, outcome:'UNRESOLVED',
          yesPrice:0.5, noPrice:0.5, volume:0, liquidity:0, traders:0 },
        ...prev,
      ]));
    } catch {}

    setBusy(false);
    setDone(true);
    setTimeout(() => router.push(`/market/${id}?new=1&q=${encodeURIComponent(form.question)}&end=${endTime}`), 1000);
  }

  /* ── Success splash ── */
  if (done) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-6">
      <CheckCircle2 size={64} className="text-green"/>
      <h2 className="font-display font-extrabold text-3xl text-white">Market Created!</h2>
      <p className="text-[#6B7A94]">Redirecting to your market…</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

        {/* ── Form col (3/5) ───────────────────── */}
        <div className="lg:col-span-3">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={16} className="text-cyan"/>
              <span className="text-xs font-mono text-cyan tracking-widest uppercase">New Market</span>
            </div>
            <h1 className="font-display font-extrabold text-4xl text-white mb-2">
              Create a Market
            </h1>
            <p className="text-[#6B7A94] text-sm">
              Any verifiable YES/NO outcome. Goes live on Solana instantly.
            </p>
          </div>

          <form onSubmit={submit} className="space-y-7">

            {/* Question */}
            <div>
              <label className="block text-sm font-display font-bold text-white mb-2">
                Market Question <span className="text-red">*</span>
              </label>
              <textarea
                className="inp text-base font-display resize-none"
                rows={3}
                placeholder="Will SOL exceed $200 before midnight UTC?"
                value={form.question}
                onChange={e => setForm(f => ({ ...f, question: e.target.value }))}
                required
              />
              {/* Example pills */}
              <div className="flex flex-wrap gap-2 mt-2">
                {EXAMPLES.map(ex => (
                  <button type="button" key={ex}
                    onClick={() => setForm(f => ({ ...f, question: ex }))}
                    className="text-xs px-3 py-1.5 rounded-full border border-[#1A2535]
                               text-[#4A5568] hover:text-cyan hover:border-cyan/30 transition-all font-mono">
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="flex items-center gap-2 text-sm font-display font-bold text-white mb-3">
                <Clock size={14} className="text-yellow"/> Duration
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {DURATIONS.map(d => (
                  <button type="button" key={d.ms}
                    onClick={() => setForm(f => ({ ...f, duration: d.ms }))}
                    className={`py-2.5 rounded-lg border text-sm font-display font-bold transition-all ${
                      form.duration === d.ms
                        ? 'border-cyan/50 bg-cyan/10 text-cyan'
                        : 'border-[#1A2535] text-[#4A5568] hover:border-[#243044] hover:text-[#AAB4C8]'
                    }`}>
                    {d.label}
                  </button>
                ))}
              </div>
              <p className="mt-2.5 flex items-center gap-1.5 text-xs font-mono text-[#4A5568]">
                <Clock size={11}/> Resolves: <span className="text-yellow">{endLabel}</span>
              </p>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-display font-bold text-white mb-3">Category</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(c => (
                  <button type="button" key={c}
                    onClick={() => setForm(f => ({ ...f, category: c }))}
                    className={`tag cursor-pointer transition-all capitalize ${
                      form.category === c
                        ? 'text-cyan border-cyan/40 bg-cyan/10'
                        : 'text-[#4A5568] border-[#1A2535] hover:border-[#243044]'
                    }`}
                    style={{ padding:'6px 14px' }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Resolution criteria */}
            <div>
              <label className="flex items-center gap-2 text-sm font-display font-bold text-white mb-2">
                Resolution Criteria
                <span className="text-xs font-mono text-[#4A5568] font-normal">(optional)</span>
              </label>
              <input
                className="inp text-sm"
                placeholder="e.g. Resolves YES if CoinGecko shows SOL > $200 at market close"
                value={form.resolution}
                onChange={e => setForm(f => ({ ...f, resolution: e.target.value }))}
              />
            </div>

            {/* Info box */}
            <div className="flex gap-3 p-4 rounded-xl bg-cyan/5 border border-cyan/15">
              <HelpCircle size={15} className="text-cyan shrink-0 mt-0.5"/>
              <p className="text-xs text-[#6B7A94] leading-relaxed font-mono">
                Markets start at 50/50 and price moves with every trade.
                Resolved via mock oracle for MVP — on-chain Pyth oracle in Phase 2.
                Creator earns <span className="text-cyan">0.3%</span> of all trading fees.
              </p>
            </div>

            {/* Submit */}
            <button type="submit" disabled={busy || !form.question.trim()}
              className="btn btn-primary w-full justify-center py-4 text-base
                         disabled:opacity-40 disabled:cursor-not-allowed">
              {busy
                ? <><span className="w-4 h-4 rounded-full border-2 border-[#080B0F]/30 border-t-[#080B0F] animate-spin"/>Deploying on Solana…</>
                : <><Zap size={16}/>Launch Market</>}
            </button>
          </form>
        </div>

        {/* ── Live Preview col (2/5) ───────────── */}
        <div className="lg:col-span-2 sticky top-24">
          <div className="flex items-center gap-2 mb-4">
            <Eye size={14} className="text-[#4A5568]"/>
            <span className="text-xs font-mono text-[#4A5568] uppercase tracking-widest">Live Preview</span>
          </div>

          <div className="card p-5 space-y-4">
            {/* Category + timer */}
            <div className="flex items-center justify-between">
              <span className="tag text-cyan border-cyan/25 bg-cyan/8 capitalize">
                {form.category}
              </span>
              <span className="font-mono text-sm font-bold text-yellow">{durLabel}</span>
            </div>

            {/* Question preview */}
            <p className="font-display font-semibold text-sm text-white leading-snug min-h-[3rem]">
              {form.question || <span className="text-[#3A4A5E]">Your question will appear here…</span>}
            </p>

            {/* Prob bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-green font-bold">YES 50%</span>
                <span className="text-red   font-bold">NO  50%</span>
              </div>
              <div className="pbar"><div className="pbar-fill" style={{ width:'50%' }}/></div>
            </div>

            {/* Buy buttons preview */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button className="btn btn-yes justify-center text-sm py-2.5" disabled>
                Buy YES
              </button>
              <button className="btn btn-no justify-center text-sm py-2.5" disabled>
                Buy NO
              </button>
            </div>

            {/* End time */}
            <p className="text-xs font-mono text-[#3A4A5E] text-center border-t border-[#1A2535] pt-3">
              Resolves {endLabel}
            </p>
          </div>

          {/* Phase callout */}
          <div className="mt-4 rounded-xl bg-[#0D1117] border border-[#1A2535] p-4">
            <p className="text-xs font-display font-bold text-white mb-1">Phase 1 — Mock Mode</p>
            <p className="text-xs text-[#4A5568] leading-relaxed">
              Trading is simulated. Real Solana transactions, SPL token minting,
              and Pyth oracle resolution land in Phase 2.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
