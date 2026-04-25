'use client';
import Link from 'next/link';
import { Market } from '@/types';
import { fmtVol } from '@/lib/data';
import Countdown from './Countdown';
import { BarChart3, Users } from 'lucide-react';

const CAT_COLOR: Record<string,string> = {
  crypto:   'text-cyan   border-cyan/25   bg-cyan/8',
  tech:     'text-purple border-purple/25 bg-purple/8',
  sports:   'text-green  border-green/25  bg-green/8',
  politics: 'text-yellow border-yellow/25 bg-yellow/8',
  other:    'text-[#6B7A94] border-[#1A2535] bg-transparent',
};

export default function MarketCard({ market, delay = 0 }: { market: Market; delay?: number }) {
  const yes = Math.round(market.yesPrice * 100);
  const no  = 100 - yes;

  return (
    <Link href={`/market/${market.id}`}>
      <div
        className="card h-full flex flex-col gap-4 p-5 cursor-pointer opacity-0"
        style={{ animation: `fadeUp .5s ease-out ${delay}ms forwards` }}
      >
        {/* Row 1: category + timer */}
        <div className="flex items-center justify-between">
          <span className={`tag ${CAT_COLOR[market.category]}`}>{market.category}</span>
          <Countdown endTime={market.endTime} compact />
        </div>

        {/* Question */}
        <p className="font-display font-semibold text-sm text-white leading-snug flex-1 line-clamp-3">
          {market.question}
        </p>

        {/* Probability bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-green font-bold">YES {yes}%</span>
            <span className="text-red   font-bold">NO  {no}%</span>
          </div>
          <div className="pbar">
            <div className="pbar-fill" style={{ width: `${yes}%` }}/>
          </div>
        </div>

        {/* Footer stats */}
        <div className="flex items-center justify-between border-t border-[#1A2535] pt-3">
          <span className="flex items-center gap-1 text-xs font-mono text-[#4A5568]">
            <BarChart3 size={11}/>{fmtVol(market.volume)}
          </span>
          <span className="flex items-center gap-1 text-xs font-mono text-[#4A5568]">
            <Users size={11}/>{market.traders.toLocaleString()}
          </span>
          <span className="text-xs font-mono text-[#4A5568]">
            {fmtVol(market.liquidity)} liq
          </span>
        </div>
      </div>
    </Link>
  );
}
