'use client';
import { useCountdown } from '@/hooks/useCountdown';

export default function Countdown({ endTime, compact=false }: { endTime:number; compact?:boolean }) {
  const t = useCountdown(endTime);
  const urgent = !t.expired && t.total < 5*60_000;

  if (t.expired) return (
    <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'11px',color:'#3A4255'}}>EXPIRED</span>
  );

  const label = t.h > 0
    ? `${t.h}H ${String(t.m).padStart(2,'0')}M`
    : `${String(t.m).padStart(2,'0')}:${String(t.s).padStart(2,'0')}`;

  return (
    <span className={urgent ? 'urgent' : ''} style={{
      fontFamily:'IBM Plex Mono,monospace',
      fontSize: compact ? '11px' : '12px',
      fontWeight: 600,
      color: urgent ? '#FF1744' : '#FF6600',
      letterSpacing:'0.05em',
    }}>
      {label}
    </span>
  );
}
