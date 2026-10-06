import type { CSSProperties } from "react";

/* ==========================================================================
   Anime gear cluster: pure inline SVG.
   Gears are generated from a tooth count, and each child gear is placed
   exactly where it meshes with its parent, then phase-shifted so its teeth
   slot into the parent's gaps. All motion is CSS (see "GEAR CLUSTER" in
   globals.css): slow spin always, extra spin + outward drift + glow on hover.
   ========================================================================== */

const MODULE = 5; // tooth size: meshing gears must share it
const SECONDS_PER_TOOTH = 1; // 28 teeth → 28s per turn; small gears turn faster
const VIEW = 400; // viewBox size
const CENTER = VIEW / 2;
const SPREAD = 10; // how far gears drift outward on hover (SVG units)

type GearSpec = {
  teeth: number;
  /** index of the gear this one meshes with (omit for the anchor gear) */
  parent?: number;
  /** direction from the parent's center, in degrees (0 = right, 90 = down) */
  angle?: number;
  x?: number;
  y?: number;
};

const SPECS: GearSpec[] = [
  { teeth: 28, x: 195, y: 215 }, // anchor gear
  { teeth: 16, parent: 0, angle: -40 },
  { teeth: 12, parent: 0, angle: 150 },
  { teeth: 10, parent: 1, angle: -100 },
  { teeth: 14, parent: 0, angle: 60 },
];

type Gear = {
  teeth: number;
  x: number;
  y: number;
  phase: number; // static rotation so teeth interlock
  clockwise: boolean;
  outerRadius: number;
  path: string;
};

const pitchRadius = (teeth: number) => (teeth * MODULE) / 2;
const mod = (value: number, by: number) => ((value % by) + by) % by;

function circle(cx: number, cy: number, r: number): string {
  return `M${(cx - r).toFixed(2)} ${cy.toFixed(2)}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
}

/** Outline of a gear centered on (0,0), with a hub hole and lightening holes. */
function gearPath(teeth: number): string {
  const pitch = pitchRadius(teeth);
  const outer = pitch + MODULE;
  const root = pitch - 1.25 * MODULE;
  const step = (Math.PI * 2) / teeth;
  const point = (r: number, a: number) => `${(r * Math.cos(a)).toFixed(2)} ${(r * Math.sin(a)).toFixed(2)}`;

  // Each tooth: root → tip → tip → root (tooth center sits at 0.3 of a step).
  let d = "";
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    d += `${i === 0 ? "M" : "L"}${point(root, a)}L${point(outer, a + step * 0.18)}L${point(outer, a + step * 0.42)}L${point(root, a + step * 0.6)}`;
  }
  d += "Z";

  const hub = Math.max(MODULE * 1.4, pitch * 0.2);
  d += circle(0, 0, hub);

  if (teeth >= 14) {
    const holes = teeth >= 24 ? 6 : 4;
    const ring = (root + hub) / 2;
    const r = (root - hub) * 0.24;
    for (let k = 0; k < holes; k++) {
      const a = (k / holes) * Math.PI * 2;
      d += circle(ring * Math.cos(a), ring * Math.sin(a), r);
    }
  }
  return d;
}

/** Resolve positions, spin directions and interlocking phases. */
function buildGears(): Gear[] {
  const gears: Gear[] = [];
  for (const spec of SPECS) {
    const step = 360 / spec.teeth;
    let x = spec.x ?? CENTER;
    let y = spec.y ?? CENTER;
    let phase = 0;
    let clockwise = true;

    if (spec.parent !== undefined && spec.angle !== undefined) {
      const parent = gears[spec.parent];
      const theta = spec.angle;
      const distance = pitchRadius(parent.teeth) + pitchRadius(spec.teeth);
      x = parent.x + distance * Math.cos((theta * Math.PI) / 180);
      y = parent.y + distance * Math.sin((theta * Math.PI) / 180);
      clockwise = !parent.clockwise;

      // Where along a tooth the contact point falls on the parent (0–1)…
      const parentFraction = mod((theta - parent.phase) / (360 / parent.teeth), 1);
      // …mirrored on the child so a gap faces the parent's tooth.
      const childFraction = mod(0.1 - parentFraction, 1);
      phase = theta + 180 - step * childFraction;
    }

    gears.push({
      teeth: spec.teeth,
      x,
      y,
      phase,
      clockwise,
      outerRadius: pitchRadius(spec.teeth) + MODULE,
      path: gearPath(spec.teeth),
    });
  }
  return gears;
}

const GEARS = buildGears();

export default function GearCluster() {
  return (
    <div className="gear-cluster group relative mx-auto aspect-square w-full max-w-md" aria-hidden="true">
      {/* HUD ring + corner brackets */}
      <div className="absolute inset-4 animate-spin-slow rounded-full border border-dashed border-accent-500/25" />
      <span className="absolute left-0 top-0 h-6 w-6 border-l border-t border-accent-500/60" />
      <span className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-accent-500/60" />

      <svg
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        className="relative h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
      >
        <defs>
          <linearGradient id="gear-metal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: "var(--gear-from)" }} />
            <stop offset="1" style={{ stopColor: "var(--gear-to)" }} />
          </linearGradient>
        </defs>

        {GEARS.map((gear, i) => {
          const dx = gear.x - CENTER;
          const dy = gear.y - CENTER;
          const length = Math.hypot(dx, dy) || 1;
          const drift = length < 30 ? 0 : SPREAD; // anchor gear stays put
          const style = {
            "--dx": `${((dx / length) * drift).toFixed(2)}px`,
            "--dy": `${((dy / length) * drift).toFixed(2)}px`,
            "--spin": `${gear.teeth * SECONDS_PER_TOOTH}s`,
          } as CSSProperties;

          return (
            <g key={i} transform={`translate(${gear.x.toFixed(2)} ${gear.y.toFixed(2)})`}>
              <g className={`gear-expand ${gear.clockwise ? "" : "gear-ccw"}`} style={style}>
                <g className="gear-spin">
                  <g className="gear-boost">
                    <g transform={`rotate(${gear.phase.toFixed(2)})`}>
                      {/* invisible circle keeps the bounding box centered so rotation doesn't wobble */}
                      <circle r={gear.outerRadius + 2} fill="none" />
                      <path className="gear-body" d={gear.path} fillRule="evenodd" />
                      <circle r={Math.max(MODULE * 1.4, pitchRadius(gear.teeth) * 0.2) + 4} fill="none" className="stroke-accent-500/50" strokeWidth="1" />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          );
        })}

        {/* glowing hub on the anchor gear */}
        <circle cx={GEARS[0].x} cy={GEARS[0].y} r="4" className="fill-accent-500 drop-shadow-glow" />
      </svg>
    </div>
  );
}
