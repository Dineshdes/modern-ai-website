"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";

const companies = ["Stripe", "Vercel", "Linear", "Notion", "Figma", "Shopify"];

const testimonials = [
  {
    quote:
      "Synapse AI cut our model deployment time from two weeks to fifteen minutes. The API is dead-simple and the latency is genuinely impressive at scale. We run hundreds of millions of inferences a month on it.",
    name: "Sarah Chen",
    title: "Staff Engineer",
    company: "Stripe",
    initials: "SC",
  },
  {
    quote:
      "We evaluated every inference provider on the market. Synapse won on latency, price, and — most importantly — it just works. The observability dashboard alone has saved us hours of debugging time every week.",
    name: "Marcus Reid",
    title: "Head of AI Platform",
    company: "Linear",
    initials: "MR",
  },
  {
    quote:
      "The fine-tuning pipeline is exceptional. We trained a custom Mistral variant on our internal codebase and deployed it before lunch the same day. Our VPC, our weights — no compromises on data security.",
    name: "Yuki Tanaka",
    title: "Principal ML Engineer",
    company: "Notion",
    initials: "YT",
  },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:py-32">
      <div className="max-w-[1216px] mx-auto">
        <SectionHeading
          badge="Social Proof"
          heading={"Trusted by engineering teams\nat world-class companies."}
          centered
        />

        {/* Logo bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 flex flex-wrap gap-8 justify-center items-center"
        >
          {companies.map((company) => (
            <span
              key={company}
              className="text-lg font-bold text-white/20 hover:text-white/50 transition-colors cursor-default"
            >
              {company}
            </span>
          ))}
        </motion.div>

        {/* Testimonial cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#111111] border border-white/[0.06] rounded-2xl p-8 flex flex-col gap-6 hover:border-white/[0.12] transition-all duration-300"
              style={{
                ["--hover-shadow" as string]: "0 0 40px rgba(0,229,153,0.08)",
              }}
            >
              {/* Opening quote mark */}
              <span className="text-[#00E599]/30 text-6xl font-serif leading-none select-none">
                &ldquo;
              </span>

              {/* Quote */}
              <p className="text-[#A1A1AA] text-base leading-relaxed flex-1 -mt-4">
                {t.quote}
              </p>

              {/* Attribution */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#00E599]/20 text-[#00E599] flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-[#71717A] text-xs">
                    {t.title}, {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
