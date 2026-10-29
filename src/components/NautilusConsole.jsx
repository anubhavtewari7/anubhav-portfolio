import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const SOURCES = ["Commodity prices", "Geopolitical risk", "Port congestion", "Sanctions screening", "Tariff codes", "FX rates"];

export const NautilusConsole = ({ onHandoff }) => {
  const [value, setValue] = useState("");
  const [query, setQuery] = useState("");
  const [step, setStep] = useState(-1);
  const timers = useRef([]);

  useEffect(() => () => { timers.current.forEach(clearTimeout); }, []);

  const run = (e) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    timers.current.forEach(clearTimeout);
    setQuery(q);
    setStep(0);
    timers.current = SOURCES.map((_, i) => setTimeout(() => setStep(i + 1), 380 * (i + 1)));
    timers.current.push(setTimeout(() => { setStep(SOURCES.length + 1); onHandoff?.(); }, 380 * (SOURCES.length + 1.5)));
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#07080a]" data-testid="nautilus-console">
      <div className="mono flex items-center gap-2 border-b border-white/10 px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-[#a3abb8]">
        <span className="dot dot-red" style={{ animation: "none" }} /><span className="dot dot-amber" /><span className="dot dot-green" />
        <span className="ml-2">nautilus ~ scan</span>
      </div>
      <form onSubmit={run} className="mono flex items-center gap-3 border-b border-white/5 px-4 py-4 text-sm">
        <span className="text-[#10b981]">nautilus&gt;</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. neodymium magnets"
          className="min-w-0 flex-1 bg-transparent text-white placeholder:text-white/35 focus:outline-none"
          data-testid="nautilus-material-input"
        />
        <button type="submit" className="rounded border border-[#f59e0b]/50 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#f59e0b] transition-colors hover:bg-[#f59e0b] hover:text-black" data-testid="nautilus-scan-btn">
          Enter ↵
        </button>
      </form>
      <div className="mono min-h-[250px] space-y-1.5 px-4 py-4 text-xs sm:text-sm" data-testid="nautilus-scan-output">
        {step < 0 && <p className="text-white/45">Awaiting query<span className="blink">_</span></p>}
        {step >= 0 && <p className="text-white">&gt; scan --material "{query}"</p>}
        {SOURCES.map((s, i) => step > i && (
          <motion.p key={s} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="flex justify-between gap-4">
            <span className="text-[#a3abb8]">[{String(i + 1).padStart(2, "0")}] {s.toLowerCase()}</span>
            <span className="text-[#10b981]">linked ✓</span>
          </motion.p>
        ))}
        {step >= 0 && step <= SOURCES.length && (
          <p className="text-[#fbbf24]">{SOURCES[Math.min(step, SOURCES.length - 1)].toLowerCase()} ▒▒▒▒░░ streaming<span className="blink">_</span></p>
        )}
        {step > SOURCES.length && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-2 text-[#f59e0b]" data-testid="nautilus-handoff-line">
            → 6 feeds linked. Scoring "{query}" in the live Nautilus Terminal ↓
          </motion.p>
        )}
      </div>
    </div>
  );
};
