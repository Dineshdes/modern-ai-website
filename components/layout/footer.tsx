const footerColumns = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact Sales", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Docs", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Support", href: "#" },
      { label: "Community Guides", href: "#" },
      { label: "Startups", href: "#" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Discord", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "X.com", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "YouTube", href: "#" },
    ],
  },
  {
    heading: "Compliance",
    links: [
      { label: "CCPA Compliant", href: "#" },
      { label: "GDPR Compliant", href: "#" },
      { label: "ISO 27001", href: "#" },
      { label: "SOC 2", href: "#" },
      { label: "HIPAA", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/[0.06] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-1.5">
              <span className="text-[#00E599] text-lg">✦</span>
              <span className="text-white font-medium text-[18px]">Synapse</span>
            </a>
            <span className="text-[#797D86] text-sm">
              A DEVELOPER FIRST PLATFORM
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#00E599] animate-pulse" />
            <span className="text-xs text-[#797D86]">All systems operational</span>
          </div>
        </div>

        {/* Footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-medium text-[#797D86] uppercase tracking-widest mb-5">
                {col.heading}
              </h3>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#797D86] hover:text-white transition-colors block mb-3"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <span className="text-xs text-[#797D86]">
              Made in SF and the World.
            </span>
            <span className="hidden md:inline text-[#797D86] text-xs">·</span>
            <span className="text-xs text-[#797D86]">
              Copyright © 2025 Synapse AI, Inc.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-xs text-[#797D86] hover:text-white transition-colors"
            >
              Privacy
            </a>
            <span className="text-[#797D86] text-xs">·</span>
            <a
              href="#"
              className="text-xs text-[#797D86] hover:text-white transition-colors"
            >
              Terms
            </a>
            <span className="text-[#797D86] text-xs">·</span>
            <a
              href="#"
              className="text-xs text-[#797D86] hover:text-white transition-colors"
            >
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
