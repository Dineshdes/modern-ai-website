"use client";

import { motion } from "framer-motion";
import { GlowEffect } from "@/components/shared/glow-effect";
import { CodeBlock } from "@/components/shared/code-block";

export function CTAFinal() {
  return (
    <section className="relative overflow-hidden py-40 px-6">
      <GlowEffect position="center" />

      <div className="relative z-10 max-w-[1216px] mx-auto flex flex-col items-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-bold text-white text-center tracking-tight"
        >
          Start building in minutes.
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[#A1A1AA] text-lg mt-4 text-center max-w-lg"
        >
          No credit card required. Full API access. Scale to zero when idle.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#signup"
            className="bg-[#00E599] text-black font-semibold px-6 py-3 rounded-lg hover:bg-[#34D59A] transition-colors text-sm text-center"
          >
            Create free account →
          </a>
          <a
            href="#sales"
            className="border border-white/[0.12] text-white font-semibold px-6 py-3 rounded-lg hover:border-white/25 hover:bg-white/[0.04] transition-all text-sm text-center"
          >
            Talk to sales
          </a>
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 w-full max-w-md"
        >
          <CodeBlock code="npx synapse init" showPrompt />
        </motion.div>
      </div>
    </section>
  );
}
