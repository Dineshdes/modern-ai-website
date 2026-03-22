"use client";

export default function CTAFinal() {
  return (
    <section className="bg-black border-t border-white/[0.06] py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left text */}
        <div className="text-[#797D86] text-lg leading-snug max-w-md">
          <p>Trusted by developers, ready for agents.</p>
          <p>Build and scale AI faster with Synapse.</p>
        </div>

        {/* Right buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#"
            className="bg-white text-[#1a1a1a] font-medium px-6 h-11 rounded-full text-sm inline-flex items-center hover:bg-white/90 transition-colors"
          >
            Get started
          </a>
          <a
            href="#"
            className="border border-white/20 text-white px-6 h-11 rounded-full text-sm inline-flex items-center hover:border-white/40 transition-colors"
          >
            Read the docs
          </a>
          <button className="bg-[#111215] border border-white/[0.08] rounded-xl px-4 h-11 font-mono text-sm inline-flex items-center gap-2 hover:border-white/20 cursor-pointer transition-colors">
            <span className="text-[#00E599]">$</span>
            <span className="text-[#797D86]">npx synapse init</span>
          </button>
        </div>
      </div>
    </section>
  );
}
