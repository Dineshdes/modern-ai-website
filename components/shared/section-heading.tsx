import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  heading: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeading({
  badge,
  heading,
  description,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && "text-center")}>
      {badge && (
        <span className="inline-block border border-[#00E599]/30 text-[#00E599] text-xs px-3 py-1 rounded-full bg-[#00E599]/10 mb-4">
          {badge}
        </span>
      )}
      <h2
        className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight"
        dangerouslySetInnerHTML={{
          __html: heading.replace(/\n/g, "<br/>"),
        }}
      />
      {description && (
        <p
          className={cn(
            "text-[#A1A1AA] text-lg mt-4 max-w-2xl",
            centered && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
