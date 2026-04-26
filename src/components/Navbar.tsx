'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const LINKS = [
  ['MARKETS',    '/markets' ],
  ['CREATE',     '/create'  ],
  ['HOW IT WORKS','/#how'   ],
  ['ROADMAP',    '/#road'   ],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{
      position:'sticky', top:0, zIndex:50,
      background:'rgba(4,5,8,0.94)',
      backdropFilter:'blur(20px)',
      borderBottom:'1px solid rgba(255,102,0,0.12)',
    }}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:'58px'}}>

        {/* Logo — use the uploaded image */}
        <Link href="/" style={{display:'flex',alignItems:'center',textDecoration:'none',flexShrink:0}}>
          <Image
            src="/logo.png"
            alt="OmniPulse"
            width={180}
            height={45}
            style={{objectFit:'contain',height:'36px',width:'auto'}}
            priority
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex" style={{alignItems:'center',gap:'28px'}}>
          {LINKS.map(([label,href])=>(
            <Link key={href} href={href}
              style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',
                      letterSpacing:'0.12em',color:'#4A5568',textDecoration:'none',
                      textTransform:'uppercase',transition:'color 0.15s'}}
              onMouseEnter={e=>(e.currentTarget.style.color='#FF6600')}
              onMouseLeave={e=>(e.currentTarget.style.color='#4A5568')}>
              {label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex" style={{alignItems:'center',gap:'10px'}}>
          {/* Network badge */}
          <span style={{
            display:'flex',alignItems:'center',gap:'6px',
            padding:'4px 10px',
            border:'1px solid rgba(0,82,255,0.2)',
            borderRadius:'2px',
            background:'rgba(0,82,255,0.06)',
            fontFamily:'IBM Plex Mono,monospace',
            fontSize:'9px',letterSpacing:'0.1em',color:'#3377FF',
          }}>
            <span style={{width:'5px',height:'5px',borderRadius:'50%',background:'#00C853',boxShadow:'0 0 7px #00C853',flexShrink:0}}/>
            DEVNET
          </span>
          {/* CTA */}
          <button style={{
            display:'flex',alignItems:'center',gap:'7px',
            background:'linear-gradient(120deg,#0052FF,#003DBF)',
            color:'#fff',
            border:'1px solid rgba(0,82,255,0.4)',
            borderRadius:'3px',padding:'8px 18px',cursor:'pointer',
            fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',
            letterSpacing:'0.1em',transition:'all 0.18s',
          }}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.boxShadow='0 0 20px rgba(0,82,255,0.4)';}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.boxShadow='';}}
          >
            CONNECT WALLET
          </button>
        </div>

        {/* Mobile hamburger */}
        <button onClick={()=>setOpen(!open)} className="md:hidden"
          style={{background:'none',border:'none',color:'#6B7585',cursor:'pointer',padding:'4px'}}>
          {open ? <X size={20}/> : <Menu size={20}/>}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          borderTop:'1px solid rgba(255,102,0,0.12)',
          padding:'16px 24px',
          background:'rgba(4,5,8,0.98)',
          display:'flex',flexDirection:'column',gap:'16px',
        }}>
          {LINKS.map(([l,h])=>(
            <Link key={h} href={h} onClick={()=>setOpen(false)}
              style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'11px',
                      letterSpacing:'0.12em',color:'#B8C0CC',textDecoration:'none',
                      textTransform:'uppercase'}}>
              {l}
            </Link>
          ))}
          <button style={{
            marginTop:'4px',padding:'11px',border:'1px solid rgba(0,82,255,0.35)',
            borderRadius:'3px',background:'rgba(0,82,255,0.12)',color:'#3377FF',
            fontFamily:'IBM Plex Mono,monospace',fontSize:'11px',letterSpacing:'0.1em',cursor:'pointer',
          }}>
            CONNECT WALLET
          </button>
        </div>
      )}
    </nav>
  );
}
