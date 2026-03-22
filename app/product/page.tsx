"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import HalftoneEdges from "@/components/ui/halftone-edges";
import AnnouncementBar from "@/components/layout/announcement-bar";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: "easeOut" as const },
});

/* ══════════════════════════════════════════
   MINI MOCKUP COMPONENTS
══════════════════════════════════════════ */

/* Agent pipeline trace */
function AgentTraceMockup() {
  const steps = [
    { label: "user_intent",     status: "done",    ms: 12,  color: "#34D59A" },
    { label: "route → llama-3.1-70b", status: "done", ms: 4,  color: "#34D59A" },
    { label: "kv_cache_lookup", status: "done",    ms: 1,   color: "#34D59A" },
    { label: "prefill",         status: "done",    ms: 18,  color: "#34D59A" },
    { label: "decode (stream)", status: "active",  ms: null, color: "#F59D4A" },
    { label: "tool_call → search", status: "pending", ms: null, color: "#94979E" },
    { label: "aggregate + respond", status: "pending", ms: null, color: "#94979E" },
  ];
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "#0d0e0f", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="flex items-center gap-2 px-5 py-3" style={{ background: "#111215", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
        <span className="ml-3 text-[11px]" style={{ color: "#94979E", fontFamily: "var(--font-mono)" }}>agent / execution-trace</span>
        <span className="ml-auto text-[10px] px-2 py-0.5 rounded" style={{ background: "rgba(52,213,154,0.12)", color: "#34D59A", fontFamily: "var(--font-mono)" }}>LIVE</span>
      </div>
      <div className="p-4 flex flex-col gap-1.5">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{
              background: s.status === "active" ? "#F59D4A" : s.status === "done" ? "#34D59A" : "rgba(255,255,255,0.15)",
            }} />
            <span className="text-[12px] flex-1" style={{ color: s.status === "pending" ? "#4a4d54" : "#94979E", fontFamily: "var(--font-mono)" }}>{s.label}</span>
            {s.ms !== null && (
              <span className="text-[11px]" style={{ color: "#34D59A", fontFamily: "var(--font-mono)" }}>{s.ms}ms</span>
            )}
            {s.status === "active" && (
              <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(245,157,74,0.15)", color: "#F59D4A" }}>running</span>
            )}
          </div>
        ))}
      </div>
      <div className="px-5 py-3 border-t flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
        <span className="text-[11px]" style={{ color: "#94979E", fontFamily: "var(--font-mono)" }}>total latency</span>
        <span className="text-[13px] font-semibold" style={{ color: "#34D59A", fontFamily: "var(--font-mono)" }}>p99 &lt;50ms</span>
      </div>
    </div>
  );
}

