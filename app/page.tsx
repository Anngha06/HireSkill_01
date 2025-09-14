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
              <p className="opacity-70">HIRESKILL AI .HIRESKILL AI. HIRESKILL AI.</p>
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

