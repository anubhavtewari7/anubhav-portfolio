import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PROGRAMS } from "../data/parts";
import { EASE } from "./Motion";

const TONE = { red: "text-[#f87171]", amber: "text-[#fbbf24]", green: "text-[#34d399]" };
const LABEL = { red: "Shortage", amber: "At risk", green: "On track" };
const pad = (n) => String(n).padStart(2, "0");

const useNow = () => {
  const [start] = useState(() => Date.now());
  const [now, setNow] = useState(start);
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  return Math.floor((now - start) / 1000);
};

const PartRow = ({ p, i, elapsed }) => {
  const left = Math.max(0, p.days * 86400 - p.offset - elapsed);
  const d = Math.floor(left / 86400);
  const h = Math.floor((left % 86400) / 3600);
  const m = Math.floor((left % 3600) / 60);
  const s = left % 60;
  return (
    <motion.div
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: i * 0.035, ease: EASE }}
      className={`grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-white/5 px-4 py-3 sm:grid-cols-[auto_1.6fr_1fr_0.8fr_auto] sm:px-6 ${p.status === "red" ? "row-red" : ""}`}
      data-testid={`part-row-${p.id}`}
    >
      <span className={`dot dot-${p.status}`} data-testid={`part-status-${p.id}`} />
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-white">{p.name}</p>
        <p className="mono mt-0.5 text-[11px] text-[#a3abb8] sm:hidden">{p.pn} · {LABEL[p.status]}</p>
      </div>
      <span className="mono hidden text-xs text-[#a3abb8] sm:block">{p.pn}</span>
      <span className={`mono hidden text-[11px] uppercase tracking-[0.15em] sm:block ${TONE[p.status]}`}>{LABEL[p.status]}</span>
      <div className="text-right">
        <p className={`mono text-lg font-bold leading-none ${TONE[p.status]}`} data-testid={`part-days-${p.id}`}>
          {d}<span className="ml-1 text-[11px] font-normal text-[#a3abb8]">d</span>
        </p>
        <p className="mono mt-1 text-[11px] text-[#a3abb8]">{pad(h)}:{pad(m)}:{pad(s)}</p>
      </div>
    </motion.div>
  );
};

const Tabs = ({ active, setActive }) => (
  <div className="flex gap-1 overflow-x-auto border-b border-white/10 px-2 sm:px-4" role="tablist">
    {PROGRAMS.map((p) => (
      <button
        key={p.code}
        role="tab"
        aria-selected={active === p.code}
        onClick={() => setActive(p.code)}
        className={`mono relative px-4 py-4 text-xs uppercase tracking-[0.2em] transition-colors duration-300 sm:px-6 ${active === p.code ? "text-white" : "text-[#a3abb8] hover:text-white"}`}
        data-testid={`program-tab-${p.code.toLowerCase()}`}
      >
        {p.code}
        {active === p.code && <motion.span layoutId="tab-ind" className="absolute inset-x-2 bottom-0 h-[2px] bg-[#f59e0b] shadow-[0_0_12px_#f59e0b]" />}
      </button>
    ))}
  </div>
);

export const MessDashboard = () => {
  const [active, setActive] = useState("VW");
  const elapsed = useNow();
  const prog = PROGRAMS.find((p) => p.code === active);
  const counts = ["red", "amber", "green"].map((s) => prog.parts.filter((p) => p.status === s).length);
  const clock = new Date(Date.now()).toISOString().slice(11, 19);

  return (
    <div className="glass overflow-hidden rounded-2xl" data-testid="mess-dashboard">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
        <div className="mono flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[#a3abb8]">
          <span className="flex gap-1.5"><span className="dot dot-red" /><span className="dot dot-amber" /><span className="dot dot-green" /></span>
          part-shortage.monitor
        </div>
        <div className="mono flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#10b981]">
          <span className="dot dot-green" /> Live · {clock} UTC
        </div>
      </div>
      <Tabs active={active} setActive={setActive} />
      <div className="grid grid-cols-3 border-b border-white/10" data-testid="program-summary">
        {[["Shortage", counts[0], "text-[#f87171]"], ["At risk", counts[1], "text-[#fbbf24]"], ["On track", counts[2], "text-[#34d399]"]].map(([l, c, t]) => (
          <div key={l} className="border-r border-white/5 px-4 py-4 last:border-0 sm:px-6">
            <p className={`mono text-2xl font-bold sm:text-3xl ${t}`}>{pad(c)}</p>
            <p className="mono mt-1 text-[11px] uppercase tracking-[0.2em] text-[#a3abb8]">{l}</p>
          </div>
        ))}
      </div>
      <div className="mono hidden grid-cols-[auto_1.6fr_1fr_0.8fr_auto] gap-4 border-b border-white/5 px-6 py-2 text-[11px] uppercase tracking-[0.2em] text-[#a3abb8] sm:grid">
        <span className="w-[9px]" /><span>Part</span><span>P/N</span><span>Status</span><span className="text-right">Due in</span>
      </div>
      <div key={active} className="max-h-[560px] overflow-y-auto" data-lenis-prevent data-testid={`program-panel-${active.toLowerCase()}`}>
        {prog.parts.map((p, i) => <PartRow key={p.id} p={p} i={i} elapsed={elapsed} />)}
      </div>
      <div className="mono flex justify-between px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-[#a3abb8] sm:px-6">
        <span>{prog.name} · {prog.label}</span>
        <span>{prog.parts.length} parts</span>
      </div>
    </div>
  );
};
