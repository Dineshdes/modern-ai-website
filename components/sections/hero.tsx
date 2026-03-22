"use client";

import { motion, type Transition } from "framer-motion";
import { GlowEffect } from "@/components/shared/glow-effect";
import { GridBackground } from "@/components/shared/grid-background";
import { CodeBlock } from "@/components/shared/code-block";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" } as Transition,
});

const trustedCompanies = ["Stripe", "Vercel", "Linear", "Notion", "Figma"];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
      <GlowEffect position="top-center" />
      <GridBackground />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-32">
        {/* Badge */}
        <motion.div {...fadeUp(0)}>
          <span className="inline-block border border-[#00E599]/30 text-[#00E599] text-xs px-4 py-1.5 rounded-full bg-[#00E599]/10">
            ✦ Now in public beta — Synapse AI v2.0
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.1)}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-none mt-6 text-white"
        >
          The AI infrastructure
          <br />
          built for{" "}
          <span className="text-[#00E599]">scale</span>.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-lg text-[#A1A1AA] max-w-xl mx-auto mt-6 leading-relaxed"
        >
          Deploy, fine-tune, and scale any AI model with a single API. From
          prototype to production in minutes — not months.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          {...fadeUp(0.3)}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#signup"
            className="bg-[#00E599] text-black font-semibold px-6 py-3 rounded-lg hover:bg-[#34D59A] transition-colors text-sm"
          >
            Start for free →
          </a>
          <a
            href="#docs"
            className="border border-white/[0.12] text-white font-semibold px-6 py-3 rounded-lg hover:border-white/25 hover:bg-white/[0.04] transition-all text-sm"
          >
            Read the docs
          </a>
        </motion.div>

        {/* Terminal */}
        <motion.div {...fadeUp(0.4)} className="mt-16 max-w-lg mx-auto">
          <CodeBlock code="npx synapse init --model llama-3.1" showPrompt />
        </motion.div>

        {/* Trusted by */}
        <motion.div {...fadeUp(0.5)} className="mt-12">
          <p className="text-xs text-[#71717A] mb-4 uppercase tracking-widest">
            Trusted by engineers at
          </p>
          <div className="flex flex-wrap gap-6 justify-center items-center">
            {trustedCompanies.map((company) => (
              <span key={company} className="text-sm font-semibold text-white/25">
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
