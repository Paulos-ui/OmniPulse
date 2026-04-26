'use client';
import Link from 'next/link';
import { Market } from '@/types';
import { fmtVol } from '@/lib/data';
import Countdown from './Countdown';

const CAT_COLOR: Record<string,string> = {
  crypto:   '#FF6600',
  tech:     '#0052FF',
  sports:   '#00C853',
  politics: '#FFB300',
  other:    '#6B7585',
};

export default function MarketCard({ market, delay=0 }: { market:Market; delay?:number }) {
  const yes = Math.round(market.yesPrice * 100);
  const no  = 100 - yes;
  const cc  = CAT_COLOR[market.category] ?? '#6B7585';

  return (
    <Link href={`/market/${market.id}`} style={{textDecoration:'none'}}>
      <div className="panel bracket fade-up" style={{
        padding:'0', cursor:'pointer', animationDelay:`${delay}ms`,
        transition:'border-color 0.2s, transform 0.2s',
        display:'flex', flexDirection:'column',
      }}
      onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.transform='translateY(-2px)'; (e.currentTarget as HTMLElement).style.borderColor='#28303E'; }}
      onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.transform=''; (e.currentTarget as HTMLElement).style.borderColor=''; }}>

        {/* Top bar — category color */}
        <div style={{height:'3px',background:`linear-gradient(90deg,${cc},transparent)`}}/>

        <div style={{padding:'16px'}}>
          {/* Header row */}
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'10px'}}>
            <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'9px',letterSpacing:'0.1em',color:cc,textTransform:'uppercase',border:`1px solid ${cc}30`,borderRadius:'2px',padding:'2px 6px'}}>
              {market.category}
            </span>
            <Countdown endTime={market.endTime} compact/>
          </div>

          {/* Question */}
          <p style={{fontFamily:'Barlow,sans-serif',fontWeight:600,fontSize:'13px',color:'#F0F2F5',lineHeight:1.4,marginBottom:'14px',minHeight:'36px',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>
            {market.question}
          </p>

          {/* Probability */}
          <div style={{marginBottom:'10px'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'5px'}}>
              <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'11px',color:'#00C853',fontWeight:600}}>YES {yes}%</span>
              <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'11px',color:'#FF1744',fontWeight:600}}>NO {no}%</span>
            </div>
            <div className="pbar"><div className="pbar-fill" style={{width:`${yes}%`}}/></div>
          </div>

          {/* Footer */}
          <div style={{display:'flex',justifyContent:'space-between',paddingTop:'10px',borderTop:'1px solid #1E2530'}}>
            <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',color:'#3A4255'}}>{fmtVol(market.volume)}<span style={{color:'#3A4255',marginLeft:'2px'}}>VOL</span></span>
            <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',color:'#3A4255'}}>{market.traders.toLocaleString()} TRADERS</span>
            <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',color:'#3A4255'}}>{fmtVol(market.liquidity)} LIQ</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
