"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  label: string;
}

function parseValue(raw: string): { num: number; prefix: string; suffix: string } {
  // Extract leading non-digit prefix (e.g. "<", "$")
  const prefixMatch = raw.match(/^([^0-9]*)/);
  const prefix = prefixMatch ? prefixMatch[1] : "";
  const rest = raw.slice(prefix.length);

  // Extract trailing suffix (e.g. "B+", "%", "ms", "+")
  const numMatch = rest.match(/^([0-9.]+)(.*)/);
  if (!numMatch) {
    return { num: 0, prefix, suffix: rest };
  }
  return {
    num: parseFloat(numMatch[1]),
    prefix,
    suffix: numMatch[2],
  };
}

function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

export function AnimatedCounter({ value, label }: AnimatedCounterProps) {
  const { num, prefix, suffix } = parseValue(value);
  const [displayed, setDisplayed] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const duration = 1500;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuad(progress);
      setDisplayed(eased * num);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [started, num]);

  const displayStr =
    num % 1 !== 0
      ? displayed.toFixed(2)
      : Math.round(displayed).toString();

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-white">
        {prefix}
        {displayStr}
        {suffix}
      </div>
      <div className="text-sm text-[#A1A1AA] mt-2">{label}</div>
    </div>
  );
}
