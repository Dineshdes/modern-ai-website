"use client";

import { motion } from "framer-motion";

export default function FineTuningSection() {
  return (
    <section
      id="finetuning"
      className="relative py-32 border-b border-white/[0.06] bg-black"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Visual (left) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-[#18191B] border border-white/[0.06] rounded-2xl overflow-hidden p-6">
              {/* Job header */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono text-[#797D86]">
                  TRAINING JOB #1847
                </span>
                <span className="text-xs font-medium text-[#00E599] bg-[#00E599]/10 px-2 py-0.5 rounded-full">
                  RUNNING
                </span>
              </div>

              {/* Progress bar */}
              <div className="bg-[#0D0D0D] rounded-full h-2 mb-5">
                <div
                  className="bg-[#00E599] h-2 rounded-full transition-all"
                  style={{ width: "65%" }}
                />
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: "Epoch", value: "3 / 10" },
                  { label: "Loss", value: "0.0842" },
                  { label: "LR", value: "2e-5" },
                  { label: "ETA", value: "14 min" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="bg-[#111215] rounded-lg p-3 border border-white/[0.04]"
                  >
                    <p className="text-xs text-[#797D86] mb-1">{label}</p>
                    <p className="text-sm text-white font-mono">{value}</p>
                  </div>
                ))}
              </div>

              {/* Loss curve */}
              <div className="bg-[#0D0D0D] rounded-xl p-4">
                <p className="text-xs text-[#797D86] mb-3 font-mono">
                  Training loss
                </p>
                <svg
                  viewBox="0 0 280 60"
                  className="w-full"
                  preserveAspectRatio="none"
                >
                  <polyline
                    points="0,55 30,45 60,35 90,27 120,20 150,16 180,13 210,11 240,10 280,9"
                    fill="none"
                    stroke="#00E599"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="0,55 30,45 60,35 90,27 120,20 150,16 180,13 210,11 240,10 280,9"
                    fill="url(#lossGrad)"
                    stroke="none"
                  />
                  <defs>
                    <linearGradient
                      id="lossGrad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#00E599"
                        stopOpacity="0.15"
                      />
                      <stop
                        offset="100%"
                        stopColor="#00E599"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>
                  <polyline
                    points="0,55 30,45 60,35 90,27 120,20 150,16 180,13 210,11 240,10 280,9 280,60 0,60"
                    fill="url(#lossGrad)"
                    stroke="none"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Text (right) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2"
          >
            <p className="text-xs font-medium text-[#00E599] uppercase tracking-widest mb-6">
              Fine-tuning
            </p>
            <h2 className="text-[48px] leading-[54px] font-normal tracking-[-0.04em] text-[#797D86]">
              <span className="text-white">Train on your data.</span>{" "}
              Own your weights, keep your data in your environment.
            </h2>
            <p className="text-[#797D86] text-lg leading-relaxed mt-6 max-w-lg">
              Upload a dataset, configure hyperparameters, launch a training job
              in 3 minutes. Data never leaves your VPC.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Managed training jobs",
                "Data stays in your VPC",
                "Full weight ownership",
              ].map((item) => (
                <li key={item} className="flex items-center">
                  <span className="size-1.5 rounded-full bg-[#34D59A] mr-3 flex-shrink-0" />
                  <span className="text-[15px] text-[#797D86]">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="text-[15px] text-white hover:text-[#00E599] transition-colors mt-8 inline-flex items-center gap-1.5"
            >
              Start fine-tuning →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
