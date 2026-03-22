"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/* ─── Halftone Dot Pattern SVG ─── */
function HalftoneBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1400 700"
      aria-hidden
      style={{ pointerEvents: "none" }}
    >
      <defs>
        {/* Teal dot tile */}
        <pattern id="tealDot" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="8" cy="8" r="2.6" fill="#34D59A" />
        </pattern>

        {/* Orange dot tile */}
        <pattern id="orangeDot" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="8" cy="8" r="2.6" fill="#F97316" />
        </pattern>

        {/* Left fade: full opacity at left, transparent at right */}
        <linearGradient id="fadeL" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.65" />
          <stop offset="35%"  stopColor="white" stopOpacity="0.45" />
          <stop offset="65%"  stopColor="white" stopOpacity="0.12" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        {/* Right fade: full opacity at right, transparent at left */}
        <linearGradient id="fadeR" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.65" />
          <stop offset="35%"  stopColor="white" stopOpacity="0.45" />
          <stop offset="65%"  stopColor="white" stopOpacity="0.12" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        {/* Top/bottom vertical fade for both patterns */}
        <linearGradient id="fadeV" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="white" stopOpacity="0" />
          <stop offset="12%"  stopColor="white" stopOpacity="1" />
          <stop offset="88%"  stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        {/* Combined masks = horizontal × vertical fade */}
        <mask id="maskLeft">
          <rect x="0"   y="0" width="620" height="700" fill="url(#fadeL)" />
        </mask>
        <mask id="maskRight">
          <rect x="780" y="0" width="620" height="700" fill="url(#fadeR)" />
        </mask>

        {/* Vertical crop masks */}
        <mask id="maskLeftV">
          <rect x="0"   y="0" width="620" height="700" fill="url(#fadeV)" />
        </mask>
        <mask id="maskRightV">
          <rect x="780" y="0" width="620" height="700" fill="url(#fadeV)" />
        </mask>
      </defs>

      {/* Left teal halftone — two rects layered: horizontal fade + vertical fade */}
      <rect x="0"   y="0" width="620" height="700" fill="url(#tealDot)"   mask="url(#maskLeft)"   />

      {/* Right orange halftone */}
      <rect x="780" y="0" width="620" height="700" fill="url(#orangeDot)" mask="url(#maskRight)"  />
    </svg>
  );
}

