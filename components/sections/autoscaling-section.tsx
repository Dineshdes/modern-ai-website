"use client";

import { useState } from "react";
import { motion } from "framer-motion";

function DotIcon({ dark = true }: { dark?: boolean }) {
  const fill = dark ? "#2C4A3E" : "#94979E";
  return (
    <svg width="40" height="32" viewBox="0 0 40 32" fill="none" className="mb-10">
      {[5,4,3,2,1].map((cols, row) =>
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

function Chart() {
  const W = 900, H = 240;
  const leftPts: [number,number][] = [
    [0,200],[50,185],[110,170],[160,178],[200,155],[240,143],
    [265,130],[285,52],[305,44],[325,138],[370,175],[450,172],
  ];
  const rightPts: [number,number][] = [
    [450,112],[490,106],[540,118],[590,100],[640,94],
    [690,108],[740,90],[790,100],[840,95],[900,98],
  ];
  const lFill = [...leftPts,[450,H],[0,H]].map(([x,y])=>`${x},${y}`).join(" ");
  const lLine = leftPts.map(([x,y])=>`${x},${y}`).join(" ");
  const rFill = [...rightPts,[900,H],[450,H]].map(([x,y])=>`${x},${y}`).join(" ");
  const rLine = rightPts.map(([x,y])=>`${x},${y}`).join(" ");

  return (
    <div className="w-full rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.08)", background: "#EFF7F3" }}>
      {/* Labels */}
      <div className="grid grid-cols-2 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
        <div className="px-6 py-3 border-r text-[11px]" style={{ borderColor: "rgba(0,0,0,0.06)", color: "#6b7280", fontFamily: "var(--font-mono), monospace" }}>Without Synapse</div>
        <div className="px-6 py-3 text-[11px]" style={{ color: "#6b7280", fontFamily: "var(--font-mono), monospace" }}>With Synapse</div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: 240, display: "block" }}>
        <defs>
          <pattern id="rdp" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#fca5a5" fillOpacity={0.55} />
          </pattern>
          <pattern id="gdp" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#39A57D" fillOpacity={0.25} />
          </pattern>
        </defs>
        <rect x={0} y={0} width={450} height={H} fill="#fff8f8" />
        <rect x={450} y={0} width={450} height={H} fill="#f0fdf6" />
        {[50,100,150,200].map((y)=>(
          <line key={y} x1={0} y1={y} x2={W} y2={y} stroke="rgba(0,0,0,0.04)" strokeWidth={1} />
        ))}
        <line x1={450} y1={0} x2={450} y2={H} stroke="#d1d5db" strokeWidth={1} strokeDasharray="4 3" />
        <polyline points={lFill} fill="#fca5a5" fillOpacity={0.38} stroke="none" />
        <polyline points={lLine} fill="none" stroke="#ef4444" strokeWidth={1.5} />
        <rect x={0} y={0} width={450} height={H} fill="url(#rdp)" />
        <polyline points={rFill} fill="#34D59A" fillOpacity={0.18} stroke="none" />
        <polyline points={rLine} fill="none" stroke="#39A57D" strokeWidth={1.5} />
        <rect x={450} y={0} width={450} height={H} fill="url(#gdp)" />
      </svg>

      {/* Stats bar */}
      <div className="px-6 py-3 flex items-center gap-3" style={{ background: "#131415" }}>
        <span className="text-sm font-semibold" style={{ color: "#34D59A", fontFamily: "var(--font-mono), monospace" }}>54,210</span>
        <span className="text-[10px] uppercase tracking-widest" style={{ color: "#94979E", fontFamily: "var(--font-mono), monospace" }}>
          performance degradations prevented by autoscaling every day
        </span>
      </div>

      {/* Legend */}
      <div className="px-6 py-3 flex items-center gap-8 border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
        {[
          { c: "#39A57D", label: "Synapse autoscaling" },
          { c: "#9ca3af", label: "Workload load" },
          { c: "#d1d5db", label: "Fixed-resource provisioned" },
        ].map(({ c, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div style={{ width: 12, height: 12, borderRadius: 2, background: c, border: "1px solid rgba(0,0,0,0.1)" }} />
            <span className="text-xs" style={{ color: "#6b7280" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AutoscalingSection() {
  const [mode, setMode] = useState<"incidents"|"costs">("incidents");

  return (
    <section
      id="autoscaling"
      className="relative py-28 overflow-hidden border-b"
      style={{ background: "#E4F1EB", borderColor: "rgba(0,0,0,0.06)" }}
    >
      <div className="max-w-[1400px] mx-auto px-8 lg:pl-[260px]">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <DotIcon dark />
          <h2
            style={{
              fontSize: "clamp(28px, 3.2vw, 48px)",
              fontWeight: 400,
              lineHeight: 1.125,
              letterSpacing: "-0.04em",
              color: "#4D5560",
              textIndent: "96px",
            }}
          >
            <span style={{ color: "#111215" }}>Advanced autoscaling.</span>{" "}
            Keep scaling without worrying about capacity. Never overpay for resources you don&apos;t use.
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }} className="mt-10 flex">
          <div className="flex overflow-hidden rounded" style={{ border: "1px solid rgba(0,0,0,0.14)" }}>
            {(["incidents","costs"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="px-5 py-2 text-[13px] transition-colors"
                style={{ background: mode === m ? "#fff" : "transparent", color: mode === m ? "#111215" : "#6b7280", fontWeight: mode === m ? 500 : 400 }}
              >
                {m === "incidents" ? "Avoid incidents" : "Save costs"}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.14 }} className="mt-10">
          <Chart />
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-8 text-[15px] leading-relaxed max-w-lg" style={{ color: "#6b7280" }}>
          By separating compute and inference layers, Synapse automatically scales GPU, memory and capacity to fit your workload&apos;s demands.
        </motion.p>
      </div>
    </section>
  );
}
