"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ─── Company logo marks matching neon's style: icon mark + wordmark ─── */
const LOGOS: { icon: React.ReactNode; label: string }[] = [
  {
    label: "replit",
    icon: (
      <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor">
        <path d="M0 0h6a4 4 0 0 1 0 8H0V0Z" fillOpacity={0.8}/>
        <path d="M0 8h6a4 4 0 0 1 0 8H0V8Z" fillOpacity={0.5}/>
        <path d="M6 4h6a4 4 0 0 1 0 8H6V4Z" fillOpacity={0.65}/>
      </svg>
    ),
  },
  {
    label: "OUTFRONT/",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
        <rect width="14" height="14" rx="2" fillOpacity={0.7}/>
        <path d="M3 3h5v3H5v2h3v3H3V3Z" fill="#0C0D0D"/>
      </svg>
    ),
  },
  {
    label: "DoorDash",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
        <rect width="14" height="14" rx="3" fillOpacity={0.7}/>
        <path d="M4 4h4a3 3 0 0 1 0 6H4V4Z" fill="#0C0D0D"/>
      </svg>
    ),
  },
  {
    label: "Retool",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect width="14" height="14" rx="2" fill="currentColor" fillOpacity={0.15}/>
        <path d="M3 3h5a2.5 2.5 0 0 1 0 5H3V3ZM3 8l4 4" stroke="currentColor" strokeWidth="1.6" strokeOpacity={0.8} strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Framer",
    icon: (
      <svg width="11" height="16" viewBox="0 0 11 16" fill="currentColor">
        <path d="M0 0h11v5.5H5.5L0 0Z" fillOpacity={0.8}/>
        <path d="M0 5.5h5.5L11 11H0V5.5Z" fillOpacity={0.6}/>
        <path d="M5.5 11L11 16.5V11H5.5Z" fillOpacity={0.7}/>
      </svg>
    ),
  },
  {
    label: "Vercel",
    icon: (
      <svg width="14" height="12" viewBox="0 0 14 12" fill="currentColor">
        <path d="M7 0L14 12H0L7 0Z" fillOpacity={0.8}/>
      </svg>
    ),
  },
  {
    label: "Linear",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="6.5" stroke="currentColor" strokeWidth="1.4" strokeOpacity={0.7}/>
        <path d="M2.5 11.5L11.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeOpacity={0.7} strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Meta",
    icon: (
      <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
        <path d="M1.5 8c0-2 1-4 2.5-4 .8 0 1.7 1.2 2.5 2.8C7.3 5.2 8.2 4 9 4c1.5 0 2.5 2 2.5 4s-.7 2.2-1.75 2.2c-.5 0-.75-.6-.75-1.2C9 10.4 8.7 11 8 11s-1-.6-1-2.2c-1.05 0-1.75-.7-1.75-2.2a2.25 2.25 0 0 1-4.5 0" stroke="currentColor" strokeWidth="1.3" strokeOpacity={0.75} strokeLinecap="round"/>
      </svg>
    ),
  },
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

      {/* Content — positioned to match neon's above-fold layout */}
      <div
        className="relative z-20"
        style={{ paddingTop: "clamp(220px, 40vh, 400px)", paddingBottom: 80 }}
      >
        <div
          className="w-full px-8"
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
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 400,
              lineHeight: 1.125,
              letterSpacing: "-0.04em",
              color: "#F9FAFA",
              maxWidth: 890,
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
            <div className="flex items-center gap-10 overflow-hidden flex-wrap">
              {LOGOS.map(({ icon, label }) => (
                <div key={label} className="shrink-0 flex items-center gap-2 opacity-55 hover:opacity-85 transition-opacity" style={{ color: "#94979E" }}>
                  {icon}
                  <span className="text-[13px] font-medium" style={{ letterSpacing: label === "OUTFRONT/" ? "0.04em" : "-0.01em" }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
