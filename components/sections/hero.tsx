"use client";

import { motion } from "framer-motion";

const COMPANIES = [
  "DoorDash",
  "BCG",
  "Retool",
  "Meta",
  "Bitso",
  "Framer",
  "Replit",
  "Vercel",
  "Linear",
  "Notion",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-black">
      {/* Background radial gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,229,153,0.06),transparent)]" />

      {/* Bottom content area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <span className="text-[#00E599] text-sm">✦</span>
          <span className="text-xs font-mono uppercase tracking-[0.15em] text-[#797D86]">
            A DEVELOPER FIRST PLATFORM
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[60px] leading-[1.1] font-normal tracking-[-0.04em] text-white max-w-2xl"
        >
          Fast AI Inference for Teams and Agents
        </motion.h1>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="flex items-center gap-3 mt-8"
        >
          <a
            href="#"
            className="bg-white text-[#1a1a1a] font-medium text-base px-7 h-12 rounded-full inline-flex items-center hover:bg-white/90 transition-colors"
          >
            Get started
          </a>
          <a
            href="#"
            className="border border-white/20 text-white text-base font-normal px-7 h-12 rounded-full inline-flex items-center hover:border-white/40 transition-colors"
          >
            Read the docs
          </a>
        </motion.div>

        {/* Logo marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.26 }}
          className="mt-16 pt-8 border-t border-white/[0.06]"
        >
          <p className="text-xs text-[#797D86] uppercase tracking-widest mb-6">
            Trusted by teams at
          </p>
          <div className="overflow-hidden">
            <div className="flex gap-12 animate-scroll-left whitespace-nowrap">
              {[...COMPANIES, ...COMPANIES].map((name, i) => (
                <span
                  key={i}
                  className="text-sm font-semibold text-white/25 hover:text-white/50 transition-colors shrink-0"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
