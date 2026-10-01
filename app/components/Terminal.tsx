"use client";

import React, { useEffect, useRef, useState } from "react";
import { scrambleTo, useIntroDone } from "./Scramble";
import { projects, skills, RESUME_URL } from "./data";

type Row = { kind: "cmd" | "out"; text: string };

const INTRO: Array<{ cmd: string; out: string[] }> = [
  { cmd: "whoami", out: ["snehil sharma, full-stack engineer"] },
  { cmd: "pwd", out: ["gurugram, india"] },
  {
    cmd: "cat now.txt",
    out: [
      "real-time video infrastructure at LenscorpAI",
      "go on the backend, typescript around it",
    ],
  },
];

function run(cmd: string): string[] | "clear" {
  const c = cmd.trim().toLowerCase();
  switch (c) {
    case "":
      return [];
    case "help":
      return [
        "commands: whoami, projects, skills, contact, resume, theme, clear",
      ];
    case "whoami":
      return ["snehil sharma, full-stack engineer"];
    case "projects":
    case "ls projects":
      return projects.map((p) => `${p.year}  ${p.title}`);
    case "skills":
      return skills.map(
        (s) => `${s.title.toLowerCase().padEnd(16)}${s.items.join(", ")}`,
      );
    case "contact":
      return [
        "work.snehil01@gmail.com",
        "github.com/codebysnehil",
        "linkedin.com/in/snehil-sharma-in",
      ];
    case "resume":
      if (RESUME_URL) {
        window.open(RESUME_URL, "_blank");
        return ["opening resume"];
      }
      return ["no resume link set yet. email me and I'll send it."];
    case "theme": {
      const cur =
        document.documentElement.getAttribute("data-theme") === "light"
          ? "dark"
          : "light";
      document.documentElement.setAttribute("data-theme", cur);
      try {
        localStorage.setItem("theme", cur);
      } catch {
        /* ignore */
      }
      return [`theme: ${cur}`];
    }
    case "clear":
      return "clear";
    default:
      return [`command not found: ${c}. try 'help'`];
  }
}

export default function Terminal() {
  const introDone = useIntroDone();
  const [rows, setRows] = useState<Row[]>([]);
  const [typing, setTyping] = useState("");
  const [ready, setReady] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const history = useRef<string[]>([]);
  const hIdx = useRef(-1);

  // scripted opening
  useEffect(() => {
    if (!introDone || started.current) return;
    started.current = true;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setRows(
        INTRO.flatMap((s) => [
          { kind: "cmd" as const, text: s.cmd },
          ...s.out.map((o) => ({ kind: "out" as const, text: o })),
        ]),
      );
      setReady(true);
      return;
    }
    let dead = false;
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      await wait(500);
      for (const step of INTRO) {
        for (let i = 1; i <= step.cmd.length; i++) {
          if (dead) return;
          setTyping(step.cmd.slice(0, i));
          await wait(45);
        }
        await wait(220);
        setTyping("");
        setRows((r) => [...r, { kind: "cmd", text: step.cmd }]);
        for (const o of step.out) {
          await new Promise<void>((res) => {
            let idx = -1;
            setRows((r) => {
              idx = r.length;
              return [...r, { kind: "out", text: "" }];
            });
            setTimeout(() => {
              scrambleTo(
                o,
                (s) =>
                  setRows((r) =>
                    r.map((x, k) => (k === idx ? { ...x, text: s } : x)),
                  ),
                { duration: 520 },
              );
              setTimeout(res, 560);
            }, 0);
          });
        }
        await wait(260);
      }
      if (!dead) setReady(true);
    })();
    return () => {
      dead = true;
    };
  }, [introDone]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [rows, typing]);

  const submit = () => {
    const cmd = input;
    history.current.unshift(cmd);
    hIdx.current = -1;
    setInput("");
    const out = run(cmd);
    if (out === "clear") {
      setRows([]);
      return;
    }
    setRows((r) => [
      ...r,
      { kind: "cmd", text: cmd },
      ...out.map((o) => ({ kind: "out" as const, text: o })),
    ]);
  };

  return (
    <>
      <style>{`
        .term {
          border: 1px solid var(--border-bright);
          border-radius: var(--radius);
          background: #05070d;
          color: #cbd5e1;
          font-family: var(--font-mono), monospace;
          overflow: hidden; position: relative;
          box-shadow: 0 0 0 1px rgba(52,240,160,.06), 0 20px 50px -20px rgba(0,0,0,.6);
        }
        .term__bar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 9px 14px;
          border-bottom: 1px solid rgba(148,163,184,.14);
          font-size: 12px; color: #6b7688;
        }
        .term__body {
          padding: 16px 18px 18px;
          font-size: 13.5px; line-height: 1.85;
          height: 236px; overflow-y: auto; cursor: text;
        }
        .term__row { white-space: pre-wrap; word-break: break-word; }
        .term__p { color: #2fe3a6; }
        .term__dots { display: inline-flex; gap: 6px; margin-right: 12px; vertical-align: middle; }
        .term__dots i { width: 9px; height: 9px; border-radius: 50%; background: #ff5f57; display: block; }
        .term__dots i:nth-child(2) { background: #febc2e; } .term__dots i:nth-child(3) { background: #28c840; }
        .term__out { color: #94a3b8; }
        .term__in {
          background: transparent; border: 0; outline: 0; color: #f1f5f9;
          font: inherit; width: calc(100% - 3.2ch); padding: 0; caret-color: #2fe3a6;
        }
      `}</style>

      <div className="term scanlines" onClick={() => inputRef.current?.focus()}>
        <div className="term__bar">
          <span>
            <span className="term__dots">
              <i />
              <i />
              <i />
            </span>
            snehil@portfolio: ~
          </span>
          <span>{ready ? "try: help" : ""}</span>
        </div>
        <div className="term__body" ref={bodyRef}>
          {rows.map((r, i) => (
            <div key={i} className="term__row">
              {r.kind === "cmd" ? (
                <>
                  <span className="term__p">$ </span>
                  {r.text}
                </>
              ) : (
                <span className="term__out">{r.text}</span>
              )}
            </div>
          ))}
          {!ready && (
            <div className="term__row">
              <span className="term__p">$ </span>
              {typing}
              <span className="caret" />
            </div>
          )}
          {ready && (
            <div className="term__row">
              <span className="term__p">$ </span>
              <input
                ref={inputRef}
                className="term__in"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submit();
                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    hIdx.current = Math.min(
                      hIdx.current + 1,
                      history.current.length - 1,
                    );
                    setInput(history.current[hIdx.current] ?? "");
                  }
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    hIdx.current = Math.max(hIdx.current - 1, -1);
                    setInput(
                      hIdx.current === -1 ? "" : history.current[hIdx.current],
                    );
                  }
                }}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                aria-label="terminal input"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
