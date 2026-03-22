"use client";

import { motion } from "framer-motion";
import AnnouncementBar from "@/components/layout/announcement-bar";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HalftoneEdges from "@/components/ui/halftone-edges";
import SectionGlow from "@/components/ui/section-glow";

/* ─── Animation helper ─── */
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
          return (
            <circle key={`${row}-${col}`} cx={x} cy={y} r={1.6} fill={fill} fillOpacity={opacity} />
          );
        })
      )}
    </svg>
  );
}

/* ─── Diamond eyebrow icon (matches homepage) ─── */
function DiamondIcon({ color = "#ef4444" }: { color?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M1 5L5 1L9 5L5 9L1 5Z" fill={color} />
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
      style={{ background: "#0C0D0D", paddingTop: 160, paddingBottom: 130 }}
    >
      <SectionGlow variant="center" />

      {/* Radial top glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 0%, rgba(52,213,154,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-[820px] mx-auto px-8 text-center">
        {/* Eyebrow */}
        <motion.div {...fadeUp(0)} className="flex items-center justify-center gap-2 mb-8">
          <DiamondIcon />
          <span
            className="text-[11px] uppercase tracking-[0.18em]"
            style={{ color: "#94979E", fontFamily: "var(--font-mono), monospace" }}
          >
            About Synapse
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.07)}
          style={{
            fontSize: "clamp(36px, 5.5vw, 66px)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.04em",
            color: "#F9FAFA",
            marginBottom: 28,
          }}
        >
          We&apos;re building the inference layer for the AI era
        </motion.h1>

        {/* Sub */}
        <motion.p
          {...fadeUp(0.14)}
          style={{
            fontSize: "clamp(15px, 1.6vw, 18px)",
            color: "#94979E",
            lineHeight: 1.75,
            maxWidth: 600,
            margin: "0 auto 40px",
          }}
        >
          Synapse was founded by ML researchers who spent years running inference
          at scale. We got tired of brittle infrastructure and built the platform
          we always wanted — fast, observable, and operator-free.
        </motion.p>

        {/* CTA row */}
        <motion.div {...fadeUp(0.2)} className="flex items-center justify-center gap-3">
          <a
            href="#"
            className="inline-flex items-center px-7 h-12 rounded-full text-[15px] font-medium transition-colors"
            style={{ background: "#34D59A", color: "#0C0D0D" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#2bc589")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#34D59A")}
          >
            View open roles
          </a>
          <a
            href="#"
            className="inline-flex items-center px-7 h-12 rounded-full text-[15px] transition-colors"
            style={{ color: "#F9FAFA", border: "1px solid rgba(255,255,255,0.18)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)")}
          >
            Read our story
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION 2 — MISSION STATEMENT (full-bleed dark)
══════════════════════════════════════════════════════════ */
function Mission() {
  return (
    <section
      className="relative overflow-hidden border-b border-t"
      style={{
        background: "#080909",
        borderColor: "rgba(255,255,255,0.06)",
        paddingTop: 100,
        paddingBottom: 100,
      }}
    >
      <HalftoneEdges
        leftColor="rgba(52,213,154,0.55)"
        rightColor="rgba(220,120,60,0.45)"
        dotSize={1.6}
        spacing={9}
        edgeWidth={300}
        fadeStop={100}
      />
      <div className="relative z-10 max-w-[1000px] mx-auto px-8 text-center">
        <motion.p
          {...fadeUp(0)}
          style={{
            fontSize: "clamp(20px, 2.8vw, 38px)",
            fontWeight: 400,
            lineHeight: 1.45,
            letterSpacing: "-0.03em",
            color: "#6B7280",
          }}
        >
          <span style={{ color: "#F9FAFA" }}>
            Our mission is to make world-class AI inference accessible to every team.
          </span>{" "}
          Not just the ones with dedicated ML platform engineers and unlimited cloud budgets.
        </motion.p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION 3 — METRICS BAR
══════════════════════════════════════════════════════════ */
const METRICS = [
  { value: "150k+", label: "Endpoints provisioned daily", color: "#34D59A" },
  { value: "43ms",  label: "Median inference latency",   color: "#34D59A" },
  { value: "99.99%", label: "Platform uptime SLA",       color: "#34D59A" },
  { value: "W2024", label: "Y Combinator cohort",        color: "#F59D4A" },
];

function Metrics() {
  return (
    <section
      className="border-b"
      style={{ background: "#0C0D0D", borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              {...fadeUp(i * 0.07)}
              className="py-14 px-8"
              style={{
                borderRight: i < METRICS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  fontWeight: 400,
                  letterSpacing: "-0.04em",
                  color: m.color,
                  lineHeight: 1,
                  marginBottom: 10,
                }}
              >
                {m.value}
              </div>
              <div style={{ fontSize: 13, color: "#94979E", lineHeight: 1.5 }}>{m.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION 4 — STORY / TIMELINE
══════════════════════════════════════════════════════════ */
const TIMELINE = [
  {
    year: "2022",
    title: "The problem becomes obvious",
    body: "Three ML engineers at a large tech company spend six months trying to reduce P99 inference latency below 200ms. They spend more time on infrastructure than on models. The frustration is shared across every team they talk to.",
  },
  {
    year: "2023",
    title: "Synapse is founded",
    body: "Maria, James, and Priya leave their jobs and start building in a shared apartment in the Mission District, San Francisco. The prototype routes requests across three open-source models with sub-50ms latency on day one.",
  },
  {
    year: "2024",
    title: "Y Combinator W2024",
    body: "Synapse is accepted into Y Combinator's Winter 2024 batch. The team ships continuous batching, semantic routing, and the first public API in twelve weeks. 500 teams sign up in the first month.",
  },
  {
    year: "2025",
    title: "Series A & global scale",
    body: "Synapse raises its Series A and expands to three regions. The platform handles its first billion inference requests in a single day. Fine-tuning, vector search, and agent orchestration ship to general availability.",
  },
  {
    year: "2026",
    title: "The inference standard",
    body: "Today Synapse powers AI workloads for thousands of teams — from two-person startups to Fortune 500 engineering orgs. We&apos;re still twelve people. Still shipping every week.",
  },
];

function Story() {
  return (
    <section
      id="story"
      className="relative overflow-hidden border-b"
      style={{ background: "#0C0D0D", borderColor: "rgba(255,255,255,0.06)", paddingTop: 120, paddingBottom: 120 }}
    >
      <SectionGlow variant="default" />
      <div className="relative z-10 max-w-[1200px] mx-auto px-8">
        <motion.div {...fadeUp(0)} className="mb-16">
          <DotIcon />
          <h2
            style={{
              fontSize: "clamp(26px, 3vw, 44px)",
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: "-0.04em",
              color: "#6B7280",
              maxWidth: 640,
            }}
          >
            <span style={{ color: "#F9FAFA" }}>How we got here.</span>{" "}
            Five years of obsessing over milliseconds.
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute top-0 bottom-0 hidden lg:block"
            style={{ left: 80, width: 1, background: "rgba(255,255,255,0.06)" }}
          />

          <div className="space-y-0">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                {...fadeUp(i * 0.08)}
                className="relative grid lg:grid-cols-[160px_1fr] gap-8 lg:gap-16 py-10 border-b"
                style={{ borderColor: "rgba(255,255,255,0.05)" }}
              >
                {/* Year + dot */}
                <div className="flex items-start gap-5 lg:gap-0 lg:flex-col">
                  {/* Timeline dot */}
                  <div
                    className="hidden lg:flex items-center justify-center rounded-full shrink-0"
                    style={{
                      width: 10,
                      height: 10,
                      background: i === TIMELINE.length - 1 ? "#34D59A" : "#0C0D0D",
                      border: `1px solid ${i === TIMELINE.length - 1 ? "#34D59A" : "rgba(255,255,255,0.2)"}`,
                      marginLeft: 75.5,
                      marginBottom: 14,
                      boxShadow: i === TIMELINE.length - 1 ? "0 0 8px rgba(52,213,154,0.5)" : "none",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                      color: i === TIMELINE.length - 1 ? "#34D59A" : "#94979E",
                      fontFamily: "var(--font-mono), monospace",
                    }}
                  >
                    {item.year}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3
                    style={{
                      fontSize: "clamp(16px, 1.5vw, 22px)",
                      fontWeight: 400,
                      letterSpacing: "-0.02em",
                      color: "#F9FAFA",
                      marginBottom: 12,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{ fontSize: 15, color: "#94979E", lineHeight: 1.75, maxWidth: 560 }}
                    dangerouslySetInnerHTML={{ __html: item.body }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION 5 — TEAM
══════════════════════════════════════════════════════════ */
const TEAM = [
  { name: "Maria Santos", role: "Co-founder & CEO", initials: "MS", bg: "rgba(52,213,154,0.12)", color: "#34D59A", bio: "Previously: ML Platform, Meta AI Research. Stanford CS PhD." },
  { name: "James Park",   role: "Co-founder & CTO", initials: "JP", bg: "rgba(124,111,255,0.12)", color: "#7C6FFF", bio: "Previously: Infrastructure Lead, OpenAI. Caltech EE/CS." },
  { name: "Priya Mehta",  role: "Co-founder & CPO", initials: "PM", bg: "rgba(245,157,74,0.12)",  color: "#F59D4A", bio: "Previously: Product Director, Scale AI. MIT EECS." },
  { name: "Alex Kim",     role: "Head of Engineering", initials: "AK", bg: "rgba(52,213,154,0.08)", color: "#34D59A", bio: "Previously: Senior SWE, Cloudflare Workers. CMU CS." },
  { name: "Rania Hassan", role: "Head of Research",    initials: "RH", bg: "rgba(124,111,255,0.08)", color: "#7C6FFF", bio: "Previously: Research Scientist, Google DeepMind. Oxford DPhil." },
  { name: "Luis Torres",  role: "Head of GTM",         initials: "LT", bg: "rgba(245,157,74,0.08)",  color: "#F59D4A", bio: "Previously: Enterprise Sales, Databricks. UT Austin MBA." },
];

function Team() {
  return (
    <section
      className="relative overflow-hidden border-b"
      style={{ background: "#080909", borderColor: "rgba(255,255,255,0.06)", paddingTop: 100, paddingBottom: 100 }}
    >
      <div className="relative z-10 max-w-[1200px] mx-auto px-8">
        {/* Heading */}
        <motion.div {...fadeUp(0)} className="mb-14">
          <span className="text-[11px] uppercase tracking-widest block mb-6" style={{ color: "#94979E" }}>
            The team
          </span>
          <h2
            style={{
              fontSize: "clamp(26px, 3vw, 44px)",
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: "-0.04em",
              color: "#6B7280",
              maxWidth: 600,
            }}
          >
            <span style={{ color: "#F9FAFA" }}>Small team, massive ambition.</span>{" "}
            Twelve people building the inference standard.
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {TEAM.map((person, i) => (
            <motion.div
              key={person.name}
              {...fadeUp(i * 0.06)}
              className="rounded-2xl p-6 transition-colors"
              style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.07)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
            >
              {/* Avatar */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-[15px] font-semibold mb-5"
                style={{ background: person.bg, color: person.color }}
              >
                {person.initials}
              </div>

              <div style={{ fontSize: 16, fontWeight: 500, color: "#F9FAFA", marginBottom: 4 }}>
                {person.name}
              </div>
              <div style={{ fontSize: 12, color: person.color, marginBottom: 14 }}>
                {person.role}
              </div>
              <p style={{ fontSize: 13, color: "#94979E", lineHeight: 1.65 }}>
                {person.bio}
              </p>
            </motion.div>
          ))}
        </div>

        {/* "We're hiring" note */}
        <motion.div
          {...fadeUp(0.3)}
          className="mt-8 rounded-2xl px-8 py-6 flex items-center justify-between"
          style={{ background: "rgba(52,213,154,0.06)", border: "1px solid rgba(52,213,154,0.2)" }}
        >
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "#F9FAFA", marginBottom: 4 }}>
              We&apos;re hiring
            </div>
            <p style={{ fontSize: 13, color: "#94979E" }}>
              Join a small team doing outsized work. Remote-first, competitive equity.
            </p>
          </div>
          <a
            href="#"
            className="shrink-0 inline-flex items-center px-6 h-10 rounded-full text-[14px] font-medium transition-colors"
            style={{ background: "#34D59A", color: "#0C0D0D" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#2bc589")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#34D59A")}
          >
            See open roles →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION 6 — VALUES (mint bg — matches backed-by)
══════════════════════════════════════════════════════════ */
const VALUES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L12.4 7.5H18L13.3 11 15.2 17 10 13.5 4.8 17 6.7 11 2 7.5H7.6L10 2Z" stroke="#2C6D4C" strokeWidth={1.5} strokeLinejoin="round" fill="none" />
      </svg>
    ),
    title: "Speed as a virtue",
    body: "Latency is not a metric — it's a product decision. We build for the teams where every millisecond changes what's possible in a user interaction.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="#2C6D4C" strokeWidth={1.5} />
        <path d="M6 10h8M10 6v8" stroke="#2C6D4C" strokeWidth={1.5} strokeLinecap="round" />
      </svg>
    ),
    title: "Radical transparency",
    body: "Every request is traced. Every cost is visible. Every outage is post-mortemed in public. We hold ourselves to the same observability standards we build for our customers.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="6" height="6" rx="1.5" stroke="#2C6D4C" strokeWidth={1.5} />
        <rect x="11" y="3" width="6" height="6" rx="1.5" stroke="#2C6D4C" strokeWidth={1.5} />
        <rect x="3" y="11" width="6" height="6" rx="1.5" stroke="#2C6D4C" strokeWidth={1.5} />
        <rect x="11" y="11" width="6" height="6" rx="1.5" stroke="#2C6D4C" strokeWidth={1.5} />
      </svg>
    ),
    title: "Composability over lock-in",
    body: "We believe in open standards, open models, and open APIs. Our platform is designed to be a layer in your stack — not a walled garden you can never leave.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 16V8M8 16V4M12 16V9M16 16V6" stroke="#2C6D4C" strokeWidth={1.5} strokeLinecap="round" />
      </svg>
    ),
    title: "Operator-free by default",
    body: "No ML ops team should be required to run production AI. We automate scaling, routing, failover, and tuning so engineers can focus on models, not machines.",
  },
];

function Values() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#E4F1EB" }}>
      {/* Dot grid — matches backed-by */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(44,74,62,0.12) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-8 py-24">
        <motion.div {...fadeUp(0)} className="mb-14">
          <div className="flex items-center gap-2 mb-6">
            <DiamondIcon />
            <span
              className="text-[10px] uppercase tracking-[0.2em]"
              style={{ color: "#2C6D4C", fontFamily: "var(--font-mono), monospace" }}
            >
              Our values
            </span>
          </div>
          <h2
            style={{
              fontSize: "clamp(26px, 3vw, 44px)",
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: "-0.04em",
              color: "#111215",
              maxWidth: 500,
            }}
          >
            Four principles we don&apos;t compromise on.
          </h2>
        </motion.div>

        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              {...fadeUp(i * 0.07)}
              className="rounded-2xl p-8"
              style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(44,74,62,0.12)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(44,74,62,0.1)" }}
              >
                {v.icon}
              </div>
              <h3
                style={{ fontSize: 18, fontWeight: 500, color: "#111215", marginBottom: 10, letterSpacing: "-0.02em" }}
              >
                {v.title}
              </h3>
              <p style={{ fontSize: 14, color: "#4B7860", lineHeight: 1.75 }}>
                {v.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION 7 — INVESTORS (dark, matches backed-by right panel)
══════════════════════════════════════════════════════════ */
function Investors() {
  const investors = [
    { name: "Y Combinator", desc: "Lead, W2024", prominent: true },
    { name: "Andreessen Horowitz", desc: "Series A lead" },
    { name: "Index Ventures", desc: "Series A" },
    { name: "Elad Gil", desc: "Angel" },
    { name: "Nat Friedman", desc: "Angel" },
    { name: "Andrej Karpathy", desc: "Advisor" },
  ];

  return (
    <section
      className="relative overflow-hidden border-b border-t"
      style={{ background: "#0C0D0D", borderColor: "rgba(255,255,255,0.06)", paddingTop: 100, paddingBottom: 100 }}
    >
      <SectionGlow variant="dual" />
      <div className="relative z-10 max-w-[1200px] mx-auto px-8">
        <div className="grid gap-20" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {/* Left */}
          <motion.div {...fadeUp(0)}>
            <DotIcon />
            <h2
              style={{
                fontSize: "clamp(24px, 2.8vw, 40px)",
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: "-0.04em",
                color: "#6B7280",
                marginBottom: 20,
              }}
            >
              <span style={{ color: "#F9FAFA" }}>Backed by the best.</span>{" "}
              Investors who understand what building at the frontier takes.
            </h2>
            <p style={{ fontSize: 15, color: "#94979E", lineHeight: 1.75, maxWidth: 420 }}>
              We raised from people who have built foundational infrastructure before — not just funded it.
              Every check came with a conviction in open, fast, operator-free AI.
            </p>
          </motion.div>

          {/* Right — investor grid */}
          <motion.div {...fadeUp(0.1)}>
            <div className="space-y-3">
              {investors.map((inv, i) => (
                <motion.div
                  key={inv.name}
                  {...fadeUp(0.05 * i)}
                  className="flex items-center gap-4 px-5 py-4 rounded-xl"
                  style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  {/* Logo placeholder */}
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[11px] font-semibold"
                    style={{
                      background: inv.prominent ? "rgba(245,157,74,0.15)" : "rgba(255,255,255,0.05)",
                      color: inv.prominent ? "#F59D4A" : "#94979E",
                      border: inv.prominent ? "1px solid rgba(245,157,74,0.3)" : "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    {inv.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div style={{ fontSize: 14, color: "#F9FAFA", fontWeight: 500 }}>{inv.name}</div>
                  </div>
                  <div
                    className="px-2 py-0.5 rounded text-[11px]"
                    style={{
                      background: inv.prominent ? "rgba(245,157,74,0.1)" : "rgba(255,255,255,0.04)",
                      color: inv.prominent ? "#F59D4A" : "#94979E",
                      border: `1px solid ${inv.prominent ? "rgba(245,157,74,0.25)" : "rgba(255,255,255,0.06)"}`,
                    }}
                  >
                    {inv.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION 8 — PRESS / RECOGNITION
══════════════════════════════════════════════════════════ */
function Press() {
  const quotes = [
    { publication: "TechCrunch", excerpt: "\"The inference layer that every AI team has been waiting for.\"" },
    { publication: "The Information", excerpt: "\"Synapse is quietly becoming the infrastructure layer under the AI economy.\"" },
    { publication: "Forbes AI 50", excerpt: "\"One of the most impactful infrastructure companies to emerge from YC in years.\"" },
  ];

  return (
    <section
      className="border-b"
      style={{ background: "#080909", borderColor: "rgba(255,255,255,0.06)", paddingTop: 80, paddingBottom: 80 }}
    >
      <div className="max-w-[1200px] mx-auto px-8">
        <motion.div {...fadeUp(0)} className="flex items-center gap-2 mb-10">
          <DiamondIcon color="#94979E" />
          <span className="text-[11px] uppercase tracking-widest" style={{ color: "#94979E" }}>
            In the press
          </span>
        </motion.div>
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {quotes.map((q, i) => (
            <motion.div
              key={q.publication}
              {...fadeUp(i * 0.08)}
              className="rounded-2xl p-7"
              style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div
                className="text-[11px] uppercase tracking-widest mb-5 font-medium"
                style={{ color: "#94979E", fontFamily: "var(--font-mono), monospace" }}
              >
                {q.publication}
              </div>
              <p style={{ fontSize: 15, color: "rgba(249,250,250,0.7)", lineHeight: 1.65, fontStyle: "italic" }}>
                {q.excerpt}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION 9 — BOTTOM CTA
══════════════════════════════════════════════════════════ */
function BottomCTA() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#0C0D0D", paddingTop: 120, paddingBottom: 120 }}
    >
      <SectionGlow variant="center" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(52,213,154,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[640px] mx-auto px-8 text-center">
        <motion.div {...fadeUp(0)} className="flex items-center justify-center gap-2 mb-8">
          <DiamondIcon />
          <span className="text-[11px] uppercase tracking-widest" style={{ color: "#94979E", fontFamily: "var(--font-mono), monospace" }}>
            Join the team
          </span>
        </motion.div>
        <motion.h2
          {...fadeUp(0.07)}
          style={{
            fontSize: "clamp(28px, 4vw, 50px)",
            fontWeight: 400,
            letterSpacing: "-0.04em",
            color: "#F9FAFA",
            lineHeight: 1.12,
            marginBottom: 20,
          }}
        >
          Help us build the inference standard.
        </motion.h2>
        <motion.p
          {...fadeUp(0.13)}
          style={{ fontSize: 16, color: "#94979E", lineHeight: 1.7, marginBottom: 40 }}
        >
          We&apos;re a small team with a clear mission. If you care deeply about performance, developer experience, and making powerful AI accessible — we should talk.
        </motion.p>
        <motion.div {...fadeUp(0.18)} className="flex items-center justify-center gap-3">
          <a
            href="#"
            className="inline-flex items-center px-8 h-12 rounded-full text-[15px] font-medium transition-colors"
            style={{ background: "#34D59A", color: "#0C0D0D" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#2bc589")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#34D59A")}
          >
            View open roles
          </a>
          <a
            href="#"
            className="inline-flex items-center px-7 h-12 rounded-full text-[15px] transition-colors"
            style={{ color: "#F9FAFA", border: "1px solid rgba(255,255,255,0.18)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)")}
          >
            Get started free
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main style={{ paddingTop: 80 }}>
        <Hero />
        <Mission />
        <Metrics />
        <Story />
        <Team />
        <Values />
        <Investors />
        <Press />
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
