"use client"

import SideRails from "../components/SideRails"
import IntroLoader from "../components/IntroLoader"
import Header from "../components/Header"
import Hero from "../components/Hero"
import HorizontalGallery from "../components/HorizontalStory"
import ParallaxVideo from "../components/ParallaxVideo"
import Services from "../components/Services"
import Awards from "../components/FoundersMessage"
import Testimonials from "../components/Contact"
import Footer from "../components/Footer"

/* ---------- local marquee ---------- */
function Marquee({ text, speed = 28 }: { text: string; speed?: number }) {
  return (
    <div className="relative overflow-hidden select-none">
      <div className="track opacity-70 whitespace-nowrap">
        <span className="pr-8">{text}</span>
        <span className="pr-8" aria-hidden="true">{text}</span>
      </div>
      <style jsx>{`
        .track {
          display: inline-flex;
          gap: 2rem;
          padding-block: .25rem;
          will-change: transform;
          animation: marquee-left ${speed}s linear infinite;
        }
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

const MARQUEE_TEXT =
  "Hire in hours, not weeks · Skills over résumés · Fair. Fast. Skill-first hiring · AI that closes roles, not tabs · Every shortlist, on merit · Speed to talent, at scale · One platform. Zero bias · Interviews that score themselves · Stop screening. Start hiring · Talent, verified and ready · Proctoring you can trust · Automation that moves offers · From apply to offer, on autopilot · Quality hires, predictable speed · Data in. Bias out · The shortest path to the right hire · Real skills. Real-time decisions · Your funnel, finally disciplined · Engage candidates. Eliminate drop-off"

export default function Page() {
  return (
    <>
      <IntroLoader />
      <Header />
      <SideRails />

      <main className="relative">
        {/* Home */}
        <section id="home" aria-label="Home" className="scroll-mt-24 md:scroll-mt-28">
          <Hero />
          <div className="py-6">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <Marquee text={MARQUEE_TEXT} />
            </div>
          </div>
        </section>

        {/* Explore */}
        <section id="explore" aria-label="Explore" className="scroll-mt-24 md:scroll-mt-28">
          <div className="mx-auto max-w-[100vw]">
            <HorizontalGallery />
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ParallaxVideo />
          </div>
        </section>

        {/* About */}
        <section id="about" aria-label="About" className="scroll-mt-24 md:scroll-mt-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Services />
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Awards />
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Testimonials />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
