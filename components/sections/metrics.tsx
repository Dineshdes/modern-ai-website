"use client";

const stats = [
  { value: "10B+", label: "Tokens processed daily" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "<50ms", label: "P99 latency" },
  { value: "180+", label: "Countries" },
];

export default function Metrics() {
  return (
    <section className="bg-[#18191B] border-y border-white/[0.06] py-14">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              <div className="flex-1 py-8 sm:py-0 sm:px-14 text-center">
                <div
                  className="text-white tracking-tight"
                  style={{ fontSize: "42px", fontWeight: 400 }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-[#94979E] mt-1">{stat.label}</div>
              </div>
              {i < stats.length - 1 && (
                <div className="hidden sm:block w-px h-12 bg-white/[0.08]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
