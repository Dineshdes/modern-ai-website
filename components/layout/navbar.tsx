"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Products", href: "#" },
  { label: "Solutions", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Docs", href: "#" },
  { label: "Blog", href: "#" },
];

export default function Navbar() {
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
          ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-[1216px] mx-auto h-full flex items-center justify-between px-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 text-white" style={{ fontWeight: 500 }}>
          <span className="text-[#00E599]">✦</span> Synapse
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-[15px] text-white hover:text-[#94979E] transition-colors"
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
            className="text-sm text-[#94979E] hover:text-white transition-colors"
          >
            Log in
          </a>
          <a
            href="#signup"
            className="bg-white text-[#1a1a1a] text-sm font-medium px-5 py-2 rounded-full hover:bg-white/90 transition-colors"
          >
            Get started
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-[#94979E] hover:text-white transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/[0.06]">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[15px] text-white hover:text-[#94979E] transition-colors block py-1"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2 flex flex-col gap-3">
              <a
                href="#login"
                className="text-sm text-[#94979E] hover:text-white transition-colors py-1"
                onClick={() => setMobileOpen(false)}
              >
                Log in
              </a>
              <a
                href="#signup"
                className="bg-white text-[#1a1a1a] text-sm font-medium px-5 py-2 rounded-full hover:bg-white/90 transition-colors text-center"
                onClick={() => setMobileOpen(false)}
              >
                Get started
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
