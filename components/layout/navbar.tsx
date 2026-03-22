"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Product", href: "/product" },
  { label: "Solutions", href: "#" },
  { label: "Docs", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed left-0 right-0 z-50 h-16 transition-all duration-300"
      style={{
        top: "40px",
        backgroundColor: scrolled ? "rgba(12,13,13,0.92)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
      }}
    >
      <div
        className="h-full flex items-center justify-between px-8"
        style={{ maxWidth: 1600, margin: "0 auto" }}
      >
        {/* Logo + company */}
        <a href="/" className="flex items-center gap-3 shrink-0">
          {/* Neon-style logo mark */}
          <div
            className="flex items-center justify-center rounded"
            style={{ width: 28, height: 28, background: "#34D59A" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 2h10v8L8 14V9H3V2z" fill="#0C0D0D" />
            </svg>
          </div>
          <span className="font-semibold text-[17px]" style={{ color: "#F9FAFA", letterSpacing: "-0.3px" }}>
            Synapse
          </span>
          {/* Company badge */}
          <div
            className="hidden md:flex items-center gap-1.5 ml-1 px-2 py-0.5 rounded text-[10px] uppercase tracking-widest"
            style={{ color: "#94979E", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <span>A Y COMBINATOR COMPANY</span>
          </div>
        </a>

        {/* Center nav */}
        <ul className="hidden md:flex items-center">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="px-4 text-[15px] transition-colors"
                style={{ color: "#94979E" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F9FAFA")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#94979E")}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right CTAs */}
        <div className="hidden md:flex items-center gap-3">
          {/* Discord icon */}
          <a href="#" style={{ color: "#94979E" }} className="hover:text-white transition-colors" aria-label="Discord">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.114 18.1.132 18.11a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
            </svg>
          </a>
          {/* GitHub */}
          <a href="#" className="flex items-center gap-1.5 text-[14px] transition-colors" style={{ color: "#94979E" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F9FAFA")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#94979E")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            21.2k
          </a>
          <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.1)" }} />
          <a href="#" className="text-[15px] transition-colors" style={{ color: "#94979E" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F9FAFA")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#94979E")}
          >
            Log in
          </a>
          <a
            href="#"
            className="text-[15px] font-medium px-4 py-2 rounded-full transition-colors"
            style={{ background: "#F9FAFA", color: "#0C0D0D" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e5e7eb")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#F9FAFA")}
          >
            Sign up
          </a>
        </div>
      </div>
    </nav>
  );
}
