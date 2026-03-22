"use client";

import { motion } from "framer-motion";

export default function BackedBy() {
  return (
    <section className="bg-[#E4F1EB] py-32 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        {/* LEFT column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#2C6D4C] text-xs">▶</span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#2C6D4C]">
              BACKED BY GIANTS
            </span>
          </div>
          <h2 className="text-[48px] font-normal tracking-[-0.04em] leading-[54px] text-[#111215]">
            Trusted AI, Backed by Giants.{" "}
            <span className="text-[#797D86]">
              Synapse was built by ML researchers with decades of large-scale
              systems expertise.
            </span>
          </h2>

          <p className="text-[80px] font-normal tracking-tight text-[#111215] leading-none mt-16">
            10B+
          </p>
          <p className="text-[#797D86] text-base mt-2">
            Tokens processed daily
          </p>

          <div className="bg-white/60 border border-[#CAE6D9] rounded-2xl p-5 mt-8 inline-block">
            <p className="text-sm font-semibold text-[#111215]">Synapse AI</p>
            <p className="text-sm text-[#797D86] mt-1 max-w-xs">
              Serverless inference infrastructure for teams and AI agents.
            </p>
          </div>
        </motion.div>

        {/* RIGHT column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#2C6D4C] text-xs">▶</span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#2C6D4C]">
              TRUSTED BY THE BEST
            </span>
          </div>
          <p className="font-mono text-[15px] text-[#2C6D4C] leading-relaxed mt-6 max-w-sm">
            &quot;Synapse&apos;s serverless philosophy is aligned with our
            vision: no infrastructure to manage, no servers to provision, no
            endpoints to maintain.&quot;
          </p>
          <p className="text-sm text-[#2C6D4C] mt-6">
            — Marcus A., CTO at Launchpad
          </p>
        </motion.div>
      </div>
    </section>
  );
}
