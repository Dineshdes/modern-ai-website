"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─────────────────────────────────────────────────
   Panel configuration
───────────────────────────────────────────────── */
const PANEL_DATA = [
  { grad: ["#072e22", "#34D59A"], label: "Inference Engine",  sub: "43ms p50 latency" },
  { grad: ["#0d0621", "#7C6FFF"], label: "Neural Router",     sub: "Semantic dispatch" },
  { grad: ["#1f0900", "#F59D4A"], label: "Model Gateway",     sub: "OpenAI · Anthropic" },
  { grad: ["#03111a", "#4FABFF"], label: "Vector Search",     sub: "100ms ANN retrieval" },
  { grad: ["#12021f", "#c084fc"], label: "Fine-tuning",       sub: "Now generally available" },
  { grad: ["#061108", "#34D59A"], label: "Observability",     sub: "Full request traces" },
  { grad: ["#140700", "#fbbf24"], label: "Cost Analytics",    sub: "Real-time dashboards" },
  { grad: ["#0d0621", "#7C6FFF"], label: "Auto-scaling",      sub: "Serverless workers" },
  { grad: ["#072e22", "#34D59A"], label: "Multi-region",      sub: "3 availability zones" },
  { grad: ["#03111a", "#4FABFF"], label: "Load Balancing",    sub: "P99 SLA guaranteed" },
  { grad: ["#12021f", "#c084fc"], label: "Streaming",         sub: "SSE · WebSocket" },
  { grad: ["#1f0900", "#F59D4A"], label: "Prompt Caching",    sub: "Semantic dedup" },
];

const COLS      = 3;
const PW        = 2.8;
const PH        = 2.0;
const GAP_X     = 0.38;
const GAP_Z     = 4.2;
const CAMERA_Z  = 5.5;
const SPEED     = 0.018;
const ROWS      = Math.ceil(PANEL_DATA.length / COLS);
const TUNNEL_LEN = ROWS * GAP_Z;

/* ─────────────────────────────────────────────────
   Canvas texture builder (client-only)
───────────────────────────────────────────────── */
function buildTexture(grad: string[], label: string, sub: string): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width  = 512;
  c.height = 384;
  const ctx = c.getContext("2d")!;

  // bg gradient
  const bg = ctx.createLinearGradient(0, 0, 0, 384);
  bg.addColorStop(0, grad[0]);
  bg.addColorStop(1, grad[1] + "44");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 512, 384);

  // subtle dot grid
  ctx.fillStyle = "rgba(255,255,255,0.07)";
  for (let x = 16; x < 512; x += 22) {
    for (let y = 16; y < 384; y += 22) {
      ctx.beginPath();
      ctx.arc(x, y, 1.1, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // top accent bar
  const bar = ctx.createLinearGradient(0, 0, 512, 0);
  bar.addColorStop(0,   grad[1]);
  bar.addColorStop(0.6, grad[1] + "88");
  bar.addColorStop(1,   "transparent");
  ctx.fillStyle = bar;
  ctx.fillRect(0, 0, 512, 3);

  // label text
  ctx.font      = "600 40px -apple-system, ui-sans-serif, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(label, 32, 195);

  // sub text
  ctx.font      = "400 22px ui-monospace, monospace";
  ctx.fillStyle = grad[1];
  ctx.fillText(sub, 32, 238);

  // bottom glow strip
  const bot = ctx.createLinearGradient(0, 362, 512, 364);
  bot.addColorStop(0,   grad[1] + "00");
  bot.addColorStop(0.5, grad[1] + "99");
  bot.addColorStop(1,   grad[1] + "00");
  ctx.fillStyle = bot;
  ctx.fillRect(0, 361, 512, 3);

  return new THREE.CanvasTexture(c);
}

/* ─────────────────────────────────────────────────
   Single panel mesh
───────────────────────────────────────────────── */
interface PanelProps {
  initZ: number;
  colIndex: number;
  grad: string[];
  label: string;
  sub: string;
}

function Panel({ initZ, colIndex, grad, label, sub }: PanelProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const tex     = useMemo(() => buildTexture(grad, label, sub), []);  // eslint-disable-line

  const x = (colIndex - (COLS - 1) / 2) * (PW + GAP_X);

  useFrame(() => {
    const m = meshRef.current;
    if (!m) return;
    m.position.z += SPEED;
    if (m.position.z > CAMERA_Z + 1) {
      m.position.z -= TUNNEL_LEN;
    }
    // fade out as it approaches camera
    const dist = CAMERA_Z - m.position.z;
    const mat  = m.material as THREE.MeshBasicMaterial;
    mat.opacity = Math.min(1, Math.max(0, dist / 2.5));
  });

  return (
    <mesh ref={meshRef} position={[x, 0, initZ]}>
      <planeGeometry args={[PW, PH]} />
      <meshBasicMaterial map={tex} transparent opacity={1} />
    </mesh>
  );
}

/* ─────────────────────────────────────────────────
   Full tunnel scene
───────────────────────────────────────────────── */
function TunnelScene() {
  const panels = useMemo(
    () =>
      PANEL_DATA.map((p, i) => {
        const col  = i % COLS;
        const row  = Math.floor(i / COLS);
        const initZ = -(row * GAP_Z);
        return (
          <Panel
            key={i}
            initZ={initZ}
            colIndex={col}
            grad={p.grad}
            label={p.label}
            sub={p.sub}
          />
        );
      }),
    []
  );

  return <>{panels}</>;
}

/* ─────────────────────────────────────────────────
   Public export
───────────────────────────────────────────────── */
export function InfiniteGallery({ height = 520 }: { height?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div style={{ height, background: "#060707" }} />;
  }

  return (
    <div style={{ width: "100%", height, background: "#060707", position: "relative" }}>
      {/* edge fade masks */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: "linear-gradient(to right, #060707 0%, transparent 8%, transparent 92%, #060707 100%)",
        }}
      />
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: "linear-gradient(to bottom, #060707 0%, transparent 15%, transparent 80%, #060707 100%)",
        }}
      />
      <Canvas
        camera={{ position: [0, 0, CAMERA_Z], fov: 66 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <fog attach="fog" args={["#060707", 6, 26]} />
        <TunnelScene />
      </Canvas>
    </div>
  );
}
