import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CountUp, Reveal, SectionTag, EASE } from "./Motion";

const LEDGER = [
  { v: 160000, client: "Ford Motor Company", text: "Annual savings from redesigning a seat frame for next-gen EVs." },
  { v: 110000, client: "Ford Motor Company", text: "Annual savings from optimizing an injection-molded seat structure." },
  { v: 94000, client: "Ford Motor Company", text: "Annual savings from a 24% weight reduction on a redesigned sunvisor, with zero quality loss." },
  { v: 85000, client: "Ford Motor Company", text: "Annual savings from redesigning the injection-molded seat belt bezel cover using DFM principles." },
  { v: 3000000, client: "Case New Holland", text: "Savings from a decision I led: a cost trade-off study on 3D printing vs. traditional tooling for tractor seat frames." },
];

const Row = ({ r, i }) => (
  <motion.li
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
    className="group grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 border-b border-white/10 py-8 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-x-10"
    data-testid={`ledger-row-${i}`}
  >
    <span className="mono text-xs text-[#a3abb8]">L.{String(i + 1).padStart(2, "0")}</span>
    <div className="sm:order-3 col-start-2 sm:col-start-auto">
      <p className={`mono text-3xl font-bold tracking-tight sm:text-right sm:text-5xl ${r.v >= 1000000 ? "text-[#f59e0b] amber-glow" : "text-white"}`}>
        <CountUp to={r.v} prefix="$" suffix="+" testId={`ledger-value-${i}`} delay={i * 0.08} />
      </p>
    </div>
    <div className="col-start-2 sm:order-2">
      <p className="max-w-xl text-base text-[#d1d5db] md:text-lg">{r.text}</p>
      <p className="mono mt-2 text-[11px] uppercase tracking-[0.2em] text-[#10b981]">● Shipped · {r.client}</p>
    </div>
  </motion.li>
);

export const EngineRoom = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const iy = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const total = LEDGER.reduce((a, r) => a + r.v, 0);

  return (
    <section id="engine-room" ref={ref} className="relative mx-auto max-w-[1400px] px-5 py-28 sm:px-10 sm:py-40" data-testid="engine-room-section">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <Reveal><SectionTag index="03" label="The Engine Room" /></Reveal>
          <Reveal delay={0.1}>
            <h2 className="display mt-8 text-4xl font-extrabold leading-[1.02] text-white sm:text-5xl lg:text-6xl" data-testid="engine-room-headline">
              Real savings.<span className="block text-white/45">Shipped quietly.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="relative mt-12 aspect-[4/5] overflow-hidden rounded-2xl [clip-path:polygon(0_0,100%_0,100%_88%,86%_100%,0_100%)]">
              <motion.img
                src="/img/engine.jpg"
                alt="Engine on a workbench in front of automotive blueprints"
                style={{ y: iy, scale: 1.18 }}
                className="h-full w-full object-cover grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_70%,transparent_10%,rgba(11,13,16,0.85)_70%)]" />
              <div className="absolute inset-0 bg-[#f59e0b]/10 mix-blend-color" />
              <p className="mono absolute bottom-5 left-5 text-[11px] uppercase tracking-[0.2em] text-white/80">Fig. 03 — where the money hides</p>
            </div>
          </Reveal>
        </div>
        <div>
          <ul data-testid="savings-ledger">{LEDGER.map((r, i) => <Row key={i} r={r} i={i} />)}</ul>
          <Reveal>
            <div className="mt-10 flex flex-wrap items-end justify-between gap-6 rounded-2xl border border-[#f59e0b]/30 bg-[#f59e0b]/[0.04] p-6 sm:p-8">
              <p className="mono text-[11px] uppercase tracking-[0.25em] text-[#a3abb8]">Ledger total · no press release</p>
              <p className="mono text-4xl font-bold text-[#f59e0b] amber-glow sm:text-6xl">
                <CountUp to={total} prefix="$" suffix="+" duration={2.8} testId="ledger-total" />
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
