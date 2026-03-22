"use client";

import { useState, useEffect } from "react";

const SECTIONS = [
  { id: "ai", label: "AI" },
  { id: "autoscaling", label: "Advanced Autoscaling" },
  { id: "branching", label: "Instant Branching" },
  { id: "auth", label: "Auth Included" },
  { id: "production", label: "Production-Grade Features" },
];

export default function FeatureSectionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState("ai");
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const intersecting = new Set<string>();

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            intersecting.add(id);
            setActive(id);
            setNavVisible(true);
          } else {
            intersecting.delete(id);
            if (intersecting.size === 0) setNavVisible(false);
          }
        },
        { threshold: 0.1, rootMargin: "-60px 0px 0px 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="relative">
      {/* Sticky left sidebar — hidden when outside feature sections */}
      <div
        className="hidden lg:block"
        style={{
          position: "sticky",
          top: 60,
          height: 0,
          overflow: "visible",
          zIndex: 20,
          pointerEvents: navVisible ? "auto" : "none",
          opacity: navVisible ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      >
        <nav
          className="absolute"
          style={{ left: "max(24px, calc(50vw - 740px))", top: 0, paddingTop: 40 }}
        >
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="flex items-center gap-3 py-[7px] group"
            >
              <span
                className={`shrink-0 rounded-full transition-colors ${
                  active === id
                    ? "bg-[#34D59A]"
                    : "bg-transparent border border-white/20"
                }`}
                style={{ width: 6, height: 6 }}
              />
              <span
                className={`text-[14px] leading-tight transition-colors ${
                  active === id
                    ? "text-white"
                    : "text-[#797D86] group-hover:text-white/60"
                }`}
              >
                {label}
              </span>
            </a>
          ))}
        </nav>
      </div>

      {/* Section content */}
      <div>{children}</div>
    </div>
  );
}
