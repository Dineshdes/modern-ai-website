"use client";

import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Features", href: "#inference" },
  { label: "Solutions", href: "#" },
  { label: "Docs", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Resources", href: "#" },
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
        "fixed left-0 right-0 z-50 h-16 transition-all duration-300",
        "top-[40px]",
        scrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-1.5">
          <span className="text-[#00E599] text-lg">✦</span>
          <span className="text-white font-medium text-[18px]">Synapse</span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-[15px] text-white/80 hover:text-white font-normal px-4 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#"
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Discord"
          >
            <MessageCircle size={18} />
          </a>
          <a
            href="#"
            className="text-[15px] text-white/70 hover:text-white transition-colors"
          >
            GitHub ★ 8.4k
          </a>
          <div className="w-px h-4 bg-white/[0.12] mx-1" />
          <a
            href="#"
            className="text-[15px] text-white/70 hover:text-white transition-colors"
          >
            Log in
          </a>
          <a
            href="#"
            className="bg-white text-[#1a1a1a] text-[15px] font-medium px-5 py-2 rounded-full hover:bg-white/90 transition-colors"
          >
            Sign up
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-[#797D86] hover:text-white transition-colors"
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
                  className="text-[15px] text-white/80 hover:text-white transition-colors block py-1"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2 flex flex-col gap-3 border-t border-white/[0.06]">
              <a
                href="#"
                className="text-[15px] text-white/70 hover:text-white transition-colors py-1"
                onClick={() => setMobileOpen(false)}
              >
                Log in
              </a>
              <a
                href="#"
                className="bg-white text-[#1a1a1a] text-[15px] font-medium px-5 py-2 rounded-full hover:bg-white/90 transition-colors text-center"
                onClick={() => setMobileOpen(false)}
              >
                Sign up
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
