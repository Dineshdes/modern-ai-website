"use client";

import { motion } from "framer-motion";

function DotIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="mb-8 opacity-60">
      {[0,1,2,3,4].map((row) =>
        [0,1,2,3,4].map((col) => {
          if (col > row) return null;
          const opacity = 0.15 + ((row + col) / 8) * 0.85;
          return (
            <circle key={`${row}-${col}`} cx={col*6+3} cy={row*6+3} r={1.5} fill="white" fillOpacity={opacity} />
          );
        })
      )}
    </svg>
  );
}

const FEATURES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M9 2H4a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5" stroke="#00E599" strokeWidth={1.5} strokeLinecap="round"/>
        <path d="M10 10l8-8M14 2h4v4" stroke="#00E599" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "HIPAA and SOC2.",
    desc: "Meet your compliance requirements without high spend commitments.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="#00E599" strokeWidth={1.5}/>
        <path d="M2 10h16M10 2c-2.5 3-4 5-4 8s1.5 5 4 8M10 2c2.5 3 4 5 4 8s-1.5 5-4 8" stroke="#00E599" strokeWidth={1.5}/>
      </svg>
    ),
    title: "Private networking.",
    desc: "Keep traffic off the public internet via PrivateLink, no additional costs.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="6" width="16" height="11" rx="2" stroke="#00E599" strokeWidth={1.5}/>
        <path d="M6 6V4a4 4 0 018 0v2" stroke="#00E599" strokeWidth={1.5} strokeLinecap="round"/>
      </svg>
    ),
    title: "Logs & metrics export.",
    desc: "Forward them directly to Datadog or any OTel-compatible service — no extra fees.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="#00E599" strokeWidth={1.5}/>
        <path d="M10 6v4l3 3" stroke="#00E599" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Uptime SLAs.",
    desc: "99.95% uptime guaranteed by SLA for all workloads in Scale.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M2 10l4 4 4-4 4 4 4-4" stroke="#00E599" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Point-in-time recovery.",
    desc: "Restore your instance instantly to any moment in time without flat monthly fees.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="7" r="4" stroke="#00E599" strokeWidth={1.5}/>
        <path d="M3 18c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="#00E599" strokeWidth={1.5} strokeLinecap="round"/>
      </svg>
    ),
    title: "Single sign-on.",
    desc: "Centralize your team access with SSO to manage logins securely.",
  },
];

export default function ObservabilitySection() {
  return (
    <section
      id="production"
      className="relative py-32 border-b border-white/[0.06] overflow-hidden bg-black"
    >
      <div className="max-w-[1400px] mx-auto px-8 lg:pl-[260px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <DotIcon />
          <h2
            className="font-normal text-[#797D86] max-w-4xl"
            style={{ fontSize: "clamp(32px,3.5vw,48px)", lineHeight: 1.17, letterSpacing: "-1.92px" }}
          >
            <span className="text-white">No platform fees.</span>{" "}
            Enterprise-grade features available to everyone, without fixed fees or monthly minimums.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px border border-white/[0.06] rounded-2xl overflow-hidden"
          style={{ background: "#111215" }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="p-7 border-r border-b border-white/[0.06]"
              style={{
                borderRight: (i + 1) % 3 === 0 ? "none" : undefined,
                borderBottom: i >= 3 ? "none" : undefined,
              }}
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-[15px] font-medium text-white mb-2">{f.title}</h3>
              <p className="text-sm text-[#797D86] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
