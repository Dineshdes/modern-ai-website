"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import HalftoneEdges from "@/components/ui/halftone-edges";
import AnnouncementBar from "@/components/layout/announcement-bar";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

/* ─── Fade-up helper ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

/* ─── Stat card ─── */
function Stat({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="flex flex-col gap-1 p-8 border-r last:border-r-0" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <span style={{ fontSize: "clamp(36px,4vw,56px)", fontWeight: 300, letterSpacing: "-0.04em", color: "#34D59A", lineHeight: 1 }}>{value}</span>
      <span style={{ fontSize: 15, color: "#F9FAFA", fontWeight: 500, marginTop: 6 }}>{label}</span>
      {sub && <span style={{ fontSize: 13, color: "#94979E" }}>{sub}</span>}
    </div>
  );
}

/* ─── Feature card ─── */
function FeatureCard({
  icon, title, body, tag,
}: {
  icon: React.ReactNode; title: string; body: string; tag?: string;
}) {
  return (
    <motion.div
      {...fadeUp()}
      className="rounded-2xl p-8 flex flex-col gap-4"
      style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(52,213,154,0.1)" }}>
        {icon}
      </div>
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span style={{ fontSize: 18, fontWeight: 500, color: "#F9FAFA", letterSpacing: "-0.02em" }}>{title}</span>
          {tag && (
            <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-widest" style={{ background: "rgba(52,213,154,0.12)", color: "#34D59A", fontFamily: "var(--font-mono), monospace" }}>{tag}</span>
          )}
        </div>
        <p style={{ fontSize: 15, color: "#94979E", lineHeight: 1.6 }}>{body}</p>
      </div>
    </motion.div>
  );
}

/* ─── SVG icons ─── */
const Icon = {
  inference: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 10h14M10 3l7 7-7 7" stroke="#34D59A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  scale: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="11" width="3" height="6" rx="1" fill="#34D59A" fillOpacity=".5"/>
      <rect x="8.5" y="7" width="3" height="10" rx="1" fill="#34D59A" fillOpacity=".75"/>
      <rect x="14" y="3" width="3" height="14" rx="1" fill="#34D59A"/>
    </svg>
  ),
  branch: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="5" cy="5" r="2" stroke="#34D59A" strokeWidth="1.6"/>
      <circle cx="5" cy="15" r="2" stroke="#34D59A" strokeWidth="1.6"/>
      <circle cx="15" cy="10" r="2" stroke="#34D59A" strokeWidth="1.6"/>
      <path d="M5 7v6M7 5h4a2 2 0 0 1 2 2v1M7 15h4a2 2 0 0 0 2-2v-1" stroke="#34D59A" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  auth: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="4" y="9" width="12" height="9" rx="2" stroke="#34D59A" strokeWidth="1.6"/>
      <path d="M7 9V6a3 3 0 0 1 6 0v3" stroke="#34D59A" strokeWidth="1.6" strokeLinecap="round"/>
      <circle cx="10" cy="13.5" r="1.5" fill="#34D59A"/>
    </svg>
  ),
  observe: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M2 10c2-5 5-7 8-7s6 2 8 7c-2 5-5 7-8 7s-6-2-8-7Z" stroke="#34D59A" strokeWidth="1.6"/>
      <circle cx="10" cy="10" r="3" stroke="#34D59A" strokeWidth="1.6"/>
    </svg>
  ),
  agent: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="3" width="6" height="6" rx="1.5" stroke="#34D59A" strokeWidth="1.6"/>
      <rect x="11" y="3" width="6" height="6" rx="1.5" stroke="#34D59A" strokeWidth="1.6"/>
      <rect x="3" y="11" width="6" height="6" rx="1.5" stroke="#34D59A" strokeWidth="1.6"/>
      <rect x="11" y="11" width="6" height="6" rx="1.5" stroke="#34D59A" strokeWidth="1.6"/>
    </svg>
  ),
};

/* ─── Architecture pipeline ─── */
const PIPELINE = [
  { step: "01", label: "Request", desc: "Client sends inference request via REST or SDK" },
  { step: "02", label: "Router", desc: "Smart routing selects the optimal compute node" },
  { step: "03", label: "Inference", desc: "Model runs on dedicated GPU with continuous batching" },
  { step: "04", label: "Cache", desc: "KV-cache reuse across requests cuts latency by 4×" },
  { step: "05", label: "Response", desc: "Streamed tokens returned with <50ms p99 latency" },
];

