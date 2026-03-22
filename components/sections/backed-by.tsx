"use client";

import { motion } from "framer-motion";

export default function BackedBy() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#E4F1EB" }}>
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(44,74,62,0.12) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-8 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 0 }}>
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:pr-20 pb-16 lg:pb-0 lg:border-r"
            style={{ borderColor: "rgba(0,0,0,0.1)" }}
          >
            <div className="flex items-center gap-2 mb-6">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 5L5 1L9 5L5 9L1 5Z" fill="#ef4444" />
              </svg>
              <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "#2C6D4C", fontFamily: "var(--font-mono), monospace" }}>
                BACKED BY GIANTS
              </span>
            </div>

            <h2
              style={{
                fontSize: "clamp(26px, 2.8vw, 38px)",
                fontWeight: 400,
                lineHeight: 1.125,
                letterSpacing: "-0.04em",
                color: "#111215",
              }}
            >
              Trusted AI, Backed by Giants.{" "}
              <span style={{ color: "#6b7280" }}>
                Synapse was built by ML researchers, bringing decades of large-scale inference expertise.
              </span>
            </h2>

            {/* Stats grid */}
            <div className="mt-14 grid grid-cols-2 gap-10">
              {/* Stat 1 */}
              <div>
                <div className="mb-3">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M11 3l2.3 5.6H19l-4.7 3.4 1.8 5.6L11 14l-5.1 3.6 1.8-5.6L3 8.6h5.7L11 3z" stroke="#ef4444" strokeWidth={1.4} strokeLinejoin="round" fill="none"/>
                  </svg>
                </div>
                <p style={{ fontSize: "clamp(28px, 3vw, 38px)", fontWeight: 400, letterSpacing: "-1.5px", color: "#111215", lineHeight: 1 }}>
                  150,000+
                </p>
                <p className="text-sm mt-1.5" style={{ color: "#6b7280" }}>New endpoints provisioned daily</p>
              </div>

              {/* Stat 2 */}
              <div>
                <div className="mb-3">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <rect x="3" y="3" width="7" height="7" rx="1" stroke="#ef4444" strokeWidth={1.4}/>
                    <rect x="12" y="3" width="7" height="7" rx="1" stroke="#ef4444" strokeWidth={1.4}/>
                    <rect x="3" y="12" width="7" height="7" rx="1" stroke="#ef4444" strokeWidth={1.4}/>
                    <rect x="12" y="12" width="7" height="7" rx="1" stroke="#ef4444" strokeWidth={1.4}/>
                  </svg>
                </div>
                <p style={{ fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 400, letterSpacing: "-1px", color: "#111215", lineHeight: 1 }}>
                  Y Combinator
                </p>
                <p className="text-sm mt-1.5" style={{ color: "#6b7280" }}>Synapse is a YC company since W2024.</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="pt-16 lg:pt-0 lg:pl-20"
          >
            <div className="flex items-center gap-2 mb-6">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 5L5 1L9 5L5 9L1 5Z" fill="#ef4444" />
              </svg>
              <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "#2C6D4C", fontFamily: "var(--font-mono), monospace" }}>
                TRUSTED BY THE BEST
              </span>
            </div>

            {/* Testimonial 1 — matches neon's Koyeb testimonial format */}
            <div className="mt-8">
              <p
                className="leading-relaxed"
                style={{ fontSize: 15, color: "#111215", fontFamily: "var(--font-mono), monospace", lineHeight: 1.7 }}
              >
                &ldquo;Synapse&apos;s serverless philosophy is{" "}
                <mark
                  style={{
                    background: "rgba(52,213,154,0.22)",
                    color: "#1a5c3a",
                    borderRadius: 3,
                    padding: "0 3px",
                  }}
                >
                  aligned with our vision:
                </mark>{" "}
                no infrastructure to manage, no servers to provision, no model cluster to maintain.&rdquo;
              </p>
              <p className="mt-6 text-[13px]" style={{ color: "#2C6D4C", fontFamily: "var(--font-mono), monospace" }}>
                Edouard Bonlieu
              </p>
              <p className="mt-0.5 text-[12px]" style={{ color: "#6b7280", fontFamily: "var(--font-mono), monospace" }}>
                Co-founder at Koyeb
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="mt-10 pt-8 border-t" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
              <p
                className="leading-relaxed"
                style={{ fontSize: 15, color: "#111215", fontFamily: "var(--font-mono), monospace", lineHeight: 1.7 }}
              >
                &ldquo;We provisioned 41,000 model endpoints for our users with Synapse. The ability to scale instantly without managing infrastructure is game-changing.&rdquo;
              </p>
              <p className="mt-6 text-[13px]" style={{ color: "#2C6D4C", fontFamily: "var(--font-mono), monospace" }}>
                Marcus A.
              </p>
              <p className="mt-0.5 text-[12px]" style={{ color: "#6b7280", fontFamily: "var(--font-mono), monospace" }}>
                CTO at Launchpad
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
