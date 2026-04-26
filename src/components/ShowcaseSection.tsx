'use client';
import Countdown from './Countdown';

const ITEMS = [
  { q:'Will SOL exceed $200 in the next 30 minutes?',    yes:67, dur:'30M', endTime:Date.now()+18*60_000,   vol:'$42.8K', hot:true  },
  { q:'Will BTC hit $70,000 before midnight UTC?',       yes:41, dur:'8H',  endTime:Date.now()+8*3600_000,  vol:'$187K',  hot:true  },
  { q:'Next Fed announcement hawkish?',                   yes:15, dur:'24H', endTime:Date.now()+20*3600_000, vol:'$95K',   hot:false },
  { q:'ETH gas below 10 gwei in 1 hour?',                yes:29, dur:'1H',  endTime:Date.now()+40*60_000,   vol:'$28K',   hot:false },
  { q:'New major AI model announced today?',             yes:78, dur:'24H', endTime:Date.now()+21*3600_000, vol:'$58K',   hot:true  },
  { q:'Solana daily TXs hit new all-time-high?',         yes:55, dur:'4H',  endTime:Date.now()+4*3600_000,  vol:'$21K',   hot:false },
];

export default function ShowcaseSection() {
  return (
    <section style={{background:'#0D0F14',borderTop:'1px solid #1E2530',borderBottom:'1px solid #1E2530',padding:'64px 0'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>

        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:'40px',flexWrap:'wrap',gap:'12px'}}>
          <div>
            <p className="section-label" style={{marginBottom:'8px'}}>TRENDING MARKETS</p>
            <h2 style={{fontFamily:'Barlow,sans-serif',fontWeight:800,fontSize:'clamp(24px,4vw,36px)',color:'#F0F2F5',letterSpacing:'-0.01em',lineHeight:1.1}}>
              Micro-Markets for Every Moment
            </h2>
          </div>
          <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',color:'#3A4255',letterSpacing:'0.1em'}}>
            RESOLUTION: 5 MIN → 24 HR
          </span>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'1px',background:'#1E2530',border:'1px solid #1E2530',borderRadius:'4px',overflow:'hidden'}}>
          {ITEMS.map((item,i) => (
            <ShowRow key={i} {...item} delay={i*60}/>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShowRow({ q,yes,dur,endTime,vol,hot,delay }: any) {
  const no = 100-yes;
  return (
    <div className="fade-up" style={{background:'#111318',padding:'18px',animationDelay:`${delay}ms`,position:'relative'}}>
      {hot && (
        <div style={{position:'absolute',top:'12px',right:'12px',fontFamily:'IBM Plex Mono,monospace',fontSize:'9px',color:'#FF6600',letterSpacing:'0.1em',border:'1px solid rgba(255,102,0,0.3)',padding:'1px 5px',borderRadius:'2px'}}>
          HOT
        </div>
      )}
      <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'10px'}}>
        <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'9px',letterSpacing:'0.1em',color:'#3A4255',border:'1px solid #1E2530',padding:'1px 5px',borderRadius:'2px'}}>
          ⚡ {dur}
        </span>
        <Countdown endTime={endTime} compact/>
      </div>
      <p style={{fontFamily:'Barlow,sans-serif',fontWeight:600,fontSize:'13px',color:'#B8C0CC',lineHeight:1.4,marginBottom:'14px',minHeight:'36px'}}>
        {q}
      </p>
      <div style={{display:'flex',alignItems:'flex-end',gap:'12px',marginBottom:'10px'}}>
        <div>
          <span style={{fontFamily:'IBM Plex Mono,monospace',fontWeight:600,fontSize:'26px',color: yes>=65?'#00C853':yes<=35?'#FF1744':'#F0F2F5'}}>
            {yes}%
          </span>
          <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',color:'#3A4255',marginLeft:'4px'}}>YES</span>
        </div>
        <div style={{flex:1,paddingBottom:'6px'}}>
          <div className="pbar" style={{height:'4px'}}><div className="pbar-fill" style={{width:`${yes}%`,height:'4px'}}/></div>
        </div>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',paddingTop:'10px',borderTop:'1px solid #1E2530'}}>
        <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',color:'#3A4255'}}>{vol}</span>
        <button style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',color:'#FF6600',background:'none',border:'none',cursor:'pointer',letterSpacing:'0.06em'}}>
          TRADE →
        </button>
      </div>
    </div>
  );
}
