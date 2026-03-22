"use client";

import { motion } from "framer-motion";

const results = [
  {
    score: "0.97",
    text: "Transformer architectures leverage self-attention mechanisms to process sequences...",
  },
  {
    score: "0.94",
    text: "Large language models are trained on diverse text corpora using next-token prediction...",
  },
  {
    score: "0.91",
    text: "Embedding models convert text into dense vector representations that capture semantic...",
  },
];

export default function VectorDBSection() {
  return (
    <section
      id="vectordb"
      className="relative py-32 border-b border-white/[0.06] bg-black"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-medium text-[#00E599] uppercase tracking-widest mb-6">
              Vector DB
            </p>
            <h2 className="text-[48px] leading-[54px] font-normal tracking-[-0.04em] text-[#797D86]">
              <span className="text-white">Semantic search.</span>{" "}
              Sub-50ms queries across billions of embeddings.
            </h2>
            <p className="text-[#797D86] text-lg leading-relaxed mt-6 max-w-lg">
              HNSW-indexed vector storage built in. Hybrid BM25 + vector search.
              Query at millisecond latency with no infrastructure to manage.
            </p>
            <ul className="mt-6 space-y-3">
              {["HNSW indexing", "Hybrid search", "Auto-dimensionality"].map(
                (item) => (
                  <li key={item} className="flex items-center">
                    <span className="size-1.5 rounded-full bg-[#34D59A] mr-3 flex-shrink-0" />
                    <span className="text-[15px] text-[#797D86]">{item}</span>
                  </li>
                )
              )}
            </ul>
            <a
              href="#"
              className="text-[15px] text-white hover:text-[#00E599] transition-colors mt-8 inline-flex items-center gap-1.5"
            >
              Try vector search →
            </a>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-[#18191B] border border-white/[0.06] rounded-2xl overflow-hidden">
              {/* Query line */}
              <div className="bg-[#0D0D0D] rounded-xl m-4 p-5 font-mono text-sm">
                <p className="text-[#797D86] text-xs mb-3">QUERY</p>
                <div>
                  <span className="text-[#797D86]">{"const results = "}</span>
                  <span className="text-[#00E599]">{"await"}</span>
                  <span className="text-white/80">
                    {" synapse.vectors."}
                  </span>
                  <span className="text-[#00E599]">{"search"}</span>
                  <span className="text-[#797D86]">{"({"}</span>
                </div>
                <div>
                  <span className="text-[#797D86]">{"  query: "}</span>
                  <span className="text-[#34D59A]">
                    {'"how do transformers work"'}
                  </span>
                  <span className="text-[#797D86]">{","}</span>
                </div>
                <div>
                  <span className="text-[#797D86]">{"  topK: "}</span>
                  <span className="text-white/80">{"3"}</span>
                </div>
                <div>
                  <span className="text-[#797D86]">{"});"}</span>
                </div>
              </div>

              {/* Results */}
              <div className="px-4 pb-4 space-y-2">
                <p className="text-xs text-[#797D86] font-mono mb-3">
                  RESULTS ({results.length})
                </p>
                {results.map((r, i) => (
                  <div
                    key={i}
                    className="bg-[#0D0D0D] border border-white/[0.04] rounded-xl p-4 flex items-start gap-3"
                  >
                    <span className="text-[#00E599] font-mono text-xs pt-0.5 flex-shrink-0">
                      {r.score}
                    </span>
                    <p className="text-xs text-[#797D86] leading-relaxed line-clamp-2">
                      {r.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
