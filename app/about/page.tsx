"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnnouncementBar from "@/components/layout/announcement-bar";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HalftoneEdges from "@/components/ui/halftone-edges";
import SectionGlow from "@/components/ui/section-glow";
import { WarpBackground } from "@/components/ui/warp-background";
import { GlowingEffect } from "@/components/ui/glowing-effect";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ════════════════════════════════════════════════════════
   SHARED UTILS
════════════════════════════════════════════════════════ */
const DEG = Math.PI / 180;

function DotIcon({ dark = false }: { dark?: boolean }) {
  const fill = dark ? "#2C4A3E" : "#94979E";
  return (
    <svg width="40" height="32" viewBox="0 0 40 32" fill="none" className="mb-10">
      {[5, 4, 3, 2, 1].map((cols, row) =>
        Array.from({ length: cols }, (_, col) => {
          const x = col * 7 + (5 - cols) * 3.5 + 3;
          const y = row * 6 + 3;
          return (
            <circle key={`${row}-${col}`} cx={x} cy={y} r={1.6} fill={fill}
              fillOpacity={0.2 + ((row + col) / (5 + cols)) * 0.8} />
          );
        })
      )}
    </svg>
  );
}

function Diamond({ color = "#ef4444" }: { color?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M1 5L5 1L9 5L5 9L1 5Z" fill={color} />
    </svg>
  );
}

/* Magnetic CTA button */
function MagBtn({
  children, href = "#", primary = false, style: extraStyle,
}: {
  children: React.ReactNode; href?: string; primary?: boolean; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - (r.left + r.width / 2)) * 0.36,
      y: (e.clientY - (r.top + r.height / 2)) * 0.36,
      duration: 0.22, ease: "power2.out",
    });
  };
  const onLeave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1,0.5)" });
  return (
    <a
      ref={ref} href={href}
      onMouseMove={onMove} onMouseLeave={onLeave}
      className="inline-flex items-center px-7 h-12 rounded-full text-[15px] font-medium"
      style={{
        ...(primary
          ? { background: "#34D59A", color: "#0C0D0D" }
          : { color: "#F9FAFA", border: "1px solid rgba(255,255,255,0.2)" }),
        cursor: "none",
        ...extraStyle,
      }}
      onMouseEnter={(e) => {
        if (primary) e.currentTarget.style.background = "#2bc589";
        else e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)";
      }}
    >
      {children}
    </a>
  );
}

/* 3-D tilt card */
function TiltCard({ children, className, style }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, { rotateY: x * 14, rotateX: -y * 14, scale: 1.025, transformPerspective: 900, duration: 0.28, ease: "power2.out" });
    const glow = el.querySelector(".cg") as HTMLElement;
    if (glow) gsap.to(glow, { x: x * 55, y: y * 55, duration: 0.28, ease: "power2.out" });
  };
  const onLeave = () => {
    gsap.to(ref.current, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.55, ease: "elastic.out(1,0.5)" });
    const glow = ref.current?.querySelector(".cg") as HTMLElement;
    if (glow) gsap.to(glow, { x: 0, y: 0, duration: 0.4, ease: "power2.out" });
  };
  return (
    <div ref={ref} className={className} style={{ ...style, transformStyle: "preserve-3d", willChange: "transform" }}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

/* CountUp span */
function CountUp({ end, suffix = "", decimals = 0 }: { end: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const fmt = (v: number) => decimals ? v.toFixed(decimals) + suffix : Math.round(v).toLocaleString() + suffix;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el, start: "top 88%",
        onEnter: () => {
          if (done.current) return; done.current = true;
          const obj = { val: 0 };
          gsap.to(obj, { val: end, duration: 2.2, ease: "power3.out", onUpdate: () => { if (el) el.textContent = fmt(obj.val); } });
        },
      });
    });
    return () => ctx.revert();
  }, [end, suffix, decimals]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ════════════════════════════════════════════════════════
   GLOBE CANVAS
════════════════════════════════════════════════════════ */
const CITIES = [
  { lat: 37.77,  lon: -122.42 }, // SF
  { lat: 40.71,  lon:  -74.01 }, // NYC
  { lat: 51.51,  lon:   -0.13 }, // London
  { lat: 35.68,  lon:  139.65 }, // Tokyo
  { lat:  1.35,  lon:  103.82 }, // Singapore
  { lat: 48.86,  lon:    2.35 }, // Paris
  { lat: -33.87, lon:  151.21 }, // Sydney
  { lat: 55.76,  lon:   37.62 }, // Moscow
  { lat: 19.07,  lon:   72.88 }, // Mumbai
  { lat: -23.55, lon:  -46.63 }, // São Paulo
];

const ARC_PAIRS = [[0,2],[1,3],[2,4],[3,5],[0,6],[1,7],[4,3],[8,5],[9,1],[7,3]];

