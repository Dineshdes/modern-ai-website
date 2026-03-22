"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

/* ── Subtle halftone dot backgrounds ── */
function HalftoneBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1400 680"
      aria-hidden
      style={{ pointerEvents: "none" }}
    >
      <defs>
        <pattern id="tdot" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="8" cy="8" r="2.4" fill="#34D59A" />
        </pattern>
        <pattern id="odot" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="8" cy="8" r="2.4" fill="#F97316" />
        </pattern>
        <linearGradient id="fL" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.55" />
          <stop offset="45%"  stopColor="white" stopOpacity="0.2" />
          <stop offset="75%"  stopColor="white" stopOpacity="0.04" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fR" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.55" />
          <stop offset="45%"  stopColor="white" stopOpacity="0.2" />
          <stop offset="75%"  stopColor="white" stopOpacity="0.04" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="mL"><rect x="0"   y="0" width="560" height="680" fill="url(#fL)" /></mask>
        <mask id="mR"><rect x="840" y="0" width="560" height="680" fill="url(#fR)" /></mask>
      </defs>
      <rect x="0"   y="0" width="560" height="680" fill="url(#tdot)" mask="url(#mL)" />
      <rect x="840" y="0" width="560" height="680" fill="url(#odot)" mask="url(#mR)" />
    </svg>
  );
}

/* ── Dual-handle autoscaling slider ── */
const SCALE_POINTS = [0.25, 0.5, 1, 2, 3, 4];
const RAM_MAP: Record<number, number> = { 0.25: 1, 0.5: 2, 1: 4, 2: 8, 3: 10, 4: 16 };

