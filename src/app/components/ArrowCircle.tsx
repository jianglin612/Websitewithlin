import React, { useEffect, useRef, useState } from 'react';

const NUM = 24;
const S = 1.2;
const AW = 40 * S;  // 48px — minimum spacing between arrow centers must exceed this
const GAP = AW * 1.35; // ~65px safe spacing
const HOLD = 3.0;
const MORPH = 2.0;

type Arrow = { x: number; y: number; angleDeg: number };

function lerpAngle(a: number, b: number, t: number) {
  const diff = ((b - a + 540) % 360) - 180;
  return a + diff * t;
}

function easeInOut(t: number) {
  t = Math.max(0, Math.min(1, t));
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function inward(px: number, py: number, cx: number, cy: number) {
  return Math.atan2(cy - py, cx - px) * (180 / Math.PI);
}

function assignTargets(from: Arrow[], to: Arrow[]): number[] {
  const n = from.length;
  const pairs: { i: number; j: number; d: number }[] = [];
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) {
      const dx = from[i].x - to[j].x, dy = from[i].y - to[j].y;
      pairs.push({ i, j, d: dx * dx + dy * dy });
    }
  pairs.sort((a, b) => a.d - b.d);
  const usedF = new Set<number>(), usedT = new Set<number>();
  const map = Array.from({ length: n }, (_, i) => i);
  for (const { i, j } of pairs) {
    if (!usedF.has(i) && !usedT.has(j)) { map[i] = j; usedF.add(i); usedT.add(j); }
    if (usedF.size === n) break;
  }
  return map;
}

// 24 arrows evenly spaced on a circle
function shapeCircle(cx: number, cy: number, r: number): Arrow[] {
  return Array.from({ length: NUM }, (_, i) => {
    const a = (i / NUM) * 2 * Math.PI;
    const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
    return { x, y, angleDeg: inward(x, y, cx, cy) };
  });
}

// Two concentric rings: 16 outer + 8 inner
function shapeDoubleRing(cx: number, cy: number): Arrow[] {
  const outerN = 16, innerN = 8;
  return [
    ...Array.from({ length: outerN }, (_, i) => {
      const a = (i / outerN) * 2 * Math.PI;
      const x = cx + 190 * Math.cos(a), y = cy + 190 * Math.sin(a);
      return { x, y, angleDeg: inward(x, y, cx, cy) };
    }),
    ...Array.from({ length: innerN }, (_, i) => {
      const a = (i / innerN) * 2 * Math.PI;
      const x = cx + 95 * Math.cos(a), y = cy + 95 * Math.sin(a);
      return { x, y, angleDeg: inward(x, y, cx, cy) + 180 };
    }),
  ];
}

// 4 rows × 6 cols = 24, all pointing left
function shapeHorizontalLines(cx: number, cy: number): Arrow[] {
  const cols = 6, rows = 4;
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({
      x: cx - (cols - 1) * GAP / 2 + c * GAP,
      y: cy - (rows - 1) * GAP / 2 + r * GAP,
      angleDeg: 180,
    }))
  ).flat();
}

// 4 cols × 6 rows = 24, all pointing up
function shapeVerticalLines(cx: number, cy: number): Arrow[] {
  const cols = 4, rows = 6;
  return Array.from({ length: cols }, (_, c) =>
    Array.from({ length: rows }, (_, r) => ({
      x: cx - (cols - 1) * GAP / 2 + c * GAP,
      y: cy - (rows - 1) * GAP / 2 + r * GAP,
      angleDeg: 270,
    }))
  ).flat();
}

// Double chevron ">>" — two ">" shapes, each with 2 arms of 6 arrows = 24 total
// Arms are diagonal lines; top arm goes up-right, bottom arm goes down-right.
// To avoid x-overlap between top and bottom arms, they are placed on separate diagonal tracks.
function shapeChevron(cx: number, cy: number): Arrow[] {
  const armLen = 6;
  const step = GAP * 1.05; // slightly over GAP so dyStep (=step*sin45) exceeds AW

  // Each chevron: tip at tipX, arms fan out up-left and down-left at 45°
  // dx per step = -step*cos45, dy per step = ±step*sin45
  const dxStep = step * Math.cos(Math.PI / 4);
  const dyStep = step * Math.sin(Math.PI / 4);

  const chevronTips = [cx + GAP * 1.6, cx - GAP * 0.4];
  const pts: Arrow[] = [];

  for (const tipX of chevronTips) {
    for (let i = 0; i < armLen; i++) {
      const t = i + 0.5;
      pts.push({ x: tipX - t * dxStep, y: cy - t * dyStep, angleDeg: -45 });
    }
    for (let i = 0; i < armLen; i++) {
      const t = i + 0.5;
      pts.push({ x: tipX - t * dxStep, y: cy + t * dyStep, angleDeg: 45 });
    }
  }
  return pts; // 2 chevrons × 2 arms × 6 = 24
}

