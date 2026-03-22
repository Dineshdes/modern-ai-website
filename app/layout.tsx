import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Synapse AI — Fast AI Inference for Teams and Agents",
  description: "Deploy, scale, and serve language models at any scale. Serverless AI inference with instant provisioning.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} dark`}>
      <body
        className="antialiased"
        style={{ backgroundColor: "#0C0D0D", color: "#F9FAFA", fontFamily: "var(--font-sans), 'IBM Plex Sans', system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