function AutoscalingSlider() {
  const [minIdx, setMinIdx] = useState(1); // 0.5 vCPU
  const [maxIdx, setMaxIdx] = useState(4); // 3 vCPU
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<"min"|"max"|null>(null);

  const pct = (i: number) => (i / (SCALE_POINTS.length - 1)) * 100;
  const minPct = pct(minIdx);
  const maxPct = pct(maxIdx);

  const getIdxFromX = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return 0;
    const { left, width } = track.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - left) / width));
    return Math.round(ratio * (SCALE_POINTS.length - 1));
  }, []);

  const onPointerDown = (handle: "min"|"max") => (e: React.PointerEvent) => {
    dragging.current = handle;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const idx = getIdxFromX(e.clientX);
    if (dragging.current === "min" && idx < maxIdx) setMinIdx(idx);
    if (dragging.current === "max" && idx > minIdx) setMaxIdx(idx);
  };

  const onPointerUp = () => { dragging.current = null; };

  return (
    <div>
      <p style={{ fontSize: 13, color: "#94979E", marginBottom: 20, letterSpacing: "0.01em" }}>
        Autoscaling
      </p>

      {/* Track */}
      <div
        ref={trackRef}
        className="relative select-none"
        style={{ height: 28, cursor: "pointer" }}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* Base track */}
        <div
          style={{
            position: "absolute",
            left: 0, right: 0,
            top: "50%", transform: "translateY(-50%)",
            height: 2,
            background: "rgba(255,255,255,0.1)",
            borderRadius: 1,
          }}
        />
        {/* Active (green) track */}
        <div
          style={{
            position: "absolute",
            left: `${minPct}%`,
            width: `${maxPct - minPct}%`,
            top: "50%", transform: "translateY(-50%)",
            height: 2,
            background: "#34D59A",
            borderRadius: 1,
          }}
        />

        {/* Min handle */}
        <div
          onPointerDown={onPointerDown("min")}
          style={{
            position: "absolute",
            left: `${minPct}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 14, height: 14,
            borderRadius: "50%",
            background: "#34D59A",
            cursor: "grab",
            zIndex: 3,
            boxShadow: "0 0 0 3px rgba(52,213,154,0.2)",
          }}
        />

        {/* Max handle */}
        <div
          onPointerDown={onPointerDown("max")}
          style={{
            position: "absolute",
            left: `${maxPct}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 14, height: 14,
            borderRadius: "50%",
            background: "#34D59A",
            cursor: "grab",
            zIndex: 3,
            boxShadow: "0 0 0 3px rgba(52,213,154,0.2)",
          }}
        />
      </div>

      {/* Scale marks */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        {SCALE_POINTS.map((pt) => (
          <span
            key={pt}
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.3)",
              fontFamily: "var(--font-mono), monospace",
            }}
          >
            {pt}
          </span>
        ))}
      </div>

      {/* Scale info */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, gap: 16 }}>
        <div>
          <p style={{ fontSize: 11, color: "#94979E", marginBottom: 4 }}>Scale from</p>
          <p style={{ fontSize: 16, color: "#F9FAFA", fontWeight: 400, letterSpacing: "-0.02em" }}>
            {SCALE_POINTS[minIdx]} vCPU, {RAM_MAP[SCALE_POINTS[minIdx]]} RAM
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: 11, color: "#94979E", marginBottom: 4 }}>Scale up to</p>
          <p style={{ fontSize: 16, color: "#F9FAFA", fontWeight: 400, letterSpacing: "-0.02em" }}>
            {SCALE_POINTS[maxIdx]} vCPU, {RAM_MAP[SCALE_POINTS[maxIdx]]} RAM
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CTAFinal() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npx synapsectl init");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden" style={{ background: "#0C0D0D" }}>
      <HalftoneBackground />

      {/* Main content: heading left + slider right */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          style={{ paddingTop: "clamp(80px, 12vh, 160px)", paddingBottom: "clamp(80px, 12vh, 160px)" }}
        >
          {/* Left: big heading */}
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              fontSize: "clamp(52px, 7.5vw, 104px)",
              fontWeight: 400,
              lineHeight: 1.04,
              letterSpacing: "-0.04em",
              color: "#F9FAFA",
            }}
          >
            The world&apos;s most advanced AI platform.
          </motion.h2>

          {/* Right: slider */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12 }}
            style={{ maxWidth: 480, width: "100%" }}
          >
            <AutoscalingSlider />
          </motion.div>
        </div>
      </div>

      {/* Bottom CTA bar */}
      <div className="relative z-10 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div
          className="max-w-[1400px] mx-auto px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
        >
          <p style={{ fontSize: 15, color: "rgba(249,250,250,0.55)", lineHeight: 1.5 }}>
            Trusted by developers, ready for agents.<br />
            Build and scale AI faster with Synapse.
          </p>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            {/* Get started */}
            <a
              href="#"
              className="inline-flex items-center h-10 px-5 rounded-full text-[14px] font-medium transition-colors"
              style={{ background: "#F9FAFA", color: "#0C0D0D" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#e5e7eb")}
              onMouseLeave={e => (e.currentTarget.style.background = "#F9FAFA")}
            >
              Get started
            </a>

            {/* Read the docs */}
            <a
              href="#"
              className="inline-flex items-center h-10 px-5 rounded-full text-[14px] transition-colors"
              style={{ color: "rgba(249,250,250,0.7)", border: "1px solid rgba(255,255,255,0.18)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)")}
            >
              Read the docs
            </a>

            {/* CLI command — copyable */}
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2.5 h-10 px-4 rounded-xl text-[13px] transition-all"
              style={{
                background: "#131415",
                color: "rgba(249,250,250,0.7)",
                border: "1px solid rgba(255,255,255,0.1)",
                fontFamily: "var(--font-mono), monospace",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
            >
              <span style={{ color: "#94979E" }}>$</span>
              <span>npx synapsectl init</span>
              <span
                style={{
                  fontSize: 11,
                  color: copied ? "#34D59A" : "#6b7280",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 4,
                  padding: "1px 5px",
                  transition: "color 0.2s",
                }}
              >
                {copied ? "✓" : "⧉"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
