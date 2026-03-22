"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnnouncementBar from "@/components/layout/announcement-bar";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HalftoneEdges from "@/components/ui/halftone-edges";
import SectionGlow from "@/components/ui/section-glow";

/* ─────────────────────────────────────────────
   GSAP SETUP — registers plugins once on client
───────────────────────────────────────────── */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ══════════════════════════════════════════
   UTILITY COMPONENTS
══════════════════════════════════════════ */

/* Custom two-ring cursor */
function Cursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      gsap.to(dotRef.current, { x: e.clientX, y: e.clientY, duration: 0.05 });
      gsap.to(ringRef.current, { x: e.clientX, y: e.clientY, duration: 0.35, ease: "power2.out" });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed z-[9999] pointer-events-none rounded-full"
        style={{
          width: 6, height: 6,
          background: "#34D59A",
          transform: "translate(-50%,-50%)",
          top: 0, left: 0,
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={ringRef}
        className="fixed z-[9998] pointer-events-none rounded-full"
        style={{
          width: 32, height: 32,
          border: "1px solid rgba(52,213,154,0.55)",
          transform: "translate(-50%,-50%)",
          top: 0, left: 0,
        }}
      />
    </>
  );
}

/* Magnetic button — cursor pulls it toward mouse */
function MagneticBtn({
  children,
  href,
  primary = false,
}: {
  children: React.ReactNode;
  href?: string;
  primary?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.38;
    const dy = (e.clientY - (rect.top  + rect.height / 2)) * 0.38;
    gsap.to(el, { x: dx, y: dy, duration: 0.25, ease: "power2.out" });
  };

  const onLeave = () =>
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1,0.55)" });

  return (
    <a
      ref={ref}
      href={href ?? "#"}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-flex items-center px-7 h-12 rounded-full text-[15px] font-medium transition-colors"
      style={
        primary
          ? { background: "#34D59A", color: "#0C0D0D" }
          : { color: "#F9FAFA", border: "1px solid rgba(255,255,255,0.18)" }
      }
      onMouseEnter={(e) => {
        if (primary) e.currentTarget.style.background = "#2bc589";
        else e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
      }}
    >
      {children}
    </a>
  );
}

