'use client';
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { MARKETS, fmtVol, timeLeft } from '@/lib/data';
import { Market } from '@/types';
import Countdown from '@/components/Countdown';
import TradePanel from '@/components/TradePanel';
import Chart from '@/components/Chart';
import { ArrowLeft, ExternalLink, Share2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function MarketPage() {
  const { id }  = useParams<{id:string}>();
  const sp      = useSearchParams();
  const isNew   = sp.get('new')==='1';
  const newQ    = sp.get('q');
  const newEnd  = sp.get('end');
  const [market,setMarket] = useState<Market|null>(null);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    let found: Market|null = MARKETS.find(m=>m.id===id) ?? null;
    if (!found) { try { const s:Market[]=JSON.parse(localStorage.getItem('op_markets')||'[]'); found=s.find(m=>m.id===id)??null; } catch{} }
    if (!found && isNew && newQ && newEnd) {
      found={id,question:decodeURIComponent(newQ),creator:'You',createdAt:Date.now(),endTime:parseInt(newEnd),resolved:false,outcome:'UNRESOLVED',yesPrice:0.5,noPrice:0.5,volume:0,liquidity:0,category:'other',traders:0};
    }
    setMarket(found); setLoading(false);
  },[id,isNew,newQ,newEnd]);

  if (loading) return <div style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'60vh'}}><span style={{width:'20px',height:'20px',borderRadius:'50%',border:'2px solid rgba(255,102,0,0.3)',borderTopColor:'#FF6600',animation:'spin .7s linear infinite'}}/></div>;

  if (!market) return (
    <div style={{textAlign:'center',padding:'80px 24px'}}>
      <p style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'11px',color:'#3A4255',letterSpacing:'0.1em',marginBottom:'16px'}}>MARKET NOT FOUND</p>
      <Link href="/markets" className="btn btn-ghost">← BACK TO MARKETS</Link>
    </div>
  );

  const yes     = Math.round(market.yesPrice*100);
  const no      = 100-yes;
  const t       = timeLeft(market.endTime);
  const expired = t.expired;

  return (
    <div style={{maxWidth:'1280px',margin:'0 auto',padding:'32px 24px'}}>

      {/* Breadcrumb */}
      <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'20px'}}>
        <Link href="/markets" style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',color:'#3A4255',textDecoration:'none',letterSpacing:'0.08em',display:'flex',alignItems:'center',gap:'5px'}}
          onMouseEnter={e=>(e.currentTarget.style.color='#FF6600')}
          onMouseLeave={e=>(e.currentTarget.style.color='#3A4255')}>
          <ArrowLeft size={12}/> MARKETS
        </Link>
        <span style={{color:'#1E2530',fontFamily:'IBM Plex Mono,monospace',fontSize:'10px'}}>/</span>
        <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',color:'#3A4255',letterSpacing:'0.06em'}}>{market.id.toUpperCase()}</span>
      </div>

      {/* New-market banner */}
      {isNew && (
        <div style={{display:'flex',alignItems:'center',gap:'10px',padding:'10px 16px',border:'1px solid rgba(0,200,83,0.25)',borderRadius:'3px',background:'rgba(0,200,83,0.07)',marginBottom:'20px'}}>
          <CheckCircle2 size={14} color="#00C853"/>
          <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',color:'#00C853',letterSpacing:'0.08em'}}>MARKET CREATED · LIVE ON SOLANA</span>
          <a href="#" style={{marginLeft:'auto',fontFamily:'IBM Plex Mono,monospace',fontSize:'9px',color:'#3A4255',display:'flex',alignItems:'center',gap:'4px',textDecoration:'none'}}>
            VIEW TX <ExternalLink size={9}/>
          </a>
        </div>
      )}

      <div style={{display:'grid',gridTemplateColumns:'1fr',gap:'16px'}} className="lg:grid-cols-3">

        {/* Left */}
        <div style={{gridColumn:'1/-1',display:'flex',flexDirection:'column',gap:'12px'}} className="lg:col-span-2">

          {/* Main panel */}
          <div className="panel" style={{padding:'0'}}>
            <div style={{padding:'12px 18px',borderBottom:'1px solid #1E2530',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'8px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'9px',color:'#FF6600',border:'1px solid rgba(255,102,0,0.25)',padding:'2px 7px',borderRadius:'2px',letterSpacing:'0.08em',textTransform:'uppercase'}}>{market.category}</span>
                {!expired
                  ? <span style={{display:'flex',alignItems:'center',gap:'5px',fontFamily:'IBM Plex Mono,monospace',fontSize:'9px',color:'#00C853',border:'1px solid rgba(0,200,83,0.25)',padding:'2px 7px',borderRadius:'2px',letterSpacing:'0.08em'}}>
                      <span className="live-dot" style={{width:'5px',height:'5px'}}/>LIVE
                    </span>
                  : <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'9px',color:'#3A4255',border:'1px solid #1E2530',padding:'2px 7px',borderRadius:'2px',letterSpacing:'0.08em'}}>EXPIRED</span>
                }
              </div>
              <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                <Countdown endTime={market.endTime}/>
                <button onClick={()=>navigator.clipboard.writeText(window.location.href)} style={{padding:'4px 8px',border:'1px solid #1E2530',borderRadius:'2px',background:'transparent',color:'#3A4255',cursor:'pointer',display:'flex',alignItems:'center',gap:'4px'}}>
                  <Share2 size={11}/>
                </button>
              </div>
            </div>

            <div style={{padding:'22px 18px'}}>
              <h1 style={{fontFamily:'Barlow,sans-serif',fontWeight:700,fontSize:'clamp(16px,2.5vw,22px)',color:'#F0F2F5',lineHeight:1.35,marginBottom:'22px'}}>{market.question}</h1>

              {/* Big probability */}
              <div style={{marginBottom:'20px'}}>
                <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:'8px'}}>
                  <div><span style={{fontFamily:'IBM Plex Mono,monospace',fontWeight:600,fontSize:'52px',color:'#00C853',lineHeight:1}}>{yes}</span><span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'18px',color:'#00C853'}}>%</span><span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'12px',color:'#3A4255',marginLeft:'6px'}}>YES</span></div>
                  <div style={{textAlign:'right'}}><span style={{fontFamily:'IBM Plex Mono,monospace',fontWeight:600,fontSize:'52px',color:'#FF1744',lineHeight:1}}>{no}</span><span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'18px',color:'#FF1744'}}>%</span><span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'12px',color:'#3A4255',marginLeft:'6px'}}>NO</span></div>
                </div>
                <div style={{height:'6px',background:'rgba(255,23,68,0.2)',borderRadius:'2px',overflow:'hidden'}}>
                  <div style={{height:'100%',width:`${yes}%`,background:'linear-gradient(90deg,#00C853,#FF6600)',transition:'width 1s ease'}}/>
                </div>
              </div>

              {/* Stats grid */}
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1px',background:'#1E2530',border:'1px solid #1E2530',borderRadius:'3px',overflow:'hidden'}}>
                {[
                  ['VOLUME',    fmtVol(market.volume)                   ],
                  ['LIQUIDITY', fmtVol(market.liquidity)                ],
                  ['TRADERS',   market.traders.toLocaleString()         ],
                ].map(([k,v])=>(
                  <div key={k} style={{background:'#0D0F14',padding:'12px',textAlign:'center'}}>
                    <p style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'9px',color:'#3A4255',letterSpacing:'0.1em',marginBottom:'4px'}}>{k}</p>
                    <p style={{fontFamily:'IBM Plex Mono,monospace',fontWeight:600,fontSize:'14px',color:'#F0F2F5'}}>{v||'—'}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chart */}
          <Chart id={market.id} yesInit={yes}/>

          {/* Market info */}
          <div className="panel" style={{padding:'0'}}>
            <div style={{padding:'10px 16px',borderBottom:'1px solid #1E2530'}}>
              <p style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'9px',letterSpacing:'0.12em',color:'#FF6600',textTransform:'uppercase'}}>// MARKET INFO</p>
            </div>
            <div style={{padding:'14px 16px'}}>
              {[
                ['MARKET ID',  market.id],
                ['CREATOR',    market.creator],
                ['CREATED',    new Date(market.createdAt).toLocaleString()],
                ['RESOLVES',   new Date(market.endTime).toLocaleString()],
                ['PROGRAM',    'OMNIPULSE V1 (PHASE 3)'],
                ['STATUS',     expired?'EXPIRED':'ACTIVE'],
              ].map(([k,v])=>(
                <div key={k} className="data-row">
                  <span className="data-label">{k}</span>
                  <span className="data-val" style={{maxWidth:'60%',textAlign:'right',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: trade */}
        <div style={{gridColumn:'1/-1'}} className="lg:col-span-1">
          <TradePanel market={market} expired={expired}/>
        </div>
      </div>
    </div>
  );
}
