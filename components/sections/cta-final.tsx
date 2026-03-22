"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const TICKS = [0.25, 0.5, 1, 2, 3, 4];

function AutoscalingSlider() {
  const [minVal, setMinVal] = useState(1);
  const [maxVal, setMaxVal] = useState(3);

  const toPercent = (v: number) => ((v - 0.25) / (4 - 0.25)) * 100;

  return (
    <div className="mt-14 max-w-[520px]">
      <p className="text-sm mb-6" style={{ color: "#94979E", fontFamily: "var(--font-mono), monospace" }}>
        Autoscaling
      </p>

      {/* Slider track */}
      <div className="relative" style={{ height: 2, background: "rgba(255,255,255,0.1)", borderRadius: 2, margin: "12px 0 24px" }}>
        {/* Active range */}
        <div
          className="absolute h-full"
          style={{
            background: "#34D59A",
            left: `${toPercent(minVal)}%`,
            right: `${100 - toPercent(maxVal)}%`,
            borderRadius: 2,
          }}
        />
        {/* Min thumb */}
        <div
          className="absolute"
          style={{
            left: `${toPercent(minVal)}%`,
            top: "50%",
            transform: "translate(-50%,-50%)",
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "#34D59A",
            border: "2px solid #0C0D0D",
            cursor: "pointer",
          }}
        />
        {/* Max thumb */}
        <div
          className="absolute"
          style={{
            left: `${toPercent(maxVal)}%`,
            top: "50%",
            transform: "translate(-50%,-50%)",
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "#34D59A",
            border: "2px solid #0C0D0D",
            cursor: "pointer",
          }}
        />
      </div>

      {/* Range inputs (invisible, positioned over the track) */}
      <div className="relative" style={{ marginTop: -20, height: 20 }}>
        <input
          type="range" min={0.25} max={4} step={0.25} value={minVal}
          onChange={(e) => setMinVal(Math.min(Number(e.target.value), maxVal - 0.25))}
          className="absolute w-full cursor-pointer opacity-0"
          style={{ zIndex: 2 }}
        />
        <input
          type="range" min={0.25} max={4} step={0.25} value={maxVal}
          onChange={(e) => setMaxVal(Math.max(Number(e.target.value), minVal + 0.25))}
          className="absolute w-full cursor-pointer opacity-0"
          style={{ zIndex: 2 }}
        />
      </div>

      {/* Tick labels */}
      <div className="flex justify-between mt-4">
        {TICKS.map((t) => (
          <span key={t} className="text-[12px]" style={{ color: "#94979E", fontFamily: "var(--font-mono), monospace" }}>{t}</span>
        ))}
      </div>

      {/* Values */}
      <div className="mt-6 grid grid-cols-2 gap-8">
        <div>
          <p className="text-xs mb-1" style={{ color: "#94979E", fontFamily: "var(--font-mono), monospace" }}>Scale from</p>
          <p className="text-[15px]" style={{ color: "rgba(249,250,250,0.65)", fontFamily: "var(--font-mono), monospace" }}>{minVal} vCPU, {minVal * 2} RAM</p>
        </div>
        <div>
          <p className="text-xs mb-1" style={{ color: "#94979E", fontFamily: "var(--font-mono), monospace" }}>Scale up to</p>
          <p className="text-[15px]" style={{ color: "rgba(249,250,250,0.65)", fontFamily: "var(--font-mono), monospace" }}>{maxVal} vCPU, {maxVal * 4} RAM</p>
        </div>
      </div>
    </div>
  );
}

export default function CTAFinal() {
  return (
    <section style={{ background: "#0C0D0D" }}>
      {/* Big heading section */}
      <div className="max-w-[1400px] mx-auto px-8 pt-24 pb-16">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: "clamp(36px, 5.5vw, 72px)",
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
            color: "#F9FAFA",
            maxWidth: 720,
          }}
        >
          The world&apos;s most advanced AI platform.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <AutoscalingSlider />
        </motion.div>
      </div>

      {/* Bottom CTA bar */}
      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div
          className="max-w-[1400px] mx-auto px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="text-[15px] leading-snug" style={{ color: "#94979E" }}>
            <p>Trusted by developers, ready for agents.</p>
            <p>Build and scale AI faster with Synapse.</p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#"
              className="inline-flex items-center px-6 h-11 rounded-full text-sm font-medium transition-colors"
              style={{ background: "#F9FAFA", color: "#0C0D0D" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#e5e7eb")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#F9FAFA")}
            >
              Get started
            </a>
            <a
              href="#"
              className="inline-flex items-center px-6 h-11 rounded-full text-sm transition-colors"
              style={{ color: "#F9FAFA", border: "1px solid rgba(255,255,255,0.2)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
            >
              Read the docs
            </a>
            <button
              className="inline-flex items-center gap-2 px-4 h-11 rounded-xl text-sm transition-colors"
              style={{
                background: "#34D59A",
                color: "#0C0D0D",
                fontFamily: "var(--font-mono), monospace",
                fontWeight: 500,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#2cb885")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#34D59A")}
            >
              $ npx synapsectl init
              <span className="opacity-60 text-xs">⧉</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
