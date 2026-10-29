import { motion } from "framer-motion";
import { Timer } from "lucide-react";
import { Logo } from "./Logo";
import { scrollToId } from "../lib/scroll";

const LINKS = [
  ["the-mess", "01 Mess"],
  ["platform", "02 Platform"],
  ["engine-room", "03 Engine Room"],
  ["closing", "04 The Ask"],
];

export const Nav = ({ onQuick }) => (
  <motion.header
    initial={{ y: -40, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#0b0d10]/85 backdrop-blur-xl"
    data-testid="site-nav"
  >
    <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-10">
      <button onClick={() => scrollToId("top")} className="flex items-center gap-3" data-testid="nav-logo-btn">
        <Logo size={32} />
        <span className="mono hidden text-xs uppercase tracking-[0.25em] text-white/90 sm:inline">
          Tewari<span className="text-[#f59e0b]">.sys</span>
        </span>
      </button>
      <nav className="hidden items-center gap-8 md:flex">
        {LINKS.map(([id, label]) => (
          <button
            key={id}
            onClick={() => scrollToId(id)}
            className="mono text-xs uppercase tracking-[0.2em] text-[#a3abb8] transition-colors duration-300 hover:text-white"
            data-testid={`nav-link-${id}`}
          >
            {label}
          </button>
        ))}
      </nav>
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={onQuick}
          className="mono flex items-center gap-2 rounded-full border border-[#10b981]/50 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-[#10b981] transition-colors duration-300 hover:bg-[#10b981] hover:text-[#0b0d10] sm:px-4"
          data-testid="nav-quick-mode-btn"
        >
          <Timer size={13} /> 30s mode
        </button>
        <span className="mono hidden items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#10b981] xl:flex">
          <span className="dot dot-green" /> Open to growth roles
        </span>
        <button
          onClick={() => scrollToId("contact")}
          className="mono rounded-full border border-[#f59e0b]/60 px-3 py-2 sm:px-4 text-[11px] uppercase tracking-[0.2em] text-[#f59e0b] transition-colors duration-300 hover:bg-[#f59e0b] hover:text-[#0b0d10]"
          data-testid="nav-contact-btn"
        >
          Contact
        </button>
      </div>
    </div>
  </motion.header>
);
