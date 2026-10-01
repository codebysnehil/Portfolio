"use client";

import React, { useState } from "react";
import { RESUME_URL } from "./data";
import { Reveal, SectionLine } from "./Reveal";

const EMAIL = "work.snehil01@gmail.com";
const COFFEE = process.env.NEXT_PUBLIC_COFFEE_URL || "";

const LINKS = [
  { label: "email", value: EMAIL, href: `mailto:${EMAIL}` },
  {
    label: "github",
    value: "github.com/snehil",
    href: "https://github.com/codebysnehil",
  },
  {
    label: "linkedin",
    value: "linkedin.com/in/snehil",
    href: "https://www.linkedin.com/in/snehil-sharma-in/",
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // No backend: this opens your mail client with the message filled in.
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Hello from ${form.name || "your portfolio"}`,
    );
    const body = encodeURIComponent(
      `${form.message}\n\n${form.name}\n${form.email}`,
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <style>{`
        .ct { display: grid; grid-template-columns: 1.2fr 1fr; gap: 64px; align-items: start; }
        .ct__f { display: grid; gap: 16px; padding: 28px; }
        .ct__l { font-family: var(--font-mono), monospace; font-size: 12px; color: var(--faint); display: block; margin-bottom: 6px; }
        .ct__i {
          width: 100%; background: rgba(0,0,0,.18); color: var(--text);
          border: 1px solid var(--border-bright); border-radius: var(--radius-sm);
          padding: 11px 13px; font: inherit; font-size: 15px; outline: none;
          transition: border-color .15s;
        }
        .ct__i:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
        textarea.ct__i { min-height: 130px; resize: vertical; }
        .ct__links { list-style: none; margin: 0; padding: 8px 24px; }
        .ct__links li { border-bottom: 1px solid var(--border); }
        .ct__links li:last-child { border-bottom: 0; }
        .ct__a { display: grid; grid-template-columns: 84px 1fr; gap: 8px; padding: 16px 0; font-size: 15px; color: var(--muted); transition: color .15s, padding-left .2s; }
        .ct__a:hover { color: var(--accent); padding-left: 8px; }
        .ct__a span:first-child { font-family: var(--font-mono), monospace; font-size: 12px; color: var(--faint); padding-top: 3px; }
        .ct__avail { display: flex; align-items: center; gap: 10px; font-family: var(--font-mono), monospace; font-size: 12.5px; color: var(--muted); margin-bottom: 16px; }
        .ct__note { color: var(--faint); font-size: 13px; margin-top: 18px; line-height: 1.6; }
        @media (max-width: 800px) { .ct { grid-template-columns: 1fr; gap: 44px; } }
      `}</style>

      <section id="contact" className="section">
        <SectionLine />
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow">
              <b>04</b> / contact
            </div>
            <h2 className="section-title">Let&apos;s build something</h2>
            <p className="section-sub">
              Open to full-time roles and select freelance projects. Email is
              the fastest way to reach me.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="ct">
              <form className="ct__f card card--ticks" onSubmit={send}>
                <div>
                  <label className="ct__l" htmlFor="n">
                    name
                  </label>
                  <input
                    id="n"
                    className="ct__i"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="ct__l" htmlFor="e">
                    email
                  </label>
                  <input
                    id="e"
                    type="email"
                    className="ct__i"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="ct__l" htmlFor="m">
                    message
                  </label>
                  <textarea
                    id="m"
                    className="ct__i"
                    required
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                  />
                </div>
                <div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <button className="btn btn--primary" type="submit">
                      Open in mail app
                    </button>
                    {RESUME_URL && (
                      <a
                        className="btn btn--ghost"
                        href={RESUME_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                      >
                        Download résumé
                      </a>
                    )}
                  </div>
                </div>
              </form>

              <div>
                <div className="ct__avail">
                  <span className="status-dot" />
                  Available for work · open to remote
                </div>
                <ul className="ct__links card">
                  {LINKS.map((l) => (
                    <li key={l.label}>
                      <a
                        className="ct__a"
                        href={l.href}
                        target={
                          l.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel="noopener noreferrer"
                      >
                        <span>{l.label}</span>
                        <span>
                          {l.value}{" "}
                          <span style={{ color: "var(--faint)" }}>↗</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                {COFFEE && (
                  <p className="ct__note">
                    If something here saved you time, you can{" "}
                    <a
                      className="tlink"
                      style={{ color: "var(--text)" }}
                      href={COFFEE}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      buy me a coffee
                    </a>
                    .
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
