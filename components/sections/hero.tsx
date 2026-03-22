"use client";

import { motion } from "framer-motion";

const row1Tags = [
  "Inference",
  "Fine-tuning",
  "Vector DB",
  "Autoscaling",
  "Observability",
  "MCP Support",
  "Serverless",
  "Multi-model",
];

const row2Tags = [
  "OpenAI Compatible",
  "Sub-50ms Latency",
  "Auto-branching",
  "Cost Analytics",
  "Fleet Management",
  "HIPAA",
  "SOC2",
];

const EASE = "easeOut" as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true } as const,
    transition: { duration: 0.5, delay, ease: EASE },
  };
}

function TagRow({
  tags,
  className,
}: {
  tags: string[];
  className: string;
}) {
  const doubled = [...tags, ...tags];
  return (
    <div className="overflow-hidden w-full">
      <div className={`flex gap-3 w-max ${className}`}>
        {doubled.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1.5 border border-white/[0.08] rounded-full px-3 py-1 text-xs text-[#797D86] whitespace-nowrap"
          >
            <span className="size-1.5 rounded-full bg-[#34D59A] flex-shrink-0" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-black pt-[40px]">
      {/* Background radial gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(0,229,153,0.07)_0%,transparent_70%)]" />

      {/* Left decorative dot grid */}
      <svg
        className="absolute left-0 top-0 pointer-events-none opacity-30"
        width="400"
        height="600"
        aria-hidden="true"
      >
        {Array.from({ length: 20 }).map((_, row) =>
          Array.from({ length: 10 }).map((_, col) => (
            <circle
              key={`l-${row}-${col}`}
              cx={col * 40 + 20}
              cy={row * 30 + 20}
              r="1.5"
              fill="rgba(255,255,255,0.25)"
            />
          ))
        )}
      </svg>

      {/* Right decorative dot grid */}
      <svg
        className="absolute right-0 top-0 pointer-events-none opacity-30"
        width="400"
        height="600"
        aria-hidden="true"
      >
        {Array.from({ length: 20 }).map((_, row) =>
          Array.from({ length: 10 }).map((_, col) => (
            <circle
              key={`r-${row}-${col}`}
              cx={col * 40 + 20}
              cy={row * 30 + 20}
              r="1.5"
              fill="rgba(255,255,255,0.25)"
            />
          ))
        )}
      </svg>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center">
        {/* Badge */}
        <motion.div {...fadeUp(0)}>
          <a
            href="#backed-by-giants"
            className="inline-flex items-center gap-2 bg-[#18191B] border border-white/[0.08] rounded-full px-3 py-1.5 text-[13px] text-[#797D86] hover:text-white transition-colors mb-8"
          >
            <span className="text-[#00E599] text-[10px]">✦</span>
            A DEVELOPER FIRST PLATFORM
          </a>
        </motion.div>

        {/* H1 */}
        <motion.h1
          {...fadeUp(0.08)}
          className="text-[60px] leading-[1.125] font-normal tracking-[-0.04em] text-white mt-4 max-w-3xl"
        >
          Fast AI Inference for Teams and Agents
        </motion.h1>

        {/* CTA row */}
        <motion.div
          {...fadeUp(0.16)}
          className="flex items-center gap-4 mt-8 justify-center"
        >
          <a
            href="#"
            className="bg-white text-[#1a1a1a] font-medium text-base px-7 h-12 rounded-full inline-flex items-center hover:bg-white/90 transition-colors"
          >
            Get started
          </a>
          <a
            href="#"
            className="text-white text-base font-normal hover:text-white/70 transition-colors inline-flex items-center gap-1"
          >
            Read the docs
          </a>
        </motion.div>

        {/* Feature tag rows */}
        <motion.div
          {...fadeUp(0.24)}
          className="mt-14 w-full max-w-3xl flex flex-col gap-3"
        >
          <TagRow tags={row1Tags} className="animate-scroll-left" />
          <TagRow tags={row2Tags} className="animate-scroll-right" />
        </motion.div>
      </div>
    </section>
  );
}
