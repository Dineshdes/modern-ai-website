import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Synapse AI — AI Infrastructure for Scale",
  description:
    "Deploy, fine-tune, and scale AI models with the fastest inference infrastructure on the planet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full`}>
      <body className="min-h-full bg-[#0A0A0A] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
