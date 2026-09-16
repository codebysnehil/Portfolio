"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote:
      "Snehil consistently delivers high-quality code and shows great potential. His trading dashboard exceeded our expectations and our users love the intuitive interface.",
    author: "Alex Kumar",
    role: "Senior Developer",
    company: "FinTech Startup",
  },
  {
    quote:
      "Working with Snehil was a great experience. He's reliable, communicates well, and always delivers on time. His technical skills are impressive for someone with 2 years experience.",
    author: "Maria Rodriguez",
    role: "Project Manager",
    company: "Tech Consulting Agency",
  },
  {
    quote:
      "Snehil has strong problem-solving skills and writes clean, maintainable code. He's someone I'd definitely want on my team for future projects.",
    author: "James Thompson",
    role: "Tech Lead",
    company: "Local Startup",
  },
];

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [active, setActive] = useState(0);

  const t = testimonials[active];

  return (
    <>
      <style>{`
        .tst-card {
          padding: clamp(28px, 5vw, 52px);
          position: relative;
        }
        .tst-quote {
          font-family: var(--font-body), sans-serif;
          font-size: clamp(1.2rem, 2.4vw, 1.6rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          color: rgba(23,23,23,0.88);
          line-height: 1.55;
          margin: 0 0 28px;
        }
        .tst-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 20px;
        }
        .tst-dot {
          width: 26px; height: 3px;
          border-radius: 2px;
          border: none;
          padding: 0;
          background: var(--border-bright);
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .tst-dot--on { background: var(--accent); width: 42px; }
        .tst-arrow {
          width: 38px; height: 38px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--muted);
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 14px;
        }
        .tst-arrow:hover {
          border-color: rgba(37,99,235,0.4);
          color: var(--accent);
          background: var(--accent-dim);
        }
      `}</style>

      <section id="testimonials" ref={ref} className="section">
        <div className="container" style={{ maxWidth: "860px" }}>
          <motion.div
            className="section-head"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="eyebrow">
              <span className="eyebrow__index">04</span> Testimonials
            </div>
            <h2 className="section-title">What people say</h2>
          </motion.div>

          <motion.div
            className="card tst-card"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <blockquote className="tst-quote">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    gap: "16px",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-display), sans-serif",
                        fontWeight: 600,
                        fontSize: "15px",
                        color: "var(--text)",
                        margin: "0 0 3px",
                      }}
                    >
                      {t.author}
                    </p>
                    <p
                      className="mono"
                      style={{
                        fontSize: "11.5px",
                        letterSpacing: "0.08em",
                        color: "var(--faint)",
                        margin: 0,
                      }}
                    >
                      {t.role} · {t.company}
                    </p>
                  </div>
                  <span
                    className="mono"
                    style={{ fontSize: "12px", color: "var(--faint)" }}
                  >
                    {String(active + 1).padStart(2, "0")} /{" "}
                    {String(testimonials.length).padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className="tst-nav">
            <div style={{ display: "flex", gap: "8px" }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`tst-dot ${i === active ? "tst-dot--on" : ""}`}
                  onClick={() => setActive(i)}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                className="tst-arrow"
                onClick={() =>
                  setActive((a) => (a - 1 + testimonials.length) % testimonials.length)
                }
                aria-label="Previous"
              >
                ←
              </button>
              <button
                className="tst-arrow"
                onClick={() => setActive((a) => (a + 1) % testimonials.length)}
                aria-label="Next"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
