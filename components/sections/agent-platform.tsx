"use client";

import { motion } from "framer-motion";

const cards = [
  {
    step: "01",
    title: "Idle-aware fleet",
    body: "Deploy thousands of models that turn off when idle. Inactive endpoints pause automatically, keeping your fleet efficient.",
  },
  {
    step: "02",
    title: "API-first management",
    body: "Manage your fleet via API. Spin up endpoints in milliseconds with full quota controls and monitoring.",
  },
  {
    step: "03",
    title: "Database checkpoints",
    body: "Copy-on-write storage makes it cheap to save point-in-time snapshots.",
  },
  {
    step: "04",
    title: "Built-in security",
    body: "Built-in rate limiting, authentication, and audit logs for every inference request.",
  },
];

export default function AgentPlatform() {
  return (
    <section className="bg-black border-y border-white/[0.06] py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Terminal label bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-[#18191B] border border-white/[0.08] rounded-lg px-4 py-2 inline-flex items-center gap-6 text-xs font-mono text-[#797D86]">
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#00E599] animate-pulse" />
              SYSTEM: SYNAPSE AI PLATFORM
            </span>
            <span>[ STATUS: ONLINE ]</span>
            <span>[ CONNECTION: STABLE ]</span>
          </div>
        </motion.div>

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-sm font-medium text-[#00E599] uppercase tracking-widest mb-4"
        >
          Agent platform
        </motion.p>

        {/* H2 */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[80px] leading-[1] font-normal tracking-[-0.04em] text-white"
        >
          Speed and scale for agents. And teams.
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-[#797D86] text-xl mt-6 max-w-2xl"
        >
          Agent platforms and codegen tools rely on Synapse to run AI inference
          at scale for their users.
        </motion.p>

        {/* CTA */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          href="#"
          className="text-white text-base hover:text-[#00E599] transition-colors inline-flex items-center gap-2 mt-8"
        >
          I&apos;m building an agent →
        </motion.a>

        {/* Fleet visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="bg-[#111215] rounded-2xl p-6 border border-white/[0.06] mt-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-[#00E599] animate-pulse" />
              <span className="text-sm text-white font-medium">
                Endpoints deployed: 41,092
              </span>
            </div>
            <span className="text-xs text-[#797D86]">Last 7 days</span>
          </div>

          <div className="space-y-4">
            {[
              { day: "Friday", active: 28400, idle: 12692 },
              { day: "Saturday", active: 19200, idle: 21892 },
            ].map(({ day, active, idle }) => {
              const total = active + idle;
              const activePct = (active / total) * 100;
              return (
                <div key={day}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#797D86]">{day}</span>
                    <div className="flex gap-4 text-xs">
                      <span className="text-[#00E599]">
                        Active: {active.toLocaleString()}
                      </span>
                      <span className="text-[#797D86]">
                        Idle: {idle.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-[#18191B] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#00E599] rounded-full"
                      style={{ width: `${activePct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {cards.map((card, i) => (
            <motion.div
              key={card.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="bg-[#18191B] border border-white/[0.06] rounded-2xl p-7"
            >
              <p className="text-xs font-mono text-[#797D86] mb-4">
                {card.step}
              </p>
              <h3 className="text-[28px] font-normal tracking-tight text-[#797D86] mb-3">
                {card.title}
              </h3>
              <p className="text-[15px] text-[#797D86] leading-relaxed">
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
