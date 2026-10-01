"use client";

import React, { useEffect, useRef } from "react";

const GLYPHS = "01ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿ{}<>/=;$#abcdef";

// Fixed full-page code rain + grid + glow. Sits behind all content.
export default function MatrixBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const FS = 15;
    let cols = 0;
    let drops: number[] = [];
    let bg = "#05070d";
    let fg = "#2fe3a6";
    let raf = 0;
    let last = 0;

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      bg = cs.getPropertyValue("--bg").trim() || bg;
      fg = cs.getPropertyValue("--accent").trim() || fg;
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.ceil(canvas.width / FS);
      drops = Array.from({ length: cols }, () => Math.random() * -60);
      readColors();
    };
    resize();
    window.addEventListener("resize", resize);

    // Full-strength code rain on the hero, easing down to a whisper after it.
    const MIN = 0.12;
    let ticking = false;
    const applyFade = () => {
      ticking = false;
      const p = Math.min(Math.max(window.scrollY / (window.innerHeight * 0.85), 0), 1);
      const f = 1 - p * (1 - MIN);
      canvas.style.setProperty("--rain-fade", f.toFixed(3));
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(applyFade); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    applyFade();

    const mo = new MutationObserver(readColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (document.hidden || t - last < 60) return; // ~16fps, cheap
      last = t;
      ctx.globalAlpha = 0.09;
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      ctx.fillStyle = fg;
      ctx.font = `${FS}px monospace`;
      for (let i = 0; i < cols; i++) {
        if (drops[i] < 0) { drops[i] += 1; continue; }
        const ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        ctx.fillText(ch, i * FS, drops[i] * FS);
        if (drops[i] * FS > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      }
    };

    if (reduce) {
      // one static frame of glyphs
      ctx.fillStyle = fg;
      ctx.font = `${FS}px monospace`;
      for (let i = 0; i < cols; i += 2)
        for (let j = 0; j < 6; j++)
          ctx.fillText(GLYPHS[Math.floor(Math.random() * GLYPHS.length)], i * FS, Math.random() * canvas.height);
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <canvas ref={ref} className="bg-rain" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-aurora" aria-hidden="true"><span /><span /></div>
      <div className="bg-noise" aria-hidden="true" />
    </>
  );
}
