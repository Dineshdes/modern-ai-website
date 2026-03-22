"use client";

import { motion } from "framer-motion";

const EASE = "easeOut" as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { duration: 0.5, delay, ease: EASE },
});

export default function CTAFinal() {
  return (
    <section className="bg-black border-t border-white/[0.06] py-32">
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Label */}
        <motion.p
          {...fadeUp(0)}
          className="text-xs uppercase tracking-widest text-[#94979E] mb-6"
        >
          Get started today
        </motion.p>

        {/* Heading */}
        <motion.h2
          {...fadeUp(0.08)}
          className="text-white tracking-[-0.02em] leading-tight font-normal"
          style={{ fontSize: "clamp(48px,6vw,60px)" }}
        >
          Start building in minutes.
        </motion.h2>

        {/* Sub */}
        <motion.p
          {...fadeUp(0.16)}
          className="text-[#94979E] text-lg mt-4 max-w-md mx-auto"
        >
          No credit card required. Full API access. Scales to zero.
        </motion.p>

        {/* CTA row */}
        <motion.div
          {...fadeUp(0.24)}
          className="flex items-center justify-center gap-3 mt-10"
        >
          <a
            href="#signup"
            className="bg-white text-[#1a1a1a] font-medium px-7 py-3 rounded-full hover:bg-white/90 transition-colors text-sm"
          >
            Get started →
          </a>
          <a
            href="#sales"
            className="text-sm text-[#94979E] hover:text-white transition-colors"
          >
            Talk to sales
          </a>
        </motion.div>

        {/* Terminal */}
        <motion.div
          {...fadeUp(0.32)}
          className="mt-12 max-w-xs mx-auto bg-[#18191B] border border-white/[0.08] rounded-xl p-4 font-mono text-sm text-left"
        >
          <span className="text-[#00E599]">$</span>
          <span className="text-[#94979E]"> npx synapse init</span>
        </motion.div>
      </div>
    </section>
  );
}