// Spiral — 1.5 turns. r0=140 ensures the radial gap between cross-turn neighbors
// (dr × steps_per_turn = dr×16) stays above AW, eliminating all overlaps.
function shapeSpiral(cx: number, cy: number): Arrow[] {
  const dTheta = (1.5 * 2 * Math.PI) / NUM;
  const r0 = 140, dr = (230 - 140) / (NUM - 1);
  return Array.from({ length: NUM }, (_, i) => {
    const a = i * dTheta;
    const r = r0 + dr * i;
    const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
    return { x, y, angleDeg: a * (180 / Math.PI) + 90 };
  });
}

// Sunflower / filled disc — golden-angle phyllotaxis, guaranteed no overlap
function shapeFilledCircle(cx: number, cy: number): Arrow[] {
  const golden = 2.399963;
  // Scale so outermost arrow sits ~185px from center
  const scale = 185 / Math.sqrt((NUM - 0.5) / NUM) / Math.sqrt(NUM);
  return Array.from({ length: NUM }, (_, i) => {
    const r = scale * Math.sqrt(i + 0.5);
    const a = i * golden;
    const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
    return { x, y, angleDeg: inward(x, y, cx, cy) + 180 };
  });
}

// Lit duration: starts at 2200ms, floors at 500ms as score rises
function litDuration(score: number) {
  return Math.max(500, 2200 - score * 80);
}

