/**
 * HalftoneEdges — dot-grid pattern on left/right edges of a section.
 * Inspired by neon.com's inference section: teal dots left, warm-orange dots right,
 * both fading toward the center with a gradient mask.
 *
 * Usage: place inside a `relative overflow-hidden` container.
 */

interface HalftoneEdgesProps {
  /** Left-side dot color (CSS rgba string). Default: teal */
  leftColor?: string;
  /** Right-side dot color (CSS rgba string). Default: warm orange */
  rightColor?: string;
  /** Dot radius in px */
  dotSize?: number;
  /** Grid spacing in px */
  spacing?: number;
  /** Width of each edge panel */
  edgeWidth?: number;
  /** How far the dots fade inward (0-100%) */
  fadeStop?: number;
}

export default function HalftoneEdges({
  leftColor  = "rgba(52, 213, 154, 0.55)",
  rightColor = "rgba(220, 120, 60, 0.50)",
  dotSize    = 1.6,
  spacing    = 9,
  edgeWidth  = 340,
  fadeStop   = 100,
}: HalftoneEdgesProps) {
  /* Generate the CSS dot pattern for a given color */
  const dotPattern = (color: string) =>
    `radial-gradient(circle, ${color} ${dotSize}px, transparent ${dotSize}px)`;

  const bgSize = `${spacing}px ${spacing}px`;

  return (
    <>
      {/* ── Left edge: teal dots fading right ── */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 pointer-events-none"
        style={{
          width: edgeWidth,
          backgroundImage: dotPattern(leftColor),
          backgroundSize: bgSize,
          WebkitMaskImage: `linear-gradient(to right, black 0%, black ${fadeStop * 0.3}%, transparent ${fadeStop}%)`,
          maskImage:        `linear-gradient(to right, black 0%, black ${fadeStop * 0.3}%, transparent ${fadeStop}%)`,
        }}
      />

      {/* ── Right edge: warm-orange dots fading left ── */}
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 pointer-events-none"
        style={{
          width: edgeWidth,
          backgroundImage: dotPattern(rightColor),
          backgroundSize: bgSize,
          WebkitMaskImage: `linear-gradient(to left, black 0%, black ${fadeStop * 0.3}%, transparent ${fadeStop}%)`,
          maskImage:        `linear-gradient(to left, black 0%, black ${fadeStop * 0.3}%, transparent ${fadeStop}%)`,
        }}
      />
    </>
  );
}
