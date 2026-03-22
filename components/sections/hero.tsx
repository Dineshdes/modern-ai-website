"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ─── Exact company logos as neon uses (inline SVG style) ─── */
const COMPANIES = [
  { name: "Replit", w: 56 },
  { name: "DoorDash", w: 80 },
  { name: "Framer", w: 60 },
  { name: "Retool", w: 56 },
  { name: "Outfront", w: 72 },
  { name: "Vercel", w: 56 },
  { name: "Linear", w: 52 },
  { name: "Notion", w: 56 },
];

/* ─── Animated bars canvas ─── */
function HeroBars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* Each bar: random base height, phase offset, animation speed */
    const N = 120;
    const bars = Array.from({ length: N }, (_, i) => {
      // Create clusters of tall bars scattered across the width
      const x = i / N;
      const inPeak = Math.abs(x - 0.56) < 0.06; // main bright peak
      const inSecondary = Math.abs(x - 0.38) < 0.04 || Math.abs(x - 0.72) < 0.03;
      return {
        baseH: inPeak
          ? Math.random() * 0.3 + 0.6
          : inSecondary
          ? Math.random() * 0.25 + 0.4
          : Math.random() * 0.45 + 0.08,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.3 + 0.15,
        isTallCluster: inPeak || inSecondary,
      };
    });

    const peakI = Math.floor(N * 0.56);
    let raf: number;

    const draw = (ts: number) => {
      ctx.clearRect(0, 0, W, H);
      const t = ts * 0.00025;
      const bw = W / N;

      bars.forEach((bar, i) => {
        const wave = Math.sin(t * bar.speed + bar.phase) * 0.1;
        const bh = Math.min(H * (bar.baseH + wave), H * 0.98);
        const x = i * bw;
        const cx = x + bw / 2;

        const dist = Math.abs(i - peakI);
        const proximity = Math.max(0, 1 - dist / (N * 0.38));
        const isPeak = dist < 3;

        const grad = ctx.createLinearGradient(cx, H - bh, cx, H);

        if (isPeak) {
          // Neon white/yellow peak bar
          grad.addColorStop(0, "rgba(230, 255, 210, 0.98)");
          grad.addColorStop(0.08, "rgba(180, 255, 160, 0.94)");
          grad.addColorStop(0.25, "rgba(52, 213, 154, 0.88)");
          grad.addColorStop(0.6, "rgba(30, 140, 90, 0.55)");
          grad.addColorStop(1, "rgba(10, 60, 40, 0.2)");
        } else if (proximity > 0.5) {
          const alpha = 0.12 + proximity * 0.55;
          const g = Math.floor(130 + proximity * 83);
          grad.addColorStop(0, `rgba(20, ${g}, 70, ${alpha})`);
          grad.addColorStop(0.5, `rgba(12, ${Math.floor(g * 0.6)}, 50, ${alpha * 0.65})`);
          grad.addColorStop(1, `rgba(5, 25, 20, ${alpha * 0.2})`);
        } else {
          const alpha = 0.05 + proximity * 0.2;
          const g = Math.floor(80 + proximity * 70);
          grad.addColorStop(0, `rgba(10, ${g}, 50, ${alpha})`);
          grad.addColorStop(1, `rgba(3, 18, 14, ${alpha * 0.3})`);
        }

        ctx.fillStyle = grad;
        ctx.fillRect(x + 1.2, H - bh, bw - 2.4, bh);
      });

      /* Left-side gradient fade — heavy, so text is readable */
      const lg = ctx.createLinearGradient(0, 0, W * 0.48, 0);
      lg.addColorStop(0, "rgba(12,13,13,1)");
      lg.addColorStop(0.55, "rgba(12,13,13,0.82)");
      lg.addColorStop(0.85, "rgba(12,13,13,0.25)");
      lg.addColorStop(1, "rgba(12,13,13,0)");
      ctx.fillStyle = lg;
      ctx.fillRect(0, 0, W, H);

      /* Bottom fade */
      const bg = ctx.createLinearGradient(0, H * 0.6, 0, H);
      bg.addColorStop(0, "rgba(12,13,13,0)");
      bg.addColorStop(1, "rgba(12,13,13,0.95)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      /* Subtle top edge darkness */
      const topG = ctx.createLinearGradient(0, 0, 0, H * 0.12);
      topG.addColorStop(0, "rgba(12,13,13,0.7)");
      topG.addColorStop(1, "rgba(12,13,13,0)");
      ctx.fillStyle = topG;
      ctx.fillRect(0, 0, W, H);

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden />;
}

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "calc(100vh - 56px)", backgroundColor: "#0a1410" }}
    >
      {/* Canvas bars */}
      <HeroBars />

      {/* Content — bottom left pinned, matches neon's pt-[409px] approach */}
      <div
        className="relative z-20 flex flex-col justify-end"
        style={{ minHeight: "calc(100vh - 56px)" }}
      >
        <div
          className="w-full px-8 pb-16"
          style={{ maxWidth: 1600, margin: "0 auto" }}
        >
          {/* "A DATABRICKS COMPANY" label */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 mb-7"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6L6 1L11 6L6 11L1 6Z" fill="#ef4444" />
            </svg>
            <span
              className="text-[11px] uppercase tracking-[0.18em]"
              style={{ color: "#94979E", fontFamily: "var(--font-mono), monospace" }}
            >
              A DATABRICKS COMPANY
            </span>
          </motion.div>

          {/* H1 — exact neon sizing: 60px, weight 400, -2.4px tracking */}
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "clamp(40px, 5.2vw, 62px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-2.4px",
              color: "#F9FAFA",
              maxWidth: 640,
            }}
          >
            Fast AI Inference for Teams and Agents
          </motion.h1>

          {/* CTAs */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mt-9"
          >
            <a
              href="#"
              className="inline-flex items-center px-6 h-11 rounded-full text-[15px] font-medium transition-colors"
              style={{ background: "#F9FAFA", color: "#0C0D0D" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#e5e7eb")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#F9FAFA")}
            >
              Get started
            </a>
            <a
              href="#"
              className="inline-flex items-center px-6 h-11 rounded-full text-[15px] transition-colors"
              style={{ color: "#F9FAFA", border: "1px solid rgba(255,255,255,0.22)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)")}
            >
              Read the docs
            </a>
          </motion.div>

          {/* Company logos — thin line separator + logos row */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 28 }}
          >
            <div className="flex items-center gap-12 overflow-hidden flex-wrap">
              {COMPANIES.map(({ name }) => (
                <span
                  key={name}
                  className="text-[15px] font-medium tracking-tight whitespace-nowrap shrink-0"
                  style={{ color: "#94979E" }}
                >
                  {name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
