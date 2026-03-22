"use client";

import { motion } from "framer-motion";

const EASE = "easeOut" as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true } as const,
    transition: { duration: 0.5, delay, ease: EASE },
  };
}

export default function CTAFinal() {
  return (
    <section className="bg-black py-40 text-center overflow-hidden relative">
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,rgba(0,229,153,0.06),transparent)]" />

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        {/* Heading */}
        <motion.h2
          {...fadeUp(0)}
          className="text-[48px] md:text-[60px] font-normal tracking-[-0.04em] text-white leading-tight"
        >
          The world&apos;s most advanced AI inference platform.
        </motion.h2>

        {/* Sub */}
        <motion.p
          {...fadeUp(0.08)}
          className="text-[#797D86] text-lg mt-4 max-w-lg mx-auto"
        >
          Trusted by developers, ready for agents. Build and scale applications
          faster with Synapse.
        </motion.p>

        {/* CTA row */}
        <motion.div
          {...fadeUp(0.16)}
          className="flex items-center justify-center gap-4 mt-10"
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

        {/* Terminal block */}
        <motion.div {...fadeUp(0.24)} className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-3 bg-[#18191B] border border-white/[0.08] rounded-xl px-5 py-3 font-mono text-sm cursor-pointer hover:border-white/[0.15] transition-colors">
            <span className="text-[#00E599]">$</span>
            <span className="text-[#797D86]">npx synapse init</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
