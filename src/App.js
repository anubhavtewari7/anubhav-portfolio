import { useCallback, useEffect, useState } from "react";
import Lenis from "lenis";
import "@/App.css";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { MessSection } from "./components/MessSection";
import { PlatformSection } from "./components/PlatformSection";
import { EngineRoom } from "./components/EngineRoom";
import { Closing } from "./components/Closing";
import { Logo } from "./components/Logo";
import { QuickMode } from "./components/QuickMode";

const Footer = () => (
  <footer className="border-t border-white/5" data-testid="site-footer">
    <div className="mono mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-5 py-8 text-[11px] uppercase tracking-[0.2em] text-[#a3abb8] sm:px-10">
      <span className="flex items-center gap-3"><Logo size={24} /> Anubhav Tewari · {new Date().getFullYear()}</span>
      <span className="flex items-center gap-2"><span className="dot dot-green" /> All systems nominal</span>
    </div>
  </footer>
);

function App() {
  const [quick, setQuick] = useState(false);
  const closeQuick = useCallback(() => setQuick(false), []);
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    window.__lenis = lenis;
    let id;
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); window.__lenis = null; };
  }, []);

  return (
    <div className="grain relative min-h-screen bg-[#0b0d10]">
      <Nav onQuick={() => setQuick(true)} />
      <QuickMode open={quick} onClose={closeQuick} />
      <main>
        <Hero />
        <Marquee />
        <MessSection />
        <PlatformSection />
        <EngineRoom />
        <Closing />
      </main>
      <Footer />
    </div>
  );
}

export default App;