function slerp(la1: number, lo1: number, la2: number, lo2: number, t: number) {
  const p1 = la1 * DEG, l1 = lo1 * DEG, p2 = la2 * DEG, l2 = lo2 * DEG;
  const d = Math.acos(Math.max(-1, Math.min(1,
    Math.sin(p1) * Math.sin(p2) + Math.cos(p1) * Math.cos(p2) * Math.cos(l2 - l1)
  )));
  if (d < 1e-5) return { lat: la1, lon: lo1 };
  const A = Math.sin((1 - t) * d) / Math.sin(d);
  const B = Math.sin(t * d) / Math.sin(d);
  const x = A * Math.cos(p1) * Math.cos(l1) + B * Math.cos(p2) * Math.cos(l2);
  const y = A * Math.cos(p1) * Math.sin(l1) + B * Math.cos(p2) * Math.sin(l2);
  const z = A * Math.sin(p1) + B * Math.sin(p2);
  return { lat: Math.atan2(z, Math.sqrt(x*x + y*y)) / DEG, lon: Math.atan2(y, x) / DEG };
}

function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotRef    = useRef(20); // start rotation
  const dragRef   = useRef({ active: false, lastX: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = 540;
    const dpr  = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = SIZE * dpr;
    canvas.height = SIZE * dpr;
    canvas.style.width  = SIZE + "px";
    canvas.style.height = SIZE + "px";
    ctx.scale(dpr, dpr);

    const R   = 210;
    const cx  = SIZE / 2;
    const cy  = SIZE / 2 + 10;
    const TILT = 0.34; // X-axis tilt (radians)

    /* Arc travel state — staggered starts */
    const arcProg = ARC_PAIRS.map((_, i) => i / ARC_PAIRS.length);

    const toScreen = (lat: number, lon: number) => {
      const phi   = (90 - lat) * DEG;
      const theta = (lon + rotRef.current) * DEG;
      const x0 = R * Math.sin(phi) * Math.cos(theta);
      const y0 = R * Math.cos(phi);
      const z0 = R * Math.sin(phi) * Math.sin(theta);
      // X-axis tilt
      const cosT = Math.cos(TILT), sinT = Math.sin(TILT);
      const yt = y0 * cosT - z0 * sinT;
      const zt = y0 * sinT + z0 * cosT;
      const depth = (zt + R) / (2 * R); // 0=back 1=front
      return { sx: cx + x0, sy: cy - yt, vis: zt > -R * 0.08, depth };
    };

    /* ── Draw loop ── */
    let raf: number;
    const draw = (ts: number) => {
      ctx.clearRect(0, 0, SIZE, SIZE);

      /* 1 ─ Atmosphere glow */
      const atmo = ctx.createRadialGradient(cx, cy, R * 0.65, cx, cy, R * 1.5);
      atmo.addColorStop(0,   "rgba(52,213,154,0.04)");
      atmo.addColorStop(0.5, "rgba(52,213,154,0.025)");
      atmo.addColorStop(1,   "rgba(52,213,154,0)");
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = atmo; ctx.fill();

      /* 2 ─ Sphere body */
      const body = ctx.createRadialGradient(cx - R * 0.28, cy - R * 0.25, 0, cx, cy, R);
      body.addColorStop(0,   "rgba(16,24,20,0.96)");
      body.addColorStop(0.65,"rgba(9,14,11,0.98)");
      body.addColorStop(1,   "rgba(4,7,5,1)");
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = body; ctx.fill();

      /* 3 ─ Latitude grid lines */
      ctx.lineWidth = 0.45;
      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath();
        let first = true;
        for (let lon = 0; lon <= 362; lon += 2) {
          const { sx, sy, vis } = toScreen(lat, lon);
          if (!vis) { first = true; continue; }
          first ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
          first = false;
        }
        ctx.strokeStyle = "rgba(52,213,154,0.1)"; ctx.stroke();
      }

      /* 4 ─ Longitude grid lines */
      for (let lon = 0; lon < 360; lon += 20) {
        ctx.beginPath();
        let first = true;
        for (let lat = -90; lat <= 90; lat += 2) {
          const { sx, sy, vis } = toScreen(lat, lon);
          if (!vis) { first = true; continue; }
          first ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
          first = false;
        }
        ctx.strokeStyle = "rgba(52,213,154,0.07)"; ctx.stroke();
      }

      /* 5 ─ Surface dot field */
      for (let lat = -85; lat <= 85; lat += 5) {
        for (let lon = 0; lon < 360; lon += 5) {
          const { sx, sy, vis, depth } = toScreen(lat, lon);
          if (!vis) continue;
          ctx.beginPath();
          ctx.arc(sx, sy, 0.75, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(52,213,154,${0.04 + depth * 0.16})`;
          ctx.fill();
        }
      }

      /* 6 ─ Arc static paths */
      ctx.lineWidth = 0.8;
      ARC_PAIRS.forEach(([fi, ti]) => {
        const from = CITIES[fi], to = CITIES[ti];
        ctx.beginPath(); let first = true;
        for (let t = 0; t <= 1; t += 0.015) {
          const m = slerp(from.lat, from.lon, to.lat, to.lon, t);
          const { sx, sy, vis } = toScreen(m.lat, m.lon);
          if (!vis) { first = true; continue; }
          first ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
          first = false;
        }
        ctx.strokeStyle = "rgba(52,213,154,0.15)"; ctx.stroke();
      });

      /* 7 ─ Traveling arc dots + trails */
      ARC_PAIRS.forEach(([fi, ti], i) => {
        arcProg[i] = (arcProg[i] + 0.0016) % 1;
        const from = CITIES[fi], to = CITIES[ti];
        const TRAIL = 10;
        for (let tr = 0; tr < TRAIL; tr++) {
          const tp = ((arcProg[i] - tr * 0.012) + 1) % 1;
          const m = slerp(from.lat, from.lon, to.lat, to.lon, tp);
          const { sx, sy, vis, depth } = toScreen(m.lat, m.lon);
          if (!vis || depth < 0.25) continue;
          const alpha = ((1 - tr / TRAIL) ** 1.8) * 0.92 * depth;
          const r = tr === 0 ? 3.2 : Math.max(0.3, 2 - tr * 0.18);
          ctx.beginPath(); ctx.arc(sx, sy, r, 0, Math.PI * 2);
          ctx.fillStyle = tr === 0
            ? `rgba(200,255,235,${alpha})`
            : `rgba(52,213,154,${alpha})`;
          ctx.fill();
        }
      });

      /* 8 ─ City nodes */
      CITIES.forEach((city) => {
        const { sx, sy, vis, depth } = toScreen(city.lat, city.lon);
        if (!vis || depth < 0.18) return;
        const pulse = (Math.sin(ts * 0.0018 + city.lat * 0.1) + 1) * 0.5;

        /* glow */
        const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, 16);
        g.addColorStop(0, `rgba(52,213,154,${0.45 * depth})`);
        g.addColorStop(1, "rgba(52,213,154,0)");
        ctx.fillStyle = g; ctx.fillRect(sx - 16, sy - 16, 32, 32);

        /* pulse ring */
        ctx.beginPath(); ctx.arc(sx, sy, 4.5 + pulse * 5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(52,213,154,${0.28 * (1 - pulse) * depth})`;
        ctx.lineWidth = 0.7; ctx.stroke();

        /* core */
        ctx.beginPath(); ctx.arc(sx, sy, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(52,213,154,${0.92 * depth})`; ctx.fill();
        ctx.beginPath(); ctx.arc(sx, sy, 1.1, 0, Math.PI * 2);
        ctx.fillStyle = "#E4F1EB"; ctx.fill();
      });

      /* 9 ─ Rim edge highlight */
      const rim = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R);
      rim.addColorStop(0, "rgba(52,213,154,0)");
      rim.addColorStop(0.82, "rgba(52,213,154,0.04)");
      rim.addColorStop(1,    "rgba(52,213,154,0.28)");
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = rim; ctx.fill();

      /* 10 ─ Top-left specular */
      const spec = ctx.createRadialGradient(cx - R * 0.38, cy - R * 0.32, 0, cx - R * 0.38, cy - R * 0.32, R * 0.65);
      spec.addColorStop(0, "rgba(255,255,255,0.05)");
      spec.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = spec; ctx.fill();

      /* Auto-rotate (pause while dragging) */
      if (!dragRef.current.active) rotRef.current += 0.055;

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    /* Drag interaction */
    const onDown = (e: MouseEvent) => { dragRef.current = { active: true, lastX: e.clientX }; };
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current.active) return;
      rotRef.current += (e.clientX - dragRef.current.lastX) * 0.35;
      dragRef.current.lastX = e.clientX;
    };
    const onUp = () => { dragRef.current.active = false; };
    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    /* Fade-in via GSAP */
    gsap.fromTo(canvas, { opacity: 0, scale: 0.88 }, { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out", delay: 0.5 });

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", cursor: "grab" }}
      aria-hidden
    />
  );
}

/* ════════════════════════════════════════════════════════
   CUSTOM CURSOR
════════════════════════════════════════════════════════ */
function Cursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      gsap.to(dot.current,  { x: e.clientX, y: e.clientY, duration: 0.06 });
      gsap.to(ring.current, { x: e.clientX, y: e.clientY, duration: 0.32, ease: "power2.out" });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <div ref={dot}  className="fixed z-[9999] pointer-events-none rounded-full" style={{ width: 6, height: 6, background: "#34D59A", top: 0, left: 0, transform: "translate(-50%,-50%)" }} />
      <div ref={ring} className="fixed z-[9998] pointer-events-none rounded-full" style={{ width: 30, height: 30, border: "1px solid rgba(52,213,154,0.5)", top: 0, left: 0, transform: "translate(-50%,-50%)" }} />
    </>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION 1 — HERO  (split layout with globe)
════════════════════════════════════════════════════════ */
function Hero() {
  const sec     = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef  = useRef<HTMLParagraphElement>(null);
  const ctaRef  = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const eyeRef  = useRef<HTMLDivElement>(null);
  const globeCol = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Word-by-word headline */
      gsap.fromTo(headRef.current?.querySelectorAll(".w") ?? [],
        { y: 60, opacity: 0, rotateX: -20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.72, stagger: 0.055, ease: "power3.out", delay: 0.3 }
      );
      /* Eyebrow */
      gsap.fromTo(eyeRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", delay: 0.18 });
      /* Sub + CTAs + pills cascade */
      gsap.fromTo([subRef.current, ctaRef.current, pillRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: "power2.out", delay: 0.85 }
      );
    }, sec);
    return () => ctx.revert();
  }, []);

  const headline = "We're building the inference layer for the AI era";

  return (
    <section
      ref={sec}
      className="relative overflow-hidden"
      style={{ background: "#0C0D0D", minHeight: "calc(100vh - 80px)" }}
    >
      {/* Background dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      {/* Teal ambient glow top-left */}
      <div className="absolute pointer-events-none" style={{ top: "8%", left: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(52,213,154,0.055) 0%, transparent 65%)" }} />

      <SectionGlow variant="default" />

      <div className="relative z-10 max-w-[1360px] mx-auto px-8 h-full" style={{ paddingTop: 110, paddingBottom: 80 }}>
        <div className="grid items-center gap-10" style={{ gridTemplateColumns: "1fr 560px" }}>

          {/* ── LEFT: text ── */}
          <div>
            <div ref={eyeRef} className="flex items-center gap-2 mb-8" style={{ opacity: 0 }}>
              <Diamond />
              <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: "#94979E", fontFamily: "var(--font-mono),monospace" }}>
                About Synapse
              </span>
            </div>

            <h1
              ref={headRef}
              style={{ fontSize: "clamp(32px, 4.2vw, 58px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.04em", color: "#F9FAFA", marginBottom: 28 }}
            >
              {headline.split(" ").map((word, i) => (
                <span key={i} className="w inline-block" style={{ marginRight: "0.25em", opacity: 0 }}>{word}</span>
              ))}
            </h1>

            <p ref={subRef} style={{ fontSize: "clamp(15px, 1.4vw, 17px)", color: "#94979E", lineHeight: 1.78, maxWidth: 480, marginBottom: 40, opacity: 0 }}>
              Founded by ML researchers who spent years running inference at scale.
              We got tired of brittle infrastructure and built the platform we always
              wanted — fast, observable, and completely operator-free.
            </p>

            <div ref={ctaRef} className="flex items-center gap-3" style={{ opacity: 0 }}>
              <MagBtn primary>View open roles</MagBtn>
              <MagBtn>Read our story</MagBtn>
            </div>

            <div ref={pillRef} className="flex items-center gap-4 mt-12 flex-wrap" style={{ opacity: 0 }}>
              {[
                { v: "43ms",   l: "Median latency" },
                { v: "99.99%", l: "Uptime SLA" },
                { v: "W2024",  l: "Y Combinator" },
              ].map(({ v, l }) => (
                <div key={l} className="flex items-center gap-3 px-5 py-3 rounded-xl"
                  style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <span style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.03em", color: "#F9FAFA" }}>{v}</span>
                  <span style={{ fontSize: 12, color: "#94979E" }}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: globe ── */}
          <div ref={globeCol} className="flex items-center justify-center relative">
            {/* Subtle ring behind globe */}
            <div className="absolute pointer-events-none" style={{ width: 560, height: 560, borderRadius: "50%", border: "1px solid rgba(52,213,154,0.08)" }} />
            <div className="absolute pointer-events-none" style={{ width: 480, height: 480, borderRadius: "50%", border: "1px solid rgba(52,213,154,0.05)" }} />
            <HeroGlobe />
            {/* Drag hint */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5" style={{ opacity: 0.4 }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v10M1 6h10" stroke="#94979E" strokeWidth={1.2} strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: 10, color: "#94979E", fontFamily: "var(--font-mono),monospace", letterSpacing: "0.08em" }}>drag to rotate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION 2 — SCROLL-DRIVEN MISSION TEXT
════════════════════════════════════════════════════════ */
const MISSION = "Our mission is to make world-class AI inference accessible to every team. Not just the ones with dedicated ML platform engineers and unlimited cloud budgets.";

function Mission() {
  const sec  = useRef<HTMLElement>(null);
  const para = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!para.current) return;
      gsap.fromTo(para.current.querySelectorAll(".w"),
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: { each: 0.04, from: "start" },
          ease: "none",
          scrollTrigger: { trigger: sec.current, start: "top 62%", end: "bottom 38%", scrub: 0.9 },
        }
      );
    }, sec);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sec} className="relative overflow-hidden border-t border-b"
      style={{ background: "#080909", borderColor: "rgba(255,255,255,0.06)", paddingTop: 100, paddingBottom: 100 }}>
      <HalftoneEdges leftColor="rgba(52,213,154,0.55)" rightColor="rgba(220,120,60,0.45)" dotSize={1.6} spacing={9} edgeWidth={300} fadeStop={100} />
      <div className="relative z-10 max-w-[960px] mx-auto px-8 text-center">
        <p ref={para} style={{ fontSize: "clamp(18px, 2.4vw, 34px)", fontWeight: 400, lineHeight: 1.55, letterSpacing: "-0.02em" }}>
          {MISSION.split(" ").map((word, i) => (
            <span key={i} className="w inline-block" style={{ marginRight: "0.28em", opacity: 0.12, color: "#F9FAFA" }}>{word}</span>
          ))}
        </p>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION 3 — METRICS
════════════════════════════════════════════════════════ */
function Metrics() {
  const sec = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".mc",
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.09, duration: 0.65, ease: "power3.out",
          scrollTrigger: { trigger: sec.current, start: "top 80%" } }
      );
    }, sec);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sec} className="border-b" style={{ background: "#0C0D0D", borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {[
            { el: <><CountUp end={150} suffix="k+" /></>, label: "Endpoints provisioned daily", color: "#34D59A" },
            { el: <><CountUp end={43} suffix="ms" /></>,  label: "Median inference latency",   color: "#34D59A" },
            { el: <><CountUp end={99.99} suffix="%" decimals={2} /></>, label: "Platform uptime SLA", color: "#34D59A" },
            { el: <>W2024</>,                             label: "Y Combinator cohort",        color: "#F59D4A" },
          ].map((s, i) => (
            <div key={i} className="mc py-14 px-8" style={{ opacity: 0, borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <div style={{ fontSize: "clamp(26px, 3.2vw, 44px)", fontWeight: 400, letterSpacing: "-0.04em", color: s.color, lineHeight: 1, marginBottom: 10 }}>{s.el}</div>
              <div style={{ fontSize: 13, color: "#94979E" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION 4 — STORY TIMELINE
════════════════════════════════════════════════════════ */
const TIMELINE = [
  { year: "2022", title: "The problem becomes obvious",  body: "Three ML engineers spend six months trying to reduce P99 latency below 200ms. They spend more time on infrastructure than on models. The frustration is universal." },
  { year: "2023", title: "Synapse is founded",           body: "Maria, James, and Priya leave their jobs. The first prototype routes across three open-source models with sub-50ms latency on day one, built in a Mission District apartment." },
  { year: "2024", title: "Y Combinator W2024",           body: "Accepted into YC's Winter 2024 batch. The team ships continuous batching, semantic routing, and a public API in twelve weeks. 500 teams sign up in month one." },
  { year: "2025", title: "Series A & global scale",      body: "Synapse raises its Series A and expands to three regions. The platform handles its first billion requests in a single day. Fine-tuning and vector search ship to GA." },
  { year: "2026", title: "The inference standard",       body: "Today Synapse powers thousands of teams — from two-person startups to Fortune 500 orgs. Still twelve people. Still shipping every week." },
];

function Story() {
  const sec      = useRef<HTMLElement>(null);
  const lineRef  = useRef<HTMLDivElement>(null);
  const rowRefs  = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Animated line draw */
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleY: 0, transformOrigin: "top center" },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: sec.current, start: "top 58%", end: "bottom 72%", scrub: true } }
        );
      }
      /* Row reveals */
      rowRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(el, { opacity: 0, x: -28 },
          { opacity: 1, x: 0, duration: 0.6, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 84%", toggleActions: "play none none none" } }
        );
      });
    }, sec);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sec} id="story" className="relative overflow-hidden border-b"
      style={{ background: "#0C0D0D", borderColor: "rgba(255,255,255,0.06)", paddingTop: 120, paddingBottom: 120 }}>
      <SectionGlow variant="default" />
      <div className="relative z-10 max-w-[1100px] mx-auto px-8">
        <div className="mb-16">
          <DotIcon />
          <h2 style={{ fontSize: "clamp(26px, 3vw, 44px)", fontWeight: 400, lineHeight: 1.15, letterSpacing: "-0.04em", color: "#6B7280", maxWidth: 560 }}>
            <span style={{ color: "#F9FAFA" }}>How we got here.</span>{" "}
            Five years obsessing over milliseconds.
          </h2>
        </div>
        <div className="relative">
          {/* Animated line */}
          <div ref={lineRef} className="absolute top-0 bottom-0 hidden lg:block"
            style={{ left: 80, width: 1, background: "linear-gradient(to bottom, rgba(52,213,154,0.7), rgba(52,213,154,0.12))", transform: "scaleY(0)", transformOrigin: "top center" }} />
          {TIMELINE.map((item, i) => (
            <div
              key={item.year}
              ref={(el) => { rowRefs.current[i] = el; }}
              className="relative grid lg:grid-cols-[160px_1fr] gap-8 lg:gap-16 py-10 border-b"
              style={{ borderColor: "rgba(255,255,255,0.05)", opacity: 0 }}
            >
              <div className="flex items-start lg:flex-col gap-4 lg:gap-0">
                <div className="hidden lg:flex items-center justify-center rounded-full" style={{
                  width: 10, height: 10, marginLeft: 75.5, marginBottom: 14, flexShrink: 0,
                  background: i === TIMELINE.length - 1 ? "#34D59A" : "#0C0D0D",
                  border: `1px solid ${i === TIMELINE.length - 1 ? "#34D59A" : "rgba(255,255,255,0.22)"}`,
                  boxShadow: i === TIMELINE.length - 1 ? "0 0 10px rgba(52,213,154,0.6)" : "none",
                }} />
                <span style={{ fontSize: 13, fontWeight: 500, color: i === TIMELINE.length - 1 ? "#34D59A" : "#94979E", fontFamily: "var(--font-mono),monospace" }}>{item.year}</span>
              </div>
              <div>
                <h3 style={{ fontSize: "clamp(14px, 1.3vw, 20px)", fontWeight: 400, letterSpacing: "-0.02em", color: "#F9FAFA", marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 15, color: "#94979E", lineHeight: 1.75, maxWidth: 540 }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION 5 — TEAM (photo cards · arrow navigation)
════════════════════════════════════════════════════════ */
const TEAM = [
  {
    name: "Maria Santos", role: "Co-founder & CEO",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "James Park", role: "Co-founder & CTO",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Mehta", role: "Co-founder & CPO",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Alex Kim", role: "Head of Engineering",
    photo: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    name: "Rania Hassan", role: "Head of Research",
    photo: "https://randomuser.me/api/portraits/women/26.jpg",
  },
  {
    name: "Luis Torres", role: "Head of GTM",
    photo: "https://randomuser.me/api/portraits/men/76.jpg",
  },
];

function Team() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const sec = useRef<HTMLElement>(null);

  const checkScroll = () => {
    const t = trackRef.current; if (!t) return;
    setCanPrev(t.scrollLeft > 4);
    setCanNext(t.scrollLeft < t.scrollWidth - t.clientWidth - 4);
  };

  useEffect(() => {
    const t = trackRef.current; if (!t) return;
    t.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => t.removeEventListener("scroll", checkScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".tm-card",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: sec.current, start: "top 78%" } }
      );
    }, sec);
    return () => ctx.revert();
  }, []);

  const scroll = (dir: "prev" | "next") => {
    const t = trackRef.current; if (!t) return;
    t.scrollBy({ left: dir === "next" ? 310 : -310, behavior: "smooth" });
  };

  return (
    <section ref={sec} className="border-b" style={{ background: "#0C0D0D", borderColor: "rgba(255,255,255,0.06)", paddingTop: 80, paddingBottom: 64 }}>
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Header */}
        <div className="mb-10">
          <span className="text-[11px] uppercase tracking-widest block mb-4" style={{ color: "#94979E" }}>Our Team</span>
          <h2 style={{ fontSize: "clamp(28px, 3.2vw, 48px)", fontWeight: 400, letterSpacing: "-0.04em", color: "#F9FAFA", lineHeight: 1.12 }}>
            Meet the team{" "}
            <span style={{ color: "#6B7280" }}>that<br />ships the future.</span>
          </h2>
        </div>

        {/* Scrollable photo track */}
        <div
          ref={trackRef}
          style={{
            display: "flex", gap: 16, overflowX: "auto", scrollbarWidth: "none",
            paddingBottom: 4,
          }}
          className="[&::-webkit-scrollbar]:hidden"
        >
          {TEAM.map((p) => (
            <div key={p.name} className="tm-card" style={{ flexShrink: 0, width: 280, opacity: 0 }}>
              {/* Photo */}
              <div style={{ width: 280, height: 340, borderRadius: 16, overflow: "hidden", background: "#1a1b1e" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.photo}
                  alt={p.name}
                  width={280}
                  height={340}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              {/* Info */}
              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#F9FAFA", letterSpacing: "-0.02em" }}>{p.name}</div>
                <div style={{ fontSize: 13, color: "#94979E", marginTop: 3 }}>{p.role}</div>
              </div>
            </div>
          ))}

          {/* Hiring card */}
          <div className="tm-card" style={{ flexShrink: 0, width: 280, opacity: 0 }}>
            <div style={{
              width: 280, height: 340, borderRadius: 16, overflow: "hidden",
              background: "linear-gradient(155deg,#061810 0%,#0a3328 50%,#1a8f65 100%)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16,
              border: "1px solid rgba(52,213,154,0.2)",
            }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", border: "1.5px solid rgba(52,213,154,0.4)", background: "rgba(52,213,154,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 4v16M4 12h16" stroke="#34D59A" strokeWidth={1.8} strokeLinecap="round" /></svg>
              </div>
              <div style={{ textAlign: "center", padding: "0 24px" }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#F9FAFA", marginBottom: 6 }}>We&apos;re hiring</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>Remote-first · great equity · hard problems</div>
              </div>
            </div>
            <div style={{ marginTop: 14 }}>
              <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 6, paddingLeft: 16, paddingRight: 16, height: 36, borderRadius: 999, background: "#34D59A", color: "#0C0D0D", fontSize: 13, fontWeight: 600 }}>View open roles →</a>
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="flex items-center gap-2 mt-8">
          <button
            onClick={() => scroll("prev")}
            disabled={!canPrev}
            style={{
              width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.12)",
              background: canPrev ? "rgba(255,255,255,0.06)" : "transparent",
              color: canPrev ? "#F9FAFA" : "rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: canPrev ? "pointer" : "default",
              transition: "all 0.2s",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button
            onClick={() => scroll("next")}
            disabled={!canNext}
            style={{
              width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.12)",
              background: canNext ? "rgba(255,255,255,0.06)" : "transparent",
              color: canNext ? "#F9FAFA" : "rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: canNext ? "pointer" : "default",
              transition: "all 0.2s",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION 6 — VALUES  (mint bg)
════════════════════════════════════════════════════════ */
const VALUES = [
  { icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L12.4 7.5H18l-4.7 3.4 1.8 5.6L10 14l-5.1 3.6 1.8-5.6L3 7.5h5.7L10 2Z" stroke="#2C6D4C" strokeWidth={1.5} strokeLinejoin="round" /></svg>, title: "Speed as a virtue", body: "Latency isn't a metric — it's a product decision. Every millisecond changes what's possible in a user interaction." },
  { icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#2C6D4C" strokeWidth={1.5} /><path d="M6 10h8M10 6v8" stroke="#2C6D4C" strokeWidth={1.5} strokeLinecap="round" /></svg>, title: "Radical transparency", body: "Every request traced. Every cost visible. Every outage post-mortemed publicly. Same standards we build for customers." },
  { icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="6" height="6" rx="1.5" stroke="#2C6D4C" strokeWidth={1.5} /><rect x="11" y="3" width="6" height="6" rx="1.5" stroke="#2C6D4C" strokeWidth={1.5} /><rect x="3" y="11" width="6" height="6" rx="1.5" stroke="#2C6D4C" strokeWidth={1.5} /><rect x="11" y="11" width="6" height="6" rx="1.5" stroke="#2C6D4C" strokeWidth={1.5} /></svg>, title: "Composability over lock-in", body: "Open standards, open models, open APIs. A layer in your stack — not a walled garden you can never leave." },
  { icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 16V8M8 16V4M12 16V9M16 16V6" stroke="#2C6D4C" strokeWidth={1.5} strokeLinecap="round" /></svg>, title: "Operator-free by default", body: "No MLOps team required. We automate scaling, routing, and failover so engineers focus on models, not machines." },
];

function Values() {
  const sec = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".vc",
        { opacity: 0, y: 44, rotateX: -12 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: sec.current, start: "top 75%" } }
      );
    }, sec);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={sec} className="relative overflow-hidden" style={{ background: "#E4F1EB" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(44,74,62,0.12) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      <div className="relative max-w-[1200px] mx-auto px-8 py-24">
        <div className="flex items-center gap-2 mb-4"><Diamond /><span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "#2C6D4C", fontFamily: "var(--font-mono),monospace" }}>Our values</span></div>
        <h2 style={{ fontSize: "clamp(26px, 3vw, 42px)", fontWeight: 400, letterSpacing: "-0.04em", color: "#111215", marginBottom: 48, maxWidth: 460 }}>Four principles we&nbsp;don&apos;t compromise on.</h2>
        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(2, 1fr)", perspective: 800 }}>
          {VALUES.map((v) => (
            <div key={v.title} className="vc rounded-2xl p-8 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.62)", border: "1px solid rgba(44,74,62,0.1)", opacity: 0 }}
              onMouseEnter={(e) => gsap.to(e.currentTarget, { y: -5, boxShadow: "0 18px 42px rgba(44,74,62,0.11)", duration: 0.3, ease: "power2.out" })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { y: 0, boxShadow: "none", duration: 0.4, ease: "power2.out" })}>
              <GlowingEffect disabled={false} spread={28} proximity={52} blur={0} borderWidth={1} />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(44,74,62,0.1)" }}>{v.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 500, color: "#111215", marginBottom: 10, letterSpacing: "-0.02em" }}>{v.title}</h3>
              <p style={{ fontSize: 14, color: "#4B7860", lineHeight: 1.75 }}>{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION 7 — INVESTORS
════════════════════════════════════════════════════════ */
const INVESTORS = [
  { name: "Y Combinator",        desc: "Lead, W2024",   prominent: true },
  { name: "Andreessen Horowitz", desc: "Series A lead", prominent: false },
  { name: "Index Ventures",      desc: "Series A",      prominent: false },
  { name: "Elad Gil",            desc: "Angel",         prominent: false },
  { name: "Nat Friedman",        desc: "Angel",         prominent: false },
  { name: "Andrej Karpathy",     desc: "Advisor",       prominent: false },
];

function Investors() {
  const sec = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ir", { opacity: 0, x: 36 },
        { opacity: 1, x: 0, duration: 0.48, stagger: 0.07, ease: "power2.out",
          scrollTrigger: { trigger: sec.current, start: "top 78%" } }
      );
    }, sec);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={sec} className="relative overflow-hidden border-b border-t"
      style={{ background: "#0C0D0D", borderColor: "rgba(255,255,255,0.06)", paddingTop: 100, paddingBottom: 100 }}>
      <SectionGlow variant="dual" />
      <div className="relative z-10 max-w-[1200px] mx-auto px-8">
        <div className="grid gap-20" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <DotIcon />
            <h2 style={{ fontSize: "clamp(24px, 2.8vw, 40px)", fontWeight: 400, letterSpacing: "-0.04em", color: "#6B7280", marginBottom: 20 }}>
              <span style={{ color: "#F9FAFA" }}>Backed by the best.</span>{" "}Investors who understand the frontier.
            </h2>
            <p style={{ fontSize: 15, color: "#94979E", lineHeight: 1.75, maxWidth: 390 }}>Every check came with conviction in open, fast, operator-free AI — from people who have built foundational infrastructure, not just funded it.</p>
          </div>
          <div className="space-y-3">
            {INVESTORS.map((inv) => (
              <div key={inv.name} className="ir flex items-center gap-4 px-5 py-4 rounded-xl" style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.07)", opacity: 0 }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-semibold shrink-0"
                  style={{ background: inv.prominent ? "rgba(245,157,74,0.15)" : "rgba(255,255,255,0.05)", color: inv.prominent ? "#F59D4A" : "#94979E", border: `1px solid ${inv.prominent ? "rgba(245,157,74,0.3)" : "rgba(255,255,255,0.07)"}` }}>
                  {inv.name.slice(0, 2).toUpperCase()}
                </div>
                <div style={{ fontSize: 14, color: "#F9FAFA", fontWeight: 500, flex: 1 }}>{inv.name}</div>
                <div className="px-2 py-0.5 rounded text-[11px]" style={{ background: inv.prominent ? "rgba(245,157,74,0.1)" : "rgba(255,255,255,0.04)", color: inv.prominent ? "#F59D4A" : "#94979E", border: `1px solid ${inv.prominent ? "rgba(245,157,74,0.25)" : "rgba(255,255,255,0.06)"}` }}>
                  {inv.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION 8 — PRESS MARQUEE
════════════════════════════════════════════════════════ */
const PRESS = [
  { pub: "TechCrunch",      text: "\"The inference layer every AI team has been waiting for.\"" },
  { pub: "The Information", text: "\"Quietly becoming the infrastructure beneath the AI economy.\"" },
  { pub: "Forbes AI 50",    text: "\"Most impactful infrastructure company from YC in years.\"" },
  { pub: "Hacker News",     text: "\"Synapse is what I wished existed when running models in prod.\"" },
  { pub: "Bloomberg",       text: "\"Moving fast in a market that is only getting bigger.\"" },
];

function Press() {
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!trackRef.current) return;
      gsap.to(trackRef.current, { xPercent: -50, ease: "none", duration: 34, repeat: -1 });
    });
    return () => ctx.revert();
  }, []);
  const items = [...PRESS, ...PRESS];
  return (
    <section className="border-b overflow-hidden" style={{ background: "#080909", borderColor: "rgba(255,255,255,0.06)", paddingTop: 72, paddingBottom: 72 }}>
      <div className="max-w-[1200px] mx-auto px-8 mb-10 flex items-center gap-2">
        <Diamond color="#94979E" /><span className="text-[11px] uppercase tracking-widest" style={{ color: "#94979E" }}>In the press</span>
      </div>
      <div style={{ WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)", maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
        <div ref={trackRef} className="flex" style={{ width: "max-content" }}>
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-4 px-7 py-6 mx-3 rounded-2xl shrink-0" style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.07)", maxWidth: 320 }}>
              <div>
                <div className="text-[10px] uppercase tracking-widest mb-3 font-medium" style={{ color: "#94979E", fontFamily: "var(--font-mono),monospace" }}>{item.pub}</div>
                <p style={{ fontSize: 14, color: "rgba(249,250,250,0.65)", lineHeight: 1.65, fontStyle: "italic" }}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION 9 — BOTTOM CTA
════════════════════════════════════════════════════════ */
function BottomCTA() {
  const sec     = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!headRef.current) return;
      gsap.fromTo(headRef.current.querySelectorAll(".w"),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: sec.current, start: "top 80%" } }
      );
    }, sec);
    return () => ctx.revert();
  }, []);
  const cta = "Help us build the inference standard.";
  return (
    <section ref={sec} className="relative overflow-hidden" style={{ background: "#0C0D0D" }}>
      <SectionGlow variant="center" />
      <WarpBackground
        className="border-0 rounded-none p-0 w-full"
        gridColor="rgba(52,213,154,0.06)"
        beamsPerSide={2}
        beamDuration={7}
        beamSize={10}
        perspective={120}
      >
        <div className="relative z-10 max-w-[620px] mx-auto px-8 text-center py-32">
          <div className="flex items-center justify-center gap-2 mb-8"><Diamond /><span className="text-[11px] uppercase tracking-widest" style={{ color: "#94979E", fontFamily: "var(--font-mono),monospace" }}>Join the team</span></div>
          <h2 ref={headRef} style={{ fontSize: "clamp(26px, 4vw, 50px)", fontWeight: 400, letterSpacing: "-0.04em", color: "#F9FAFA", lineHeight: 1.12, marginBottom: 20 }}>
            {cta.split(" ").map((word, i) => <span key={i} className="w inline-block" style={{ marginRight: "0.26em", opacity: 0 }}>{word}</span>)}
          </h2>
          <p style={{ fontSize: 16, color: "#94979E", lineHeight: 1.7, marginBottom: 44 }}>
            Small team, clear mission. If you care about performance, developer experience, and making powerful AI accessible — we should talk.
          </p>
          <div className="flex items-center justify-center gap-3">
            <MagBtn primary>View open roles</MagBtn>
            <MagBtn>Get started free</MagBtn>
          </div>
        </div>
      </WarpBackground>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   PAGE ROOT
════════════════════════════════════════════════════════ */
export default function AboutPage() {
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => clearTimeout(id);
  }, []);
  return (
    <>
      <Cursor />
      <AnnouncementBar />
      <Navbar />
      <main style={{ paddingTop: 80 }}>
        <Hero />
        <Mission />
        <Metrics />
        <Story />
        <Team />
        <Values />
        <Investors />
        <Press />
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
