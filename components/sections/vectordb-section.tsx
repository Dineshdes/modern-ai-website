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

const ROWS = [
  { id: "a79HQ2Ts6M…", name: "Susan Frank", slug: "gretchen-siphron", email: "sfrank@invite.de", token: "upx_7V191Le…" },
  { id: "6WrjhHJax…", name: "Alfredo Curtis", slug: "alfredo-curtis", email: "alfredo.c@acme.com", token: "upx_b29A8ch…" },
  { id: "Q6jDsVGtJ…", name: "Jakob Septimus", slug: "j-septimus", email: "j-septimus@dev.io", token: "yx25_A0ATI6…" },
  { id: "2X7mnOtk…", name: "Noran Vaccaro", slug: "noran-vacc", email: "noran@atforge.co", token: "ya29_A0ATin…" },
  { id: "cAvJro2y…", name: "Martin Kotopaxi", slug: "martin-kot", email: "martin@planners.io", token: "uhc_2lnff55…" },
  { id: "GHfS7OF2…", name: "Joslyn Calzoni", slug: "joslyn-calzoni", email: "joslyn@arcania.tech", token: "ya29_A0ATin…" },
  { id: "1MLjGp0J…", name: "Sianna Bettervolt", slug: "sianna-westervolt", email: "sianna@acme.dev", token: "uhc_Dlgh7ph…" },
  { id: "8ZtolHek…", name: "Corey Septimus", slug: "corey-septimus", email: "corey@northwave.dev", token: "ya29_lo1G4a…" },
];

export default function VectorDBSection() {
  return (
    <section
      id="auth"
      className="relative py-48 overflow-hidden border-b"
      style={{ background: "#0C0D0D", borderColor: "rgba(255,255,255,0.06)", scrollSnapAlign: "start", scrollSnapStop: "always" }}
    >
      <SectionGlow variant="dual" />
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
            <span style={{ color: "#F9FAFA" }}>Authentication included, free.</span>{" "}
            Simplify your application with user authentication and management built in to the platform.
          </h2>
        </motion.div>

        {/* Table mockup */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-14 relative rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.07)", background: "#0d0e0f" }}
        >
          {/* Header row */}
          <div
            className="grid border-b"
            style={{ gridTemplateColumns: "1.2fr 1fr 1fr 1.4fr 1.6fr", borderColor: "rgba(255,255,255,0.06)", fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "#94979E" }}
          >
            {["id", "name", "slug", "email", "access_token"].map((col) => (
              <div key={col} className="px-4 py-3 border-r last:border-0" style={{ borderColor: "rgba(255,255,255,0.04)" }}>{col}</div>
            ))}
          </div>

          {/* Data rows */}
          {ROWS.map((row, i) => (
            <div
              key={row.id}
              className="grid border-b last:border-0 transition-colors"
              style={{
                gridTemplateColumns: "1.2fr 1fr 1fr 1.4fr 1.6fr",
                borderColor: "rgba(255,255,255,0.04)",
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                color: i % 2 === 0 ? "#94979E" : "#7d8087",
              }}
            >
              <div className="px-4 py-2.5 border-r truncate" style={{ borderColor: "rgba(255,255,255,0.03)" }}>{row.id}</div>
              <div className="px-4 py-2.5 border-r truncate" style={{ borderColor: "rgba(255,255,255,0.03)", color: "rgba(249,250,250,0.6)" }}>{row.name}</div>
              <div className="px-4 py-2.5 border-r truncate" style={{ borderColor: "rgba(255,255,255,0.03)" }}>{row.slug}</div>
              <div className="px-4 py-2.5 border-r truncate" style={{ borderColor: "rgba(255,255,255,0.03)" }}>{row.email}</div>
              <div className="px-4 py-2.5 truncate">{row.token}</div>
            </div>
          ))}

          {/* "Enable Auth" CTA overlay — centered */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: "none" }}>
            <div
              className="flex items-center gap-3 px-5 py-3 rounded-full shadow-2xl"
              style={{ background: "#F9FAFA", boxShadow: "0 8px 40px rgba(0,0,0,0.6)" }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium" style={{ background: "#3b82f6" }}>
                →
              </div>
              <span className="text-[15px] font-medium" style={{ color: "#0C0D0D" }}>Enable Auth</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
