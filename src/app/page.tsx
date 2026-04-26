'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MARKETS } from '@/lib/data';
import MarketCard from '@/components/MarketCard';
import StatsBar from '@/components/StatsBar';
import ShowcaseSection from '@/components/ShowcaseSection';

export default function HomePage() {
  return (
    <div style={{position:'relative'}}>

      {/* ═══ HERO ════════════════════════════════════════════ */}
      <section className="grid-overlay" style={{
        minHeight:'92vh',display:'flex',flexDirection:'column',
        alignItems:'center',justifyContent:'center',
        overflow:'hidden',padding:'80px 24px',position:'relative',
      }}>
        {/* Dual ambient glows — blue left, orange right (matching logo) */}
        <div style={{position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden'}}>
          <div style={{position:'absolute',top:'10%',left:'-5%',width:'60vw',height:'60vw',borderRadius:'50%',
                       background:'radial-gradient(circle,rgba(0,82,255,0.07) 0%,transparent 65%)'}}/>
          <div style={{position:'absolute',bottom:'5%',right:'-5%',width:'55vw',height:'55vw',borderRadius:'50%',
                       background:'radial-gradient(circle,rgba(255,102,0,0.07) 0%,transparent 65%)'}}/>
          {/* Subtle scanline */}
          <div style={{position:'absolute',inset:0,
                       backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.008) 3px,rgba(255,255,255,0.008) 4px)',
                       pointerEvents:'none'}}/>
        </div>

        {/* Floating terminal windows */}
        <FloatTerminal cls="hidden xl:block" delay="0s" rotate="-3deg"
          style={{position:'absolute',left:'2%',top:'22%'}}
          ticker="SOL · 30 MIN" q="Will SOL exceed $200 today?" yes={64}/>
        <FloatTerminal cls="hidden xl:block" delay="2.8s" rotate="3deg"
          style={{position:'absolute',right:'2%',top:'18%'}}
          ticker="BTC · 8 HR" q="BTC breaks $70k before Friday?" yes={41}/>
        <FloatTerminal cls="hidden xl:block" delay="5s" rotate="-2deg"
          style={{position:'absolute',right:'8%',bottom:'18%'}}
          ticker="AI · 24 HR" q="New AI model drops this week?" yes={78}/>

        {/* Main hero */}
        <div style={{textAlign:'center',maxWidth:'960px',width:'100%',position:'relative',zIndex:1}}>

          {/* Logo image — the hero centrepiece */}
          <div style={{marginBottom:'32px',display:'flex',justifyContent:'center'}}>
            <Image
              src="/logo.png"
              alt="OmniPulse — Trade to Reality"
              width={640}
              height={160}
              style={{objectFit:'contain',maxWidth:'min(640px,90vw)',height:'auto'}}
              priority
            />
          </div>

          {/* Status chip */}
          <div style={{
            display:'inline-flex',alignItems:'center',gap:'8px',marginBottom:'28px',
            background:'rgba(0,82,255,0.08)',
            border:'1px solid rgba(0,82,255,0.22)',
            borderRadius:'2px',padding:'6px 16px',
          }}>
            <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#00C853',boxShadow:'0 0 8px #00C853'}}/>
            <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',
                          letterSpacing:'0.16em',color:'#3377FF',textTransform:'uppercase'}}>
              LIVE ON SOLANA DEVNET · PHASE 1 MVP
            </span>
          </div>

          {/* Sub-headline */}
          <h1 style={{
            fontFamily:'Barlow,sans-serif',fontWeight:900,
            fontSize:'clamp(28px,5.5vw,64px)',
            letterSpacing:'-0.02em',lineHeight:0.95,
            textTransform:'uppercase',marginBottom:'20px',
          }}>
            <span style={{display:'block',color:'#F0F2F5'}}>TRADE THE</span>
            <span className="hero-headline" style={{display:'block'}}>PROBABILITY</span>
            <span style={{display:'block',color:'#F0F2F5'}}>OF ANYTHING</span>
          </h1>

          {/* Body copy */}
          <p style={{
            fontFamily:'IBM Plex Sans,sans-serif',fontWeight:300,
            fontSize:'clamp(13px,1.8vw,16px)',color:'#6B7585',
            maxWidth:'560px',margin:'0 auto 36px',lineHeight:1.75,
          }}>
            Micro prediction markets resolving in <span style={{color:'#FF6600'}}>5 minutes</span> to{' '}
            <span style={{color:'#3377FF'}}>24 hours</span>. Create, trade YES or NO,
            and earn on correct outcomes — powered by{' '}
            <span style={{color:'#FF6600',fontWeight:500}}>Omnipair AMM</span> on Solana.
          </p>

          {/* CTA buttons — blue/orange split matching logo */}
          <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'center',gap:'10px',marginBottom:'44px'}}>
            <Link href="/markets" style={{
              display:'inline-flex',alignItems:'center',gap:'8px',
              padding:'12px 32px',
              background:'linear-gradient(120deg,#0052FF,#003DBF)',
              border:'1px solid rgba(0,82,255,0.5)',
              color:'#fff',textDecoration:'none',
              fontFamily:'IBM Plex Mono,monospace',fontSize:'11px',
              letterSpacing:'0.12em',textTransform:'uppercase',
              borderRadius:'3px',transition:'all 0.2s',
            }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.boxShadow='0 0 28px rgba(0,82,255,0.4)';(e.currentTarget as HTMLElement).style.transform='translateY(-1px)';}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.boxShadow='';(e.currentTarget as HTMLElement).style.transform='';}}
            >
              EXPLORE MARKETS →
            </Link>
            <Link href="/create" style={{
              display:'inline-flex',alignItems:'center',gap:'8px',
              padding:'11px 28px',
              background:'rgba(255,102,0,0.1)',
              border:'1px solid rgba(255,102,0,0.35)',
              color:'#FF6600',textDecoration:'none',
              fontFamily:'IBM Plex Mono,monospace',fontSize:'11px',
              letterSpacing:'0.12em',textTransform:'uppercase',
              borderRadius:'3px',transition:'all 0.2s',
            }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.boxShadow='0 0 24px rgba(255,102,0,0.3)';(e.currentTarget as HTMLElement).style.background='rgba(255,102,0,0.18)';}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.boxShadow='';(e.currentTarget as HTMLElement).style.background='rgba(255,102,0,0.1)';}}
            >
              CREATE MARKET
            </Link>
          </div>

          {/* Tagline strip — dual tone */}
          <div className="dual-line" style={{maxWidth:'500px',margin:'0 auto 0'}}>
            <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',
                          letterSpacing:'0.18em',color:'#3A4255',textTransform:'uppercase',
                          flexShrink:0}}>
              TRADE · TO · REALITY
            </span>
          </div>

          {/* Infrastructure trust pills */}
          <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'0',
                       border:'1px solid #1E2530',borderRadius:'3px',overflow:'hidden',marginTop:'28px'}}>
            {[
              ['NON-CUSTODIAL', '#0052FF'],
              ['ON-CHAIN SETTLEMENT', '#FF6600'],
              ['5 MIN RESOLUTION', '#0052FF'],
              ['OMNIPAIR CPMM', '#FF6600'],
              ['SOLANA L1', '#0052FF'],
            ].map(([label,color])=>(
              <div key={label as string} style={{padding:'7px 16px',borderRight:'1px solid #1E2530',
                           display:'flex',alignItems:'center',gap:'5px',flexShrink:0}}>
                <span style={{width:'3px',height:'3px',borderRadius:'50%',background:color as string,flexShrink:0}}/>
                <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'9px',
                              letterSpacing:'0.1em',color:'#3A4255',textTransform:'uppercase'}}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{position:'absolute',bottom:'24px',left:'50%',transform:'translateX(-50%)',
                     display:'flex',flexDirection:'column',alignItems:'center',gap:'6px',opacity:0.3}}>
          <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'8px',
                        letterSpacing:'0.2em',color:'#3A4255'}}>SCROLL</span>
          <div style={{width:'1px',height:'32px',
                       background:'linear-gradient(to bottom,#0052FF,#FF6600,transparent)'}}/>
        </div>
      </section>

      {/* ═══ STATS ══════════════════════════════════════════ */}
      <StatsBar />

      {/* ═══ LIVE MARKETS ═══════════════════════════════════ */}
      <section style={{maxWidth:'1280px',margin:'0 auto',padding:'64px 24px'}}>
        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',
                     marginBottom:'28px',flexWrap:'wrap',gap:'12px'}}>
          <div>
            <p style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',
                       letterSpacing:'0.14em',color:'#FF6600',textTransform:'uppercase',
                       marginBottom:'6px',display:'flex',alignItems:'center',gap:'7px'}}>
              <span style={{width:'6px',height:'6px',borderRadius:'50%',
                            background:'#00C853',boxShadow:'0 0 8px #00C853'}}/>
              {'// LIVE MARKETS'}
            </p>
            <h2 style={{fontFamily:'Barlow,sans-serif',fontWeight:800,
                        fontSize:'clamp(22px,3.5vw,34px)',color:'#F0F2F5',
                        letterSpacing:'-0.01em',textTransform:'uppercase'}}>
              Active Right Now
            </h2>
          </div>
          <Link href="/markets" style={{
            fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',
            color:'#3377FF',textDecoration:'none',letterSpacing:'0.1em',
            border:'1px solid rgba(0,82,255,0.25)',padding:'6px 14px',borderRadius:'2px',
            background:'rgba(0,82,255,0.06)',transition:'all 0.15s',
          }}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(0,82,255,0.5)';}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(0,82,255,0.25)';}}
          >
            ALL MARKETS →
          </Link>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',
                     gap:'1px',background:'#1E2530',border:'1px solid #1E2530',
                     borderRadius:'4px',overflow:'hidden'}}>
          {MARKETS.slice(0,6).map((m,i)=>(
            <MarketCard key={m.id} market={m} delay={i*55}/>
          ))}
        </div>
      </section>

      {/* ═══ SHOWCASE ════════════════════════════════════════ */}
      <ShowcaseSection />

      {/* ═══ HOW IT WORKS ════════════════════════════════════ */}
      <section id="how" style={{maxWidth:'1280px',margin:'0 auto',padding:'80px 24px'}}>
        <div style={{textAlign:'center',marginBottom:'52px'}}>
          <p style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',letterSpacing:'0.16em',
                     color:'#FF6600',textTransform:'uppercase',marginBottom:'10px'}}>
            {'// THE PROTOCOL'}
          </p>
          <h2 style={{fontFamily:'Barlow,sans-serif',fontWeight:800,
                      fontSize:'clamp(24px,4vw,40px)',color:'#F0F2F5',
                      letterSpacing:'-0.015em',textTransform:'uppercase',marginBottom:'12px'}}>
            How OmniPulse Works
          </h2>
          <p style={{fontFamily:'IBM Plex Sans,sans-serif',fontSize:'14px',color:'#6B7585',
                     maxWidth:'480px',margin:'0 auto',lineHeight:1.7}}>
            Three on-chain instructions. No intermediary. Pure probability markets.
          </p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',
                     gap:'1px',background:'#1E2530',border:'1px solid #1E2530',
                     borderRadius:'4px',overflow:'hidden'}}>
          {[
            { n:'01', title:'CREATE A MARKET',
              body:'Ask any YES/NO question with a clear resolution condition. Set duration from 5 min to 24 hr. Deploys on Solana with a seeded Omnipair CPMM liquidity pool at 50/50.',
              left:'#0052FF', right:'#FF6600' },
            { n:'02', title:'TRADE YES / NO',
              body:'Buy YES or NO tokens at current market price. Every trade rebalances the CPMM pool, shifting the probability. Price reflects collective real-time belief on-chain.',
              left:'#FF6600', right:'#0052FF' },
            { n:'03', title:'EARN ON CORRECT CALLS',
              body:'After end_time, oracle resolves the outcome. Winning token holders burn tokens and claim proportional USDC from the vault. Trustless, instant, fully on-chain.',
              left:'#0052FF', right:'#FF6600' },
          ].map(({n,title,body,left,right})=>(
            <div key={n} style={{background:'#111318',padding:'32px 28px',position:'relative'}}>
              {/* Dual corner marks */}
              <span style={{position:'absolute',top:0,left:0,width:'10px',height:'10px',
                            borderTop:`1.5px solid ${left}`,borderLeft:`1.5px solid ${left}`,opacity:0.6}}/>
              <span style={{position:'absolute',bottom:0,right:0,width:'10px',height:'10px',
                            borderBottom:`1.5px solid ${right}`,borderRight:`1.5px solid ${right}`,opacity:0.6}}/>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'20px'}}>
                <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',
                               width:'34px',height:'34px',border:`1px solid ${left}40`,borderRadius:'3px'}}>
                  <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'11px',
                                color:left,letterSpacing:'0.05em',fontWeight:600}}>{n}</span>
                </span>
                <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'48px',
                              fontWeight:700,color:'#1C2130',lineHeight:1}}>{n}</span>
              </div>
              <h3 style={{fontFamily:'Barlow,sans-serif',fontWeight:700,fontSize:'16px',
                          color:'#F0F2F5',marginBottom:'10px',letterSpacing:'0.02em'}}>{title}</h3>
              <p style={{fontSize:'13px',color:'#6B7585',lineHeight:1.7}}>{body}</p>
            </div>
          ))}
        </div>

        {/* Protocol spec row */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',
                     gap:'1px',background:'#1E2530',marginTop:'1px',
                     borderRadius:'0 0 4px 4px',overflow:'hidden'}}>
          {[
            ['MIN DURATION',  '5 MINUTES', '#FF6600'],
            ['MAX DURATION',  '24 HOURS',  '#0052FF'],
            ['SETTLEMENT',    'ON-CHAIN',  '#FF6600'],
            ['AMM MODEL',     'OMNIPAIR',  '#0052FF'],
            ['ORACLE',        'PYTH P.2',  '#FF6600'],
            ['NETWORK',       'SOLANA',    '#0052FF'],
          ].map(([k,v,c])=>(
            <div key={k as string} style={{background:'#0D0F14',padding:'14px 18px'}}>
              <p style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'9px',letterSpacing:'0.12em',color:'#3A4255',marginBottom:'4px',textTransform:'uppercase'}}>{k}</p>
              <p style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'12px',fontWeight:600,color:c as string,letterSpacing:'0.04em'}}>{v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ ROADMAP ═════════════════════════════════════════ */}
      <section id="road" style={{background:'#0D0F14',borderTop:'1px solid #1E2530',borderBottom:'1px solid #1E2530',padding:'56px 0'}}>
        <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
          <p style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',letterSpacing:'0.16em',
                     color:'#3A4255',textTransform:'uppercase',marginBottom:'24px'}}>
            {'// DEPLOYMENT ROADMAP'}
          </p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',
                       gap:'1px',background:'#1E2530',border:'1px solid #1E2530',
                       borderRadius:'4px',overflow:'hidden'}}>
            {[
              { p:'PHASE 1',label:'Interface MVP', items:['Landing page','Market creation UI','Mock trading','Countdown timers'],  done:true  },
              { p:'PHASE 2',label:'Backend + API',  items:['Node.js REST API','Market state engine','Auto-resolver cron','WS feeds'], done:false },
              { p:'PHASE 3',label:'Anchor Program', items:['CPMM on-chain AMM','SPL YES/NO tokens','On-chain resolution','Devnet'],  done:false },
              { p:'PHASE 4',label:'Mainnet Launch', items:['Pyth oracle','Omnipair liquidity','Token economy','Mainnet'],             done:false },
            ].map(({p,label,items,done})=>(
              <div key={p} style={{background:'#111318',padding:'22px 20px',
                                   borderLeft:`2px solid ${done?'#FF6600':'#1E2530'}`}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'6px'}}>
                  <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'9px',letterSpacing:'0.12em',
                                color:done?'#FF6600':'#3A4255',textTransform:'uppercase'}}>{p}</span>
                  {done && <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'8px',
                                         background:'rgba(255,102,0,0.12)',color:'#FF6600',
                                         padding:'1px 5px',borderRadius:'2px',
                                         border:'1px solid rgba(255,102,0,0.3)',letterSpacing:'0.06em'}}>
                    CURRENT
                  </span>}
                </div>
                <p style={{fontFamily:'Barlow,sans-serif',fontWeight:700,fontSize:'14px',
                           color:done?'#F0F2F5':'#6B7585',marginBottom:'12px'}}>{label}</p>
                {items.map(item=>(
                  <span key={item} style={{display:'flex',alignItems:'center',gap:'6px',marginBottom:'5px',
                                           fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',
                                           color:done?'#B8C0CC':'#3A4255'}}>
                    <span style={{width:'3px',height:'3px',borderRadius:'50%',flexShrink:0,
                                  background:done?'#FF6600':'#3A4255'}}/>
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ══════════════════════════════════════ */}
      <section style={{maxWidth:'1280px',margin:'0 auto',padding:'80px 24px'}}>
        <div style={{border:'1px solid #1E2530',borderRadius:'4px',
                     padding:'56px 40px',textAlign:'center',position:'relative',overflow:'hidden'}}>
          {/* Dual tone top line */}
          <div style={{position:'absolute',top:0,left:0,right:0,height:'2px',
                       background:'linear-gradient(90deg,#0052FF,#3377FF 40%,#FF4400 60%,#FF6600)'}}/>
          <div style={{position:'absolute',inset:0,pointerEvents:'none',
                       background:'radial-gradient(ellipse at 30% 0%,rgba(0,82,255,0.05) 0%,transparent 50%), radial-gradient(ellipse at 70% 0%,rgba(255,102,0,0.05) 0%,transparent 50%)'}}/>

          <div style={{position:'relative',zIndex:1}}>
            {/* Mini logo */}
            <div style={{display:'flex',justifyContent:'center',marginBottom:'24px'}}>
              <Image src="/logo.png" alt="OmniPulse" width={240} height={60}
                style={{objectFit:'contain',height:'50px',width:'auto',opacity:0.9}}/>
            </div>
            <h2 style={{fontFamily:'Barlow,sans-serif',fontWeight:900,
                        fontSize:'clamp(26px,4.5vw,48px)',letterSpacing:'-0.02em',
                        textTransform:'uppercase',marginBottom:'14px',color:'#F0F2F5'}}>
              READY TO PULSE IN?
            </h2>
            <p style={{fontFamily:'IBM Plex Sans,sans-serif',color:'#6B7585',fontSize:'14px',
                       maxWidth:'440px',margin:'0 auto 32px',lineHeight:1.7}}>
              Create your first prediction market in 30 seconds.
              No KYC. No centralized oracle. Pure on-chain probability.
            </p>
            <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'10px'}}>
              <Link href="/create" style={{
                display:'inline-flex',alignItems:'center',gap:'8px',padding:'12px 36px',
                background:'linear-gradient(120deg,#0052FF,#003DBF)',
                border:'1px solid rgba(0,82,255,0.5)',color:'#fff',textDecoration:'none',
                fontFamily:'IBM Plex Mono,monospace',fontSize:'11px',letterSpacing:'0.12em',
                textTransform:'uppercase',borderRadius:'3px',transition:'all 0.2s',
              }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.boxShadow='0 0 28px rgba(0,82,255,0.4)';}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.boxShadow='';}}
              >LAUNCH A MARKET</Link>
              <Link href="/markets" style={{
                display:'inline-flex',alignItems:'center',gap:'8px',padding:'11px 30px',
                background:'rgba(255,102,0,0.1)',border:'1px solid rgba(255,102,0,0.35)',
                color:'#FF6600',textDecoration:'none',
                fontFamily:'IBM Plex Mono,monospace',fontSize:'11px',letterSpacing:'0.12em',
                textTransform:'uppercase',borderRadius:'3px',transition:'all 0.2s',
              }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='rgba(255,102,0,0.18)';}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='rgba(255,102,0,0.1)';}}
              >BROWSE MARKETS</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ══════════════════════════════════════════ */}
      <footer style={{borderTop:'1px solid #1E2530',padding:'24px'}}>
        <div style={{maxWidth:'1280px',margin:'0 auto',display:'flex',flexWrap:'wrap',
                     alignItems:'center',justifyContent:'space-between',gap:'16px'}}>
          <Image src="/logo.png" alt="OmniPulse" width={140} height={35}
            style={{objectFit:'contain',height:'28px',width:'auto',opacity:0.75}}/>
          <div style={{display:'flex',gap:'20px',flexWrap:'wrap'}}>
            {['DOCS','GITHUB','DISCORD','TWITTER'].map(l=>(
              <a key={l} href="#"
                style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'9px',
                        letterSpacing:'0.12em',color:'#3A4255',textDecoration:'none',transition:'color 0.15s'}}
                onMouseEnter={e=>(e.currentTarget.style.color='#FF6600')}
                onMouseLeave={e=>(e.currentTarget.style.color='#3A4255')}>{l}</a>
            ))}
          </div>
          <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'9px',
                        letterSpacing:'0.1em',color:'#3A4255'}}>
            SOLANA HACKATHON 2025 · PHASE 1
          </span>
        </div>
      </footer>
    </div>
  );
}

