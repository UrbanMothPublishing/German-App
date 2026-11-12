const STRIPS = 40;

/** German flag that ripples in the wind. Its left edge stays fixed to the pole. */
export function WavingFlag({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none flex aspect-[5/3] ${className}`} aria-hidden="true">
      {Array.from({ length: STRIPS }, (_, i) => {
        const t = i / (STRIPS - 1);
        return (
          <div
            key={i}
            className="animate-flag-wave flex h-full flex-1 flex-col"
            style={
              {
                "--amp": (t * 9).toFixed(2),
                animationDelay: `${(-i * 0.05).toFixed(2)}s`,
                marginLeft: i === 0 ? 0 : "-0.5px",
              } as React.CSSProperties
            }
          >
            <span className="flex-1 bg-flag-black" />
            <span className="flex-1 bg-flag-red" />
            <span className="flex-1 bg-flag-gold" />
          </div>
        );
      })}
    </div>
  );
}
