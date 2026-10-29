import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1];

export const Reveal = ({ children, delay = 0, y = 28, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.9, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

export const CountUp = ({ to, from = 0, prefix = "", suffix = "", duration = 2.2, delay = 0, testId }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [v, setV] = useState(from);
  useEffect(() => {
    if (!inView) return undefined;
    const c = animate(from, to, { duration, delay, ease: EASE, onUpdate: (x) => setV(x) });
    return () => c.stop();
  }, [inView, to, from, duration, delay]);
  return (
    <span ref={ref} data-testid={testId}>
      {prefix}
      {Math.round(v).toLocaleString("en-US")}
      {suffix}
    </span>
  );
};

export const SectionTag = ({ index, label, tone = "amber" }) => (
  <div className="mono flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#a3abb8]">
    <span className={`dot ${tone === "green" ? "dot-green" : "dot-amber"}`} />
    <span className="text-white/90">{index}</span>
    <span className="h-px w-10 bg-[#343d4f]" />
    <span>{label}</span>
  </div>
);
