"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { LAND } from "./landData";

const D2R = Math.PI / 180;
const HOME = { lat: 28.4595, lon: 77.0266, label: "Gurugram, IN" };

const fmt = (v: number, pos: string, neg: string) =>
  `${Math.abs(v).toFixed(1)}° ${v >= 0 ? pos : neg}`;

const wrapLon = (l: number) => ((((l + 180) % 360) + 360) % 360) - 180;

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // view state lives in a ref so the render loop never re-renders React
  const view = useRef({
    lat: 18,
    lon: 40,
    vLat: 0,
    vLon: 0,
    dragging: false,
    lastInteract: 0,
    tween: null as null | { t0: number; dur: number; fromLat: number; fromLon: number; toLat: number; toLon: number },
  });

  const [readout, setReadout] = useState({ lat: 18, lon: 40 });
  const [grabbing, setGrabbing] = useState(false);

  const goHome = useCallback(() => {
    const v = view.current;
    v.tween = {
      t0: performance.now(),
      dur: 1100,
      fromLat: v.lat,
      fromLon: v.lon,
      toLat: HOME.lat - 6,
      // shortest way round
      toLon: v.lon + wrapLon(HOME.lon - v.lon),
    };
    v.vLat = v.vLon = 0;
    v.lastInteract = performance.now();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // precompute trig for every land sample
    const n = LAND.length / 2;
    const sinP = new Float32Array(n);
    const cosP = new Float32Array(n);
    const lam = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const p = LAND[i * 2] * D2R;
      sinP[i] = Math.sin(p);
      cosP[i] = Math.cos(p);
      lam[i] = LAND[i * 2 + 1] * D2R;
    }

    let colors = { text: "#e5e9f0", accent: "#2fe3a6", border: "rgba(255,255,255,.2)", surface: "#131a2c", faint: "#6b7688" };
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      const g = (k: string, d: string) => cs.getPropertyValue(k).trim() || d;
      colors = {
        text: g("--text", colors.text),
        accent: g("--accent", colors.accent),
        border: g("--border-bright", colors.border),
        surface: g("--surface", colors.surface),
        faint: g("--faint", colors.faint),
      };
    };
    readColors();
    const mo = new MutationObserver(readColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    let size = 0;
    const resize = () => {
      size = wrap.clientWidth;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
    io.observe(wrap);

    // ---- pointer control ----
    const v = view.current;
    let px = 0, py = 0, pt = 0;
    const R = () => size * 0.44;
    const degPerPx = () => (180 / Math.PI) / R();

    const down = (e: PointerEvent) => {
      canvas.setPointerCapture(e.pointerId);
      v.dragging = true;
      v.tween = null;
      v.vLat = v.vLon = 0;
      px = e.clientX; py = e.clientY; pt = performance.now();
      setGrabbing(true);
    };
    const move = (e: PointerEvent) => {
      if (!v.dragging) return;
      const now = performance.now();
      const dx = e.clientX - px, dy = e.clientY - py;
      const k = degPerPx();
      v.lon -= dx * k;
      v.lat = Math.max(-75, Math.min(75, v.lat + dy * k));
      const dt = Math.max(now - pt, 1) / 1000;
      // smoothed release velocity, deg/s
      v.vLon = 0.6 * v.vLon + 0.4 * (-dx * k) / dt;
      v.vLat = 0.6 * v.vLat + 0.4 * (dy * k) / dt;
      px = e.clientX; py = e.clientY; pt = now;
      v.lastInteract = now;
    };
    const up = (e: PointerEvent) => {
      if (!v.dragging) return;
      v.dragging = false;
      v.lastInteract = performance.now();
      try { canvas.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
      // a held-still release shouldn't fling
      if (performance.now() - pt > 90) v.vLon = v.vLat = 0;
      setGrabbing(false);
    };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);

    // ---- render loop ----
    let raf = 0;
    let last = performance.now();
    let lastReadout = 0;

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible) { last = now; return; }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      // motion
      if (v.tween) {
        const t = Math.min((now - v.tween.t0) / v.tween.dur, 1);
        const e = 1 - Math.pow(1 - t, 3);
        v.lat = v.tween.fromLat + (v.tween.toLat - v.tween.fromLat) * e;
        v.lon = v.tween.fromLon + (v.tween.toLon - v.tween.fromLon) * e;
        if (t >= 1) v.tween = null;
      } else if (!v.dragging) {
        v.lon += v.vLon * dt;
        v.lat = Math.max(-75, Math.min(75, v.lat + v.vLat * dt));
        const decay = Math.pow(0.04, dt); // ~ fast ease-out
        v.vLon *= decay; v.vLat *= decay;
        if (!reduced && now - v.lastInteract > 2500) {
          // drift back toward a gentle tilt while auto-rotating
          v.lon += 7 * dt;
          v.lat += (16 - v.lat) * Math.min(dt * 0.6, 1);
        }
      }
      v.lon = wrapLon(v.lon);

      const lat0 = v.lat * D2R, lon0 = v.lon * D2R;
      const s0 = Math.sin(lat0), c0 = Math.cos(lat0);
      const r = R();
      const cx = size / 2, cy = size / 2;

      ctx.clearRect(0, 0, size, size);

      // sphere
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = colors.surface;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = colors.border;
      ctx.stroke();

      // graticule every 30°
      ctx.strokeStyle = colors.border;
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 0.6;
      const trace = (pts: Array<[number, number]>) => {
        let pen = false;
        ctx.beginPath();
        for (const [phi, lmb] of pts) {
          const dl = lmb - lon0;
          const cosc = s0 * Math.sin(phi) + c0 * Math.cos(phi) * Math.cos(dl);
          if (cosc <= 0) { pen = false; continue; }
          const x = cx + r * Math.cos(phi) * Math.sin(dl);
          const y = cy - r * (c0 * Math.sin(phi) - s0 * Math.cos(phi) * Math.cos(dl));
          if (!pen) { ctx.moveTo(x, y); pen = true; } else ctx.lineTo(x, y);
        }
        ctx.stroke();
      };
      for (let lat = -60; lat <= 60; lat += 30) {
        const line: Array<[number, number]> = [];
        for (let lo = -180; lo <= 180; lo += 4) line.push([lat * D2R, lo * D2R]);
        trace(line);
      }
      for (let lo = -180; lo < 180; lo += 30) {
        const line: Array<[number, number]> = [];
        for (let la = -90; la <= 90; la += 4) line.push([la * D2R, lo * D2R]);
        trace(line);
      }
      ctx.globalAlpha = 1;

      // land
      ctx.fillStyle = colors.text;
      for (let i = 0; i < n; i++) {
        const dl = lam[i] - lon0;
        const cd = Math.cos(dl);
        const cosc = s0 * sinP[i] + c0 * cosP[i] * cd;
        if (cosc <= 0.02) continue;
        const x = cx + r * cosP[i] * Math.sin(dl);
        const y = cy - r * (c0 * sinP[i] - s0 * cosP[i] * cd);
        ctx.globalAlpha = 0.16 + 0.78 * Math.pow(cosc, 0.7);
        const rad = 0.7 + 1.05 * cosc;
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, 6.2832);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // home marker
      {
        const phi = HOME.lat * D2R, lmb = HOME.lon * D2R;
        const dl = lmb - lon0;
        const cosc = s0 * Math.sin(phi) + c0 * Math.cos(phi) * Math.cos(dl);
        if (cosc > 0.05) {
          const x = cx + r * Math.cos(phi) * Math.sin(dl);
          const y = cy - r * (c0 * Math.sin(phi) - s0 * Math.cos(phi) * Math.cos(dl));
          const pulse = ((now / 1600) % 1);
          ctx.strokeStyle = colors.accent;
          ctx.globalAlpha = (1 - pulse) * 0.7;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(x, y, 4 + pulse * 14, 0, 6.2832);
          ctx.stroke();
          ctx.globalAlpha = 1;
          ctx.fillStyle = colors.accent;
          ctx.beginPath();
          ctx.arc(x, y, 3.6, 0, 6.2832);
          ctx.fill();

          // label
          const lx = x + 16, ly = y - 18;
          ctx.strokeStyle = colors.accent;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x + 3, y - 3);
          ctx.lineTo(lx - 4, ly + 4);
          ctx.stroke();
          ctx.font = "500 11px ui-monospace, Menlo, Consolas, monospace";
          ctx.globalAlpha = Math.min(1, (cosc - 0.05) * 6);
          ctx.lineJoin = "round";
          ctx.lineWidth = 4;
          ctx.strokeStyle = colors.surface;
          ctx.strokeText(HOME.label, lx, ly + 3);
          ctx.fillStyle = colors.accent;
          ctx.fillText(HOME.label, lx, ly + 3);
          ctx.globalAlpha = 1;
        }
      }

      if (now - lastReadout > 120) {
        lastReadout = now;
        setReadout({ lat: v.lat, lon: v.lon });
      }
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <div className="globe">
      <style>{`
        .globe { width: 100%; display: flex; flex-direction: column; align-items: center; }
        .globe__stage {
          position: relative; width: 100%; max-width: 440px; aspect-ratio: 1/1; margin: 0 auto;
        }
        .globe__stage canvas {
          display: block; touch-action: pan-y; user-select: none; -webkit-user-select: none;
          cursor: grab;
        }
        .globe__stage canvas.is-grabbing { cursor: grabbing; }
        .globe__meta {
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
          max-width: 440px; margin: 10px auto 0;
          font-family: var(--font-mono), monospace; font-size: 12px; color: var(--faint);
        }
        .globe__coords { font-variant-numeric: tabular-nums; }
        .globe__btn {
          font: inherit; color: var(--muted); background: none; cursor: pointer;
          border: 1px solid var(--border); border-radius: var(--radius); padding: 5px 10px;
          transition: color .15s, border-color .15s;
        }
        .globe__btn:hover { color: var(--accent); border-color: var(--accent-border); }
      `}</style>

      <div ref={wrapRef} className="globe__stage">
        <canvas
          ref={canvasRef}
          className={grabbing ? "is-grabbing" : ""}
          role="img"
          aria-label="Interactive globe. Drag to rotate. Marker shows Gurugram, India."
        />
      </div>
      <div className="globe__meta">
        <span className="globe__coords">
          {fmt(readout.lat, "N", "S")} &nbsp; {fmt(readout.lon, "E", "W")}
        </span>
        <button className="globe__btn" onClick={goHome} type="button">
          find gurugram
        </button>
      </div>
    </div>
  );
}
