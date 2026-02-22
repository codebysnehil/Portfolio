"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Experience {
  company: string;
  role: string;
  period: string;
  logo: string;
  description: string;
  achievements: string[];
  technologies: string[];
  impact: string;
  metrics?: { label: string; value: string }[];
}

const experiences: Experience[] = [
  {
    company: "LENS Corporation",
    role: "Software Engineer (Full-Stack)",
    period: "Jan 2025 – Present",
    logo: "/lens.png",
    description:
      "Architecting next-generation video infrastructure at scale. Building real-time streaming systems that power thousands of concurrent streams with enterprise-grade reliability and sub-100ms latency.",
    achievements: [
      "Engineered high-throughput Go backend achieving <100ms latency for live streaming at scale",
      "Architected distributed API layer handling 10K+ concurrent connections with 99.9% uptime",
      "Built cross-platform desktop applications using Electron and TypeScript for seamless UX",
      "Implemented automated CI/CD pipelines, reducing deployment cycles by 70% and eliminating downtime",
    ],
    technologies: ["Go", "TypeScript", "Electron", "Next.js", "PostgreSQL", "AWS", "Docker", "Kubernetes"],
    impact: "Real-Time Video Infrastructure",
    metrics: [
      { label: "Latency", value: "<100ms" },
      { label: "Concurrent", value: "10K+" },
      { label: "Uptime", value: "99.9%" },
    ],
  },
  {
    company: "Stockarea",
    role: "Software Engineer (Backend)",
    period: "2023 – 2024",
    logo: "/sa.png",
    description:
      "Led backend architecture for India's largest digital warehousing network. Designed and scaled distributed systems powering logistics operations across 100+ facilities, processing millions of transactions daily.",
    achievements: [
      "Architected RESTful APIs powering nationwide logistics network across 100+ warehouses",
      "Optimized PostgreSQL queries and indexing strategies, achieving 60% faster response times",
      "Designed microservices architecture processing 1M+ daily transactions with zero data loss",
      "Built real-time monitoring infrastructure with automated alerting and incident response",
    ],
    technologies: ["Python", "FastAPI", "PostgreSQL", "Redis", "Docker", "AWS", "React", "Kafka"],
    impact: "Enterprise Logistics Platform",
    metrics: [
      { label: "Facilities", value: "100+" },
      { label: "Daily Txns", value: "1M+" },
      { label: "Performance", value: "+60%" },
    ],
  },
];

export default function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    const link = document.createElement("a");
    link.href = process.env.NEXT_PUBLIC_RESUME_URL || "#";
    link.download = "Snehil_Resume.pdf";
    link.click();
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-24 sm:py-32 px-5 sm:px-8 bg-[var(--bg-alt)]"
    >
      <div className="absolute inset-0 bg-grid-dark-dense pointer-events-none opacity-30" aria-hidden />
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 sm:mb-20"
        >
          <p className="text-sm font-medium text-[var(--accent)] uppercase tracking-widest mb-3">
            Experience
          </p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-[var(--text)] tracking-tight">
            Where I&apos;ve built
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--accent)] via-[var(--accent-soft)] to-[var(--accent-secondary-soft)] -translate-x-px" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex flex-col sm:flex-row gap-8 sm:gap-12 pb-20 last:pb-0"
            >
              {/* Left: date + company (desktop) */}
              <div className="sm:w-1/2 sm:pr-12 flex flex-col sm:items-end sm:text-right order-2 sm:order-1">
                <div className="flex items-center gap-4 sm:flex-row-reverse">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-soft)] shrink-0 border-4 border-[var(--bg-alt)] shadow-[var(--glow-accent-sm)]" />
                  <div>
                    <p className="text-sm text-[var(--text-muted)]">{exp.period}</p>
                    <p className="font-display font-bold text-xl text-[var(--text)]">{exp.company}</p>
                  </div>
                </div>
              </div>

              {/* Right: card (desktop) */}
              <div className="sm:w-1/2 sm:pl-12 order-1 sm:order-2">
                <div className="relative bg-[var(--bg-card)] border border-[var(--border)] p-6 sm:p-8 shadow-[var(--shadow-card)] rounded-lg border-l-4 border-l-[var(--accent)] hover:border-[var(--border-hover)] transition-colors">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[var(--accent)]/20 border border-[var(--accent)]/30 flex items-center justify-center shrink-0 font-display font-bold text-lg text-[var(--accent)]">
                      {exp.company.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--text)]">{exp.role}</p>
                      <p className="text-xs text-[var(--accent)] font-medium uppercase tracking-wider mt-1">
                        {exp.impact}
                      </p>
                    </div>
                  </div>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">
                    {exp.description}
                  </p>
                  {exp.metrics && (
                    <div className="flex gap-4 mb-6 flex-wrap">
                      {exp.metrics.map((m) => (
                        <div key={m.label} className="px-3 py-1.5 rounded-md bg-[var(--accent)]/15 border border-[var(--accent)]/25">
                          <span className="font-display font-bold text-[var(--accent)]">{m.value}</span>
                          <span className="text-xs text-[var(--text-muted)] ml-1">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <ul className="space-y-2 mb-6">
                    {exp.achievements.slice(0, 3).map((a, j) => (
                      <li key={j} className="text-sm text-[var(--text)] flex gap-2">
                        <span className="text-[var(--accent)] mt-1.5">—</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-xs font-medium bg-[var(--accent-secondary)]/15 text-[var(--accent-secondary)] border border-[var(--accent-secondary)]/30 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="px-8 py-4 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-soft)] text-white font-semibold text-sm uppercase tracking-wider rounded-lg hover:shadow-[var(--glow-accent)] disabled:opacity-70 transition-all duration-200 hover:-translate-y-0.5"
          >
            {downloading ? "Downloading…" : "Download Resume"}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
