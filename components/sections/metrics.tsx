"use client";

import { AnimatedCounter } from "@/components/shared/animated-counter";

const metrics = [
  { value: "10B+", label: "Tokens processed daily" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "<50ms", label: "P99 inference latency" },
  { value: "180+", label: "Countries served" },
];

export function Metrics() {
  return (
    <section className="bg-[#111111] border-y border-white/[0.06] py-16">
      <div className="max-w-[1216px] mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06]">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex-1 py-8 sm:py-0 sm:px-12 first:pl-0 last:pr-0">
              <AnimatedCounter value={metric.value} label={metric.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
