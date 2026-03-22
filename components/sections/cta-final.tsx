"use client";

import { motion } from "framer-motion";

/* ─── Node definitions for the SVG network ─── */
const NODES = [
  { id: "llama-3.1-70b", x: 80, y: 95 },
  { id: "embedding-api", x: 145, y: 280 },
  { id: "inference-v2", x: 340, y: 160 },
  { id: "fine-tune-job", x: 280, y: 350 },
  { id: "agent-runtime", x: 540, y: 80 },
  { id: "model-endpoint", x: 580, y: 270 },
  { id: "mixtral-8x7b", x: 780, y: 150 },
  { id: "gpu-cluster", x: 460, y: 390 },
  { id: "serving-pool", x: 880, y: 310 },
  { id: "checkpoint-v3", x: 950, y: 110 },
  { id: "vector-store", x: 190, y: 190 },
  { id: "batch-worker", x: 700, y: 350 },
  { id: "load-balancer", x: 1020, y: 220 },
  { id: "quantize-v2", x: 420, y: 270 },
];

/* ─── Edge connections ─── */
const EDGES: [number, number][] = [
  [0, 2], [0, 10], [1, 2], [1, 3], [10, 2], [10, 13],
  [2, 4], [2, 5], [13, 5], [3, 5], [3, 7], [3, 13],
  [4, 6], [5, 6], [5, 7], [5, 11], [6, 8], [6, 9],
  [4, 9], [7, 8], [7, 11], [8, 12], [9, 12], [11, 8],
  [1, 13], [11, 12],
];

/* Bezier control point for organic curves */
function ctrl(x1: number, y1: number, x2: number, y2: number, idx: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const d = Math.sqrt(dx * dx + dy * dy);
  const offset = d * 0.18 * (idx % 2 === 0 ? 1 : -1);
  return { cx: mx + (-dy / d) * offset, cy: my + (dx / d) * offset };
}

