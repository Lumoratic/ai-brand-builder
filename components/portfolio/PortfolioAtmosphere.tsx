type PortfolioAtmosphereProps = {
  children: React.ReactNode;
};

/** Subtle fixed depth layers — quiet premium, not cinematic. */
export function PortfolioAtmosphere({ children }: PortfolioAtmosphereProps) {
  return (
    <div className="relative min-h-screen bg-[oklch(0.07_0.012_280)] text-foreground">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[oklch(0.07_0.012_280)]"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.11] grid-bg mask-[radial-gradient(ellipse_at_center,black_10%,transparent_78%)]"
      />
      <div
        aria-hidden
        className="noise-page"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-40%,oklch(0.38_0.14_280/0.07),transparent_50%)]"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
