'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Zap, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 border-b border-[#1A2535] bg-[#080B0F]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-blue-500 flex items-center justify-center">
            <Zap size={15} className="text-[#080B0F]" fill="currentColor" />
          </div>
          <span className="font-display font-extrabold text-xl text-white tracking-tight">
            Omni<span className="text-cyan">Pulse</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {[['Markets','/markets'],['Create','/create'],['How It Works','/#how']].map(([label,href])=>(
            <Link key={href} href={href}
              className="font-display font-semibold text-sm text-[#6B7A94] hover:text-cyan transition-colors">
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111820] border border-[#1A2535] text-xs font-mono text-[#4A5568]">
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse"/>Devnet
          </span>
          <button className="btn btn-primary text-sm py-2 px-5">Connect Wallet</button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-[#6B7A94]" onClick={()=>setOpen(!open)}>
          {open ? <X size={20}/> : <Menu size={20}/>}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#1A2535] px-4 py-4 space-y-3 bg-[#0D1117]">
          <Link href="/markets"  className="block font-display text-[#AAB4C8] hover:text-cyan py-1">Markets</Link>
          <Link href="/create"   className="block font-display text-[#AAB4C8] hover:text-cyan py-1">Create Market</Link>
          <button className="btn btn-primary w-full justify-center mt-2">Connect Wallet</button>
        </div>
      )}
    </nav>
  );
}
