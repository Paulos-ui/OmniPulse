'use client';
import { useState, useEffect } from 'react';

function gen(seed:number,n=50){ let v=50; const p=[v]; for(let i=1;i<n;i++){v=Math.max(4,Math.min(96,v+Math.sin(i*seed*.8)*7+(Math.random()-.48)*5));p.push(Math.round(v));} return p; }
function toPath(pts:number[],W:number,H:number){ const dx=W/(pts.length-1); return pts.map((p,i)=>`${i===0?'M':'L'} ${(i*dx).toFixed(1)} ${(H-(p/100)*H).toFixed(1)}`).join(' '); }

export default function Chart({ id, yesInit }: { id:string; yesInit:number }) {
  const seed = id.split('').reduce((a,c)=>a+c.charCodeAt(0),0)*.01;
  const [history, setHistory] = useState(()=>gen(seed));
  const [cur, setCur] = useState(yesInit);
  const W=600,H=120;

  useEffect(()=>{
    const t=setInterval(()=>{ setCur(p=>{ const n=Math.max(4,Math.min(96,p+(Math.random()-.48)*1.8)); setHistory(h=>[...h.slice(-49),Math.round(n)]); return n; }); },2000);
    return ()=>clearInterval(t);
  },[]);

  const path=toPath(history,W,H);
  const fill=`${path} L ${W} ${H} L 0 ${H} Z`;

  return (
    <div className="panel" style={{padding:'0'}}>
      <div style={{padding:'12px 16px',borderBottom:'1px solid #1E2530',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <p style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',letterSpacing:'0.1em',color:'#FF6600',textTransform:'uppercase'}}>// PROBABILITY CHART</p>
        <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
          <span style={{width:'5px',height:'5px',borderRadius:'50%',background:'#FF6600',boxShadow:'0 0 6px #FF6600'}}/>
          <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'11px',fontWeight:600,color:'#FF6600'}}>{Math.round(cur)}% YES</span>
        </div>
      </div>

      <div style={{padding:'12px 16px 0',background:'#0D0F14',borderBottom:'1px solid #1E2530',position:'relative'}}>
        {/* Y-axis */}
        <div style={{position:'absolute',right:'18px',top:'12px',bottom:'4px',display:'flex',flexDirection:'column',justifyContent:'space-between',pointerEvents:'none'}}>
          {[100,75,50,25,0].map(v=>(
            <span key={v} style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'8px',color:'#1E2530'}}>{v}%</span>
          ))}
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%',height:'120px',display:'block'}} preserveAspectRatio="none">
          <defs>
            <linearGradient id={`g${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#FF6600" stopOpacity=".18"/>
              <stop offset="100%" stopColor="#FF6600" stopOpacity="0"/>
            </linearGradient>
          </defs>
          {[25,50,75].map(y=>(
            <line key={y} x1="0" y1={H-(y/100)*H} x2={W} y2={H-(y/100)*H} stroke="#1E2530" strokeWidth="1"/>
          ))}
          <path d={fill} fill={`url(#g${id})`}/>
          <path d={path} fill="none" stroke="#FF6600" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
          <circle cx={(history.length-1)*(W/(history.length-1))} cy={H-(cur/100)*H} r="3.5" fill="#FF6600"/>
        </svg>
      </div>

      <div style={{padding:'6px 16px 10px',display:'flex',justifyContent:'space-between'}}>
        {['24H AGO','12H AGO','6H AGO','1H AGO','NOW'].map(l=>(
          <span key={l} style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'8px',color:'#28303E',letterSpacing:'0.05em'}}>{l}</span>
        ))}
      </div>
    </div>
  );
}
