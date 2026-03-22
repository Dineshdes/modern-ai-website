"use client";

type Variant = "default" | "center" | "dual" | "corner";

interface SectionGlowProps {
  variant?: Variant;
  color?: string;
  opacity?: number;
}

export default function SectionGlow({
  variant = "default",
  color = "52, 213, 154",
  opacity = 1,
}: SectionGlowProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* Noise grain texture via SVG data URI */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.3,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Glow orbs via CSS radial-gradient — reliably renders across all browsers */}
      {variant === "default" && (
        <div
          className="absolute inset-0"
          style={{
            opacity,
            background: `radial-gradient(ellipse 60% 70% at 75% 40%, rgba(${color}, 0.12) 0%, rgba(${color}, 0.04) 40%, transparent 70%)`,
          }}
        />
      )}

      {variant === "center" && (
        <div
          className="absolute inset-0"
          style={{
            opacity,
            background: `radial-gradient(ellipse 70% 60% at 50% 45%, rgba(${color}, 0.1) 0%, rgba(${color}, 0.03) 45%, transparent 70%)`,
          }}
        />
      )}

      {variant === "dual" && (
        <>
          <div
            className="absolute inset-0"
            style={{
              opacity,
              background: `radial-gradient(ellipse 50% 65% at 15% 35%, rgba(${color}, 0.1) 0%, rgba(${color}, 0.03) 40%, transparent 70%)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              opacity,
              background: `radial-gradient(ellipse 45% 55% at 85% 60%, rgba(${color}, 0.08) 0%, rgba(${color}, 0.02) 40%, transparent 70%)`,
            }}
          />
        </>
      )}

      {variant === "corner" && (
        <div
          className="absolute inset-0"
          style={{
            opacity,
            background: `radial-gradient(ellipse 55% 50% at 90% 15%, rgba(${color}, 0.13) 0%, rgba(${color}, 0.04) 40%, transparent 65%)`,
          }}
        />
      )}

      {/* Subtle vertical edge lines */}
      <div className="absolute left-[60px] top-0 bottom-0 w-px" style={{ background: `rgba(${color}, 0.04)` }} />
      <div className="absolute left-[120px] top-0 bottom-0 w-px" style={{ background: `rgba(${color}, 0.02)` }} />
      <div className="absolute right-[60px] top-0 bottom-0 w-px" style={{ background: `rgba(${color}, 0.04)` }} />
      <div className="absolute right-[120px] top-0 bottom-0 w-px" style={{ background: `rgba(${color}, 0.02)` }} />
    </div>
  );
}
