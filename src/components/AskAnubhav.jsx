import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareText, X, Send, Sparkles } from "lucide-react";
import { EASE } from "./Motion";
import { ENTRIES, SUGGESTED, FALLBACK } from "../data/askData";

const INTRO =
  "I'm a small, honest system trained on Anubhav's real work — not a generic bot. Ask me about a project, a decision, a weakness, or why he's moving into PM/TPM roles.";

const score = (text, entry) => {
  const t = text.toLowerCase();
  let s = 0;
  for (const k of entry.keywords) if (t.includes(k)) s += k.split(" ").length;
  return s;
};

const answerFor = (text) => {
  let best = null;
  let bestScore = 0;
  for (const entry of ENTRIES) {
    const s = score(text, entry);
    if (s > bestScore) { bestScore = s; best = entry; }
  }
  return bestScore > 0 ? best.a : FALLBACK;
};

const TypingDots = () => (
  <span className="inline-flex items-center gap-1 py-1">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="h-1.5 w-1.5 rounded-full bg-[#10b981]"
        animate={{ opacity: [0.25, 1, 0.25] }}
        transition={{ duration: 1, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
      />
    ))}
  </span>
);

const Typewriter = ({ text, onDone }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    if (!text) return undefined;
    const id = setInterval(() => {
      setN((prev) => {
        const next = prev + 3;
        if (next >= text.length) {
          clearInterval(id);
          onDone?.();
          return text.length;
        }
        return next;
      });
    }, 12);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);
  return <span>{text.slice(0, n)}</span>;
};

const Message = ({ m }) => {
  const [done, setDone] = useState(m.role === "user" || m.typed);
  if (m.role === "user") {
    return (
      <div className="flex justify-end" data-testid="ask-msg-user">
        <p className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[#f59e0b] px-4 py-2.5 text-sm font-medium text-[#0b0d10]">{m.text}</p>
      </div>
    );
  }
  return (
    <div className="flex justify-start" data-testid="ask-msg-bot">
      <div className="max-w-[90%] rounded-2xl rounded-tl-sm border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-[#e5e7eb]">
        {m.pending ? (
          <TypingDots />
        ) : done ? (
          m.text
        ) : (
          <Typewriter text={m.text} onDone={() => setDone(true)} />
        )}
      </div>
    </div>
  );
};

export const AskAnubhav = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: INTRO, typed: true },
  ]);
  const scrollRef = useRef(null);
  const askedOnce = useRef(false);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = (raw) => {
    const q = (raw ?? input).trim();
    if (!q) return;
    askedOnce.current = true;
    setMessages((prev) => [...prev, { role: "user", text: q }, { role: "bot", text: "", pending: true }]);
    setInput("");
    const delay = 420 + Math.random() * 380;
    setTimeout(() => {
      const a = answerFor(q);
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = { role: "bot", text: a };
        return next;
      });
    }, delay);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1, ease: EASE }}
        whileHover={{ y: -2 }}
        className="mono fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full border border-[#10b981]/50 bg-[#0b0d10] px-5 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#10b981] shadow-[0_0_0_1px_rgba(16,185,129,0.08),0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-colors hover:bg-[#10b981] hover:text-[#0b0d10] sm:bottom-8 sm:right-8"
        data-testid="ask-anubhav-toggle"
      >
        <span className="dot dot-green" />
        {open ? <X size={14} /> : <MessageSquareText size={14} />}
        Ask Anubhav anything
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-x-4 bottom-24 z-[60] flex h-[min(620px,78vh)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#07080a] shadow-[0_20px_80px_rgba(0,0,0,0.6)] sm:inset-x-auto sm:bottom-[108px] sm:right-8 sm:w-[420px]"
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            data-testid="ask-anubhav-panel"
          >
            <div className="mono flex items-center gap-2 border-b border-white/10 px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-[#a3abb8]">
              <span className="dot dot-red" style={{ animation: "none" }} /><span className="dot dot-amber" /><span className="dot dot-green" />
              <span className="ml-2 flex items-center gap-1.5 text-white/80"><Sparkles size={12} className="text-[#10b981]" /> ask-anubhav ~ chat</span>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" data-lenis-prevent data-testid="ask-anubhav-thread">
              {messages.map((m, i) => <Message key={i} m={m} />)}

              {(!askedOnce.current || messages.length <= 2) && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTED.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="mono rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-left text-[11px] text-[#d1d5db] transition-colors hover:border-[#10b981]/50 hover:text-white"
                      data-testid="ask-anubhav-suggestion"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="mono flex items-center gap-2 border-t border-white/10 bg-[#0b0d10] px-3 py-3"
            >
              <span className="pl-1 text-[#10b981]">&gt;</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about a project, a decision, a weakness..."
                className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
                data-testid="ask-anubhav-input"
              />
              <button
                type="submit"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f59e0b] text-[#0b0d10] transition-transform hover:-translate-y-0.5"
                aria-label="Send"
                data-testid="ask-anubhav-send"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
