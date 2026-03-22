"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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

/* ═══════════════════════════════════════════════════════════
   ILLUSTRATION 1 — Animated Agent Network Diagram
   Shows: User → Router → [Model nodes] → [Tool nodes] → Response
   Animated dots travel along connections; active path glows teal
═══════════════════════════════════════════════════════════ */
function AgentNetworkIllustration() {
  /* Node layout (SVG coords: 620×340) */
  const nodes = {
    user:     { x: 50,  y: 170, label: "User",        sub: "request",       color: "#94979E", r: 28 },
    router:   { x: 190, y: 170, label: "Router",      sub: "smart-route",   color: "#34D59A", r: 32 },
    llama:    { x: 340, y: 80,  label: "Llama 70B",   sub: "primary",       color: "#34D59A", r: 26 },
    mistral:  { x: 340, y: 170, label: "Mistral 7B",  sub: "fallback",      color: "#7C6FFF", r: 26 },
    deepseek: { x: 340, y: 260, label: "DeepSeek R1", sub: "reasoning",     color: "#F59D4A", r: 26 },
    search:   { x: 490, y: 110, label: "Search",      sub: "tool",          color: "#94979E", r: 22 },
    code:     { x: 490, y: 200, label: "Code",        sub: "tool",          color: "#94979E", r: 22 },
    response: { x: 580, y: 170, label: "Response",    sub: "stream",        color: "#34D59A", r: 28 },
  };

  /* Edges: [from, to, active] */
  const edges: [keyof typeof nodes, keyof typeof nodes, boolean][] = [
    ["user",    "router",   true  ],
    ["router",  "llama",    true  ],
    ["router",  "mistral",  false ],
    ["router",  "deepseek", false ],
    ["llama",   "search",   true  ],
    ["llama",   "code",     false ],
    ["search",  "response", true  ],
    ["code",    "response", false ],
    ["mistral", "response", false ],
  ];

  const getEdgePath = (a: typeof nodes[keyof typeof nodes], b: typeof nodes[keyof typeof nodes]) => {
    const mx = (a.x + b.x) / 2;
    return `M${a.x},${a.y} C${mx},${a.y} ${mx},${b.y} ${b.x},${b.y}`;
  };

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "#0d0e0f", border: "1px solid rgba(255,255,255,0.07)" }}>
      {/* Chrome bar */}
      <div className="flex items-center gap-2 px-5 py-3" style={{ background: "#111215", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
        <span className="ml-3 text-[11px]" style={{ color: "#94979E", fontFamily: "var(--font-mono)" }}>agent / network-view</span>
        <span className="ml-auto text-[10px] px-2 py-0.5 rounded" style={{ background: "rgba(52,213,154,0.12)", color: "#34D59A", fontFamily: "var(--font-mono)" }}>LIVE</span>
      </div>

      {/* SVG illustration */}
      <svg viewBox="0 0 620 340" style={{ width: "100%", display: "block", background: "#0d0e0f" }}>
        <defs>
          <filter id="glow-net">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-soft">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="edge-active" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34D59A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#34D59A" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Grid dots background */}
        {Array.from({ length: 12 }, (_, row) =>
          Array.from({ length: 20 }, (_, col) => (
            <circle key={`${row}-${col}`} cx={col * 33 + 10} cy={row * 30 + 10} r="1" fill="rgba(255,255,255,0.04)" />
          ))
        )}

        {/* Edges — inactive */}
        {edges.filter(([,,active]) => !active).map(([a, b], i) => (
          <path key={`ei-${i}`}
            d={getEdgePath(nodes[a], nodes[b])}
            stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
        ))}

        {/* Edges — active with glow + traveling dot */}
        {edges.filter(([,,active]) => active).map(([a, b], i) => {
          const path = getEdgePath(nodes[a], nodes[b]);
          const dur = [2.4, 3.0, 2.8, 3.5][i % 4];
          return (
            <g key={`ea-${i}`}>
              <path d={path} stroke="rgba(52,213,154,0.18)" strokeWidth="6" fill="none" />
              <path d={path} stroke="url(#edge-active)" strokeWidth="1.8" fill="none" filter="url(#glow-net)" />
              {/* Traveling pulse dot */}
              <circle r="3.5" fill="#34D59A" fillOpacity="0.9" filter="url(#glow-net)">
                <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={path} />
              </circle>
            </g>
          );
        })}

        {/* Nodes */}
        {Object.entries(nodes).map(([key, n]) => (
          <g key={key}>
            {/* Halo for active nodes */}
            {(key === "router" || key === "llama" || key === "response") && (
              <circle cx={n.x} cy={n.y} r={n.r + 10} fill={n.color} fillOpacity="0.06" />
            )}
            {/* Node circle */}
            <circle cx={n.x} cy={n.y} r={n.r}
              fill="#111215"
              stroke={key === "router" || key === "response" ? n.color : "rgba(255,255,255,0.10)"}
              strokeWidth={key === "router" || key === "response" ? 1.5 : 1}
              filter={key === "router" ? "url(#glow-soft)" : undefined}
            />
            {/* Label */}
            <text x={n.x} y={n.y - 3}
              textAnchor="middle" fill={key === "router" || key === "llama" ? "#F9FAFA" : "#94979E"}
              fontSize={key === "router" || key === "response" ? 8 : 7}
              fontWeight={key === "router" ? "600" : "400"}
              fontFamily="var(--font-sans), system-ui">
              {n.label}
            </text>
            <text x={n.x} y={n.y + 9}
              textAnchor="middle" fill={n.color} fillOpacity="0.7"
              fontSize="6" fontFamily="var(--font-mono), monospace">
              {n.sub}
            </text>
          </g>
        ))}

        {/* Status badge */}
        <rect x="8" y="8" width="100" height="18" rx="4" fill="#111215" stroke="rgba(52,213,154,0.2)" strokeWidth="0.8" />
        <circle cx="20" cy="17" r="3" fill="#34D59A">
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <text x="28" y="21" fill="#34D59A" fontSize="7.5" fontFamily="var(--font-mono), monospace">active session</text>

        {/* p99 badge */}
        <rect x="512" y="8" width="100" height="18" rx="4" fill="#111215" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
        <text x="562" y="21" textAnchor="middle" fill="#F9FAFA" fontSize="8" fontFamily="var(--font-mono), monospace">p99 &lt;50ms</text>
      </svg>

      {/* Footer bar */}
      <div className="px-5 py-3 border-t flex gap-6" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        {[
          { dot: "#34D59A", label: "Active path" },
          { dot: "#7C6FFF", label: "Fallback" },
          { dot: "#94979E", label: "Standby" },
        ].map(({ dot, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: dot }} />
            <span style={{ fontSize: 11, color: "#94979E", fontFamily: "var(--font-mono)" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ILLUSTRATION 2 — Model Coverage Radar / Capability Matrix
   Radar chart showing dimensions: Speed, Quality, Context, Cost, Availability
═══════════════════════════════════════════════════════════ */
function CoverageRadarIllustration() {
  const cx = 180, cy = 175, r = 120;
  const dims = ["Speed", "Quality", "Context", "Cost-eff", "Avail"];
  const n = dims.length;

  const models = [
    { name: "Llama 3.1 70B", color: "#34D59A",  vals: [0.85, 0.92, 0.88, 0.80, 1.0 ] },
    { name: "Mistral 7B",    color: "#7C6FFF",  vals: [0.97, 0.72, 0.65, 0.95, 0.98] },
    { name: "DeepSeek R1",   color: "#F59D4A",  vals: [0.70, 0.98, 0.92, 0.75, 0.88] },
  ];

  const angleOf = (i: number) => (i / n) * 2 * Math.PI - Math.PI / 2;

  const pointsFor = (vals: number[]) =>
    vals.map((v, i) => {
      const a = angleOf(i);
      return `${cx + r * v * Math.cos(a)},${cy + r * v * Math.sin(a)}`;
    }).join(" ");

  /* Grid rings */
  const rings = [0.25, 0.5, 0.75, 1.0];

  const axisEnd = (i: number) => ({
    x: cx + r * Math.cos(angleOf(i)),
    y: cy + r * Math.sin(angleOf(i)),
  });

  const labelPos = (i: number) => {
    const a = angleOf(i);
    return {
      x: cx + (r + 18) * Math.cos(a),
      y: cy + (r + 18) * Math.sin(a),
    };
  };

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "#0d0e0f", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="flex items-center justify-between px-5 py-3" style={{ background: "#111215", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <span className="text-[11px]" style={{ color: "#94979E", fontFamily: "var(--font-mono)" }}>model / capability-radar</span>
        <span className="text-[10px]" style={{ color: "#34D59A", fontFamily: "var(--font-mono)" }}>6 families · 200+ variants</span>
      </div>

      <div className="flex items-stretch">
        {/* Radar SVG */}
        <svg viewBox="0 0 360 350" style={{ width: "55%", display: "block", flexShrink: 0 }}>
          {/* Grid rings */}
          {rings.map((frac) => (
            <polygon key={frac}
              points={dims.map((_, i) => {
                const a = angleOf(i);
                return `${cx + r * frac * Math.cos(a)},${cy + r * frac * Math.sin(a)}`;
              }).join(" ")}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          ))}

          {/* Axis lines */}
          {dims.map((_, i) => {
            const end = axisEnd(i);
            return <line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />;
          })}

          {/* Model polygons */}
          {models.map((m) => (
            <g key={m.name}>
              <polygon points={pointsFor(m.vals)}
                fill={m.color} fillOpacity="0.10"
                stroke={m.color} strokeOpacity="0.7" strokeWidth="1.5" />
              {/* Vertex dots */}
              {m.vals.map((v, i) => {
                const a = angleOf(i);
                return <circle key={i}
                  cx={cx + r * v * Math.cos(a)}
                  cy={cy + r * v * Math.sin(a)}
                  r="3" fill={m.color} fillOpacity="0.9" />;
              })}
            </g>
          ))}

          {/* Axis labels */}
          {dims.map((dim, i) => {
            const lp = labelPos(i);
            return (
              <text key={dim} x={lp.x} y={lp.y}
                textAnchor="middle" dominantBaseline="middle"
                fill="rgba(255,255,255,0.45)" fontSize="8.5"
                fontFamily="var(--font-mono), monospace">
                {dim}
              </text>
            );
          })}

          {/* Center dot */}
          <circle cx={cx} cy={cy} r="3" fill="rgba(255,255,255,0.15)" />
        </svg>

        {/* Legend + model coverage table */}
        <div className="flex flex-col justify-center gap-4 px-5 py-6 flex-1">
          {models.map((m) => (
            <div key={m.name}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ background: m.color }} />
                <span style={{ fontSize: 12, color: "#F9FAFA", fontWeight: 500 }}>{m.name}</span>
              </div>
              <div className="flex flex-col gap-1">
                {dims.map((dim, i) => (
                  <div key={dim} className="flex items-center gap-2">
                    <span style={{ fontSize: 10, color: "#94979E", width: 52, fontFamily: "var(--font-mono)", flexShrink: 0 }}>{dim}</span>
                    <div className="flex-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <div className="h-full rounded-full" style={{ width: `${m.vals[i] * 100}%`, background: m.color, opacity: 0.8 }} />
                    </div>
                    <span style={{ fontSize: 9, color: "#94979E", fontFamily: "var(--font-mono)", width: 26, textAlign: "right" }}>{Math.round(m.vals[i] * 100)}%</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Heatmap row — model × param size */}
      <div className="border-t px-5 py-4" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <p style={{ fontSize: 10, color: "#94979E", fontFamily: "var(--font-mono)", marginBottom: 10 }}>availability by parameter size</p>
        <div className="flex flex-col gap-1.5">
          {[
            { fam: "Llama 3",   cells: [1, 1, 1, 1] },
            { fam: "Mistral",   cells: [1, 0.7, 1, 0] },
            { fam: "DeepSeek",  cells: [0.9, 0, 1, 0] },
            { fam: "Qwen",      cells: [0.7, 0, 0.9, 0] },
          ].map(({ fam, cells }) => (
            <div key={fam} className="flex items-center gap-2">
              <span style={{ fontSize: 10, color: "#94979E", fontFamily: "var(--font-mono)", width: 56, flexShrink: 0 }}>{fam}</span>
              {["7B","13B","70B","405B"].map((size, ci) => (
                <div key={size} className="flex-1 h-5 rounded flex items-center justify-center"
                  style={{ background: cells[ci] ? `rgba(52,213,154,${cells[ci] * 0.7})` : "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.04)" }}>
                  {cells[ci] > 0 && <span style={{ fontSize: 8, color: cells[ci] > 0.8 ? "#0C0D0D" : "#34D59A", fontFamily: "var(--font-mono)" }}>{size}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ILLUSTRATION 3 — Observability Dashboard
   Canvas latency histogram + live sparkline + KPI cards
═══════════════════════════════════════════════════════════ */
function ObservabilityIllustration() {
  const histRef = useRef<HTMLCanvasElement>(null);
  const sparkRef = useRef<HTMLCanvasElement>(null);

  /* Histogram */
  useEffect(() => {
    const canvas = histRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width  = canvas.offsetWidth  * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    /* Latency distribution (ms): simulate log-normal around 25ms */
    const buckets = [2,5,10,18,35,62,48,30,18,10,6,3,2,1];
    const maxB = Math.max(...buckets);
    const bw = (W - 32) / buckets.length;

    ctx.clearRect(0, 0, W, H);
    buckets.forEach((v, i) => {
      const bh = ((v / maxB) * (H - 32));
      const x  = 16 + i * bw;
      const y  = H - 16 - bh;
      const highlight = i >= 3 && i <= 6;
      const grad = ctx.createLinearGradient(x, y, x, H - 16);
      if (highlight) {
        grad.addColorStop(0, "rgba(52,213,154,0.85)");
        grad.addColorStop(1, "rgba(52,213,154,0.15)");
      } else {
        grad.addColorStop(0, "rgba(52,213,154,0.30)");
        grad.addColorStop(1, "rgba(52,213,154,0.05)");
      }
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x + 1, y, bw - 3, bh, [2, 2, 0, 0]);
      ctx.fill();
    });

    /* X-axis labels */
    ctx.fillStyle = "rgba(148,151,158,0.7)";
    ctx.font = "9px var(--font-mono, monospace)";
    ["5ms","15ms","25ms","35ms","50ms","75ms","100ms+"].forEach((l, i) => {
      ctx.fillText(l, 16 + i * (bw * 2), H - 3);
    });
  }, []);

  /* Sparkline — request volume */
  useEffect(() => {
    const canvas = sparkRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width  = canvas.offsetWidth  * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    const W = canvas.offsetWidth, H = canvas.offsetHeight;

    const pts = [420,510,480,630,720,810,760,890,940,1020,980,1150,1080,1200,1180,1240];
    const maxP = Math.max(...pts), minP = Math.min(...pts);
    const toY = (v: number) => 4 + ((1 - (v - minP) / (maxP - minP)) * (H - 8));
    const toX = (i: number) => (i / (pts.length - 1)) * W;

    ctx.clearRect(0, 0, W, H);

    /* Fill */
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, "rgba(52,213,154,0.25)");
    grad.addColorStop(1, "rgba(52,213,154,0.0)");
    ctx.beginPath();
    ctx.moveTo(0, H);
    pts.forEach((v, i) => ctx.lineTo(toX(i), toY(v)));
    ctx.lineTo(W, H);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    /* Line */
    ctx.beginPath();
    pts.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)));
    ctx.strokeStyle = "rgba(52,213,154,0.8)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    /* End dot */
    ctx.beginPath();
    ctx.arc(toX(pts.length - 1), toY(pts[pts.length - 1]), 3, 0, Math.PI * 2);
    ctx.fillStyle = "#34D59A";
    ctx.fill();
  }, []);

  const kpis = [
    { label: "Avg latency",   value: "28ms",   sub: "↓12% vs last hr", color: "#34D59A" },
    { label: "Throughput",    value: "1,240/s", sub: "↑8% vs last hr",  color: "#34D59A" },
    { label: "Error rate",    value: "0.04%",  sub: "within SLA",       color: "#94979E" },
    { label: "Token spend",   value: "$0.84",  sub: "last 5 min",       color: "#F59D4A" },
  ];

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "#0d0e0f", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="flex items-center justify-between px-5 py-3" style={{ background: "#111215", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <span className="text-[11px]" style={{ color: "#94979E", fontFamily: "var(--font-mono)" }}>observability / dashboard</span>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#34D59A" }}>
            <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
          </div>
          <span className="text-[10px]" style={{ color: "#34D59A", fontFamily: "var(--font-mono)", animation: "blink 2s ease-in-out infinite" }}>live</span>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        {kpis.map(({ label, value, sub, color }) => (
          <div key={label} className="p-4 border-r last:border-r-0" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <p style={{ fontSize: 10, color: "#94979E", fontFamily: "var(--font-mono)", marginBottom: 4 }}>{label}</p>
            <p style={{ fontSize: 20, fontWeight: 300, color, letterSpacing: "-0.03em", lineHeight: 1 }}>{value}</p>
            <p style={{ fontSize: 10, color: "#94979E", marginTop: 3 }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="p-5 flex flex-col gap-5">
        <div>
          <p style={{ fontSize: 10, color: "#94979E", fontFamily: "var(--font-mono)", marginBottom: 8 }}>latency distribution (p50–p99)</p>
          <canvas ref={histRef} style={{ width: "100%", height: 90, display: "block" }} />
        </div>
        <div>
          <p style={{ fontSize: 10, color: "#94979E", fontFamily: "var(--font-mono)", marginBottom: 6 }}>request volume — last 30 min</p>
          <canvas ref={sparkRef} style={{ width: "100%", height: 50, display: "block" }} />
        </div>
      </div>

      {/* Request log mini */}
      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        {[
          { id: "req_8Hq2t", model: "llama-3.1-70b", lat: "43ms",  status: "200" },
          { id: "req_fK9mP", model: "deepseek-r1",   lat: "91ms",  status: "200" },
          { id: "req_aX7vN", model: "mistral-7b",    lat: "18ms",  status: "200" },
        ].map((row) => (
          <div key={row.id} className="flex items-center gap-4 px-5 py-2 border-b last:border-b-0"
            style={{ borderColor: "rgba(255,255,255,0.03)", fontSize: 11, fontFamily: "var(--font-mono)" }}>
            <span style={{ color: "rgba(249,250,250,0.35)", width: 70 }}>{row.id}</span>
            <span style={{ color: "#94979E", flex: 1 }}>{row.model}</span>
            <span style={{ color: "#34D59A", width: 40 }}>{row.lat}</span>
            <span style={{ color: "#34D59A", width: 30 }}>{row.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════ */
const FEATURES = [
  {
    tag: "Agentic Inference",
    tagColor: "#34D59A",
    headline: "Serve agents, not just prompts.",
    body: "Static request-response APIs break when agents go multi-step. Synapse maintains persistent sessions, streams tokens across tool calls, and handles retries — so your agents never stall on infrastructure.",
    bullets: [
      "Persistent context across agent turns",
      "Parallel tool-call execution with streaming",
      "Automatic retry with exponential backoff",
      "Multi-model routing within a single session",
    ],
    illustration: <AgentNetworkIllustration />,
    flipped: false,
  },
  {
    tag: "Coverage Mapping",
    tagColor: "#7C6FFF",
    headline: "Know exactly what you can run, and what's coming.",
    body: "Teams waste days debugging incompatible model versions. Synapse's capability radar shows every model's performance profile — and automatically routes to the best available variant.",
    bullets: [
      "Radar view across Speed, Quality, Context, Cost",
      "200+ variants across 6 model families",
      "Automatic fallback to next-best variant",
      "Context-window and capability tags per model",
    ],
    illustration: <CoverageRadarIllustration />,
    flipped: true,
  },
  {
    tag: "Observability",
    tagColor: "#F59D4A",
    headline: "Every token, every request, fully traceable.",
    body: "Black-box inference is a liability in production. Synapse logs every request with latency histograms, cost breakdown, request traces and OpenTelemetry export — so you always know exactly what's happening.",
    bullets: [
      "Real-time latency distribution histogram",
      "Per-request cost and token breakdown",
      "Searchable request history with replay",
      "OpenTelemetry-compatible trace export",
    ],
    illustration: <ObservabilityIllustration />,
    flipped: false,
  },
];

const TESTIMONIALS = [
  {
    quote: "Inference used to mean manually tuning capacity across a dozen servers. Now Synapse handles it and our p99 dropped by 60%.",
    name: "Senior ML Engineer",
    org: "2,000+ employee fintech",
  },
  {
    quote: "We migrated from a self-hosted vLLM cluster in a weekend. OpenAI-compatible API meant zero changes to application code.",
    name: "Principal Engineer",
    org: "Series B AI startup",
  },
  {
    quote: "Being able to branch a deployment and A/B test fine-tunes without new infra changed how we ship model updates entirely.",
    name: "Head of AI",
    org: "Enterprise SaaS company",
  },
];

const INTEGRATIONS = [
  { name: "OpenAI SDK",      note: "Drop-in compatible" },
  { name: "LangChain",       note: "Official provider"  },
  { name: "LlamaIndex",      note: "Native integration" },
  { name: "Vercel AI SDK",   note: "Edge-ready"         },
  { name: "Haystack",        note: "Pipeline support"   },
  { name: "AutoGen",         note: "Agent framework"    },
  { name: "CrewAI",          note: "Multi-agent"        },
  { name: "Semantic Kernel", note: "Plugin compatible"  },
];

const BADGES = ["SOC 2 Type II", "ISO 27001", "GDPR", "HIPAA", "CCPA", "RBAC", "SSO", "Audit Logs"];

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
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

        {/* ── STATS ── */}
        <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-[1200px] mx-auto" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
            {[
              { v: "<50ms",  l: "p99 First Token",   s: "At any scale"       },
              { v: "10k+",   l: "Requests / second", s: "Per deployment"     },
              { v: "99.99%", l: "Uptime SLA",         s: "All regions"        },
              { v: "200+",   l: "Model variants",     s: "Open & proprietary" },
            ].map(({ v, l, s }) => (
              <div key={l} className="p-8 border-r last:border-r-0" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <span style={{ fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 300, letterSpacing: "-0.04em", color: "#34D59A", lineHeight: 1, display: "block" }}>{v}</span>
                <span style={{ fontSize: 15, color: "#F9FAFA", fontWeight: 500, display: "block", marginTop: 6 }}>{l}</span>
                <span style={{ fontSize: 13, color: "#94979E", display: "block" }}>{s}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES — alternating with illustrations ── */}
        {FEATURES.map(({ tag, tagColor, headline, body, bullets, illustration, flipped }, i) => (
          <section key={tag} style={{ padding: "120px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", background: i % 2 === 1 ? "#080A09" : "#0C0D0D" }}>
            <div className="max-w-[1200px] mx-auto px-8">
              <div className={`flex flex-col ${flipped ? "lg:flex-row-reverse" : "lg:flex-row"} gap-16 items-center`}>
                {/* Text side */}
                <div className="flex-1 min-w-0">
                  <motion.div {...fadeUp()}>
                    <span className="inline-block text-[11px] uppercase tracking-[0.12em] px-3 py-1 rounded-full mb-5"
                      style={{ background: `${tagColor}14`, color: tagColor, fontFamily: "var(--font-mono)", border: `1px solid ${tagColor}30` }}>
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
                            <circle cx="8" cy="8" r="7" stroke={tagColor} strokeOpacity="0.3" strokeWidth="1.2" />
                            <path d="M5 8l2 2 4-4" stroke={tagColor} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span style={{ fontSize: 15, color: "#94979E" }}>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Illustration side */}
                <motion.div {...fadeUp(0.1)} className="flex-1 min-w-0 w-full">
                  {illustration}
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
              <h2 style={{ fontSize: "clamp(26px,3vw,42px)", fontWeight: 400, letterSpacing: "-0.04em", color: "#F9FAFA" }}>Trusted by the teams shipping AI.</h2>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {TESTIMONIALS.map(({ quote, name, org }, i) => (
                <motion.div key={i} {...fadeUp(i * 0.08)} className="rounded-2xl p-8 flex flex-col gap-6"
                  style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.06)" }}>
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
              <h2 style={{ fontSize: "clamp(24px,3vw,40px)", fontWeight: 400, letterSpacing: "-0.04em", color: "#F9FAFA" }}>Works with every framework you use.</h2>
              <p style={{ fontSize: 15, color: "#94979E", marginTop: 12 }}>40+ native integrations. OpenAI-compatible API means zero migration cost.</p>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
              {INTEGRATIONS.map(({ name, note }, i) => (
                <motion.div key={name} {...fadeUp(i * 0.05)} className="rounded-xl p-5 flex flex-col gap-1.5"
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
                <h2 style={{ fontSize: "clamp(26px,3vw,42px)", fontWeight: 400, letterSpacing: "-0.04em", color: "#F9FAFA", marginBottom: 16 }}>Built for teams that can&apos;t afford downtime.</h2>
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
                    <div key={b} className="px-4 py-2.5 rounded-lg text-[13px]" style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.08)", color: "#94979E" }}>{b}</div>
                  ))}
                </div>
                <div className="mt-8 rounded-xl p-5" style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex items-center justify-between mb-3">
                    <span style={{ fontSize: 13, color: "#F9FAFA" }}>API Availability — 90 days</span>
                    <span style={{ fontSize: 13, color: "#34D59A", fontFamily: "var(--font-mono)" }}>99.99%</span>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 90 }).map((_, i) => (
                      <div key={i} className="flex-1 rounded-sm" style={{ height: 24, background: i === 37 || i === 71 ? "rgba(245,157,74,0.7)" : "rgba(52,213,154,0.7)" }} />
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