/* ── Floating terminal card ──────────────────────────────── */
function FloatTerminal({ticker,q,yes,style,cls,delay,rotate}:{ticker:string;q:string;yes:number;style?:React.CSSProperties;cls?:string;delay:string;rotate:string}) {
  return (
    <div className={`animate-float ${cls??''}`} style={{...style,pointerEvents:'none',animationDelay:delay}}>
      <div style={{width:'220px',background:'#0D0F14',border:'1px solid #1E2530',
                   borderRadius:'3px',transform:`rotate(${rotate})`,
                   boxShadow:'0 24px 64px rgba(0,0,0,0.6)',position:'relative'}}>
        {/* Dual-accent top bar */}
        <div style={{height:'2px',background:'linear-gradient(90deg,#0052FF,#FF6600)'}}/>
        {/* Terminal chrome */}
        <div style={{display:'flex',alignItems:'center',gap:'5px',padding:'7px 10px',
                     borderBottom:'1px solid #1E2530',background:'#111318'}}>
          {['#FF5F57','#FFBD2E','#28C840'].map(c=>(
            <span key={c} style={{width:'7px',height:'7px',borderRadius:'50%',background:c}}/>
          ))}
          <span style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'9px',
                        color:'#3A4255',marginLeft:'4px',letterSpacing:'0.06em'}}>{ticker}</span>
        </div>
        <div style={{padding:'12px'}}>
          <p style={{fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',
                     color:'#B8C0CC',marginBottom:'10px',lineHeight:1.5}}>{q}</p>
          <div style={{display:'flex',justifyContent:'space-between',
                       fontFamily:'IBM Plex Mono,monospace',fontSize:'10px',marginBottom:'5px'}}>
            <span style={{color:'#00C853',fontWeight:600}}>YES {yes}%</span>
            <span style={{color:'#FF1744',fontWeight:600}}>NO {100-yes}%</span>
          </div>
          <div style={{height:'3px',background:'rgba(255,23,68,0.25)',borderRadius:'2px',overflow:'hidden'}}>
            <div style={{height:'100%',width:`${yes}%`,background:'linear-gradient(90deg,#0052FF,#FF6600)',borderRadius:'2px'}}/>
          </div>
        </div>
      </div>
    </div>
  );
}