export default function ArrowCircle({ size = 540, className = '' }: { size?: number; className?: string }) {
  const cx = size / 2, cy = size / 2;

  const shapesRef = useRef<Arrow[][]>([]);
  const mappingsRef = useRef<number[][]>([]);
  const elapsedRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);

  if (shapesRef.current.length === 0) {
    const s = [
      shapeCircle(cx, cy, 190),
      shapeHorizontalLines(cx, cy),
      shapeChevron(cx, cy),
      shapeVerticalLines(cx, cy),
      shapeDoubleRing(cx, cy),
      shapeSpiral(cx, cy),
      shapeFilledCircle(cx, cy),
    ];
    shapesRef.current = s;
    mappingsRef.current = s.map((from, i) => assignTargets(from, s[(i + 1) % s.length]));
  }

  const [arrows, setArrows] = useState<Arrow[]>(shapesRef.current[0]);

  // Game state
  const [litIndex, setLitIndex] = useState<number>(() => Math.floor(Math.random() * NUM));
  const [score, setScore] = useState(0);
  const [burstIndex, setBurstIndex] = useState<number | null>(null);
  const [burstPhase, setBurstPhase] = useState(0);
  const [displayedScore, setDisplayedScore] = useState(0);
  const [hasScored, setHasScored] = useState(false);
  const burstRafRef = useRef<number | null>(null);
  const burstStartRef = useRef<number>(0);
  const litTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scoreRef = useRef(score);
  const lastSegRef = useRef(-1);
  scoreRef.current = score;

  const scheduleNext = (currentScore: number) => {
    if (litTimerRef.current) clearTimeout(litTimerRef.current);
    litTimerRef.current = setTimeout(function cycle() {
      setLitIndex(prev => {
        let next = Math.floor(Math.random() * NUM);
        while (next === prev) next = Math.floor(Math.random() * NUM);
        return next;
      });
      litTimerRef.current = setTimeout(cycle, litDuration(scoreRef.current));
    }, litDuration(currentScore));
  };

  useEffect(() => {
    scheduleNext(0);
    return () => { if (litTimerRef.current) clearTimeout(litTimerRef.current); };
  }, []);

  const triggerBurst = (idx: number) => {
    if (burstRafRef.current) cancelAnimationFrame(burstRafRef.current);
    setBurstIndex(idx);
    setBurstPhase(0);
    burstStartRef.current = performance.now();
    const duration = 320;
    const animate = (now: number) => {
      const p = Math.min((now - burstStartRef.current) / duration, 1);
      setBurstPhase(p);
      if (p < 1) {
        burstRafRef.current = requestAnimationFrame(animate);
      } else {
        setBurstIndex(null);
        setBurstPhase(0);
      }
    };
    burstRafRef.current = requestAnimationFrame(animate);
  };

  const handleArrowClick = (i: number) => {
    if (i === litIndex) {
      const newScore = scoreRef.current + 1;
      setScore(newScore);
      setDisplayedScore(newScore);
      setHasScored(true);
      triggerBurst(i);
      setLitIndex(prev => {
        let next = Math.floor(Math.random() * NUM);
        while (next === prev) next = Math.floor(Math.random() * NUM);
        return next;
      });
      scheduleNext(newScore);
    }
  };

  useEffect(() => {
    const shapes = shapesRef.current;
    const mappings = mappingsRef.current;
    const total = shapes.length;
    const cycleLen = HOLD + MORPH;

    function tick(ts: number) {
      if (lastTsRef.current !== null) {
        const dt = Math.min((ts - lastTsRef.current) / 1000, 0.05);
        elapsedRef.current += dt;
      }
      lastTsRef.current = ts;

      const t = elapsedRef.current % (cycleLen * total);
      const seg = Math.floor(t / cycleLen) % total;
      const segT = t - seg * cycleLen;
      const morphT = segT < HOLD ? 0 : easeInOut((segT - HOLD) / MORPH);

      // Reset displayed score when the cycle returns to shape 0 (the circle)
      if (seg === 0 && lastSegRef.current !== 0 && lastSegRef.current !== -1) {
        setDisplayedScore(0);
      }
      lastSegRef.current = seg;

      const from = shapes[seg];
      const to = shapes[(seg + 1) % total];
      const map = mappings[seg];

      setArrows(
        from.map((f, i) => {
          const tgt = to[map[i]];
          return {
            x: f.x + (tgt.x - f.x) * morphT,
            y: f.y + (tgt.y - f.y) * morphT,
            angleDeg: lerpAngle(f.angleDeg, tgt.angleDeg, morphT),
          };
        })
      );

      rafRef.current = requestAnimationFrame(tick);
    }

    const rafRef = { current: requestAnimationFrame(tick) };
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className}>
        {arrows.map(({ x, y, angleDeg }, i) => {
          const tx = x - 21 * S, ty = y - 20 * S;
          const isLit = i === litIndex;
          const isBursting = i === burstIndex;

          // Burst: arrow briefly scales up then fades (scale peaks at p=0.3, fades to 1 by p=1)
          const burstScale = isBursting
            ? 1 + 0.45 * Math.sin(burstPhase * Math.PI)
            : 1;
          const burstOpacity = isBursting
            ? 1 - burstPhase * 0.3
            : 1;

          const color = isLit ? '#7fffd4' : 'white';
          const strokeW = isLit ? 3 * S : 2.5 * S;

          return (
            <g
              key={i}
              transform={`translate(${tx} ${ty}) rotate(${angleDeg} ${21 * S} ${20 * S})`}
              onClick={() => handleArrowClick(i)}
              style={{ cursor: 'pointer' }}
            >
              <rect x={10 * S} y={9 * S} width={22 * S} height={22 * S} fill="transparent" />
              <g
                transform={`scale(${burstScale})`}
                style={{ transformOrigin: `${21 * S}px ${20 * S}px` }}
                opacity={burstOpacity}
              >
                <line x1={30*S} y1={20*S} x2={12*S} y2={20*S}
                  stroke={isBursting ? '#7fffd4' : color}
                  strokeWidth={strokeW} strokeLinecap="round" />
                <polyline points={`${20*S},${11*S} ${12*S},${20*S} ${20*S},${29*S}`}
                  fill="none" stroke={isBursting ? '#7fffd4' : color}
                  strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </g>
          );
        })}
      </svg>
      {hasScored && (
        <div
          style={{
            position: 'absolute',
            bottom: 18,
            right: 22,
            color: 'rgba(127,255,212,0.55)',
            fontFamily: 'monospace',
            fontSize: 13,
            letterSpacing: '0.1em',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {displayedScore}
        </div>
      )}
    </div>
  );
}
