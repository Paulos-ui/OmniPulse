'use client';
import { useState } from 'react';
import { Market } from '@/types';
import { CheckCircle2 } from 'lucide-react';

const QUICK = [10, 25, 50, 100];

export default function TradePanel({ market, expired }: { market:Market; expired:boolean }) {
  const [side,   setSide]   = useState<'YES'|'NO'>('YES');
  const [amount, setAmount] = useState('');
  const [busy,   setBusy]   = useState(false);
  const [done,   setDone]   = useState(false);

  const price  = side==='YES' ? market.yesPrice : market.noPrice;
  const num    = parseFloat(amount) || 0;
  const tokens = num>0 ? (num/price).toFixed(4) : '—';
  const winAmt = num>0 ? (num/price).toFixed(2)  : '—';

  async function trade() {
    if (num<=0) return;
    setBusy(true);
    await new Promise(r=>setTimeout(r,1600));
    setBusy(false); setDone(true); setAmount('');
    setTimeout(()=>setDone(false), 3500);
  }

  if (expired) return (
    <div className="panel" style={{padding:'20px'}}>
      <div style={{borderBottom:'1px solid #1E2530',paddingBottom:'12px',marginBottom:'16px'}}>
        <p style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',letterSpacing:'0.1em',color:'#FF6600',textTransform:'uppercase'}}>{'// MARKET STATUS'}</p>
      </div>
      <p style={{fontFamily:'Barlow,sans-serif',fontWeight:700,fontSize:'16px',color:'#F0F2F5',marginBottom:'8px'}}>Awaiting Resolution</p>
      <p style={{fontSize:'12px',color:'#6B7585',lineHeight:1.6,marginBottom:'16px'}}>
        Market has expired. Mock oracle is computing outcome…
      </p>
      <div style={{height:'3px',background:'#1E2530',borderRadius:'2px',overflow:'hidden'}}>
        <div style={{height:'100%',width:'66%',background:'linear-gradient(90deg,#FF6600,#0052FF)',animation:'shimmer 1.8s infinite',backgroundSize:'200% 100%'}}/>
      </div>
      <p style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',color:'#3A4255',marginTop:'10px',textAlign:'center',letterSpacing:'0.06em'}}>
        PHASE 2: PYTH ORACLE RESOLUTION
      </p>
    </div>
  );

  return (
    <div className="panel" style={{padding:'0',position:'sticky',top:'72px'}}>
      {/* Header */}
      <div style={{padding:'14px 18px',borderBottom:'1px solid #1E2530',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <p style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',letterSpacing:'0.12em',color:'#FF6600',textTransform:'uppercase'}}>{'// TRADE'}</p>
        <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'9px',color:'#3A4255',letterSpacing:'0.06em'}}>MOCK MODE</span>
      </div>

      <div style={{padding:'18px'}}>
        {/* Side selector */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1px',background:'#1E2530',border:'1px solid #1E2530',borderRadius:'3px',overflow:'hidden',marginBottom:'18px'}}>
          {(['YES','NO'] as const).map(s=>(
            <button key={s} onClick={()=>setSide(s)} style={{
              padding:'11px',textAlign:'center',cursor:'pointer',border:'none',
              fontFamily:'IBM Plex Mono,monospace',fontSize:'11px',letterSpacing:'0.1em',
              fontWeight:600, transition:'all 0.15s',
              background: side===s ? (s==='YES'?'rgba(0,200,83,0.13)':'rgba(255,23,68,0.13)') : '#0D0F14',
              color: side===s ? (s==='YES'?'#00C853':'#FF1744') : '#3A4255',
              borderBottom: side===s ? `2px solid ${s==='YES'?'#00C853':'#FF1744'}` : '2px solid transparent',
            }}>
              {s} · {s==='YES' ? Math.round(market.yesPrice*100) : Math.round(market.noPrice*100)}¢
            </button>
          ))}
        </div>

        {/* Amount */}
        <div style={{marginBottom:'16px'}}>
          <p style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'9px',letterSpacing:'0.1em',color:'#3A4255',textTransform:'uppercase',marginBottom:'6px'}}>AMOUNT (USDC)</p>
          <div style={{position:'relative'}}>
            <span style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',fontFamily:'IBM Plex Mono,monospace',fontSize:'13px',color:'#3A4255'}}>$</span>
            <input className="inp" type="number" placeholder="0.00" min="0" value={amount}
              onChange={e=>setAmount(e.target.value)}
              style={{paddingLeft:'28px',fontFamily:'IBM Plex Mono,monospace',fontWeight:600,fontSize:'15px'}}/>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'4px',marginTop:'6px'}}>
            {QUICK.map(q=>(
              <button key={q} onClick={()=>setAmount(String(q))} style={{
                padding:'5px',border:'1px solid #1E2530',background:'#0D0F14',
                fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',color:'#3A4255',
                cursor:'pointer',borderRadius:'2px',transition:'all 0.15s',letterSpacing:'0.04em',
              }}
              onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.borderColor='#FF6600'; (e.currentTarget as HTMLElement).style.color='#FF6600'; }}
              onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.borderColor='#1E2530'; (e.currentTarget as HTMLElement).style.color='#3A4255'; }}>
                ${q}
              </button>
            ))}
          </div>
        </div>

        {/* Order summary */}
        <div style={{border:'1px solid #1E2530',borderRadius:'3px',marginBottom:'16px',overflow:'hidden'}}>
          <div style={{background:'#0D0F14',padding:'7px 12px',borderBottom:'1px solid #1E2530'}}>
            <p style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'9px',color:'#3A4255',letterSpacing:'0.1em',textTransform:'uppercase'}}>ORDER SUMMARY</p>
          </div>
          <div style={{padding:'10px 12px',display:'flex',flexDirection:'column',gap:'7px'}}>
            {[
              ['TOKENS OUT',   `${tokens} ${side}`,  side==='YES'?'#00C853':'#FF1744'],
              ['AVG PRICE',    `${Math.round(price*100)}¢`, '#F0F2F5'],
              ['POTENTIAL WIN',`$${winAmt}`,           '#00C853'],
              ['PROTOCOL FEE', num>0?`$${(num*.005).toFixed(3)}`:'—', '#3A4255'],
            ].map(([k,v,c])=>(
              <div key={k} style={{display:'flex',justifyContent:'space-between'}}>
                <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',color:'#3A4255',letterSpacing:'0.06em'}}>{k}</span>
                <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',fontWeight:600,color:c as string}}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        {done ? (
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',padding:'12px',border:'1px solid rgba(0,200,83,0.3)',borderRadius:'3px',background:'rgba(0,200,83,0.08)'}}>
            <CheckCircle2 size={15} color="#00C853"/>
            <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'11px',color:'#00C853',letterSpacing:'0.08em'}}>TX CONFIRMED</span>
          </div>
        ) : (
          <button onClick={trade} disabled={busy||num<=0}
            className={side==='YES'?'btn btn-yes':'btn btn-no'}
            style={{width:'100%',justifyContent:'center',padding:'12px',fontSize:'11px',letterSpacing:'0.1em',opacity:busy||num<=0?0.4:1,cursor:busy||num<=0?'not-allowed':'pointer'}}>
            {busy
              ? <><span style={{width:'14px',height:'14px',borderRadius:'50%',border:'2px solid currentColor',borderTopColor:'transparent',animation:'spin 0.7s linear infinite'}}/>SUBMITTING TX…</>
              : <>BUY {side}{num>0?` · $${num}`:''}</>}
          </button>
        )}

        <p style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'9px',color:'#3A4255',textAlign:'center',marginTop:'10px',letterSpacing:'0.06em'}}>
          CONNECT WALLET FOR ON-CHAIN EXECUTION
        </p>
      </div>
    </div>
  );
}