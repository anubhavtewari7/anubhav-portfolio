import { useEffect, useRef, useState } from "react";
import { Play, Pause, Mic, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const SRC = `${process.env.PUBLIC_URL || ""}/audio/anubhav-voice-note.mp3?v=2`;
const TRANSCRIPT = "Hi, I'm Anubhav Tewari. I go by Anubhav. For the last five years, companies have handed me the parts of their programs nobody else wanted to own. 2,200 untracked parts across five different vehicle programs, a supply chain risk nobody had scored. I kept building the system that made the chaos visible, even when nobody asked. This portfolio is that story, and I built it with my own voice using Wispr Flow.";
const BARS = Array.from({ length: 38 }, (_, i) => 18 + Math.round(Math.abs(Math.sin(i * 1.7) * 62 + Math.cos(i * 0.6) * 20)));
const fmt = (s) => (Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "--:--");

const Transcript = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3 px-3">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mono flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-[#a3abb8] transition-colors hover:text-white"
        data-testid="voice-note-transcript-toggle"
      >
        {open ? "Hide transcript" : "Read transcript"}
        <ChevronDown size={13} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="mt-3 border-l-2 border-[#f59e0b]/60 pl-4 text-sm leading-relaxed text-[#d1d5db]" data-testid="voice-note-transcript">
              {TRANSCRIPT}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const VoiceNote = () => {
  const audio = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [missing, setMissing] = useState(false);
  const [t, setT] = useState(0);
  const [dur, setDur] = useState(NaN);

  useEffect(() => {
    const a = audio.current;
    if (!a) return undefined;
    const onTime = () => setT(a.currentTime);
    const onMeta = () => setDur(a.duration);
    const onEnd = () => setPlaying(false);
    const onPlay = () => { setPlaying(true); setMissing(false); };
    const onPause = () => setPlaying(false);
    const onErr = () => setMissing(true);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    a.addEventListener("error", onErr);
    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
      a.removeEventListener("error", onErr);
    };
  }, []);

  const toggle = async () => {
    const a = audio.current;
    if (!a) return;
    if (!a.paused) { a.pause(); return; }
    try {
      if (a.error || a.readyState === 0) a.load();
      await a.play();
    } catch (e) {
      if (e?.name !== "AbortError") setMissing(true);
    }
  };

  const progress = Number.isFinite(dur) && dur > 0 ? t / dur : 0;

  return (
    <div className="w-full max-w-[460px]">
    <div className="glass flex w-full items-center gap-4 rounded-full py-2.5 pl-2.5 pr-6" data-testid="voice-note-player">
      <audio ref={audio} src={SRC} preload="auto" playsInline />
      <button
        onClick={toggle}
        aria-label={playing ? "Pause voice note" : "Play voice note"}
        className="group relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f59e0b] text-[#0b0d10] transition-transform duration-300 hover:scale-105 active:scale-95"
        data-testid="voice-note-play-btn"
      >
        {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
        <span className="absolute inset-0 rounded-full ring-1 ring-[#f59e0b]/40 transition-transform duration-500 group-hover:scale-125" />
      </button>
      <div className="min-w-0 flex-1">
        <div className="mono mb-1.5 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.2em] text-[#a3abb8]">
          <span className="flex items-center gap-1.5 whitespace-nowrap"><Mic size={11} className="text-[#f59e0b]" /> Voice note</span>
          <span className="whitespace-nowrap" data-testid="voice-note-time">{missing ? "Tap to retry" : `${fmt(t)} / ${fmt(dur)}`}</span>
        </div>
        <div className="flex h-7 items-center gap-[3px]">
          {BARS.map((h, i) => (
            <span
              key={i}
              className="w-[3px] rounded-full transition-colors duration-200"
              style={{
                height: `${h}%`,
                background: i / BARS.length < progress ? "#f59e0b" : "rgba(243,244,246,0.28)",
                animation: playing ? `vn 0.9s ease-in-out ${i * 0.04}s infinite alternate` : "none",
              }}
            />
          ))}
        </div>
      </div>
      <style>{`@keyframes vn{from{transform:scaleY(.45)}to{transform:scaleY(1)}}`}</style>
    </div>
    <Transcript />
    </div>
  );
};
