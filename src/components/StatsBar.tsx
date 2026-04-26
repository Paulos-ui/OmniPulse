'use client';
import { useEffect, useRef, useState } from 'react';

const STATS = [
  { label:'TOTAL VOLUME',   end:2_400_000, fmt:(v:number)=>`$${(v/1e6).toFixed(2)}M`      },
  { label:'ACTIVE MARKETS', end:847,       fmt:(v:number)=>v.toLocaleString()              },
  { label:'TRADERS',        end:12_441,    fmt:(v:number)=>v.toLocaleString()              },
  { label:'AVG RESOLUTION', end:47,        fmt:(v:number)=>`${v} MIN`                      },
  { label:'TOTAL MARKETS',  end:3_284,     fmt:(v:number)=>v.toLocaleString()              },
  { label:'LIQUIDITY',      end:4_200_000, fmt:(v:number)=>`$${(v/1e6).toFixed(1)}M`       },
];

function Counter({ end, fmt }: { end:number; fmt:(v:number)=>string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(()=>{
    const ob = new IntersectionObserver(([e])=>{
      if (!e.isIntersecting || started.current) return;
      started.current = true;
      const dur = 1600, t0 = performance.now();
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
  return <div ref={ref} style={{fontFamily:'IBM Plex Mono,monospace',fontWeight:600,fontSize:'22px',color:'#F0F2F5',letterSpacing:'-0.01em'}}>{fmt(val)}</div>;
}

export default function StatsBar() {
  return (
    <section style={{background:'#0D0F14',borderTop:'1px solid #1E2530',borderBottom:'1px solid #1E2530'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px',display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0'}} className="sm:grid-cols-3 lg:grid-cols-6">
        {STATS.map((s,i) => (
          <div key={s.label} style={{
            padding:'20px 0',
            borderRight: i < 5 ? '1px solid #1E2530' : 'none',
            paddingLeft: i===0?'0':'24px',
            paddingRight:'24px',
          }}>
            <p style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'9px',letterSpacing:'0.14em',color:'#3A4255',textTransform:'uppercase',marginBottom:'6px'}}>{s.label}</p>
            <Counter end={s.end} fmt={s.fmt}/>
          </div>
        ))}
      </div>
    </section>
  );
}
