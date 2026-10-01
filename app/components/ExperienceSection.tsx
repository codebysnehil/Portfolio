"use client";

import React from "react";
import { motion } from "framer-motion";
import { jobs, RESUME_URL } from "./data";
import { Reveal, SectionLine } from "./Reveal";

export default function ExperienceSection() {
  return (
    <>
      <style>{`
        .xp { display: grid; grid-template-columns: 200px 1fr; gap: 40px; padding: 32px; margin-bottom: 20px; }
        .xp__meta { font-family: var(--font-mono), monospace; font-size: 13px; color: var(--faint); line-height: 1.7; }
        .xp__logo { height: 24px; width: auto; display: block; margin-bottom: 14px; }
        [data-theme="light"] .xp__logo { filter: invert(1) hue-rotate(180deg); }
        .xp__role { font-size: 1.35rem; font-weight: 600; letter-spacing: -0.02em; margin: 0 0 4px; color: var(--text); }
        .xp__co { color: var(--accent); font-size: 15px; margin: 0 0 14px; }
        .xp__sum { color: var(--muted); font-size: 15.5px; line-height: 1.7; margin: 0 0 18px; max-width: 60ch; }
        .xp__list { list-style: none; padding: 0; margin: 0 0 20px; display: grid; gap: 9px; }
        .xp__list li { position: relative; padding-left: 20px; color: var(--muted); font-size: 14.5px; line-height: 1.65; }
        .xp__list li::before { content: "-"; position: absolute; left: 0; color: var(--accent); font-family: var(--font-mono), monospace; }
        .xp__cta { display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; padding: 22px 28px; }
        .xp__cta p { margin: 0; color: var(--muted); font-size: 15px; }
        .xp__cta b { color: var(--text); font-weight: 500; }
        .xp__stack { display: flex; flex-wrap: wrap; gap: 6px; }
        @media (max-width: 720px) { .xp { grid-template-columns: 1fr; gap: 18px; padding: 24px; } }
      `}</style>

      <section id="experience" className="section">
        <SectionLine />
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow"><b>01</b> / experience</div>
            <h2 className="section-title">Where I&apos;ve worked</h2>
            <p className="section-sub">Two companies, one obsession: software that holds up under real production load.</p>
          </Reveal>

          <div>
            {jobs.map((j, i) => (
              <motion.article
                key={j.company}
                className="xp card card--ticks"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="xp__meta">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="xp__logo" src={j.logo} alt={j.company} />
                  {j.period}
                </div>
                <div>
                  <h3 className="xp__role">{j.role}</h3>
                  <p className="xp__co">{j.company}</p>
                  <p className="xp__sum">{j.summary}</p>
                  <ul className="xp__list">
                    {j.points.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                  <div className="xp__stack">
                    {j.stack.map((t) => <span key={t} className="chip">{t}</span>)}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {RESUME_URL && (
            <Reveal delay={0.05}>
              <div className="xp__cta card">
                <p><b>Want the full picture?</b> Grab the résumé: one page, no fluff.</p>
                <a className="btn btn--primary" href={RESUME_URL} target="_blank" rel="noopener noreferrer" download>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" /></svg>
                  Download résumé
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
