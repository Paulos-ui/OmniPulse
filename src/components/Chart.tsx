'use client';
import { useState, useEffect } from 'react';

function genHistory(seed: number, n = 40) {
  let v = 50; const pts = [v];
  for (let i = 1; i < n; i++) {
    v = Math.max(4, Math.min(96, v + Math.sin(i*seed*.8)*7 + (Math.random()-.48)*5));
    pts.push(Math.round(v));
  }
  return pts;
}

function toPath(pts: number[], W: number, H: number) {
  const dx = W / (pts.length - 1);
  return pts.map((p,i) => `${i===0?'M':'L'} ${(i*dx).toFixed(1)} ${(H-(p/100)*H).toFixed(1)}`).join(' ');
}

export default function Chart({ id, yesInit }: { id: string; yesInit: number }) {
  const seed = id.split('').reduce((a,c)=>a+c.charCodeAt(0),0)*.01;
  const [history, setHistory] = useState(()=>genHistory(seed));
  const [cur, setCur] = useState(yesInit);
  const W=600, H=110;

  useEffect(()=>{
    const t = setInterval(()=>{
      setCur(p => {
        const next = Math.max(4,Math.min(96, p+(Math.random()-.48)*1.8));
        setHistory(h => [...h.slice(-39), Math.round(next)]);
        return next;
      });
    }, 2000);
    return ()=>clearInterval(t);
  },[]);

  const path = toPath(history, W, H);
  const fill = `${path} L ${W} ${H} L 0 ${H} Z`;

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="font-display font-semibold text-sm text-white">Probability History</span>
        <span className="flex items-center gap-1.5 font-mono text-sm text-cyan">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse"/>
          {Math.round(cur)}% YES
        </span>
      </div>

      <div className="rounded-lg bg-[#111820] border border-[#1A2535] overflow-hidden">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{height:110}} preserveAspectRatio="none">
          <defs>
            <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#00F5D4" stopOpacity=".16"/>
              <stop offset="100%" stopColor="#00F5D4" stopOpacity="0"/>
            </linearGradient>
          </defs>
          {[25,50,75].map(y=>(
            <line key={y} x1="0" y1={H-(y/100)*H} x2={W} y2={H-(y/100)*H}
              stroke="rgba(255,255,255,.04)" strokeWidth="1"/>
          ))}
          <path d={fill} fill="url(#cg)"/>
          <path d={path} fill="none" stroke="#00F5D4" strokeWidth="2"
            strokeLinejoin="round" strokeLinecap="round"/>
          <circle cx={(history.length-1)*(W/(history.length-1))}
            cy={H-(cur/100)*H} r="4" fill="#00F5D4"/>
        </svg>
      </div>

      <div className="flex justify-between mt-2">
        {['24h ago','12h ago','6h ago','1h ago','Now'].map(l=>(
          <span key={l} className="text-xs font-mono text-[#3A4A5E]">{l}</span>
        ))}
      </div>
    </div>
  );
}
