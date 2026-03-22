"use client";

import { motion } from "framer-motion";
import { Server, Shield, Download } from "lucide-react";

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
    icon: <Server size={20} className="text-[#00E599] mb-4" />,
    title: "Managed jobs",
    desc: "Launch training runs in under 3 minutes. No infrastructure to manage.",
  },
  {
    icon: <Shield size={20} className="text-[#00E599] mb-4" />,
    title: "Data stays in VPC",
    desc: "Your training data never leaves your environment. Full data residency.",
  },
  {
    icon: <Download size={20} className="text-[#00E599] mb-4" />,
    title: "Full weight ownership",
    desc: "Download and self-host your fine-tuned weights at any time.",
  },
];

export default function FineTuningSection() {
  return (
    <section
      id="finetuning"
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
          <span className="text-white">Train on your data.</span> Own your
          weights, keep your data in your environment.
        </h2>
      </motion.div>

      {/* 3-col cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
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

      {/* Training progress card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-[#111215] border border-white/[0.06] rounded-2xl p-6 mt-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-[#797D86]">
            TRAINING JOB #1847
          </span>
          <span className="text-[#00E599] text-xs">RUNNING</span>
        </div>
        {/* Progress bar */}
        <div className="bg-[#18191B] rounded-full h-1.5 mt-4">
          <div
            className="bg-[#00E599] h-1.5 rounded-full"
            style={{ width: "65%" }}
          />
        </div>
        {/* Stats row */}
        <div className="flex gap-8 mt-4">
          {[
            { label: "Epoch", value: "3/10" },
            { label: "Loss", value: "0.0842" },
            { label: "LR", value: "2e-5" },
            { label: "ETA", value: "14min" },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-xs text-[#797D86] font-mono">{label}</span>
              <span className="text-xs text-white font-mono">{value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
