/**
 * Inline vector art for brew methods — no bitmap images, no repetition of
 * the same photo across the site. Each method gets its own line drawing,
 * and a per-recipe seed picks a distinct decorative motif so no two cards match.
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

/** Precomputed integer dot positions on a r=52 ring (8 angles) — no float trig,
 *  so SSR and client markup always match. */
const RING: Array<[number, number]> = [
  [112, 60],
  [97, 97],
  [60, 112],
  [23, 97],
  [8, 60],
  [23, 23],
  [60, 8],
  [97, 23],
];

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

/** Six distinct decorative motifs, chosen per recipe seed. */
function Motif({ variant, h }: { variant: number; h: number }) {
  const start = h % RING.length;
  const common = { stroke: "currentColor", fill: "none", strokeWidth: 1 };
  switch (variant) {
    case 0:
      // Sunburst rays
      return (
        <g {...common}>
          {RING.map(([x, y], i) => (
            <line key={i} x1={60 + (x - 60) * 0.82} y1={60 + (y - 60) * 0.82} x2={x} y2={y} />
          ))}
          <circle cx="60" cy="60" r="40" strokeDasharray="2 6" />
        </g>
      );
    case 1:
      // Concentric arcs (crop-circle top view)
      return (
        <g {...common}>
          <circle cx="60" cy="60" r="50" strokeDasharray="3 7" />
          <circle cx="60" cy="60" r="38" />
          <circle cx="60" cy="60" r="26" strokeDasharray="1 5" />
          <circle cx={RING[start]![0]} cy={RING[start]![1]} r="2" fill="currentColor" />
        </g>
      );
    case 2:
      // Corner crosshatch field
      return (
        <g {...common}>
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1={8 + i * 8} y1="112" x2="8" y2={112 - i * 8} />
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={`b${i}`} x1={112 - i * 8} y1="8" x2="112" y2={8 + i * 8} />
          ))}
          <circle
            cx="60"
            cy="60"
            r="46"
            strokeDasharray="4 8"
            transform={`rotate(${(h % 24) - 12} 60 60)`}
          />
        </g>
      );
    case 3:
      // Orbiting bean dots
      return (
        <g {...common}>
          <circle
            cx="60"
            cy="60"
            r="46"
            strokeDasharray="3 7"
            transform={`rotate(${(h % 24) - 12} 60 60)`}
          />
          {Array.from({ length: 3 + (h % 4) }).map((_, i) => {
            const [x, y] = RING[(start + Math.floor((i * 8) / (3 + (h % 4)))) % 8]!;
            return <circle key={i} cx={x} cy={y} r={i % 2 === 0 ? 2.4 : 1.6} fill="currentColor" />;
          })}
        </g>
      );
    case 4:
      // Steam plumes + base ticks
      return (
        <g {...common}>
          <path d="M40 100c-4-6 4-10 0-16" />
          <path d="M80 100c4-6-4-10 0-16" />
          <circle
            cx="60"
            cy="60"
            r="50"
            strokeDasharray="1 9"
            transform={`rotate(${h % 45} 60 60)`}
          />
          <line x1="20" y1="106" x2="100" y2="106" strokeDasharray="2 5" />
        </g>
      );
    default:
      // Coffee-cherry scatter
      return (
        <g {...common}>
          <circle cx="60" cy="60" r="44" strokeDasharray="2 7" />
          {[0, 2, 4, 6].map((k) => {
            const [x, y] = RING[(start + k) % 8]!;
            return <circle key={k} cx={x} cy={y} r="2" fill="currentColor" />;
          })}
          <path d="M60 10v-0.01M60 110v-0.01M10 60h-0.01M110 60h-0.01" strokeWidth="2" />
        </g>
      );
  }
}

export function BrewArt({ method, seed = "", className = "" }: Props) {
  const h = hash(`${method}:${seed}`);
  const variant = h % 6;

  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label={`${method} illustration`}
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <g className="text-clay/25">
        <Motif variant={variant} h={h} />
      </g>
      <g className="text-espresso/70">
        <Drawing method={method} />
      </g>
    </svg>
  );
}
