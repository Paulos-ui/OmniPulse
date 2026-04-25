'use client';
import { useState, useEffect } from 'react';
import { timeLeft } from '@/lib/data';

export function useCountdown(endTime: number) {
  const [t, setT] = useState(() => timeLeft(endTime));
  useEffect(() => {
    if (t.expired) return;
    const id = setInterval(() => setT(timeLeft(endTime)), 1000);
    return () => clearInterval(id);
  }, [endTime, t.expired]);
  return t;
}
