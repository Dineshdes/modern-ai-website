"use client";

import { motion } from "framer-motion";
import { Search, Layers, Settings } from "lucide-react";

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
    icon: <Search size={20} className="text-[#00E599] mb-4" />,
    title: "HNSW indexing",
    desc: "Approximate nearest neighbor search with 99% recall at millisecond latency.",
  },
  {
    icon: <Layers size={20} className="text-[#00E599] mb-4" />,
    title: "Hybrid search",
    desc: "Combine vector similarity with BM25 keyword search for best results.",
  },
  {
    icon: <Settings size={20} className="text-[#00E599] mb-4" />,
    title: "Auto-dimensionality",
    desc: "Works with any embedding model. 768, 1536, or 3072 dimensions.",
  },
];

const searchResults = [
  { text: "How to deploy a transformer model in production", score: 0.97 },
  { text: "Best practices for LLM fine-tuning on custom data", score: 0.94 },
  { text: "Optimizing inference latency for real-time applications", score: 0.91 },
];

export default function VectorDBSection() {
  return (
    <section
      id="vectordb"
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
          <span className="text-white">Semantic search.</span> Sub-50ms queries
          across billions of embeddings, at any scale.
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

      {/* Search results card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-[#111215] border border-white/[0.06] rounded-2xl p-6 mt-10"
      >
        <div className="flex items-center gap-2 mb-4">
          <Search size={14} className="text-[#797D86]" />
          <span className="font-mono text-sm text-[#797D86]">
            &quot;LLM deployment best practices&quot;
          </span>
          <span className="ml-auto text-xs text-[#797D86] font-mono">
            42ms
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {searchResults.map((r) => (
            <div
              key={r.text}
              className="flex items-center justify-between border-b border-white/[0.04] pb-3 last:border-0 last:pb-0"
            >
              <span className="text-sm text-white/70">{r.text}</span>
              <span className="text-xs font-mono text-[#00E599] ml-4 shrink-0">
                {r.score}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
