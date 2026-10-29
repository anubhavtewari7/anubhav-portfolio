const NAMES = [
  "Front seat frame assy", "Sunvisor LH", "Seat belt bezel cover", "IP main wire harness", "Door trim panel RR",
  "HVAC center duct", "Headliner substrate", "Cowl grille panel", "Battery tray bracket", "Console armrest latch",
  "B-pillar trim upper", "Recliner mechanism", "Underbody aero shield", "Charge port door", "Glovebox damper",
  "Rear bumper fascia", "Lumbar support module", "Floor console bin", "Roof rail clip set", "ADAS camera bracket",
];

const seeded = (seed) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

const build = (code, seed, prefix, count) => {
  const r = seeded(seed);
  const pool = [...NAMES].sort(() => r() - 0.5).slice(0, count);
  return pool.map((name, i) => {
    const roll = r();
    const status = roll < 0.2 ? "red" : roll < 0.48 ? "amber" : "green";
    const days = status === "red" ? 1 + Math.floor(r() * 3) : status === "amber" ? 4 + Math.floor(r() * 7) : 12 + Math.floor(r() * 34);
    return {
      id: `${code}-${i}`,
      pn: `${prefix}-${String(100 + Math.floor(r() * 899))}-${String(10 + Math.floor(r() * 89))}${"ABCDE"[i % 5]}`,
      name,
      supplier: ["Tier-1 · MX", "Tier-1 · DE", "Tier-2 · CN", "Tier-1 · US", "Tier-2 · CZ"][Math.floor(r() * 5)],
      status,
      days,
      offset: Math.floor(r() * 86400),
    };
  });
};

export const PROGRAMS = [
  { code: "VW", name: "Volkswagen", label: "MEB platform", parts: build("VW", 11, "5H0", 16) },
  { code: "Audi", name: "Audi", label: "PPE platform", parts: build("Audi", 23, "8Y1", 14) },
  { code: "Porsche", name: "Porsche", label: "J1 platform", parts: build("Porsche", 37, "9J1", 18) },
  { code: "Scout", name: "Scout", label: "Scout platform", parts: build("Scout", 51, "SC7", 15) },
];
