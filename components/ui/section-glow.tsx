"use client";

/**
 * Subtle SVG gradient background overlays matching neon.com's visual language.
 * Usage: place as first child inside a section with `relative overflow-hidden`.
 *
 * Variants:
 *  - "default"  — single radial glow, offset right
 *  - "center"   — centered radial glow
 *  - "dual"     — two radial glows, left + right
 *  - "corner"   — top-right corner glow
 */

type Variant = "default" | "center" | "dual" | "corner";

interface SectionGlowProps {
  variant?: Variant;
  color?: string;   // e.g. "#34D59A"
  opacity?: number;  // base opacity, default 0.04
}

export default function SectionGlow({
  variant = "default",
  color = "#34D59A",
  opacity = 0.04,
}: SectionGlowProps) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Noise filter — very subtle grain */}
          <filter id={`noise-${variant}`} x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="saturate"
              values="0"
              result="mono"
            />
            <feComponentTransfer in="mono" result="faded">
              <feFuncA type="linear" slope="0.03" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" in2="faded" mode="screen" />
          </filter>
        </defs>

        {/* Noise grain overlay */}
        <rect
          width="1440"
          height="900"
          filter={`url(#noise-${variant})`}
          opacity={0.5}
        />

        {variant === "default" && (
          <ellipse
            cx="1050"
            cy="350"
            rx="500"
            ry="400"
            fill={color}
            opacity={opacity}
            style={{ filter: "blur(120px)" }}
          />
        )}

        {variant === "center" && (
          <ellipse
            cx="720"
            cy="450"
            rx="600"
            ry="350"
            fill={color}
            opacity={opacity}
            style={{ filter: "blur(140px)" }}
          />
        )}

        {variant === "dual" && (
          <>
            <ellipse
              cx="200"
              cy="300"
              rx="400"
              ry="350"
              fill={color}
              opacity={opacity * 0.8}
              style={{ filter: "blur(130px)" }}
            />
            <ellipse
              cx="1200"
              cy="550"
              rx="380"
              ry="300"
              fill={color}
              opacity={opacity * 0.6}
              style={{ filter: "blur(120px)" }}
            />
          </>
        )}

        {variant === "corner" && (
          <ellipse
            cx="1300"
            cy="100"
            rx="450"
            ry="350"
            fill={color}
            opacity={opacity * 1.2}
            style={{ filter: "blur(150px)" }}
          />
        )}

        {/* Subtle geometric side lines — left */}
        <line
          x1="60"
          y1="0"
          x2="60"
          y2="900"
          stroke={color}
          strokeOpacity={0.03}
          strokeWidth="0.5"
        />
        <line
          x1="120"
          y1="0"
          x2="120"
          y2="900"
          stroke={color}
          strokeOpacity={0.015}
          strokeWidth="0.5"
        />

        {/* Right side */}
        <line
          x1="1380"
          y1="0"
          x2="1380"
          y2="900"
          stroke={color}
          strokeOpacity={0.03}
          strokeWidth="0.5"
        />
        <line
          x1="1320"
          y1="0"
          x2="1320"
          y2="900"
          stroke={color}
          strokeOpacity={0.015}
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
}
