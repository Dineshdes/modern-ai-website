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
            <circle
              key={`${row}-${col}`}
              cx={col * 6 + 3}
              cy={row * 6 + 3}
              r={1.5}
              fill="white"
              fillOpacity={opacity}
            />
          );
        })
      )}
    </svg>
  );
}

function CodeEditorMockup() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden border border-white/[0.07] mt-14"
      style={{ background: "#0d1117" }}
    >
      {/* Tab bar */}
      <div
        className="flex items-center border-b border-white/[0.06] px-4"
        style={{ background: "#161b22", height: 40 }}
      >
        <div className="flex gap-1.5 mr-4">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex items-center gap-1 bg-[#0d1117] rounded-md px-3 py-1 text-[11px] text-white/60 font-mono">
          <span className="text-white/30">📄</span>
          <span>index.ts</span>
          <span className="ml-1 w-1.5 h-1.5 rounded-full bg-[#797D86]" />
        </div>
        <span className="ml-2 text-[11px] text-[#797D86] font-mono">Your Code Editor</span>
      </div>

      <div className="grid grid-cols-[180px_1fr_260px] min-h-[340px]">
        {/* File tree */}
        <div
          className="border-r border-white/[0.06] p-3 font-mono text-[11px] text-[#797D86]"
          style={{ background: "#0d1117" }}
        >
          <div className="mb-2 text-white/40 uppercase tracking-widest text-[9px] font-semibold px-1">TEST-APP</div>
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
              className={`flex items-center gap-1 py-0.5 px-1 rounded ${f.active ? "bg-white/[0.06] text-white/80" : "hover:bg-white/[0.04]"}`}
              style={{ paddingLeft: `${f.indent * 10 + 4}px` }}
            >
              {f.folder ? (
                <span className="text-[#797D86]">▹</span>
              ) : (
                <span className="text-[#797D86]">📄</span>
              )}
              <span>{f.name}</span>
            </div>
          ))}
        </div>

        {/* Code editor */}
        <div className="p-4 font-mono text-[12px] border-r border-white/[0.06]">
          {[
            { n: 1, code: <><span className="text-[#7ee787]">import</span><span className="text-white/70"> {"{ sql }"} </span><span className="text-[#7ee787]">from</span><span className="text-[#a5d6ff]"> '@synapse/serverless'</span></> },
            { n: 2, code: null },
            { n: 3, code: <><span className="text-[#7ee787]">export default async function</span><span className="text-[#d2a8ff]"> handler</span><span className="text-white/70">(re</span></> },
            { n: 4, code: <><span className="text-white/50">{"  "}</span><span className="text-[#7ee787]">const</span><span className="text-white/70"> {"{ rows }"} = </span><span className="text-[#7ee787]">await</span><span className="text-[#a5d6ff]"> sql</span><span className="text-[#f2cc60]">`SELECT * FR`</span></> },
            { n: 5, code: null },
            { n: 6, code: <><span className="text-white/50">{"  "}</span><span className="text-[#79c0ff]">res</span><span className="text-white/70">.status(200).json({"{ messages: rows"}</span></> },
            { n: 7, code: <><span className="text-white/70">{"}"}</span></> },
          ].map((line) => (
            <div key={line.n} className="flex items-start gap-4 leading-6">
              <span className="text-white/20 w-4 shrink-0 text-right select-none">{line.n}</span>
              <span>{line.code}</span>
            </div>
          ))}

          {/* Terminal */}
          <div className="mt-4 border-t border-white/[0.06]">
            <div className="flex gap-4 text-[10px] text-[#797D86] py-1.5 border-b border-white/[0.04]">
              {["Problems", "Output", "Debug Console", "Terminal", "Ports"].map((t) => (
                <span key={t} className={t === "Terminal" ? "text-white/70 border-b border-white/30 pb-1" : ""}>{t}</span>
              ))}
            </div>
            <div className="py-2 text-[11px] font-mono">
              <div className="text-white/60">$ <span className="text-[#00E599]">npx synapsectl init</span></div>
              <div className="text-[#797D86] mt-1">Synapse Project Initialization</div>
              <div className="text-[#797D86]">Step 1/3: Configuring MCP Server...</div>
              <div className="text-[#797D86]">Step 2/3: Creating synapse.md with detailed...</div>
              <div className="text-[#797D86]">Step 3/3: Creating AGENTS.md...</div>
              <div className="text-[#00E599] mt-1">▪ Success! Synapse project initialized.</div>
            </div>
          </div>
        </div>

        {/* Getting started panel */}
        <div className="p-4 text-[12px]" style={{ background: "#0d1117" }}>
          <div className="text-white/70 font-medium mb-3">Getting started with Synapse</div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#797D86]">Let&apos;s update your client to use Synapse now:</span>
          </div>

          <div className="bg-[#161b22] rounded-lg p-3 mb-3 border border-white/[0.06]">
            <div className="text-[#797D86] text-[10px] mb-2">📄 index.ts</div>
            <div className="font-mono text-[11px]">
              <div><span className="text-[#7ee787]">import</span><span className="text-white/70"> {"{ synapse }"} </span><span className="text-[#7ee787]">from</span><span className="text-[#a5d6ff]"> &quot;@synapse/sdk&quot;</span><span className="text-white/70">;</span></div>
              <div><span className="text-[#7ee787]">const</span><span className="text-white/70"> sql = synapse(process.env.DATABASE_URL!);</span></div>
              <div className="text-white/40">// AI-native operations</div>
            </div>
          </div>

          <div className="text-[#797D86] mb-2">You&apos;re all set with Synapse! Here&apos;s what I did:</div>
          {[
            "Created new Synapse project: 'Test App'",
            "Added DATABASE_URL to .env",
            "Migrated schema",
            "Created lib/synapse.ts with AI operations",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2 text-[11px] text-[#797D86] mb-1">
              <span className="text-[#00E599] shrink-0">✓</span>
              <span>{item}</span>
            </div>
          ))}

          <div className="mt-4 bg-[#161b22] rounded-lg p-3 border border-white/[0.06]">
            <div className="text-[#797D86] text-[11px] mb-2">Plan, search, build anything...</div>
            <div className="flex items-center gap-2">
              <div className="bg-[#00E599]/10 text-[#00E599] text-[10px] px-2 py-0.5 rounded">✦ Agent</div>
              <div className="text-[#797D86] text-[10px]">GPT-5 ▾</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: try it yourself */}
      <div className="border-t border-white/[0.06] px-6 py-4 flex items-center justify-between" style={{ background: "#161b22" }}>
        <span className="text-sm text-white/60">Try for yourself, start building with Synapse now.</span>
        <div className="flex items-center gap-2 bg-[#0d1117] border border-white/[0.08] rounded-lg px-4 py-2 font-mono text-sm">
          <span className="text-[#00E599]">$</span>
          <span className="text-white/70">npx synapsectl init</span>
          <button className="text-[#797D86] hover:text-white ml-2 transition-colors text-xs">⧉</button>
        </div>
      </div>
    </div>
  );
}

