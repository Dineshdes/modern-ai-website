"use client";

import { motion } from "framer-motion";
import HalftoneEdges from "@/components/ui/halftone-edges";

/* ─── Branch tree data ─── */
interface Branch {
  d: string;
  w: number;
  o: number;
}

/* Organic tree branches — Neon-style */
const BRANCHES: Branch[] = [
  /* ── Trunk A — heavy root sweeping up from lower-left ── */
  { d: "M -80 680 C 60 580 180 480 340 400", w: 7, o: 0.22 },
  { d: "M 340 400 C 430 360 520 330 660 310", w: 5.5, o: 0.18 },
  { d: "M 660 310 C 780 295 900 280 1060 268", w: 4, o: 0.15 },
  { d: "M 1060 268 C 1180 258 1300 248 1440 238", w: 2.8, o: 0.10 },

  /* ── Trunk B — second root from bottom, lower arc ── */
  { d: "M -40 720 C 80 640 200 560 360 500", w: 6, o: 0.18 },
  { d: "M 360 500 C 460 460 580 430 720 415", w: 4, o: 0.14 },
  { d: "M 720 415 C 840 402 960 390 1100 380", w: 2.5, o: 0.10 },

  /* ── Branch from trunk A @ 340,400 — sweeps up-left ── */
  { d: "M 200 470 C 190 400 170 310 130 210", w: 3.5, o: 0.16 },
  { d: "M 130 210 C 110 160 80 100 40 40",    w: 2.2, o: 0.12 },
  { d: "M 130 210 C 150 160 180 110 230 70",  w: 1.8, o: 0.10 },
  { d: "M 230 70 C 250 40 280 18 310 0",      w: 1.2, o: 0.08 },

  /* ── Branch from trunk A @ 440,370 — goes up-center ── */
  { d: "M 440 372 C 460 300 500 210 560 130", w: 3, o: 0.15 },
  { d: "M 560 130 C 580 90 610 50 650 10",   w: 1.8, o: 0.10 },
  { d: "M 560 130 C 590 100 630 80 680 60",  w: 1.4, o: 0.09 },

  /* ── Branch from trunk A @ 560,325 — goes upper right ── */
  { d: "M 560 325 C 620 260 700 190 800 130", w: 2.8, o: 0.14 },
  { d: "M 800 130 C 860 100 920 70 990 45",  w: 1.8, o: 0.10 },
  { d: "M 800 130 C 840 105 880 90 930 80",  w: 1.3, o: 0.08 },
  { d: "M 990 45 C 1030 28 1080 12 1140 0",  w: 1.0, o: 0.07 },

  /* ── Branch from trunk A @ 750,295 — goes right with slight arc ── */
  { d: "M 750 296 C 850 270 960 250 1090 240", w: 2.2, o: 0.12 },
  { d: "M 1090 240 C 1180 232 1280 224 1400 218", w: 1.4, o: 0.08 },

  /* ── Branch from trunk B @ 440,482 — drops down-right ── */
  { d: "M 440 482 C 500 510 580 540 680 558", w: 2.5, o: 0.13 },
  { d: "M 680 558 C 760 572 860 580 960 578", w: 1.8, o: 0.09 },

  /* ── Branch from trunk B @ 620,438 — goes up slightly ── */
  { d: "M 620 438 C 680 400 760 360 860 340", w: 2, o: 0.12 },
  { d: "M 860 340 C 940 324 1040 310 1160 302", w: 1.4, o: 0.08 },

  /* ── Fine twigs at extremities ── */
  { d: "M 40 40 C 20 20 -10 8 -40 0",    w: 1, o: 0.07 },
  { d: "M 40 40 C 50 20 70 8 100 0",     w: 0.8, o: 0.06 },
  { d: "M 930 80 C 970 60 1020 42 1080 30", w: 0.9, o: 0.07 },
  { d: "M 1160 302 C 1260 290 1360 280 1440 274", w: 1, o: 0.07 },
  { d: "M 960 578 C 1040 574 1140 566 1240 556", w: 1.2, o: 0.08 },
  { d: "M 650 10 C 680 0 720 -8 760 -12", w: 0.8, o: 0.06 },
];

/* Branch-tip labels */
interface Label {
  x: number;
  y: number;
  text: string;
  anchor?: "start" | "middle" | "end";
}

