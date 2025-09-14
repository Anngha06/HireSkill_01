// app/layout.tsx
import "./globals.css"
import type { Metadata, Viewport } from "next"
import BackgroundVideo from "../components/BackgroundVideo"
import RippleCursor from "../components/RippleCursor"
import Scene3D from "../components/Scene3D"
import PageFade from "../components/PageFade"
import LenisProvider from "../components/LenisProvider"

export const metadata: Metadata = {
  title: "Site",
  description: "Portfolio",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b14" },
  ],
  icons: {
    icon: "/favicon.ico",                // put a file in /public/favicon.ico
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",      // optional: add to /public
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Prevent 404 on background preload; safe even if file missing */}
        <link rel="preload" as="video" href="/bgg.mp4" />
      </head>
      <body className="relative min-h-dvh antialiased" suppressHydrationWarning>
        <LenisProvider>
          {/* background video */}
          <BackgroundVideo src="/bgg.mp4" />

          {/* 3D scene */}
          <Scene3D />

          {/* cursor ripple */}
          <RippleCursor />

          {/* routed content with fade */}
          <main className="relative z-0">
            <PageFade>{children}</PageFade>
          </main>
        </LenisProvider>

        {/* no-JS fallback */}
        <noscript>
          <style>{`
            .bg-video{display:none}
            body{background:radial-gradient(120% 120% at 50% 20%, #e6f3ff, #0b0b14);}
          `}</style>
        </noscript>
      </body>
    </html>
  )
}