function MCPClientsRow() {
  const clients = ["VS Code", "Claude", "Cursor", "Windsurf", "Cline"];
  return (
    <div className="mt-12 flex items-center gap-8">
      <span className="text-sm text-[#797D86] shrink-0">Connect AI clients to Synapse:</span>
      <div className="flex items-center gap-8">
        {clients.map((c) => (
          <span key={c} className="text-sm font-medium text-white/35 hover:text-white/60 transition-colors">{c}</span>
        ))}
      </div>
    </div>
  );
}

export default function InferenceSection() {
  return (
    <section
      id="ai"
      className="relative py-32 border-b border-white/[0.06] overflow-hidden"
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
            <span className="text-white">Model serving.</span>{" "}
            Deploy any LLM with one API call and zero infrastructure to manage.
          </h2>
        </motion.div>

        {/* Tab row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-12 flex items-center border-b border-t border-white/[0.06]"
        >
          {[
            "Adds Synapse Rules for correct code",
            "Adds MCP for safe access to Synapse",
          ].map((tab, i) => (
            <div
              key={tab}
              className={`px-6 py-3 text-sm border-r border-white/[0.06] ${
                i === 0 ? "text-white/70 border-l" : "text-[#797D86]"
              }`}
            >
              {tab}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.16 }}
        >
          <CodeEditorMockup />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.24 }}
        >
          <MCPClientsRow />
        </motion.div>
      </div>
    </section>
  );
}
