// app/page.tsx
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

export default function Page() {
  return (
    <>
      <IntroLoader />
      <Header />
      <SideRails />
      <main>
        {/* Home */}
        <section id="home" aria-label="Home" className="scroll-mt-24 md:scroll-mt-28">
          <Hero />
          <div className="py-6">
            <div className="mx-auto max-w-6xl px-4">
              <marquee className="opacity-70" behavior="scroll" direction="left" scrollamount={7}>
  Hire in hours, not weeks · Skills over résumés · Fair. Fast. Skill-first hiring · AI that closes roles, not tabs ·
  Every shortlist, on merit · Speed to talent, at scale · One platform. Zero bias · Interviews that score themselves ·
  Stop screening. Start hiring · Talent, verified and ready · Proctoring you can trust · Automation that moves offers ·
  From apply to offer, on autopilot · Quality hires, predictable speed · Data in. Bias out · The shortest path to the
  right hire · Real skills. Real-time decisions · Your funnel, finally disciplined · Engage candidates. Eliminate drop-off
</marquee>

            </div>
          </div>
        </section>

        {/* Explore */}
        <section id="explore" aria-label="Explore" className="scroll-mt-24 md:scroll-mt-28">
          <HorizontalGallery />
          <ParallaxVideo />
        </section>

        {/* About */}
        <section id="about" aria-label="About" className="scroll-mt-24 md:scroll-mt-28">
          <Services />
          <Awards />
          <Testimonials />
        </section>
      </main>
      <Footer />
    </>
  )
}

