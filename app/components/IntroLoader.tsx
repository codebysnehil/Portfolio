"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrambleTo } from "./Scramble";

const KEY = "intro-seen";

type L = { text: string; kind: "cmd" | "out" | "ok" | "welcome" | "hint" };

const LINES: L[] = [
  { kind: "cmd", text: "./welcome.sh" },
  { kind: "ok", text: "loading profile" },
  { kind: "ok", text: "loading projects" },
  { kind: "ok", text: "rendering globe" },
  { kind: "welcome", text: "Welcome to Snehil's Portfolio" },
  { kind: "hint", text: "press any key to skip" },
];

const GLYPHS = "!<>-_\\/[]{}=+*^?#$%&@0123456789";
const noise = (n: number) =>
  Array.from({ length: n }, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join("");

function finish() {
  document.documentElement.dataset.intro = "done";
  window.dispatchEvent(new Event("intro-done"));
  document.body.style.overflow = "";
}

export default function IntroLoader() {
  const [active, setActive] = useState(false);
  const [shown, setShown] = useState<string[]>([]);
  const [phase, setPhase] = useState<"run" | "out">("run");
  const [gone, setGone] = useState(false);
  const cancels = useRef<Array<() => void>>([]);
  const timers = useRef<number[]>([]);
  const closing = useRef(false);

  const close = () => {
    if (closing.current) return;
    closing.current = true;
    cancels.current.forEach((c) => c());
    timers.current.forEach((t) => clearTimeout(t));
    // one quick burst of noise, then the panel lifts
    setPhase("out");
    setShown((prev) => prev.map((l) => noise(Math.max(l.length, 6))));
    timers.current.push(window.setTimeout(() => setGone(true), 380));
  };

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* ignore */
    }
    if (reduced || seen) {
      finish();
      return;
    }
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }

    setActive(true);
    document.body.style.overflow = "hidden";
    const cancelList = cancels.current;
    const timerList = timers.current;

    // timeline
    let t = 350;
    LINES.forEach((line, i) => {
      const dur = line.kind === "welcome" ? 1000 : line.kind === "cmd" ? 520 : 420;
      timers.current.push(
        window.setTimeout(() => {
          cancels.current.push(
            scrambleTo(
              line.text,
              (s) =>
                setShown((prev) => {
                  const next = prev.slice();
                  next[i] = s;
                  return next;
                }),
              { duration: dur },
            ),
          );
        }, t),
      );
      t += dur + (line.kind === "welcome" ? 200 : 160);
    });
    timers.current.push(window.setTimeout(close, t + 900));

    const onKey = () => close();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      cancelList.forEach((c) => c());
      timerList.forEach((x) => clearTimeout(x));
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <style>{`
        .boot {
          position: fixed; inset: 0; z-index: 200;
          background: #05070d;
          color: #cbd5e1;
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          cursor: pointer;
          font-family: var(--font-mono), monospace;
        }
        .boot__inner { width: 100%; max-width: 640px; font-size: 14.5px; line-height: 2; }
        .boot__line { min-height: 2em; white-space: pre-wrap; }
        .boot__p { color: #2fe3a6; }
        .boot__ok { color: #2fe3a6; }
        .boot__welcome {
          margin-top: 22px;
          font-size: clamp(1.15rem, 3.4vw, 1.7rem);
          font-weight: 500;
          color: #f1f5f9;
          letter-spacing: -0.01em;
          line-height: 1.4;
        }
        .boot__hint { color: #6b7688; font-size: 12px; margin-top: 8px; }
        .boot__caret {
          display: inline-block; width: .55em; height: 1.05em;
          background: #2fe3a6; vertical-align: text-bottom; margin-left: 3px;
          animation: caret 1s step-end infinite;
        }
        .boot--out .boot__line { color: #6b7688; }
      `}</style>

      <AnimatePresence onExitComplete={finish}>
        {active && !gone && (
          <motion.div
            className={`boot ${phase === "out" ? "boot--out" : ""}`}
            onClick={close}
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
          >
            <div className="boot__inner" aria-live="off">
              {LINES.map((line, i) => {
                const s = shown[i];
                if (s === undefined) return null;
                const last = i === shown.length - 1 && phase === "run";
                return (
                  <div
                    key={i}
                    className={`boot__line ${line.kind === "welcome" ? "boot__welcome" : ""} ${line.kind === "hint" ? "boot__hint" : ""}`}
                  >
                    {line.kind === "cmd" && (
                      <>
                        <span className="boot__p">snehil@portfolio:~$</span> {s}
                      </>
                    )}
                    {line.kind === "ok" && (
                      <>
                        <span className="boot__ok">[ ok ]</span> {s}
                      </>
                    )}
                    {(line.kind === "welcome" || line.kind === "hint" || line.kind === "out") && s}
                    {last && line.kind !== "hint" && <span className="boot__caret" />}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
