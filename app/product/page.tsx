"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import HalftoneEdges from "@/components/ui/halftone-edges";
import SectionGlow from "@/components/ui/section-glow";
import AnnouncementBar from "@/components/layout/announcement-bar";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

/* ─── Reusable dot icon (matches homepage sections) ─── */
function DotIcon({ dark = false }: { dark?: boolean }) {
  const fill = dark ? "#2C4A3E" : "#94979E";
  return (
    <svg width="40" height="32" viewBox="0 0 40 32" fill="none" className="mb-10">
      {[5,4,3,2,1].map((cols, row) =>
        Array.from({ length: cols }, (_, col) => {
          const x = col * 7 + (5 - cols) * 3.5 + 3;
          const y = row * 6 + 3;
          const opacity = 0.2 + ((row + col) / (5 + cols)) * 0.8;
          return <circle key={`${row}-${col}`} cx={x} cy={y} r={1.6} fill={fill} fillOpacity={opacity} />;
        })
      )}
    </svg>
  );
}

/* ══════════════════════════════════════════
   ILLUSTRATION 1 — Agent Network (SVG)
   Matches homepage's IDE-style mockup framing
══════════════════════════════════════════ */
function AgentNetworkIllustration() {
  const nodes = {
    user:     { x: 52,  y: 160, label: "User",       sub: "request",     r: 28, active: false },
    router:   { x: 195, y: 160, label: "Router",     sub: "smart-route", r: 32, active: true  },
    llama:    { x: 345, y: 72,  label: "Llama 70B",  sub: "primary",     r: 26, active: true  },
    mistral:  { x: 345, y: 160, label: "Mistral 7B", sub: "fallback",    r: 26, active: false },
    deepseek: { x: 345, y: 248, label: "DeepSeek R1",sub: "reasoning",   r: 26, active: false },
    search:   { x: 490, y: 100, label: "Search",     sub: "tool",        r: 22, active: true  },
    code:     { x: 490, y: 192, label: "Code",       sub: "tool",        r: 22, active: false },
    response: { x: 578, y: 160, label: "Response",   sub: "stream",      r: 28, active: true  },
  };
  type NodeKey = keyof typeof nodes;

  const edges: [NodeKey, NodeKey, boolean][] = [
    ["user","router",true], ["router","llama",true], ["router","mistral",false],
    ["router","deepseek",false], ["llama","search",true], ["llama","code",false],
    ["search","response",true], ["code","response",false], ["mistral","response",false],
  ];

  const path = (a: typeof nodes[NodeKey], b: typeof nodes[NodeKey]) => {
    const mx = (a.x + b.x) / 2;
    return `M${a.x},${a.y} C${mx},${a.y} ${mx},${b.y} ${b.x},${b.y}`;
  };

  const TEAL = "#34D59A", PURPLE = "#7C6FFF", ORANGE = "#F59D4A";
  const nodeColor = (k: NodeKey) => k === "llama" || k === "router" || k === "response" ? TEAL : k === "mistral" ? PURPLE : k === "deepseek" ? ORANGE : "#94979E";

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)", background: "#0d0e0f" }}>
      {/* Chrome */}
      <div className="flex items-center gap-2 px-5 py-3" style={{ background: "#111215", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
        <span className="ml-3" style={{ fontSize: 11, color: "#94979E", fontFamily: "var(--font-mono)" }}>agent / network-view</span>
        <span className="ml-auto px-2 py-0.5 rounded" style={{ fontSize: 10, background: "rgba(52,213,154,0.12)", color: TEAL, fontFamily: "var(--font-mono)" }}>LIVE</span>
      </div>

      <svg viewBox="0 0 640 320" style={{ width: "100%", display: "block" }}>
        <defs>
          <filter id="ng"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="ns"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <linearGradient id="ea" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={TEAL} stopOpacity="0.7"/>
            <stop offset="100%" stopColor={TEAL} stopOpacity="0.15"/>
          </linearGradient>
        </defs>
        {/* Grid dots */}
        {Array.from({length:11},(_,r)=>Array.from({length:21},(_,c)=>(
          <circle key={`${r}${c}`} cx={c*32+8} cy={r*30+8} r="1" fill="rgba(255,255,255,0.04)"/>
        )))}
        {/* Inactive edges */}
        {edges.filter(([,,a])=>!a).map(([a,b],i)=>(
          <path key={`ei${i}`} d={path(nodes[a],nodes[b])} stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeDasharray="4 3" fill="none"/>
        ))}
        {/* Active edges + dots */}
        {edges.filter(([,,a])=>a).map(([a,b],i)=>{
          const p = path(nodes[a],nodes[b]);
          const durs = [2.4,3.1,2.7,3.4];
          return (
            <g key={`ea${i}`}>
              <path d={p} stroke="rgba(52,213,154,0.15)" strokeWidth="7" fill="none"/>
              <path d={p} stroke="url(#ea)" strokeWidth="1.8" fill="none" filter="url(#ng)"/>
              <circle r="3.5" fill={TEAL} fillOpacity="0.9" filter="url(#ng)">
                <animateMotion dur={`${durs[i%4]}s`} repeatCount="indefinite" path={p}/>
              </circle>
            </g>
          );
        })}
        {/* Nodes */}
        {(Object.entries(nodes) as [NodeKey, typeof nodes[NodeKey]][]).map(([k,n])=>(
          <g key={k}>
            {n.active && <circle cx={n.x} cy={n.y} r={n.r+10} fill={nodeColor(k)} fillOpacity="0.07"/>}
            <circle cx={n.x} cy={n.y} r={n.r}
              fill="#111215"
              stroke={n.active ? nodeColor(k) : "rgba(255,255,255,0.09)"}
              strokeWidth={n.active ? 1.5 : 1}
              filter={k==="router" ? "url(#ns)" : undefined}/>
            <text x={n.x} y={n.y-3} textAnchor="middle"
              fill={n.active ? "#F9FAFA" : "#94979E"}
              fontSize={k==="router"||k==="response" ? 8 : 7}
              fontWeight={k==="router" ? "600" : "400"}
              fontFamily="var(--font-sans),system-ui">{n.label}</text>
            <text x={n.x} y={n.y+9} textAnchor="middle"
              fill={nodeColor(k)} fillOpacity="0.75"
              fontSize="6" fontFamily="var(--font-mono),monospace">{n.sub}</text>
          </g>
        ))}
        {/* Badges */}
        <rect x="8" y="8" width="96" height="17" rx="4" fill="#111215" stroke="rgba(52,213,154,0.25)" strokeWidth="0.8"/>
        <circle cx="20" cy="16.5" r="3" fill={TEAL}><animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/></circle>
        <text x="28" y="21" fill={TEAL} fontSize="7.5" fontFamily="var(--font-mono),monospace">active session</text>
        <rect x="528" y="8" width="104" height="17" rx="4" fill="#111215" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8"/>
        <text x="580" y="21" textAnchor="middle" fill="#F9FAFA" fontSize="8" fontFamily="var(--font-mono),monospace">p99 &lt;50ms ✓</text>
      </svg>

      {/* Legend */}
      <div className="flex gap-6 px-5 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        {[{c:TEAL,l:"Active"},{c:PURPLE,l:"Fallback"},{c:ORANGE,l:"Reasoning"},{c:"#94979E",l:"Standby"}].map(({c,l})=>(
          <div key={l} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{background:c}}/>
            <span style={{fontSize:11,color:"#94979E",fontFamily:"var(--font-mono)"}}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   ILLUSTRATION 2 — Capability Radar + Heatmap
   Same card styling as homepage feature cards
══════════════════════════════════════════ */
function CoverageRadarIllustration() {
  const cx=175, cy=160, R=115;
  const dims=["Speed","Quality","Context","Cost","Avail"];
  const n=dims.length;
  const ang=(i:number)=>(i/n)*2*Math.PI - Math.PI/2;
  const pt=(v:number,i:number)=>{
    const a=ang(i);
    return {x:cx+R*v*Math.cos(a), y:cy+R*v*Math.sin(a)};
  };
  const poly=(vals:number[])=>vals.map((v,i)=>`${pt(v,i).x},${pt(v,i).y}`).join(" ");

  const models=[
    {name:"Llama 3.1 70B", color:"#34D59A", vals:[0.85,0.92,0.88,0.80,1.0]},
    {name:"Mistral 7B",    color:"#7C6FFF", vals:[0.97,0.72,0.65,0.95,0.98]},
    {name:"DeepSeek R1",   color:"#F59D4A", vals:[0.70,0.98,0.92,0.75,0.88]},
  ];

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)", background: "#0d0e0f" }}>
      <div className="flex items-center justify-between px-5 py-3" style={{ background: "#111215", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <span style={{ fontSize: 11, color: "#94979E", fontFamily: "var(--font-mono)" }}>model / capability-radar</span>
        <span style={{ fontSize: 10, color: "#34D59A", fontFamily: "var(--font-mono)" }}>6 families · 200+ variants</span>
      </div>

      <div className="flex">
        {/* Radar */}
        <svg viewBox="0 0 350 320" style={{ width: "52%", display: "block", flexShrink: 0 }}>
          {[0.25,0.5,0.75,1].map(f=>(
            <polygon key={f}
              points={dims.map((_,i)=>`${pt(f,i).x},${pt(f,i).y}`).join(" ")}
              fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
          ))}
          {dims.map((_,i)=>{
            const e=pt(1,i);
            return <line key={i} x1={cx} y1={cy} x2={e.x} y2={e.y} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>;
          })}
          {models.map(m=>(
            <g key={m.name}>
              <polygon points={poly(m.vals)} fill={m.color} fillOpacity="0.1" stroke={m.color} strokeOpacity="0.75" strokeWidth="1.5"/>
              {m.vals.map((v,i)=>{
                const p=pt(v,i);
                return <circle key={i} cx={p.x} cy={p.y} r="3" fill={m.color} fillOpacity="0.9"/>;
              })}
            </g>
          ))}
          {dims.map((d,i)=>{
            const lp=pt(1.22,i);
            return (
              <text key={d} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle"
                fill="rgba(255,255,255,0.4)" fontSize="8.5" fontFamily="var(--font-mono),monospace">{d}</text>
            );
          })}
          <circle cx={cx} cy={cy} r="3" fill="rgba(255,255,255,0.12)"/>
        </svg>

        {/* Bar breakdowns */}
        <div className="flex flex-col justify-center gap-5 px-5 py-4 flex-1">
          {models.map(m=>(
            <div key={m.name}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{background:m.color}}/>
                <span style={{fontSize:12,color:"#F9FAFA",fontWeight:500}}>{m.name}</span>
              </div>
              {dims.map((d,i)=>(
                <div key={d} className="flex items-center gap-2 mb-1">
                  <span style={{fontSize:9,color:"#94979E",width:42,fontFamily:"var(--font-mono)",flexShrink:0}}>{d}</span>
                  <div className="flex-1 h-1 rounded-full" style={{background:"rgba(255,255,255,0.06)"}}>
                    <div style={{width:`${m.vals[i]*100}%`,height:"100%",background:m.color,opacity:0.8,borderRadius:999}}/>
                  </div>
                  <span style={{fontSize:9,color:"#94979E",width:24,textAlign:"right",fontFamily:"var(--font-mono)"}}>{Math.round(m.vals[i]*100)}%</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Heatmap — model × param size */}
      <div className="border-t px-5 py-4" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <p style={{ fontSize: 10, color: "#94979E", fontFamily: "var(--font-mono)", marginBottom: 10 }}>availability by parameter size</p>
        {[
          {fam:"Llama 3",  cells:[1,1,1,1]},
          {fam:"Mistral",  cells:[1,0.7,1,0]},
          {fam:"DeepSeek", cells:[0.9,0,1,0]},
          {fam:"Qwen",     cells:[0.7,0,0.9,0]},
        ].map(({fam,cells})=>(
          <div key={fam} className="flex items-center gap-2 mb-1.5">
            <span style={{fontSize:10,color:"#94979E",fontFamily:"var(--font-mono)",width:56,flexShrink:0}}>{fam}</span>
            {["7B","13B","70B","405B"].map((sz,ci)=>(
              <div key={sz} className="flex-1 h-6 rounded flex items-center justify-center"
                style={{background:cells[ci]?`rgba(52,213,154,${cells[ci]*0.65})`:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.04)"}}>
                {cells[ci]>0 && <span style={{fontSize:8,color:cells[ci]>0.8?"#0C0D0D":"#34D59A",fontFamily:"var(--font-mono)"}}>{sz}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   ILLUSTRATION 3 — Observability Dashboard
   Canvas histogram + sparkline + request log
══════════════════════════════════════════ */
function ObservabilityIllustration() {
  const histRef  = useRef<HTMLCanvasElement>(null);
  const sparkRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    /* Histogram */
    const hc = histRef.current; if (!hc) return;
    const hctx = hc.getContext("2d"); if (!hctx) return;
    hc.width = hc.offsetWidth*2; hc.height = hc.offsetHeight*2; hctx.scale(2,2);
    const W=hc.offsetWidth, H=hc.offsetHeight;
    const bkts=[2,5,12,24,42,60,48,30,18,9,5,2,1];
    const maxB=Math.max(...bkts);
    const bw=(W-24)/bkts.length;
    bkts.forEach((v,i)=>{
      const bh=(v/maxB)*(H-24); const x=12+i*bw; const y=H-12-bh;
      const hi=i>=3&&i<=6;
      const g=hctx.createLinearGradient(x,y,x,H-12);
      g.addColorStop(0,hi?"rgba(52,213,154,0.85)":"rgba(52,213,154,0.28)");
      g.addColorStop(1,hi?"rgba(52,213,154,0.12)":"rgba(52,213,154,0.04)");
      hctx.fillStyle=g;
      hctx.beginPath(); hctx.roundRect(x+1,y,bw-3,bh,[2,2,0,0]); hctx.fill();
    });
    hctx.fillStyle="rgba(148,151,158,0.6)";
    hctx.font="8px var(--font-mono,monospace)";
    ["5ms","15ms","25ms","35ms","50ms","75ms"].forEach((l,i)=>{
      hctx.fillText(l,12+i*(bw*2.2),H-2);
    });
  }, []);

  useEffect(() => {
    /* Sparkline */
    const sc=sparkRef.current; if (!sc) return;
    const sctx=sc.getContext("2d"); if (!sctx) return;
    sc.width=sc.offsetWidth*2; sc.height=sc.offsetHeight*2; sctx.scale(2,2);
    const W=sc.offsetWidth, H=sc.offsetHeight;
    const pts=[420,510,480,640,730,820,770,900,950,1030,990,1160,1090,1210,1190,1240];
    const mx=Math.max(...pts), mn=Math.min(...pts);
    const ty=(v:number)=>4+((1-(v-mn)/(mx-mn))*(H-8));
    const tx=(i:number)=>(i/(pts.length-1))*W;
    const g=sctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0,"rgba(52,213,154,0.28)");
    g.addColorStop(1,"rgba(52,213,154,0.0)");
    sctx.beginPath(); sctx.moveTo(0,H);
    pts.forEach((v,i)=>sctx.lineTo(tx(i),ty(v)));
    sctx.lineTo(W,H); sctx.closePath(); sctx.fillStyle=g; sctx.fill();
    sctx.beginPath();
    pts.forEach((v,i)=>i===0?sctx.moveTo(tx(i),ty(v)):sctx.lineTo(tx(i),ty(v)));
    sctx.strokeStyle="rgba(52,213,154,0.8)"; sctx.lineWidth=1.5; sctx.stroke();
    sctx.beginPath(); sctx.arc(tx(pts.length-1),ty(pts[pts.length-1]),3,0,Math.PI*2);
    sctx.fillStyle="#34D59A"; sctx.fill();
  }, []);

  const kpis=[
    {label:"Avg latency",  value:"28ms",    sub:"↓12% vs last hr", color:"#34D59A"},
    {label:"Throughput",   value:"1,240/s", sub:"↑8% vs last hr",  color:"#34D59A"},
    {label:"Error rate",   value:"0.04%",   sub:"within SLA",      color:"#94979E"},
    {label:"Token spend",  value:"$0.84",   sub:"last 5 min",      color:"#F59D4A"},
  ];

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)", background: "#0d0e0f" }}>
      <div className="flex items-center justify-between px-5 py-3" style={{ background: "#111215", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <span style={{ fontSize: 11, color: "#94979E", fontFamily: "var(--font-mono)" }}>observability / dashboard</span>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#34D59A" }} />
          <span style={{ fontSize: 10, color: "#34D59A", fontFamily: "var(--font-mono)" }}>live</span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        {kpis.map(({label,value,sub,color})=>(
          <div key={label} className="p-4 border-r last:border-r-0" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <p style={{ fontSize: 10, color: "#94979E", fontFamily: "var(--font-mono)", marginBottom: 4 }}>{label}</p>
            <p style={{ fontSize: 20, fontWeight: 300, color, letterSpacing: "-0.03em", lineHeight: 1 }}>{value}</p>
            <p style={{ fontSize: 10, color: "#94979E", marginTop: 3 }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="p-5 flex flex-col gap-4">
        <div>
          <p style={{ fontSize: 10, color: "#94979E", fontFamily: "var(--font-mono)", marginBottom: 6 }}>latency distribution — p50 to p99</p>
          <canvas ref={histRef} style={{ width: "100%", height: 88, display: "block" }} />
        </div>
        <div>
          <p style={{ fontSize: 10, color: "#94979E", fontFamily: "var(--font-mono)", marginBottom: 6 }}>request volume — last 30 min</p>
          <canvas ref={sparkRef} style={{ width: "100%", height: 48, display: "block" }} />
        </div>
      </div>

      {/* Mini log */}
      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        {[
          {id:"req_8Hq2t",model:"llama-3.1-70b",lat:"43ms",status:"200"},
          {id:"req_fK9mP",model:"deepseek-r1",  lat:"91ms",status:"200"},
          {id:"req_aX7vN",model:"mistral-7b",   lat:"18ms",status:"200"},
        ].map(row=>(
          <div key={row.id} className="flex items-center gap-4 px-5 py-2 border-b last:border-b-0"
            style={{ borderColor: "rgba(255,255,255,0.03)", fontSize: 11, fontFamily: "var(--font-mono)" }}>
            <span style={{ color: "rgba(249,250,250,0.3)", width: 72 }}>{row.id}</span>
            <span style={{ color: "#94979E", flex: 1 }}>{row.model}</span>
            <span style={{ color: "#34D59A", width: 40 }}>{row.lat}</span>
            <span style={{ color: "#34D59A", width: 30 }}>{row.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FEATURES CONFIG — same structure as homepage feature sections
═══════════════════════════════════════════════════════════ */
const FEATURES = [
  {
    id: "inference",
    tag: "Agentic Inference", tagColor: "#34D59A",
    headline: <>Serve agents,<br /><span style={{ color: "#6B7280" }}>not just prompts.</span></>,
    body: "Static request-response APIs break when agents go multi-step. Synapse maintains persistent sessions, streams tokens across tool calls, and handles retries — so your agents never stall on infrastructure.",
    bullets: ["Persistent context across agent turns","Parallel tool-call execution with streaming","Automatic retry with exponential backoff","Multi-model routing within a single session"],
    illustration: <AgentNetworkIllustration />,
    bg: "#0C0D0D", glowVariant: "default" as const, dark: false,
  },
  {
    id: "coverage",
    tag: "Coverage Mapping", tagColor: "#7C6FFF",
    headline: <>Know exactly what you can run,<br /><span style={{ color: "#6B7280" }}>and what&apos;s coming.</span></>,
    body: "Teams waste days debugging incompatible model versions. Synapse's capability radar shows every model's profile at a glance — and automatically routes to the best available variant.",
    bullets: ["Radar view across Speed, Quality, Context, Cost","200+ variants across 6 model families","Automatic fallback to next-best variant","Context-window and capability tags per model"],
    illustration: <CoverageRadarIllustration />,
    bg: "#E4F1EB", glowVariant: "corner" as const, dark: true,
  },
  {
    id: "observability",
    tag: "Observability", tagColor: "#F59D4A",
    headline: <>Every token, every request,<br /><span style={{ color: "#6B7280" }}>fully traceable.</span></>,
    body: "Black-box inference is a liability in production. Synapse logs every request with latency histograms, cost breakdown, and OpenTelemetry export — so you always know exactly what's happening.",
    bullets: ["Real-time latency distribution histogram","Per-request cost and token breakdown","Searchable request history with replay","OpenTelemetry-compatible trace export"],
    illustration: <ObservabilityIllustration />,
    bg: "#0C0D0D", glowVariant: "dual" as const, dark: false,
  },
];

const TESTIMONIALS = [
  { quote: "Inference used to mean manually tuning capacity across a dozen servers. Now Synapse handles it and our p99 dropped by 60%.", name: "Senior ML Engineer", org: "2,000+ employee fintech" },
  { quote: "We migrated from a self-hosted vLLM cluster in a weekend. OpenAI-compatible API meant zero changes to application code.", name: "Principal Engineer", org: "Series B AI startup" },
  { quote: "Being able to branch a deployment and A/B test fine-tunes without new infra changed how we ship model updates entirely.", name: "Head of AI", org: "Enterprise SaaS company" },
];

const INTEGRATIONS = [
  {name:"OpenAI SDK",  note:"Drop-in compatible"},{name:"LangChain",       note:"Official provider"},
  {name:"LlamaIndex",  note:"Native integration"},{name:"Vercel AI SDK",   note:"Edge-ready"},
  {name:"Haystack",    note:"Pipeline support"},  {name:"AutoGen",         note:"Agent framework"},
  {name:"CrewAI",      note:"Multi-agent"},       {name:"Semantic Kernel", note:"Plugin compatible"},
];

const BADGES=["SOC 2 Type II","ISO 27001","GDPR","HIPAA","CCPA","RBAC","SSO","Audit Logs"];

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
export default function ProductPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main style={{ background: "#0C0D0D" }}>

        {/* ── HERO — matches homepage section structure ── */}
        <section className="relative overflow-hidden border-b" style={{ borderColor: "rgba(255,255,255,0.06)", paddingTop: "clamp(160px,20vw,240px)", paddingBottom: 120 }}>
          <SectionGlow variant="center" />
          <HalftoneEdges leftColor="rgba(52,213,154,0.80)" rightColor="rgba(220,120,60,0.75)" edgeWidth={320} />

          <div className="relative max-w-[1400px] mx-auto px-8">
            <motion.div initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:0.6}}>
              <DotIcon />
              <h1 style={{ fontSize:"clamp(36px,5vw,68px)", fontWeight:400, lineHeight:1.1, letterSpacing:"-0.04em", color:"#F9FAFA", maxWidth:820 }}>
                <span style={{ color:"#F9FAFA" }}>Inference that runs what</span>{" "}
                <span style={{ color:"#6B7280" }}>static APIs can&apos;t. The complete platform for teams and agents.</span>
              </h1>
            </motion.div>

            <motion.p initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.1}}
              className="mt-8 max-w-xl" style={{ fontSize:17, color:"#94979E", lineHeight:1.65 }}>
              Persistent sessions, automatic scaling, full observability — built into one API. Ship AI products instead of managing servers.
            </motion.p>

            <motion.div initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.18}}
              className="flex items-center gap-3 mt-10">
              <Link href="#" className="inline-flex items-center px-6 h-11 rounded-full font-medium transition-colors"
                style={{ fontSize:15, background:"#F9FAFA", color:"#0C0D0D" }}
                onMouseEnter={e=>(e.currentTarget.style.background="#e5e7eb")}
                onMouseLeave={e=>(e.currentTarget.style.background="#F9FAFA")}>
                Get started free
              </Link>
              <Link href="#" className="inline-flex items-center px-6 h-11 rounded-full transition-colors"
                style={{ fontSize:15, color:"#F9FAFA", border:"1px solid rgba(255,255,255,0.22)" }}
                onMouseEnter={e=>(e.currentTarget.style.borderColor="rgba(255,255,255,0.45)")}
                onMouseLeave={e=>(e.currentTarget.style.borderColor="rgba(255,255,255,0.22)")}>
                Read the docs
              </Link>
              <div className="rounded-xl px-5 h-11 flex items-center gap-2"
                style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ color:"#34D59A", fontFamily:"var(--font-mono)", fontSize:13 }}>$</span>
                <span style={{ color:"#94979E", fontFamily:"var(--font-mono)", fontSize:13 }}>npm install @synapse-ai/sdk</span>
              </div>
            </motion.div>

            {/* Stats inline */}
            <motion.div initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.26}}
              className="mt-16 flex items-center gap-10 flex-wrap" style={{ borderTop:"1px solid rgba(255,255,255,0.07)", paddingTop:28 }}>
              {[{v:"<50ms",l:"p99 First Token"},{v:"10k+",l:"Req / sec"},{v:"99.99%",l:"Uptime SLA"},{v:"200+",l:"Model variants"}].map(({v,l})=>(
                <div key={l}>
                  <div style={{ fontSize:"clamp(22px,2.5vw,32px)", fontWeight:300, letterSpacing:"-0.04em", color:"#34D59A", lineHeight:1 }}>{v}</div>
                  <div style={{ fontSize:13, color:"#94979E", marginTop:4 }}>{l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FEATURE SECTIONS — exactly mirrors homepage section style ── */}
        {FEATURES.map(({id,tag,tagColor,headline,body,bullets,illustration,bg,glowVariant,dark},i)=>(
          <section key={id} id={id}
            className="relative py-48 overflow-hidden border-b"
            style={{ background:bg, borderColor: dark ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)" }}>
            <SectionGlow variant={glowVariant} color={dark?"44, 109, 76":undefined}/>
            {!dark && <HalftoneEdges/>}

            <div className="relative max-w-[1400px] mx-auto px-8">
              <motion.div initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className="mb-16">
                <DotIcon dark={dark}/>
                <h2 style={{ fontSize:"clamp(28px,3.2vw,48px)", fontWeight:400, lineHeight:1.125, letterSpacing:"-0.04em", color:dark?"#4D5560":"#6B7280", textIndent:"96px" }}>
                  {headline}
                </h2>
                <span className="inline-block mt-4 ml-24 text-[11px] uppercase tracking-[0.12em] px-3 py-1 rounded-full"
                  style={{ background:`${tagColor}14`, color:tagColor, fontFamily:"var(--font-mono)", border:`1px solid ${tagColor}30` }}>
                  {tag}
                </span>
              </motion.div>

              {/* Two-col: illustration + bullets */}
              <div className={`flex flex-col ${i%2===1?"lg:flex-row-reverse":"lg:flex-row"} gap-16 items-start`}>
                {/* Illustration */}
                <motion.div initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6,delay:0.1}}
                  className="flex-1 min-w-0 w-full">
                  {illustration}
                </motion.div>

                {/* Text + bullets */}
                <motion.div initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6,delay:0.18}}
                  className="flex-1 min-w-0">
                  <p style={{ fontSize:16, color:dark?"#6b7280":"#94979E", lineHeight:1.7, marginBottom:28 }}>{body}</p>
                  <ul className="flex flex-col gap-3">
                    {bullets.map(b=>(
                      <li key={b} className="flex items-start gap-3">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
                          <circle cx="8" cy="8" r="7" stroke={tagColor} strokeOpacity="0.3" strokeWidth="1.2"/>
                          <path d="M5 8l2 2 4-4" stroke={tagColor} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span style={{ fontSize:15, color:dark?"#4D5560":"#94979E" }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>
        ))}

        {/* ── TESTIMONIALS — matches homepage card style ── */}
        <section className="relative py-48 overflow-hidden border-b" style={{ background:"#0C0D0D", borderColor:"rgba(255,255,255,0.06)" }}>
          <SectionGlow variant="center"/>
          <HalftoneEdges/>
          <div className="relative max-w-[1400px] mx-auto px-8">
            <motion.div initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className="mb-16">
              <DotIcon/>
              <h2 style={{ fontSize:"clamp(28px,3.2vw,48px)", fontWeight:400, lineHeight:1.125, letterSpacing:"-0.04em", color:"#6B7280", textIndent:"96px" }}>
                <span style={{ color:"#F9FAFA" }}>Trusted by teams in production.</span>{" "}Built by engineers who've felt the pain of scaling inference.
              </h2>
            </motion.div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
              {TESTIMONIALS.map(({quote,name,org},i)=>(
                <motion.div key={i} initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6,delay:i*0.08}}
                  className="rounded-2xl p-8 flex flex-col gap-5"
                  style={{ background:"#111215", border:"1px solid rgba(255,255,255,0.06)" }}>
                  <svg width="20" height="16" viewBox="0 0 24 18" fill="none">
                    <path d="M0 18V10.8C0 7.2 1.2 4.2 3.6 1.8L6 0l1.2 1.2C5.2 3.2 4 5.6 4 8.4V10h4v8H0zm14 0V10.8C14 7.2 15.2 4.2 17.6 1.8L20 0l1.2 1.2C19.2 3.2 18 5.6 18 8.4V10h4v8h-8z" fill="rgba(52,213,154,0.3)"/>
                  </svg>
                  <p style={{ fontSize:15, color:"#94979E", lineHeight:1.65, flex:1 }}>&ldquo;{quote}&rdquo;</p>
                  <div>
                    <p style={{ fontSize:14, color:"#F9FAFA", fontWeight:500 }}>{name}</p>
                    <p style={{ fontSize:13, color:"#94979E" }}>{org}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTEGRATIONS ── */}
        <section className="relative py-48 overflow-hidden border-b" style={{ background:"#080A09", borderColor:"rgba(255,255,255,0.05)" }}>
          <SectionGlow variant="dual"/>
          <div className="relative max-w-[1400px] mx-auto px-8">
            <motion.div initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className="mb-16">
              <DotIcon/>
              <h2 style={{ fontSize:"clamp(28px,3.2vw,48px)", fontWeight:400, lineHeight:1.125, letterSpacing:"-0.04em", color:"#6B7280", textIndent:"96px" }}>
                <span style={{ color:"#F9FAFA" }}>Works with every framework.</span>{" "}40+ native integrations. Zero migration cost.
              </h2>
            </motion.div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
              {INTEGRATIONS.map(({name,note},i)=>(
                <motion.div key={name} initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6,delay:i*0.05}}
                  className="rounded-xl p-5"
                  style={{ background:"#111215", border:"1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontSize:15, color:"#F9FAFA", fontWeight:500, display:"block" }}>{name}</span>
                  <span style={{ fontSize:13, color:"#94979E", display:"block", marginTop:4 }}>{note}</span>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6,delay:0.3}}
              className="mt-10 flex items-center gap-3 px-6 py-4 rounded-2xl inline-flex"
              style={{ background:"#111215", border:"1px solid rgba(52,213,154,0.2)" }}>
              <div className="w-2 h-2 rounded-full" style={{background:"#34D59A"}}/>
              <span style={{fontSize:14,color:"#F9FAFA"}}>OpenAI-compatible API</span>
              <span style={{fontSize:13,color:"#94979E"}}>— swap your base URL and you&apos;re done</span>
            </motion.div>
          </div>
        </section>

        {/* ── ENTERPRISE ── */}
        <section className="relative py-48 overflow-hidden border-b" style={{ background:"#0C0D0D", borderColor:"rgba(255,255,255,0.06)" }}>
          <SectionGlow variant="corner"/>
          <HalftoneEdges/>
          <div className="relative max-w-[1400px] mx-auto px-8">
            <motion.div initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className="mb-16">
              <DotIcon/>
              <h2 style={{ fontSize:"clamp(28px,3.2vw,48px)", fontWeight:400, lineHeight:1.125, letterSpacing:"-0.04em", color:"#6B7280", textIndent:"96px" }}>
                <span style={{ color:"#F9FAFA" }}>Built for teams that can&apos;t afford downtime.</span>{" "}Enterprise security and compliance included.
              </h2>
            </motion.div>
            <div className="flex flex-col lg:flex-row gap-16 items-start">
              <div className="flex-1">
                <p style={{fontSize:16,color:"#94979E",lineHeight:1.7,maxWidth:480,marginBottom:24}}>
                  Synapse meets the security bar for regulated industries. RBAC, SSO, audit logging, and a 99.99% uptime SLA — all included, no add-ons.
                </p>
                <div className="flex flex-wrap gap-2">
                  {BADGES.map(b=>(
                    <div key={b} className="px-4 py-2.5 rounded-lg" style={{ fontSize:13, background:"#111215", border:"1px solid rgba(255,255,255,0.08)", color:"#94979E" }}>{b}</div>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <div className="rounded-xl p-5" style={{ background:"#111215", border:"1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex items-center justify-between mb-3">
                    <span style={{fontSize:13,color:"#F9FAFA"}}>API Availability — 90 days</span>
                    <span style={{fontSize:13,color:"#34D59A",fontFamily:"var(--font-mono)"}}>99.99%</span>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({length:90}).map((_,i)=>(
                      <div key={i} className="flex-1 rounded-sm" style={{height:24,background:i===37||i===71?"rgba(245,157,74,0.7)":"rgba(52,213,154,0.7)"}}/>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    <span style={{fontSize:11,color:"#94979E"}}>90 days ago</span>
                    <span style={{fontSize:11,color:"#94979E"}}>Today</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
