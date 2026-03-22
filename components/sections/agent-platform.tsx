"use client";

import { motion } from "framer-motion";

function FleetHeatmap({ day, active, idle }: { day: string; active: number; idle: number }) {
  const hours = Array.from({ length: 16 }, (_, i) => i + 8); // 8:00 to 23:00
  const totalCells = 16 * 4;
  const activeCells = Math.floor((active / (active + idle)) * totalCells);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono text-[#797D86]">{day}</span>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-[#00E599]">Active: {active.toLocaleString()}</span>
          <span className="text-[#797D86]">Idle: {idle.toLocaleString()}</span>
        </div>
      </div>
      {/* Heatmap grid */}
      <div className="grid gap-[2px]" style={{ gridTemplateColumns: `repeat(${hours.length * 4}, 1fr)` }}>
        {Array.from({ length: totalCells }, (_, i) => (
          <div
            key={i}
            className="rounded-[1px]"
            style={{
              height: 8,
              background: i < activeCells
                ? `rgba(0, 229, 153, ${0.3 + (i / activeCells) * 0.7})`
                : "rgba(255,255,255,0.04)",
            }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-1">
        {[8, 12, 16, 20, 23].map((h) => (
          <span key={h} className="text-[9px] font-mono text-[#797D86]">{h}:00</span>
        ))}
      </div>
    </div>
  );
}

export default function AgentPlatform() {
  return (
    <section className="bg-black overflow-hidden">
      {/* Terminal status bar */}
      <div className="border-y border-white/[0.06] px-6 py-2.5 flex items-center gap-8 text-[10px] font-mono text-[#797D86]">
        <div className="flex items-center gap-2 max-w-[1400px] mx-auto w-full">
          <span className="size-2 rounded-sm bg-[#797D86]" />
          <span>SYSTEM: SYNAPSE AI PLATFORM</span>
          <span className="ml-6 flex gap-1">
            {Array.from({ length: 20 }, (_, i) => (
              <span key={i} className="opacity-40">|</span>
            ))}
          </span>
          <span className="ml-4">[ STATUS: ONLINE ]</span>
          <span className="flex gap-1 ml-2">
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} className="opacity-30">|</span>
            ))}
          </span>
          <span className="ml-4">[ CONNECTION: STABLE ]</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-24">
        {/* Top section: label + H2 + CTA */}
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="flex items-center gap-2 mb-6"
          >
            <span style={{ color: "#ef4444", fontSize: 9 }}>▶</span>
            <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#797D86]">
              AGENT PLATFORM
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="font-normal text-white"
            style={{ fontSize: "clamp(48px,6vw,80px)", lineHeight: 1.05, letterSpacing: "-3.2px" }}
          >
            Speed and scale for agents. And devs.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="text-[#797D86] text-lg mt-6 leading-relaxed"
          >
            Codegen and agent platforms rely on Synapse to run the backend for user-generated AI apps.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.18 }}
            href="#"
            className="mt-8 inline-flex items-center bg-white text-black font-medium px-6 h-11 rounded-full text-[15px] hover:bg-white/90 transition-colors"
          >
            I&apos;m building an agent
          </motion.a>
        </div>

        {/* Two-col layout: left steps + right fleet */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.24 }}
          className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
        >
          {/* Left: numbered steps */}
          <div className="space-y-6">
            {/* Step 01 */}
            <div className="flex items-start gap-5">
              <div className="shrink-0">
                <span className="text-[13px] font-mono text-[#797D86]">01</span>
                <div className="w-px h-full bg-white/[0.06] ml-2 mt-2" style={{ minHeight: 40 }} />
              </div>
              <div className="flex-1">
                <p className="text-[15px] text-white/70 mb-3">
                  Send API call and receive connection string in{" "}
                  <span className="text-[#00E599]">120ms</span>
                </p>
                <div
                  className="rounded-xl border border-white/[0.07] p-4 font-mono text-sm"
                  style={{ background: "#0d1117" }}
                >
                  <div
                    className="rounded-md px-3 py-2 text-[12px] flex items-center gap-2"
                    style={{ background: "#161b22" }}
                  >
                    <span className="size-2 rounded-full bg-[#00E599]" />
                    <span className="text-white/50">curl -X POST</span>
                    <span className="text-[#00E599]">https://api.synapse.tech/v2/projects/:id/endpoint</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 02 */}
            <div className="flex items-start gap-5">
              <span className="text-[13px] font-mono text-[#797D86] shrink-0">02</span>
              <div className="flex-1">
                <p className="text-[15px] text-white/70 mb-3">
                  Test and deploy <span className="text-[#797D86]">{">>"}</span>
                </p>
                <div
                  className="rounded-xl border border-white/[0.07] p-4 font-mono text-[11px] text-[#797D86]"
                  style={{ background: "#0d1117", minHeight: 80 }}
                >
                  <div className="text-white/40">$ curl -X POST .../completions \</div>
                  <div className="text-white/30 pl-4">-H "Authorization: Bearer $API_KEY" \</div>
                  <div className="text-white/30 pl-4">{'-d \'{"model":"llama-3.1-70b","messages":[...]}\''}</div>
                  <div className="text-[#00E599] mt-2">▪ Run Query</div>
                </div>
              </div>
            </div>

            {/* Right description */}
            <div className="mt-8 pt-8 border-t border-white/[0.06]">
              <p className="text-lg text-white/80 leading-snug">
                Manage your fleet via API.{" "}
                <span className="text-[#797D86]">
                  Synapse endpoints spin up in milliseconds, with APIs for quota controls and fleet scaling.
                </span>
              </p>
              <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm text-white/60 hover:text-white transition-colors">
                Learn more <span>→</span>
              </a>
            </div>
          </div>

          {/* Right: Fleet dashboard */}
          <div
            className="rounded-2xl border border-white/[0.07] overflow-hidden"
            style={{ background: "#0a0a0a" }}
          >
            {/* Header */}
            <div className="border-b border-white/[0.06] px-5 py-4">
              <div className="font-mono text-sm text-white/70">
                Endpoints deployed:{" "}
                <span className="text-[#797D86]">0</span>
              </div>
            </div>

            <div className="p-5">
              <FleetHeatmap day="Friday" active={0} idle={0} />
              <FleetHeatmap day="Saturday" active={7589} idle={12957} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
