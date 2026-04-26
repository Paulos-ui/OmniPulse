'use client';

const ITEMS = [
  { l:'SOL/USD',   v:'$168.42',   c:'+2.41%',  up:true  },
  { l:'BTC/USD',   v:'$67,230',   c:'-0.82%',  up:false },
  { l:'ETH/USD',   v:'$3,412',    c:'+1.24%',  up:true  },
  { l:'JUP/USD',   v:'$0.842',    c:'+4.10%',  up:true  },
  { l:'WIF/USD',   v:'$2.181',    c:'-2.31%',  up:false },
  { l:'BONK',      v:'$0.0000242',c:'+7.84%',  up:true  },
  { l:'PYTH/USD',  v:'$0.441',    c:'+1.62%',  up:true  },
  { l:'RNDR/USD',  v:'$8.24',     c:'-1.17%',  up:false },
  { l:'MARKETS',   v:'847',       c:'ACTIVE',  up:true  },
  { l:'VOL 24H',   v:'$2.41M',    c:'+18.2%',  up:true  },
  { l:'TRADERS',   v:'12,441',    c:'ONLINE',  up:true  },
  { l:'AVG RES',   v:'47 MIN',    c:'FAST',    up:true  },
];

const doubled = [...ITEMS, ...ITEMS];

export default function Ticker() {
  return (
    <div className="ticker-track bg-ink-2 border-b border-wire-1 py-0" style={{background:'#0D0F14',borderBottom:'1px solid #1E2530'}}>
      <div style={{display:'flex',alignItems:'center',height:'32px',background:'#0D0F14'}}>
        {/* Static label */}
        <div style={{
          flexShrink:0, padding:'0 14px',
          borderRight:'1px solid #1E2530', height:'100%',
          display:'flex', alignItems:'center', gap:'7px',
          background:'#111318'
        }}>
          <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#FF6600',boxShadow:'0 0 8px #FF6600',flexShrink:0}}/>
          <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',letterSpacing:'0.12em',color:'#FF6600',textTransform:'uppercase'}}>
            OMNIPULSE
          </span>
        </div>

        {/* Scrolling content */}
        <div style={{overflow:'hidden',flex:1}}>
          <div className="ticker-inner">
            {doubled.map((x, i) => (
              <span key={i} style={{display:'inline-flex',alignItems:'center',gap:'6px',padding:'0 18px',borderRight:'1px solid #1E2530',height:'32px'}}>
                <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',color:'#6B7585',letterSpacing:'0.06em'}}>{x.l}</span>
                <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'11px',fontWeight:600,color:'#F0F2F5'}}>{x.v}</span>
                <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',color: x.up ? '#00C853' : '#FF1744',fontWeight:500}}>{x.c}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