function NetworkSVG() {
  return (
    <svg
      viewBox="0 0 1100 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        {/* Glow filter for nodes */}
        <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.2  0 0 0 0 0.84  0 0 0 0 0.6  0 0 0 0.6 0" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Softer glow for edges */}
        <filter id="edgeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.2  0 0 0 0 0.84  0 0 0 0 0.6  0 0 0 0.5 0" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Large ambient glow */}
        <radialGradient id="ambientGlow1" cx="55%" cy="40%" r="40%">
          <stop offset="0%" stopColor="#34D59A" stopOpacity="0.06" />
          <stop offset="60%" stopColor="#34D59A" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#34D59A" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="ambientGlow2" cx="25%" cy="60%" r="30%">
          <stop offset="0%" stopColor="#34D59A" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#34D59A" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="ambientGlow3" cx="80%" cy="35%" r="25%">
          <stop offset="0%" stopColor="#34D59A" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#34D59A" stopOpacity="0" />
        </radialGradient>

        {/* Left fade gradient for heading readability */}
        <linearGradient id="leftFade" x1="0" y1="0" x2="0.4" y2="0">
          <stop offset="0%" stopColor="#0C0D0D" stopOpacity="0.92" />
          <stop offset="50%" stopColor="#0C0D0D" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0C0D0D" stopOpacity="0" />
        </linearGradient>

        {/* Top fade */}
        <linearGradient id="topFade" x1="0" y1="0" x2="0" y2="0.18">
          <stop offset="0%" stopColor="#0C0D0D" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0C0D0D" stopOpacity="0" />
        </linearGradient>

        {/* Bottom fade */}
        <linearGradient id="bottomFade" x1="0" y1="0.75" x2="0" y2="1">
          <stop offset="0%" stopColor="#0C0D0D" stopOpacity="0" />
          <stop offset="100%" stopColor="#0C0D0D" stopOpacity="0.85" />
        </linearGradient>

        {/* Animated dash pattern for flowing edges */}
        <style>{`
          @keyframes flowDash {
            to { stroke-dashoffset: -40; }
          }
          .flow-edge {
            animation: flowDash 3s linear infinite;
          }
          @keyframes pulseNode {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
          .pulse-node {
            animation: pulseNode 3s ease-in-out infinite;
          }
        `}</style>
      </defs>

      {/* Ambient glow backgrounds */}
      <rect width="1100" height="460" fill="url(#ambientGlow1)" />
      <rect width="1100" height="460" fill="url(#ambientGlow2)" />
      <rect width="1100" height="460" fill="url(#ambientGlow3)" />

      {/* Dot grid pattern — very subtle */}
      {Array.from({ length: 22 }, (_, col) =>
        Array.from({ length: 9 }, (_, row) => (
          <circle
            key={`dot-${col}-${row}`}
            cx={col * 50 + 25}
            cy={row * 50 + 30}
            r={0.6}
            fill="#34D59A"
            opacity={0.08}
          />
        ))
      )}

      {/* Edges — flowing dashed lines with glow */}
      <g filter="url(#edgeGlow)">
        {EDGES.map(([a, b], i) => {
          const n1 = NODES[a];
          const n2 = NODES[b];
          const c = ctrl(n1.x, n1.y, n2.x, n2.y, i);
          const delay = (i * 0.15) % 3;
          return (
            <path
              key={`edge-${i}`}
              d={`M ${n1.x} ${n1.y} Q ${c.cx} ${c.cy} ${n2.x} ${n2.y}`}
              stroke="#34D59A"
              strokeWidth={1.2}
              strokeOpacity={0.2 + (i % 3) * 0.08}
              fill="none"
              strokeDasharray="4 8"
              strokeLinecap="round"
              className="flow-edge"
              style={{ animationDelay: `${delay}s`, animationDuration: `${2.5 + (i % 4) * 0.5}s` }}
            />
          );
        })}
      </g>

      {/* Secondary solid thin lines for structure */}
      {EDGES.map(([a, b], i) => {
        const n1 = NODES[a];
        const n2 = NODES[b];
        const c = ctrl(n1.x, n1.y, n2.x, n2.y, i);
        return (
          <path
            key={`edge-solid-${i}`}
            d={`M ${n1.x} ${n1.y} Q ${c.cx} ${c.cy} ${n2.x} ${n2.y}`}
            stroke="#34D59A"
            strokeWidth={0.4}
            strokeOpacity={0.07}
            fill="none"
          />
        );
      })}

      {/* Nodes */}
      <g filter="url(#nodeGlow)">
        {NODES.map((node, i) => (
          <g key={node.id}>
            {/* Outer glow ring */}
            <circle
              cx={node.x}
              cy={node.y}
              r={18}
              fill="#34D59A"
              fillOpacity={0.03}
              className="pulse-node"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
            {/* Core dot */}
            <circle cx={node.x} cy={node.y} r={3} fill="#34D59A" fillOpacity={0.75} />
            {/* Inner bright dot */}
            <circle cx={node.x} cy={node.y} r={1.2} fill="#A8F5D8" fillOpacity={0.9} />
          </g>
        ))}
      </g>

      {/* Node labels */}
      {NODES.map((node) => {
        const labelW = node.id.length * 6.2 + 12;
        const lx = node.x - labelW / 2;
        const ly = node.y - 20;
        return (
          <g key={`label-${node.id}`}>
            <rect
              x={lx}
              y={ly}
              width={labelW}
              height={16}
              rx={3}
              fill="#0C0D0D"
              fillOpacity={0.7}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={0.5}
            />
            <text
              x={node.x}
              y={ly + 11.5}
              textAnchor="middle"
              fill="#94979E"
              fillOpacity={0.7}
              fontSize={9}
              fontFamily="var(--font-mono), monospace"
            >
              {node.id}
            </text>
          </g>
        );
      })}

      {/* Fade overlays */}
      <rect width="1100" height="460" fill="url(#leftFade)" />
      <rect width="1100" height="460" fill="url(#topFade)" />
      <rect width="1100" height="460" fill="url(#bottomFade)" />
    </svg>
  );
}

export default function CTAFinal() {
  return (
    <section style={{ background: "#0C0D0D" }}>
      {/* SVG network visualization section */}
      <div className="relative" style={{ minHeight: "clamp(520px, 65vh, 780px)" }}>
        <NetworkSVG />

        {/* Heading overlay */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 pt-20">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: "clamp(36px, 5.5vw, 72px)",
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
              color: "#F9FAFA",
              maxWidth: 720,
            }}
          >
            The world&apos;s most advanced AI platform.
          </motion.h2>
        </div>
      </div>

      {/* Bottom CTA bar */}
      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div
          className="max-w-[1400px] mx-auto px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="text-[15px] leading-snug" style={{ color: "#94979E" }}>
            <p>Trusted by developers, ready for agents.</p>
            <p>Build and scale AI faster with Synapse.</p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#"
              className="inline-flex items-center px-6 h-11 rounded-full text-sm font-medium transition-colors"
              style={{ background: "#F9FAFA", color: "#0C0D0D" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#e5e7eb")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#F9FAFA")}
            >
              Get started
            </a>
            <a
              href="#"
              className="inline-flex items-center px-6 h-11 rounded-full text-sm transition-colors"
              style={{ color: "#F9FAFA", border: "1px solid rgba(255,255,255,0.2)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
            >
              Read the docs
            </a>
            <button
              className="inline-flex items-center gap-2 px-4 h-11 rounded-xl text-sm transition-colors"
              style={{
                background: "#34D59A",
                color: "#0C0D0D",
                fontFamily: "var(--font-mono), monospace",
                fontWeight: 500,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#2cb885")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#34D59A")}
            >
              $ npx synapsectl init
              <span className="opacity-60 text-xs">&#x29C9;</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
