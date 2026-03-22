"use client";

import { motion } from "framer-motion";

const EASE = "easeOut" as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { duration: 0.5, delay, ease: EASE },
});

const trustedCompanies = ["Stripe", "Vercel", "Linear", "Notion", "Figma", "Shopify"];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-black pt-16">
      {/* Background radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(0,229,153,0.06), transparent)",
        }}
      />

      {/* Left decorative dot grid */}
      <svg
        className="absolute left-0 top-0 pointer-events-none"
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
              fill="rgba(255,255,255,0.04)"
            />
          ))
        )}
      </svg>

      {/* Right decorative dot grid */}
      <svg
        className="absolute right-0 top-0 pointer-events-none"
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
              fill="rgba(255,255,255,0.04)"
            />
          ))
        )}
      </svg>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Announcement badge */}
        <motion.div {...fadeUp(0)}>
          <span className="inline-flex items-center gap-2 text-xs border border-white/[0.1] bg-white/[0.04] rounded-full px-3 py-1.5 text-[#94979E]">
            <span className="size-1.5 rounded-full bg-[#34D59A] inline-block" />
            Introducing Synapse v2.0 — Now in public beta
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.08)}
          className="leading-[1.1] font-normal tracking-[-0.02em] text-white mt-6 max-w-3xl mx-auto"
          style={{ fontSize: "60px" }}
        >
          The AI infrastructure built for{" "}
          <span className="text-[#00E599]">scale</span>.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          {...fadeUp(0.16)}
          className="text-lg text-[#94979E] max-w-lg mx-auto mt-6 leading-relaxed font-normal"
        >
          Deploy, fine-tune, and serve any language model in production. Built
          for developers who don&apos;t compromise.
        </motion.p>

        {/* CTA row */}
        <motion.div
          {...fadeUp(0.24)}
          className="flex items-center justify-center gap-3 mt-10"
        >
          <a
            href="#signup"
            className="bg-white text-[#1a1a1a] text-sm font-medium px-6 py-2.5 rounded-full hover:bg-white/90 transition-colors inline-flex items-center gap-1.5"
          >
            Get started →
          </a>
          <a
            href="#docs"
            className="text-sm text-[#94979E] hover:text-white transition-colors inline-flex items-center gap-1"
          >
            Read the docs
          </a>
        </motion.div>

        {/* Terminal block */}
        <motion.div {...fadeUp(0.32)} className="mt-16 max-w-lg mx-auto">
          <div className="bg-[#18191B] border border-white/[0.08] rounded-xl p-4 text-left font-mono text-sm">
            <div>
              <span className="text-[#00E599]">$</span>
              <span className="text-[#94979E]"> npx synapse init</span>
            </div>
            <div className="mt-2">
              <span className="text-[#00E599]">✓</span>
              <span className="text-[#94979E]"> Connected to Synapse AI</span>
            </div>
            <div>
              <span className="text-[#00E599]">✓</span>
              <span className="text-[#94979E]"> Model llama-3.1-70b deployed</span>
            </div>
            <div>
              <span className="text-[#00E599]">✓</span>
              <span className="text-[#94979E]"> Endpoint ready at api.synapse.ai</span>
            </div>
          </div>
        </motion.div>

        {/* Trusted by */}
        <motion.div {...fadeUp(0.4)} className="mt-10">
          <p className="text-xs text-[#94979E] uppercase tracking-widest">
            Trusted by teams at
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center">
            {trustedCompanies.map((company) => (
              <span key={company} className="text-white/30 font-medium mx-3 my-1">
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
