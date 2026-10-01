"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { stats, marquee } from "./data";
import { Reveal } from "./Reveal";

function Count({ prefix = "", to, suffix = "" }: { prefix?: string; to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.3, ease: "easeOut", onUpdate: (x) => setV(x) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {prefix}
      {Math.round(v)}
      {suffix}
    </span>
  );
}

export default function StatsStrip() {
  const loop = [...marquee, ...marquee];
  return (
    <>
      <style>{`
        .st { padding: 56px 0 0; }
        .st__grid { display: grid; grid-template-columns: repeat(3, 1fr); padding: 8px 0; }
        .st__cell { padding: 22px 26px; border-right: 1px solid var(--border); }
        .st__cell:last-child { border-right: 0; }
        .st__v { font-size: clamp(1.8rem, 3.4vw, 2.6rem); font-weight: 600; letter-spacing: -0.03em; line-height: 1.1; color: var(--text); }
        .st__v em { font-style: normal; color: var(--accent); }
        .st__l { font-family: var(--font-mono), monospace; font-size: 12px; color: var(--faint); margin-top: 6px; }

        .mq { margin-top: 44px; overflow: hidden; padding: 16px 0;
          border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
        .mq__track { display: flex; width: max-content; animation: mq 46s linear infinite; }
        .mq:hover .mq__track { animation-play-state: paused; }
        .mq__item { display: inline-flex; align-items: center; gap: 22px; padding-right: 22px;
          font-family: var(--font-mono), monospace; font-size: 13.5px; color: var(--muted); white-space: nowrap; }
        .mq__item i { font-style: normal; color: var(--accent); font-size: 11px; }
        @keyframes mq { to { transform: translateX(-50%); } }
        @media (max-width: 640px) {
          .st__grid { grid-template-columns: 1fr; }
          .st__cell { border-right: 0 !important; border-bottom: 1px solid var(--border); }
          .st__cell:last-child { border-bottom: 0; }
        }
      `}</style>

      <div className="st">
        <div className="container">
          <Reveal>
            <div className="st__grid card">
              {stats.map((s) => (
                <div key={s.label} className="st__cell">
                  <div className="st__v">
                    <Count prefix={s.prefix} to={s.to} suffix={s.suffix} />
                  </div>
                  <div className="st__l">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="mq" aria-hidden="true">
          <div className="mq__track">
            {loop.map((t, i) => (
              <span key={i} className="mq__item">
                {t}
                <i>✦</i>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
