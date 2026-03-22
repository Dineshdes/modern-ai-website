"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "Inference", href: "#inference" },
  { label: "Fine-tuning", href: "#finetuning" },
  { label: "Vector DB", href: "#vectordb" },
  { label: "Autoscaling", href: "#autoscaling" },
  { label: "Observability", href: "#observability" },
];

export default function FeatureNav() {
  const [activeId, setActiveId] = useState("inference");

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(id);
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return (
    <div className="sticky top-[104px] z-40 bg-black/90 backdrop-blur-sm border-b border-white/[0.06] overflow-x-auto">
      <div className="flex items-center max-w-7xl mx-auto px-6 h-12">
        {navItems.map((item) => {
          const id = item.href.slice(1);
          const isActive = activeId === id;
          return (
            <a
              key={item.href}
              href={item.href}
              className={[
                "text-[15px] font-normal px-[18px] py-1.5 whitespace-nowrap transition-colors border-r border-white/[0.06] last:border-r-0",
                isActive
                  ? "text-white"
                  : "text-[#797D86] hover:text-white",
              ].join(" ")}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
