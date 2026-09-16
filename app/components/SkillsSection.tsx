"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SkillCategory {
  title: string;
  description: string;
  wide?: boolean;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "AI Engineering",
    description: "Agents, LLMs & workflows",
    wide: true,
    skills: [
      "Claude API & Anthropic SDK",
      "Agentic Workflows",
      "MCP & Tool Calling",
      "RAG & Vector Search",
      "Prompt Engineering & Evals",
      "LangGraph",
    ],
  },
  {
    title: "Backend",
    description: "Server-side & APIs",
    skills: ["Go", "Node.js", "Python & FastAPI", "PostgreSQL", "Redis", "Kafka"],
  },
  {
    title: "Frontend",
    description: "Modern web",
    skills: ["React & Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Cloud & DevOps",
    description: "Infrastructure",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
  },
  {
    title: "Architecture",
    description: "Systems at scale",
    skills: ["Microservices", "API Design", "Performance", "Security"],
  },
];

export default function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <>
      <style>{`
        .sk-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        .sk-card {
          padding: 26px 28px;
        }
        .sk-card--wide { grid-column: 1 / -1; }
        .sk-card__head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 18px;
        }
        .sk-card__title {
          font-family: var(--font-display), sans-serif;
          font-size: 1.25rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--text);
          margin: 0;
        }
        .sk-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        @media (max-width: 640px) {
          .sk-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section id="skills" ref={ref} className="section">
        <div className="container">
          <motion.div
            className="section-head"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="eyebrow">
              <span className="eyebrow__index">03</span> Skills &amp; Stack
            </div>
            <h2 className="section-title">What I work with</h2>
          </motion.div>

          <div className="sk-grid">
            {skillCategories.map((cat, i) => (
              <motion.div
                key={cat.title}
                className={`card sk-card ${cat.wide ? "sk-card--wide" : ""}`}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.45,
                  delay: 0.1 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="sk-card__head">
                  <h3 className="sk-card__title">{cat.title}</h3>
                  <span className="mono-label">{cat.description}</span>
                </div>
                <div className="sk-card__tags">
                  {cat.skills.map((s) => (
                    <span
                      key={s}
                      className={`chip ${cat.wide ? "chip--accent" : ""}`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
