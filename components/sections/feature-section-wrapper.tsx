"use client";

import { useState, useEffect, useRef } from "react";

const SECTIONS = [
  { id: "ai",         label: "AI" },
  { id: "autoscaling",label: "Advanced Autoscaling" },
  { id: "branching",  label: "Instant Branching" },
  { id: "auth",       label: "Auth Included" },
  { id: "production", label: "Production-Grade Features" },
];

export default function FeatureSectionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive]       = useState("ai");
  const [navVisible, setNavVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* ── Visibility: scroll-based on the wrapper bounds ── */
  useEffect(() => {
    const check = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const { top, bottom } = el.getBoundingClientRect();
      // Show only when wrapper is genuinely in the viewport,
      // with a 120px bottom margin so it disappears before the next section.
      // Hide nav well before the wrapper ends — use 40% of viewport height
      // so the sidebar disappears before the next (AgentPlatform) section appears.
      const visible = top < window.innerHeight * 0.85 && bottom > window.innerHeight * 0.4;
      setNavVisible(visible);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  /* ── Active section: IntersectionObserver ── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.25, rootMargin: "-80px 0px -30% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const isLight = active === "autoscaling";

  return (
    <div ref={wrapperRef} className="relative">

      {/* Sticky sidebar — fades in/out with the wrapper */}
      <div
        className="hidden lg:block"
        style={{
          position: "sticky",
          top: 120,
          height: 0,
          overflow: "visible",
          zIndex: 20,
          opacity: navVisible ? 1 : 0,
          pointerEvents: navVisible ? "auto" : "none",
          transition: "opacity 0.2s ease",
        }}
      >
        <nav
          className="absolute"
          style={{
            left: "max(24px, calc(50vw - 740px))",
            top: 0,
            paddingTop: 40,
          }}
        >
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="flex items-center gap-3 py-[7px] group"
            >
              <span
                className="shrink-0 rounded-full transition-all"
                style={{
                  width: 6,
                  height: 6,
                  background: active === id
                    ? (isLight ? "#1a3a2a" : "#34D59A")
                    : "transparent",
                  border: active === id
                    ? "none"
                    : `1px solid ${isLight ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.2)"}`,
                }}
              />
              <span
                className="text-[14px] leading-tight transition-colors"
                style={{
                  color: active === id
                    ? (isLight ? "#111215" : "#F9FAFA")
                    : (isLight ? "rgba(0,0,0,0.4)" : "#797D86"),
                }}
              >
                {label}
              </span>
            </a>
          ))}
        </nav>
      </div>

      {/* Sections */}
      <div>{children}</div>
    </div>
  );
}
