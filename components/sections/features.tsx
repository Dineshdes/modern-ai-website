"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { motion } from "framer-motion";

const EASE = "easeOut" as const;

/* ------------------------------------------------------------------ */
/* Right-side visuals                                                    */
/* ------------------------------------------------------------------ */

function ModelServingCard() {
  return (
    <div className="bg-[#18191B] border border-white/[0.06] rounded-2xl p-6 font-mono text-sm">
      <div className="text-[#94979E] leading-relaxed">
        <span className="text-[#00E599]">const</span>
        <span className="text-white"> ai </span>
        <span className="text-[#00E599]">=</span>
        <span className="text-white"> new Synapse</span>
        <span className="text-[#94979E]">{"({"} </span>
        <span className="text-[#00E599]">apiKey</span>
        <span className="text-[#94979E]">: </span>
        <span className="text-[#00E599]">&quot;sk-...&quot;</span>
        <span className="text-[#94979E]"> {"})"};</span>
      </div>
      <div className="mt-4 text-[#94979E]">&nbsp;</div>
      <div className="text-[#94979E]">
        <span className="text-[#00E599]">const</span>
        <span className="text-white"> res </span>
        <span className="text-[#00E599]">=</span>
        <span className="text-white"> await</span>
        <span className="text-white"> ai</span>
        <span className="text-[#94979E]">.</span>
        <span className="text-white">chat</span>
        <span className="text-[#94979E]">{"({"}</span>
      </div>
      <div className="pl-4 text-[#94979E]">
        <span className="text-white">model</span>
        <span className="text-[#94979E]">: </span>
        <span className="text-[#00E599]">&quot;llama-3.1-70b&quot;</span>
        <span className="text-[#94979E]">,</span>
      </div>
      <div className="pl-4 text-[#94979E]">
        <span className="text-white">messages</span>
        <span className="text-[#94979E]">: [</span>
      </div>
      <div className="pl-8 text-[#94979E]">
        <span className="text-[#94979E]">{"{"} </span>
        <span className="text-white">role</span>
        <span className="text-[#94979E]">: </span>
        <span className="text-[#00E599]">&quot;user&quot;</span>
        <span className="text-[#94979E]">, </span>
        <span className="text-white">content</span>
        <span className="text-[#94979E]">: </span>
        <span className="text-[#00E599]">&quot;Hello!&quot;</span>
        <span className="text-[#94979E]"> {"}"}</span>
      </div>
      <div className="pl-4 text-[#94979E]">]</div>
      <div className="text-[#94979E]">{"})"};</div>
    </div>
  );
}

function FineTuningCard() {
  const barHeights = [40, 52, 38, 30, 22, 18, 14, 12];

  return (
    <div className="bg-[#18191B] border border-white/[0.06] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[#94979E] text-sm font-mono">Training · Epoch 3/10</span>
        <span className="text-xs text-[#00E599] bg-[#00E599]/10 px-2 py-0.5 rounded-full">
          Running
        </span>
      </div>
      {/* Loss graph */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-[#94979E] mb-2">
          <span>Loss</span>
          <span>1.4321</span>
        </div>
        <div className="flex items-end gap-1.5 h-16">
          {barHeights.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                backgroundColor:
                  i < 3 ? "rgba(0,229,153,0.7)" : "rgba(0,229,153,0.25)",
              }}
            />
          ))}
        </div>
      </div>
      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-xs text-[#94979E] mb-1">
          <span>Progress</span>
          <span>30%</span>
        </div>
        <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
          <div className="h-full bg-[#00E599] rounded-full" style={{ width: "30%" }} />
        </div>
      </div>
    </div>
  );
}