/* Coverage map — model capability grid */
function CoverageMapMockup() {
  const axes = {
    x: ["7B", "13B", "70B", "405B"],
    y: ["Llama 3", "Mistral", "DeepSeek", "Qwen", "Gemma"],
  };
  const heat: number[][] = [
    [0.9, 0.95, 1,    1   ],
    [0.85, 0.9, 1,    0   ],
    [0.9, 0,    1,    0   ],
    [0.7, 0,    0.95, 0   ],
    [0.8, 0.9,  0,    0   ],
  ];
  const col = (v: number) =>
    v === 0   ? "rgba(255,255,255,0.04)"
    : v > 0.9 ? `rgba(52,213,154,${v})`
    :           `rgba(52,213,154,${v * 0.7})`;

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "#0d0e0f", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="flex items-center justify-between px-5 py-3" style={{ background: "#111215", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <span className="text-[11px]" style={{ color: "#94979E", fontFamily: "var(--font-mono)" }}>model / coverage-map</span>
        <span className="text-[10px]" style={{ color: "#34D59A", fontFamily: "var(--font-mono)" }}>200+ variants</span>
      </div>
      <div className="p-5">
        {/* Col headers */}
        <div className="flex gap-2 mb-2 pl-[88px]">
          {axes.x.map((x) => (
            <div key={x} className="flex-1 text-center text-[10px]" style={{ color: "#94979E", fontFamily: "var(--font-mono)" }}>{x}</div>
          ))}
        </div>
        {axes.y.map((y, ri) => (
          <div key={y} className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] w-20 shrink-0" style={{ color: "#94979E", fontFamily: "var(--font-mono)" }}>{y}</span>
            {axes.x.map((_, ci) => (
              <div key={ci} className="flex-1 h-7 rounded" style={{ background: col(heat[ri][ci]) }} />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4 px-5 pb-4">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: "rgba(52,213,154,0.9)" }} />
          <span className="text-[10px]" style={{ color: "#94979E" }}>Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} />
          <span className="text-[10px]" style={{ color: "#94979E" }}>Coming soon</span>
        </div>
      </div>
    </div>
  );
}

/* Observability dashboard */
function ObservabilityMockup() {
  const rows = [
    { id: "req_8Hq2t", model: "llama-3.1-70b", tokens: 1842, lat: "43ms",  cost: "$0.0012", status: "200" },
    { id: "req_fK9mP", model: "deepseek-r1",   tokens: 3201, lat: "91ms",  cost: "$0.0031", status: "200" },
    { id: "req_aX7vN", model: "mistral-7b",    tokens: 512,  lat: "18ms",  cost: "$0.0004", status: "200" },
    { id: "req_oQ3rL", model: "llama-3.1-70b", tokens: 2048, lat: "51ms",  cost: "$0.0015", status: "429" },
    { id: "req_jY1cB", model: "qwen-72b",      tokens: 4096, lat: "122ms", cost: "$0.0041", status: "200" },
  ];
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "#0d0e0f", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="flex items-center justify-between px-5 py-3" style={{ background: "#111215", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <span className="text-[11px]" style={{ color: "#94979E", fontFamily: "var(--font-mono)" }}>observability / request-log</span>
        <div className="flex items-center gap-3">
          <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: "rgba(52,213,154,0.1)", color: "#34D59A" }}>1.2k req/s</span>
          <span className="text-[10px]" style={{ color: "#94979E" }}>last 5m</span>
        </div>
      </div>
      <div>
        {/* Header */}
        <div className="grid px-4 py-2" style={{ gridTemplateColumns: "1.4fr 1.6fr .8fr .7fr .9fr .5fr", fontSize: 10, color: "#4a4d54", fontFamily: "var(--font-mono)" }}>
          {["request_id","model","tokens","latency","cost","status"].map((h) => (
            <span key={h}>{h}</span>
          ))}
        </div>
        {rows.map((r) => (
          <div key={r.id} className="grid px-4 py-2 border-t" style={{ gridTemplateColumns: "1.4fr 1.6fr .8fr .7fr .9fr .5fr", borderColor: "rgba(255,255,255,0.03)", fontSize: 11, fontFamily: "var(--font-mono)", color: "#94979E" }}>
            <span style={{ color: "rgba(249,250,250,0.5)" }}>{r.id}</span>
            <span>{r.model}</span>
            <span>{r.tokens.toLocaleString()}</span>
            <span style={{ color: "#34D59A" }}>{r.lat}</span>
            <span>{r.cost}</span>
            <span style={{ color: r.status === "200" ? "#34D59A" : "#ef4444" }}>{r.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   FEATURE SECTIONS
══════════════════════════════════════════ */

const FEATURES = [
  {
    tag: "Agentic Inference",
    headline: "Serve agents, not just prompts.",
    body: "Static request-response APIs can't handle multi-step agents. Synapse maintains persistent sessions, streams tokens across tool calls, and handles retries — so your agents never stall waiting on infrastructure.",
    bullets: [
      "Persistent context across agent turns",
      "Parallel tool-call execution with streaming",
      "Automatic retry with exponential backoff",
      "Multi-model routing within a single session",
    ],
    mockup: <AgentTraceMockup />,
    accent: "#34D59A",
    flipped: false,
  },
  {
    tag: "Coverage Mapping",
    headline: "Know exactly what you can run, and what's coming.",
    body: "Teams waste days debugging incompatible model versions. Synapse's model coverage map shows availability at a glance — parameter size, quantisation, region — and automatically suggests alternatives when a variant isn't available.",
    bullets: [
      "200+ model variants across 6 families",
      "Region availability at a glance",
      "Automatic fallback to the next-best variant",
      "Context-window and capability tags per model",
    ],
    mockup: <CoverageMapMockup />,
    accent: "#7C6FFF",
    flipped: true,
  },
  {
    tag: "Observability",
    headline: "Every token, every request, fully traceable.",
    body: "Black-box inference is a liability in production. Synapse logs every request — latency, tokens, cost, model version — with searchable history, cost breakdowns, and OpenTelemetry export for your existing stack.",
    bullets: [
      "Per-request latency, token, and cost breakdown",
      "Searchable request history with replay",
      "OpenTelemetry-compatible trace export",
      "Automated cost anomaly alerts",
    ],
    mockup: <ObservabilityMockup />,
    accent: "#F59D4A",
    flipped: false,
  },
];

/* ══════════════════════════════════════════
   TESTIMONIALS
══════════════════════════════════════════ */
const TESTIMONIALS = [
  {
    quote: "Inference used to mean manually tuning capacity across a dozen servers. Now Synapse handles it automatically and our p99 dropped by 60%.",
    name: "Senior ML Engineer",
    org: "2,000+ employee fintech",
  },
  {
    quote: "We migrated from a self-hosted vLLM cluster in a weekend. The OpenAI-compatible API meant zero changes to our application code.",
    name: "Principal Engineer",
    org: "Series B AI startup",
  },
  {
    quote: "Being able to branch a deployment and A/B test fine-tunes without spinning up new infra changed how we ship model updates entirely.",
    name: "Head of AI",
    org: "Enterprise SaaS company",
  },
];

/* ══════════════════════════════════════════
   ENTERPRISE BADGES
══════════════════════════════════════════ */
const BADGES = ["SOC 2 Type II", "ISO 27001", "GDPR", "HIPAA", "CCPA", "RBAC", "SSO", "Audit Logs"];

/* ══════════════════════════════════════════
   INTEGRATIONS
══════════════════════════════════════════ */
const INTEGRATIONS = [
  { name: "OpenAI SDK",     note: "Drop-in compatible" },
  { name: "LangChain",      note: "Official provider" },
  { name: "LlamaIndex",     note: "Native integration" },
  { name: "Vercel AI SDK",  note: "Edge-ready" },
  { name: "Haystack",       note: "Pipeline support" },
  { name: "AutoGen",        note: "Agent framework" },
  { name: "CrewAI",         note: "Multi-agent" },
  { name: "Semantic Kernel",note: "Plugin compatible" },
];

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function ProductPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main style={{ background: "#0C0D0D", minHeight: "100vh" }}>

        {/* ── HERO ── */}
        <section className="relative overflow-hidden" style={{ paddingTop: "clamp(140px,18vw,220px)", paddingBottom: 100 }}>
          <HalftoneEdges leftColor="rgba(52,213,154,0.75)" rightColor="rgba(220,120,60,0.70)" edgeWidth={300} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(52,213,154,0.07) 0%, transparent 70%)" }} />

          <div className="relative max-w-[960px] mx-auto px-8 text-center">
            <motion.div {...fadeUp()} className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full" style={{ background: "rgba(52,213,154,0.08)", border: "1px solid rgba(52,213,154,0.18)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#34D59A" }} />
              <span style={{ fontSize: 12, color: "#34D59A", fontFamily: "var(--font-mono)", letterSpacing: "0.10em", textTransform: "uppercase" }}>Platform</span>
            </motion.div>

            <motion.h1 {...fadeUp(0.08)} style={{ fontSize: "clamp(40px,5.5vw,72px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.04em", color: "#F9FAFA" }}>
              Inference that runs what<br />
              <span style={{ color: "#34D59A" }}>static APIs can&apos;t.</span>
            </motion.h1>

            <motion.p {...fadeUp(0.16)} style={{ fontSize: "clamp(16px,1.5vw,19px)", color: "#94979E", lineHeight: 1.65, maxWidth: 580, margin: "24px auto 0" }}>
              Rule-based infrastructure breaks when agents go multi-step. Synapse keeps up — persistent sessions, automatic scaling, full observability — so you ship AI products instead of managing servers.
            </motion.p>

            <motion.div {...fadeUp(0.24)} className="flex items-center justify-center gap-3 mt-10">
              <Link href="#" className="inline-flex items-center px-7 h-12 rounded-full text-[15px] font-medium" style={{ background: "#F9FAFA", color: "#0C0D0D" }}>
                Get started free
              </Link>
              <Link href="#" className="inline-flex items-center gap-2 px-7 h-12 rounded-full text-[15px]" style={{ color: "#F9FAFA", border: "1px solid rgba(255,255,255,0.18)" }}>
                View docs →
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-[1200px] mx-auto" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
            {[
              { v: "<50ms",  l: "p99 First Token",     s: "At any scale" },
              { v: "10k+",   l: "Requests / second",   s: "Per deployment" },
              { v: "99.99%", l: "Uptime SLA",           s: "All regions" },
              { v: "200+",   l: "Model variants",       s: "Open & proprietary" },
            ].map(({ v, l, s }) => (
              <div key={l} className="flex flex-col gap-1 p-8 border-r last:border-r-0" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <span style={{ fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 300, letterSpacing: "-0.04em", color: "#34D59A", lineHeight: 1 }}>{v}</span>
                <span style={{ fontSize: 15, color: "#F9FAFA", fontWeight: 500, marginTop: 6 }}>{l}</span>
                <span style={{ fontSize: 13, color: "#94979E" }}>{s}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES (alternating) ── */}
        {FEATURES.map(({ tag, headline, body, bullets, mockup, accent, flipped }, i) => (
          <section key={tag} style={{ padding: "120px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", background: i % 2 === 1 ? "#080A09" : "#0C0D0D" }}>
            <div className="max-w-[1200px] mx-auto px-8">
              <div className={`flex flex-col ${flipped ? "lg:flex-row-reverse" : "lg:flex-row"} gap-16 items-center`}>

                {/* Text */}
                <div className="flex-1">
                  <motion.div {...fadeUp()}>
                    <span className="inline-block text-[11px] uppercase tracking-[0.12em] px-3 py-1 rounded-full mb-5"
                      style={{ background: `${accent}14`, color: accent, fontFamily: "var(--font-mono)", border: `1px solid ${accent}30` }}>
                      {tag}
                    </span>
                    <h2 style={{ fontSize: "clamp(26px,3vw,42px)", fontWeight: 400, letterSpacing: "-0.04em", color: "#F9FAFA", lineHeight: 1.2, marginBottom: 16 }}>
                      {headline}
                    </h2>
                    <p style={{ fontSize: 16, color: "#94979E", lineHeight: 1.7, marginBottom: 28 }}>{body}</p>
                    <ul className="flex flex-col gap-3">
                      {bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
                            <circle cx="8" cy="8" r="7" stroke={accent} strokeOpacity="0.3" strokeWidth="1.2" />
                            <path d="M5 8l2 2 4-4" stroke={accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span style={{ fontSize: 15, color: "#94979E" }}>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Mockup */}
                <motion.div {...fadeUp(0.1)} className="flex-1 w-full">
                  {mockup}
                </motion.div>
              </div>
            </div>
          </section>
        ))}

        {/* ── TESTIMONIALS ── */}
        <section style={{ padding: "120px 0", background: "#0C0D0D" }}>
          <div className="max-w-[1200px] mx-auto px-8">
            <motion.div {...fadeUp()} className="mb-16 text-center">
              <p style={{ fontSize: 12, color: "#34D59A", fontFamily: "var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>From teams in production</p>
              <h2 style={{ fontSize: "clamp(26px,3vw,42px)", fontWeight: 400, letterSpacing: "-0.04em", color: "#F9FAFA" }}>
                Trusted by the teams shipping AI.
              </h2>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {TESTIMONIALS.map(({ quote, name, org }, i) => (
                <motion.div key={i} {...fadeUp(i * 0.08)}
                  className="rounded-2xl p-8 flex flex-col gap-6"
                  style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.06)" }}>
                  {/* Quote mark */}
                  <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
                    <path d="M0 18V10.8C0 7.2 1.2 4.2 3.6 1.8L6 0l1.2 1.2C5.2 3.2 4 5.6 4 8.4V10h4v8H0zm14 0V10.8C14 7.2 15.2 4.2 17.6 1.8L20 0l1.2 1.2C19.2 3.2 18 5.6 18 8.4V10h4v8h-8z" fill="rgba(52,213,154,0.3)" />
                  </svg>
                  <p style={{ fontSize: 16, color: "#94979E", lineHeight: 1.65, flex: 1 }}>&ldquo;{quote}&rdquo;</p>
                  <div>
                    <p style={{ fontSize: 14, color: "#F9FAFA", fontWeight: 500 }}>{name}</p>
                    <p style={{ fontSize: 13, color: "#94979E" }}>{org}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTEGRATIONS ── */}
        <section style={{ background: "#080A09", padding: "100px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="max-w-[1200px] mx-auto px-8">
            <motion.div {...fadeUp()} className="text-center mb-14">
              <p style={{ fontSize: 12, color: "#34D59A", fontFamily: "var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Integrations</p>
              <h2 style={{ fontSize: "clamp(24px,3vw,40px)", fontWeight: 400, letterSpacing: "-0.04em", color: "#F9FAFA" }}>
                Works with every framework you use.
              </h2>
              <p style={{ fontSize: 15, color: "#94979E", marginTop: 12 }}>40+ native integrations. OpenAI-compatible API means zero migration cost.</p>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
              {INTEGRATIONS.map(({ name, note }, i) => (
                <motion.div key={name} {...fadeUp(i * 0.05)}
                  className="rounded-xl p-5 flex flex-col gap-1.5"
                  style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontSize: 15, color: "#F9FAFA", fontWeight: 500 }}>{name}</span>
                  <span style={{ fontSize: 12, color: "#94979E" }}>{note}</span>
                </motion.div>
              ))}
            </div>

            <motion.div {...fadeUp(0.3)} className="mt-10 flex items-center justify-center">
              <div className="flex items-center gap-3 px-6 py-4 rounded-2xl" style={{ background: "#111215", border: "1px solid rgba(52,213,154,0.2)" }}>
                <div className="w-2 h-2 rounded-full" style={{ background: "#34D59A" }} />
                <span style={{ fontSize: 14, color: "#F9FAFA" }}>OpenAI-compatible API</span>
                <span style={{ fontSize: 13, color: "#94979E" }}>— swap your base URL and you&apos;re done</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── ENTERPRISE ── */}
        <section style={{ padding: "100px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
              <motion.div {...fadeUp()} className="flex-1">
                <p style={{ fontSize: 12, color: "#34D59A", fontFamily: "var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Enterprise Ready</p>
                <h2 style={{ fontSize: "clamp(26px,3vw,42px)", fontWeight: 400, letterSpacing: "-0.04em", color: "#F9FAFA", marginBottom: 16 }}>
                  Built for teams that can&apos;t afford downtime.
                </h2>
                <p style={{ fontSize: 16, color: "#94979E", lineHeight: 1.7, maxWidth: 480 }}>
                  Synapse meets the security and compliance bar for regulated industries. RBAC, SSO, audit logging, and a 99.99% uptime SLA — all included.
                </p>
                <div className="mt-8">
                  <Link href="#" style={{ fontSize: 14, color: "#34D59A", display: "inline-flex", alignItems: "center", gap: 6 }}>
                    Talk to our enterprise team →
                  </Link>
                </div>
              </motion.div>

              <motion.div {...fadeUp(0.1)} className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {BADGES.map((b) => (
                    <div key={b} className="px-4 py-2.5 rounded-lg text-[13px]" style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.08)", color: "#94979E" }}>
                      {b}
                    </div>
                  ))}
                </div>

                {/* Uptime bar */}
                <div className="mt-8 rounded-xl p-5" style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex items-center justify-between mb-3">
                    <span style={{ fontSize: 13, color: "#F9FAFA" }}>API Availability</span>
                    <span style={{ fontSize: 13, color: "#34D59A", fontFamily: "var(--font-mono)" }}>99.99%</span>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 90 }).map((_, i) => (
                      <div key={i} className="flex-1 rounded-sm" style={{ height: 24, background: i === 37 || i === 71 ? "#F59D4A" : "#34D59A", opacity: 0.7 + Math.random() * 0.3 }} />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    <span style={{ fontSize: 11, color: "#94979E" }}>90 days ago</span>
                    <span style={{ fontSize: 11, color: "#94979E" }}>Today</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="relative overflow-hidden" style={{ padding: "140px 0", borderTop: "1px solid rgba(255,255,255,0.05)", background: "#080A09" }}>
          <HalftoneEdges leftColor="rgba(52,213,154,0.55)" rightColor="rgba(220,120,60,0.50)" edgeWidth={280} />
          <div className="relative max-w-[760px] mx-auto px-8 text-center">
            <motion.h2 {...fadeUp()} style={{ fontSize: "clamp(32px,4vw,56px)", fontWeight: 400, letterSpacing: "-0.04em", color: "#F9FAFA", lineHeight: 1.15 }}>
              Start serving models in minutes.
            </motion.h2>
            <motion.p {...fadeUp(0.1)} style={{ fontSize: 17, color: "#94979E", marginTop: 20, lineHeight: 1.65 }}>
              No infra to manage. No capacity planning. Just an API key and your model.
            </motion.p>
            <motion.div {...fadeUp(0.18)} className="flex items-center justify-center gap-3 mt-10">
              <Link href="#" className="inline-flex items-center px-8 h-12 rounded-full text-[15px] font-medium"
                style={{ background: "linear-gradient(135deg,#34D59A,#1a8f65)", color: "#0C0D0D", boxShadow: "0 0 28px rgba(52,213,154,0.3)" }}>
                Get started free
              </Link>
              <Link href="#" className="inline-flex items-center px-8 h-12 rounded-full text-[15px]"
                style={{ color: "#F9FAFA", border: "1px solid rgba(255,255,255,0.18)" }}>
                Talk to sales
              </Link>
            </motion.div>
            <motion.div {...fadeUp(0.26)} className="mt-10 rounded-xl px-6 py-4 inline-flex items-center gap-3"
              style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.07)" }}>
              <span style={{ color: "#34D59A", fontFamily: "var(--font-mono)", fontSize: 13 }}>$</span>
              <span style={{ color: "#94979E", fontFamily: "var(--font-mono)", fontSize: 13 }}>npm install @synapse-ai/sdk</span>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
