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

const TABLE_ROWS = [
  { id: "a79HQ2Ts6M6YLUF0nKZsp", name: "Susan Frank", slug: "gretchen-siphron", email: "sfrank@invite.de", token: "upx_7V191LeVVc9cF8:vA28.d9C1c4…" },
  { id: "6WrjhHJaxMq77bvEP2uWw", name: "Alfredo Curtis", slug: "alfredo-curtis", email: "alfredo.c@acme.com", token: "upx_b29A8ch8bctu_d07VtqD9h8tuf00Gf2…" },
  { id: "Q6jDsVGtJt0ARPh06Z8fy", name: "Jakob Septimus", slug: "j-septimus", email: "j-septimus@nitbit500.dev", token: "yx25_A0ATI6K1bDo4VNbN7HIDInGDJvx16Jk…" },
  { id: "2X7mnOtkRgE5A6_FcKlQnw", name: "Noran Vaccaro", slug: "noran-vacc", email: "noran-vacc@atforge.co", token: "ya29_A0ATin6CLCEFJi1Vfs4yHwOS2oPc7P…" },
  { id: "cAvJro2yFsMDC2oGev:cDJBz", name: "Martin Kotopaxi", slug: "martin-kot", email: "martin-kot@plannerworks.io", token: "uhc_2lnff55IeCJnTFPFC0wMmH8I0cn4…" },
  { id: "GHfS7OF2AoN9nBLdKPA6F7u", name: "Joslyn Calzoni", slug: "joslyn-calzoni", email: "joslyn.calzoni@arcania.tech.com", token: "ya29_A0ATin6MLjGux2Xl0G5TlMInEkl31lx…" },
];

function AuthTableMockup() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden border border-white/[0.07] mt-14 relative"
      style={{ background: "#0d1117" }}
    >
      {/* Table header */}
      <div className="grid border-b border-white/[0.07] text-[11px] font-mono text-[#797D86]"
        style={{ gridTemplateColumns: "1fr 1fr 1fr 1.5fr 2fr" }}
      >
        {["id", "name", "slug", "email", "access_token"].map((col) => (
          <div key={col} className="px-4 py-3 border-r border-white/[0.05] last:border-0">{col}</div>
        ))}
      </div>

      {/* Table rows */}
      {TABLE_ROWS.map((row, i) => (
        <div
          key={row.id}
          className={`grid border-b border-white/[0.04] text-[11px] font-mono text-[#797D86] hover:bg-white/[0.02] transition-colors ${
            i === TABLE_ROWS.length - 1 ? "border-0" : ""
          }`}
          style={{ gridTemplateColumns: "1fr 1fr 1fr 1.5fr 2fr" }}
        >
          <div className="px-4 py-2.5 border-r border-white/[0.04] truncate text-[#6b7280]">{row.id.substring(0, 16)}…</div>
          <div className="px-4 py-2.5 border-r border-white/[0.04] text-white/60">{row.name}</div>
          <div className="px-4 py-2.5 border-r border-white/[0.04] text-[#6b7280]">{row.slug}</div>
          <div className="px-4 py-2.5 border-r border-white/[0.04] text-[#6b7280] truncate">{row.email}</div>
          <div className="px-4 py-2.5 truncate text-[#6b7280]">{row.token}</div>
        </div>
      ))}

      {/* Centered CTA overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex items-center gap-3 bg-white rounded-full px-5 py-3 shadow-2xl">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">→</div>
          <span className="text-[#111215] font-medium text-sm">Enable Auth</span>
        </div>
      </div>
    </div>
  );
}

export default function VectorDBSection() {
  return (
    <section
      id="auth"
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
            <span className="text-white">Authentication included, free.</span>{" "}
            Simplify your application with user authentication and API key management built in to the platform.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <AuthTableMockup />
        </motion.div>
      </div>
    </section>
  );
}