function VectorDBCard() {
  return (
    <div className="bg-[#18191B] border border-white/[0.06] rounded-2xl p-6 font-mono text-sm">
      <div className="text-[#94979E]">
        <span className="text-[#00E599]">const</span>
        <span className="text-white"> results </span>
        <span className="text-[#00E599]">=</span>
        <span className="text-white"> await</span>
        <span className="text-white"> ai</span>
        <span className="text-[#94979E]">.</span>
        <span className="text-white">vectors</span>
        <span className="text-[#94979E]">.</span>
        <span className="text-white">query</span>
        <span className="text-[#94979E]">{"({"}</span>
      </div>
      <div className="pl-4 text-[#94979E]">
        <span className="text-white">index</span>
        <span className="text-[#94979E]">: </span>
        <span className="text-[#00E599]">&quot;product-embeddings&quot;</span>
        <span className="text-[#94979E]">,</span>
      </div>
      <div className="pl-4 text-[#94979E]">
        <span className="text-white">topK</span>
        <span className="text-[#94979E]">: </span>
        <span className="text-[#00E599]">10</span>
        <span className="text-[#94979E]">,</span>
      </div>
      <div className="pl-4 text-[#94979E]">
        <span className="text-white">filter</span>
        <span className="text-[#94979E]">: {"{"} </span>
        <span className="text-white">category</span>
        <span className="text-[#94979E]">: </span>
        <span className="text-[#00E599]">&quot;electronics&quot;</span>
        <span className="text-[#94979E]"> {"}"},</span>
      </div>
      <div className="text-[#94979E]">{"})"};</div>
      <div className="mt-3 text-xs text-[#00E599]">// Returned 10 results in 38ms</div>
    </div>
  );
}