const LABELS: Label[] = [
  { x: 130, y: 210, text: "staging-env",    anchor: "end" },
  { x: 40,  y: 42,  text: "production",     anchor: "end" },
  { x: 230, y: 72,  text: "preview-branch", anchor: "start" },
  { x: 560, y: 132, text: "fine-tune-v3",   anchor: "start" },
  { x: 800, y: 132, text: "inference-v2",   anchor: "middle" },
  { x: 990, y: 47,  text: "checkpoint-v3",  anchor: "start" },
  { x: 860, y: 342, text: "llm-router",     anchor: "middle" },
  { x: 680, y: 560, text: "eval-suite",     anchor: "middle" },
  { x: 1090, y: 242, text: "load-balancer", anchor: "start" },
];

function BranchTree() {
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
        {/* Vignette: fade edges */}
        <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
          <stop offset="0%"   stopColor="#080A09" stopOpacity="0" />
          <stop offset="100%" stopColor="#080A09" stopOpacity="0.7" />
        </radialGradient>

        {/* Left fade so heading stays readable */}
        <linearGradient id="leftReadability" x1="0" y1="0" x2="0.35" y2="0">
          <stop offset="0%"   stopColor="#080A09" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#080A09" stopOpacity="0" />
        </linearGradient>

        {/* Bottom fade */}
        <linearGradient id="bottomFade" x1="0" y1="0.7" x2="0" y2="1">
          <stop offset="0%"   stopColor="#080A09" stopOpacity="0" />
          <stop offset="100%" stopColor="#080A09" stopOpacity="0.9" />
        </linearGradient>

        {/* Top fade */}
        <linearGradient id="topFade" x1="0" y1="0" x2="0" y2="0.15">
          <stop offset="0%"   stopColor="#080A09" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#080A09" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Branches */}
      {BRANCHES.map((b, i) => (
        <path
          key={i}
          d={b.d}
          stroke="rgba(255,255,255,1)"
          strokeWidth={b.w}
          strokeOpacity={b.o}
          strokeLinecap="round"
          fill="none"
        />
      ))}

      {/* Labels */}
      {LABELS.map((l) => {
        const w = l.text.length * 6.4 + 16;
        const lx = l.anchor === "end"    ? l.x - w
                 : l.anchor === "middle" ? l.x - w / 2
                 :                        l.x;
        return (
          <g key={l.text}>
            <rect
              x={lx}
              y={l.y - 11}
              width={w}
              height={18}
              rx={3}
              fill="#080A09"
              fillOpacity={0.75}
              stroke="rgba(255,255,255,0.10)"
              strokeWidth={0.6}
            />
            <text
              x={l.x}
              y={l.y + 2}
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

export default function CTAFinal() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#080A09" }}>
      <HalftoneEdges
        leftColor="rgba(52, 213, 154, 0.35)"
        rightColor="rgba(200, 100, 40, 0.28)"
        edgeWidth={360}
        fadeStop={88}
      />

      {/* Branch tree visualization */}
      <div
        className="relative"
        style={{ minHeight: "clamp(500px, 62vh, 740px)" }}
      >
        <BranchTree />

        {/* Heading overlaid on left */}
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
      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1400px] mx-auto px-8 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div style={{ color: "#94979E", lineHeight: 1.6 }}>
            <p style={{ fontSize: 17 }}>Trusted by developers, ready for agents.</p>
            <p style={{ fontSize: 17 }}>Build and scale AI faster with Synapse.</p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#"
              className="inline-flex items-center px-6 h-11 rounded-full font-medium transition-colors"
              style={{ fontSize: 16, background: "#F9FAFA", color: "#0C0D0D" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#e5e7eb")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#F9FAFA")}
            >
              Get started
            </a>
            <a
              href="#"
              className="inline-flex items-center px-6 h-11 rounded-full transition-colors"
              style={{ fontSize: 16, color: "#F9FAFA", border: "1px solid rgba(255,255,255,0.2)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
            >
              Read the docs
            </a>
            <button
              className="inline-flex items-center gap-2 px-5 h-11 rounded-xl transition-colors"
              style={{
                fontSize: 15,
                background: "#34D59A",
                color: "#0C0D0D",
                fontFamily: "var(--font-mono), monospace",
                fontWeight: 500,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#2cb885")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#34D59A")}
            >
              $ npx synapsectl init
              <span style={{ opacity: 0.6, fontSize: 13 }}>⧉</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
