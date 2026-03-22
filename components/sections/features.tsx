"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { CodeBlock } from "@/components/shared/code-block";

/* ------------------------------------------------------------------ */
/* Tab content visuals                                                   */
/* ------------------------------------------------------------------ */

function TrainingProgressCard() {
  const rows = [
    { epoch: "1/10", loss: "2.4153", lr: "1e-4", step: "1000" },
    { epoch: "2/10", loss: "1.8942", lr: "9e-5", step: "2000" },
    { epoch: "3/10", loss: "1.4321", lr: "8e-5", step: "3000" },
    { epoch: "4/10", loss: "1.1208", lr: "7e-5", step: "4000" },
  ];

  return (
    <div className="bg-[#0D0D0D] border border-white/[0.08] rounded-xl p-5 font-mono text-xs space-y-4">
      <div className="flex items-center justify-between text-[#71717A] mb-2">
        <span>Training run: llama-3.1-7b-ft-v2</span>
        <span className="text-[#00E599] text-xs px-2 py-0.5 bg-[#00E599]/10 rounded">
          Running
        </span>
      </div>
      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-[#71717A] text-xs mb-1">
          <span>Progress</span>
          <span>40%</span>
        </div>
        <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#00E599] rounded-full"
            style={{ width: "40%" }}
          />
        </div>
      </div>
      {/* Metrics table */}
      <table className="w-full text-left">
        <thead>
          <tr className="text-[#71717A]">
            <th className="pb-2 font-normal">Epoch</th>
            <th className="pb-2 font-normal">Loss</th>
            <th className="pb-2 font-normal">LR</th>
            <th className="pb-2 font-normal">Step</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.step} className="text-[#E4E4E7]">
              <td className="py-0.5">{row.epoch}</td>
              <td className="py-0.5">{row.loss}</td>
              <td className="py-0.5">{row.lr}</td>
              <td className="py-0.5">{row.step}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ScalingChart() {
  const bars = [
    { label: "00", height: 20 },
    { label: "04", height: 15 },
    { label: "08", height: 45 },
    { label: "12", height: 90 },
    { label: "16", height: 100 },
    { label: "18", height: 75 },
    { label: "20", height: 60 },
    { label: "24", height: 25 },
  ];

  return (
    <div className="bg-[#0D0D0D] border border-white/[0.08] rounded-xl p-5 space-y-3">
      <div className="flex items-center justify-between text-xs text-[#71717A]">
        <span className="font-mono">Requests / hour (24h)</span>
        <span className="text-[#00E599]">↑ Autoscaling active</span>
      </div>
      <div className="flex items-end gap-2 h-24">
        {bars.map((bar) => (
          <div key={bar.label} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-sm bg-[#00E599]/70"
              style={{ height: `${bar.height}%` }}
            />
            <span className="text-[#71717A] text-xs font-mono">{bar.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ObservabilityGrid() {
  const cards = [
    { label: "Requests/min", value: "12,847", badge: "↑ 4%", ok: true },
    { label: "Latency p99", value: "48ms", badge: "✓", ok: true },
    { label: "Error rate", value: "0.02%", badge: "✓", ok: true },
    { label: "Cost/1k tokens", value: "$0.0012", badge: "✓", ok: true },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-[#0D0D0D] border border-white/[0.08] rounded-xl p-4"
        >
          <p className="text-[#71717A] text-xs mb-1">{card.label}</p>
          <p className="text-white font-bold text-xl font-mono">{card.value}</p>
          <span
            className={`text-xs mt-1 inline-block ${
              card.ok ? "text-[#00E599]" : "text-red-400"
            }`}
          >
            {card.badge}
          </span>
        </div>
      ))}
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
    heading: "Deploy any model in seconds.",
    description:
      "One API call to deploy GPT-4o, Llama, Mistral, or your own fine-tuned models. Hot-swap between providers without changing your code.",
    visual: (
      <CodeBlock
        showPrompt={false}
        code={`const synapse = new Synapse({ apiKey: process.env.SYNAPSE_KEY });

const response = await synapse.chat.complete({
  model: "llama-3.1-70b",
  messages: [{ role: "user", content: "Hello!" }]
});`}
      />
    ),
  },
  {
    id: "fine-tuning",
    label: "Fine-tuning",
    heading: "Train on your data, own your weights.",
    description:
      "Upload your dataset, configure your hyperparameters, and launch a training run in minutes. Full ownership — your data never leaves your VPC.",
    visual: <TrainingProgressCard />,
  },
  {
    id: "vector-db",
    label: "Vector DB",
    heading: "Semantic search at millisecond latency.",
    description:
      "Built-in vector storage with HNSW indexing. Query billions of embeddings with sub-50ms P99 latency.",
    visual: (
      <CodeBlock
        showPrompt={false}
        code={`const results = await synapse.vectors.query({
  index: "product-embeddings",
  vector: await synapse.embed("Find similar items"),
  topK: 10,
  filter: { category: "electronics" }
});`}
      />
    ),
  },
  {
    id: "autoscaling",
    label: "Autoscaling",
    heading: "Scale from zero to millions.",
    description:
      "Serverless inference that scales to zero when idle and bursts to thousands of requests per second in under 100ms.",
    visual: <ScalingChart />,
  },
  {
    id: "observability",
    label: "Observability",
    heading: "Full visibility into every inference.",
    description:
      "Request logs, latency histograms, token usage, and cost breakdowns — all in one dashboard. Set alerts in Slack or PagerDuty.",
    visual: <ObservabilityGrid />,
  },
];

/* ------------------------------------------------------------------ */
/* Component                                                             */
/* ------------------------------------------------------------------ */

export function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden px-6 py-24 md:py-32"
    >
      <div className="max-w-[1216px] mx-auto">
        <SectionHeading
          badge="Platform"
          heading={"Everything you need.\nNothing you don't."}
          centered
        />

        <Tabs.Root defaultValue="model-serving" className="mt-12">
          {/* Tab List */}
          <Tabs.List className="flex gap-2 flex-wrap justify-center" aria-label="Features">
            {tabs.map((tab) => (
              <Tabs.Trigger
                key={tab.id}
                value={tab.id}
                className="px-5 py-2 rounded-full text-sm border border-white/[0.08] text-[#A1A1AA] data-[state=active]:border-[#00E599]/50 data-[state=active]:text-[#00E599] data-[state=active]:bg-[#00E599]/10 transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#00E599]/50"
              >
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {/* Tab Content */}
          {tabs.map((tab) => (
            <Tabs.Content key={tab.id} value={tab.id} className="mt-12 outline-none">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              >
                {/* Left: text */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    {tab.heading}
                  </h3>
                  <p className="text-[#A1A1AA] mt-4 leading-relaxed">{tab.description}</p>
                </div>

                {/* Right: visual */}
                <div>{tab.visual}</div>
              </motion.div>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </section>
  );
}
