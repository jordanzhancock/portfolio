import { useEffect, useRef } from 'react';

type V3 = [number, number, number];
type Seg = { a: V3; b: V3; hot?: boolean };

const ACCENT = [255, 59, 59];
const LINE = [220, 220, 220];

// ---------- geometry (units are arbitrary; rover is ~2.4 long) ----------
function box(x0: number, x1: number, y0: number, y1: number, z0: number, z1: number, hot = false): Seg[] {
  const c: V3[] = [
    [x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
    [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1],
  ];
  const e = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
  return e.map(([i, j]) => ({ a: c[i], b: c[j], hot }));
}

const WHEEL_R = 0.38;
const WHEELS: V3[] = [
  [-0.85, -0.2, 0.95], [0.85, -0.2, 0.95],
  [-0.85, -0.2, -0.95], [0.85, -0.2, -0.95],
];

function staticSegments(): Seg[] {
  const s: Seg[] = [];
  // chassis
  s.push(...box(-1.2, 1.2, -0.25, 0.12, -0.75, 0.75));
  // axles
  s.push({ a: [-0.85, -0.2, -0.95], b: [-0.85, -0.2, 0.95] }, { a: [0.85, -0.2, -0.95], b: [0.85, -0.2, 0.95] });
  // battery pack with cell grid
  s.push(...box(-0.75, 0.25, 0.12, 0.4, -0.5, 0.5));
  for (let i = 1; i < 5; i++) {
    const x = -0.75 + i * 0.2;
    s.push({ a: [x, 0.4, -0.5], b: [x, 0.4, 0.5] });
  }
  s.push({ a: [-0.75, 0.4, 0], b: [0.25, 0.4, 0] });
  // mast + sensor head
  s.push({ a: [0.75, 0.12, 0], b: [0.75, 0.95, 0] });
  s.push({ a: [0.75, 0.12, 0.15], b: [0.75, 0.6, 0] }, { a: [0.75, 0.12, -0.15], b: [0.75, 0.6, 0] });
  s.push(...box(0.6, 0.95, 0.95, 1.15, -0.28, 0.28));
  // "eyes" on the sensor head
  s.push(...box(0.95, 0.98, 1.0, 1.1, 0.08, 0.2, true));
  s.push(...box(0.95, 0.98, 1.0, 1.1, -0.2, -0.08, true));
  // antenna
  s.push({ a: [-1.0, 0.12, -0.6], b: [-1.0, 1.0, -0.6] });
  return s;
}

function wheelSegments(spin: number): Seg[] {
  const s: Seg[] = [];
  const N = 18;
  for (const [cx, cy, cz] of WHEELS) {
    const side = Math.sign(cz);
    for (const dz of [-0.11, 0.11]) {
      for (let i = 0; i < N; i++) {
        const t0 = (i / N) * Math.PI * 2;
        const t1 = ((i + 1) / N) * Math.PI * 2;
        s.push({
          a: [cx + Math.cos(t0) * WHEEL_R, cy + Math.sin(t0) * WHEEL_R, cz + dz],
          b: [cx + Math.cos(t1) * WHEEL_R, cy + Math.sin(t1) * WHEEL_R, cz + dz],
          hot: true,
        });
      }
    }
    // tread lines + spokes rotate with the wheel
    for (let i = 0; i < 6; i++) {
      const t = spin + (i / 6) * Math.PI * 2;
      const x = cx + Math.cos(t) * WHEEL_R;
      const y = cy + Math.sin(t) * WHEEL_R;
      s.push({ a: [x, y, cz - 0.11], b: [x, y, cz + 0.11], hot: true });
      if (i % 2 === 0) {
        s.push({ a: [cx, cy, cz + side * 0.11], b: [cx + Math.cos(t) * WHEEL_R * 0.55, cy + Math.sin(t) * WHEEL_R * 0.55, cz + side * 0.11] });
      }
    }
  }
  return s;
}

// floor of dots that scrolls under the rover so it looks like it is driving
function floorDots(offset: number): V3[] {
  const d: V3[] = [];
  const step = 0.4;
  for (let x = -3.2; x <= 3.2; x += step) {
    for (let z = -2.4; z <= 2.4; z += step) {
      const xx = ((x + offset + 3.2) % 6.4 + 6.4) % 6.4 - 3.2;
      d.push([xx, -0.58, z]);
    }
  }
  return d;
}

const STATIC = staticSegments();

export default function WireframeRover() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const readout = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cv = canvas.current!;
    const ctx = cv.getContext('2d')!;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, dpr = 1;
    let raf = 0;
    let visible = true;
    let yaw = -0.6, tilt = 0.38;
    let targetYawOffset = 0, targetTilt = 0.38, yawOffset = 0;
    const start = performance.now();

    const resize = () => {
      const r = cv.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
    };

    const project = ([x, y, z]: V3): [number, number, number] => {
      const cy = Math.cos(yaw + yawOffset), sy = Math.sin(yaw + yawOffset);
      const x1 = x * cy - z * sy;
      const z1 = x * sy + z * cy;
      const ct = Math.cos(tilt), st = Math.sin(tilt);
      const y1 = (y - 0.25) * ct - z1 * st;
      const z2 = (y - 0.25) * st + z1 * ct;
      const cam = 6;
      const f = Math.min(w, h * 1.25) * 1.12;
      const p = f / (cam - z2);
      return [w / 2 + x1 * p, h / 2 - y1 * p, z2];
    };

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      if (!reduced) yaw = -0.6 + t * 0.25;
      yawOffset += (targetYawOffset - yawOffset) * 0.05;
      tilt += (targetTilt - tilt) * 0.05;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // floor
      for (const pt of floorDots(reduced ? 0 : -t * 0.6)) {
        const [px, py, pz] = project(pt);
        const a = Math.max(0, Math.min(1, 0.35 + pz * 0.12)) * Math.max(0, 1 - Math.hypot(pt[0], pt[2]) / 3.4);
        if (a <= 0.01) continue;
        ctx.fillStyle = `rgba(${LINE},${a * 0.6})`;
        ctx.fillRect(px - 1, py - 1, 2, 2);
      }

      // rover
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';
      const segs = STATIC.concat(wheelSegments(reduced ? 0 : -t * 3));
      for (const s of segs) {
        const [ax, ay, az] = project(s.a);
        const [bx, by, bz] = project(s.b);
        const depth = Math.max(0.18, Math.min(1, 0.6 + ((az + bz) / 2) * 0.22));
        ctx.strokeStyle = `rgba(${s.hot ? ACCENT : LINE},${depth})`;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }

      // blinking status LED on the antenna tip
      const [lx, ly] = project([-1.0, 1.0, -0.6]);
      const on = reduced || Math.sin(t * 4) > 0;
      if (on) {
        ctx.fillStyle = `rgb(${ACCENT})`;
        ctx.shadowColor = `rgb(${ACCENT})`;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(lx, ly, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (readout.current) {
        const deg = ((((yaw + yawOffset) * 180) / Math.PI) % 360 + 360) % 360;
        readout.current.textContent = `yaw ${deg.toFixed(0).padStart(3, '0')}°  tilt ${((tilt * 180) / Math.PI).toFixed(0)}°  rpm ${reduced ? 0 : 29}`;
      }

      if (!reduced && visible) raf = requestAnimationFrame(draw);
    };

    const onPointer = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      targetYawOffset = nx * 0.8;
      targetTilt = 0.38 + ny * 0.35;
      if (reduced) requestAnimationFrame(draw);
    };
    const onLeave = () => { targetYawOffset = 0; targetTilt = 0.38; };

    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was && !reduced) raf = requestAnimationFrame(draw);
    });

    const ro = new ResizeObserver(() => { resize(); if (reduced || !visible) draw(performance.now()); });
    resize();
    ro.observe(cv);
    io.observe(cv);
    const el = wrap.current!;
    el.addEventListener('pointermove', onPointer);
    el.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener('pointermove', onPointer);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={wrap} className="wire" role="img" aria-label="A rotating wireframe drawing of the hoverboard rover Jordan is building">
      <canvas ref={canvas} className="wire-canvas" />
      <div className="wire-hud" aria-hidden="true">
        <span className="wire-tl">fig. 00 · rover_v0.wire</span>
        <span className="wire-tr"><i className="dot" /> building</span>
        <span className="wire-bl" ref={readout}>yaw 000°</span>
        <span className="wire-br">hub motors ×4 · li-ion</span>
      </div>
    </div>
  );
}
