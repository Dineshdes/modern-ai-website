"use client";

import { motion } from "framer-motion";

export default function InferenceSection() {
  return (
    <section
      id="inference"
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
              Inference
            </p>
            <h2 className="text-[48px] leading-[54px] font-normal tracking-[-0.04em] text-[#797D86]">
              <span className="text-white">Model serving.</span>{" "}
              Deploy any LLM with a single API call and the SDK handles the rest.
            </h2>
            <p className="text-[#797D86] text-lg leading-relaxed mt-6 max-w-lg">
              Connect to GPT-4o, Claude, Llama, or your own fine-tuned models
              through one unified endpoint. Zero config, instant switching.
            </p>
            <ul className="mt-6 space-y-3">
              {["OpenAI-compatible API", "Hot-swap models", "Streaming support"].map(
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
              Explore the API →
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
              <div className="bg-[#0D0D0D] rounded-xl m-4 p-6 font-mono text-sm leading-7">
                <div>
                  <span className="text-[#797D86]">{"const "}</span>
                  <span className="text-white/80">synapse</span>
                  <span className="text-[#797D86]">{" = "}</span>
                  <span className="text-[#00E599]">{"new"}</span>
                  <span className="text-white/80">{" Synapse"}</span>
                  <span className="text-[#797D86]">{"({"}</span>
                </div>
                <div>
                  <span className="text-[#797D86]">{"  apiKey: "}</span>
                  <span className="text-[#34D59A]">
                    {"process.env.SYNAPSE_KEY"}
                  </span>
                  <span className="text-[#797D86]">{","}</span>
                </div>
                <div>
                  <span className="text-[#797D86]">{"});"}</span>
                </div>
                <div className="mt-4">
                  <span className="text-[#797D86]">{"const "}</span>
                  <span className="text-white/80">stream</span>
                  <span className="text-[#797D86]">{" = "}</span>
                  <span className="text-[#00E599]">{"await"}</span>
                  <span className="text-white/80">{" synapse.chat."}</span>
                  <span className="text-[#00E599]">{"stream"}</span>
                  <span className="text-[#797D86]">{"({"}</span>
                </div>
                <div>
                  <span className="text-[#797D86]">{"  model: "}</span>
                  <span className="text-[#34D59A]">{'"llama-3.1-70b"'}</span>
                  <span className="text-[#797D86]">{","}</span>
                </div>
                <div>
                  <span className="text-[#797D86]">{"  messages: [{"}</span>
                </div>
                <div>
                  <span className="text-[#797D86]">{"    role: "}</span>
                  <span className="text-[#34D59A]">{'"user"'}</span>
                  <span className="text-[#797D86]">{","}</span>
                </div>
                <div>
                  <span className="text-[#797D86]">{"    content: "}</span>
                  <span className="text-[#34D59A]">{'"Hello!"'}</span>
                </div>
                <div>
                  <span className="text-[#797D86]">{"  }],"}</span>
                </div>
                <div>
                  <span className="text-[#797D86]">{"});"}</span>
                </div>
                <div className="mt-4">
                  <span className="text-[#00E599]">{"for await"}</span>
                  <span className="text-[#797D86]">
                    {" (const chunk of stream) {"}
                  </span>
                </div>
                <div>
                  <span className="text-white/80">{"  process.stdout."}</span>
                  <span className="text-[#00E599]">{"write"}</span>
                  <span className="text-[#797D86]">{"("}</span>
                  <span className="text-white/80">{"chunk.content"}</span>
                  <span className="text-[#797D86]">{");"}</span>
                </div>
                <div>
                  <span className="text-[#797D86]">{"}"}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
