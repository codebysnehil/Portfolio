"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend",
    description: "Modern web technologies",
    skills: [
      { name: "React & Next.js", level: 98 },
      { name: "TypeScript", level: 96 },
      { name: "Tailwind CSS", level: 97 },
      { name: "State Management", level: 94 },
    ],
  },
  {
    title: "Backend",
    description: "Server-side & APIs",
    skills: [
      { name: "Node.js", level: 97 },
      { name: "Go", level: 93 },
      { name: "PostgreSQL", level: 91 },
      { name: "Redis", level: 89 },
    ],
  },
  {
    title: "Cloud & DevOps",
    description: "Infrastructure",
    skills: [
      { name: "AWS", level: 92 },
      { name: "Docker", level: 90 },
      { name: "Kubernetes", level: 88 },
      { name: "CI/CD", level: 90 },
    ],
  },
  {
    title: "Architecture",
    description: "Systems at scale",
    skills: [
      { name: "Microservices", level: 93 },
      { name: "API Design", level: 95 },
      { name: "Performance", level: 91 },
      { name: "Security", level: 89 },
    ],
  },
];

function SkillCard({
  cat,
  i,
  isInView,
}: {
  cat: (typeof skillCategories)[0];
  i: number;
  isInView: boolean;
}) {
  const [hovTag, setHovTag] = useState<string | null>(null);
  // const avg = Math.round(
  //   cat.skills.reduce((a, s) => a + s.level, 0) / cat.skills.length,
  // );
  // const circumference = 2 * Math.PI * 20;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="sk-card"
    >
      {/* Corner glow */}
      <div className="sk-card__glow" />

      {/* Header */}
      <div className="sk-card__header">
        <div>
          <p className="sk-card__index">0{i + 1}</p>
          <h3 className="sk-card__title">{cat.title}</h3>
          <p className="sk-card__desc">{cat.description}</p>
        </div>

        {/* Circular score */}
        <div className="sk-card__ring-wrap">
          {/* <svg width="52" height="52" viewBox="0 0 52 52">
            <circle
              cx="26"
              cy="26"
              r="20"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="2.5"
            /> */}
          {/* <motion.circle
              cx="26"
              cy="26"
              r="20"
              fill="none"
              stroke="#e8ff4a"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={
                isInView
                  ? { strokeDashoffset: circumference * (1 - avg / 100) }
                  : { strokeDashoffset: circumference }
              }
              transition={{
                duration: 1.4,
                delay: i * 0.1 + 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              transform="rotate(-90 26 26)"
            /> */}
          {/* </svg> */}
          {/* <span className="sk-card__ring-num">{avg}</span> */}
        </div>
      </div>

      {/* Rule */}
      <div className="sk-card__rule" />

      {/* Tags */}
      <div className="sk-card__tags">
        {cat.skills.map((skill, j) => (
          <motion.span
            key={skill.name}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              delay: i * 0.1 + j * 0.06 + 0.3,
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            onMouseEnter={() => setHovTag(skill.name)}
            onMouseLeave={() => setHovTag(null)}
            className={`sk-tag ${hovTag === skill.name ? "sk-tag--on" : ""}`}
          >
            {skill.name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;500;600;700;800&display=swap');

        #skills, #skills * { box-sizing: border-box; }
        #skills { font-family: 'Syne', sans-serif; }

        /* 2×2 grid joined seamlessly */
        .sk-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.07);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.07);
        }
        @media (max-width: 620px) {
          .sk-grid { grid-template-columns: 1fr; }
        }

        .sk-card {
          position: relative;
          background: #0f0f0d;
          padding: 32px 30px;
          overflow: hidden;
          transition: background 0.25s ease;
        }
        .sk-card:hover { background: #141412; }

        .sk-card__glow {
          position: absolute;
          top: -40px; left: -40px;
          width: 160px; height: 160px;
          background: radial-gradient(circle, rgba(232,255,74,0.07) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          border-radius: 50%;
        }
        .sk-card:hover .sk-card__glow { opacity: 1; }

        .sk-card__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 18px;
          gap: 12px;
        }

        .sk-card__index {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(232,255,74,0.4);
          margin: 0 0 7px;
        }

        .sk-card__title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.55rem;
          font-weight: 400;
          color: #f0ede6;
          margin: 0 0 5px;
          line-height: 1.1;
        }

        .sk-card__desc {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: rgba(107,104,96,0.65);
          margin: 0;
        }

        .sk-card__ring-wrap {
          position: relative;
          width: 52px; height: 52px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sk-card__ring-wrap svg {
          position: absolute;
          top: 0; left: 0;
        }
        .sk-card__ring-num {
          font-family: 'DM Serif Display', serif;
          font-size: 13px;
          color: #e8ff4a;
          position: relative;
          z-index: 1;
          line-height: 1;
        }

        .sk-card__rule {
          height: 1px;
          background: linear-gradient(to right, rgba(255,255,255,0.09) 0%, transparent 80%);
          margin-bottom: 18px;
        }

        .sk-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        .sk-tag {
          display: inline-block;
          padding: 7px 14px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.025);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: rgba(240,237,230,0.62);
          cursor: default;
          transition: all 0.18s ease;
        }
        .sk-tag:hover, .sk-tag--on {
          background: rgba(232,255,74,0.07);
          border-color: rgba(232,255,74,0.3);
          color: #e8ff4a;
          transform: translateY(-1px);
        }
      `}</style>

      <section
        id="skills"
        ref={ref}
        style={{
          position: "relative",
          padding: "120px 0",
          background: "#0a0a08",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "-150px",
            width: "450px",
            height: "450px",
            borderRadius: "50%",
            pointerEvents: "none",
            background:
              "radial-gradient(circle, rgba(232,255,74,0.04) 0%, transparent 70%)",
            transform: "translateY(-50%)",
          }}
        />

        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 40px",
            position: "relative",
          }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: "52px" }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#e8ff4a",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "14px",
              }}
            >
              <span
                style={{
                  width: "32px",
                  height: "1px",
                  background: "#e8ff4a",
                  display: "block",
                }}
              />
              Skills & Stack
            </div>
            <h2
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
                lineHeight: 0.92,
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: "#f0ede6",
                margin: 0,
              }}
            >
              What I work
              <br />
              <em style={{ color: "#e8ff4a" }}>with.</em>
            </h2>
          </motion.div>

          {/* Grid */}
          <div className="sk-grid">
            {skillCategories.map((cat, i) => (
              <SkillCard key={cat.title} cat={cat} i={i} isInView={isInView} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
