"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HalftoneEdges from "@/components/ui/halftone-edges";

/* ─── Branch data ─── */
interface Branch { d: string; w: number; o: number; id?: string }

const BRANCHES: Branch[] = [
  { d: "M -80 680 C 60 580 180 480 340 400",   w: 7,   o: 0.22 },
  { d: "M 340 400 C 430 360 520 330 660 310",   w: 5.5, o: 0.18 },
  { d: "M 660 310 C 780 295 900 280 1060 268",  w: 4,   o: 0.15 },
  { d: "M 1060 268 C 1180 258 1300 248 1440 238", w: 2.8, o: 0.10 },

  { d: "M -40 720 C 80 640 200 560 360 500",   w: 6,   o: 0.18 },
  { d: "M 360 500 C 460 460 580 430 720 415",   w: 4,   o: 0.14 },
  { d: "M 720 415 C 840 402 960 390 1100 380",  w: 2.5, o: 0.10 },

  { d: "M 200 470 C 190 400 170 310 130 210",   w: 3.5, o: 0.16 },
  { d: "M 130 210 C 110 160 80 100 40 40",      w: 2.2, o: 0.12 },
  { d: "M 130 210 C 150 160 180 110 230 70",    w: 1.8, o: 0.10 },
  { d: "M 230 70 C 250 40 280 18 310 0",        w: 1.2, o: 0.08 },

  { d: "M 440 372 C 460 300 500 210 560 130",   w: 3,   o: 0.15, id: "inference-branch" },
  { d: "M 560 130 C 580 90 610 50 650 10",      w: 1.8, o: 0.10 },
  { d: "M 560 130 C 590 100 630 80 680 60",     w: 1.4, o: 0.09 },

  { d: "M 560 325 C 620 260 700 190 800 130",   w: 2.8, o: 0.14, id: "inference-branch" },
  { d: "M 800 130 C 860 100 920 70 990 45",     w: 1.8, o: 0.10 },
  { d: "M 800 130 C 840 105 880 90 930 80",     w: 1.3, o: 0.08 },
  { d: "M 990 45 C 1030 28 1080 12 1140 0",    w: 1.0, o: 0.07 },

  { d: "M 750 296 C 850 270 960 250 1090 240",  w: 2.2, o: 0.12 },
  { d: "M 1090 240 C 1180 232 1280 224 1400 218", w: 1.4, o: 0.08 },

  { d: "M 440 482 C 500 510 580 540 680 558",   w: 2.5, o: 0.13 },
  { d: "M 680 558 C 760 572 860 580 960 578",   w: 1.8, o: 0.09 },

  { d: "M 620 438 C 680 400 760 360 860 340",   w: 2,   o: 0.12, id: "router-branch" },
  { d: "M 860 340 C 940 324 1040 310 1160 302", w: 1.4, o: 0.08, id: "router-branch" },

  { d: "M 40 40 C 20 20 -10 8 -40 0",          w: 1,   o: 0.07 },
  { d: "M 40 40 C 50 20 70 8 100 0",            w: 0.8, o: 0.06 },
  { d: "M 930 80 C 970 60 1020 42 1080 30",     w: 0.9, o: 0.07 },
  { d: "M 1160 302 C 1260 290 1360 280 1440 274", w: 1, o: 0.07 },
  { d: "M 960 578 C 1040 574 1140 566 1240 556",  w: 1.2, o: 0.08 },
  { d: "M 650 10 C 680 0 720 -8 760 -12",       w: 0.8, o: 0.06 },
];

/* ─── Label config ─── */
interface Label {
  x: number; y: number; text: string;
  anchor?: "start" | "middle" | "end";
  special?: "teal" | "orange";
}

const LABELS: Label[] = [
  { x: 130,  y: 210, text: "staging-env",    anchor: "end" },
  { x: 40,   y: 42,  text: "production",     anchor: "end" },
  { x: 230,  y: 72,  text: "preview-branch", anchor: "start" },
  { x: 560,  y: 132, text: "fine-tune-v3",   anchor: "start" },
  { x: 800,  y: 132, text: "inference-v2",   anchor: "middle", special: "orange" },
  { x: 990,  y: 47,  text: "checkpoint-v3",  anchor: "start" },
  { x: 860,  y: 342, text: "llm-router",     anchor: "middle", special: "teal" },
  { x: 680,  y: 560, text: "eval-suite",     anchor: "middle" },
  { x: 1090, y: 242, text: "load-balancer",  anchor: "start" },
];

