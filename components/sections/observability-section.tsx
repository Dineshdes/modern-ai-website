"use client";

import { motion } from "framer-motion";
import SectionGlow from "@/components/ui/section-glow";

function DotIcon() {
  return (
    <svg width="40" height="32" viewBox="0 0 40 32" fill="none" className="mb-10">
      {[5,4,3,2,1].map((cols, row) =>
        Array.from({ length: cols }, (_, col) => {
          const x = col * 7 + (5 - cols) * 3.5 + 3;
          const y = row * 6 + 3;
          const opacity = 0.2 + ((row + col) / (5 + cols)) * 0.8;
          return <circle key={`${row}-${col}`} cx={x} cy={y} r={1.6} fill="#94979E" fillOpacity={opacity} />;
        })
      )}
    </svg>
  );
}

function GreenIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4" style={{ color: "#34D59A" }}>
      {children}
    </div>
  );
}

const FEATURES = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2H4a2 2 0 00-2 2v11a2 2 0 002 2h12a2 2 0 002-2v-5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"/><path d="M9.5 10.5l8-8M14 2h4v4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: "HIPAA and SOC2.",
    desc: "Meet your compliance requirements without high spend commitments.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth={1.5}/><path d="M2 10h16M10 2c-2.5 3-4 5-4 8s1.5 5 4 8M10 2c2.5 3 4 5 4 8s-1.5 5-4 8" stroke="currentColor" strokeWidth={1.5}/></svg>,
    title: "Private networking.",
    desc: "Keep traffic off the public internet via PrivateLink, no additional costs.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="8" width="16" height="9" rx="2" stroke="currentColor" strokeWidth={1.5}/><path d="M6 8V5a4 4 0 018 0v3" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"/><path d="M4 14h3M10 14h6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"/></svg>,
    title: "Logs & metrics export.",
    desc: "Forward them directly to Datadog or any OTel-compatible service — no extra fees.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth={1.5}/><path d="M10 6v4l3 3" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: "Uptime SLAs.",
    desc: "99.95% uptime guaranteed by SLA for all workloads in Scale.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 9l7-6 7 6v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round"/><path d="M8 18v-6h4v6" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round"/></svg>,
    title: "Point-in-time recovery.",
    desc: "Restore your instance instantly to any moment in time without flat monthly fees.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth={1.5}/><path d="M3.5 18c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"/></svg>,
    title: "Single sign-on.",
    desc: "Centralize your team access with SSO to manage logins securely.",
  },
];

export default function ObservabilitySection() {
  return (
    <section
      id="production"
      className="relative py-48 overflow-hidden border-b"
      style={{ background: "#0C0D0D", borderColor: "rgba(255,255,255,0.06)" }}
    >
      <SectionGlow variant="center" />
      <div className="relative max-w-[1400px] mx-auto px-8 lg:pl-[260px]">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <DotIcon />
          <h2
            style={{
              fontSize: "clamp(28px, 3.2vw, 48px)",
              fontWeight: 400,
              lineHeight: 1.125,
              letterSpacing: "-0.04em",
              color: "#6B7280",
              textIndent: "96px",
            }}
          >
            <span style={{ color: "#F9FAFA" }}>No platform fees.</span>{" "}
            Enterprise-grade features available to everyone, without fixed fees or monthly minimums.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-16 rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3"
          style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="p-7"
              style={{
                borderRight: (i + 1) % 3 !== 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <GreenIcon>{f.icon}</GreenIcon>
              <h3 className="font-medium mb-2" style={{ fontSize: 18, color: "#F9FAFA" }}>{f.title}</h3>
              <p className="leading-relaxed" style={{ fontSize: 15, color: "#94979E" }}>{f.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
