
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
      <SideRails/>
      <main>
        <Hero />
        <section className="py-6">
          <div className="mx-auto max-w-6xl px-4">
            <p className="opacity-70">HIRESKILL AI .HIRESKILL AI. HIRESKILL AI.</p>
          </div>
        </section>
        <HorizontalGallery />
        <ParallaxVideo />
        <Services />
        <Awards />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