/* ─── Branch Tree SVG ─── */
function BranchTree({ hovered }: { hovered: string | null }) {
  const isRouterHovered   = hovered === "llm-router";
  const isInferenceHovered = hovered === "inference-v2";

  return (
    <svg
      viewBox="0 0 1440 620"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
          <stop offset="0%"   stopColor="#080A09" stopOpacity="0" />
          <stop offset="100%" stopColor="#080A09" stopOpacity="0.7" />
        </radialGradient>
        <linearGradient id="leftReadability" x1="0" y1="0" x2="0.35" y2="0">
          <stop offset="0%"   stopColor="#080A09" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#080A09" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="bottomFade" x1="0" y1="0.7" x2="0" y2="1">
          <stop offset="0%"   stopColor="#080A09" stopOpacity="0" />
          <stop offset="100%" stopColor="#080A09" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="topFade" x1="0" y1="0" x2="0" y2="0.15">
          <stop offset="0%"   stopColor="#080A09" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#080A09" stopOpacity="0" />
        </linearGradient>

        {/* Glow filters */}
        <filter id="glow-teal" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="glow-orange" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>

        {/* Gradient for teal node */}
        <linearGradient id="teal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#34D59A" />
          <stop offset="100%" stopColor="#1a8f65" />
        </linearGradient>

        {/* Gradient for orange node */}
        <linearGradient id="orange-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#F59D4A" />
          <stop offset="100%" stopColor="#DC6B2C" />
        </linearGradient>
      </defs>

      {/* Base branches */}
      {BRANCHES.map((b, i) => {
        const isRouter    = b.id === "router-branch";
        const isInference = b.id === "inference-branch";
        const glowing     = (isRouter && isRouterHovered) || (isInference && isInferenceHovered);

        return (
          <path
            key={i}
            d={b.d}
            stroke={
              glowing
                ? isRouter ? "#34D59A" : "#F59D4A"
                : "rgba(255,255,255,1)"
            }
            strokeWidth={glowing ? b.w * 2.2 : b.w}
            strokeOpacity={glowing ? 0.75 : b.o}
            strokeLinecap="round"
            fill="none"
            filter={glowing ? (isRouter ? "url(#glow-teal)" : "url(#glow-orange)") : undefined}
            style={{ transition: "stroke-opacity 0.3s, stroke-width 0.3s" }}
          />
        );
      })}

      {/* Animated traveling dots — always on */}
      {/* Teal dot on router branch */}
      <circle r="2.5" fill="#34D59A" fillOpacity="0.85">
        <animateMotion dur="6s" repeatCount="indefinite"
          path="M 620 438 C 680 400 760 360 860 340 C 940 324 1040 310 1160 302" />
      </circle>
      {/* Orange dot on inference branch */}
      <circle r="2.5" fill="#F59D4A" fillOpacity="0.85">
        <animateMotion dur="8s" begin="2s" repeatCount="indefinite"
          path="M 440 372 C 460 300 500 210 560 130 C 580 90 610 50 650 10" />
      </circle>
      {/* White dot on trunk */}
      <circle r="2" fill="rgba(255,255,255,0.5)">
        <animateMotion dur="10s" begin="1s" repeatCount="indefinite"
          path="M -80 680 C 60 580 180 480 340 400 C 430 360 520 330 660 310 C 780 295 900 280 1060 268" />
      </circle>

      {/* Labels */}
      {LABELS.map((l) => {
        const baseW = l.text.length * 6.4 + 16;
        const isSpecial = !!l.special;
        const isTeal    = l.special === "teal";
        const isOrange  = l.special === "orange";
        const isHov     = (isTeal && isRouterHovered) || (isOrange && isInferenceHovered);
        const w  = isSpecial ? baseW + 12 : baseW;
        const h  = isSpecial ? 22 : 18;
        const lx = l.anchor === "end"    ? l.x - w
                 : l.anchor === "middle" ? l.x - w / 2
                 :                        l.x;
        const ly = l.y - h / 2 - 2;

        if (isSpecial) {
          return (
            <g key={l.text}>
              {/* Glow halo behind pill when hovered */}
              {isHov && (
                <rect
                  x={lx - 6} y={ly - 6}
                  width={w + 12} height={h + 12}
                  rx={12}
                  fill={isTeal ? "rgba(52,213,154,0.18)" : "rgba(245,157,74,0.18)"}
                />
              )}
              {/* Gradient pill */}
              <rect
                x={lx} y={ly}
                width={w} height={h}
                rx={8}
                fill={isTeal ? "url(#teal-grad)" : "url(#orange-grad)"}
                fillOpacity={isHov ? 1 : 0.9}
                style={{ transition: "fill-opacity 0.25s" }}
              />
              {/* Border ring */}
              <rect
                x={lx} y={ly}
                width={w} height={h}
                rx={8}
                fill="none"
                stroke={isTeal ? "rgba(52,213,154,0.5)" : "rgba(245,157,74,0.5)"}
                strokeWidth={0.8}
              />
              <text
                x={l.x} y={l.y + 2}
                textAnchor={l.anchor ?? "start"}
                fill={isTeal ? "#0C0D0D" : "#0C0D0D"}
                fontSize={9.5}
                fontWeight="600"
                fontFamily="var(--font-mono), monospace"
              >
                {l.text}
              </text>
            </g>
          );
        }

        return (
          <g key={l.text}>
            <rect
              x={lx} y={l.y - 11}
              width={w} height={18}
              rx={3}
              fill="#080A09"
              fillOpacity={0.75}
              stroke="rgba(255,255,255,0.10)"
              strokeWidth={0.6}
            />
            <text
              x={l.x} y={l.y + 2}
              textAnchor={l.anchor ?? "start"}
              fill="rgba(255,255,255,0.35)"
              fontSize={9.5}
              fontFamily="var(--font-mono), monospace"
            >
              {l.text}
            </text>
          </g>
        );
      })}

      {/* Fade overlays */}
      <rect width="1440" height="620" fill="url(#vignette)" />
      <rect width="1440" height="620" fill="url(#leftReadability)" />
      <rect width="1440" height="620" fill="url(#bottomFade)" />
      <rect width="1440" height="620" fill="url(#topFade)" />
    </svg>
  );
}

