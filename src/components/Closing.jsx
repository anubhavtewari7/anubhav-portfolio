import { useState } from "react";
import { Copy, Check, Linkedin, Mail } from "lucide-react";
import { CountUp, Reveal, SectionTag } from "./Motion";

const EMAIL = "anubhavtewari7@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/anubhavtewari7/";

const PARAS = [
  "Most of my career has been spent making invisible problems visible. A part shortage: nobody had eyes on it. A supply chain risk: nobody had scored it. A design flaw: nobody had flagged it yet. I kept doing that even when nobody asked because I like the moment right before something clicks into place, when the chaos turns into a system someone else can actually use.",
  "I built Nautilus Terminal the same way on my own time because I wanted to know if I could turn a genuinely hard ambiguous problem into something a stranger could open and immediately trust. Growth is the same instinct, pointed somewhere louder. It's still pattern finding, still building the system that makes something legible, except instead of a dashboard only three engineers ever see, the system is a campaign, a channel, a story that has to land with people who owe you nothing.",
  "That scares me a little, honestly, which is probably why it's the right next thing. I spent 5 years getting very good at quiet structural work. I want to find out what I can build when the feedback is loud, public, and immediate.",
  "I don't have a growth playbook. What I have is a habit of taking the thing nobody assigned me and building it anyway, and the discipline to make it hold up under real scrutiny. I think that matters more than the playbook.",
];

const CALLOUT = "I would put it into Nautilus Terminal itself, taking it from a working side project into real fully released software. Right now it runs on data sources I've stitched together and paid for out of pocket, on infrastructure that's held up by patience more than budget. $3,000 gets me proper always-on backend paid-tier access to the commodities, sanction, and geopolitical risk feeds it depends on, and the runway to actually harden the agentic architecture instead of babysitting it. I built it to prove a sourcing question could be answered in seconds instead of days. I'm going to spend this improving that at a scale beyond just me.";

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(EMAIL).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); }).catch(() => {});
  };
  return (
    <div id="contact" className="mt-28 border-t border-white/10 pt-16" data-testid="contact-block">
      <p className="mono text-[11px] uppercase tracking-[0.25em] text-[#a3abb8]">Next step · yours</p>
      <h3 className="display mt-6 max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-5xl">
        If any of this clicked, let's talk. <span className="text-[#10b981]">Let's build it.</span>
      </h3>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        <a href={`mailto:${EMAIL}`} className="group inline-flex items-center gap-3 rounded-full bg-[#f59e0b] px-6 py-4 text-sm font-bold text-[#0b0d10] transition-transform duration-300 hover:-translate-y-0.5" data-testid="contact-email-link">
          <Mail size={17} /> <span className="mono">{EMAIL}</span>
        </a>
        <button onClick={copy} className="mono inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-4 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:border-white/40" data-testid="contact-copy-email-btn">
          {copied ? <Check size={15} className="text-[#10b981]" /> : <Copy size={15} />} {copied ? "Copied" : "Copy email"}
        </button>
        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="mono inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-4 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:border-[#10b981] hover:text-[#10b981]" data-testid="contact-linkedin-link">
          <Linkedin size={15} /> LinkedIn
        </a>
      </div>
    </div>
  );
};

export const Closing = () => (
  <section id="closing" className="relative mx-auto max-w-[1400px] px-5 py-28 sm:px-10 sm:py-40" data-testid="closing-section">
    <Reveal><SectionTag index="04" label="The Ask" /></Reveal>
    <Reveal delay={0.1}>
      <h2 className="display mt-8 max-w-5xl text-4xl font-extrabold leading-[1.0] text-white sm:text-6xl lg:text-7xl" data-testid="closing-headline">
        I'm done bending the system <span className="text-[#f59e0b]">in private.</span>
      </h2>
    </Reveal>
    <div className="mt-16 grid gap-8 lg:grid-cols-[0.35fr_1fr]">
      <p className="mono hidden text-[11px] uppercase tracking-[0.25em] text-[#a3abb8] lg:block">{"// Why growth"}</p>
      <div className="max-w-3xl space-y-7" data-testid="closing-paragraph">
        {PARAS.map((p, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <p className={i === 0 ? "text-xl leading-relaxed text-white md:text-2xl" : "text-base leading-relaxed text-[#c4cad4] md:text-lg"}>{p}</p>
          </Reveal>
        ))}
      </div>
    </div>
    <div className="mt-24 grid gap-8 lg:grid-cols-[0.35fr_1fr]">
      <p className="mono hidden text-[11px] uppercase tracking-[0.25em] text-[#a3abb8] lg:block">{"// Where the $3,000 goes"}</p>
      <div>
        <Reveal>
          <div className="glass relative overflow-hidden rounded-2xl border-l-2 !border-l-[#f59e0b] p-7 sm:p-10" data-testid="ask-callout">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#f59e0b]/15 blur-3xl" />
            <p className="mono mb-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#f59e0b]"><span className="dot dot-amber" /> Allocation plan</p>
            <p className="relative text-base leading-relaxed text-white md:text-lg">"{CALLOUT}"</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-12">
            <p className="mono text-[11px] uppercase tracking-[0.25em] text-[#a3abb8]">The ask</p>
            <p className="mono amber-glow mt-2 text-7xl font-bold leading-none tracking-tighter text-[#f59e0b] sm:text-8xl lg:text-[10rem]" data-testid="ask-amount">
              <CountUp to={3000} prefix="$" duration={2.4} />
            </p>
          </div>
        </Reveal>
        <Contact />
      </div>
    </div>
  </section>
);