/* ─── Code Editor Mockup ─── */
function CodeEditorMockup() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{
        border: "1px solid rgba(255,255,255,0.1)",
        background: "#111214",
        boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ borderColor: "rgba(255,255,255,0.07)", background: "#0d0e10" }}
      >
        <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
        <span
          className="mx-auto text-[11px]"
          style={{ color: "#6b7280", fontFamily: "var(--font-mono), monospace" }}
        >
          Your Code Editor
        </span>
      </div>

      {/* Split body */}
      <div className="grid grid-cols-[220px_1fr_1fr]">

        {/* File tree */}
        <div className="p-4" style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-[10px] uppercase tracking-widest mb-3" style={{ color: "#4b5563", fontFamily: "var(--font-mono), monospace" }}>
            MY-AI-APP
          </p>
          {[
            { indent: 0, icon: "▸", name: "src", type: "folder" },
            { indent: 1, icon: "▸", name: "lib", type: "folder" },
            { indent: 1, icon: "▸", name: "routes", type: "folder" },
            { indent: 2, icon: "▸", name: "api", type: "folder" },
            { indent: 3, icon: "◻", name: "index.ts", type: "file", active: true },
            { indent: 2, icon: "◻", name: "app.tsx", type: "file" },
            { indent: 0, icon: "◻", name: ".env", type: "file" },
            { indent: 0, icon: "◻", name: "synapse.md", type: "file", highlight: true },
            { indent: 0, icon: "◻", name: "package.json", type: "file" },
            { indent: 0, icon: "◻", name: "README.md", type: "file" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 py-[3px]"
              style={{
                paddingLeft: item.indent * 12 + 4,
                color: item.active ? "#F9FAFA" : item.highlight ? "#34D59A" : "#6b7280",
                fontSize: 12,
                fontFamily: "var(--font-mono), monospace",
                background: item.active ? "rgba(255,255,255,0.05)" : "transparent",
                borderRadius: 3,
              }}
            >
              <span style={{ fontSize: 8, opacity: 0.5 }}>{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        {/* Code editor */}
        <div style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
          {/* Tab bar */}
          <div className="flex border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <div
              className="px-4 py-2 text-[11px] flex items-center gap-2"
              style={{
                fontFamily: "var(--font-mono), monospace",
                color: "#F9FAFA",
                borderBottom: "1px solid #34D59A",
              }}
            >
              index.ts
              <span style={{ opacity: 0.4, fontSize: 10 }}>✕</span>
            </div>
          </div>

          {/* Code lines */}
          <div className="p-4 text-[11px]" style={{ fontFamily: "var(--font-mono), monospace", lineHeight: 1.8 }}>
            {[
              { n: 1,  code: <><span style={{color:"#7dd3fc"}}>import</span> <span style={{color:"#fbbf24"}}>{"{ synapse }"}</span> <span style={{color:"#7dd3fc"}}>from</span> <span style={{color:"#86efac"}}>&apos;@synapse/sdk&apos;</span></> },
              { n: 2,  code: "" },
              { n: 3,  code: <><span style={{color:"#c084fc"}}>export default async</span> <span style={{color:"#fbbf24"}}>function</span> <span style={{color:"#60a5fa"}}>handler</span><span style={{color:"#94a3b8"}}>(req) {"{"}</span></> },
              { n: 4,  code: <><span style={{color:"#94a3b8", paddingLeft: 16}}>const </span><span style={{color:"#fbbf24"}}>{"{ data }"}</span> <span style={{color:"#94a3b8"}}>=</span> <span style={{color:"#7dd3fc"}}>await</span></> },
              { n: 5,  code: <><span style={{color:"#94a3b8", paddingLeft: 32}}>synapse.</span><span style={{color:"#60a5fa"}}>inference</span><span style={{color:"#94a3b8"}}>({"{"}model: </span><span style={{color:"#86efac"}}>&apos;llama-3.1-70b&apos;</span><span style={{color:"#94a3b8"}}>{"}"});</span></> },
              { n: 6,  code: "" },
              { n: 7,  code: <><span style={{color:"#94a3b8", paddingLeft: 16}}>res.</span><span style={{color:"#60a5fa"}}>status</span><span style={{color:"#94a3b8"}}>(200).</span><span style={{color:"#60a5fa"}}>json</span><span style={{color:"#94a3b8"}}>({"{ data })"}</span></> },
              { n: 8,  code: <><span style={{color:"#94a3b8"}}>{"}"}</span></> },
            ].map(({ n, code }) => (
              <div key={n} className="flex gap-4">
                <span style={{ color: "#374151", width: 16, textAlign: "right", flexShrink: 0 }}>{n}</span>
                <span>{code}</span>
              </div>
            ))}
          </div>

          {/* Terminal */}
          <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="flex gap-4 border-b px-4 py-1.5" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              {["Problems", "Output", "Debug Console", "Terminal", "Ports"].map((t) => (
                <span
                  key={t}
                  className="text-[10px]"
                  style={{
                    color: t === "Terminal" ? "#F9FAFA" : "#4b5563",
                    borderBottom: t === "Terminal" ? "1px solid #34D59A" : "none",
                    paddingBottom: 4,
                    fontFamily: "var(--font-mono), monospace",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="p-4 text-[10px]" style={{ fontFamily: "var(--font-mono), monospace", lineHeight: 1.9 }}>
              <div style={{ color: "#94979E" }}>$ npx synapsectl init</div>
              <div style={{ color: "#4b5563" }}>Synapse Project Initialization</div>
              <div style={{ color: "#4b5563" }}>Step 1/3: <span style={{ color: "#6b7280" }}>Configuring Synapse MCP Server...</span></div>
              <div style={{ color: "#4b5563" }}>Step 2/3: <span style={{ color: "#6b7280" }}>Creating synapse.md with endpoints...</span></div>
              <div style={{ color: "#4b5563" }}>Step 3/3: <span style={{ color: "#6b7280" }}>Creating AGENTS.md...</span></div>
              <div style={{ color: "#34D59A" }}>▪ Success! Synapse project initialized.</div>
            </div>
          </div>
        </div>

        {/* Right: Setup panel */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[13px] font-medium" style={{ color: "#F9FAFA" }}>Getting started with Synapse</p>
            <span style={{ color: "#4b5563", fontSize: 16 }}>···</span>
          </div>

          <p className="text-[12px] mb-4" style={{ color: "#94979E", lineHeight: 1.6 }}>
            Let&apos;s connect your app to the Synapse inference API:
          </p>

          {/* Code snippet */}
          <div className="rounded-lg p-3 mb-5" style={{ background: "#0d0e10", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-[10px] mb-2" style={{ color: "#4b5563", fontFamily: "var(--font-mono), monospace" }}>
              synapse.ts
            </p>
            <div className="text-[10px]" style={{ fontFamily: "var(--font-mono), monospace", lineHeight: 1.8, color: "#94979E" }}>
              <div><span style={{ color: "#7dd3fc" }}>import</span> <span style={{ color: "#fbbf24" }}>{"{ synapse }"}</span> <span style={{ color: "#7dd3fc" }}>from</span> <span style={{ color: "#86efac" }}>&quot;@synapse/sdk&quot;</span>;</div>
              <div><span style={{ color: "#c084fc" }}>const</span> ai = <span style={{ color: "#60a5fa" }}>synapse</span>(process.env.<span style={{ color: "#fbbf24" }}>SYNAPSE_API_KEY</span>);</div>
              <div style={{ color: "#374151" }}>// Inference ready</div>
            </div>
          </div>

          <p className="text-[12px] mb-4" style={{ color: "#94979E", lineHeight: 1.5 }}>
            You&apos;re all set with Synapse! Here&apos;s what was configured:
          </p>

          {/* Checklist */}
          <div className="space-y-2 mb-5">
            {[
              { text: "Created new Synapse project", tag: null },
              { text: "Added", tag: "SYNAPSE_API_KEY", suffix: "to .env" },
              { text: "Configured inference endpoint", tag: null },
              { text: "Created", tag: "lib/synapse.ts", suffix: "with helpers" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-[11px]" style={{ color: "#94979E" }}>
                <span style={{ color: "#34D59A" }}>✓</span>
                <span>{item.text}</span>
                {item.tag && (
                  <code
                    className="px-1.5 py-0.5 rounded text-[10px]"
                    style={{ background: "rgba(52,213,154,0.12)", color: "#34D59A", fontFamily: "var(--font-mono), monospace" }}
                  >
                    {item.tag}
                  </code>
                )}
                {item.suffix && <span>{item.suffix}</span>}
              </div>
            ))}
          </div>

          {/* Input area */}
          <div className="rounded-lg px-3 py-2.5 flex items-center" style={{ background: "#0d0e10", border: "1px solid rgba(255,255,255,0.07)" }}>
            <span className="flex-1 text-[11px]" style={{ color: "#374151", fontFamily: "var(--font-mono), monospace" }}>
              Plan, search, build anything...
            </span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[9px]" style={{ background: "rgba(52,213,154,0.15)", color: "#34D59A", fontFamily: "var(--font-mono), monospace" }}>
                ✦ Agent
              </span>
              <span className="text-[10px]" style={{ color: "#4b5563" }}>GPT-5 ▾</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Column labels at top ─── */
function TopLabels() {
  return (
    <div className="border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="max-w-[1400px] mx-auto grid grid-cols-3">
        {[
          "Adds Synapse Rules for correct AI code",
          "Adds MCP for safe access to Synapse",
          "Auto-scales your inference endpoints",
        ].map((label, i) => (
          <div
            key={i}
            className="px-8 py-6 text-[11px]"
            style={{
              color: "#4b5563",
              fontFamily: "var(--font-mono), monospace",
              borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CTAFinal() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npx synapsectl init");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden" style={{ background: "#0C0D0D" }}>
      {/* Halftone dot pattern background */}
      <HalftoneBackground />

      {/* Top column labels */}
      <div className="relative z-10">
        <TopLabels />
      </div>

      {/* Editor area */}
      <div className="relative z-10 px-8 py-14">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <CodeEditorMockup />
        </motion.div>
      </div>

      {/* Bottom CTA bar */}
      <div className="relative z-10 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1400px] mx-auto px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[15px]" style={{ color: "rgba(249,250,250,0.7)" }}>
            Try for yourself, start building with Synapse now.
          </p>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-3 px-5 h-11 rounded-xl text-[13px] transition-all shrink-0"
            style={{
              background: "#131415",
              color: "#F9FAFA",
              border: "1px solid rgba(255,255,255,0.1)",
              fontFamily: "var(--font-mono), monospace",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
          >
            <span style={{ color: "#94979E" }}>$</span>
            <span>npx synapsectl init</span>
            <span
              className="ml-1 text-[11px] px-1.5 py-0.5 rounded"
              style={{
                background: copied ? "rgba(52,213,154,0.15)" : "rgba(255,255,255,0.06)",
                color: copied ? "#34D59A" : "#6b7280",
                transition: "all 0.2s",
              }}
            >
              {copied ? "✓" : "⧉"}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
