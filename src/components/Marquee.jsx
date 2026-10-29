const WORDS = ["Part shortages", "Delivery risk", "ECR / ECO release", "Design for manufacture", "Sourcing intelligence", "Systems nobody assigned", "Now: growth"];

export const Marquee = () => {
  const row = (
    <div className="flex shrink-0 items-center">
      {WORDS.map((w) => (
        <span key={w} className="display flex items-center whitespace-nowrap px-8 text-4xl font-extrabold text-white/[0.12] sm:text-6xl">
          {w}
          <span className="ml-16 inline-block h-2.5 w-2.5 rounded-full bg-[#f59e0b]/60" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative overflow-hidden border-y border-white/5 py-8" data-testid="editorial-marquee" aria-hidden="true">
      <div className="marquee-track flex w-max">{row}{row}</div>
    </div>
  );
};
