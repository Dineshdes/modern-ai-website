"use client";

import { useState } from "react";
import { motion } from "framer-motion";

function DotIcon({ dark = false }: { dark?: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="mb-8 opacity-50">
      {[0,1,2,3,4].map((row) =>
        [0,1,2,3,4].map((col) => {
          if (col > row) return null;
          const opacity = 0.15 + ((row + col) / 8) * 0.85;
          return (
            <circle
              key={`${row}-${col}`}
              cx={col * 6 + 3}
              cy={row * 6 + 3}
              r={1.5}
              fill={dark ? "#111" : "white"}
              fillOpacity={opacity}
            />
          );
        })
      )}
    </svg>
  );
}

function AutoscalingChart() {
  const W = 800;
  const H = 220;
  const leftPoints: [number,number][] = [
    [0,180],[40,172],[80,155],[120,162],[160,142],[200,130],
    [230,120],[250,52],[270,45],[290,130],[330,162],[400,160],
  ];
  const rightPoints: [number,number][] = [
    [400,100],[440,95],[480,108],[520,90],[560,86],
    [600,96],[640,82],[680,90],[720,93],[760,86],[800,89],
  ];
  const lFill = [...leftPoints, [400,H],[0,H]].map(([x,y])=>`${x},${y}`).join(" ");
  const lLine = leftPoints.map(([x,y])=>`${x},${y}`).join(" ");
  const rFill = [...rightPoints, [800,H],[400,H]].map(([x,y])=>`${x},${y}`).join(" ");
  const rLine = rightPoints.map(([x,y])=>`${x},${y}`).join(" ");

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-black/[0.08]" style={{ background: "#f0f7f3" }}>
      <div className="grid grid-cols-2 border-b border-black/[0.06]">
        <div className="px-6 py-3 text-xs font-mono text-[#9ca3af] border-r border-black/[0.06]">Without Synapse</div>
        <div className="px-6 py-3 text-xs font-mono text-[#9ca3af]">With Synapse</div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 220 }}>
        <rect x={0} y={0} width={400} height={H} fill="#fff1f1" />
        <rect x={400} y={0} width={400} height={H} fill="#f0fdf4" />
        {[50,100,150,200].map((y)=>(
          <line key={y} x1={0} y1={y} x2={W} y2={y} stroke="#00000008" strokeWidth={1} />
        ))}
        <line x1={400} y1={0} x2={400} y2={H} stroke="#d1d5db" strokeWidth={1} strokeDasharray="4 3" />
        <polyline points={lFill} fill="#fca5a5" fillOpacity={0.4} stroke="none" />
        <polyline points={lLine} fill="none" stroke="#ef4444" strokeWidth={1.5} />
        <pattern id="rdots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#fca5a5" fillOpacity={0.5} />
        </pattern>
        <rect x={0} y={0} width={400} height={H} fill="url(#rdots)" />
        <polyline points={rFill} fill="#00E599" fillOpacity={0.2} stroke="none" />
        <polyline points={rLine} fill="none" stroke="#00E599" strokeWidth={1.5} />
        <pattern id="gdots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#00E599" fillOpacity={0.3} />
        </pattern>
        <rect x={400} y={0} width={400} height={H} fill="url(#gdots)" />
      </svg>
      <div className="bg-[#111215] px-6 py-3 flex items-center gap-3">
        <span className="text-[#00E599] text-sm font-mono font-semibold">2,073</span>
        <span className="text-[10px] font-mono text-[#797D86] uppercase tracking-widest">
          Performance degradations prevented by autoscaling every day
        </span>
      </div>
      <div className="px-6 py-3 flex items-center gap-8 border-t border-black/[0.06]">
        {[
          { color: "#00E599", label: "Synapse autoscaling" },
          { color: "#9ca3af", label: "Workload load" },
          { color: "#d1d5db", label: "Fixed-resource provisioned" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm border border-black/10" style={{ background: color }} />
            <span className="text-xs text-[#6b7280]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AutoscalingSection() {
  const [mode, setMode] = useState<"incidents" | "costs">("incidents");

  return (
    <section
      id="autoscaling"
      className="relative py-32 border-b border-black/[0.06] overflow-hidden"
      style={{ background: "#E4F1EB" }}
    >
      <div className="max-w-[1400px] mx-auto px-8 lg:pl-[260px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <DotIcon dark />
          <h2
            className="font-normal text-[#9ca3af] max-w-4xl"
            style={{ fontSize: "clamp(32px,3.5vw,48px)", lineHeight: 1.17, letterSpacing: "-1.92px" }}
          >
            <span className="text-[#111215]">Advanced autoscaling.</span>{" "}
            Keep scaling without worrying about capacity. Never overpay for resources you don&apos;t use.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-10 flex"
        >
          <div className="flex border border-black/15 rounded overflow-hidden">
            {(["incidents", "costs"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-5 py-2 text-[13px] transition-colors ${
                  mode === m ? "bg-white text-[#111215] font-medium" : "text-[#6b7280] hover:text-[#111215]"
                }`}
              >
                {m === "incidents" ? "Avoid incidents" : "Save costs"}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="mt-10"
        >
          <AutoscalingChart />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.24 }}
          className="mt-8 text-[15px] text-[#6b7280] max-w-lg leading-relaxed"
        >
          By separating compute and inference layers, Synapse automatically scales GPU,
          memory and capacity to fit your workload&apos;s demands.
        </motion.p>
      </div>
    </section>
  );
}
