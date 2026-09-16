"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Experience {
  company: string;
  role: string;
  period: string;
  summary: string;
  achievements: string[];
  technologies: string[];
  metrics: { label: string; value: string }[];
}

const experiences: Experience[] = [
  {
    company: "LENS Corporation",
    role: "Software Engineer — Full-Stack",
    period: "Jan 2025 — Present",
    summary:
      "Real-time video infrastructure: streaming systems powering thousands of concurrent streams with sub-100ms latency.",
    achievements: [
      "Engineered high-throughput Go backend achieving <100ms latency for live streaming at scale",
      "Architected distributed API layer handling 10K+ concurrent connections with 99.9% uptime",
      "Built cross-platform desktop applications with Electron and TypeScript",
      "Implemented CI/CD pipelines, reducing deployment cycles by 70%",
    ],
    technologies: ["Go", "TypeScript", "Electron", "Next.js", "PostgreSQL", "AWS", "Kubernetes"],
    metrics: [
      { label: "Latency", value: "<100ms" },
      { label: "Concurrent", value: "10K+" },
      { label: "Uptime", value: "99.9%" },
    ],
  },
  {
    company: "Stockarea",
    role: "Software Engineer — Backend",
    period: "2024 — 2025",
    summary:
      "Backend architecture for India's largest digital warehousing network — 100+ facilities, millions of transactions daily.",
    achievements: [
      "Architected RESTful APIs powering a nationwide logistics network across 100+ warehouses",
      "Optimized PostgreSQL queries and indexing for 60% faster response times",
      "Designed microservices processing 1M+ daily transactions with zero data loss",
      "Built real-time monitoring with automated alerting and incident response",
    ],
    technologies: ["Python", "FastAPI", "PostgreSQL", "Redis", "Kafka", "Docker", "AWS"],
    metrics: [
      { label: "Facilities", value: "100+" },
      { label: "Daily txns", value: "1M+" },
      { label: "Query speed", value: "+60%" },
    ],
  },
];

export default function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <>
      <style>{`
        .xp-item {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 32px;
          padding: 40px 0;
          border-top: 1px solid var(--border);
        }
        .xp-item:last-of-type { border-bottom: 1px solid var(--border); }
        .xp-period {
          font-family: var(--font-mono), monospace;
          font-size: 12px;
          letter-spacing: 0.08em;
          color: var(--faint);
          padding-top: 4px;
        }
        .xp-company {
          font-family: var(--font-mono), monospace;
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 6px;
        }
        .xp-role {
          font-family: var(--font-body), sans-serif;
          font-size: clamp(1.3rem, 2.5vw, 1.7rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text);
          margin: 0 0 10px;
          line-height: 1.2;
        }
        .xp-summary {
          font-size: 14.5px;
          color: var(--muted);
          line-height: 1.75;
          margin: 0 0 18px;
          max-width: 640px;
        }
        .xp-metrics {
          display: flex;
          gap: 36px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .xp-bullets {
          list-style: none;
          padding: 0;
          margin: 0 0 20px;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        .xp-bullet {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          font-size: 14px;
          color: rgba(23,23,23,0.78);
          line-height: 1.65;
        }
        .xp-bullet::before {
          content: '→';
          font-family: var(--font-mono), monospace;
          color: var(--accent);
          font-size: 12px;
          flex-shrink: 0;
          margin-top: 3px;
        }
        .xp-tech { display: flex; flex-wrap: wrap; gap: 7px; }
        .xp-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          margin-top: 48px;
        }
        @media (max-width: 720px) {
          .xp-item { grid-template-columns: 1fr; gap: 12px; padding: 32px 0; }
        }
      `}</style>

      <section id="experience" ref={ref} className="section">
        <div className="container">
          <motion.div
            className="section-head"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="eyebrow">
              <span className="eyebrow__index">01</span> Experience
            </div>
            <div className="section-head__row">
              <h2 className="section-title">Where I&apos;ve built things</h2>
              <p className="section-sub" style={{ maxWidth: "360px" }}>
                Two companies, one obsession — software that holds up under
                real production load.
              </p>
            </div>
          </motion.div>

          <div>
            {experiences.map((xp, i) => (
              <motion.article
                key={xp.company}
                className="xp-item"
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.45,
                  delay: 0.15 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="xp-period">{xp.period}</div>
                <div>
                  <div className="xp-company">{xp.company}</div>
                  <h3 className="xp-role">{xp.role}</h3>
                  <p className="xp-summary">{xp.summary}</p>

                  <div className="xp-metrics">
                    {xp.metrics.map((m) => (
                      <div key={m.label} className="metric">
                        <span className="metric__value">{m.value}</span>
                        <span className="metric__label">{m.label}</span>
                      </div>
                    ))}
                  </div>

                  <ul className="xp-bullets">
                    {xp.achievements.map((a) => (
                      <li key={a} className="xp-bullet">
                        {a}
                      </li>
                    ))}
                  </ul>

                  <div className="xp-tech">
                    {xp.technologies.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            className="xp-cta"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.45 }}
          >
            <p style={{ color: "var(--muted)", fontSize: "14.5px", margin: 0 }}>
              Want the full picture? Grab the résumé — one page, no fluff.
            </p>
            <a
              className="btn btn--primary"
              href={process.env.NEXT_PUBLIC_RESUME_URL || "#contact"}
            >
              ↓ Download Résumé
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
