const COLS = [
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
      { label: "CCPA Compliant", href: "#", muted: true },
      { label: "GDPR Compliant", href: "#", muted: true },
      { label: "ISO 27001", href: "#", muted: true },
      { label: "SOC 2", href: "#", muted: true },
      { label: "HIPAA", href: "#", muted: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "#0C0D0D", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-[1400px] mx-auto px-8 pt-14 pb-8">
        {/* Logo row */}
        <div className="flex items-center justify-between mb-14">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2.5">
              <div
                className="flex items-center justify-center rounded"
                style={{ width: 26, height: 26, background: "#34D59A" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 2h9v6.5L7 12V7.5H2.5V2z" fill="#0C0D0D" />
                </svg>
              </div>
              <span className="font-semibold text-[16px]" style={{ color: "#F9FAFA" }}>Synapse</span>
            </a>
            <span className="text-[12px] ml-1" style={{ color: "#94979E" }}>An AI Inference Company</span>
          </div>
          <div className="flex items-center gap-2">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D59A", display: "inline-block" }} />
            <span className="text-xs" style={{ color: "#94979E" }}>All systems operational</span>
          </div>
        </div>

        {/* Link grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {COLS.map((col) => (
            <div key={col.heading}>
              <h3
                className="text-xs font-medium uppercase tracking-widest mb-5"
                style={{ color: "#94979E" }}
              >
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] transition-colors block"
                      style={{ color: "#94979E" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#F9FAFA")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#94979E")}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-3 text-xs" style={{ color: "#94979E" }}>
            <span>Made in SF and the World.</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>Copyright © 2024–2026 Synapse AI, Inc.</span>
          </div>
          <div className="flex items-center gap-4 text-xs" style={{ color: "#94979E" }}>
            {["Privacy", "Terms", "Cookie Settings"].map((item, i, arr) => (
              <>
                <a
                  key={item}
                  href="#"
                  className="transition-colors"
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#F9FAFA")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#94979E")}
                >
                  {item}
                </a>
                {i < arr.length - 1 && <span key={`sep-${i}`} style={{ opacity: 0.3 }}>·</span>}
              </>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
