import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Linkedin, ArrowUpRight } from "lucide-react";
import { EASE } from "./Motion";
import { scrollToId } from "../lib/scroll";

const POINTS = [
  { k: "The problem", v: "2,000+ untracked parts across 5 vehicle programs. Nobody asked me to fix it, so I built the dashboard that tracks shortages and delivery risk.", go: "the-mess" },
  { k: "The proof I can build", v: "Nautilus Terminal: a supply chain intelligence tool I built solo. Type a raw material, it fuses six global data feeds into a sourcing risk score.", go: "platform" },
  { k: "The results", v: "$3.4M+ in savings shipped quietly: four Ford redesigns ($160K, $110K, $94K, $85K a year) and a $3M+ tooling decision for Case New Holland.", go: "engine-room" },
  { k: "Why growth", v: "Same instinct, pointed somewhere louder: pattern finding and building the system that makes something legible, now with loud, public, immediate feedback.", go: "closing" },
];

const STATS = [["2,000+", "parts tracked"], ["5", "programs"], ["$3.4M+", "savings"], ["$3,000", "the ask"]];

const Body = ({ onClose }) => {
  const jump = (id) => { onClose(); setTimeout(() => scrollToId(id), 350); };
  return (
    <div className="mx-auto max-w-4xl px-5 pb-16 pt-24 sm:px-10">
      <p className="mono flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#10b981]"><span className="dot dot-green" /> Recruiter quick mode · 30-second read</p>
      <h2 className="display mt-6 text-3xl font-extrabold leading-tight text-white sm:text-5xl">
        Anubhav Tewari. <span className="text-[#f59e0b]">Design release engineer turned builder,</span> now going into growth.
      </h2>
      <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-4">
        {STATS.map(([v, l]) => (
          <div key={l} className="bg-[#0e1014] px-4 py-5">
            <p className={`mono text-2xl font-bold sm:text-3xl ${l === "the ask" ? "text-[#f59e0b]" : "text-white"}`}>{v}</p>
            <p className="mono mt-1 text-[11px] uppercase tracking-[0.2em] text-[#a3abb8]">{l}</p>
          </div>
        ))}
      </div>
      <ol className="mt-10 space-y-2">
        {POINTS.map((p, i) => (
          <motion.li key={p.k} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: EASE }}>
            <button onClick={() => jump(p.go)} className="group grid w-full grid-cols-[auto_1fr_auto] items-start gap-4 rounded-xl border border-transparent px-3 py-4 text-left transition-colors hover:border-white/10 hover:bg-white/[0.03]" data-testid={`quick-point-${i}`}>
              <span className="mono pt-1 text-xs text-[#a3abb8]">0{i + 1}</span>
              <span>
                <span className="mono block text-[11px] uppercase tracking-[0.2em] text-[#f59e0b]">{p.k}</span>
                <span className="mt-1.5 block text-base text-[#e5e7eb] md:text-lg">{p.v}</span>
              </span>
              <ArrowUpRight size={16} className="mt-1 text-[#a3abb8] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
            </button>
          </motion.li>
        ))}
      </ol>
      <div className="mt-8 rounded-xl border-l-2 border-[#f59e0b] bg-[#f59e0b]/[0.05] p-5">
        <p className="mono text-[11px] uppercase tracking-[0.2em] text-[#f59e0b]">The $3,000 ask</p>
        <p className="mt-2 text-base text-white">Take Nautilus Terminal from working side project to fully released software: always-on backend, paid-tier data feeds, and a hardened agentic architecture.</p>
      </div>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <a href="mailto:anubhavtewari7@gmail.com" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f59e0b] px-6 py-3.5 text-sm font-bold text-[#0b0d10]" data-testid="quick-email-link"><Mail size={16} /> Email me</a>
        <a href="https://www.linkedin.com/in/anubhavtewari7/" target="_blank" rel="noopener noreferrer" className="mono inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-white hover:border-[#10b981]" data-testid="quick-linkedin-link"><Linkedin size={15} /> LinkedIn</a>
        <button onClick={onClose} className="mono rounded-full px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-[#a3abb8] hover:text-white" data-testid="quick-full-story-btn">See the full story ↓</button>
      </div>
    </div>
  );
};

export const QuickMode = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return undefined;
    window.__lenis?.stop();
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { window.__lenis?.start(); window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[70] overflow-y-auto bg-[#0b0d10]/95 backdrop-blur-2xl"
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          data-testid="quick-mode-overlay"
        >
          <motion.div className="fixed inset-x-0 top-0 h-[2px] origin-left bg-[#10b981]" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 30, ease: "linear" }} data-testid="quick-mode-timer" />
          <button onClick={onClose} aria-label="Close quick mode" className="fixed right-5 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#13161c] text-white transition-colors hover:border-white/40 sm:right-10" data-testid="quick-mode-close-btn">
            <X size={18} />
          </button>
          <Body onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
