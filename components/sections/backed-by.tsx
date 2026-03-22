"use client";

import { motion } from "framer-motion";

export default function BackedBy() {
  return (
    <section
      id="backed-by-giants"
      className="bg-black border-b border-white/[0.06] py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-medium text-[#797D86] uppercase tracking-widest mb-8"
        >
          Backed by giants
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-[48px] font-normal tracking-[-0.04em] text-[#797D86] leading-[54px]"
        >
          <span className="text-white">Trusted AI, Backed by Giants.</span>{" "}
          Synapse was founded by ML researchers, bringing years of large-scale
          systems expertise.
        </motion.h2>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-[80px] font-normal tracking-[-0.04em] text-white leading-none">
              10B+
            </h3>
            <p className="text-[#797D86] text-base mt-2">
              Tokens processed daily
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-[#18191B] border border-white/[0.06] rounded-2xl p-6 flex flex-col justify-center"
          >
            <p className="text-white font-medium text-lg mb-2">
              Synapse Research Labs
            </p>
            <p className="text-[#797D86] text-sm leading-relaxed">
              Founded by researchers from DeepMind, OpenAI, and Google Brain.
              Building the infrastructure the world&apos;s AI runs on.
            </p>
          </motion.div>
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 border-t border-white/[0.06] pt-16"
        >
          <p className="text-xs text-[#797D86] uppercase tracking-widest mb-8">
            Trusted by the best
          </p>
          <blockquote className="text-[28px] font-normal text-[#797D86] leading-relaxed max-w-3xl">
            &ldquo;Synapse cut our inference costs by 60% while giving us
            sub-50ms latency on every request. It&apos;s the only platform we
            trust at this scale.&rdquo;
          </blockquote>
          <div className="flex items-center gap-4 mt-8">
            <div className="size-10 rounded-full bg-[#18191B] border border-white/[0.08] flex items-center justify-center text-[#797D86] text-sm font-medium">
              AK
            </div>
            <div>
              <p className="text-white text-sm font-medium">Aisha Kowalski</p>
              <p className="text-[#797D86] text-sm">
                CTO, Meridian AI
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
