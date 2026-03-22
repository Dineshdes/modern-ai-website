"use client";

import { motion } from "framer-motion";
import { FileText, BarChart2, TrendingUp } from "lucide-react";

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
    icon: <FileText size={20} className="text-[#00E599] mb-4" />,
    title: "Request logs",
    desc: "Every inference logged with model, tokens, latency, cost, and user ID.",
  },
  {
    icon: <BarChart2 size={20} className="text-[#00E599] mb-4" />,
    title: "Latency histograms",
    desc: "P50, P95, P99 latency distributions updated in real time.",
  },
  {
    icon: <TrendingUp size={20} className="text-[#00E599] mb-4" />,
    title: "Cost analytics",
    desc: "Per-model, per-user cost breakdowns. Set spend alerts and budgets.",
  },
];

const metrics = [
  {
    value: "12,847 req/min",
    badge: "↑8%",
    badgeColor: "text-[#00E599]",
    label: "Request rate",
  },
  {
    value: "48ms",
    badge: "✓ Within SLA",
    badgeColor: "text-[#00E599]",
    label: "P99 latency",
  },
  {
    value: "0.02%",
    badge: "✓ Normal",
    badgeColor: "text-[#00E599]",
    label: "Error rate",
  },
  {
    value: "$0.0012",
    badge: "per 1k tokens",
    badgeColor: "text-[#797D86]",
    label: "Avg cost",
  },
];

export default function ObservabilitySection() {
  return (
    <section
      id="observability"
      className="relative py-24 border-b border-white/[0.06]"
    >
      <DotPattern className="top-0 right-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-[48px] leading-[54px] font-normal tracking-[-0.04em] text-center text-[#797D86] max-w-4xl mx-auto">
          <span className="text-white">Full visibility.</span> Every inference
          request logged and measured in real time.
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

      {/* 2x2 metrics grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-2 gap-4 mt-10"
      >
        {metrics.map((m) => (
          <div
            key={m.label}
            className="bg-[#111215] border border-white/[0.06] rounded-xl p-5"
          >
            <p className="text-xs text-[#797D86] mb-2">{m.label}</p>
            <p className="text-2xl font-normal text-white tracking-tight">
              {m.value}
            </p>
            <p className={`text-xs mt-1 ${m.badgeColor}`}>{m.badge}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