/* ─── Tooltip ─── */
const TOOLTIP: Record<string, { title: string; desc: string; color: string }> = {
  "llm-router": {
    title: "LLM Router",
    desc: "Smart request routing with automatic failover, load balancing, and cost optimization across model endpoints.",
    color: "#34D59A",
  },
  "inference-v2": {
    title: "Inference Engine v2",
    desc: "Continuous batching, PagedAttention, speculative decoding — sub-50ms first-token latency at any scale.",
    color: "#F59D4A",
  },
};

export default function CTAFinal() {
  const [hovered, setHovered] = useState<string | null>(null);
  const svgRef = useRef<HTMLDivElement>(null);

  /* Convert SVG coords → DOM coords for tooltip positioning */
  const getNodePos = (label: Label) => {
    if (!svgRef.current) return { x: "50%", y: "50%" };
    const rect = svgRef.current.getBoundingClientRect();
    const vbW = 1440, vbH = 620;
    const scaleX = rect.width / vbW;
    const scaleY = rect.height / vbH;
    return {
      x: label.x * scaleX,
      y: label.y * scaleY,
    };
  };

  const hoveredLabel = LABELS.find((l) => l.text === hovered);
  const tooltipPos   = hoveredLabel ? getNodePos(hoveredLabel) : null;
  const tooltipData  = hovered ? TOOLTIP[hovered] : null;

  return (
    <section className="relative overflow-hidden" style={{ background: "#080A09" }}>
      <HalftoneEdges
        leftColor="rgba(52, 213, 154, 0.35)"
        rightColor="rgba(200, 100, 40, 0.28)"
        edgeWidth={360}
        fadeStop={88}
      />

      {/* Branch tree */}
      <div ref={svgRef} className="relative" style={{ minHeight: "clamp(500px, 62vh, 740px)" }}>
        <BranchTree hovered={hovered} />

        {/* Invisible hover targets over special nodes */}
        {LABELS.filter((l) => l.special).map((l) => {
          if (!svgRef.current) return null;
          const rect = svgRef.current.getBoundingClientRect?.();
          const vbW = 1440, vbH = 620;
          const contW = rect?.width ?? 1440;
          const contH = rect?.height ?? 620;
          const scaleX = contW / vbW;
          const scaleY = contH / vbH;
          const pw = (l.text.length * 6.4 + 28) * scaleX;
          const ph = 22 * scaleY;
          const px = (l.anchor === "middle" ? l.x - (l.text.length * 6.4 + 28) / 2 : l.x) * scaleX;
          const py = (l.y - 13) * scaleY;

          return (
            <div
              key={l.text}
              className="absolute cursor-pointer"
              style={{ left: px, top: py, width: pw, height: ph + 20, zIndex: 20 }}
              onMouseEnter={() => setHovered(l.text)}
              onMouseLeave={() => setHovered(null)}
            />
          );
        })}

        {/* Tooltip */}
        <AnimatePresence>
          {tooltipData && tooltipPos && (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.18 }}
              className="absolute z-30 pointer-events-none"
              style={{
                left: typeof tooltipPos.x === "number" ? tooltipPos.x : 0,
                top: typeof tooltipPos.y === "number" ? tooltipPos.y - 80 : 0,
                transform: "translateX(-50%)",
              }}
            >
              <div
                className="rounded-xl px-4 py-3 shadow-2xl"
                style={{
                  background: "#111215",
                  border: `1px solid ${tooltipData.color}40`,
                  minWidth: 220,
                  boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px ${tooltipData.color}20`,
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: tooltipData.color }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#F9FAFA" }}>{tooltipData.title}</span>
                </div>
                <p style={{ fontSize: 12, color: "#94979E", lineHeight: 1.55 }}>{tooltipData.desc}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Heading */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 pt-24">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              fontSize: "clamp(40px, 5.8vw, 76px)",
              fontWeight: 400,
              lineHeight: 1.06,
              letterSpacing: "-0.04em",
              color: "#F9FAFA",
              maxWidth: 680,
            }}
          >
            The world&apos;s most advanced AI platform.
          </motion.h2>
        </div>
      </div>

      {/* Bottom CTA bar */}
      <div className="relative overflow-hidden" style={{ borderTop: "none" }}>

        {/* ── Animated running-dash SVG ── */}
        <svg
          aria-hidden
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 1200 110"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Two-colour gradient filling the bar */}
            <linearGradient id="barGrad2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#34D59A" stopOpacity="0.12" />
              <stop offset="42%"  stopColor="#080A09" stopOpacity="0"    />
              <stop offset="58%"  stopColor="#080A09" stopOpacity="0"    />
              <stop offset="100%" stopColor="#F59D4A" stopOpacity="0.12" />
            </linearGradient>
            {/* Mask so dashes fade out at edges */}
            <linearGradient id="dashMask" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="white" stopOpacity="0"   />
              <stop offset="8%"   stopColor="white" stopOpacity="1"   />
              <stop offset="92%"  stopColor="white" stopOpacity="1"   />
              <stop offset="100%" stopColor="white" stopOpacity="0"   />
            </linearGradient>
            <mask id="edgeFade">
              <rect width="1200" height="110" fill="url(#dashMask)" />
            </mask>
          </defs>

          {/* Background gradient wash */}
          <rect width="1200" height="110" fill="url(#barGrad2)" />

          {/* ── Top running dash line ── */}
          <g mask="url(#edgeFade)">
            <line
              x1="0" y1="1" x2="1200" y2="1"
              stroke="#34D59A" strokeWidth="1.5"
              strokeDasharray="12 18"
              strokeLinecap="round"
              opacity="0.7"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0" to="-120"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </line>
            {/* Softer duplicate offset for depth */}
            <line
              x1="0" y1="1" x2="1200" y2="1"
              stroke="#34D59A" strokeWidth="0.5"
              strokeDasharray="6 24"
              strokeLinecap="round"
              opacity="0.3"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0" to="-120"
                dur="3.8s"
                repeatCount="indefinite"
              />
            </line>
          </g>

          {/* ── Bottom running dash line ── */}
          <g mask="url(#edgeFade)">
            <line
              x1="0" y1="109" x2="1200" y2="109"
              stroke="#34D59A" strokeWidth="1.5"
              strokeDasharray="12 18"
              strokeLinecap="round"
              opacity="0.45"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="-120" to="0"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </line>
            <line
              x1="0" y1="109" x2="1200" y2="109"
              stroke="#34D59A" strokeWidth="0.5"
              strokeDasharray="6 24"
              strokeLinecap="round"
              opacity="0.2"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="-120" to="0"
                dur="3.8s"
                repeatCount="indefinite"
              />
            </line>
          </g>
        </svg>

        <div className="relative z-10 max-w-[1200px] mx-auto px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div style={{ lineHeight: 1.5 }}>
            <p style={{ fontSize: 24, fontWeight: 400, letterSpacing: "-0.03em", color: "#F9FAFA" }}>
              Trusted by developers, ready for agents.
            </p>
            <p style={{ fontSize: 24, fontWeight: 400, letterSpacing: "-0.03em", color: "#6B7280" }}>
              Build and scale AI faster with Synapse.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#"
              className="inline-flex items-center px-6 h-11 rounded-full font-medium transition-colors"
              style={{ fontSize: 15, background: "#F9FAFA", color: "#0C0D0D" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#e5e7eb")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#F9FAFA")}
            >
              Get started
            </a>
            <a
              href="#"
              className="inline-flex items-center px-6 h-11 rounded-full transition-colors"
              style={{ fontSize: 15, color: "#F9FAFA", border: "1px solid rgba(255,255,255,0.2)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
            >
              Read the docs
            </a>
            {/* Gradient terminal button */}
            <button
              className="inline-flex items-center gap-2 px-5 h-11 rounded-xl transition-all"
              style={{
                fontSize: 14,
                background: "linear-gradient(135deg, #34D59A 0%, #1a8f65 100%)",
                color: "#0C0D0D",
                fontFamily: "var(--font-mono), monospace",
                fontWeight: 600,
                boxShadow: "0 0 24px rgba(52,213,154,0.28)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 40px rgba(52,213,154,0.55)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 24px rgba(52,213,154,0.28)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              $ npx synapsectl init
              <span style={{ opacity: 0.55, fontSize: 12 }}>⧉</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
