import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionTag } from "./Motion";
import { NautilusConsole, SOURCES } from "./NautilusConsole";
import { NautilusEmbed, NAUTILUS_URL } from "./NautilusEmbed";

export const PlatformSection = () => {
  const [glow, setGlow] = useState(false);
  const handoff = () => {
    setGlow(true);
    const el = document.getElementById("nautilus-live");
    if (window.__lenis && el) window.__lenis.scrollTo(el, { offset: -90, duration: 1.4 });
  };

  return (
    <section id="platform" className="relative bg-[#0e1014] py-28 sm:py-40" data-testid="platform-section">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal><SectionTag index="02" label="The Platform" tone="green" /></Reveal>
            <Reveal delay={0.1}>
              <h2 className="display mt-8 text-4xl font-extrabold leading-[1.02] text-white sm:text-5xl lg:text-6xl" data-testid="platform-headline">
                Give me a vague problem and global data.
                <span className="mt-3 block text-[#10b981]">I'll build the system that scores it.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-lg text-base text-[#a3abb8] md:text-lg">
                <span className="text-white">Nautilus Terminal</span> is a supply chain intelligence tool I built on my own time. Type a raw material, and it fuses six live data feeds into a sourcing risk score, a recommended hub and the chokepoint to watch.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-2" data-testid="nautilus-sources">
                {SOURCES.map((s) => (
                  <span key={s} className="mono rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] text-[#d1d5db]">{s}</span>
                ))}
              </div>
              <a
                href={NAUTILUS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[#f59e0b] px-7 py-4 text-sm font-bold text-[#0b0d10] transition-transform duration-300 hover:-translate-y-0.5"
                data-testid="try-nautilus-cta"
              >
                Try the real NAUTILUS Terminal
                <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>
          </div>
          <Reveal delay={0.15}><NautilusConsole onHandoff={handoff} /></Reveal>
        </div>
        <div id="nautilus-live" className="mt-16 sm:mt-24">
          <Reveal>
            <p className="mono mb-5 text-[11px] uppercase tracking-[0.25em] text-[#a3abb8]">↓ Not a mockup. The real thing, running live.</p>
            <NautilusEmbed glow={glow} />
          </Reveal>
        </div>
      </div>
    </section>
  );
};
