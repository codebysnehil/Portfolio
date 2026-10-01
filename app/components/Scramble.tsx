"use client";

import React, { useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#$%&@0123456789abcdefABCDEF";

/** Resolves `text` from random characters, left to right. */
export function scrambleTo(
  text: string,
  onFrame: (s: string) => void,
  opts: { duration?: number; delay?: number } = {},
) {
  const duration = opts.duration ?? 700;
  const delay = opts.delay ?? 0;
  const start = performance.now() + delay;
  let raf = 0;
  const step = (now: number) => {
    const t = (now - start) / duration;
    if (t < 0) {
      raf = requestAnimationFrame(step);
      return;
    }
    const settled = Math.floor(Math.min(t, 1) * text.length);
    let out = "";
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (i < settled || c === " ") out += c;
      else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    }
    onFrame(out);
    if (t < 1) raf = requestAnimationFrame(step);
    else onFrame(text);
  };
  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}

/** Text that scrambles in on mount and again on hover (if `hover`). */
export default function Scramble({
  text,
  delay = 0,
  duration = 700,
  hover = false,
  active = true,
  className,
}: {
  text: string;
  delay?: number;
  duration?: number;
  hover?: boolean;
  active?: boolean;
  className?: string;
}) {
  const [shown, setShown] = useState(text);
  const cancel = useRef<null | (() => void)>(null);

  const run = (d = 0) => {
    cancel.current?.();
    cancel.current = scrambleTo(text, setShown, { duration, delay: d });
  };

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    run(delay);
    return () => cancel.current?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, active]);

  return (
    <span
      className={className}
      onMouseEnter={hover ? () => run(0) : undefined}
      aria-label={text}
    >
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}

/** True once the boot intro has finished (or was skipped / already seen). */
export function useIntroDone() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (document.documentElement.dataset.intro === "done") {
      setDone(true);
      return;
    }
    const on = () => setDone(true);
    window.addEventListener("intro-done", on);
    return () => window.removeEventListener("intro-done", on);
  }, []);
  return done;
}
