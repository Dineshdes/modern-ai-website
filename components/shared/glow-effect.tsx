import { cn } from "@/lib/utils";

type GlowPosition = "top-left" | "top-center" | "top-right" | "center";

interface GlowEffectProps {
  position?: GlowPosition;
  className?: string;
}

const positionClasses: Record<GlowPosition, string> = {
  "top-left": "-top-32 -left-32",
  "top-center": "-top-32 left-1/2 -translate-x-1/2",
  "top-right": "-top-32 -right-32",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
};

export function GlowEffect({ position = "top-center", className }: GlowEffectProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute",
        positionClasses[position],
        className
      )}
      style={{
        width: 600,
        height: 600,
        background:
          "radial-gradient(ellipse at center, rgba(0,229,153,0.12) 0%, transparent 60%)",
        borderRadius: "50%",
      }}
    />
  );
}
