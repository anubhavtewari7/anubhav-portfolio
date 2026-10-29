import { useEffect, useState } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";

export const NAUTILUS_URL = "https://nautilus-terminal.vercel.app/terminal";

export const NautilusEmbed = ({ glow }) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFailed((f) => f || !loaded), 15000);
    return () => clearTimeout(t);
  }, [loaded]);

  return (
    <div className={`glass overflow-hidden rounded-2xl transition-shadow duration-700 ${glow ? "shadow-[0_0_0_1px_rgba(245,158,11,0.6),0_0_80px_-10px_rgba(245,158,11,0.45)]" : ""}`} data-testid="nautilus-embed">
      <div className="mono flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-[#a3abb8]">
        <span className="flex min-w-0 items-center gap-2">
          <span className="dot dot-green" />
          <span className="truncate">live · nautilus-terminal.vercel.app/terminal</span>
        </span>
        <a href={NAUTILUS_URL} target="_blank" rel="noopener noreferrer" className="flex shrink-0 items-center gap-1 text-white transition-colors hover:text-[#f59e0b]" data-testid="nautilus-embed-open-link">
          Open <ArrowUpRight size={12} />
        </a>
      </div>
      <div className="relative h-[560px] bg-[#07080a] sm:h-[680px]">
        {!failed && (
          <iframe
            src={NAUTILUS_URL}
            title="Nautilus Terminal live"
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className="h-full w-full border-0"
            data-testid="nautilus-iframe"
          />
        )}
        {!loaded && !failed && (
          <div className="mono absolute inset-0 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-[#a3abb8]">
            <Loader2 size={16} className="animate-spin text-[#f59e0b]" /> Booting live terminal
          </div>
        )}
        {failed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8 text-center" data-testid="nautilus-embed-fallback">
            <p className="text-lg text-white">The live terminal prefers its own window.</p>
            <a href={NAUTILUS_URL} target="_blank" rel="noopener noreferrer" className="mono rounded-full bg-[#f59e0b] px-6 py-3 text-xs uppercase tracking-[0.2em] text-black" data-testid="nautilus-fallback-link">
              Open Nautilus Terminal →
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
