"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { TrendingDown, Zap, DollarSign } from "lucide-react";

function DotPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`absolute pointer-events-none opacity-40 ${className}`}
      width="120"
      height="120"
      viewBox="0 0 120 120"
    >
      {Array.from({ length: 8 }, (_, row) =>
        Array.from({ length: 8 }, (_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={col * 16 + 8}
            cy={row * 16 + 8}
            r={1.5}
            fill="white"
            opacity={0.3}
          />
        ))
      )}
    </svg>
  );
}

const cards = [
  {
    icon: <TrendingDown size={20} className="text-[#00E599] mb-4" />,
    title: "Scales to zero",
    desc: "Pay nothing when idle. Burst to thousands of concurrent requests in 100ms.",
  },
  {
    icon: <Zap size={20} className="text-[#00E599] mb-4" />,
    title: "No cold starts",
    desc: "Predictive scaling keeps warm replicas ready before traffic arrives.",
  },
  {
    icon: <DollarSign size={20} className="text-[#00E599] mb-4" />,
    title: "Usage-based pricing",
    desc: "Pay per token, per second. No reserved capacity, no minimums.",
  },
];

type TabKey = "incidents" | "costs";

export default function AutoscalingSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("incidents");

  const statData: Record<TabKey, { value: string; label: string }> = {
    incidents: {
      value: "54,210",
      label: "performance degradations prevented every day",
    },
    costs: {
      value: "68%",
      label: "average infrastructure cost savings vs fixed capacity",
    },
  };

  return (
    <section
      id="autoscaling"
      className="relative py-24 border-b border-white/[0.06]"
    >
      <DotPattern className="top-0 left-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-[48px] leading-[54px] font-normal tracking-[-0.04em] text-center text-[#797D86] max-w-4xl mx-auto">
          <span className="text-white">Scale from zero.</span> Never overpay
          for resources you don&apos;t use.
        </h2>
      </motion.div>

      {/* Toggle tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="flex gap-2 mt-8 mb-10 justify-center"
      >
        {(
          [
            { key: "incidents" as TabKey, label: "Avoid incidents" },
            { key: "costs" as TabKey, label: "Save costs" },
          ] as { key: TabKey; label: string }[]
        ).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`rounded-full px-5 py-2 text-sm transition-colors ${
              activeTab === key
                ? "border border-white/30 text-white"
                : "border border-white/[0.08] text-[#797D86] hover:border-white/20"
            }`}
          >
            {label}
          </button>
        ))}
      </motion.div>

      {/* Large stat */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center mb-12"
      >
        <p className="text-[80px] font-normal tracking-[-0.04em] text-white leading-none">
          {statData[activeTab].value}
        </p>
        <p className="text-[#797D86] text-base mt-2">
          {statData[activeTab].label}
        </p>
      </motion.div>

      {/* 3-col cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {cards.map((card) => (
          <div key={card.title}>
            {card.icon}
            <h3 className="text-base font-medium text-white">{card.title}</h3>
            <p className="text-sm text-[#797D86] mt-2">{card.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* SVG capacity chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-[#111215] border border-white/[0.06] rounded-2xl p-6 mt-10"
      >
        <svg
          viewBox="0 0 800 200"
          className="w-full"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {[0, 50, 100, 150, 200].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="800"
              y2={y}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
          ))}
          {/* Fixed resource (flat orange) */}
          <polyline
            points="0,40 800,40"
            fill="none"
            stroke="#F97316"
            strokeWidth="2"
            strokeDasharray="6 4"
            opacity="0.7"
          />
          {/* Database load (gray dashed) */}
          <polyline
            points="0,160 100,150 200,120 300,80 400,100 500,130 600,90 700,110 800,140"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          {/* Synapse autoscaling (green) */}
          <polyline
            points="0,168 100,158 200,128 300,88 400,108 500,138 600,98 700,118 800,148"
            fill="none"
            stroke="#00E599"
            strokeWidth="2.5"
          />
        </svg>
        {/* Legend */}
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-[#00E599]" />
            <span className="text-xs text-[#797D86]">Synapse autoscaling</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-0.5 bg-white/30"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg,rgba(255,255,255,0.3) 0,rgba(255,255,255,0.3) 4px,transparent 4px,transparent 7px)",
              }}
            />
            <span className="text-xs text-[#797D86]">Database load</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-0.5 bg-orange-500 opacity-70"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg,#F97316 0,#F97316 6px,transparent 6px,transparent 10px)",
              }}
            />
            <span className="text-xs text-[#797D86]">Fixed-resource</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