/* ─── Supported models ─── */
const MODELS = [
  { family: "Llama", versions: ["3.1-8B", "3.1-70B", "3.1-405B", "3.3-70B"] },
  { family: "Mistral", versions: ["7B", "8×7B MoE", "Large 2", "Codestral"] },
  { family: "DeepSeek", versions: ["R1", "V3", "Coder-V2"] },
  { family: "Qwen", versions: ["2.5-7B", "2.5-72B", "QwQ-32B"] },
  { family: "Gemma", versions: ["2-9B", "2-27B"] },
  { family: "Phi", versions: ["3.5-mini", "3.5-MoE"] },
];

/* ─── Integration logos (text-based) ─── */
const INTEGRATIONS = [
  "OpenAI SDK", "LangChain", "LlamaIndex", "Vercel AI SDK",
  "Haystack", "Semantic Kernel", "AutoGen", "CrewAI",
];

export default function ProductPage() {
  return (
    <>
    <AnnouncementBar />
    <Navbar />
    <main style={{ background: "#0C0D0D", minHeight: "100vh" }}>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ paddingTop: "clamp(140px,18vw,220px)", paddingBottom: 120 }}>
        <HalftoneEdges leftColor="rgba(52,213,154,0.75)" rightColor="rgba(220,120,60,0.70)" edgeWidth={320} />

        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(52,213,154,0.07) 0%, transparent 70%)",
        }} />

        <div className="relative max-w-[1100px] mx-auto px-8 text-center">
          <motion.div {...fadeUp()} className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full" style={{ background: "rgba(52,213,154,0.08)", border: "1px solid rgba(52,213,154,0.18)" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#34D59A" }} />
            <span style={{ fontSize: 12, color: "#34D59A", fontFamily: "var(--font-mono), monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}>Platform Overview</span>
          </motion.div>

          <motion.h1 {...fadeUp(0.08)} style={{ fontSize: "clamp(40px,5.5vw,72px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.04em", color: "#F9FAFA" }}>
            The AI inference stack,<br />
            <span style={{ color: "#34D59A" }}>complete.</span>
          </motion.h1>

          <motion.p {...fadeUp(0.16)} style={{ fontSize: "clamp(16px,1.5vw,20px)", color: "#94979E", lineHeight: 1.65, maxWidth: 640, margin: "24px auto 0" }}>
            From a single API call to production-scale multi-agent systems — Synapse handles inference, scaling, branching, auth, and observability in one unified platform.
          </motion.p>

          <motion.div {...fadeUp(0.24)} className="flex items-center justify-center gap-3 mt-10">
            <Link href="#" className="inline-flex items-center px-7 h-12 rounded-full text-[15px] font-medium transition-colors" style={{ background: "#F9FAFA", color: "#0C0D0D" }}>
              Get started free
            </Link>
            <Link href="#" className="inline-flex items-center gap-2 px-7 h-12 rounded-full text-[15px] transition-colors" style={{ color: "#F9FAFA", border: "1px solid rgba(255,255,255,0.18)" }}>
              View docs
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════ */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1200px] mx-auto" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          <Stat value="<50ms" label="p99 Latency" sub="First token out" />
          <Stat value="10k+" label="Requests / sec" sub="Per deployment" />
          <Stat value="99.99%" label="Uptime SLA" sub="Across all regions" />
          <Stat value="200+" label="Model variants" sub="Open & proprietary" />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CAPABILITY CARDS
      ══════════════════════════════════════════ */}
      <section style={{ padding: "120px 0" }}>
        <div className="max-w-[1200px] mx-auto px-8">
          <motion.div {...fadeUp()} className="mb-16">
            <p style={{ fontSize: 12, color: "#34D59A", fontFamily: "var(--font-mono), monospace", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Capabilities</p>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 400, letterSpacing: "-0.04em", color: "#F9FAFA", maxWidth: 560 }}>
              Every layer of the stack, handled.
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            <FeatureCard
              icon={Icon.inference}
              title="Inference Engine"
              tag="Core"
              body="Continuous batching, PagedAttention, and speculative decoding built in. Serve any open-weight model with sub-50ms first-token latency out of the box."
            />
            <FeatureCard
              icon={Icon.scale}
              title="Autoscaling"
              body="Separate compute and memory planes scale independently. Go from zero to thousands of concurrent requests with no cold-start penalty."
            />
            <FeatureCard
              icon={Icon.branch}
              title="Instant Branching"
              tag="New"
              body="Fork a deployment in milliseconds. Test prompts, fine-tunes, or entire model versions in parallel without duplicating infrastructure."
            />
            <FeatureCard
              icon={Icon.auth}
              title="Auth Included"
              body="User management, API key provisioning, and rate-limiting baked in. No third-party auth service needed — ship production apps on day one."
            />
            <FeatureCard
              icon={Icon.observe}
              title="Observability"
              body="Token usage, latency histograms, error rates, and cost breakdowns in real time. OpenTelemetry-compatible for your existing stack."
            />
            <FeatureCard
              icon={Icon.agent}
              title="Agent Platform"
              body="First-class support for multi-step agents. Persistent sessions, tool calling, structured outputs, and prompt caching across turns."
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ARCHITECTURE / HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section style={{ background: "#080A09", padding: "120px 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-[1200px] mx-auto px-8">
          <motion.div {...fadeUp()} className="mb-16 text-center">
            <p style={{ fontSize: 12, color: "#34D59A", fontFamily: "var(--font-mono), monospace", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Architecture</p>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 400, letterSpacing: "-0.04em", color: "#F9FAFA" }}>
              Request to response in five steps.
            </h2>
          </motion.div>

          {/* Pipeline */}
          <div className="relative">
            {/* Connector line */}
            <div className="absolute top-8 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(52,213,154,0.3) 20%, rgba(52,213,154,0.3) 80%, transparent)" }} />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0 }}>
              {PIPELINE.map(({ step, label, desc }, i) => (
                <motion.div key={step} {...fadeUp(i * 0.08)} className="flex flex-col items-center text-center px-4">
                  {/* Node */}
                  <div
                    className="relative z-10 w-16 h-16 rounded-2xl flex flex-col items-center justify-center mb-6"
                    style={{
                      background: i === 2 ? "#34D59A" : "#111215",
                      border: `1px solid ${i === 2 ? "#34D59A" : "rgba(255,255,255,0.08)"}`,
                      boxShadow: i === 2 ? "0 0 32px rgba(52,213,154,0.35)" : "none",
                    }}
                  >
                    <span style={{ fontSize: 10, color: i === 2 ? "#0C0D0D" : "#94979E", fontFamily: "var(--font-mono), monospace", letterSpacing: "0.06em" }}>{step}</span>
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 500, color: "#F9FAFA", marginBottom: 8, letterSpacing: "-0.01em" }}>{label}</span>
                  <span style={{ fontSize: 13, color: "#94979E", lineHeight: 1.55 }}>{desc}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Code snippet */}
          <motion.div {...fadeUp(0.3)} className="mt-20 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-5 py-3" style={{ background: "#111215", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
              <span className="ml-4 text-xs" style={{ color: "#94979E", fontFamily: "var(--font-mono), monospace" }}>example.ts</span>
            </div>
            <div className="p-8 overflow-x-auto" style={{ background: "#0d0e0f", fontFamily: "var(--font-mono), monospace", fontSize: 14, lineHeight: 1.75 }}>
              <pre style={{ margin: 0, color: "#94979E" }}><code>{`import Synapse from "@synapse-ai/sdk";

const client = new Synapse();

`}<span style={{ color: "#94979E" }}>{`// Stream inference — sub-50ms first token`}</span>{`
const stream = await client.chat.stream(\{
  model: `}<span style={{ color: "#34D59A" }}>{`"llama-3.1-70b"`}</span>{`,
  messages: [\{ role: `}<span style={{ color: "#34D59A" }}>{`"user"`}</span>{`, content: `}<span style={{ color: "#34D59A" }}>{`"Explain KV-cache."`}</span>{` \}],
  max_tokens: `}<span style={{ color: "#F9FAFA" }}>{`512`}</span>{`,
\});

for await (const chunk of stream) \{
  process.stdout.write(chunk.choices[`}<span style={{ color: "#F9FAFA" }}>{`0`}</span>{`].delta.content ?? `}<span style={{ color: "#34D59A" }}>{`""`}</span>{`);
\}`}</code></pre>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MODEL SUPPORT
      ══════════════════════════════════════════ */}
      <section style={{ padding: "120px 0" }}>
        <div className="max-w-[1200px] mx-auto px-8">
          <motion.div {...fadeUp()} className="mb-16">
            <p style={{ fontSize: 12, color: "#34D59A", fontFamily: "var(--font-mono), monospace", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Model Support</p>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <h2 style={{ fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 400, letterSpacing: "-0.04em", color: "#F9FAFA", maxWidth: 480 }}>
                200+ models, one endpoint.
              </h2>
              <Link href="#" style={{ fontSize: 14, color: "#34D59A", textDecoration: "none" }} className="flex items-center gap-1.5 hover:opacity-75 transition-opacity">
                Full model catalogue
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "rgba(255,255,255,0.05)", borderRadius: 16, overflow: "hidden" }}>
            {MODELS.map(({ family, versions }, i) => (
              <motion.div key={family} {...fadeUp(i * 0.06)} className="p-6" style={{ background: "#0C0D0D" }}>
                <span style={{ fontSize: 13, color: "#94979E", fontFamily: "var(--font-mono), monospace", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 12 }}>{family}</span>
                <div className="flex flex-col gap-2">
                  {versions.map((v) => (
                    <div key={v} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full" style={{ background: "#34D59A" }} />
                      <span style={{ fontSize: 14, color: "#F9FAFA" }}>{family} {v}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          INTEGRATIONS
      ══════════════════════════════════════════ */}
      <section style={{ background: "#080A09", padding: "100px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-[1200px] mx-auto px-8">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <p style={{ fontSize: 12, color: "#34D59A", fontFamily: "var(--font-mono), monospace", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Integrations</p>
            <h2 style={{ fontSize: "clamp(24px,3vw,40px)", fontWeight: 400, letterSpacing: "-0.04em", color: "#F9FAFA" }}>
              Works with every framework you use.
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {INTEGRATIONS.map((name, i) => (
              <motion.div key={name} {...fadeUp(i * 0.04)}
                className="px-5 py-2.5 rounded-full"
                style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.07)", fontSize: 14, color: "#94979E" }}
              >
                {name}
              </motion.div>
            ))}
          </div>

          {/* OpenAI-compatible badge */}
          <motion.div {...fadeUp(0.3)} className="mt-12 flex items-center justify-center gap-3">
            <div className="flex items-center gap-3 px-6 py-4 rounded-2xl" style={{ background: "#111215", border: "1px solid rgba(52,213,154,0.2)" }}>
              <div className="w-2 h-2 rounded-full" style={{ background: "#34D59A" }} />
              <span style={{ fontSize: 14, color: "#F9FAFA" }}>OpenAI-compatible API</span>
              <span style={{ fontSize: 13, color: "#94979E" }}>— drop in your existing SDK, zero migration cost</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ padding: "140px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <HalftoneEdges leftColor="rgba(52,213,154,0.55)" rightColor="rgba(220,120,60,0.50)" edgeWidth={300} />

        <div className="relative max-w-[800px] mx-auto px-8 text-center">
          <motion.h2 {...fadeUp()} style={{ fontSize: "clamp(32px,4vw,56px)", fontWeight: 400, letterSpacing: "-0.04em", color: "#F9FAFA", lineHeight: 1.15 }}>
            Start serving models in minutes.
          </motion.h2>
          <motion.p {...fadeUp(0.1)} style={{ fontSize: 17, color: "#94979E", marginTop: 20, lineHeight: 1.65 }}>
            No infrastructure to manage. No capacity planning. Just an API key and your model.
          </motion.p>
          <motion.div {...fadeUp(0.18)} className="flex items-center justify-center gap-3 mt-10">
            <Link href="#" className="inline-flex items-center px-8 h-12 rounded-full text-[15px] font-medium" style={{ background: "#34D59A", color: "#0C0D0D" }}>
              Get started free
            </Link>
            <Link href="#" className="inline-flex items-center px-8 h-12 rounded-full text-[15px]" style={{ color: "#F9FAFA", border: "1px solid rgba(255,255,255,0.18)" }}>
              Talk to sales
            </Link>
          </motion.div>

          {/* Terminal teaser */}
          <motion.div {...fadeUp(0.26)} className="mt-12 rounded-xl px-6 py-4 inline-flex items-center gap-3" style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.07)" }}>
            <span style={{ color: "#34D59A", fontFamily: "var(--font-mono), monospace", fontSize: 13 }}>$</span>
            <span style={{ color: "#94979E", fontFamily: "var(--font-mono), monospace", fontSize: 13 }}>npm install @synapse-ai/sdk</span>
          </motion.div>
        </div>
      </section>

    </main>
    <Footer />
    </>
  );
}
