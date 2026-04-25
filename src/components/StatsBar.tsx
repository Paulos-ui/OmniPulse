'use client';
import { useEffect, useRef, useState } from 'react';

const STATS = [
  { label:'Total Volume',    end:2_400_000, fmt:(v:number)=>`$${(v/1_000_000).toFixed(1)}M` },
  { label:'Active Markets',  end:847,       fmt:(v:number)=>v.toLocaleString() },
  { label:'Traders',         end:12_441,    fmt:(v:number)=>v.toLocaleString() },
  { label:'Avg Resolution',  end:47,        fmt:(v:number)=>`${v} min` },
];

function Counter({ end, fmt }: { end:number; fmt:(v:number)=>string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(()=>{
    const ob = new IntersectionObserver(([e])=>{
      if (!e.isIntersecting || started.current) return;
      started.current = true;
      const dur = 1400; const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now-t0)/dur, 1);
        setVal(Math.round((1-Math.pow(1-p,3))*end));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    },{ threshold:.3 });
    if (ref.current) ob.observe(ref.current);
    return ()=>ob.disconnect();
  },[end]);

  return <div ref={ref} className="font-display font-extrabold text-3xl sm:text-4xl text-white text-glow-cyan">{fmt(val)}</div>;
}

export default function StatsBar() {
  return (
    <section className="py-12 border-y border-[#1A2535] bg-[#0D1117]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map(s=>(
          <div key={s.label} className="text-center">
            <Counter end={s.end} fmt={s.fmt}/>
            <p className="mt-1.5 text-xs font-mono text-[#4A5568] uppercase tracking-widest">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
