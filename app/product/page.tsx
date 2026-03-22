"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnnouncementBar from "@/components/layout/announcement-bar";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HalftoneEdges from "@/components/ui/halftone-edges";
import SectionGlow from "@/components/ui/section-glow";
import CTAFinal from "@/components/sections/cta-final";

/* ─── Shared animation helper ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

/* ─── DotIcon — identical to homepage ─── */
function DotIcon({ dark = false }: { dark?: boolean }) {
  const fill = dark ? "#2C4A3E" : "#94979E";
  return (
    <svg width="40" height="32" viewBox="0 0 40 32" fill="none" className="mb-10">
      {[5, 4, 3, 2, 1].map((cols, row) =>
        Array.from({ length: cols }, (_, col) => {
          const x = col * 7 + (5 - cols) * 3.5 + 3;
          const y = row * 6 + 3;
          const opacity = 0.2 + ((row + col) / (5 + cols)) * 0.8;
          return <circle key={`${row}-${col}`} cx={x} cy={y} r={1.6} fill={fill} fillOpacity={opacity} />;
        })
      )}
    </svg>
  );
}

/* ─── Thin check icon ─── */
function Check({ color = "#34D59A" }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="7" cy="7" r="6.5" stroke={color} strokeOpacity={0.25} />
      <path d="M4 7l2 2 4-4" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION 1 — HERO
══════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#0C0D0D", paddingTop: 160, paddingBottom: 120 }}
    >
      <SectionGlow variant="center" />

      {/* Radial centre highlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(52,213,154,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[900px] mx-auto px-8 text-center">
        {/* Eyebrow */}
        <motion.div {...fadeUp(0)} className="flex items-center justify-center gap-2 mb-8">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.16em]"
            style={{ border: "1px solid rgba(52,213,154,0.3)", color: "#34D59A" }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#34D59A",
                display: "inline-block",
              }}
            />
            Synapse Platform
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          {...fadeUp(0.07)}
          style={{
            fontSize: "clamp(38px, 5.5vw, 68px)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.04em",
            color: "#F9FAFA",
          }}
        >
          A modern AI platform built for real engineering work
        </motion.h1>

        {/* Sub */}
        <motion.p
          {...fadeUp(0.14)}
          style={{
            fontSize: "clamp(16px, 1.6vw, 19px)",
            color: "#94979E",
            lineHeight: 1.65,
            maxWidth: 640,
            margin: "28px auto 0",
          }}
        >
          Fully featured AI inference, powerfully driven by automation to enhance every workflow — from first request to production scale.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.2)}
          className="flex items-center justify-center gap-3 mt-10"
        >
          <a
            href="#"
            className="inline-flex items-center px-7 h-12 rounded-full text-[15px] font-medium transition-colors"
            style={{ background: "#34D59A", color: "#0C0D0D" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#2bc589")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#34D59A")}
          >
            Get started free
          </a>
          <a
            href="#"
            className="inline-flex items-center px-7 h-12 rounded-full text-[15px] transition-colors"
            style={{ color: "#F9FAFA", border: "1px solid rgba(255,255,255,0.18)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)")}
          >
            Request a demo
          </a>
        </motion.div>

        {/* Stat pills */}
        <motion.div
          {...fadeUp(0.28)}
          className="flex items-center justify-center gap-6 mt-14 flex-wrap"
        >
          {[
            { value: "43ms", label: "Median latency" },
            { value: "99.99%", label: "Uptime SLA" },
            { value: "10M+", label: "Daily requests" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 px-5 py-3 rounded-xl"
              style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.03em", color: "#F9FAFA" }}>
                {value}
              </span>
              <span style={{ fontSize: 13, color: "#94979E" }}>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION 2 — PLATFORM STRIP
══════════════════════════════════════════════════════════ */
function PlatformStrip() {
  const items = [
    "LLM Router", "Inference Engine", "Fine-Tuning", "Vector DB",
    "Observability", "Autoscaling", "Agent Orchestration", "Billing Engine",
  ];
  return (
    <div
      className="border-b border-t"
      style={{ borderColor: "rgba(255,255,255,0.06)", background: "#0e0f0f" }}
    >
      <div className="max-w-[1400px] mx-auto px-8 py-5 flex items-center gap-3 flex-wrap">
        <span className="text-[12px] uppercase tracking-widest mr-4" style={{ color: "#94979E" }}>
          One platform for
        </span>
        {items.map((item, i) => (
          <span
            key={item}
            className="px-3 py-1.5 rounded-full text-[12px]"
            style={{
              background: i === 0 ? "rgba(52,213,154,0.1)" : "rgba(255,255,255,0.04)",
              color: i === 0 ? "#34D59A" : "#94979E",
              border: i === 0 ? "1px solid rgba(52,213,154,0.25)" : "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION 3 — FEATURE TABS
══════════════════════════════════════════════════════════ */

const FEATURES = [
  {
    id: "routing",
    tab: "Intelligent Routing",
    headline: "Routing that works for you",
    body: "AI-powered request routing dispatches every call to the optimal model in real time, adapts to load and cost constraints, and returns results so engineers spend less time tuning and more time building.",
    bullets: ["Real-Time Model Selection", "Cost & Latency Budgets", "Fallback Chains", "Semantic Request Classification"],
    visual: <RoutingVisual />,
  },
  {
    id: "scaling",
    tab: "Flexible Scaling",
    headline: "Scaling that stays in sync",
    body: "Provision capacity instantly and autoscale horizontally to handle traffic spikes — with GPU preemption, spot instance recovery, and zero-config cold-start optimisation built in.",
    bullets: ["Zero Cold-Start Warm Pools", "Spot & Reserved Blending", "Per-Model Autoscale Rules", "Multi-Region Failover"],
    visual: <ScalingVisual />,
  },
  {
    id: "orchestration",
    tab: "Agent Orchestration",
    headline: "Tasks that don't fall through",
    body: "A reliable pipeline engine that automatically queues agent steps, enforces retry budgets, and gives platform teams clear visibility over every in-flight workflow.",
    bullets: ["DAG-Based Pipelines", "Retry & Timeout Policies", "Supervisor Approval Gates", "Required Step Deadlines"],
    visual: <OrchestrationVisual />,
  },
  {
    id: "observability",
    tab: "Observability",
    headline: "Observability that tells the full story",
    body: "Real-time dashboards deliver token-level traces, latency distributions, and cost breakdowns with intuitive controls. Filter, drill down, and export — all scoped securely to your workspace.",
    bullets: ["Token-Level Traces", "Live Cost Dashboards", "Latency Percentile Charts", "Actionable Alerting"],
    visual: <ObsVisual />,
  },
  {
    id: "models",
    tab: "Model Management",
    headline: "Model care that lives in one place",
    body: "A comprehensive registry for every model version — with access controls, A/B routing weights, blue-green deploys, and a secure API gateway that centralises keys and quota.",
    bullets: ["Version Registry", "A/B Weight Routing", "Blue-Green Deploys", "Centralised API Keys"],
    visual: <ModelsVisual />,
  },
  {
    id: "billing",
    tab: "Billing Engine",
    headline: "Customise your usage process",
    body: "Turn inference usage into accurate invoices automatically, reduce overruns with configurable budget rules, and speed up reconciliation with automated spend reports.",
    bullets: ["Per-Team Budgets", "Usage Worklist", "Configurable Alerts", "Automated Reports"],
    visual: <BillingVisual />,
  },
];

/* ── Mini visuals ── */
function RoutingVisual() {
  const models = [
    { name: "llama-3.1-70b", pct: 42, color: "#34D59A" },
    { name: "mistral-8x22b", pct: 31, color: "#7C6FFF" },
    { name: "gemma-2-27b",   pct: 17, color: "#F59D4A" },
    { name: "phi-3-mini",    pct: 10, color: "#94979E" },
  ];
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <span className="text-[12px] uppercase tracking-widest" style={{ color: "#94979E" }}>Live Traffic Distribution</span>
      </div>
      <div className="p-5 space-y-4">
        {models.map((m) => (
          <div key={m.name}>
            <div className="flex justify-between mb-1.5">
              <span style={{ fontSize: 12, color: "rgba(249,250,250,0.65)", fontFamily: "var(--font-mono),monospace" }}>{m.name}</span>
              <span style={{ fontSize: 12, color: m.color, fontFamily: "var(--font-mono),monospace" }}>{m.pct}%</span>
            </div>
            <div className="rounded-full overflow-hidden" style={{ height: 4, background: "rgba(255,255,255,0.07)" }}>
              <div className="h-full rounded-full" style={{ width: `${m.pct}%`, background: m.color, opacity: 0.8 }} />
            </div>
          </div>
        ))}
        <div className="pt-3 border-t flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <span style={{ fontSize: 11, color: "#94979E" }}>Avg latency</span>
          <span style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.03em", color: "#34D59A" }}>43ms</span>
        </div>
      </div>
    </div>
  );
}

function ScalingVisual() {
  const bars = [18, 22, 30, 38, 55, 70, 88, 95, 80, 60, 45, 35];
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <span className="text-[12px] uppercase tracking-widest" style={{ color: "#94979E" }}>GPU Utilisation — 24h</span>
      </div>
      <div className="px-5 pb-5 pt-4">
        <div className="flex items-end gap-1.5" style={{ height: 80 }}>
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                background: h > 80
                  ? "rgba(245,157,74,0.75)"
                  : "rgba(52,213,154,0.45)",
                transition: "height 0.3s ease",
              }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-3">
          <span style={{ fontSize: 11, color: "#94979E" }}>00:00</span>
          <span style={{ fontSize: 11, color: "#94979E" }}>24:00</span>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <span className="px-2 py-1 rounded text-[11px]" style={{ background: "rgba(52,213,154,0.1)", color: "#34D59A" }}>Auto-scaled ×3</span>
          <span style={{ fontSize: 11, color: "#94979E" }}>Peak handled at 95% utilisation</span>
        </div>
      </div>
    </div>
  );
}

function OrchestrationVisual() {
  const steps = [
    { label: "Ingest", status: "done", color: "#34D59A" },
    { label: "Classify", status: "done", color: "#34D59A" },
    { label: "Route", status: "active", color: "#7C6FFF" },
    { label: "Generate", status: "pending", color: "#94979E" },
    { label: "Validate", status: "pending", color: "#94979E" },
    { label: "Deliver", status: "pending", color: "#94979E" },
  ];
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <span className="text-[12px] uppercase tracking-widest" style={{ color: "#94979E" }}>Pipeline — request-7f3a</span>
      </div>
      <div className="p-5 flex items-center gap-0">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{
                  background: step.status === "active" ? "rgba(124,111,255,0.18)" : step.status === "done" ? "rgba(52,213,154,0.12)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${step.color}${step.status === "pending" ? "33" : "55"}`,
                }}
              >
                {step.status === "done" && <span style={{ fontSize: 9, color: "#34D59A" }}>✓</span>}
                {step.status === "active" && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7C6FFF", display: "block" }} />}
                {step.status === "pending" && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "block" }} />}
              </div>
              <span style={{ fontSize: 10, color: step.color, marginTop: 5, opacity: step.status === "pending" ? 0.4 : 1 }}>{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ height: 1, width: "100%", background: i < 2 ? "rgba(52,213,154,0.3)" : "rgba(255,255,255,0.07)", flexShrink: 0, marginBottom: 18 }} />
            )}
          </div>
        ))}
      </div>
      <div className="px-5 pb-5">
        <div className="rounded-lg px-3 py-2" style={{ background: "rgba(124,111,255,0.07)", border: "1px solid rgba(124,111,255,0.18)" }}>
          <span style={{ fontSize: 11, color: "#7C6FFF" }}>Step 3/6 · Routing to optimal model based on latency budget…</span>
        </div>
      </div>
    </div>
  );
}

