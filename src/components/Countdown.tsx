'use client';
import { useCountdown } from '@/hooks/useCountdown';
import { Clock } from 'lucide-react';

export default function Countdown({ endTime, compact = false }: { endTime: number; compact?: boolean }) {
  const t = useCountdown(endTime);
  const urgent = !t.expired && t.total < 5 * 60_000;

  if (t.expired) return (
    <span className="font-mono text-xs text-[#4A5568]">Expired</span>
  );

  const label = t.h > 0
    ? `${t.h}h ${String(t.m).padStart(2,'0')}m`
    : `${String(t.m).padStart(2,'0')}:${String(t.s).padStart(2,'0')}`;

  if (compact) return (
    <span className={`font-mono text-sm font-bold ${urgent ? 'urgent' : 'text-yellow'}`}>{label}</span>
  );

  return (
    <span className={`flex items-center gap-1.5 font-mono text-sm ${urgent ? 'urgent' : 'text-yellow'}`}>
      <Clock size={12} className="opacity-60"/>
      {t.h > 0 ? `${t.h}h ${String(t.m).padStart(2,'0')}m ${String(t.s).padStart(2,'0')}s` : label}
    </span>
  );
}
