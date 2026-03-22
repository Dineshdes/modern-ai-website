"use client";

import { useState, useEffect } from "react";

const SECTIONS = [
  { id: "inference", label: "Inference" },
  { id: "finetuning", label: "Fine-tuning" },
  { id: "vectordb", label: "Vector DB" },
  { id: "autoscaling", label: "Autoscaling" },
  { id: "observability", label: "Observability" },
];

export default function FeatureSectionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeSection, setActiveSection] = useState("inference");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="relative flex max-w-7xl mx-auto px-6">
      {/* Left sidebar */}
      <div className="hidden lg:block w-52 shrink-0">
        <div className="sticky top-24 pt-16">
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="flex items-center gap-3 py-2.5 group"
            >
              <span
                className={`size-1.5 rounded-full shrink-0 transition-colors ${
                  activeSection === id
                    ? "bg-[#00E599]"
                    : "bg-transparent border border-white/20"
                }`}
              />
              <span
                className={`text-[15px] transition-colors ${
                  activeSection === id
                    ? "text-white"
                    : "text-[#797D86] group-hover:text-white/70"
                }`}
              >
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>
      {/* Sections */}
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
