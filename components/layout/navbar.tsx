"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
  { label: "Blog", href: "#blog" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300",
        scrolled
          ? "bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-[1216px] mx-auto h-full flex items-center justify-between px-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 font-semibold text-white text-base">
          <span className="text-[#00E599]">✦</span> Synapse AI
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm text-[#A1A1AA] hover:text-white transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#login"
            className="text-sm text-[#A1A1AA] hover:text-white transition-colors px-3 py-2"
          >
            Log in
          </a>
          <a
            href="#signup"
            className="bg-[#00E599] text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#34D59A] transition-colors"
          >
            Get started →
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-[#A1A1AA] hover:text-white transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/[0.06]">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-[#A1A1AA] hover:text-white transition-colors block py-1"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2 flex flex-col gap-2">
              <a
                href="#login"
                className="text-sm text-[#A1A1AA] hover:text-white transition-colors py-1"
                onClick={() => setMobileOpen(false)}
              >
                Log in
              </a>
              <a
                href="#signup"
                className="bg-[#00E599] text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#34D59A] transition-colors text-center"
                onClick={() => setMobileOpen(false)}
              >
                Get started →
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
