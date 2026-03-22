const footerColumns = [
  {
    heading: "Products",
    links: [
      { label: "Model Serving", href: "#" },
      { label: "Fine-tuning", href: "#" },
      { label: "Vector DB", href: "#" },
      { label: "Autoscaling", href: "#" },
      { label: "Observability", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Docs", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Status", href: "#" },
      { label: "Community", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/[0.06] pt-16 pb-8">
      <div className="max-w-[1216px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div>
            <a href="/" className="flex items-center gap-2 text-white" style={{ fontWeight: 500 }}>
              <span className="text-[#00E599]">✦</span> Synapse AI
            </a>
            <p className="text-[#94979E] text-sm mt-3">
              AI infrastructure for developers.
            </p>
          </div>

          {/* Link Columns */}
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-medium text-[#94979E] uppercase tracking-wider mb-4">
                {col.heading}
              </h3>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#94979E] hover:text-white transition-colors block mb-3"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#94979E]">© 2025 Synapse AI, Inc.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-[#94979E] hover:text-white transition-colors">
              Privacy
            </a>
            <span className="text-[#94979E] text-xs">·</span>
            <a href="#" className="text-xs text-[#94979E] hover:text-white transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
