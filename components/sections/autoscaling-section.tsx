"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function AutoscalingSection() {
  const [activeTab, setActiveTab] = useState<"incidents" | "costs">(
    "incidents"
  );

  return (
    <section
      id="autoscaling"
      className="relative py-32 border-b border-white/[0.06] bg-black"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Visual (left) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-[#18191B] border border-white/[0.06] rounded-2xl p-6">
              <p className="text-xs text-[#797D86] font-mono mb-4">
                LOAD VS CAPACITY — 24H
              </p>
              <svg
                viewBox="0 0 400 200"
                className="w-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Grid lines */}
                {[0, 50, 100, 150].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="400"
                    y2={y}
                    stroke="rgba(255,255,255,0.04)"
                    strokeWidth="1"
                  />
                ))}

                {/* Fixed resource (flat line, high) */}
                <line
                  x1="0"
                  y1="50"
                  x2="400"
                  y2="50"
                  stroke="#E5845A"
                  strokeWidth="1.5"
                  strokeDasharray="5,4"
                  opacity="0.7"
                />

                {/* Database load (wavy) */}
                <polyline
                  points="0,150 40,140 80,120 120,100 160,80 200,60 240,70 280,85 320,110 360,130 400,145"
                  fill="none"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="4,3"
                />

                {/* Synapse autoscaling (follows load closely) */}
                <polyline
                  points="0,148 40,138 80,118 120,98 160,78 200,58 240,68 280,83 320,108 360,128 400,143"
                  fill="none"
                  stroke="#00E599"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Legend */}
                <circle cx="16" cy="185" r="4" fill="#00E599" />
                <text x="26" y="189" fill="#797D86" fontSize="10">
                  Synapse autoscaling
                </text>
                <circle cx="160" cy="185" r="4" fill="rgba(255,255,255,0.25)" />
                <text x="170" y="189" fill="#797D86" fontSize="10">
                  Database load
                </text>
                <circle cx="290" cy="185" r="4" fill="#E5845A" />
                <text x="300" y="189" fill="#797D86" fontSize="10">
                  Fixed-resource
                </text>
              </svg>
            </div>
          </motion.div>

          {/* Text (right) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2"
          >
            <p className="text-xs font-medium text-[#00E599] uppercase tracking-widest mb-6">
              Autoscaling
            </p>
            <h2 className="text-[48px] leading-[54px] font-normal tracking-[-0.04em] text-[#797D86]">
              <span className="text-white">Scale from zero.</span>{" "}
              Never overpay for resources you don&apos;t use.
            </h2>
            <p className="text-[#797D86] text-lg leading-relaxed mt-6 max-w-lg">
              Serverless inference that scales to zero when idle and bursts to
              thousands of concurrent requests in under 100ms.
            </p>

            {/* Toggle buttons */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setActiveTab("incidents")}
                className={[
                  "border rounded-full px-4 py-1.5 text-sm transition-colors",
                  activeTab === "incidents"
                    ? "text-white border-white/30"
                    : "text-[#797D86] border-white/[0.1] hover:text-white",
                ].join(" ")}
              >
                Avoid incidents
              </button>
              <button
                onClick={() => setActiveTab("costs")}
                className={[
                  "border rounded-full px-4 py-1.5 text-sm transition-colors",
                  activeTab === "costs"
                    ? "text-white border-white/30"
                    : "text-[#797D86] border-white/[0.1] hover:text-white",
                ].join(" ")}
              >
                Save costs
              </button>
            </div>

            {/* Big stat */}
            <div className="mt-10">
              <p className="text-[60px] font-normal text-white tracking-tight leading-none">
                54,210
              </p>
              <p className="text-[#797D86] mt-2">
                performance degradations prevented daily
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
