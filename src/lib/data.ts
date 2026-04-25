import { Market } from '@/types';

const n  = Date.now();
const m  = 60_000;
const h  = 3_600_000;

export const MARKETS: Market[] = [
  { id:'m1', question:'Will SOL exceed $185 in the next 30 minutes?',          creator:'7xKp…3fRq', createdAt:n-12*m, endTime:n+18*m,   resolved:false, outcome:'UNRESOLVED', yesPrice:0.67, noPrice:0.33, volume:42_800,   liquidity:18_500, category:'crypto',  traders:346  },
  { id:'m2', question:'Will BTC reach $70k before midnight UTC?',               creator:'4mNz…8kWv', createdAt:n-2*h,  endTime:n+4.5*h, resolved:false, outcome:'UNRESOLVED', yesPrice:0.41, noPrice:0.59, volume:187_200,  liquidity:75_000, category:'crypto',  traders:2094 },
  { id:'m3', question:'Will ETH gas drop below 10 gwei in the next hour?',      creator:'9qTz…2mBn', createdAt:n-20*m, endTime:n+40*m,  resolved:false, outcome:'UNRESOLVED', yesPrice:0.29, noPrice:0.71, volume:28_400,   liquidity:12_000, category:'crypto',  traders:512  },
  { id:'m4', question:'Will a new major AI model be announced today?',           creator:'3nRt…7vHq', createdAt:n-3*h,  endTime:n+21*h,  resolved:false, outcome:'UNRESOLVED', yesPrice:0.78, noPrice:0.22, volume:58_000,   liquidity:22_000, category:'tech',    traders:584  },
  { id:'m5', question:'Will the Fed signal a rate cut at the next meeting?',     creator:'8cKm…4xQt', createdAt:n-8*h,  endTime:n+16*h,  resolved:false, outcome:'UNRESOLVED', yesPrice:0.85, noPrice:0.15, volume:220_000,  liquidity:95_000, category:'other',   traders:1453 },
  { id:'m6', question:'Will Pump.fun launch a new feature before end of week?',  creator:'5eWx…9nZr', createdAt:n-30*m, endTime:n+5*m+30_000, resolved:false, outcome:'UNRESOLVED', yesPrice:0.35, noPrice:0.65, volume:8_600, liquidity:3_200, category:'crypto',  traders:128  },
  { id:'m7', question:'Will JUP token price increase 5% in next 4 hours?',       creator:'2hLk…5pXs', createdAt:n-1*h,  endTime:n+3*h,   resolved:false, outcome:'UNRESOLVED', yesPrice:0.52, noPrice:0.48, volume:34_000,   liquidity:14_000, category:'crypto',  traders:467  },
  { id:'m8', question:'Will any major protocol get hacked this week?',           creator:'6jBw…1cFy', createdAt:n-4*h,  endTime:n+20*h,  resolved:false, outcome:'UNRESOLVED', yesPrice:0.08, noPrice:0.92, volume:76_000,   liquidity:32_000, category:'tech',    traders:934  },
];

export const DURATIONS = [
  { label:'5 min',  ms: 5*m         },
  { label:'15 min', ms:15*m         },
  { label:'30 min', ms:30*m         },
  { label:'1 hr',   ms:     h       },
  { label:'4 hr',   ms: 4 * h       },
  { label:'24 hr',  ms:24 * h       },
];

export const CATEGORIES = ['crypto','sports','politics','tech','other'] as const;

export function timeLeft(endTime: number) {
  const diff = endTime - Date.now();
  if (diff <= 0) return { expired:true, h:0, m:0, s:0, total:0 };
  return {
    expired: false,
    total:   diff,
    h: Math.floor(diff / h),
    m: Math.floor((diff % h) / m),
    s: Math.floor((diff % m) / 1_000),
  };
}

export function fmtVol(v: number) {
  if (v >= 1_000_000) return `$${(v/1_000_000).toFixed(1)}M`;
  if (v >= 1_000)     return `$${(v/1_000).toFixed(1)}K`;
  return `$${v}`;
}
