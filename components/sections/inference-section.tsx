"use client";

import { motion } from "framer-motion";
import { Zap, GitBranch, Wifi } from "lucide-react";

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
    icon: <Zap size={20} className="text-[#00E599] mb-4" />,
    title: "OpenAI-compatible",
    desc: "Use any OpenAI client. Zero changes to your existing code.",
  },
  {
    icon: <GitBranch size={20} className="text-[#00E599] mb-4" />,
    title: "Hot-swap models",
    desc: "Switch between GPT-4o, Claude, Llama without touching your integration.",
  },
  {
    icon: <Wifi size={20} className="text-[#00E599] mb-4" />,
    title: "Streaming support",
    desc: "Real-time token streaming out of the box. Works with any model.",
  },
];

export default function InferenceSection() {
  return (
    <section
      id="inference"
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
          <span className="text-white">Model serving.</span> Deploy any LLM
          with one API call and the SDK handles everything.
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

      {/* Code card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-[#111215] border border-white/[0.06] rounded-2xl p-6 mt-10 font-mono text-sm"
      >
        <div>
          <span className="text-[#797D86]">const </span>
          <span className="text-white/80">synapse</span>
          <span className="text-[#797D86]"> = </span>
          <span className="text-[#00E599]">new</span>
          <span className="text-white/80"> Synapse</span>
          <span className="text-[#797D86]">{"({"}</span>
        </div>
        <div>
          <span className="text-[#797D86]">{"  apiKey: "}</span>
          <span className="text-[#34D59A]">process.env.SYNAPSE_KEY</span>
          <span className="text-[#797D86]">{","}</span>
        </div>
        <div>
          <span className="text-[#797D86]">{"});"}</span>
        </div>
        <div className="mt-4">
          <span className="text-[#797D86]">const </span>
          <span className="text-white/80">stream</span>
          <span className="text-[#797D86]"> = </span>
          <span className="text-[#00E599]">await</span>
          <span className="text-white/80"> synapse.chat.</span>
          <span className="text-[#00E599]">stream</span>
          <span className="text-[#797D86]">{"({"}</span>
        </div>
        <div>
          <span className="text-[#797D86]">{"  model: "}</span>
          <span className="text-[#34D59A]">&quot;llama-3.1-70b&quot;</span>
          <span className="text-[#797D86]">{","}</span>
        </div>
        <div>
          <span className="text-[#797D86]">{"  messages: [{ role: "}</span>
          <span className="text-[#34D59A]">&quot;user&quot;</span>
          <span className="text-[#797D86]">{", content: "}</span>
          <span className="text-[#34D59A]">&quot;Hello!&quot;</span>
          <span className="text-[#797D86]">{" }],"}</span>
        </div>
        <div>
          <span className="text-[#797D86]">{"});"}</span>
        </div>
      </motion.div>
    </section>
  );
}
