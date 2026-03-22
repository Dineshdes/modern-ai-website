"use client";

import { motion } from "framer-motion";

/* Neon-exact dot pattern icon */
function DotIcon({ dark = false }: { dark?: boolean }) {
  const fill = dark ? "#232E2A" : "#94979E";
  return (
    <svg width="40" height="32" viewBox="0 0 40 32" fill="none" className="mb-10">
      {/* Triangle of dots — 5 rows, triangle shape */}
      {[5,4,3,2,1].map((cols, row) =>
        Array.from({ length: cols }, (_, col) => {
          const x = col * 7 + (5 - cols) * 3.5 + 3;
          const y = row * 6 + 3;
          const opacity = 0.2 + ((row + col) / (5 + cols)) * 0.8;
          return (
            <circle key={`${row}-${col}`} cx={x} cy={y} r={1.6} fill={fill} fillOpacity={opacity} />
          );
        })
      )}
    </svg>
  );
}

/* VS Code style IDE mockup */
function IDEMockup() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden mt-14"
      style={{ background: "#131415", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Window chrome */}
      <div
        className="flex items-center gap-2 px-5 border-b"
        style={{ height: 38, background: "#1a1b1e", borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="flex gap-1.5">
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#28c840" }} />
        </div>
        <div
          className="flex items-center gap-1.5 ml-3 px-3 py-1 rounded text-[11px]"
          style={{ background: "#131415", color: "rgba(249,250,250,0.5)", fontFamily: "var(--font-mono), monospace" }}
        >
          <span style={{ opacity: 0.4 }}>📄</span>
          <span>index.ts</span>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#94979E", display: "inline-block", marginLeft: 4 }} />
        </div>
        <span className="ml-auto text-[11px]" style={{ color: "#94979E", fontFamily: "var(--font-mono), monospace" }}>Your Code Editor</span>
      </div>

      {/* 3-pane layout */}
      <div className="grid" style={{ gridTemplateColumns: "172px 1fr 252px", minHeight: 320 }}>
        {/* File tree */}
        <div className="border-r p-3" style={{ background: "#131415", borderColor: "rgba(255,255,255,0.05)", fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "#94979E" }}>
          <div className="uppercase tracking-widest mb-2 px-1" style={{ fontSize: 9, opacity: 0.5, fontWeight: 500 }}>TEST-APP</div>
          {[
            { name: "src", indent: 0, folder: true },
            { name: "lib", indent: 1, folder: true },
            { name: "routes", indent: 1, folder: true },
            { name: "api", indent: 2, folder: true },
            { name: "index.ts", indent: 3, active: true },
            { name: "app.ts", indent: 2 },
            { name: "seed.sql", indent: 1 },
            { name: "tsconfig.json", indent: 1 },
            { name: "package.json", indent: 1 },
            { name: "README.md", indent: 1 },
          ].map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-1 py-[3px] px-1 rounded"
              style={{
                paddingLeft: f.indent * 10 + 4,
                background: f.active ? "rgba(255,255,255,0.06)" : "transparent",
                color: f.active ? "rgba(249,250,250,0.8)" : "#94979E",
              }}
            >
              <span style={{ opacity: 0.6 }}>{f.folder ? "▹" : "⬜"}</span>
              <span style={{ marginLeft: 2 }}>{f.name}</span>
            </div>
          ))}
        </div>

        {/* Code + terminal */}
        <div className="border-r p-4" style={{ borderColor: "rgba(255,255,255,0.05)", fontFamily: "var(--font-mono), monospace", fontSize: 12 }}>
          {[
            [1, <><span style={{color:"#34D59A"}}>import</span><span style={{color:"rgba(249,250,250,0.7)"}}> {"{ sql }"} </span><span style={{color:"#34D59A"}}>from</span><span style={{color:"#AF93EA"}}> &apos;@synapse/serverless&apos;</span></>],
            [2, null],
            [3, <><span style={{color:"#34D59A"}}>export default async function</span><span style={{color:"#F7B983"}}> handler</span><span style={{color:"rgba(249,250,250,0.6)"}}>(req</span></>],
            [4, <><span style={{color:"rgba(249,250,250,0.4)"}}>{"  "}</span><span style={{color:"#34D59A"}}>const</span><span style={{color:"rgba(249,250,250,0.7)"}}> {"{ rows }"} = </span><span style={{color:"#34D59A"}}>await</span><span style={{color:"#AF93EA"}}> sql</span><span style={{color:"#FFED9C"}}>`SELECT * FROM users`</span></>],
            [5, null],
            [6, <><span style={{color:"rgba(249,250,250,0.4)"}}>{"  "}</span><span style={{color:"#F7B983"}}>res</span><span style={{color:"rgba(249,250,250,0.7)"}}>.status(200).json({"{ messages: rows }"})</span></>],
            [7, <><span style={{color:"rgba(249,250,250,0.6)"}}>{"}"}</span></>],
          ].map(([n, code]) => (
            <div key={n as number} className="flex items-start gap-4 leading-[1.65]">
              <span style={{ color: "rgba(255,255,255,0.18)", width: 18, textAlign: "right", flexShrink: 0, userSelect: "none" }}>{n}</span>
              <span>{code}</span>
            </div>
          ))}

          {/* Terminal panel */}
          <div className="mt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <div className="flex gap-5 py-1.5 border-b" style={{ borderColor: "rgba(255,255,255,0.04)", fontSize: 10, color: "#94979E" }}>
              {["Problems", "Output", "Debug Console", "Terminal", "Ports"].map((t) => (
                <span key={t} style={{ color: t === "Terminal" ? "rgba(249,250,250,0.7)" : undefined, borderBottom: t === "Terminal" ? "1px solid rgba(249,250,250,0.4)" : "none", paddingBottom: t === "Terminal" ? 4 : 0 }}>{t}</span>
              ))}
            </div>
            <div className="py-2" style={{ fontSize: 11 }}>
              <div style={{ color: "rgba(249,250,250,0.55)" }}>$ <span style={{ color: "#34D59A" }}>npx synapsectl init</span></div>
              <div style={{ color: "#94979E", marginTop: 4 }}>Synapse Project Initialization</div>
              <div style={{ color: "#94979E" }}>Step 1/3: Configuring MCP Server...</div>
              <div style={{ color: "#94979E" }}>Step 2/3: Creating synapse.md...</div>
              <div style={{ color: "#94979E" }}>Step 3/3: Creating AGENTS.md...</div>
              <div style={{ color: "#34D59A", marginTop: 4 }}>▪ Success! Synapse project initialized.</div>
            </div>
          </div>
        </div>

        {/* Getting started panel */}
        <div className="p-4" style={{ background: "#131415", fontFamily: "var(--font-mono), monospace", fontSize: 12 }}>
          <div className="font-medium mb-3" style={{ color: "rgba(249,250,250,0.8)", fontFamily: "var(--font-sans), sans-serif" }}>Getting started with Synapse</div>
          <div className="mb-3 text-[11px]" style={{ color: "#94979E" }}>Let&apos;s update your client to use Synapse now:</div>

          <div className="rounded-lg p-3 mb-3" style={{ background: "#1a1b1e", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="text-[10px] mb-2" style={{ color: "#94979E" }}>📄 index.ts</div>
            <div style={{ fontSize: 11 }}>
              <div><span style={{color:"#34D59A"}}>import</span><span style={{color:"rgba(249,250,250,0.7)"}}> {"{ synapse }"} </span><span style={{color:"#34D59A"}}>from</span><span style={{color:"#AF93EA"}}> &quot;@synapse/sdk&quot;</span><span style={{color:"rgba(249,250,250,0.6)"}}>;</span></div>
              <div><span style={{color:"#34D59A"}}>const</span><span style={{color:"rgba(249,250,250,0.7)"}}> sql = synapse(process.env.DATABASE_URL!);</span></div>
              <div style={{color:"#94979E"}}>// AI-native operations</div>
            </div>
          </div>

          <div className="text-[11px] mb-2" style={{ color: "#94979E" }}>You&apos;re all set with Synapse! Here&apos;s what I did:</div>
          {[
            "Created new Synapse project",
            "Added DATABASE_URL to .env",
            "Migrated schema",
            "Created lib/synapse.ts with AI ops",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2 text-[11px] mb-1" style={{ color: "#94979E" }}>
              <span style={{ color: "#34D59A", flexShrink: 0 }}>✓</span>
              <span>{item}</span>
            </div>
          ))}

          <div className="mt-4 rounded-lg p-3" style={{ background: "#1a1b1e", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="text-[11px] mb-2" style={{ color: "#94979E" }}>Plan, search, build anything...</div>
            <div className="flex items-center gap-2">
              <div className="px-2 py-0.5 rounded text-[10px]" style={{ background: "rgba(52,213,154,0.12)", color: "#34D59A" }}>✦ Agent</div>
              <div style={{ color: "#94979E", fontSize: 10 }}>GPT-5 ▾</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div
        className="flex items-center justify-between px-6 py-3.5 border-t"
        style={{ background: "#1a1b1e", borderColor: "rgba(255,255,255,0.06)" }}
      >
        <span className="text-sm" style={{ color: "rgba(249,250,250,0.55)" }}>
          Try for yourself, start building with Synapse now.
        </span>
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
          style={{ background: "#131415", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "var(--font-mono), monospace" }}
        >
          <span style={{ color: "#34D59A" }}>$</span>
          <span style={{ color: "rgba(249,250,250,0.6)" }}>npx synapsectl init</span>
          <span className="ml-2 text-xs px-1 rounded" style={{ color: "#94979E", border: "1px solid rgba(255,255,255,0.1)" }}>⧉</span>
        </div>
      </div>
    </div>
  );
}

function MCPRow() {
  const tools = ["VS Code", "Claude", "Cursor", "Windsurf", "Cline"];
  return (
    <div className="mt-10 flex items-center gap-8 flex-wrap">
      <span className="text-sm" style={{ color: "#94979E" }}>Connect AI clients to Synapse:</span>
      {tools.map((t) => (
        <span key={t} className="text-[14px] font-medium" style={{ color: "rgba(249,250,250,0.32)" }}>{t}</span>
      ))}
    </div>
  );
}

export default function InferenceSection() {
  return (
    <section
      id="ai"
      className="relative py-28 overflow-hidden border-b"
      style={{ background: "#0C0D0D", borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-[1400px] mx-auto px-8 lg:pl-[260px]">
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
            <span style={{ color: "#F9FAFA" }}>Inference for the AI Engineering era.</span>{" "}
            Integrate with a single command and the LLM does the hard work.
          </h2>
        </motion.div>

        {/* Tab headers */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-12 flex border-t border-b"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          {["Adds Synapse Rules for correct code", "Adds MCP for safe access to Synapse"].map((tab, i) => (
            <div
              key={tab}
              className="px-6 py-3 text-sm border-r"
              style={{
                borderColor: "rgba(255,255,255,0.06)",
                color: i === 0 ? "rgba(249,250,250,0.7)" : "#94979E",
                borderLeft: i === 0 ? "1px solid rgba(255,255,255,0.06)" : undefined,
              }}
            >
              {tab}
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.14 }}>
          <IDEMockup />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          <MCPRow />
        </motion.div>
      </div>
    </section>
  );
}
