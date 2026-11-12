import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DemoPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[image:var(--deck-slide-gradient)] px-8 text-[var(--deck-ink)]">
      <div className="deck-grain" />
      <div className="absolute left-[5vw] top-[6vh] flex items-center gap-3 text-[19px] font-semibold"><span className="h-[15px] w-[15px] rounded-full bg-[var(--deck-accent)]" />Heads-Up</div>
      <section className="relative max-w-[900px] text-center">
        <p className="text-[18px] font-semibold uppercase tracking-[0.16em] text-[var(--deck-accent)]">Product prototype</p>
        <h1 className="mt-7 font-display text-[clamp(56px,8vw,112px)] font-extrabold leading-none tracking-[-0.035em]">Live demo<br /><span className="text-[var(--deck-secondary)]">coming soon.</span></h1>
        <p className="mx-auto mt-8 max-w-[600px] text-[22px] leading-relaxed text-[var(--deck-muted)]">This space is reserved for the interactive Heads-Up prototype.</p>
        <Link to="/deck#6" className="mt-12 inline-flex items-center gap-3 rounded-full bg-[var(--deck-ink)] px-7 py-4 text-[18px] font-medium text-white"><ArrowLeft size={20} />Back to the deck</Link>
      </section>
    </main>
  );
}