function ObsVisual() {
  const traces = [
    { id: "req-a1b2", latency: 38, tokens: 512, model: "llama-3.1-70b", status: "ok" },
    { id: "req-c3d4", latency: 121, tokens: 1842, model: "mistral-8x22b", status: "ok" },
    { id: "req-e5f6", latency: 19, tokens: 256, model: "gemma-2-27b", status: "ok" },
    { id: "req-g7h8", latency: 504, tokens: 4096, model: "llama-3.1-70b", status: "warn" },
  ];
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <span className="text-[12px] uppercase tracking-widest" style={{ color: "#94979E" }}>Recent Traces</span>
        <span className="text-[11px] px-2 py-0.5 rounded" style={{ background: "rgba(52,213,154,0.1)", color: "#34D59A" }}>Live</span>
      </div>
      <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
        {traces.map((t) => (
          <div key={t.id} className="px-5 py-3 flex items-center gap-4">
            <span style={{ fontSize: 11, color: "#94979E", fontFamily: "var(--font-mono),monospace", width: 76 }}>{t.id}</span>
            <span style={{ fontSize: 11, color: t.status === "warn" ? "#F59D4A" : "#34D59A", fontFamily: "var(--font-mono),monospace", width: 52 }}>{t.latency}ms</span>
            <span style={{ fontSize: 11, color: "rgba(249,250,250,0.4)", flex: 1 }}>{t.model}</span>
            <span style={{ fontSize: 11, color: "#94979E", fontFamily: "var(--font-mono),monospace" }}>{t.tokens} tok</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModelsVisual() {
  const models = [
    { name: "llama-3.1-70b", tag: "v2.3.1", weight: 70, active: true },
    { name: "llama-3.1-70b", tag: "v2.3.0", weight: 30, active: false },
    { name: "mistral-8x22b", tag: "v1.0.4", weight: 100, active: true },
  ];
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <span className="text-[12px] uppercase tracking-widest" style={{ color: "#94979E" }}>Model Registry</span>
      </div>
      <div className="p-5 space-y-3">
        {models.map((m, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.active ? "#34D59A" : "#94979E", flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: "rgba(249,250,250,0.75)", fontFamily: "var(--font-mono),monospace", flex: 1 }}>{m.name}</span>
            <span style={{ fontSize: 10, color: "#94979E", fontFamily: "var(--font-mono),monospace" }}>{m.tag}</span>
            <span style={{ fontSize: 11, color: "#7C6FFF", fontFamily: "var(--font-mono),monospace" }}>{m.weight}%</span>
          </div>
        ))}
        <div className="flex gap-2 pt-1">
          <div className="flex-1 rounded-lg p-2 text-center" style={{ background: "rgba(52,213,154,0.07)", border: "1px solid rgba(52,213,154,0.2)" }}>
            <span style={{ fontSize: 11, color: "#34D59A" }}>+ Deploy new version</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BillingVisual() {
  const teams = [
    { name: "platform", used: 68, budget: 100, color: "#34D59A" },
    { name: "product", used: 91, budget: 100, color: "#F59D4A" },
    { name: "research", used: 34, budget: 100, color: "#7C6FFF" },
  ];
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <span className="text-[12px] uppercase tracking-widest" style={{ color: "#94979E" }}>Monthly Budget — March 2026</span>
      </div>
      <div className="p-5 space-y-4">
        {teams.map((t) => (
          <div key={t.name}>
            <div className="flex justify-between mb-1.5">
              <span style={{ fontSize: 12, color: "rgba(249,250,250,0.65)", fontFamily: "var(--font-mono),monospace" }}>{t.name}</span>
              <span style={{ fontSize: 12, color: t.used > 85 ? "#F59D4A" : t.color, fontFamily: "var(--font-mono),monospace" }}>{t.used}%</span>
            </div>
            <div className="rounded-full overflow-hidden" style={{ height: 4, background: "rgba(255,255,255,0.07)" }}>
              <div className="h-full rounded-full" style={{ width: `${t.used}%`, background: t.used > 85 ? "#F59D4A" : t.color, opacity: 0.75 }} />
            </div>
          </div>
        ))}
        <div className="pt-3 border-t flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <span style={{ fontSize: 11, color: "#94979E" }}>Total spend MTD</span>
          <span style={{ fontSize: 17, fontWeight: 500, letterSpacing: "-0.03em", color: "#F9FAFA" }}>$14,280</span>
        </div>
      </div>
    </div>
  );
}

function FeaturesSection() {
  const [active, setActive] = useState(0);
  const feature = FEATURES[active];

  return (
    <section
      id="features"
      className="relative overflow-hidden border-b"
      style={{ background: "#0C0D0D", borderColor: "rgba(255,255,255,0.06)", paddingTop: 120, paddingBottom: 120 }}
    >
      <SectionGlow variant="default" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-8">
        {/* Section heading */}
        <motion.div {...fadeUp(0)}>
          <DotIcon />
          <h2
            style={{
              fontSize: "clamp(26px, 3vw, 44px)",
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: "-0.04em",
              color: "#6B7280",
              maxWidth: 700,
            }}
          >
            <span style={{ color: "#F9FAFA" }}>Everything you need in an inference platform.</span>{" "}
            Six surfaces, one unified workspace.
          </h2>
        </motion.div>

        {/* Tab row */}
        <motion.div
          {...fadeUp(0.08)}
          className="mt-14 flex gap-1 flex-wrap"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: 0 }}
        >
          {FEATURES.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setActive(i)}
              className="px-4 py-3 text-[13px] transition-colors relative"
              style={{
                color: active === i ? "#F9FAFA" : "#94979E",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              {f.tab}
              {active === i && (
                <motion.div
                  layoutId="feature-underline"
                  className="absolute bottom-0 left-0 right-0"
                  style={{ height: 1, background: "#34D59A" }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Feature body */}
        <AnimatePresence mode="wait">
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mt-14 grid gap-16"
            style={{ gridTemplateColumns: "1fr 1fr" }}
          >
            {/* Left — copy */}
            <div className="flex flex-col justify-center">
              <h3
                style={{
                  fontSize: "clamp(22px, 2.2vw, 32px)",
                  fontWeight: 400,
                  letterSpacing: "-0.03em",
                  color: "#F9FAFA",
                  lineHeight: 1.2,
                  marginBottom: 20,
                }}
              >
                {feature.headline}
              </h3>
              <p style={{ fontSize: 16, color: "#94979E", lineHeight: 1.7, marginBottom: 28 }}>
                {feature.body}
              </p>
              <ul className="space-y-3">
                {feature.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <Check />
                    <span style={{ fontSize: 14, color: "rgba(249,250,250,0.65)" }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — visual */}
            <div className="flex items-center justify-center">
              {feature.visual}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION 4 — SOCIAL PROOF
══════════════════════════════════════════════════════════ */
function SocialProof() {
  return (
    <section
      className="relative overflow-hidden border-b"
      style={{ background: "#080909", borderColor: "rgba(255,255,255,0.06)", paddingTop: 100, paddingBottom: 100 }}
    >
      <div className="relative z-10 max-w-[1200px] mx-auto px-8">
        <motion.div {...fadeUp(0)} className="mb-3">
          <span className="text-[11px] uppercase tracking-widest" style={{ color: "#94979E" }}>Synapse at work</span>
        </motion.div>

        <motion.h2
          {...fadeUp(0.06)}
          style={{
            fontSize: "clamp(24px, 2.8vw, 40px)",
            fontWeight: 400,
            letterSpacing: "-0.04em",
            color: "#F9FAFA",
            marginBottom: 48,
          }}
        >
          What it&apos;s like working with Synapse
        </motion.h2>

        <div className="grid gap-6" style={{ gridTemplateColumns: "2fr 1fr 1fr" }}>
          {/* Primary quote card */}
          <motion.div
            {...fadeUp(0.1)}
            className="rounded-2xl p-8"
            style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p style={{ fontSize: 18, color: "#F9FAFA", lineHeight: 1.6, fontStyle: "italic", marginBottom: 28 }}>
              &ldquo;Synapse makes the inference pipeline smooth, increasing our product quality and team velocity. We cut time-to-response by half and our engineers actually enjoy working with it.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium"
                style={{ background: "rgba(52,213,154,0.15)", color: "#34D59A" }}
              >
                JR
              </div>
              <div>
                <div style={{ fontSize: 13, color: "#F9FAFA", fontWeight: 500 }}>Jordan Rivera</div>
                <div style={{ fontSize: 12, color: "#94979E" }}>Head of Platform, Outfront</div>
              </div>
            </div>

            {/* Stats */}
            <div
              className="mt-8 pt-6 grid grid-cols-2 gap-6 border-t"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              {[
                { value: "2–3h", label: "Saved per engineer per week" },
                { value: "50%", label: "Reduction in integration time" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.04em", color: "#34D59A" }}>{value}</div>
                  <div style={{ fontSize: 12, color: "#94979E", marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Secondary cards */}
          {[
            {
              quote: "Synapse is the only platform with real-time routing and native observability in one product. I can finally get the detail I need without an entire infrastructure team.",
              name: "Steven Gold",
              role: "CTO, Refresh AI",
              initials: "SG",
            },
            {
              quote: "The autoscaling just works. We went from dozens of deployment scripts to one config file. Our P99 latency dropped by 60% in the first week.",
              name: "Mia Chen",
              role: "Staff Engineer, DoorDash",
              initials: "MC",
            },
          ].map((c, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.14 + i * 0.06)}
              className="rounded-2xl p-6 flex flex-col justify-between"
              style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <p style={{ fontSize: 14, color: "rgba(249,250,250,0.65)", lineHeight: 1.65, fontStyle: "italic" }}>
                &ldquo;{c.quote}&rdquo;
              </p>
              <div className="flex items-center gap-2.5 mt-6">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium"
                  style={{ background: "rgba(124,111,255,0.12)", color: "#7C6FFF" }}
                >
                  {c.initials}
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#F9FAFA", fontWeight: 500 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: "#94979E" }}>{c.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION 5 — COMPLIANCE / SECURITY
══════════════════════════════════════════════════════════ */
function Compliance() {
  const items = [
    "SOC 2 Type II certified with end-to-end encryption and secure data handling",
    "GDPR and CCPA compliant — regional data residency options available",
    "Supports organisation-specific security requirements (SSO, SAML, audit log export)",
    "Audit-ready request logs and secure access controls for all model traffic",
    "99.99% uptime SLA with cloud-native infrastructure and continuous backups",
    "Role-based permissions to safeguard team budgets, keys, and model access",
  ];
  return (
    <section
      className="relative overflow-hidden border-b"
      style={{ background: "#0C0D0D", borderColor: "rgba(255,255,255,0.06)", paddingTop: 100, paddingBottom: 100 }}
    >
      <HalftoneEdges
        leftColor="rgba(52,213,154,0.55)"
        rightColor="rgba(220,120,60,0.45)"
        dotSize={1.6}
        spacing={9}
        edgeWidth={280}
        fadeStop={100}
      />
      <div className="relative z-10 max-w-[1200px] mx-auto px-8">
        <div className="grid gap-16" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {/* Left */}
          <motion.div {...fadeUp(0)}>
            <span className="text-[11px] uppercase tracking-widest block mb-6" style={{ color: "#94979E" }}>
              Compliance you can count on
            </span>
            <h2
              style={{
                fontSize: "clamp(24px, 2.8vw, 40px)",
                fontWeight: 400,
                letterSpacing: "-0.04em",
                color: "#F9FAFA",
                lineHeight: 1.2,
                marginBottom: 24,
              }}
            >
              The essential standards, built in.
            </h2>
            <p style={{ fontSize: 15, color: "#94979E", lineHeight: 1.7 }}>
              Security and compliance aren&apos;t afterthoughts at Synapse — they ship with every workspace, on every plan.
            </p>

            {/* Trust badges */}
            <div className="flex gap-3 mt-10 flex-wrap">
              {["SOC 2", "GDPR", "CCPA", "HIPAA Ready", "ISO 27001"].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1.5 rounded-lg text-[12px] font-medium"
                  style={{ background: "rgba(52,213,154,0.07)", color: "#34D59A", border: "1px solid rgba(52,213,154,0.2)" }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — bullet list */}
          <motion.ul {...fadeUp(0.1)} className="space-y-4">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check />
                <span style={{ fontSize: 14, color: "rgba(249,250,250,0.6)", lineHeight: 1.6 }}>{item}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION 6 — INTEGRATIONS
══════════════════════════════════════════════════════════ */
function Integrations() {
  const logos = [
    { name: "OpenAI", color: "#10A37F" },
    { name: "Anthropic", color: "#D97449" },
    { name: "HuggingFace", color: "#FFD21E" },
    { name: "LangChain", color: "#1C7C4A" },
    { name: "Vercel", color: "#F9FAFA" },
    { name: "AWS", color: "#FF9900" },
    { name: "GCP", color: "#4285F4" },
    { name: "Datadog", color: "#632CA6" },
    { name: "Grafana", color: "#F46800" },
    { name: "GitHub", color: "#F9FAFA" },
    { name: "Slack", color: "#4A154B" },
    { name: "Linear", color: "#5E6AD2" },
  ];
  return (
    <section
      className="relative overflow-hidden border-b"
      style={{ background: "#080909", borderColor: "rgba(255,255,255,0.06)", paddingTop: 100, paddingBottom: 100 }}
    >
      <div className="relative z-10 max-w-[1200px] mx-auto px-8">
        <motion.div {...fadeUp(0)} className="text-center mb-14">
          <span className="text-[11px] uppercase tracking-widest block mb-4" style={{ color: "#94979E" }}>
            Integrations
          </span>
          <h2
            style={{
              fontSize: "clamp(24px, 2.8vw, 40px)",
              fontWeight: 400,
              letterSpacing: "-0.04em",
              color: "#F9FAFA",
              marginBottom: 16,
            }}
          >
            Seamless integrations
          </h2>
          <p style={{ fontSize: 15, color: "#94979E", maxWidth: 520, margin: "0 auto" }}>
            Synapse works with your existing stack — enabling reliable data exchange and smooth end-to-end workflows.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp(0.1)}
          className="grid gap-px"
          style={{ gridTemplateColumns: "repeat(4, 1fr)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}
        >
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center justify-center gap-2.5 py-6 transition-colors"
              style={{ background: "#0C0D0D" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#111215")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#0C0D0D")}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: logo.color,
                  flexShrink: 0,
                  opacity: 0.85,
                }}
              />
              <span style={{ fontSize: 13, color: "rgba(249,250,250,0.55)", fontWeight: 500 }}>{logo.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION 7 — FAQ
══════════════════════════════════════════════════════════ */
const FAQS = [
  { q: "What model providers does Synapse support?", a: "Synapse supports all major open-source and proprietary models including Llama, Mistral, Gemma, Phi, GPT-4o, Claude, and custom fine-tuned checkpoints. Any OpenAI-compatible endpoint works out of the box." },
  { q: "How is access controlled across teams and roles?", a: "Role-based permissions control access from workspace navigation to individual model endpoints and budget policies. Teams get isolated namespaces with their own keys, limits, and audit logs." },
  { q: "How does the platform support compliance requirements?", a: "Configurable request logging, automated retention policies, supervisor approval gates, and compliance reports aligned with SOC 2, GDPR, CCPA, and HIPAA-adjacent requirements." },
  { q: "How do requests, routing, and billing work end-to-end?", a: "Requests flow from your application into the router, which selects the optimal model and dispatches to the inference engine. Usage is metered in real time, billed per token, and visible in your dashboard instantly." },
  { q: "What AI capabilities are built into the platform?", a: "Semantic routing, automated fine-tuning pipelines, AI-assisted cost optimisation, intelligent rate-limit smoothing, and HIPAA-ready ambient logging for regulated workloads." },
  { q: "How configurable is the system?", a: "Fully configurable. Custom routing rules, per-model timeout budgets, fallback chains, team-level cost limits, and webhook integrations are all available via API or the dashboard." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section
      className="relative overflow-hidden border-b"
      style={{ background: "#0C0D0D", borderColor: "rgba(255,255,255,0.06)", paddingTop: 100, paddingBottom: 100 }}
    >
      <div className="relative z-10 max-w-[900px] mx-auto px-8">
        <motion.div {...fadeUp(0)} className="text-center mb-14">
          <h2
            style={{
              fontSize: "clamp(24px, 2.8vw, 40px)",
              fontWeight: 400,
              letterSpacing: "-0.04em",
              color: "#F9FAFA",
            }}
          >
            Common questions
          </h2>
        </motion.div>

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.04 * i)}
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors"
                style={{ background: open === i ? "#111215" : "#0C0D0D", cursor: "pointer", border: "none" }}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span style={{ fontSize: 15, color: "#F9FAFA", fontWeight: 400 }}>{faq.q}</span>
                <span
                  style={{
                    fontSize: 18,
                    color: "#94979E",
                    transition: "transform 0.2s",
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                    flexShrink: 0,
                    marginLeft: 16,
                  }}
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="px-6 pb-6" style={{ background: "#111215" }}>
                      <p style={{ fontSize: 14, color: "#94979E", lineHeight: 1.7, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16 }}>{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ══════════════════════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════════════════════ */
export default function ProductPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main style={{ paddingTop: 80 }}>
        <Hero />
        <PlatformStrip />
        <FeaturesSection />
        <SocialProof />
        <Compliance />
        <Integrations />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
