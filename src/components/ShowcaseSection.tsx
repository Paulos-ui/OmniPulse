'use client';
import Countdown from './Countdown';

const EXAMPLES = [
  { q:'Will SOL go up in the next 30 minutes?',     yes:67, dur:'30 MIN', endTime:Date.now()+18*60_000,     vol:'$42.8K', hot:true  },
  { q:'Will BTC hit $70k today?',                    yes:41, dur:'8 HR',  endTime:Date.now()+8*3600_000,    vol:'$187K',  hot:true  },
  { q:'Will the next Fed announcement be hawkish?',  yes:15, dur:'24 HR', endTime:Date.now()+20*3600_000,   vol:'$95K',   hot:false },
  { q:'ETH gas below 10 gwei in 1 hour?',            yes:29, dur:'1 HR',  endTime:Date.now()+40*60_000,     vol:'$28K',   hot:false },
  { q:'New AI model drops before Friday?',           yes:78, dur:'24 HR', endTime:Date.now()+21*3600_000,   vol:'$58K',   hot:true  },
  { q:'Solana daily transactions hit new ATH?',      yes:55, dur:'4 HR',  endTime:Date.now()+4*3600_000,    vol:'$21K',   hot:false },
];

export default function ShowcaseSection() {
  return (
    <section className="py-20 bg-[#0D1117] border-y border-[#1A2535]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow/10 border border-yellow/20
                          rounded-full px-4 py-1.5 mb-4">
            <span className="text-xs font-mono text-yellow tracking-widest uppercase">🔥 Trending</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-3">
            Micro-Markets for Every Moment
          </h2>
          <p className="text-[#6B7A94] text-base max-w-xl mx-auto">
            From 5-minute crypto moves to 24-hour macro events.
            If it's uncertain, it can be a market.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXAMPLES.map((e, i) => (
            <ShowCard key={i} {...e} delay={i*70}/>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShowCard({ q, yes, dur, endTime, vol, hot, delay }:
  { q:string; yes:number; dur:string; endTime:number; vol:string; hot:boolean; delay:number }) {
  const no = 100 - yes;
  return (
    <div className="card p-5 opacity-0" style={{animation:`fadeUp .5s ease-out ${delay}ms forwards`}}>
      <div className="flex items-center justify-between mb-3">
        <span className="tag text-[#4A5568] border-[#1A2535]">⚡ {dur}</span>
        {hot && <span className="tag text-red border-red/25 bg-red/8">🔥 HOT</span>}
      </div>
      <p className="font-display font-semibold text-sm text-white leading-snug mb-4 min-h-[2.5rem]">{q}</p>
      <div className="flex items-end gap-3 mb-3">
        <div>
          <p className={`font-display font-extrabold text-3xl ${yes>=65?'text-green':yes<=35?'text-red':'text-white'}`}>
            {yes}%
          </p>
          <p className="text-xs font-mono text-[#4A5568]">YES probability</p>
        </div>
        <div className="flex-1 pb-2">
          <div className="pbar" style={{height:'7px'}}>
            <div className="pbar-fill" style={{width:`${yes}%`,height:'7px'}}/>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-[#1A2535] pt-3">
        <Countdown endTime={endTime} compact/>
        <span className="text-xs font-mono text-[#4A5568]">{vol} vol</span>
        <button className="text-xs font-display font-bold text-cyan hover:text-white transition-colors">
          Trade →
        </button>
      </div>
    </div>
  );
}
