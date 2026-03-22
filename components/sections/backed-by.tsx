"use client";

import { motion } from "framer-motion";

export default function BackedBy() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#E4F1EB" }}>
      {/* Very subtle dot pattern bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, #00000015 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-8 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left column — divider line */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:pr-20 lg:border-r border-black/[0.1] pb-16 lg:pb-0"
          >
            <div className="flex items-center gap-2 mb-6">
              <span style={{ color: "#ef4444", fontSize: 9 }}>▶</span>
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#2C6D4C]">
                BACKED BY GIANTS
              </span>
            </div>

            <h2
              className="font-normal text-[#111215] leading-tight"
              style={{ fontSize: "clamp(28px,3vw,38px)", letterSpacing: "-1.5px" }}
            >
              Trusted AI, Backed by Giants.{" "}
              <span className="text-[#6b7280]">
                Synapse was built by ML researchers, bringing decades of large-scale systems expertise.
              </span>
            </h2>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2l2 6h6l-5 3.5 2 6L10 14l-5 3.5 2-6L2 8h6l2-6z" stroke="#ef4444" strokeWidth={1.5} fill="none"/>
                  </svg>
                </div>
                <p
                  className="font-normal text-[#111215] leading-none"
                  style={{ fontSize: "clamp(28px,3vw,36px)", letterSpacing: "-1px" }}
                >
                  10B+
                </p>
                <p className="text-sm text-[#6b7280] mt-1">Tokens processed daily</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M2 10L10 4l8 6v8H2v-8z" stroke="#ef4444" strokeWidth={1.5} fill="none"/>
                    <rect x="7" y="13" width="6" height="5" stroke="#ef4444" strokeWidth={1.5}/>
                  </svg>
                </div>
                <p
                  className="font-normal text-[#111215] leading-none"
                  style={{ fontSize: "clamp(24px,2.5vw,30px)", letterSpacing: "-1px" }}
                >
                  Y Combinator
                </p>
                <p className="text-sm text-[#6b7280] mt-1">Synapse is a YC company since W2024.</p>
              </div>
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:pl-20 pt-16 lg:pt-0"
          >
            <div className="flex items-center gap-2 mb-6">
              <span style={{ color: "#ef4444", fontSize: 9 }}>▶</span>
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#2C6D4C]">
                TRUSTED BY THE BEST
              </span>
            </div>

            {/* Testimonial */}
            <div className="mt-6">
              <p
                className="font-mono text-[#111215] leading-relaxed"
                style={{ fontSize: 15 }}
              >
                &quot;Synapse&apos;s serverless philosophy is{" "}
                <span
                  className="rounded px-1"
                  style={{ background: "#00E59930", color: "#1a5c3a" }}
                >
                  aligned with our vision:
                </span>{" "}
                no infrastructure to manage, no servers to provision, no cluster to maintain.&quot;
              </p>
              <p className="font-mono text-[13px] text-[#2C6D4C] mt-6">Marcus A.</p>
              <p className="font-mono text-[12px] text-[#6b7280] mt-0.5">Co-founder at Launchpad</p>
            </div>

            {/* Second testimonial */}
            <div className="mt-12 pt-8 border-t border-black/[0.08]">
              <p
                className="font-mono text-[#111215] leading-relaxed"
                style={{ fontSize: 15 }}
              >
                &quot;We evaluated every AI inference provider. Synapse was the only one that could handle
                our agent workloads without breaking the bank.&quot;
              </p>
              <p className="font-mono text-[13px] text-[#2C6D4C] mt-6">Sophie L.</p>
              <p className="font-mono text-[12px] text-[#6b7280] mt-0.5">CTO at Arcadia Tech</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
