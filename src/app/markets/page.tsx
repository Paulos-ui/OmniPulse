'use client';
import { useState, useMemo } from 'react';
import { MARKETS, CATEGORIES, fmtVol } from '@/lib/data';
import MarketCard from '@/components/MarketCard';
import { Search, Plus } from 'lucide-react';
import Link from 'next/link';

const SORTS = [['endTime','ENDING SOON'],['volume','HIGHEST VOLUME'],['recent','MOST RECENT']];

export default function MarketsPage() {
  const [q,  setQ]  = useState('');
  const [cat,setCat]= useState('all');
  const [srt,setSrt]= useState('endTime');

  const list = useMemo(()=>{
    let m=[...MARKETS];
    if (q)         m=m.filter(x=>x.question.toLowerCase().includes(q.toLowerCase()));
    if (cat!=='all') m=m.filter(x=>x.category===cat);
    if (srt==='endTime') m.sort((a,b)=>a.endTime-b.endTime);
    if (srt==='volume')  m.sort((a,b)=>b.volume-a.volume);
    if (srt==='recent')  m.sort((a,b)=>b.createdAt-a.createdAt);
    return m;
  },[q,cat,srt]);

  return (
    <div style={{maxWidth:'1280px',margin:'0 auto',padding:'40px 24px'}}>

      {/* Header */}
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'32px',flexWrap:'wrap',gap:'12px'}}>
        <div>
          <p style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',letterSpacing:'0.14em',color:'#FF6600',textTransform:'uppercase',marginBottom:'6px',display:'flex',alignItems:'center',gap:'6px'}}>
            <span style={{width:'5px',height:'5px',borderRadius:'50%',background:'#00C853',boxShadow:'0 0 6px #00C853'}}/>
            LIVE · {list.length} MARKETS
          </p>
          <h1 style={{fontFamily:'Barlow,sans-serif',fontWeight:800,fontSize:'clamp(26px,4vw,40px)',color:'#F0F2F5',letterSpacing:'-0.01em',textTransform:'uppercase'}}>
            All Markets
          </h1>
          <p style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'11px',color:'#3A4255',marginTop:'4px'}}>
            {fmtVol(MARKETS.reduce((s,m)=>s+m.volume,0))} TOTAL VOLUME
          </p>
        </div>
        <Link href="/create" className="btn btn-orange" style={{fontSize:'11px',padding:'10px 20px'}}>
          <Plus size={13}/> NEW MARKET
        </Link>
      </div>

      {/* Filters */}
      <div style={{border:'1px solid #1E2530',borderRadius:'4px',overflow:'hidden',marginBottom:'24px'}}>
        {/* Search + sort */}
        <div style={{display:'flex',gap:'0',borderBottom:'1px solid #1E2530'}}>
          <div style={{position:'relative',flex:1,borderRight:'1px solid #1E2530'}}>
            <Search size={13} style={{position:'absolute',left:'14px',top:'50%',transform:'translateY(-50%)',color:'#3A4255'}}/>
            <input className="inp" style={{borderRadius:'0',border:'none',paddingLeft:'36px',fontSize:'12px',background:'#0D0F14'}}
              placeholder="Search markets…" value={q} onChange={e=>setQ(e.target.value)}/>
          </div>
          <select className="inp" value={srt} onChange={e=>setSrt(e.target.value)}
            style={{border:'none',borderRadius:'0',background:'#0D0F14',width:'auto',paddingRight:'2rem',fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',letterSpacing:'0.08em',color:'#6B7585'}}>
            {SORTS.map(([v,l])=><option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        {/* Category tabs */}
        <div style={{display:'flex',overflowX:'auto',background:'#0D0F14'}}>
          {['all',...CATEGORIES].map((c,i)=>(
            <button key={c} onClick={()=>setCat(c)} style={{
              padding:'8px 16px', border:'none', borderRight:'1px solid #1E2530',
              background: cat===c ? '#111318' : 'transparent',
              fontFamily:'IBM Plex Mono,monospace', fontSize:'10px',
              letterSpacing:'0.1em', textTransform:'uppercase',
              color: cat===c ? '#FF6600' : '#3A4255',
              cursor:'pointer', whiteSpace:'nowrap', flexShrink:0,
              borderBottom: cat===c ? '2px solid #FF6600' : '2px solid transparent',
              transition:'color 0.15s',
            }}>{c}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {list.length===0 ? (
        <div style={{textAlign:'center',padding:'80px 0'}}>
          <p style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'12px',color:'#3A4255',marginBottom:'16px'}}>NO MARKETS FOUND</p>
          <Link href="/create" className="btn btn-orange" style={{fontSize:'11px'}}>
            <Plus size={13}/> CREATE ONE
          </Link>
        </div>
      ) : (
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'1px',background:'#1E2530',border:'1px solid #1E2530',borderRadius:'4px',overflow:'hidden'}}>
          {list.map((m,i)=><MarketCard key={m.id} market={m} delay={i*40}/>)}
        </div>
      )}
    </div>
  );
}
