"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const SOCIALS = [
  {
    label: "Email",
    value: "work.snehil01@gmail.com",
    href: "mailto:work.snehil01@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/snehil-sharma-in",
    href: "https://www.linkedin.com/in/snehil-sharma-in/",
  },
  {
    label: "GitHub",
    value: "github.com/codebysnehil",
    href: "https://github.com/codebysnehil",
  },
];

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setForm({ name: "", email: "", message: "" });
      setStatus("done");
    }, 1400);
  };

  return (
    <>
      <style>{`
        .ct-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 14px;
          align-items: start;
        }
        .ct-panel { padding: 32px; }
        .ct-label {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--faint);
          display: block;
          margin-bottom: 8px;
        }
        .ct-input {
          width: 100%;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 9px;
          padding: 13px 16px;
          color: var(--text);
          font-size: 14px;
          font-family: var(--font-body), sans-serif;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          resize: none;
        }
        .ct-input::placeholder { color: var(--faint); }
        .ct-input:focus {
          border-color: rgba(37,99,235,0.5);
          box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
        }
        .ct-social {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 15px 0;
          border-bottom: 1px solid var(--border);
          text-decoration: none;
          transition: padding-left 0.2s;
        }
        .ct-social:last-of-type { border-bottom: none; }
        .ct-social:hover { padding-left: 6px; }
        .ct-social:hover .ct-social__arrow { color: var(--accent); }
        .ct-social__label {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--faint);
          margin-bottom: 2px;
        }
        .ct-social__value {
          font-size: 14px;
          font-weight: 500;
          color: var(--text);
        }
        .ct-social__arrow { color: var(--faint); transition: color 0.2s; }
        @media (max-width: 780px) {
          .ct-grid { grid-template-columns: 1fr; }
          .ct-panel { padding: 24px 20px; }
        }
      `}</style>

      <section id="contact" ref={ref} className="section">
        <div className="container">
          <motion.div
            className="section-head"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="eyebrow">
              <span className="eyebrow__index">05</span> Contact
            </div>
            <div className="section-head__row">
              <h2 className="section-title">Let&apos;s build something</h2>
              <p className="section-sub" style={{ maxWidth: "360px" }}>
                Open to full-time roles and select freelance projects. I reply
                within 24 hours.
              </p>
            </div>
          </motion.div>

          <div className="ct-grid">
            {/* Form */}
            <motion.div
              className="card ct-panel"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "18px" }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                  }}
                >
                  <div>
                    <label className="ct-label" htmlFor="name">
                      Name
                    </label>
                    <input
                      id="name"
                      className="ct-input"
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="ct-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      className="ct-input"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="ct-label" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="ct-input"
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Tell me about the role or project…"
                    required
                  />
                </div>

                <AnimatePresence mode="wait">
                  {status === "done" ? (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        padding: "14px 20px",
                        borderRadius: "9px",
                        border: "1px solid rgba(22,163,74,0.35)",
                        background: "rgba(22,163,74,0.07)",
                        fontSize: "13.5px",
                        color: "#15803d",
                        fontWeight: 500,
                      }}
                    >
                      ✓ Message sent — I&apos;ll get back within 24 hours.
                    </motion.div>
                  ) : (
                    <motion.button
                      key="btn"
                      type="submit"
                      className="btn btn--primary"
                      disabled={status === "sending"}
                      style={{ width: "100%", opacity: status === "sending" ? 0.7 : 1 }}
                    >
                      {status === "sending" ? "Sending…" : "Send Message →"}
                    </motion.button>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>

            {/* Side */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              <div
                className="card"
                style={{
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  borderColor: "rgba(22,163,74,0.3)",
                  background: "rgba(22,163,74,0.06)",
                }}
              >
                <span className="status-dot" />
                <span style={{ fontSize: "13.5px", color: "var(--text)", fontWeight: 500 }}>
                  Available for work — open to remote
                </span>
              </div>

              <div className="card ct-panel" style={{ padding: "12px 24px" }}>
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    className="ct-social"
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div>
                      <div className="ct-social__label">{s.label}</div>
                      <div className="ct-social__value">{s.value}</div>
                    </div>
                    <span className="ct-social__arrow">↗</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
