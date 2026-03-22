const footerColumns = [
  {
    heading: "Product",
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
      { label: "Status", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Community", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/[0.06]">
      <div className="max-w-[1216px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <a href="/" className="flex items-center gap-2 font-semibold text-white text-base">
              <span className="text-[#00E599]">✦</span> Synapse AI
            </a>
            <p className="text-sm text-[#71717A] leading-relaxed max-w-xs">
              AI infrastructure for the next generation of software.
            </p>
          </div>

          {/* Link Columns */}
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-white mb-4">{col.heading}</h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#71717A] hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-[1216px] mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#71717A]">© 2025 Synapse AI, Inc.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-[#71717A] hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-[#71717A] hover:text-white transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
