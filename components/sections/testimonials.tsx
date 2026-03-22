"use client";

import { motion } from "framer-motion";

const EASE = "easeOut" as const;

const companies = ["Stripe", "Vercel", "Linear", "Notion", "Figma", "Shopify"];

const testimonials = [
  {
    quote:
      "Synapse cut our inference costs by 60% the week we switched. The autoscaling alone paid for itself.",
    name: "Sarah Chen",
    role: "Staff Eng @ Stripe",
    initials: "SC",
  },
  {
    quote:
      "Best developer experience I've had with AI infra. Deployed in production in under an hour.",
    name: "Marcus A.",
    role: "CTO @ Launchpad",
    initials: "MA",
  },
  {
    quote:
      "The branching feature changed how we do ML experiments. No more duplicating environments.",
    name: "Priya N.",
    role: "ML Lead @ Notion",
    initials: "PN",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-black py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <h2
          className="text-white tracking-[-0.02em] text-center font-normal"
          style={{ fontSize: "clamp(36px,4vw,42px)" }}
        >
          Loved by engineering teams.
        </h2>

        {/* Logo bar */}
        <div className="mt-10 mb-8">
          <div className="h-px bg-white/[0.06]" />
          <div className="flex flex-wrap items-center justify-center mt-8 mb-8">
            {companies.map((company) => (
              <span
                key={company}
                className="text-sm font-semibold text-white/20 hover:text-white/50 transition-colors px-6 py-2 cursor-default"
              >
                {company}
              </span>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              className="bg-[#18191B] border border-white/[0.06] rounded-2xl p-7 flex flex-col hover:border-white/[0.12] transition-colors duration-300"
            >
              {/* Decorative quote mark */}
              <span
                className="leading-none mb-4 select-none"
                style={{
                  fontSize: "3rem",
                  fontFamily: "Georgia, serif",
                  color: "rgba(0,229,153,0.2)",
                }}
              >
                &ldquo;
              </span>

              {/* Quote */}
              <p className="text-[#94979E] text-[15px] leading-relaxed flex-1">
                {t.quote}
              </p>

              {/* Attribution */}
              <div className="flex items-center gap-3 mt-6">
                <div className="size-8 rounded-full bg-[#00E599]/15 text-[#00E599] text-xs flex items-center justify-center font-medium shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{t.name}</p>
                  <p className="text-[#94979E] text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
