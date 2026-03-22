"use client";

import { useState } from "react";
import { motion } from "framer-motion";

function AutoscalingSlider() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(3);
  const ticks = [0.25, 0.5, 1, 2, 3, 4];

  return (
    <div className="mt-16 max-w-xl">
      <p className="text-sm text-[#797D86] mb-6 font-mono">Autoscaling</p>
      <div className="relative">
        {/* Track */}
        <div className="h-px bg-white/[0.1] relative">
          <div
            className="absolute h-full bg-[#00E599]"
            style={{
              left: `${((min - 0.25) / (4 - 0.25)) * 100}%`,
              right: `${100 - ((max - 0.25) / (4 - 0.25)) * 100}%`,
            }}
          />
          {/* Min thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#00E599] border-2 border-black cursor-pointer"
            style={{ left: `${((min - 0.25) / (4 - 0.25)) * 100}%` }}
          />
          {/* Max thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#00E599] border-2 border-black cursor-pointer"
            style={{ left: `${((max - 0.25) / (4 - 0.25)) * 100}%` }}
          />
        </div>
        {/* Tick labels */}
        <div className="flex justify-between mt-4">
          {ticks.map((t) => (
            <span key={t} className="text-xs font-mono text-[#797D86]">{t}</span>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-8">
        <div>
          <p className="text-xs text-[#797D86] font-mono mb-1">Scale from</p>
          <p className="text-[15px] font-mono text-white/70">{min} vCPU, {min * 2} RAM</p>
        </div>
        <div>
          <p className="text-xs text-[#797D86] font-mono mb-1">Scale up to</p>
          <p className="text-[15px] font-mono text-white/70">{max} vCPU, {max * 4} RAM</p>
        </div>
      </div>

      {/* Hidden range inputs for interactivity */}
      <input
        type="range" min={0.25} max={4} step={0.25} value={min}
        onChange={(e) => setMin(Math.min(Number(e.target.value), max - 0.25))}
        className="sr-only"
      />
    </div>
  );
}

export default function CTAFinal() {
  return (
    <section className="bg-black border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-8 py-24">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="font-normal text-white"
          style={{ fontSize: "clamp(36px,5vw,68px)", lineHeight: 1.05, letterSpacing: "-2.7px", maxWidth: 700 }}
        >
          The world&apos;s most advanced AI platform.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <AutoscalingSlider />
        </motion.div>
      </div>

      {/* Footer CTA bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="text-[#797D86] text-[15px] leading-snug">
            <p>Trusted by developers, ready for agents.</p>
            <p>Build and scale AI faster with Synapse.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#"
              className="bg-white text-[#111215] font-medium px-6 h-11 rounded-full text-sm inline-flex items-center hover:bg-white/90 transition-colors"
            >
              Get started
            </a>
            <a
              href="#"
              className="border border-white/20 text-white px-6 h-11 rounded-full text-sm inline-flex items-center hover:border-white/40 transition-colors"
            >
              Read the docs
            </a>
            <button
              className="flex items-center gap-2 px-4 h-11 rounded-xl text-sm font-mono border border-white/[0.08] hover:border-white/20 transition-colors"
              style={{ background: "#111215" }}
            >
              <span className="text-[#00E599]">$</span>
              <span className="text-[#797D86]">npx synapsectl init</span>
              <span className="text-[#797D86] text-xs border border-white/10 rounded px-1">⧉</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
