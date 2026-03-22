"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ─── Company logo marks (inline SVG) matching neon's style ─── */
function LogoReplit() {
  return (
    <svg height="18" viewBox="0 0 24 28" fill="none" style={{ color: "#94979E" }}>
      <path d="M0 0h8a8 8 0 0 1 0 16H0V0Z" fill="currentColor" fillOpacity={0.7}/>
      <path d="M0 16h8a8 8 0 0 1 0 16H0V16Z" fill="currentColor" fillOpacity={0.5}/>
      <path d="M8 8h8a8 8 0 0 1 0 16H8V8Z" fill="currentColor" fillOpacity={0.6}/>
      <text x="26" y="20" fontSize="13" fontFamily="inherit" fontWeight="500" fill="currentColor" fillOpacity={0.7}>replit</text>
    </svg>
  );
}
function LogoDoorDash() {
  return (
    <svg height="16" viewBox="0 0 110 20" fill="none" style={{ color: "#94979E" }}>
      <rect x="0" y="2" width="16" height="16" rx="4" fill="currentColor" fillOpacity={0.6}/>
      <path d="M5 6h6a4 4 0 0 1 0 8H5V6Z" fill="#0C0D0D"/>
      <text x="22" y="15" fontSize="13" fontFamily="inherit" fontWeight="600" fill="currentColor" fillOpacity={0.7} letterSpacing="0.5">DOORDASH</text>
    </svg>
  );
}
function LogoFramer() {
  return (
    <svg height="16" viewBox="0 0 80 20" fill="none" style={{ color: "#94979E" }}>
      <path d="M0 0h14v7H7L0 0Z" fill="currentColor" fillOpacity={0.7}/>
      <path d="M0 7h7l7 7H0V7Z" fill="currentColor" fillOpacity={0.5}/>
      <path d="M7 14l7 7V14H7Z" fill="currentColor" fillOpacity={0.6}/>
      <text x="20" y="15" fontSize="13" fontFamily="inherit" fontWeight="500" fill="currentColor" fillOpacity={0.7}>Framer</text>
    </svg>
  );
}
function LogoRetool() {
  return (
    <svg height="16" viewBox="0 0 78 20" fill="none" style={{ color: "#94979E" }}>
      <rect x="0" y="1" width="16" height="16" rx="3" fill="currentColor" fillOpacity={0.15}/>
      <path d="M4 5h5a3 3 0 0 1 0 6H4V5ZM4 11l4 5" stroke="currentColor" strokeWidth="1.8" strokeOpacity={0.7} strokeLinecap="round"/>
      <text x="21" y="15" fontSize="13" fontFamily="inherit" fontWeight="500" fill="currentColor" fillOpacity={0.7}>Retool</text>
    </svg>
  );
}
function LogoOutfront() {
  return (
    <svg height="14" viewBox="0 0 102 18" fill="none" style={{ color: "#94979E" }}>
      <text x="0" y="14" fontSize="13" fontFamily="inherit" fontWeight="700" fill="currentColor" fillOpacity={0.7} letterSpacing="0.3">OUTFRONT/</text>
    </svg>
  );
}
function LogoVercel() {
  return (
    <svg height="16" viewBox="0 0 72 20" fill="none" style={{ color: "#94979E" }}>
      <path d="M8 2L16 18H0L8 2Z" fill="currentColor" fillOpacity={0.7}/>
      <text x="22" y="15" fontSize="13" fontFamily="inherit" fontWeight="500" fill="currentColor" fillOpacity={0.7}>Vercel</text>
    </svg>
  );
}
function LogoLinear() {
  return (
    <svg height="16" viewBox="0 0 70 20" fill="none" style={{ color: "#94979E" }}>
      <circle cx="8" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" strokeOpacity={0.6}/>
      <path d="M3 15L13 5" stroke="currentColor" strokeWidth="1.5" strokeOpacity={0.6} strokeLinecap="round"/>
      <text x="21" y="15" fontSize="13" fontFamily="inherit" fontWeight="500" fill="currentColor" fillOpacity={0.7}>Linear</text>
    </svg>
  );
}
function LogoMeta() {
  return (
    <svg height="16" viewBox="0 0 68 20" fill="none" style={{ color: "#94979E" }}>
      <path d="M2 12c0-3 1.5-5.5 3-5.5 1 0 2 1.5 3 3.5 1-2 2-3.5 3-3.5 1.5 0 3 2.5 3 5.5a2.5 2.5 0 0 1-5 0c0 1.5-.5 2.5-1 2.5s-1-1-1-2.5a2.5 2.5 0 0 1-5 0Z" stroke="currentColor" strokeWidth="1.4" strokeOpacity={0.7} fill="none"/>
      <text x="18" y="15" fontSize="13" fontFamily="inherit" fontWeight="500" fill="currentColor" fillOpacity={0.7}>Meta</text>
    </svg>
  );
}

const LOGO_COMPONENTS = [LogoReplit, LogoDoorDash, LogoFramer, LogoRetool, LogoOutfront, LogoVercel, LogoLinear, LogoMeta];

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
            <div className="flex items-center gap-10 overflow-hidden flex-wrap">
              {LOGO_COMPONENTS.map((Logo, i) => (
                <div key={i} className="shrink-0 flex items-center opacity-60 hover:opacity-90 transition-opacity">
                  <Logo />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
