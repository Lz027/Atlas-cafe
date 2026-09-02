/**
 * Inline vector art for brew methods — no bitmap images, no repetition of
 * the same photo across the site. Each method gets its own line drawing,
 * and a per-recipe seed shifts the accent details so no two cards match.
 */

type Props = {
  method: string;
  seed?: string;
  className?: string;
};

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function Drawing({ method }: { method: string }) {
  const s = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (method) {
    case "V60":
      return (
        <g {...s}>
          <path d="M32 34h56L60 74z" />
          <path d="M42 46h36" />
          <path d="M60 74v10" />
          <path d="M46 92h28" />
          <path d="M52 84h16v8H52z" />
        </g>
      );
    case "Chemex":
      return (
        <g {...s}>
          <path d="M36 26h48L64 58l20 32H36l20-32z" />
          <path d="M36 82h48" />
          <path d="M50 54h28" />
          <path d="M52 44c4 4 16 4 20 0" />
        </g>
      );
    case "French Press":
      return (
        <g {...s}>
          <rect x="40" y="36" width="40" height="56" rx="4" />
          <path d="M60 36V20" />
          <path d="M46 20h28" />
          <path d="M42 62h36" />
          <path d="M80 46h10v14H80" />
        </g>
      );
    case "Cold Brew":
      return (
        <g {...s}>
          <path d="M42 30h36l-4 62H46z" />
          <path d="M44 56h32" />
          <circle cx="54" cy="70" r="3" />
          <circle cx="66" cy="78" r="2.5" />
          <circle cx="60" cy="64" r="2" />
        </g>
      );
    case "AeroPress":
      return (
        <g {...s}>
          <rect x="44" y="18" width="32" height="18" rx="2" />
          <path d="M60 36v10" />
          <rect x="42" y="46" width="36" height="34" rx="3" />
          <path d="M46 80h28l-4 12H50z" />
        </g>
      );
    case "Espresso":
      return (
        <g {...s}>
          <path d="M34 44h44v20a16 16 0 0 1-16 16H50a16 16 0 0 1-16-16z" />
          <path d="M78 50h10a8 8 0 0 1 0 16h-10" />
          <path d="M30 92h56" />
          <path d="M46 34c0-6 6-6 6-12" />
          <path d="M60 34c0-6 6-6 6-12" />
        </g>
      );
    case "Moka Pot":
      return (
        <g {...s}>
          <path d="M46 92h28l6-26H40z" />
          <path d="M40 66h40l-4-22H44z" />
          <path d="M44 44l6-14h20l6 14" />
          <path d="M80 52l10-8" />
        </g>
      );
    case "Kalita Wave":
      return (
        <g {...s}>
          <path d="M34 36h52L74 66H46z" />
          <path d="M40 46h40" />
          <path d="M46 56h28" />
          <path d="M50 66v8h20v-8" />
          <path d="M44 92h32" />
        </g>
      );
    case "Phin":
      return (
        <g {...s}>
          <rect x="44" y="28" width="32" height="10" rx="2" />
          <rect x="42" y="40" width="36" height="26" rx="2" />
          <path d="M56 66v8" />
          <path d="M42 78h36l-4 14H46z" />
        </g>
      );
    case "Turkish":
      return (
        <g {...s}>
          <path d="M40 40h32v28a16 16 0 0 1-16 16 16 16 0 0 1-16-16z" />
          <path d="M72 46l18-8" />
          <path d="M44 40c2-8 24-8 26 0" />
          <path d="M34 92h48" />
        </g>
      );
    default:
      return (
        <g {...s}>
          <circle cx="60" cy="60" r="26" />
          <path d="M44 60c8-8 24-8 32 0" />
          <path d="M60 34v52" />
        </g>
      );
  }
}

export function BrewArt({ method, seed = "", className = "" }: Props) {
  const h = hash(`${method}:${seed}`);
  const rot = (h % 24) - 12;
  const dots = 3 + (h % 4);

  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label={`${method} illustration`}
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <g className="text-clay/25" stroke="currentColor" fill="none" strokeWidth="1">
        <circle cx="60" cy="60" r="46" transform={`rotate(${rot} 60 60)`} strokeDasharray="3 7" />
        {Array.from({ length: dots }).map((_, i) => {
          const a = ((h % 360) + (i * 360) / dots) * (Math.PI / 180);
          return (
            <circle
              key={i}
              cx={60 + Math.cos(a) * 52}
              cy={60 + Math.sin(a) * 52}
              r={1.6 + (i % 2)}
              fill="currentColor"
            />
          );
        })}
      </g>
      <g className="text-espresso/70">
        <Drawing method={method} />
      </g>
    </svg>
  );
}
