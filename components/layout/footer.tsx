"use client";

/* ─── Social icons (matching neon's community column style) ─── */
const DiscordIcon = () => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
    <path d="M13.55 1A13.2 13.2 0 0 0 10.3 0a.05.05 0 0 0-.05.02c-.14.25-.3.58-.41.84a12.2 12.2 0 0 0-3.67 0 8.4 8.4 0 0 0-.42-.84.05.05 0 0 0-.05-.02A13.2 13.2 0 0 0 2.45 1a.04.04 0 0 0-.02.02C.36 4.06-.22 7.03.07 9.96a.06.06 0 0 0 .02.04 13.3 13.3 0 0 0 4 2.02.05.05 0 0 0 .06-.02c.31-.42.58-.87.82-1.33a.05.05 0 0 0-.03-.07 8.8 8.8 0 0 1-1.25-.6.05.05 0 0 1 0-.09c.08-.06.17-.13.25-.2a.05.05 0 0 1 .05 0c2.63 1.2 5.47 1.2 8.07 0a.05.05 0 0 1 .05 0c.08.07.17.14.25.2a.05.05 0 0 1 0 .09c-.4.23-.82.43-1.25.6a.05.05 0 0 0-.03.07c.24.46.52.9.82 1.33a.05.05 0 0 0 .05.02 13.3 13.3 0 0 0 4.01-2.02.05.05 0 0 0 .02-.04c.34-3.5-.57-6.45-2.43-9.1a.04.04 0 0 0-.02-.01ZM5.34 8.17c-.79 0-1.43-.72-1.43-1.61s.63-1.61 1.43-1.61c.8 0 1.44.73 1.43 1.61 0 .89-.63 1.61-1.43 1.61Zm5.31 0c-.78 0-1.43-.72-1.43-1.61s.64-1.61 1.43-1.61c.8 0 1.44.73 1.43 1.61 0 .89-.63 1.61-1.43 1.61Z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <path d="M7 0a7 7 0 0 0-2.21 13.64c.35.06.48-.15.48-.34l-.01-1.2c-1.96.43-2.37-.94-2.37-.94-.32-.81-.78-1.03-.78-1.03-.64-.44.05-.43.05-.43.7.05 1.07.72 1.07.72.63 1.07 1.64.76 2.04.58.06-.46.24-.76.44-.93-1.56-.18-3.2-.78-3.2-3.48 0-.77.27-1.4.72-1.89-.07-.18-.31-.9.07-1.86 0 0 .59-.19 1.93.72a6.7 6.7 0 0 1 3.5 0c1.34-.91 1.93-.72 1.93-.72.38.97.14 1.68.07 1.86.45.5.72 1.12.72 1.89 0 2.71-1.65 3.3-3.22 3.47.25.22.48.65.48 1.31l-.01 1.94c0 .19.13.41.49.34A7 7 0 0 0 7 0Z"/>
  </svg>
);

const XIcon = () => (
  <svg width="13" height="12" viewBox="0 0 13 12" fill="currentColor">
    <path d="M10.07 0h1.96L7.74 5.08 12.76 12H8.83L5.74 7.8 2.2 12H.24l4.6-5.26L0 0h4.03L6.8 3.84 10.07 0ZM9.38 10.78h1.09L3.43 1.12H2.26l7.12 9.66Z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor">
    <path d="M2.9 13H.21V4.32H2.9V13ZM1.56 3.14C.7 3.14 0 2.43 0 1.57 0 .7.7 0 1.56 0c.85 0 1.55.7 1.55 1.57 0 .86-.7 1.57-1.55 1.57ZM13 13h-2.69V8.77c0-1.01-.02-2.3-1.4-2.3-1.4 0-1.62 1.1-1.62 2.23V13H4.6V4.32h2.58v1.18h.04c.36-.68 1.24-1.4 2.55-1.4 2.73 0 3.23 1.8 3.23 4.13V13Z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
    <path d="M15.67 1.87A2.01 2.01 0 0 0 14.25.44C13 .1 8 .1 8 .1s-5 0-6.25.34A2.01 2.01 0 0 0 .33 1.87 21.1 21.1 0 0 0 0 6c0 1.4.12 2.8.33 4.13A2.01 2.01 0 0 0 1.75 11.56C3 11.9 8 11.9 8 11.9s5 0 6.25-.34a2.01 2.01 0 0 0 1.42-1.43C15.88 8.8 16 7.4 16 6c0-1.4-.12-2.8-.33-4.13ZM6.4 8.57V3.43L10.55 6 6.4 8.57Z"/>
  </svg>
);

const COLS = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact Sales", href: "#" },
      { label: "Security", href: "#" },
      { label: "Legal", href: "#", hasChevron: true },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Docs", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Support", href: "#" },
      { label: "Community Guides", href: "#" },
      { label: "AI Tutorial", href: "#" },
      { label: "Startups", href: "#" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Discord", href: "#", icon: <DiscordIcon /> },
      { label: "GitHub", href: "#", icon: <GitHubIcon /> },
      { label: "X.com", href: "#", icon: <XIcon /> },
      { label: "LinkedIn", href: "#", icon: <LinkedInIcon /> },
      { label: "YouTube", href: "#", icon: <YouTubeIcon /> },
    ],
  },
  {
    heading: "Compliance",
    links: [
      { label: "CCPA", href: "#", badge: "Compliant" },
      { label: "GDPR", href: "#", badge: "Compliant" },
      { label: "ISO 27001", href: "#", badge: "Certified" },
      { label: "SOC 2", href: "#", badge: "Certified" },
      { label: "HIPAA", href: "#", badge: "Compliant", hasChevron: true },
      { label: "Trust Center", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative" style={{ background: "#0C0D0D", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-8 pt-14 pb-8">
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
          <a
            href="#"
            className="flex items-center gap-2 transition-opacity hover:opacity-100"
            style={{ opacity: 0.8 }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D59A", display: "inline-block" }} />
            <span className="text-xs" style={{ color: "#94979E" }}>All systems operational</span>
          </a>
        </div>

        {/* Link grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {COLS.map((col) => (
            <div key={col.heading}>
              <h3
                className="text-[10px] font-medium uppercase tracking-[0.16em] mb-5"
                style={{ color: "#94979E" }}
              >
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] transition-colors flex items-center gap-2"
                      style={{ color: "#94979E" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#F9FAFA")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#94979E")}
                    >
                      {"icon" in link && link.icon}
                      <span>{link.label}</span>
                      {"badge" in link && link.badge && (
                        <span style={{ color: "rgba(148,151,158,0.5)", fontSize: 12 }}>
                          {link.badge}
                        </span>
                      )}
                      {"hasChevron" in link && link.hasChevron && (
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ opacity: 0.4 }}>
                          <path d="M2 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
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
            <span style={{ opacity: 0.3 }}>&middot;</span>
            <span>Copyright &copy; 2024&ndash;2026 Synapse AI, Inc.</span>
          </div>
          <div className="flex items-center gap-4 text-xs" style={{ color: "#94979E" }}>
            {["Privacy", "Terms", "Cookie Settings"].map((item, i, arr) => (
              <span key={item} className="flex items-center gap-4">
                <a
                  href="#"
                  className="transition-colors"
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#F9FAFA")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#94979E")}
                >
                  {item}
                </a>
                {i < arr.length - 1 && <span style={{ opacity: 0.3 }}>&middot;</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
