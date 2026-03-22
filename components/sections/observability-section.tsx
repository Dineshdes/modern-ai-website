"use client";

import { motion } from "framer-motion";

const metrics = [
  { value: "12,847", label: "req/min", badge: "↑8%", badgeColor: "text-[#34D59A]" },
  { value: "48ms", label: "p99 latency", badge: "✓", badgeColor: "text-[#34D59A]" },
  { value: "0.02%", label: "error rate", badge: "✓", badgeColor: "text-[#34D59A]" },
  { value: "$0.0012", label: "per 1k tokens", badge: null, badgeColor: "" },
];

export default function ObservabilitySection() {
  return (
    <section
      id="observability"
      className="relative py-32 border-b border-white/[0.06] bg-black"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-medium text-[#00E599] uppercase tracking-widest mb-6">
              Observability
            </p>
            <h2 className="text-[48px] leading-[54px] font-normal tracking-[-0.04em] text-[#797D86]">
              <span className="text-white">Full visibility.</span>{" "}
              Every inference request logged and measured.
            </h2>
            <p className="text-[#797D86] text-lg leading-relaxed mt-6 max-w-lg">
              Token usage, latency distributions, error rates, and cost
              breakdowns — streamed in real time. Set alerts in Slack,
              PagerDuty, or any webhook.
            </p>
            <ul className="mt-6 space-y-3">
              {["Real-time logs", "Latency histograms", "Cost analytics"].map(
                (item) => (
                  <li key={item} className="flex items-center">
                    <span className="size-1.5 rounded-full bg-[#34D59A] mr-3 flex-shrink-0" />
                    <span className="text-[15px] text-[#797D86]">{item}</span>
                  </li>
                )
              )}
            </ul>
            <a
              href="#"
              className="text-[15px] text-white hover:text-[#00E599] transition-colors mt-8 inline-flex items-center gap-1.5"
            >
              View observability docs →
            </a>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-[#111215] rounded-2xl p-4 border border-white/[0.06]">
              <p className="text-xs text-[#797D86] font-mono mb-4 px-1">
                LIVE METRICS
              </p>
              <div className="grid grid-cols-2 gap-3">
                {metrics.map((m, i) => (
                  <div
                    key={i}
                    className="bg-[#18191B] rounded-xl p-4 border border-white/[0.06]"
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-[22px] font-normal text-white tracking-tight">
                        {m.value}
                      </p>
                      {m.badge && (
                        <span className={`text-xs font-medium ${m.badgeColor}`}>
                          {m.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#797D86] mt-1">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Sparkline */}
              <div className="mt-4 bg-[#18191B] rounded-xl p-4 border border-white/[0.06]">
                <p className="text-xs text-[#797D86] mb-3">Request volume</p>
                <svg
                  viewBox="0 0 280 50"
                  className="w-full"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="sparkGrad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#00E599"
                        stopOpacity="0.15"
                      />
                      <stop
                        offset="100%"
                        stopColor="#00E599"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>
                  <polyline
                    points="0,40 25,35 50,30 75,25 100,30 125,20 150,15 175,20 200,18 225,12 250,10 280,8"
                    fill="none"
                    stroke="#00E599"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="0,40 25,35 50,30 75,25 100,30 125,20 150,15 175,20 200,18 225,12 250,10 280,8 280,50 0,50"
                    fill="url(#sparkGrad)"
                    stroke="none"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
