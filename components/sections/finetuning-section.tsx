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

function BranchingVisualization() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden border border-white/[0.07] mt-14 relative"
      style={{ background: "#0a0a0a", minHeight: 300 }}
    >
      {/* Timeline grid */}
      <div className="relative">
        {/* Grid columns */}
        <svg viewBox="0 0 1000 280" className="w-full" style={{ height: 280 }}>
          {/* Vertical grid lines */}
          {Array.from({ length: 20 }, (_, i) => (
            <line key={i} x1={i * 52} y1={0} x2={i * 52} y2={280} stroke="#ffffff08" strokeWidth={1} />
          ))}
          {/* Horizontal row lines */}
          {[70, 140, 210].map((y) => (
            <line key={y} x1={0} y1={y} x2={1000} y2={y} stroke="#ffffff06" strokeWidth={1} />
          ))}

          {/* Main branch line (horizontal) */}
          <line x1={40} y1={70} x2={960} y2={70} stroke="#ffffff15" strokeWidth={1} strokeDasharray="3 5" />
          <line x1={40} y1={140} x2={960} y2={140} stroke="#ffffff15" strokeWidth={1} strokeDasharray="3 5" />
          <line x1={40} y1={210} x2={500} y2={210} stroke="#ffffff15" strokeWidth={1} strokeDasharray="3 5" />

          {/* Tick markers on main line */}
          {Array.from({ length: 14 }, (_, i) => (
            <line key={i} x1={52 * (i + 1)} y1={65} x2={52 * (i + 1)} y2={75} stroke="#ffffff20" strokeWidth={1} />
          ))}

          {/* Branch indicator dots */}
          {[200, 350, 520].map((x) => (
            <circle key={x} cx={x} cy={70} r={4} fill="none" stroke="#00E599" strokeWidth={1.5} />
          ))}
          {[280, 420].map((x) => (
            <circle key={x} cx={x} cy={140} r={4} fill="none" stroke="#ffffff30" strokeWidth={1} />
          ))}

          {/* "production" pill badge */}
          <rect x={80} y={55} width={90} height={28} rx={14} fill="#111215" stroke="#ffffff20" strokeWidth={1} />
          <text x={125} y={74} textAnchor="middle" fill="#ffffff80" fontSize="11" fontFamily="monospace">
            ≡ production
          </text>

          {/* Active checkpoint line */}
          <line x1={520} y1={0} x2={520} y2={280} stroke="#00E599" strokeWidth={1} strokeOpacity={0.6} />
          <circle cx={520} cy={70} r={5} fill="#00E599" fillOpacity={0.8} />
        </svg>
      </div>

      {/* Timestamps row */}
      <div className="border-t border-white/[0.06] px-6 py-3 grid grid-cols-4 text-[10px] font-mono text-[#797D86]">
        <span>12:00 <br /><span className="text-white/30">main</span></span>
        <span>12:24 <br /><span className="text-white/30">schema-v1</span></span>
        <span className="text-[#00E599]">13:48 <br /><span>checkpoint</span></span>
        <span>14:30 <br /><span className="text-white/30">dev-branch</span></span>
      </div>
    </div>
  );
}

const features = [
  {
    icon: "⊞",
    title: "Copy-on-write",
    desc: "Create editable copies of models instantly with git-like branching, saving space and time.",
  },
  {
    icon: "🛡",
    title: "Anonymization",
    desc: "Mask sensitive data with realistic fake values, enabling safe testing and sharing of datasets.",
  },
  {
    icon: "⏱",
    title: "Ephemerality",
    desc: "Obsolete branches delete themselves automatically after work is complete.",
  },
];

export default function FineTuningSection() {
  return (
    <section
      id="branching"
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
            <span className="text-white">Instant branching.</span>{" "}
            Develop and test with efficient copies of any model to eliminate surprises in production deploys.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <BranchingVisualization />
        </motion.div>

        {/* 3-col feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/[0.06] pt-8"
        >
          {features.map((f) => (
            <div key={f.title}>
              <div className="text-[#00E599] text-lg mb-3">{f.icon}</div>
              <h3 className="text-[15px] font-medium text-white mb-2">{f.title}</h3>
              <p className="text-sm text-[#797D86] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
