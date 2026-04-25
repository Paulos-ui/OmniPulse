'use client';
const ITEMS = [
  { l:'SOL/USD',        v:'$168.42',    c:'+2.4%',  up:true  },
  { l:'BTC/USD',        v:'$67,230',    c:'-0.8%',  up:false },
  { l:'ETH/USD',        v:'$3,412',     c:'+1.2%',  up:true  },
  { l:'Markets Live',   v:'847',        c:'active', up:true  },
  { l:'24h Volume',     v:'$2.4M',      c:'+18%',   up:true  },
  { l:'JUP/USD',        v:'$0.842',     c:'+4.1%',  up:true  },
  { l:'WIF/USD',        v:'$2.18',      c:'-2.3%',  up:false },
  { l:'BONK',           v:'$0.000024',  c:'+7.8%',  up:true  },
  { l:'Traders Online', v:'12,441',     c:'live',   up:true  },
];
const doubled = [...ITEMS, ...ITEMS];

export default function Ticker() {
  return (
    <div className="ticker-wrap bg-[#0D1117] border-b border-[#1A2535] py-1.5">
      <div className="ticker-inner flex">
        {doubled.map((x, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-5 text-xs">
            <span className="font-mono text-[#4A5568]">{x.l}</span>
            <span className="font-mono font-bold text-white">{x.v}</span>
            <span className={`font-mono text-xs ${x.up ? 'text-green' : 'text-red'}`}>{x.c}</span>
            <span className="text-[#243044]">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
