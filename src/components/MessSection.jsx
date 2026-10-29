import { Reveal, SectionTag } from "./Motion";
import { MessDashboard } from "./MessDashboard";

export const MessSection = () => (
  <section id="the-mess" className="relative mx-auto max-w-[1400px] px-5 py-28 sm:px-10 sm:py-40" data-testid="the-mess-section">
    <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <Reveal><SectionTag index="01" label="The Mess" /></Reveal>
        <Reveal delay={0.1}>
          <h2 className="display mt-8 text-4xl font-extrabold leading-[1.02] text-white sm:text-5xl lg:text-6xl" data-testid="mess-headline">
            <span className="mono text-[#f59e0b]">2,000+</span> untracked parts, <span className="mono text-[#f59e0b]">5</span> vehicle programs.
            <span className="mt-3 block text-white/45">Nobody asked me to fix it.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-md text-base text-[#a3abb8] md:text-lg">
            So I built the dashboard that tracks part shortages and delivery risk across every program, before they turn into a line-down. Pick a program and watch the clock.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mono mt-10 flex flex-wrap gap-5 text-[11px] uppercase tracking-[0.2em] text-[#a3abb8]">
            <span className="flex items-center gap-2"><span className="dot dot-red" /> Shortage ≤ 3d</span>
            <span className="flex items-center gap-2"><span className="dot dot-amber" /> At risk ≤ 10d</span>
            <span className="flex items-center gap-2"><span className="dot dot-green" /> On track</span>
          </div>
          <p className="mono mt-6 text-[11px] uppercase tracking-[0.2em] text-white/40">Simulated data · real-world structure</p>
        </Reveal>
      </div>
      <Reveal delay={0.15}><MessDashboard /></Reveal>
    </div>
  </section>
);
