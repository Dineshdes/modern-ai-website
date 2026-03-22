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

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.25, rootMargin: "-80px 0px -30% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="relative">
      {/* Sticky left sidebar — overlaid on content */}
      <div
        className="hidden lg:block"
        style={{
          position: "sticky",
          top: 60,
          height: 0,
          overflow: "visible",
          zIndex: 20,
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
                    ? "bg-[#00E599]"
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
