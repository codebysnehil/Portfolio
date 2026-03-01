"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const SOCIALS = [
  {
    label: "Email",
    value: "work.snehil01@gmail.com",
    href: "mailto:work.snehil01@gmail.com",
    tag: "Direct",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/snehil",
    href: "https://linkedin.com/in/yourprofile",
    tag: "Connect",
  },
  {
    label: "GitHub",
    value: "github.com/codebysnehil",
    href: "https://github.com/yourprofile",
    tag: "Code",
  },
];

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setForm({ name: "", email: "", message: "" });
      setStatus("done");
    }, 1400);
  };

  const inputStyle = (name: string): React.CSSProperties => ({
    width: "100%",
    background:
      focused === name ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
    border: `1px solid ${focused === name ? "rgba(232,255,74,0.35)" : "rgba(255,255,255,0.08)"}`,
    borderRadius: "10px",
    padding: "14px 18px",
    color: "#f0ede6",
    fontSize: "13px",
    fontFamily: "'Syne', sans-serif",
    fontWeight: 500,
    outline: "none",
    transition: "all 0.2s ease",
    boxShadow: focused === name ? "0 0 0 3px rgba(232,255,74,0.06)" : "none",
    resize: "none" as const,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;500;600;700;800&display=swap');
        #contact, #contact * { box-sizing: border-box; }
        #contact { font-family: 'Syne', sans-serif; }

        ::placeholder { color: rgba(107,104,96,0.5); }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 10px;
          align-items: start;
        }

        .contact-form-panel {
          background: #0f0f0d;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 40px 36px;
        }

        .contact-side {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .contact-info-panel {
          background: #0f0f0d;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 32px 28px;
        }

        .social-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          text-decoration: none;
          transition: all 0.2s;
          cursor: pointer;
        }
        .social-row:last-of-type { border-bottom: none; }
        .social-row:hover .social-row__label { color: #f0ede6; }
        .social-row:hover .social-row__arrow { color: #e8ff4a; transform: translateX(4px); }

        .social-row__left { display: flex; flex-direction: column; gap: 2px; }
        .social-row__title { font-size: 10px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(107,104,96,0.45); }
        .social-row__label { font-family: 'DM Serif Display', serif; font-size: 1rem; font-weight: 400; color: rgba(240,237,230,0.7); transition: color 0.2s; }
        .social-row__arrow { font-size: 13px; color: rgba(107,104,96,0.3); transition: all 0.22s; }

        .avail-badge {
          background: rgba(232,255,74,0.06);
          border: 1px solid rgba(232,255,74,0.2);
          border-radius: 12px;
          padding: 20px 22px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .avail-badge__dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #e8ff4a;
          flex-shrink: 0;
          margin-top: 4px;
          animation: blink 2.2s ease-in-out infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(232,255,74,0.4); }
          50% { opacity: 0.6; box-shadow: 0 0 0 5px rgba(232,255,74,0); }
        }
        .avail-badge__text { font-size: 13px; color: rgba(240,237,230,0.8); line-height: 1.6; }
        .avail-badge__em { color: #e8ff4a; font-weight: 700; }

        /* Lede / big quote block */
        .contact-lede {
          background: #0f0f0d;
          border: 1px solid rgba(255,255,255,0.07);
          border-left: 2px solid rgba(232,255,74,0.4);
          border-radius: 0 14px 14px 0;
          padding: 28px 28px 28px 32px;
        }

        /* Submit btn */
        .contact-submit {
          width: 100%;
          padding: 16px;
          border-radius: 100px;
          background: #e8ff4a;
          color: #0a0a08;
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: all 0.22s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .contact-submit:hover:not(:disabled) {
          background: #f0ff70;
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(232,255,74,0.2);
        }
        .contact-submit:disabled { opacity: 0.65; cursor: not-allowed; }

        .contact-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(107,104,96,0.5);
          display: block;
          margin-bottom: 8px;
        }

        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr; }
          .contact-form-panel { padding: 28px 20px; }
          .contact-info-panel { padding: 24px 20px; }
        }
      `}</style>

      <section
        id="contact"
        ref={ref}
        style={{
          position: "relative",
          padding: "120px 0",
          background: "#0a0a08",
          overflow: "hidden",
        }}
      >
        {/* Bg grid */}
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
        {/* Yellow glow bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            pointerEvents: "none",
            background:
              "radial-gradient(circle, rgba(232,255,74,0.05) 0%, transparent 70%)",
          }}
        />

        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "0 40px",
            position: "relative",
          }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
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
              Contact
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
              Let&apos;s build
              <br />
              <em style={{ color: "#e8ff4a" }}>something.</em>
            </h2>
          </motion.div>

          {/* Main grid */}
          <div className="contact-grid">
            {/* LEFT — Form */}
            <motion.div
              className="contact-form-panel"
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.2,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Form header */}
              <div style={{ marginBottom: "32px" }}>
                <div
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "1.5rem",
                    fontWeight: 400,
                    color: "#f0ede6",
                    marginBottom: "8px",
                  }}
                >
                  Send a message
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "rgba(107,104,96,0.65)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  Have a project in mind? I&apos;d love to hear about it. Fill
                  in the form and I&apos;ll get back within 24 hours.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {/* Name + Email row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                  }}
                >
                  <div>
                    <label className="contact-label" htmlFor="name">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      placeholder="Snehil Sharma"
                      required
                      style={inputStyle("name")}
                    />
                  </div>
                  <div>
                    <label className="contact-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      placeholder="you@example.com"
                      required
                      style={inputStyle("email")}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="contact-label" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    placeholder="Tell me about your project, timeline, and what you're looking to build..."
                    required
                    rows={5}
                    style={{ ...inputStyle("message"), resize: "none" }}
                  />
                </div>

                {/* Submit */}
                <AnimatePresence mode="wait">
                  {status === "done" ? (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "16px 24px",
                        borderRadius: "100px",
                        background: "rgba(232,255,74,0.08)",
                        border: "1px solid rgba(232,255,74,0.25)",
                      }}
                    >
                      <span style={{ fontSize: "16px" }}>✓</span>
                      <div>
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: 700,
                            color: "#e8ff4a",
                            letterSpacing: "0.1em",
                          }}
                        >
                          Message sent!
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "rgba(107,104,96,0.7)",
                            marginTop: "2px",
                          }}
                        >
                          I&apos;ll get back to you within 24 hours.
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="btn"
                      type="submit"
                      disabled={status === "sending"}
                      className="contact-submit"
                    >
                      {status === "sending" ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            style={{
                              display: "inline-block",
                              width: "12px",
                              height: "12px",
                              border: "2px solid rgba(10,10,8,0.3)",
                              borderTopColor: "#0a0a08",
                              borderRadius: "50%",
                            }}
                          />
                          Sending…
                        </>
                      ) : (
                        <>Send Message →</>
                      )}
                    </motion.button>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>

            {/* RIGHT — Side panel */}
            <motion.div
              className="contact-side"
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.35,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Availability badge */}
              <div className="avail-badge">
                <div className="avail-badge__dot" />
                <div className="avail-badge__text">
                  <span className="avail-badge__em">Available for work</span>
                  <br />
                  Open to full-time roles and select freelance projects.
                </div>
              </div>

              {/* Social links panel */}
              <div className="contact-info-panel">
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "rgba(107,104,96,0.38)",
                    marginBottom: "4px",
                  }}
                >
                  Reach out directly
                </div>
                {SOCIALS.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-row"
                    initial={{ opacity: 0, x: 16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      delay: i * 0.07 + 0.5,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <div className="social-row__left">
                      <span className="social-row__title">{s.tag}</span>
                      <span className="social-row__label">{s.label}</span>
                    </div>
                    <span className="social-row__arrow">↗</span>
                  </motion.a>
                ))}
              </div>

              {/* Quote block */}
              <div className="contact-lede">
                <p
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "1.05rem",
                    fontStyle: "italic",
                    color: "rgba(240,237,230,0.55)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  &ldquo;I care as much about the system behind the product as I
                  do about the experience in front of it.&rdquo;
                </p>
                <div
                  style={{
                    marginTop: "12px",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(107,104,96,0.4)",
                  }}
                >
                  — Snehil Sharma
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer strip */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9, duration: 0.6 }}
            style={{
              marginTop: "60px",
              paddingTop: "28px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          > */}
          {/* <div
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "1rem",
                color: "rgba(240,237,230,0.3)",
                letterSpacing: "-0.01em",
              }}
            >
              Snehil Sharma
            </div> */}
          {/* <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(107,104,96,0.35)",
              }}
            >
              © 2025 · Built with Next.js
            </div> */}
          {/* <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(107,104,96,0.35)",
              }}
            >
              San Francisco, CA
            </div> */}
          {/* </motion.div> */}
        </div>
      </section>
    </>
  );
}
