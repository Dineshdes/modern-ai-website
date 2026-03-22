"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

/* ─── Node labels for the neural network visualization ─── */
const NODES = [
  { id: "llama-3.1-70b", x: 0.05, y: 0.18 },
  { id: "embedding-api", x: 0.12, y: 0.55 },
  { id: "inference-v2", x: 0.28, y: 0.32 },
  { id: "fine-tune-job", x: 0.22, y: 0.75 },
  { id: "agent-runtime", x: 0.45, y: 0.15 },
  { id: "model-endpoint", x: 0.50, y: 0.50 },
  { id: "mixtral-8x7b", x: 0.68, y: 0.30 },
  { id: "gpu-cluster", x: 0.40, y: 0.82 },
  { id: "serving-pool", x: 0.78, y: 0.58 },
  { id: "checkpoint-v3", x: 0.88, y: 0.20 },
  { id: "vector-store", x: 0.15, y: 0.38 },
  { id: "batch-worker", x: 0.62, y: 0.72 },
  { id: "load-balancer", x: 0.92, y: 0.45 },
  { id: "quantize-v2", x: 0.35, y: 0.55 },
];

/* ─── Connections between nodes (index pairs) ─── */
const EDGES: [number, number][] = [
  [0, 2], [0, 10], [1, 2], [1, 3], [10, 2], [10, 13],
  [2, 4], [2, 5], [13, 5], [3, 5], [3, 7], [3, 13],
  [4, 6], [5, 6], [5, 7], [5, 11], [6, 8], [6, 9],
  [4, 9], [7, 8], [7, 11], [8, 12], [9, 12], [11, 8],
  [1, 13], [11, 12],
];

/* ─── Canvas-based neural network flow visualization ─── */
function NetworkVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const draw = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, ts: number) => {
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const t = ts * 0.0001;

    /* Resolve node pixel positions */
    const pts = NODES.map((n) => ({
      x: n.x * W,
      y: n.y * H,
      id: n.id,
    }));

    /* Draw edges as stippled/dithered flowing lines */
    EDGES.forEach(([a, b]) => {
      const from = pts[a];
      const to = pts[b];
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.floor(dist / 2.5);

      /* Bezier control point for organic curve */
      const midX = (from.x + to.x) / 2;
      const midY = (from.y + to.y) / 2;
      const perpX = -(dy / dist) * dist * 0.15;
      const perpY = (dx / dist) * dist * 0.15;
      const ctrlX = midX + perpX * Math.sin(t * 0.7 + a + b);
      const ctrlY = midY + perpY * Math.cos(t * 0.5 + a * b);

      for (let i = 0; i < steps; i++) {
        const p = i / steps;
        /* Quadratic bezier */
        const invP = 1 - p;
        const px = invP * invP * from.x + 2 * invP * p * ctrlX + p * p * to.x;
        const py = invP * invP * from.y + 2 * invP * p * ctrlY + p * p * to.y;

        /* Flowing pulse along the edge */
        const pulse = Math.sin(p * Math.PI * 4 - t * 2 + a * 1.5) * 0.5 + 0.5;
        const edgeFade = Math.sin(p * Math.PI); /* fade at endpoints */

        const alpha = (0.12 + pulse * 0.5) * edgeFade;
        const radius = 1.4 + pulse * 1.2;

        /* Color: green core, white highlights at pulse peaks */
        const g = Math.floor(180 + pulse * 75);
        const r = Math.floor(30 + pulse * 50);
        const bl = Math.floor(100 + pulse * 54);

        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${bl}, ${alpha})`;
        ctx.fill();
      }
    });

    /* Draw nodes as subtle labeled points */
    pts.forEach((node, i) => {
      /* Glow */
      const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 40);
      const pulseAlpha = 0.1 + Math.sin(t * 1.5 + i * 0.8) * 0.06;
      glow.addColorStop(0, `rgba(52, 213, 154, ${pulseAlpha + 0.15})`);
      glow.addColorStop(0.4, `rgba(52, 213, 154, ${pulseAlpha * 0.5})`);
      glow.addColorStop(1, "rgba(52, 213, 154, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(node.x - 40, node.y - 40, 80, 80);

      /* Dot */
      ctx.beginPath();
      ctx.arc(node.x, node.y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(52, 213, 154, 0.85)";
      ctx.fill();

      /* Label background */
      ctx.font = "10px monospace";
      const textW = ctx.measureText(node.id).width;
      const labelX = node.x - textW / 2 - 6;
      const labelY = node.y - 16;

      ctx.fillStyle = "rgba(12, 13, 13, 0.75)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.roundRect(labelX, labelY - 10, textW + 12, 16, 3);
      ctx.fill();
      ctx.stroke();

      /* Label text */
      ctx.fillStyle = "rgba(148, 151, 158, 0.8)";
      ctx.fillText(node.id, labelX + 6, labelY + 2);
    });

    /* Scattered ambient particles */
    for (let i = 0; i < 100; i++) {
      const seed = i * 137.508;
      const px = ((Math.sin(seed) * 0.5 + 0.5) * W * 0.9) + W * 0.05;
      const py = ((Math.cos(seed * 0.7) * 0.5 + 0.5) * H * 0.9) + H * 0.05;
      const drift = Math.sin(t + seed) * 8;
      const alpha = 0.02 + Math.sin(t * 0.8 + seed * 0.3) * 0.025;
      ctx.beginPath();
      ctx.arc(px + drift, py + Math.cos(t * 0.6 + seed) * 5, 1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(52, 213, 154, ${Math.max(0, alpha)})`;
      ctx.fill();
    }

    /* Top-left gradient fade for heading readability */
    const lg = ctx.createLinearGradient(0, 0, W * 0.3, H * 0.4);
    lg.addColorStop(0, "rgba(12, 13, 13, 0.85)");
    lg.addColorStop(0.5, "rgba(12, 13, 13, 0.35)");
    lg.addColorStop(1, "rgba(12, 13, 13, 0)");
    ctx.fillStyle = lg;
    ctx.fillRect(0, 0, W, H);

    /* Bottom fade */
    const bg = ctx.createLinearGradient(0, H * 0.7, 0, H);
    bg.addColorStop(0, "rgba(12, 13, 13, 0)");
    bg.addColorStop(1, "rgba(12, 13, 13, 0.9)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    /* Top fade */
    const tg = ctx.createLinearGradient(0, 0, 0, H * 0.15);
    tg.addColorStop(0, "rgba(12, 13, 13, 0.7)");
    tg.addColorStop(1, "rgba(12, 13, 13, 0)");
    ctx.fillStyle = tg;
    ctx.fillRect(0, 0, W, H);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    const ro = new ResizeObserver(() => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      resize();
    });
    ro.observe(canvas);

    const loop = (ts: number) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
      draw(canvas, ctx, ts);
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 1 }}
      aria-hidden
    />
  );
}

export default function CTAFinal() {
  return (
    <section style={{ background: "#0C0D0D" }}>
      {/* Neural network visualization section */}
      <div className="relative" style={{ minHeight: "clamp(420px, 55vh, 680px)" }}>
        <NetworkVisualization />

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