function AutoscalingCard() {
  const bars = [
    { label: "00", h: 18 },
    { label: "04", h: 12 },
    { label: "08", h: 42 },
    { label: "12", h: 88 },
    { label: "16", h: 100 },
    { label: "18", h: 72 },
    { label: "20", h: 58 },
    { label: "24", h: 22 },
  ];

  return (
    <div className="bg-[#18191B] border border-white/[0.06] rounded-2xl p-6">
      <div className="flex items-center justify-between text-xs text-[#94979E] mb-4">
        <span className="font-mono">Requests/sec</span>
        <span className="text-[#00E599]">↑ Autoscaling active</span>
      </div>
      <div className="flex items-end gap-2 h-24">
        {bars.map((bar) => (
          <div key={bar.label} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-sm bg-[#00E599]/70"
              style={{ height: `${bar.h}%` }}
            />
            <span className="text-[#94979E] text-xs font-mono">{bar.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ObservabilityCard() {
  const cards = [
    { label: "req/min", value: "12,847", badge: "↑ 4%", ok: true },
    { label: "p99 latency", value: "48ms", badge: "✓", ok: true },
    { label: "error rate", value: "0.02%", badge: "✓", ok: true },
    { label: "cost/1k tokens", value: "$0.0012", badge: "✓", ok: true },
  ];

  return (
    <div className="bg-[#18191B] border border-white/[0.06] rounded-2xl p-4">
      <div className="grid grid-cols-2 gap-3">
        {cards.map((card) => (
          <div key={card.label} className="bg-[#111215] rounded-xl p-3">
            <p className="text-[#94979E] text-xs mb-1">{card.label}</p>
            <p className="text-white font-mono text-base font-normal">{card.value}</p>
            <span className={`text-xs mt-1 inline-block ${card.ok ? "text-[#00E599]" : "text-red-400"}`}>
              {card.badge}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tab definitions                                                       */
/* ------------------------------------------------------------------ */

const tabs = [
  {
    id: "model-serving",
    label: "Model Serving",
    tag: "Deploy",
    heading: "Any model. One API.",
    description:
      "Connect to GPT-4o, Claude, Llama, Mistral, or your own fine-tuned models through a single unified endpoint. Hot-swap without code changes.",
    features: [
      "Unified endpoint for all providers",
      "Hot-swap models without code changes",
      "Automatic fallback & retry logic",
    ],
    visual: <ModelServingCard />,
  },
  {
    id: "fine-tuning",
    label: "Fine-tuning",
    tag: "Train",
    heading: "Your data. Your weights.",
    description:
      "Upload a dataset, set your hyperparameters, and launch a training job in under 3 minutes. Data never leaves your environment.",
    features: [
      "Launch training jobs in under 3 minutes",
      "Full data sovereignty in your VPC",
      "Own your fine-tuned weights",
    ],
    visual: <FineTuningCard />,
  },
  {
    id: "vector-db",
    label: "Vector DB",
    tag: "Search",
    heading: "Sub-50ms semantic search.",
    description:
      "HNSW-indexed vector storage built in. Query billions of embeddings with consistent millisecond latency at any scale.",
    features: [
      "HNSW indexing for billion-scale search",
      "Sub-50ms P99 latency guarantee",
      "Native metadata filtering",
    ],
    visual: <VectorDBCard />,
  },
  {
    id: "autoscaling",
    label: "Autoscaling",
    tag: "Scale",
    heading: "Zero to millions. Instantly.",
    description:
      "Serverless inference scales from zero replicas when idle to thousands per second in under 100ms. Pay only for what you use.",
    features: [
      "Scale to zero when idle",
      "Burst to thousands of req/s in <100ms",
      "Pay only for active compute",
    ],
    visual: <AutoscalingCard />,
  },
  {
    id: "observability",
    label: "Observability",
    tag: "Monitor",
    heading: "Every inference, in full detail.",
    description:
      "Token usage, latency distributions, error rates, and cost breakdowns — streamed in real time to your dashboard.",
    features: [
      "Real-time request & latency logs",
      "Cost breakdowns per model & endpoint",
      "Alerts via Slack or PagerDuty",
    ],
    visual: <ObservabilityCard />,
  },
];

/* ------------------------------------------------------------------ */
/* Mint section cards                                                    */
/* ------------------------------------------------------------------ */

const mintCards = [
  {
    title: "Postgres compatible",
    body: "Use any Postgres client, ORM, or migration tool. Zero lock-in.",
  },
  {
    title: "Branching",
    body: "Create instant database branches for dev, staging, and testing.",
  },
  {
    title: "Serverless",
    body: "Scale to zero when idle. No idle charges. No wasted resources.",
  },
];

/* ------------------------------------------------------------------ */
/* Component                                                             */
/* ------------------------------------------------------------------ */

export default function Features() {
  return (
    <>
      {/* Zone 1 — Dark section */}
      <section className="bg-black py-24 md:py-32" id="features">
        <div className="max-w-6xl mx-auto px-6">
          {/* Heading */}
          <h2
            className="text-center text-white tracking-[-0.02em]"
            style={{ fontSize: "clamp(42px,5vw,52px)", fontWeight: 400 }}
          >
            Everything you need.
          </h2>
          <p className="text-[#94979E] text-lg text-center mt-4 max-w-xl mx-auto">
            One platform for the entire AI lifecycle — from first prototype to
            planet-scale production.
          </p>

          {/* Tabs */}
          <Tabs.Root defaultValue="model-serving" className="mt-12">
            <Tabs.List
              className="flex gap-2 justify-center flex-wrap"
              aria-label="Features"
            >
              {tabs.map((tab) => (
                <Tabs.Trigger
                  key={tab.id}
                  value={tab.id}
                  className="px-4 py-1.5 rounded-full text-sm border transition-all duration-200 cursor-pointer outline-none border-white/[0.08] text-[#94979E] hover:text-white hover:border-white/[0.15] data-[state=active]:border-[#00E599]/40 data-[state=active]:text-[#00E599] data-[state=active]:bg-[#00E599]/[0.08]"
                >
                  {tab.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            {tabs.map((tab) => (
              <Tabs.Content key={tab.id} value={tab.id} className="outline-none">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  {/* Left */}
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#00E599] font-medium mb-4">
                      {tab.tag}
                    </p>
                    <h3
                      className="text-white tracking-tight leading-tight"
                      style={{
                        fontSize: "clamp(28px,3.5vw,36px)",
                        fontWeight: 400,
                      }}
                    >
                      {tab.heading}
                    </h3>
                    <p className="text-[#94979E] mt-4 leading-relaxed text-base">
                      {tab.description}
                    </p>
                    <ul className="mt-6 space-y-2">
                      {tab.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-[#94979E]">
                          <span className="text-[#34D59A] mt-0.5">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right */}
                  <div>{tab.visual}</div>
                </motion.div>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </div>
      </section>

      {/* Zone 2 — Mint section */}
      <section className="bg-[#E4F1EB] py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2
            className="text-[#111215] tracking-tight"
            style={{ fontSize: "36px", fontWeight: 400 }}
          >
            Open source at heart.
          </h2>
          <p className="text-[#2C6D4C] mt-4 text-base">
            Built on PostgreSQL. Compatible with every Postgres tool.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {mintCards.map((card) => (
              <div
                key={card.title}
                className="bg-white/60 border border-[#CAE6D9] rounded-2xl p-6 text-left"
              >
                <h3
                  className="text-[#111215]"
                  style={{ fontWeight: 400, fontSize: "18px" }}
                >
                  {card.title}
                </h3>
                <p className="text-[#2C6D4C] mt-2 text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
