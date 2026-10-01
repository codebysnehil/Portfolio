"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "./data";
import { Reveal, SectionLine } from "./Reveal";

export default function ProjectsSection() {
  const [active, setActive] = useState(0);
  const p = projects[active];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, projects.length - 1));
    }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    }
  };

  return (
    <>
      <style>{`
        .pj { display: grid; grid-template-columns: 0.9fr 1.25fr; gap: 56px; align-items: start; }
        .pj__list { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
        .pj__row {
          display: grid; grid-template-columns: 34px 1fr auto; gap: 8px; align-items: baseline;
          width: 100%; text-align: left; background: none; color: inherit; font: inherit; cursor: pointer;
          padding: 16px 18px; border: 1px solid var(--border); border-radius: var(--radius);
          background: var(--surface);
          transition: padding-left .2s ease, color .15s, border-color .2s, box-shadow .2s;
        }
        .pj__row:hover { border-color: var(--border-bright); }
        .pj__row[aria-selected="true"] { padding-left: 24px; border-color: var(--accent-border); box-shadow: var(--glow); }
        .pj__n { font-family: var(--font-mono), monospace; font-size: 12px; color: var(--faint); }
        .pj__t { font-size: 1.15rem; font-weight: 500; letter-spacing: -0.015em; color: var(--muted); transition: color .15s; }
        .pj__row:hover .pj__t { color: var(--text); }
        .pj__row[aria-selected="true"] .pj__t { color: var(--text); }
        .pj__row[aria-selected="true"] .pj__n { color: var(--accent); }
        .pj__y { font-family: var(--font-mono), monospace; font-size: 12px; color: var(--faint); }

        .pj__panel { position: sticky; top: 96px; min-height: 420px; padding: 28px; }
        .pj__meta { font-family: var(--font-mono), monospace; font-size: 12.5px; color: var(--faint); margin-bottom: 10px; }
        .pj__title { font-size: clamp(1.5rem, 2.6vw, 2rem); font-weight: 600; letter-spacing: -0.025em; line-height: 1.15; margin: 0 0 6px; }
        .pj__role { color: var(--accent); font-size: 14.5px; margin: 0 0 18px; }
        .pj__shot { border: 1px solid var(--border-bright); border-radius: var(--radius-sm); overflow: hidden; margin: 0 0 22px; background: var(--surface); }
        .pj__shot img { display: block; width: 100%; height: auto; }
        .pj__sum { color: var(--text); font-size: 16px; line-height: 1.7; margin: 0 0 22px; max-width: 58ch; }
        .pj__k { font-family: var(--font-mono), monospace; font-size: 12px; color: var(--faint); margin: 0 0 6px; }
        .pj__p { color: var(--muted); font-size: 14.5px; line-height: 1.7; margin: 0 0 18px; max-width: 58ch; }
        .pj__built { list-style: none; padding: 0; margin: 0 0 22px; display: grid; gap: 7px; }
        .pj__built li { position: relative; padding-left: 20px; color: var(--muted); font-size: 14.5px; line-height: 1.6; }
        .pj__built li::before { content: "-"; position: absolute; left: 0; color: var(--accent); font-family: var(--font-mono), monospace; }
        .pj__stack { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 22px; }
        .pj__links { display: flex; gap: 10px; }
        @media (max-width: 900px) {
          .pj { grid-template-columns: 1fr; gap: 36px; }
          .pj__panel { position: static; min-height: 0; padding: 20px; }
        }
      `}</style>

      <section id="projects" className="section">
        <SectionLine />
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow"><b>02</b> / projects</div>
            <h2 className="section-title">Things I&apos;ve built</h2>
            <p className="section-sub">
              Six projects, from production streaming infrastructure to LLM-powered tools. Hover or tap one for the case study; arrow keys work too.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
          <div className="pj">
            <ul className="pj__list" role="listbox" aria-label="Projects" onKeyDown={onKey}>
              {projects.map((pr, i) => (
                <li key={pr.id}>
                  <button
                    className="pj__row"
                    role="option"
                    aria-selected={i === active}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                  >
                    <span className="pj__n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="pj__t">{pr.title}</span>
                    <span className="pj__y">{pr.year}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="pj__panel card card--ticks" aria-live="polite">
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="pj__meta">{p.category} · {p.year}</div>
                  <h3 className="pj__title">{p.title}</h3>
                  <p className="pj__role">{p.role}</p>

                  {p.image && (
                    <div className="pj__shot">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.image} alt={`${p.title} screenshot`} />
                    </div>
                  )}

                  <p className="pj__sum">{p.summary}</p>

                  <div className="pj__k">the problem</div>
                  <p className="pj__p">{p.problem}</p>
                  <div className="pj__k">the approach</div>
                  <p className="pj__p">{p.approach}</p>
                  <div className="pj__k">what I built</div>
                  <ul className="pj__built">
                    {p.built.map((b) => <li key={b}>{b}</li>)}
                  </ul>

                  <div className="pj__stack">
                    {p.stack.map((t) => <span key={t} className="chip">{t}</span>)}
                  </div>

                  {(p.live || p.source) && (
                    <div className="pj__links">
                      {p.live && (
                        <a className="btn btn--primary btn--sm" href={p.live} target="_blank" rel="noopener noreferrer">
                          Live site
                        </a>
                      )}
                      {p.source && (
                        <a className="btn btn--ghost btn--sm" href={p.source} target="_blank" rel="noopener noreferrer">
                          Source
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
            </div>
          </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