/* 3-D tilt card wrapper */
function TiltCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    gsap.to(el, {
      rotateY: x * 14,
      rotateX: -y * 14,
      transformPerspective: 900,
      scale: 1.025,
      duration: 0.3,
      ease: "power2.out",
    });
    /* inner glow tracks cursor */
    const glow = el.querySelector(".card-glow") as HTMLElement;
    if (glow) {
      gsap.to(glow, {
        x: x * 60,
        y: y * 60,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const onLeave = () => {
    gsap.to(ref.current, {
      rotateY: 0, rotateX: 0, scale: 1,
      duration: 0.6, ease: "elastic.out(1,0.55)",
    });
    const glow = ref.current?.querySelector(".card-glow") as HTMLElement;
    if (glow) gsap.to(glow, { x: 0, y: 0, duration: 0.5, ease: "power2.out" });
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transformStyle: "preserve-3d", willChange: "transform" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}

/* DotIcon — homepage identical */
function DotIcon({ dark = false }: { dark?: boolean }) {
  const fill = dark ? "#2C4A3E" : "#94979E";
  return (
    <svg width="40" height="32" viewBox="0 0 40 32" fill="none" className="mb-10">
      {[5,4,3,2,1].map((cols, row) =>
        Array.from({ length: cols }, (_, col) => {
          const x = col * 7 + (5 - cols) * 3.5 + 3;
          const y = row * 6 + 3;
          return (
            <circle
              key={`${row}-${col}`}
              cx={x} cy={y} r={1.6} fill={fill}
              fillOpacity={0.2 + ((row + col) / (5 + cols)) * 0.8}
            />
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

/* Count-up number on scroll enter */
function CountUp({
  end, suffix = "", decimals = 0,
}: { end: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fmt = (v: number) =>
      decimals ? v.toFixed(decimals) + suffix : Math.round(v).toLocaleString() + suffix;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        onEnter: () => {
          if (done.current) return;
          done.current = true;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: end,
            duration: 2.2,
            ease: "power3.out",
            onUpdate: () => { if (el) el.textContent = fmt(obj.val); },
          });
        },
      });
    });
    return () => ctx.revert();
  }, [end, suffix, decimals]);

  return <span ref={ref}>0{suffix}</span>;
}

/* ══════════════════════════════════════════
   SECTION 1 — HERO
══════════════════════════════════════════ */
function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const pillsRef   = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const orb1Ref    = useRef<HTMLDivElement>(null);
  const orb2Ref    = useRef<HTMLDivElement>(null);
  const orb3Ref    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Floating orbs */
      [orb1Ref.current, orb2Ref.current, orb3Ref.current].forEach((orb, i) => {
        if (!orb) return;
        gsap.to(orb, {
          y: `${-30 + i * 8}px`,
          x: `${10 - i * 7}px`,
          duration: 3.5 + i * 0.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.6,
        });
      });

      /* Eyebrow fade */
      gsap.fromTo(eyebrowRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.2 }
      );

      /* Word-by-word headline */
      if (headRef.current) {
        const words = headRef.current.querySelectorAll(".word");
        gsap.fromTo(words,
          { y: 55, opacity: 0, rotateX: -25 },
          {
            y: 0, opacity: 1, rotateX: 0,
            duration: 0.75,
            stagger: 0.06,
            ease: "power3.out",
            delay: 0.4,
          }
        );
      }

      /* Sub + CTA + pills cascade */
      gsap.fromTo([subRef.current, ctaRef.current, pillsRef.current],
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: "power2.out", delay: 0.85 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headline = "We're building the inference layer for the AI era";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "#0C0D0D", paddingTop: 160, paddingBottom: 130 }}
    >
      {/* Floating background orbs */}
      <div ref={orb1Ref} className="absolute pointer-events-none" style={{ top: "15%", left: "12%", width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle, rgba(52,213,154,0.07) 0%, transparent 70%)" }} />
      <div ref={orb2Ref} className="absolute pointer-events-none" style={{ top: "35%", right: "10%", width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,111,255,0.06) 0%, transparent 70%)" }} />
      <div ref={orb3Ref} className="absolute pointer-events-none" style={{ bottom: "10%", left: "30%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,157,74,0.05) 0%, transparent 70%)" }} />

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.028) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <SectionGlow variant="center" />

      <div className="relative z-10 max-w-[820px] mx-auto px-8 text-center">
        {/* Eyebrow */}
        <div ref={eyebrowRef} className="flex items-center justify-center gap-2 mb-8" style={{ opacity: 0 }}>
          <Diamond />
          <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: "#94979E", fontFamily: "var(--font-mono),monospace" }}>
            About Synapse
          </span>
        </div>

        {/* Headline — words are individually animated */}
        <h1
          ref={headRef}
          style={{
            fontSize: "clamp(34px, 5.5vw, 64px)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.04em",
            color: "#F9FAFA",
            marginBottom: 28,
            overflow: "hidden",
          }}
        >
          {headline.split(" ").map((word, i) => (
            <span
              key={i}
              className="word inline-block"
              style={{ marginRight: "0.26em", opacity: 0 }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Sub */}
        <p
          ref={subRef}
          style={{ fontSize: "clamp(15px, 1.5vw, 18px)", color: "#94979E", lineHeight: 1.75, maxWidth: 600, margin: "0 auto 40px", opacity: 0 }}
        >
          Synapse was founded by ML researchers who spent years running inference
          at scale. We got tired of brittle infrastructure and built the platform
          we always wanted — fast, observable, and operator-free.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex items-center justify-center gap-3" style={{ opacity: 0 }}>
          <MagneticBtn primary>View open roles</MagneticBtn>
          <MagneticBtn>Read our story</MagneticBtn>
        </div>

        {/* Stat pills */}
        <div ref={pillsRef} className="flex items-center justify-center gap-4 mt-14 flex-wrap" style={{ opacity: 0 }}>
          {[
            { value: "43ms",   label: "Median latency" },
            { value: "99.99%", label: "Uptime SLA" },
            { value: "W2024",  label: "Y Combinator" },
          ].map(({ value, label }) => (
            <div key={label} className="flex items-center gap-3 px-5 py-3 rounded-xl" style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.07)" }}>
              <span style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.03em", color: "#F9FAFA" }}>{value}</span>
              <span style={{ fontSize: 12, color: "#94979E" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SECTION 2 — SCROLL-DRIVEN MISSION TEXT
   Words activate word-by-word as you scroll
══════════════════════════════════════════ */
const MISSION_WORDS =
  "Our mission is to make world-class AI inference accessible to every team. Not just the ones with dedicated ML platform engineers and unlimited cloud budgets.";

function Mission() {
  const sectionRef = useRef<HTMLElement>(null);
  const paraRef    = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!paraRef.current) return;
      const words = paraRef.current.querySelectorAll(".word");
      gsap.fromTo(
        words,
        { opacity: 0.12, color: "#6B7280" },
        {
          opacity: 1,
          color: "#F9FAFA",
          stagger: { each: 0.04, from: "start" },
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 0.8,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-t"
      style={{ background: "#080909", borderColor: "rgba(255,255,255,0.06)", paddingTop: 100, paddingBottom: 100 }}
    >
      <HalftoneEdges
        leftColor="rgba(52,213,154,0.55)"
        rightColor="rgba(220,120,60,0.45)"
        dotSize={1.6} spacing={9} edgeWidth={300} fadeStop={100}
      />
      <div className="relative z-10 max-w-[960px] mx-auto px-8 text-center">
        <p
          ref={paraRef}
          style={{ fontSize: "clamp(20px, 2.5vw, 36px)", fontWeight: 400, lineHeight: 1.55, letterSpacing: "-0.02em" }}
        >
          {MISSION_WORDS.split(" ").map((word, i) => (
            <span
              key={i}
              className="word"
              style={{ display: "inline-block", marginRight: "0.28em", opacity: 0.12, color: "#6B7280" }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SECTION 3 — METRICS with count-up
══════════════════════════════════════════ */
function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = document.querySelectorAll(".metric-card");
      gsap.fromTo(cards,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const stats = [
    { display: <><CountUp end={150} suffix="k+" />   </>, label: "Endpoints provisioned daily", color: "#34D59A" },
    { display: <><CountUp end={43}  suffix="ms" />   </>, label: "Median inference latency",   color: "#34D59A" },
    { display: <><CountUp end={99.99} suffix="%" decimals={2} /></>, label: "Platform uptime SLA", color: "#34D59A" },
    { display: <>W2024</>,                                label: "Y Combinator cohort",        color: "#F59D4A" },
  ];

  return (
    <section
      ref={sectionRef}
      className="border-b"
      style={{ background: "#0C0D0D", borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="metric-card py-14 px-8"
              style={{
                opacity: 0,
                borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <div style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 400, letterSpacing: "-0.04em", color: s.color, lineHeight: 1, marginBottom: 10 }}>
                {s.display}
              </div>
              <div style={{ fontSize: 13, color: "#94979E", lineHeight: 1.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SECTION 4 — STORY / TIMELINE
   Line draws on scroll; each entry reveals
══════════════════════════════════════════ */
const TIMELINE = [
  { year: "2022", title: "The problem becomes obvious",      body: "Three ML engineers at a large tech company spend six months trying to reduce P99 latency below 200ms. They spend more time on infrastructure than on models." },
  { year: "2023", title: "Synapse is founded",               body: "Maria, James, and Priya leave their jobs and start building in the Mission District. The prototype routes across three models with sub-50ms latency on day one." },
  { year: "2024", title: "Y Combinator W2024",               body: "Accepted into YC's Winter 2024 batch. The team ships continuous batching, semantic routing, and a public API in twelve weeks. 500 teams sign up in month one." },
  { year: "2025", title: "Series A & global scale",          body: "Synapse raises its Series A and expands to three regions. The platform handles its first billion requests in a single day." },
  { year: "2026", title: "The inference standard",           body: "Today Synapse powers thousands of teams — from two-person startups to Fortune 500 engineering orgs. Still twelve people. Still shipping every week." },
];

function Story() {
  const sectionRef  = useRef<HTMLElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const entriesRef  = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Animated vertical line */
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 70%",
              scrub: true,
            },
          }
        );
      }

      /* Each timeline entry */
      entriesRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%", toggleActions: "play none none none" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative overflow-hidden border-b"
      style={{ background: "#0C0D0D", borderColor: "rgba(255,255,255,0.06)", paddingTop: 120, paddingBottom: 120 }}
    >
      <SectionGlow variant="default" />
      <div className="relative z-10 max-w-[1100px] mx-auto px-8">
        {/* Heading */}
        <div className="mb-16">
          <DotIcon />
          <h2 style={{ fontSize: "clamp(26px, 3vw, 44px)", fontWeight: 400, lineHeight: 1.15, letterSpacing: "-0.04em", color: "#6B7280", maxWidth: 580 }}>
            <span style={{ color: "#F9FAFA" }}>How we got here.</span>{" "}
            Five years obsessing over milliseconds.
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated line */}
          <div
            ref={lineRef}
            className="absolute top-0 bottom-0 hidden lg:block"
            style={{ left: 80, width: 1, background: "linear-gradient(to bottom, rgba(52,213,154,0.6), rgba(52,213,154,0.15))", transform: "scaleY(0)", transformOrigin: "top center" }}
          />

          <div className="space-y-0">
            {TIMELINE.map((item, i) => (
              <div
                key={item.year}
                ref={(el) => { entriesRef.current[i] = el; }}
                className="relative grid lg:grid-cols-[160px_1fr] gap-8 lg:gap-16 py-10 border-b"
                style={{ borderColor: "rgba(255,255,255,0.05)", opacity: 0 }}
              >
                {/* Year column */}
                <div className="flex items-start lg:flex-col gap-4 lg:gap-0">
                  <div
                    className="hidden lg:flex items-center justify-center rounded-full"
                    style={{
                      width: 10, height: 10,
                      marginLeft: 75.5,
                      marginBottom: 14,
                      flexShrink: 0,
                      background: i === TIMELINE.length - 1 ? "#34D59A" : "#0C0D0D",
                      border: `1px solid ${i === TIMELINE.length - 1 ? "#34D59A" : "rgba(255,255,255,0.2)"}`,
                      boxShadow: i === TIMELINE.length - 1 ? "0 0 10px rgba(52,213,154,0.6)" : "none",
                    }}
                  />
                  <span style={{ fontSize: 13, fontWeight: 500, color: i === TIMELINE.length - 1 ? "#34D59A" : "#94979E", fontFamily: "var(--font-mono),monospace" }}>
                    {item.year}
                  </span>
                </div>
                {/* Content */}
                <div>
                  <h3 style={{ fontSize: "clamp(15px, 1.4vw, 21px)", fontWeight: 400, letterSpacing: "-0.02em", color: "#F9FAFA", marginBottom: 10 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 15, color: "#94979E", lineHeight: 1.75, maxWidth: 540 }}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SECTION 5 — TEAM (horizontal pin-scroll)
   Cards move horizontally while page scrolls
══════════════════════════════════════════ */
const TEAM = [
  { name: "Maria Santos", role: "Co-founder & CEO",      initials: "MS", bg: "rgba(52,213,154,0.12)",   color: "#34D59A", bio: "ML Platform, Meta AI Research. Stanford CS PhD." },
  { name: "James Park",   role: "Co-founder & CTO",      initials: "JP", bg: "rgba(124,111,255,0.12)",  color: "#7C6FFF", bio: "Infrastructure Lead, OpenAI. Caltech EE/CS." },
  { name: "Priya Mehta",  role: "Co-founder & CPO",      initials: "PM", bg: "rgba(245,157,74,0.12)",   color: "#F59D4A", bio: "Product Director, Scale AI. MIT EECS." },
  { name: "Alex Kim",     role: "Head of Engineering",   initials: "AK", bg: "rgba(52,213,154,0.08)",   color: "#34D59A", bio: "Senior SWE, Cloudflare Workers. CMU CS." },
  { name: "Rania Hassan", role: "Head of Research",      initials: "RH", bg: "rgba(124,111,255,0.08)",  color: "#7C6FFF", bio: "Research Scientist, Google DeepMind. Oxford DPhil." },
  { name: "Luis Torres",  role: "Head of GTM",           initials: "LT", bg: "rgba(245,157,74,0.08)",   color: "#F59D4A", bio: "Enterprise Sales, Databricks. UT Austin MBA." },
];

function Team() {
  const pinRef   = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pin   = pinRef.current;
      const track = trackRef.current;
      if (!pin || !track) return;

      const getDistance = () => track.scrollWidth - window.innerWidth + 128;

      ScrollTrigger.create({
        trigger: pin,
        start: "top top",
        end: () => `+=${getDistance()}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          gsap.set(track, { x: -self.progress * getDistance() });
        },
        onRefresh: () => {
          const dist = getDistance();
          gsap.set(track, { x: 0 });
          ScrollTrigger.update();
        },
      });
    }, pinRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pinRef}
      style={{ overflow: "hidden", background: "#080909", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Section label — visible while pinned */}
      <div className="pt-16 pb-8 px-8 max-w-[1200px] mx-auto">
        <span className="text-[11px] uppercase tracking-widest block mb-4" style={{ color: "#94979E" }}>The team</span>
        <h2 style={{ fontSize: "clamp(24px, 2.8vw, 40px)", fontWeight: 400, letterSpacing: "-0.04em", color: "#F9FAFA" }}>
          Small team.{" "}
          <span style={{ color: "#6B7280" }}>Massive ambition.</span>
        </h2>
      </div>

      {/* Horizontally scrolling track */}
      <div
        ref={trackRef}
        className="flex"
        style={{ paddingLeft: 64, paddingRight: 64, gap: 20, paddingBottom: 80, width: "max-content" }}
      >
        {TEAM.map((person) => (
          <TiltCard
            key={person.name}
            className="rounded-2xl p-7 flex-shrink-0 relative overflow-hidden"
            style={{ width: 300, background: "#111215", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {/* Inner glow that follows cursor (moved by TiltCard) */}
            <div
              className="card-glow absolute pointer-events-none"
              style={{ width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${person.color}22 0%, transparent 70%)`, top: -50, left: -50 }}
            />
            <div className="relative z-10">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-[15px] font-semibold mb-5"
                style={{ background: person.bg, color: person.color }}
              >
                {person.initials}
              </div>
              <div style={{ fontSize: 16, fontWeight: 500, color: "#F9FAFA", marginBottom: 4 }}>{person.name}</div>
              <div style={{ fontSize: 12, color: person.color, marginBottom: 14 }}>{person.role}</div>
              <p style={{ fontSize: 13, color: "#94979E", lineHeight: 1.65 }}>{person.bio}</p>
            </div>
          </TiltCard>
        ))}

        {/* Hiring card at end of track */}
        <TiltCard
          className="rounded-2xl p-7 flex-shrink-0 relative overflow-hidden flex flex-col justify-between"
          style={{ width: 300, background: "rgba(52,213,154,0.06)", border: "1px solid rgba(52,213,154,0.25)" }}
        >
          <div className="card-glow absolute pointer-events-none" style={{ width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(52,213,154,0.15) 0%, transparent 70%)", top: -50, left: -50 }} />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5" style={{ background: "rgba(52,213,154,0.15)", border: "1px solid rgba(52,213,154,0.3)" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 3v12M3 9h12" stroke="#34D59A" strokeWidth={1.8} strokeLinecap="round" />
              </svg>
            </div>
            <div style={{ fontSize: 18, fontWeight: 500, color: "#F9FAFA", marginBottom: 8 }}>We&apos;re hiring</div>
            <p style={{ fontSize: 13, color: "#94979E", lineHeight: 1.65 }}>
              Remote-first. Competitive equity. Join a team doing outsized work on hard infrastructure problems.
            </p>
          </div>
          <MagneticBtn primary href="#">See open roles →</MagneticBtn>
        </TiltCard>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SECTION 6 — VALUES (mint bg, stagger flip-in)
══════════════════════════════════════════ */
const VALUES = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L12.4 7.5H18l-4.7 3.4 1.8 5.6L10 14l-5.1 3.6 1.8-5.6L3 7.5h5.7L10 2Z" stroke="#2C6D4C" strokeWidth={1.5} strokeLinejoin="round" /></svg>,
    title: "Speed as a virtue",
    body: "Latency isn't a metric — it's a product decision. Every millisecond changes what's possible in a user interaction.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#2C6D4C" strokeWidth={1.5} /><path d="M6 10h8M10 6v8" stroke="#2C6D4C" strokeWidth={1.5} strokeLinecap="round" /></svg>,
    title: "Radical transparency",
    body: "Every request is traced. Every cost is visible. Every outage is post-mortemed in public. We hold ourselves to the same observability standards we build for customers.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="6" height="6" rx="1.5" stroke="#2C6D4C" strokeWidth={1.5} /><rect x="11" y="3" width="6" height="6" rx="1.5" stroke="#2C6D4C" strokeWidth={1.5} /><rect x="3" y="11" width="6" height="6" rx="1.5" stroke="#2C6D4C" strokeWidth={1.5} /><rect x="11" y="11" width="6" height="6" rx="1.5" stroke="#2C6D4C" strokeWidth={1.5} /></svg>,
    title: "Composability over lock-in",
    body: "Open standards, open models, open APIs. Our platform is designed to be a layer in your stack — not a walled garden you can never leave.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 16V8M8 16V4M12 16V9M16 16V6" stroke="#2C6D4C" strokeWidth={1.5} strokeLinecap="round" /></svg>,
    title: "Operator-free by default",
    body: "No MLOps team should be required to run production AI. We automate scaling, routing, failover, and tuning so engineers focus on models, not machines.",
  },
];

function Values() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = document.querySelectorAll(".value-card");
      gsap.fromTo(cards,
        { opacity: 0, y: 50, rotateX: -15 },
        {
          opacity: 1, y: 0, rotateX: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ background: "#E4F1EB" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(44,74,62,0.12) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      <div className="relative max-w-[1200px] mx-auto px-8 py-24">
        <div className="flex items-center gap-2 mb-4">
          <Diamond />
          <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "#2C6D4C", fontFamily: "var(--font-mono),monospace" }}>Our values</span>
        </div>
        <h2 style={{ fontSize: "clamp(26px, 3vw, 44px)", fontWeight: 400, letterSpacing: "-0.04em", color: "#111215", marginBottom: 48, maxWidth: 480 }}>
          Four principles we don&apos;t compromise on.
        </h2>
        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(2, 1fr)", perspective: 800 }}>
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="value-card rounded-2xl p-8 transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(44,74,62,0.1)", opacity: 0 }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { y: -4, boxShadow: "0 16px 40px rgba(44,74,62,0.12)", duration: 0.3, ease: "power2.out" });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { y: 0, boxShadow: "none", duration: 0.4, ease: "power2.out" });
              }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(44,74,62,0.1)" }}>
                {v.icon}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 500, color: "#111215", marginBottom: 10, letterSpacing: "-0.02em" }}>{v.title}</h3>
              <p style={{ fontSize: 14, color: "#4B7860", lineHeight: 1.75 }}>{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SECTION 7 — INVESTORS
══════════════════════════════════════════ */
const INVESTORS = [
  { name: "Y Combinator",         desc: "Lead, W2024",    prominent: true },
  { name: "Andreessen Horowitz",  desc: "Series A lead",  prominent: false },
  { name: "Index Ventures",       desc: "Series A",       prominent: false },
  { name: "Elad Gil",             desc: "Angel",          prominent: false },
  { name: "Nat Friedman",         desc: "Angel",          prominent: false },
  { name: "Andrej Karpathy",      desc: "Advisor",        prominent: false },
];

function Investors() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = document.querySelectorAll(".investor-row");
      gsap.fromTo(items,
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-t"
      style={{ background: "#0C0D0D", borderColor: "rgba(255,255,255,0.06)", paddingTop: 100, paddingBottom: 100 }}
    >
      <SectionGlow variant="dual" />
      <div className="relative z-10 max-w-[1200px] mx-auto px-8">
        <div className="grid gap-20" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <DotIcon />
            <h2 style={{ fontSize: "clamp(24px, 2.8vw, 40px)", fontWeight: 400, letterSpacing: "-0.04em", color: "#6B7280", marginBottom: 20 }}>
              <span style={{ color: "#F9FAFA" }}>Backed by the best.</span>{" "}
              Investors who understand what building at the frontier takes.
            </h2>
            <p style={{ fontSize: 15, color: "#94979E", lineHeight: 1.75, maxWidth: 400 }}>
              Every check came with conviction in open, fast, operator-free AI — from people who have built foundational infrastructure, not just funded it.
            </p>
          </div>
          <div className="space-y-3">
            {INVESTORS.map((inv) => (
              <div
                key={inv.name}
                className="investor-row flex items-center gap-4 px-5 py-4 rounded-xl transition-colors"
                style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.07)", opacity: 0 }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[11px] font-semibold"
                  style={{
                    background: inv.prominent ? "rgba(245,157,74,0.15)" : "rgba(255,255,255,0.05)",
                    color: inv.prominent ? "#F59D4A" : "#94979E",
                    border: `1px solid ${inv.prominent ? "rgba(245,157,74,0.3)" : "rgba(255,255,255,0.07)"}`,
                  }}
                >
                  {inv.name.slice(0, 2).toUpperCase()}
                </div>
                <div style={{ fontSize: 14, color: "#F9FAFA", fontWeight: 500, flex: 1 }}>{inv.name}</div>
                <div
                  className="px-2 py-0.5 rounded text-[11px]"
                  style={{
                    background: inv.prominent ? "rgba(245,157,74,0.1)" : "rgba(255,255,255,0.04)",
                    color: inv.prominent ? "#F59D4A" : "#94979E",
                    border: `1px solid ${inv.prominent ? "rgba(245,157,74,0.25)" : "rgba(255,255,255,0.06)"}`,
                  }}
                >
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

/* ══════════════════════════════════════════
   SECTION 8 — PRESS MARQUEE (GSAP ticker)
══════════════════════════════════════════ */
const PRESS_ITEMS = [
  { pub: "TechCrunch",      text: "\"The inference layer every AI team has been waiting for.\"" },
  { pub: "The Information", text: "\"Quietly becoming the infrastructure beneath the AI economy.\"" },
  { pub: "Forbes AI 50",    text: "\"Most impactful infra company from YC in years.\"" },
  { pub: "Hacker News",     text: "\"Synapse is what I wish existed when I was running models in prod.\"" },
  { pub: "Bloomberg",       text: "\"Moving fast in a market that is only getting bigger.\"" },
];

function Press() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!trackRef.current) return;
      gsap.to(trackRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 32,
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  const doubled = [...PRESS_ITEMS, ...PRESS_ITEMS];

  return (
    <section
      className="border-b overflow-hidden"
      style={{ background: "#080909", borderColor: "rgba(255,255,255,0.06)", paddingTop: 72, paddingBottom: 72 }}
    >
      {/* Heading */}
      <div className="max-w-[1200px] mx-auto px-8 mb-10 flex items-center gap-2">
        <Diamond color="#94979E" />
        <span className="text-[11px] uppercase tracking-widest" style={{ color: "#94979E" }}>In the press</span>
      </div>

      {/* Edge masks */}
      <div
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div ref={trackRef} className="flex" style={{ width: "max-content" }}>
          {doubled.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 px-8 py-6 mx-3 rounded-2xl shrink-0"
              style={{ background: "#111215", border: "1px solid rgba(255,255,255,0.07)", maxWidth: 340 }}
            >
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

/* ══════════════════════════════════════════
   SECTION 9 — BOTTOM CTA with magnetic btns
══════════════════════════════════════════ */
function BottomCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!headRef.current) return;
      const words = headRef.current.querySelectorAll(".word");
      gsap.fromTo(words,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.07,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const ctaHead = "Help us build the inference standard.";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "#0C0D0D", paddingTop: 130, paddingBottom: 130 }}
    >
      <SectionGlow variant="center" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(52,213,154,0.07) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-[620px] mx-auto px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Diamond />
          <span className="text-[11px] uppercase tracking-widest" style={{ color: "#94979E", fontFamily: "var(--font-mono),monospace" }}>Join the team</span>
        </div>

        <h2
          ref={headRef}
          style={{ fontSize: "clamp(26px, 4vw, 50px)", fontWeight: 400, letterSpacing: "-0.04em", color: "#F9FAFA", lineHeight: 1.12, marginBottom: 20 }}
        >
          {ctaHead.split(" ").map((word, i) => (
            <span key={i} className="word inline-block" style={{ marginRight: "0.26em", opacity: 0 }}>{word}</span>
          ))}
        </h2>

        <p style={{ fontSize: 16, color: "#94979E", lineHeight: 1.7, marginBottom: 44 }}>
          Small team, clear mission. If you care about performance, developer experience,
          and making powerful AI accessible — we should talk.
        </p>

        <div className="flex items-center justify-center gap-3">
          <MagneticBtn primary>View open roles</MagneticBtn>
          <MagneticBtn>Get started free</MagneticBtn>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════ */
export default function AboutPage() {
  /* Refresh ScrollTrigger after first paint */
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 300);
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
