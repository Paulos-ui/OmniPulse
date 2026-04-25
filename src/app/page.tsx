import Link from 'next/link';
import { ArrowRight, Zap, PlusCircle, ArrowLeftRight, Trophy, ChevronRight } from 'lucide-react';
import { MARKETS } from '@/lib/data';
import MarketCard from '@/components/MarketCard';
import StatsBar from '@/components/StatsBar';
import ShowcaseSection from '@/components/ShowcaseSection';

export default function HomePage() {
  return (
    <div>
      {/* ══ HERO ═══════════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center overflow-hidden grid-bg">

        {/* Radial glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                          w-[850px] h-[500px] rounded-full bg-cyan/5 blur-[110px]"/>
          <div className="absolute top-1/4 right-1/3 w-80 h-80 rounded-full bg-blue-500/5 blur-[90px]"/>
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-purple/5 blur-[80px]"/>
        </div>

        {/* Floating decorative cards */}
        <FloatingCard
          cls="absolute left-6 top-1/3 hidden xl:block animate-float opacity-55"
          style={{ animationDelay:'0s', transform:'rotate(-4deg)' }}
          label="SOL • 30 MIN" q="Will SOL exceed $200 today?" yes={64}
        />
        <FloatingCard
          cls="absolute right-6 top-1/4 hidden xl:block animate-float opacity-55"
          style={{ animationDelay:'2.5s', transform:'rotate(3deg)' }}
          label="BTC • 8 HR" q="BTC breaks $70k before Friday?" yes={41}
        />
        <FloatingCard
          cls="absolute right-14 bottom-1/4 hidden xl:block animate-float opacity-45"
          style={{ animationDelay:'4.5s', transform:'rotate(-2deg)' }}
          label="AI • 24 HR" q="GPT-5 drops this week?" yes={78}
        />

        {/* Hero content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 py-28">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/20
                          rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse"/>
            <span className="text-xs font-mono text-cyan tracking-widest uppercase">
              Live on Solana Devnet
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-[5.5rem]
                         leading-[.93] tracking-tight text-white mb-6">
            Trade the{' '}
            <span className="grad-cyan text-glow-cyan">Probability</span>
            <br/>of{' '}
            <span className="relative">
              Anything
              <span className="absolute -bottom-1 left-0 right-0 h-[3px]
                               bg-gradient-to-r from-cyan to-blue-500 rounded-full"/>
            </span>{' '}
            in Real-Time
          </h1>

          <p className="text-lg sm:text-xl text-[#6B7A94] max-w-2xl mx-auto mb-10 leading-relaxed">
            Micro prediction markets that resolve in 5 minutes to 24 hours.
            Create a market, trade YES or NO, and earn on correct predictions —
            powered by Omnipair AMM on Solana.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/markets" className="btn btn-primary text-base px-8 py-3.5">
              Explore Markets <ArrowRight size={16}/>
            </Link>
            <Link href="/create" className="btn btn-outline text-base px-8 py-3.5">
              Create Market <Zap size={16} className="text-cyan"/>
            </Link>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 mt-12">
            {['Non-custodial','On-chain settlement','5 min resolution','Omnipair AMM'].map(t=>(
              <span key={t} className="flex items-center gap-1.5 text-xs font-mono text-[#3A4A5E]">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan/35"/>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-xs font-mono text-[#4A5568] tracking-widest">SCROLL</span>
          <div className="w-px h-10 bg-gradient-to-b from-cyan/50 to-transparent"/>
        </div>
      </section>

      {/* ══ STATS BAR ═══════════════════════════════════════ */}
      <StatsBar />

      {/* ══ LIVE MARKETS ════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-green animate-pulse"/>
              <span className="text-xs font-mono text-green tracking-widest uppercase">Live</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Active Right Now
            </h2>
          </div>
          <Link href="/markets"
            className="hidden sm:flex items-center gap-1 text-sm font-display font-semibold text-cyan hover:text-white transition-colors">
            All Markets <ChevronRight size={15}/>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MARKETS.slice(0,6).map((m,i)=>(
            <MarketCard key={m.id} market={m} delay={i*60}/>
          ))}
        </div>
      </section>

      {/* ══ SHOWCASE ════════════════════════════════════════ */}
      <ShowcaseSection />

      {/* ══ HOW IT WORKS ════════════════════════════════════ */}
      <section id="how" className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-mono text-[#4A5568] tracking-widest uppercase mb-3">The Protocol</p>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-4">
              How OmniPulse Works
            </h2>
            <p className="text-[#6B7A94] text-base max-w-xl mx-auto">
              Three steps. No middleman. Pure on-chain probability markets.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {[
              { icon:PlusCircle,     n:'01', title:'Create a Market',
                desc:'Ask any YES/NO question and set a duration from 5 minutes to 24 hours. Your market goes live on Solana instantly with automatic price discovery.',
                color:'text-cyan', bg:'bg-cyan/10 border-cyan/20' },
              { icon:ArrowLeftRight, n:'02', title:'Trade YES / NO',
                desc:'Buy YES or NO tokens at current market price. Omnipair AMM provides instant liquidity. Price moves with every trade, reflecting real-time collective belief.',
                color:'text-yellow', bg:'bg-yellow/10 border-yellow/20' },
              { icon:Trophy,         n:'03', title:'Earn on Correct Predictions',
                desc:'When the market resolves, winning token holders claim proportional USDC from the pool. Fast trustless settlement — no waiting, no intermediary.',
                color:'text-green', bg:'bg-green/10 border-green/20' },
            ].map(({ icon:Icon, n, title, desc, color, bg })=>(
              <div key={n} className="card p-8 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl border ${bg} flex items-center justify-center`}>
                    <Icon size={22} className={color}/>
                  </div>
                  <span className="font-display font-extrabold text-5xl text-[#1A2535]">{n}</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-white mb-2">{title}</h3>
                  <p className="text-[#6B7A94] text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Protocol quick-stats */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label:'Min Duration',  value:'5 minutes'     },
              { label:'Max Duration',  value:'24 hours'      },
              { label:'Settlement',    value:'On-chain'      },
              { label:'AMM Model',     value:'Omnipair CPMM' },
            ].map(x=>(
              <div key={x.label} className="rounded-xl bg-[#0D1117] border border-[#1A2535] p-5 text-center">
                <p className="font-display font-bold text-lg text-cyan mb-1">{x.value}</p>
                <p className="text-xs font-mono text-[#4A5568] uppercase tracking-wider">{x.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA ══════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto relative overflow-hidden rounded-2xl
                        bg-gradient-to-br from-[#111820] to-[#0F1923]
                        border border-[#243044] p-12 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-cyan/8 blur-[60px] rounded-full pointer-events-none"/>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl
                            bg-cyan/10 border border-cyan/20 mb-6">
              <Zap size={28} className="text-cyan" fill="currentColor"/>
            </div>
            <h2 className="font-display font-extrabold text-4xl text-white mb-4">
              Ready to Pulse In?
            </h2>
            <p className="text-[#6B7A94] text-lg mb-8 max-w-xl mx-auto">
              Create your first prediction market in 30 seconds.
              No KYC. No centralized oracle. Just pure on-chain probability.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/create" className="btn btn-primary text-base px-8 py-3.5">
                Launch a Market <Zap size={16}/>
              </Link>
              <Link href="/markets" className="btn btn-outline text-base px-8 py-3.5">
                Browse Markets <ArrowRight size={16}/>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════ */}
      <footer className="border-t border-[#1A2535] py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan to-blue-500 flex items-center justify-center">
              <Zap size={13} className="text-[#080B0F]" fill="currentColor"/>
            </div>
            <span className="font-display font-extrabold text-lg text-white">
              Omni<span className="text-cyan">Pulse</span>
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm font-mono text-[#4A5568]">
            {['Docs','GitHub','Discord','Twitter'].map(l=>(
              <a key={l} href="#" className="hover:text-cyan transition-colors">{l}</a>
            ))}
          </div>
          <p className="text-xs font-mono text-[#3A4A5E]">
            Solana Hackathon 2025 · Phase 1 MVP
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ── Decorative floating card ─────────────────────────────── */
function FloatingCard({ label, q, yes, cls, style }:
  { label:string; q:string; yes:number; cls:string; style?: React.CSSProperties }) {
  return (
    <div className={cls} style={style}>
      <div className="w-52 card p-4 pointer-events-none">
        <p className="text-xs font-mono text-cyan mb-2">{label}</p>
        <p className="text-sm font-display text-white leading-tight mb-3">{q}</p>
        <div className="flex justify-between text-xs font-mono mb-1.5">
          <span className="text-green">YES {yes}%</span>
          <span className="text-red">NO {100-yes}%</span>
        </div>
        <div className="pbar"><div className="pbar-fill" style={{width:`${yes}%`}}/></div>
      </div>
    </div>
  );
}
