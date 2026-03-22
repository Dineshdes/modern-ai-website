"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionGlow from "@/components/ui/section-glow";

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

function Chart({ mode }: { mode: "incidents" | "costs" }) {
  const W = 1000, H = 300;
  const MID = 500;
  const FLOOR = H;
  const CAP_LINE = 80; // capacity ceiling

  // Left side: erratic line chart showing load exceeding capacity
  const leftLoad: [number, number][] = [
    [0, 230], [40, 210], [80, 225], [120, 200], [150, 215],
    [180, 195], [210, 200], [240, 210], [260, 205],
    [275, 190], [285, 30], [295, 20], [305, 28], // spike exceeds capacity
    [320, 180], [350, 200], [380, 210], [420, 205], [MID, 210],
  ];

  // Right side: bar chart data (x, height-from-bottom)
  const rightBars = [
    { x: 520, w: 28, h: 130 },
    { x: 558, w: 28, h: 110 },
    { x: 596, w: 28, h: 155 },
    { x: 634, w: 28, h: 125 },
    { x: 672, w: 28, h: 190 },
    { x: 710, w: 28, h: 175 },
    { x: 748, w: 28, h: 165 },
    { x: 786, w: 28, h: 185 },
    { x: 824, w: 28, h: 170 },
    { x: 862, w: 28, h: 160 },
    { x: 900, w: 28, h: 145 },
    { x: 938, w: 28, h: 155 },
  ];

  const lAreaPts = [...leftLoad, [MID, FLOOR], [0, FLOOR]].map(([x,y]) => `${x},${y}`).join(" ");
  const lLinePts = leftLoad.map(([x,y]) => `${x},${y}`).join(" ");
  // Spike area (red fill)
  const spikeArea: [number,number][] = [[265,205],[275,190],[285,30],[295,20],[305,28],[320,180],[330,205]];
  const spikeAreaPts = [...spikeArea, [330,FLOOR],[265,FLOOR]].map(([x,y]) => `${x},${y}`).join(" ");

  // Grid lines
  const gridY = mode === "incidents"
    ? [60, 120, 180, 240]
    : [50, 100, 150, 200, 250];

  return (
    <div className="w-full rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.1)", background: "#fff" }}>

      {/* Chart area */}
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block", maxHeight: 320 }} preserveAspectRatio="xMidYMid meet">
          <defs>
            {/* Dot pattern — left (red) */}
            <pattern id="rdot" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.1" fill="#ef4444" fillOpacity={0.18} />
            </pattern>
            {/* Dot pattern — right (green) */}
            <pattern id="gdot" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.1" fill="#22c55e" fillOpacity={0.2} />
            </pattern>
            {/* Vertical line pattern for bars */}
            <pattern id="vlines" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.25" />
            </pattern>
            {/* Clip left */}
            <clipPath id="clipL">
              <rect x={0} y={0} width={MID} height={H} />
            </clipPath>
            {/* Clip right */}
            <clipPath id="clipR">
              <rect x={MID} y={0} width={W - MID} height={H} />
            </clipPath>
          </defs>

          {/* Backgrounds */}
          <rect x={0} y={0} width={MID} height={H} fill="#fff9f9" />
          <rect x={MID} y={0} width={W - MID} height={H} fill="#f0fdf4" />

          {/* Grid lines */}
          {gridY.map((y) => (
            <line key={y} x1={0} y1={y} x2={W} y2={y} stroke="rgba(0,0,0,0.05)" strokeWidth={1} />
          ))}

          {/* Capacity line (left side) */}
          <line x1={0} y1={CAP_LINE} x2={MID} y2={CAP_LINE} stroke="#d1d5db" strokeWidth={1} strokeDasharray="6 4" />

          {/* Left: load area fill */}
          <polyline points={lAreaPts} fill="#fecaca" fillOpacity={0.4} stroke="none" clipPath="url(#clipL)" />
          {/* Left: dot overlay */}
          <rect x={0} y={0} width={MID} height={H} fill="url(#rdot)" />
          {/* Left: spike fill (brighter red) */}
          <polyline points={spikeAreaPts} fill="#ef4444" fillOpacity={0.55} stroke="none" />
          {/* Left: load line */}
          <polyline points={lLinePts} fill="none" stroke="#ef4444" strokeWidth={2} clipPath="url(#clipL)" />

          {/* Right: bars */}
          {rightBars.map((bar, i) => (
            <g key={i}>
              {/* Bar fill */}
              <rect
                x={bar.x}
                y={H - bar.h}
                width={bar.w}
                height={bar.h}
                fill="#22c55e"
                fillOpacity={0.7}
                rx={2}
              />
              {/* Bar lines overlay */}
              <rect
                x={bar.x}
                y={H - bar.h}
                width={bar.w}
                height={bar.h}
                fill="url(#vlines)"
                rx={2}
              />
            </g>
          ))}
          {/* Right: dot overlay */}
          <rect x={MID} y={0} width={W - MID} height={H} fill="url(#gdot)" />

          {/* Center divider */}
          <line x1={MID} y1={0} x2={MID} y2={H} stroke="#9ca3af" strokeWidth={1} strokeDasharray="5 4" />

          {/* Section labels inside chart */}
          <text x={20} y={H - 12} fontSize={11} fill="#9ca3af" fontFamily="monospace">Without Synapse</text>
          <text x={MID + 16} y={H - 12} fontSize={11} fill="#9ca3af" fontFamily="monospace">With Synapse</text>

          {/* Spike annotation line */}
          <line x1={292} y1={20} x2={292} y2={70} stroke="#ef4444" strokeWidth={1} strokeOpacity={0.6} />

          {/* Tooltip LEFT — Resource limit reached */}
          <g transform="translate(305, 38)">
            <rect x={0} y={0} width={186} height={62} rx={6} fill="white" stroke="rgba(0,0,0,0.1)" strokeWidth={1} />
            {/* warning icon */}
            <polygon points="10,42 18,28 26,42" fill="#fef3c7" stroke="#f59e0b" strokeWidth={1} />
            <text x={19} y={39} fontSize={7.5} fill="#92400e" textAnchor="middle" fontFamily="monospace">!</text>
            <text x={32} y={37} fontSize={9} fill="#111" fontFamily="monospace" fontWeight="600">Resource limit reached</text>
            <text x={12} y={50} fontSize={8.5} fill="#6b7280" fontFamily="monospace">Current load:</text>
            <text x={155} y={50} fontSize={8.5} fill="#ef4444" fontFamily="monospace" textAnchor="end">120%</text>
            <text x={12} y={60} fontSize={8.5} fill="#6b7280" fontFamily="monospace">Status:</text>
            <text x={155} y={60} fontSize={8.5} fill="#6b7280" fontFamily="monospace" textAnchor="end">Degraded performance</text>
          </g>

          {/* Tooltip RIGHT — Autoscaling active */}
          <g transform="translate(726, 38)">
            <rect x={0} y={0} width={186} height={62} rx={6} fill="white" stroke="rgba(0,0,0,0.1)" strokeWidth={1} />
            {/* green dot */}
            <circle cx={15} cy={37} r={5} fill="#22c55e" />
            <text x={25} y={40} fontSize={9} fill="#111" fontFamily="monospace" fontWeight="600">Autoscaling active</text>
            <text x={12} y={50} fontSize={8.5} fill="#6b7280" fontFamily="monospace">Resources adjusted:</text>
            <text x={174} y={50} fontSize={8.5} fill="#111" fontFamily="monospace" textAnchor="end">+4 CU</text>
            <text x={12} y={60} fontSize={8.5} fill="#6b7280" fontFamily="monospace">Status:</text>
            <text x={174} y={60} fontSize={8.5} fill="#22c55e" fontFamily="monospace" textAnchor="end">Operational</text>
          </g>
        </svg>
      </div>

      {/* Stats bar */}
      <div className="px-6 py-3 flex items-center gap-3" style={{ background: "#0f172a" }}>
        <span className="text-sm font-semibold" style={{ color: "#34D59A", fontFamily: "var(--font-mono), monospace", letterSpacing: "0.04em" }}>54,210</span>
        <span className="text-[10px] uppercase tracking-[0.14em]" style={{ color: "#64748b", fontFamily: "var(--font-mono), monospace" }}>
          performance degradations prevented by autoscaling every day
        </span>
      </div>

      {/* Legend + description row */}
      <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-t" style={{ borderColor: "rgba(0,0,0,0.06)", background: "#fff" }}>
        <div className="flex items-center gap-6 flex-wrap">
          {[
            { c: "#22c55e", label: "Synapse autoscaling", solid: true },
            { c: "#9ca3af", label: "Workload load", solid: false },
            { c: "#d1d5db", label: "Fixed-resource provisioned", solid: false },
          ].map(({ c, label, solid }) => (
            <div key={label} className="flex items-center gap-2">
              <div style={{
                width: 14,
                height: 14,
                borderRadius: 3,
                background: solid ? c : "transparent",
                border: `2px solid ${c}`,
                position: "relative",
                overflow: "hidden",
              }}>
                {!solid && (
                  <svg width="14" height="14" viewBox="0 0 14 14" style={{ position: "absolute", inset: 0 }}>
                    <line x1="0" y1="0" x2="14" y2="14" stroke={c} strokeWidth="2" />
                    <line x1="4" y1="0" x2="14" y2="10" stroke={c} strokeWidth="2" />
                    <line x1="0" y1="4" x2="10" y2="14" stroke={c} strokeWidth="2" />
                  </svg>
                )}
              </div>
              <span className="text-[13px]" style={{ color: "#4b5563" }}>{label}</span>
            </div>
          ))}
        </div>
        <p className="text-[13px] leading-relaxed max-w-xs text-right" style={{ color: "#6b7280" }}>
          By separating compute and inference layers, Synapse automatically scales GPU, memory and capacity to fit your workload&apos;s demands.
        </p>
      </div>
    </div>
  );
}

export default function AutoscalingSection() {
  const [mode, setMode] = useState<"incidents"|"costs">("incidents");

  return (
    <section
      id="autoscaling"
      className="relative py-36 overflow-hidden border-b"
      style={{ background: "#E4F1EB", borderColor: "rgba(0,0,0,0.06)" }}
    >
      <SectionGlow variant="corner" color="44, 109, 76" />
      <div className="relative max-w-[1400px] mx-auto px-8 lg:pl-[260px]">
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
          <div className="flex overflow-hidden rounded-lg" style={{ border: "1px solid rgba(0,0,0,0.14)" }}>
            {(["incidents","costs"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="px-5 py-2.5 text-[13px] transition-colors"
                style={{
                  background: mode === m ? "#fff" : "transparent",
                  color: mode === m ? "#111215" : "#6b7280",
                  fontWeight: mode === m ? 500 : 400,
                  borderRight: m === "incidents" ? "1px solid rgba(0,0,0,0.14)" : "none",
                }}
              >
                {m === "incidents" ? "Avoid incidents" : "Save costs"}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.14 }} className="mt-10">
          <Chart mode={mode} />
        </motion.div>
      </div>
    </section>
  );
}
