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

function BranchVisual() {
  const COLS = 22;
  const ROWS = 3;
  return (
    <div
      className="w-full rounded-2xl overflow-hidden mt-14"
      style={{ background: "#131415", border: "1px solid rgba(255,255,255,0.06)", minHeight: 280 }}
    >
      {/* Branch grid */}
      <div className="relative p-6">
        <svg viewBox="0 0 900 220" style={{ width: "100%", height: 220 }}>
          {/* Grid lines vertical */}
          {Array.from({ length: COLS }, (_, i) => (
            <line key={i} x1={i * (900 / COLS)} y1={0} x2={i * (900 / COLS)} y2={220} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
          ))}
          {/* Grid lines horizontal */}
          {[60, 120, 180].map((y) => (
            <line key={y} x1={0} y1={y} x2={900} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
          ))}

          {/* Main timeline line */}
          <line x1={30} y1={60} x2={870} y2={60} stroke="rgba(255,255,255,0.12)" strokeWidth={1} strokeDasharray="3 5" />
          {/* Secondary lines */}
          <line x1={30} y1={120} x2={600} y2={120} stroke="rgba(255,255,255,0.07)" strokeWidth={1} strokeDasharray="3 5" />
          <line x1={30} y1={180} x2={380} y2={180} stroke="rgba(255,255,255,0.05)" strokeWidth={1} strokeDasharray="3 5" />

          {/* Tick marks on main line */}
          {Array.from({ length: 18 }, (_, i) => (
            <line key={i} x1={50 * (i + 1)} y1={55} x2={50 * (i + 1)} y2={65} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
          ))}

          {/* Branch circles */}
          {[220, 380, 540].map((x) => (
            <circle key={x} cx={x} cy={60} r={5} fill="none" stroke="#34D59A" strokeWidth={1.5} />
          ))}
          {[280, 460].map((x) => (
            <circle key={x} cx={x} cy={120} r={4} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={1} />
          ))}

          {/* "production" pill */}
          <rect x={60} y={44} width={98} height={30} rx={15} fill="#1a1b1e" stroke="rgba(255,255,255,0.18)" strokeWidth={1} />
          <text x={110} y={64} textAnchor="middle" fill="rgba(249,250,250,0.7)" fontSize="11" fontFamily="monospace">
            ≡ production
          </text>

          {/* Active line */}
          <line x1={540} y1={0} x2={540} y2={220} stroke="#34D59A" strokeWidth={1} strokeOpacity={0.5} />
          <circle cx={540} cy={60} r={6} fill="#34D59A" fillOpacity={0.85} />
        </svg>
      </div>

      {/* Timestamps */}
      <div className="border-t grid grid-cols-4 px-6 py-3" style={{ borderColor: "rgba(255,255,255,0.05)", fontFamily: "var(--font-mono), monospace", fontSize: 10, color: "#94979E" }}>
        <span>12:00 <br /><span style={{ color: "rgba(255,255,255,0.3)" }}>main</span></span>
        <span>12:24 <br /><span style={{ color: "rgba(255,255,255,0.3)" }}>schema-v1</span></span>
        <span style={{ color: "#34D59A" }}>13:48 <br /><span>checkpoint</span></span>
        <span>15:00 <br /><span style={{ color: "rgba(255,255,255,0.3)" }}>dev-branch</span></span>
      </div>
    </div>
  );
}

const FEATURES = [
  { icon: "⊞", title: "Copy-on-write", desc: "Create editable copies of models instantly with git-like versioning, saving space and time." },
  { icon: "🛡", title: "Anonymization", desc: "Mask sensitive data with realistic fake values, enabling safe testing and sharing of datasets." },
  { icon: "⏱", title: "Ephemerality", desc: "Obsolete model versions delete themselves automatically after work is complete." },
];

export default function FineTuningSection() {
  return (
    <section
      id="branching"
      className="relative py-28 overflow-hidden border-b"
      style={{ background: "#0C0D0D", borderColor: "rgba(255,255,255,0.06)" }}
    >
      <SectionGlow variant="corner" />
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
            <span style={{ color: "#F9FAFA" }}>Instant branching.</span>{" "}
            Develop and test with efficient copies of any model to eliminate surprises in production deploys.
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
          <BranchVisual />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          {FEATURES.map((f) => (
            <div key={f.title}>
              <div className="text-[18px] mb-3" style={{ color: "#34D59A" }}>{f.icon}</div>
              <h3 className="text-[15px] font-medium mb-2" style={{ color: "#F9FAFA" }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#94979E" }}>{f.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
