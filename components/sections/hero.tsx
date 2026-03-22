"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const COMPANIES = [
  "Meta", "Bitso", "Framer", "Replit", "DoorDash", "BCG", "Vercel", "Linear", "Notion", "Stripe",
];

function AnimatedBars() {
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

    const N = 100;
    const bars = Array.from({ length: N }, (_, i) => ({
      baseH: Math.random() * 0.55 + 0.08,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.5 + 0.2,
      // make some bars very tall
      isTall: Math.random() < 0.12,
    }));

    // Peak bar at ~55% from left
    const peakI = Math.floor(N * 0.55);

    let raf: number;

    const draw = (ts: number) => {
      ctx.clearRect(0, 0, W, H);
      const t = ts * 0.0004;
      const bw = W / N;

      bars.forEach((bar, i) => {
        const wave = Math.sin(t * bar.speed + bar.phase) * 0.12;
        const base = bar.isTall ? Math.random() * 0.3 + 0.55 : bar.baseH;
        const bh = Math.min(H * (base + wave), H * 0.96);
        const x = i * bw;

        const dist = Math.abs(i - peakI);
        const proximity = Math.max(0, 1 - dist / (N * 0.4));
        const isPeak = dist < 2;

        const grad = ctx.createLinearGradient(x, H - bh, x, H);
        if (isPeak) {
          grad.addColorStop(0, "rgba(240, 255, 200, 0.96)");
          grad.addColorStop(0.12, "rgba(180, 255, 150, 0.92)");
          grad.addColorStop(0.4, "rgba(0, 229, 153, 0.75)");
          grad.addColorStop(0.8, "rgba(0, 120, 80, 0.4)");
          grad.addColorStop(1, "rgba(0, 50, 35, 0.2)");
        } else {
          const alpha = 0.08 + proximity * 0.55;
          const g = Math.floor(140 + proximity * 89);
          grad.addColorStop(0, `rgba(10, ${g}, 70, ${alpha})`);
          grad.addColorStop(0.6, `rgba(5, ${Math.floor(g * 0.5)}, 45, ${alpha * 0.6})`);
          grad.addColorStop(1, `rgba(2, 20, 15, ${alpha * 0.25})`);
        }

        ctx.fillStyle = grad;
        ctx.fillRect(x + 1, H - bh, bw - 2, bh);
      });

      // Left fade — heavy, to let text breathe
      const lg = ctx.createLinearGradient(0, 0, W * 0.42, 0);
      lg.addColorStop(0, "rgba(0,0,0,1)");
      lg.addColorStop(0.7, "rgba(0,0,0,0.65)");
      lg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = lg;
      ctx.fillRect(0, 0, W * 0.42, H);

      // Bottom fade
      const bg = ctx.createLinearGradient(0, H * 0.65, 0, H);
      bg.addColorStop(0, "rgba(0,0,0,0)");
      bg.addColorStop(1, "rgba(0,0,0,0.92)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden
    />
  );
}

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "calc(100vh - 40px)", backgroundColor: "#050e0a" }}
    >
      {/* Animated bars */}
      <AnimatedBars />

      {/* Content pinned to bottom-left */}
      <div
        className="relative z-30 flex flex-col justify-end"
        style={{ minHeight: "calc(100vh - 40px)" }}
      >
        <div
          className="w-full pb-16 px-8"
          style={{ maxWidth: 1600, margin: "0 auto" }}
        >
          {/* Badge */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.55 }}
            className="flex items-center gap-2 mb-7"
          >
            <span style={{ color: "#ef4444", fontSize: 9, lineHeight: 1 }}>▶</span>
            <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#797D86]">
              A DATABRICKS COMPANY
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-normal text-white"
            style={{
              fontSize: "clamp(42px,5vw,60px)",
              lineHeight: 1.125,
              letterSpacing: "-2.4px",
              maxWidth: "620px",
            }}
          >
            Fast AI Inference for Teams and Agents
          </motion.h1>

          {/* CTAs */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="flex items-center gap-3 mt-8"
          >
            <a
              href="#"
              className="bg-white text-black font-medium inline-flex items-center px-6 h-11 rounded-full text-[15px] hover:bg-white/90 transition-colors"
            >
              Get started
            </a>
            <a
              href="#"
              className="border border-white/25 text-white inline-flex items-center px-6 h-11 rounded-full text-[15px] hover:border-white/40 transition-colors"
            >
              Read the docs
            </a>
          </motion.div>

          {/* Separator + company logos */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.55, delay: 0.26 }}
            className="mt-14 pt-7 border-t border-white/[0.07]"
          >
            <div className="flex items-center gap-10 overflow-hidden">
              {COMPANIES.map((name) => (
                <span
                  key={name}
                  className="text-[15px] font-medium text-white/22 whitespace-nowrap shrink-0 tracking-tight"
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
