"use client";

/* Reusable status ticker bar used on homepage and about page */

function PipeLine({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-[3px] shrink-0">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: 1.5,
            height: 12,
            borderRadius: 1,
            background: "rgba(52,213,154,0.45)",
            animation: `pipePulse 1.6s ease-in-out ${(i * 0.06).toFixed(2)}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

export default function StatusTicker() {
  return (
    <div
      style={{
        background: "#080909",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        padding: "13px 0",
      }}
    >
      <style>{`
        @keyframes pipePulse {
          from { opacity: 0.2; transform: scaleY(0.55); }
          to   { opacity: 0.9; transform: scaleY(1); }
        }
        @keyframes statusBlink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.4; }
        }
      `}</style>
      <div
        className="max-w-[1200px] mx-auto px-8 flex items-center gap-6 overflow-hidden"
        style={{
          fontFamily: "var(--font-mono),monospace",
          fontSize: 10,
          letterSpacing: "0.1em",
          whiteSpace: "nowrap",
        }}
      >
        {/* System indicator */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              border: "1.5px solid rgba(52,213,154,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#34D59A",
                boxShadow: "0 0 6px rgba(52,213,154,0.9)",
                animation: "statusBlink 2.4s ease-in-out infinite",
              }}
            />
          </div>
          <span style={{ color: "rgba(255,255,255,0.38)" }}>
            SYSTEM: SYNAPSE AI PLATFORM
          </span>
        </div>

        <PipeLine count={24} />

        <span style={{ color: "rgba(255,255,255,0.28)" }}>
          {"[ STATUS: "}
          <span style={{ color: "#34D59A" }}>ONLINE</span>
          {" ]"}
        </span>

        <PipeLine count={9} />

        <span style={{ color: "rgba(255,255,255,0.28)" }}>
          {"[ CONNECTION: STABLE ]"}
        </span>

        <PipeLine count={9} />

        <span style={{ color: "rgba(255,255,255,0.18)" }}>
          {"[ LATENCY: 43ms ]"}
        </span>

        <PipeLine count={6} />

        <span style={{ color: "rgba(255,255,255,0.18)" }}>
          {"[ UPTIME: 99.99% ]"}
        </span>
      </div>
    </div>
  );
}
