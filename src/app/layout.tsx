import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Ticker from '@/components/Ticker';

export const metadata: Metadata = {
  title: 'OmniPulse — Micro Prediction Markets on Solana',
  description: 'Trade the probability of anything in real-time. Micro prediction markets (5 min → 24 hr) powered by Omnipair AMM.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <Ticker />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
