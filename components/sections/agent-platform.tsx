"use client";

import { motion } from "framer-motion";
import SectionGlow from "@/components/ui/section-glow";

function Heatmap({ day, active, idle }: { day: string; active: number; idle: number }) {
  const total = active + idle;
  const ratio = total > 0 ? active / total : 0;
  const COLS = 20, ROWS = 4;
  const totalCells = COLS * ROWS;
  const activeCells = Math.round(ratio * totalCells);

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs" style={{ color: "#94979E", fontFamily: "var(--font-mono), monospace" }}>{day}</span>
        <div className="flex items-center gap-4 text-xs" style={{ fontFamily: "var(--font-mono), monospace" }}>
          <span style={{ color: "#34D59A" }}>Active: {active.toLocaleString()}</span>
          <span style={{ color: "#94979E" }}>Idle: {idle.toLocaleString()}</span>
        </div>
      </div>
      <div className="grid gap-[2px]" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
        {Array.from({ length: ROWS }, (_, row) =>
          Array.from({ length: COLS }, (_, col) => {
            const idx = row * COLS + col;
            const isActive = idx < activeCells;
            return (
              <div
                key={`${row}-${col}`}
                style={{
                  height: 8,
                  borderRadius: 1,
                  background: isActive
                    ? `rgba(52, 213, 154, ${0.25 + (idx / activeCells) * 0.75})`
                    : "rgba(255,255,255,0.04)",
                }}
              />
            );
          })
        )}
      </div>
      <div className="flex justify-between mt-1" style={{ fontFamily: "var(--font-mono), monospace", fontSize: 9, color: "#94979E" }}>
        {[8, 11, 14, 17, 20, 23].map((h) => (
          <span key={h}>{h}:00</span>
        ))}
      </div>
    </div>
  );
}

export default function AgentPlatform() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#0C0D0D" }}>
      <SectionGlow variant="dual" opacity={0.05} />
      {/* Terminal status bar */}
      <div
        className="border-y px-8 py-2.5"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div
          className="max-w-[1400px] mx-auto flex items-center gap-3"
          style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, color: "#94979E" }}
        >
          <span className="w-3 h-3 flex items-center justify-center rounded-sm" style={{ background: "#94979E" }}>
            <span className="w-2 h-2 rounded-sm" style={{ background: "#0C0D0D" }} />
          </span>
          <span>SYSTEM: SYNAPSE AI PLATFORM</span>
          <span className="flex items-center gap-[2px] ml-4" style={{ opacity: 0.35 }}>
            {Array.from({ length: 22 }, (_, i) => <span key={i}>|</span>)}
          </span>
          <span className="ml-2">[ STATUS: ONLINE ]</span>
          <span className="flex items-center gap-[2px] ml-2" style={{ opacity: 0.25 }}>
            {Array.from({ length: 8 }, (_, i) => <span key={i}>|</span>)}
          </span>
          <span className="ml-2">[ CONNECTION: STABLE ]</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-44">
        {/* Top label + H2 */}
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex items-center gap-2 mb-6">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 5L5 1L9 5L5 9L1 5Z" fill="#ef4444" />
            </svg>
            <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: "#94979E", fontFamily: "var(--font-mono), monospace" }}>
              AGENT PLATFORM
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.06 }}
            style={{ fontSize: "clamp(44px, 6vw, 82px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.04em", color: "#F9FAFA" }}
          >
            Speed and scale for agents. And devs.
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.12 }} className="mt-6 text-[17px] leading-relaxed max-w-xl" style={{ color: "#94979E" }}>
            Codegen and agent platforms rely on Synapse to run the backend for user-generated AI apps.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
            href="#"
            className="mt-8 inline-flex items-center px-6 h-11 rounded-full text-[15px] font-medium transition-colors"
            style={{ background: "#F9FAFA", color: "#0C0D0D" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e5e7eb")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#F9FAFA")}
          >
            I&apos;m building an agent
          </motion.a>
        </div>

        {/* Two-col: steps + fleet */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
        >
          {/* Left: numbered steps */}
          <div>
            <div className="flex items-start gap-5 mb-8">
              <div className="shrink-0 pt-0.5">
                <span className="text-[13px]" style={{ color: "#94979E", fontFamily: "var(--font-mono), monospace" }}>01</span>
              </div>
              <div className="flex-1">
                <p className="text-[15px] mb-3" style={{ color: "rgba(249,250,250,0.7)" }}>
                  Send API call and receive connection string in{" "}
                  <span style={{ color: "#34D59A" }}>120ms</span>
                </p>
                <div className="rounded-xl p-4" style={{ background: "#131415", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-mono), monospace", fontSize: 12 }}>
                  <div className="rounded-md px-3 py-2.5 flex items-center gap-2" style={{ background: "#1a1b1e" }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#34D59A", display: "inline-block", flexShrink: 0 }} />
                    <span style={{ color: "rgba(249,250,250,0.45)" }}>curl -X POST </span>
                    <span style={{ color: "#34D59A" }}>https://api.synapse.tech/v2/projects/:id/endpoint</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-5 mb-12">
              <div className="shrink-0 pt-0.5">
                <span className="text-[13px]" style={{ color: "#94979E", fontFamily: "var(--font-mono), monospace" }}>02</span>
              </div>
              <div className="flex-1">
                <p className="text-[15px] mb-3" style={{ color: "rgba(249,250,250,0.7)" }}>
                  Test and deploy <span style={{ color: "#94979E" }}>&gt;&gt;</span>
                </p>
                <div className="rounded-xl p-4" style={{ background: "#131415", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "#94979E", minHeight: 88 }}>
                  <div>$ curl -X POST .../completions \</div>
                  <div className="pl-4 opacity-70">-H &quot;Authorization: Bearer $KEY&quot; \</div>
                  <div className="pl-4 opacity-70">-d &apos;&#123;&quot;model&quot;:&quot;llama-3.1-70b&quot;, ...&#125;&apos;</div>
                  <div className="mt-2" style={{ color: "#34D59A" }}>▪ Run Query</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border-t pt-8" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <p className="text-[17px] leading-snug" style={{ color: "rgba(249,250,250,0.8)" }}>
                Manage your fleet via API.{" "}
                <span style={{ color: "#94979E" }}>
                  Synapse endpoints spin up in milliseconds, with APIs for quota controls and fleet scaling.
                </span>
              </p>
              <a href="#" className="mt-4 inline-flex items-center gap-1.5 text-sm transition-colors" style={{ color: "rgba(249,250,250,0.5)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F9FAFA")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(249,250,250,0.5)")}
              >
                Learn more <span>→</span>
              </a>
            </div>
          </div>

          {/* Right: fleet dashboard */}
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)", background: "#0d0e0f" }}>
            <div className="border-b px-5 py-4" style={{ borderColor: "rgba(255,255,255,0.06)", fontFamily: "var(--font-mono), monospace", fontSize: 13, color: "rgba(249,250,250,0.65)" }}>
              Endpoints deployed: <span style={{ color: "#94979E" }}>41,092</span>
            </div>
            <div className="p-5">
              <Heatmap day="Friday" active={18390} idle={2156} />
              <Heatmap day="Saturday" active={7589} idle={12957} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
