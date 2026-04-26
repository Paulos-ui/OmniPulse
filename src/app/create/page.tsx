'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DURATIONS, CATEGORIES } from '@/lib/data';
import { Zap, CheckCircle2 } from 'lucide-react';

const EXAMPLES = [
  'Will SOL exceed $200 before midnight UTC?',
  'Will BTC reach $70k this week?',
  'Will the Fed signal a rate cut today?',
  'Will ETH gas drop below 10 gwei in 1 hour?',
  'Will a new AI model be announced today?',
];

export default function CreatePage() {
  const router = useRouter();
  const [form, setForm] = useState({ question:'', duration:DURATIONS[2].ms, category:'crypto', resolution:'' });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const endTime  = Date.now() + form.duration;
  const endLabel = new Date(endTime).toLocaleString(undefined,{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});
  const durLabel = DURATIONS.find(d=>d.ms===form.duration)?.label ?? '';

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.question.trim()) return;
    setBusy(true);
    await new Promise(r=>setTimeout(r,1500));
    const id=`mkt-${Date.now()}`;
    try {
      const prev=JSON.parse(localStorage.getItem('op_markets')||'[]');
      localStorage.setItem('op_markets',JSON.stringify([{id,...form,createdAt:Date.now(),endTime,resolved:false,outcome:'UNRESOLVED',yesPrice:.5,noPrice:.5,volume:0,liquidity:0,traders:0},...prev]));
    } catch {}
    setBusy(false); setDone(true);
    setTimeout(()=>router.push(`/market/${id}?new=1&q=${encodeURIComponent(form.question)}&end=${endTime}`),900);
  }

  if (done) return (
    <div style={{minHeight:'60vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'16px',textAlign:'center',padding:'24px'}}>
      <CheckCircle2 size={56} color="#00C853"/>
      <h2 style={{fontFamily:'Barlow,sans-serif',fontWeight:800,fontSize:'28px',color:'#F0F2F5',letterSpacing:'-0.01em',textTransform:'uppercase'}}>MARKET CREATED</h2>
      <p style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'11px',color:'#3A4255',letterSpacing:'0.06em'}}>REDIRECTING TO MARKET PAGE…</p>
    </div>
  );

  return (
    <div style={{maxWidth:'1280px',margin:'0 auto',padding:'48px 24px'}}>
      <p style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',letterSpacing:'0.14em',color:'#FF6600',textTransform:'uppercase',marginBottom:'8px',display:'flex',alignItems:'center',gap:'6px'}}>
        <span>{'// NEW MARKET'}</span>
      </p>
      <h1 style={{fontFamily:'Barlow,sans-serif',fontWeight:800,fontSize:'clamp(26px,4vw,42px)',color:'#F0F2F5',letterSpacing:'-0.01em',textTransform:'uppercase',marginBottom:'32px'}}>
        Create a Market
      </h1>

      <div style={{display:'grid',gridTemplateColumns:'1fr',gap:'24px'}} className="lg:grid-cols-3">
        <div style={{gridColumn:'1 / -1'}} className="lg:col-span-2">
          <form onSubmit={submit}>
            <div style={{border:'1px solid #1E2530',borderRadius:'4px',overflow:'hidden'}}>

              {/* Question */}
              <Section label="MARKET QUESTION" required>
                <textarea className="inp" rows={3} placeholder="Will SOL exceed $200 before midnight UTC?"
                  value={form.question} onChange={e=>setForm(f=>({...f,question:e.target.value}))} required
                  style={{border:'none',borderRadius:'0',resize:'none',fontSize:'15px',fontFamily:'Barlow,sans-serif',fontWeight:500,background:'#111318'}}/>
                <div style={{padding:'10px 14px',borderTop:'1px solid #1E2530',background:'#0D0F14',display:'flex',flexWrap:'wrap',gap:'6px'}}>
                  {EXAMPLES.map(ex=>(
                    <button type="button" key={ex} onClick={()=>setForm(f=>({...f,question:ex}))}
                      style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'9px',letterSpacing:'0.06em',padding:'3px 8px',border:'1px solid #1E2530',borderRadius:'2px',color:'#3A4255',background:'transparent',cursor:'pointer',transition:'all 0.15s'}}
                      onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='#FF6600';(e.currentTarget as HTMLElement).style.color='#FF6600';}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='#1E2530';(e.currentTarget as HTMLElement).style.color='#3A4255';}}>
                      {ex}
                    </button>
                  ))}
                </div>
              </Section>

              {/* Duration */}
              <Section label="DURATION">
                <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:'1px',background:'#1E2530'}}>
                  {DURATIONS.map(d=>(
                    <button type="button" key={d.ms} onClick={()=>setForm(f=>({...f,duration:d.ms}))} style={{
                      padding:'12px 6px',textAlign:'center',border:'none',cursor:'pointer',
                      fontFamily:'IBM Plex Mono,monospace',fontSize:'11px',letterSpacing:'0.06em',
                      background: form.duration===d.ms ? '#FF6600' : '#111318',
                      color:       form.duration===d.ms ? '#fff'   : '#3A4255',
                      transition:'all 0.15s',fontWeight: form.duration===d.ms?600:400,
                    }}>{d.label}</button>
                  ))}
                </div>
                <div style={{padding:'8px 14px',background:'#0D0F14',borderTop:'1px solid #1E2530'}}>
                  <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'9px',color:'#3A4255',letterSpacing:'0.06em'}}>
                    RESOLVES: <span style={{color:'#FF6600'}}>{endLabel}</span>
                  </span>
                </div>
              </Section>

              {/* Category */}
              <Section label="CATEGORY">
                <div style={{display:'flex',flexWrap:'wrap',gap:'1px',background:'#1E2530'}}>
                  {CATEGORIES.map(c=>(
                    <button type="button" key={c} onClick={()=>setForm(f=>({...f,category:c}))} style={{
                      padding:'9px 16px',border:'none',cursor:'pointer',
                      fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',letterSpacing:'0.08em',textTransform:'uppercase',
                      background: form.category===c ? 'rgba(255,102,0,0.15)' : '#111318',
                      color:       form.category===c ? '#FF6600' : '#3A4255',
                      transition:'all 0.15s', borderBottom: form.category===c?'2px solid #FF6600':'2px solid transparent',
                    }}>{c}</button>
                  ))}
                </div>
              </Section>

              {/* Resolution */}
              <Section label="RESOLUTION CRITERIA (OPTIONAL)">
                <input className="inp" placeholder="e.g. Resolves YES if CoinGecko shows SOL > $200 at market close"
                  value={form.resolution} onChange={e=>setForm(f=>({...f,resolution:e.target.value}))}
                  style={{border:'none',borderRadius:'0',background:'#111318',fontSize:'13px'}}/>
              </Section>

              {/* Submit */}
              <div style={{padding:'16px 14px',borderTop:'1px solid #1E2530',background:'#0D0F14',display:'flex',alignItems:'center',gap:'12px'}}>
                <button type="submit" disabled={busy||!form.question.trim()} className="btn btn-orange"
                  style={{fontSize:'11px',padding:'11px 28px',opacity:busy||!form.question.trim()?0.4:1,cursor:busy||!form.question.trim()?'not-allowed':'pointer'}}>
                  {busy
                    ? <><span style={{width:'13px',height:'13px',borderRadius:'50%',border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',animation:'spin 0.7s linear infinite'}}/>DEPLOYING…</>
                    : <><Zap size={13}/>LAUNCH MARKET</>}
                </button>
                <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'9px',color:'#3A4255',letterSpacing:'0.06em'}}>
                  MOCK TX · PHASE 2 FOR ON-CHAIN
                </span>
              </div>
            </div>
          </form>
        </div>

        {/* Live preview */}
        <div style={{gridColumn:'1/-1'}} className="lg:col-span-1">
          <div style={{position:'sticky',top:'72px'}}>
            <p style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'9px',letterSpacing:'0.12em',color:'#3A4255',textTransform:'uppercase',marginBottom:'10px'}}>{'// LIVE PREVIEW'}</p>
            <div className="panel" style={{padding:'0'}}>
              <div style={{height:'3px',background:'linear-gradient(90deg,#FF6600,transparent)'}}/>
              <div style={{padding:'14px'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'10px'}}>
                  <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'9px',color:'#FF6600',border:'1px solid rgba(255,102,0,0.25)',padding:'2px 6px',borderRadius:'2px',textTransform:'uppercase',letterSpacing:'0.08em'}}>
                    {form.category}
                  </span>
                  <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'11px',fontWeight:600,color:'#FF6600'}}>{durLabel}</span>
                </div>
                <p style={{fontFamily:'Barlow,sans-serif',fontWeight:600,fontSize:'13px',color:'#F0F2F5',lineHeight:1.4,marginBottom:'14px',minHeight:'40px'}}>
                  {form.question || <span style={{color:'#28303E'}}>Your question will appear here…</span>}
                </p>
                <div style={{marginBottom:'12px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:'5px'}}>
                    <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'11px',color:'#00C853',fontWeight:600}}>YES 50%</span>
                    <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'11px',color:'#FF1744',fontWeight:600}}>NO 50%</span>
                  </div>
                  <div className="pbar"><div className="pbar-fill" style={{width:'50%'}}/></div>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px',marginTop:'12px'}}>
                  <button className="btn btn-yes" style={{justifyContent:'center',fontSize:'10px',padding:'9px',letterSpacing:'0.08em',opacity:0.6,cursor:'default'}}>BUY YES</button>
                  <button className="btn btn-no"  style={{justifyContent:'center',fontSize:'10px',padding:'9px',letterSpacing:'0.08em',opacity:0.6,cursor:'default'}}>BUY NO</button>
                </div>
                <p style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'9px',color:'#28303E',textAlign:'center',marginTop:'10px',letterSpacing:'0.06em'}}>
                  RESOLVES {endLabel.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ label, required, children }: { label:string; required?:boolean; children:React.ReactNode }) {
  return (
    <div style={{borderBottom:'1px solid #1E2530'}}>
      <div style={{padding:'8px 14px',background:'#0D0F14',borderBottom:'1px solid #1E2530'}}>
        <p style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'9px',letterSpacing:'0.12em',color:'#3A4255',textTransform:'uppercase'}}>
          {label} {required && <span style={{color:'#FF1744'}}>*</span>}
        </p>
      </div>
      {children}
    </div>
  );
}