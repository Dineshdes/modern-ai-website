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
  const W = 1000, H = 300, MID = 500;

  /* ── Left side: erratic load line — spikes above capacity ── */
  const leftPts: [number,number][] = [
    [0,235],[30,215],[55,230],[80,210],[105,222],[130,208],
    [155,218],[180,205],[200,212],[220,216],[245,208],
    [262,195],[272,185],[280,20],[290,14],[300,22], // red spike
    [312,195],[330,210],[360,205],[390,215],[420,208],[450,212],[MID,210],
  ];
  const lAreaPts  = [...leftPts, [MID,H],[0,H]].map(([x,y])=>`${x},${y}`).join(" ");
  const lLinePts  = leftPts.map(([x,y])=>`${x},${y}`).join(" ");

  /* spike polygon only */
  const spikePts: [number,number][] = [
    [258,210],[268,195],[278,185],[280,20],[290,14],[300,22],[312,195],[322,210],
  ];
  const spikeAreaPts = [...spikePts,[322,H],[258,H]].map(([x,y])=>`${x},${y}`).join(" ");

  /* ── Right side: managed area chart — smooth peaks ── */
  const rightPts: [number,number][] = [
    [MID,210],[520,180],[535,120],[550,160],[570,100],[585,145],
    [605,75],[620,120],[640,145],[658,70],[672,110],[688,140],
    [705,60],[720,105],[738,130],[755,55],[770,90],[788,120],
    [808,65],[822,105],[840,85],[858,55],[875,95],[895,120],
    [915,75],[935,100],[960,80],[980,110],[W,135],
  ];
  const rAreaPts = [...rightPts,[W,H],[MID,H]].map(([x,y])=>`${x},${y}`).join(" ");
  const rLinePts = rightPts.map(([x,y])=>`${x},${y}`).join(" ");

  const gridY = [60, 120, 180, 240];

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: 12,
        background: "#fff",
      }}
    >
      {/* SVG chart */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", height: "auto", display: "block" }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="rdot2" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#ef4444" fillOpacity={0.22} />
          </pattern>
          <pattern id="gdot2" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#16a34a" fillOpacity={0.2} />
          </pattern>
          <clipPath id="cL"><rect x={0} y={0} width={MID} height={H} /></clipPath>
          <clipPath id="cR"><rect x={MID} y={0} width={W-MID} height={H} /></clipPath>
        </defs>

        {/* Section backgrounds */}
        <rect x={0}   y={0} width={MID}   height={H} fill="#fff8f8" />
        <rect x={MID} y={0} width={W-MID} height={H} fill="#f0fdf4" />

        {/* Grid */}
        {gridY.map(y => (
          <line key={y} x1={0} y1={y} x2={W} y2={y} stroke="rgba(0,0,0,0.045)" strokeWidth={1} />
        ))}

        {/* Capacity ceiling (left) */}
        <line x1={0} y1={60} x2={MID} y2={60} stroke="#d1d5db" strokeWidth={1} strokeDasharray="5 4" />

        {/* ── LEFT: pink area + dot overlay + spike + line ── */}
        <polyline points={lAreaPts} fill="#fca5a5" fillOpacity={0.35} stroke="none" />
        <rect x={0} y={0} width={MID} height={H} fill="url(#rdot2)" />
        <polyline points={spikeAreaPts} fill="#ef4444" fillOpacity={0.6} stroke="none" />
        <polyline points={lLinePts} fill="none" stroke="#dc2626" strokeWidth={1.5} clipPath="url(#cL)" />

        {/* ── RIGHT: solid green area + dot overlay + line ── */}
        <polyline points={rAreaPts} fill="#22c55e" fillOpacity={0.55} stroke="none" />
        <rect x={MID} y={0} width={W-MID} height={H} fill="url(#gdot2)" />
        <polyline points={rLinePts} fill="none" stroke="#16a34a" strokeWidth={1.5} clipPath="url(#cR)" />

        {/* Divider */}
        <line x1={MID} y1={0} x2={MID} y2={H} stroke="#9ca3af" strokeWidth={1} strokeDasharray="4 4" />

        {/* Labels */}
        <text x={16}      y={H-12} fontSize={11} fill="#9ca3af" fontFamily="monospace">Without Synapse</text>
        <text x={MID+14}  y={H-12} fontSize={11} fill="#9ca3af" fontFamily="monospace">With Synapse</text>

        {/* Spike connector */}
        <line x1={286} y1={14} x2={286} y2={65} stroke="#ef4444" strokeWidth={1} strokeOpacity={0.5} />

        {/* Tooltip LEFT */}
        <g transform="translate(298,30)">
          <rect x={0} y={0} width={192} height={64} rx={5} fill="white" stroke="rgba(0,0,0,0.1)" strokeWidth={1}
            style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.08))" }} />
          <polygon points="10,44 19,29 28,44" fill="#fef9c3" stroke="#fbbf24" strokeWidth={1} />
          <text x={19} y={41} fontSize={7} fill="#78350f" textAnchor="middle" fontWeight="700" fontFamily="monospace">!</text>
          <text x={35} y={40} fontSize={9.5} fill="#111" fontFamily="monospace" fontWeight="600">Resource limit reached</text>
          <text x={14} y={52} fontSize={8.5} fill="#6b7280" fontFamily="monospace">Current load:</text>
          <text x={178} y={52} fontSize={8.5} fill="#dc2626" fontFamily="monospace" textAnchor="end" fontWeight="600">120%</text>
          <text x={14} y={62} fontSize={8.5} fill="#6b7280" fontFamily="monospace">Status:</text>
          <text x={178} y={62} fontSize={8.5} fill="#6b7280" fontFamily="monospace" textAnchor="end">Degraded performance</text>
        </g>

        {/* Tooltip RIGHT */}
        <g transform="translate(720,30)">
          <rect x={0} y={0} width={192} height={64} rx={5} fill="white" stroke="rgba(0,0,0,0.1)" strokeWidth={1}
            style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.08))" }} />
          <circle cx={16} cy={38} r={5.5} fill="#22c55e" />
          <text x={28} y={41} fontSize={9.5} fill="#111" fontFamily="monospace" fontWeight="600">Autoscaling active</text>
          <text x={14} y={52} fontSize={8.5} fill="#6b7280" fontFamily="monospace">Resources adjusted:</text>
          <text x={178} y={52} fontSize={8.5} fill="#111" fontFamily="monospace" textAnchor="end" fontWeight="600">+4 CU</text>
          <text x={14} y={62} fontSize={8.5} fill="#6b7280" fontFamily="monospace">Status:</text>
          <text x={178} y={62} fontSize={8.5} fill="#22c55e" fontFamily="monospace" textAnchor="end" fontWeight="600">Operational</text>
        </g>
      </svg>

      {/* Stats bar — dark green */}
      <div
        className="px-6 py-3 flex items-center gap-3"
        style={{ background: "#166534" }}
      >
        <span
          className="text-[13px] font-semibold"
          style={{ color: "#4ade80", fontFamily: "var(--font-mono), monospace", letterSpacing: "0.05em" }}
        >
          54,210
        </span>
        <span
          className="text-[10px] uppercase tracking-[0.16em]"
          style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-mono), monospace" }}
        >
          performance degradations prevented by autoscaling every day
        </span>
      </div>

      {/* Legend + description */}
      <div
        className="px-6 py-4 flex flex-wrap items-center justify-between gap-y-3 gap-x-6"
        style={{ borderTop: "1px solid rgba(0,0,0,0.06)", background: "#fff" }}
      >
        <div className="flex items-center gap-6 flex-wrap">
          {[
            { c: "#22c55e", label: "Synapse autoscaling",      dotted: false },
            { c: "#9ca3af", label: "Workload load",             dotted: true  },
            { c: "#d1d5db", label: "Fixed-resource provisioned",dotted: true  },
          ].map(({ c, label, dotted }) => (
            <div key={label} className="flex items-center gap-2">
              <div
                style={{
                  width: 14, height: 14, borderRadius: 2,
                  background: dotted ? "transparent" : c,
                  border: dotted ? `2px solid ${c}` : "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                {dotted && (
                  <svg width="10" height="10" viewBox="0 0 10 10">
                    <line x1="0" y1="5" x2="10" y2="5" stroke={c} strokeWidth="2" strokeDasharray="2 2" />
                  </svg>
                )}
              </div>
              <span style={{ fontSize: 13, color: "#374151" }}>{label}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: "#6b7280", maxWidth: 320, textAlign: "right", lineHeight: 1.5 }}>
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

        {/* Toggle */}
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }} className="mt-10 flex">
          <div className="flex" style={{ border: "1px solid rgba(0,0,0,0.16)", borderRadius: 6, overflow: "hidden" }}>
            {(["incidents","costs"] as const).map((m, i) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  padding: "10px 20px",
                  fontSize: 13,
                  background: mode === m ? "#fff" : "transparent",
                  color: mode === m ? "#111215" : "#6b7280",
                  fontWeight: mode === m ? 500 : 400,
                  borderRight: i === 0 ? "1px solid rgba(0,0,0,0.12)" : "none",
                  cursor: "pointer",
                  transition: "all 0.15s",
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
