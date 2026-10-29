import { useRef } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { VoiceNote } from "./VoiceNote";
import { EASE } from "./Motion";
import { scrollToId } from "../lib/scroll";

const LINES = [
  { text: "I found the", cls: "text-white" },
  { text: "broken system.", cls: "text-[#f59e0b] amber-glow" },
  { text: "Nobody assigned", cls: "text-white/45" },
  { text: "anyone to fix it.", cls: "text-white/45" },
];

const STATS = [
  ["2,000+", "parts tracked"],
  ["5", "vehicle programs"],
  ["$3.4M+", "savings shipped"],
  ["1", "platform built solo"],
];

const LIGHTS = Array.from({ length: 28 }, (_, i) => ({
  x: (i * 37) % 100,
  y: (i * 53) % 100,
  c: i % 7 === 0 ? "#ef4444" : i % 3 === 0 ? "#f59e0b" : "#10b981",
  d: (i % 5) * 0.7,
}));

const GridPlane = ({ sx, sy, y }) => (
  <motion.div style={{ rotateX: sx, rotateY: sy, y }} className="absolute inset-[-20%] [transform-style:preserve-3d]">
    <div className="blueprint absolute inset-0 [mask-image:radial-gradient(ellipse_at_60%_40%,black_20%,transparent_70%)]" />
    {LIGHTS.map((l, i) => (
      <span
        key={i}
        className="absolute h-1.5 w-1.5 rounded-full"
        style={{ left: `${l.x}%`, top: `${l.y}%`, background: l.c, boxShadow: `0 0 14px ${l.c}`, animation: `heroBlink 3.2s ease-in-out ${l.d}s infinite`, transform: "translateZ(40px)" }}
      />
    ))}
    <style>{`@keyframes heroBlink{0%,100%{opacity:.15}50%{opacity:.9}}`}</style>
  </motion.div>
);

export const Hero = () => {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 60, damping: 20 });
  const sy = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 60, damping: 20 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const gy = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const ty = useTransform(scrollYProgress, [0, 1], [0, -90]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section id="top" ref={ref} onMouseMove={onMove} className="relative flex min-h-[100svh] items-end overflow-hidden pb-14 pt-28 [perspective:1200px]" data-testid="hero-section">
      <GridPlane sx={sx} sy={sy} y={gy} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_100%,rgba(245,158,11,0.12),transparent_55%)]" />
      <motion.div style={{ y: ty }} className="relative z-10 mx-auto w-full max-w-[1400px] px-5 sm:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mono mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.25em] text-[#a3abb8]"
        >
          <span className="flex items-center gap-2 text-[#10b981]"><span className="dot dot-green" /> System online</span>
          <span>Portfolio // v5.0</span>
          <span className="hidden sm:inline">Engineering ⇢ Growth</span>
        </motion.div>
        <h1 className="display text-[2.15rem] font-extrabold leading-[0.98] sm:text-6xl lg:text-[5.6rem]" data-testid="hero-headline">
          {LINES.map((l, i) => (
            <span key={l.text} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className={`block ${l.cls}`}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, delay: 0.45 + i * 0.13, ease: EASE }}
              >
                {l.text}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.15, ease: EASE }}
          className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"
        >
          <div>
            <p className="text-xl font-semibold text-white sm:text-2xl" data-testid="hero-name">Anubhav Tewari</p>
            <p className="mt-2 max-w-xl text-base text-[#a3abb8] md:text-lg" data-testid="hero-identity">
              Design release engineer turned builder, now going into growth.
            </p>
          </div>
          <VoiceNote />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-14 grid grid-cols-2 border-t border-white/10 pt-6 sm:grid-cols-4"
        >
          {STATS.map(([v, l]) => (
            <div key={l} className="py-2">
              <p className="mono text-2xl font-bold text-white sm:text-3xl">{v}</p>
              <p className="mono mt-1 text-[11px] uppercase tracking-[0.2em] text-[#a3abb8]">{l}</p>
            </div>
          ))}
        </motion.div>
        <button onClick={() => scrollToId("the-mess")} className="mono mt-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#a3abb8] transition-colors hover:text-[#f59e0b]" data-testid="hero-scroll-cue">
          <ArrowDown size={14} className="animate-bounce" /> Scroll to inspect
        </button>
      </motion.div>
    </section>
  );
};
