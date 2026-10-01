"use client";

import React from "react";
import { skills } from "./data";
import { Reveal, SectionLine } from "./Reveal";

export default function SkillsSection() {
  return (
    <>
      <style>{`
        .sk { display: grid; grid-template-columns: repeat(6, 1fr); gap: 20px; }
        .sk__cell { padding: 26px 28px 28px; height: 100%; }
        .sk__w { grid-column: span 2; }
        .sk__w:nth-child(n+4) { grid-column: span 3; }
        .sk__t { font-size: 1.05rem; font-weight: 600; letter-spacing: -0.01em; margin: 0; color: var(--text); }
        .sk__s { font-family: var(--font-mono), monospace; font-size: 12px; color: var(--accent); margin: 4px 0 18px; }
        .sk__l { display: flex; flex-wrap: wrap; gap: 8px; }
        .sk__l .chip { font-size: 12.5px; padding: 5px 12px; transition: color .15s, border-color .15s; }
        .sk__l .chip:hover { color: var(--text); border-color: var(--accent-border); }
        @media (max-width: 900px) { .sk__w, .sk__w:nth-child(n+4) { grid-column: span 3; } .sk__w:last-child { grid-column: span 6; } }
        @media (max-width: 640px) { .sk__w, .sk__w:nth-child(n+4), .sk__w:last-child { grid-column: span 6; } }
      `}</style>

      <section id="skills" className="section">
        <SectionLine />
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow"><b>03</b> / stack</div>
            <h2 className="section-title">What I work with</h2>
          </Reveal>
          <div className="sk">
            {skills.map((s, idx) => (
              <Reveal key={s.title} className="sk__w" delay={(idx % 3) * 0.08}>
                <div className="sk__cell card card--ticks">
                  <h3 className="sk__t">{s.title}</h3>
                  <p className="sk__s">{s.sub}</p>
                  <div className="sk__l">
                    {s.items.map((i) => <span key={i} className="chip">{i}</span>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
