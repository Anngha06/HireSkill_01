"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

export default function ParallaxVideo() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const video = el.querySelector("video") as HTMLVideoElement
    video.play().catch(()=>{})
    gsap.to(".pv-fg", {
      yPercent: -20, scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true }
    })
    ScrollTrigger.create({ trigger: el, start: "top top", end: "+=1200", pin: true, scrub: true })
  }, [])
  return (
    <section className="py-24">
      <div ref={ref} className="relative slab overflow-hidden">
        <video src="/media/parallax.mp4" muted loop playsInline className="w-full h-[70vh] object-cover"></video>
        <img src="/media/overlay.png" alt="" className="pv-fg pointer-events-none absolute inset-0 opacity-70 mix-blend-multiply" />
      </div>
    </section>
  )
}
