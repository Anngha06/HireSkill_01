"use client"
import { useEffect, useRef, useState } from "react"

export default function Hero() {
  // hooks first
  const [mounted, setMounted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    if (!mounted) return
    const v = videoRef.current
    if (!v) return

    // loop segment 0→14s without touching render output
    const LOOP_START = 0
    const LOOP_END = 14
    const ensurePlay = () => v.play().catch(() => {})
    const onLoaded = () => { try { v.currentTime = LOOP_START } catch {} ; ensurePlay() }
    const onTime = () => {
      if (v.currentTime >= LOOP_END - 0.03) {
        v.currentTime = LOOP_START + 0.01
        ensurePlay()
      }
    }
    const onVis = () => (document.hidden ? v.pause() : ensurePlay())

    v.addEventListener("loadedmetadata", onLoaded)
    v.addEventListener("timeupdate", onTime)
    document.addEventListener("visibilitychange", onVis)
    ensurePlay()

    return () => {
      v.removeEventListener("loadedmetadata", onLoaded)
      v.removeEventListener("timeupdate", onTime)
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <section className="relative min-h-[88vh] flex items-end pb-16">
      {/* background video */}
      <div className="absolute inset-0 -z-10">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          playsInline
          preload="auto"
          poster="/media/astronaut.jpg"
          aria-hidden="true"
        >
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
        {/* base fade to content */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutralLight via-neutralLight/10 to-transparent" />
        {/* subtle blue veil via static CSS (no JS mutation) */}
        <div className="pointer-events-none absolute inset-0" style={{ background: "rgba(36,80,166,0.16)" }} />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <h1 className="display font-semibold">
          <span className="inline-block">Too</span>{" "}
          <span className="inline-block">Many</span>{" "}
          <span className="inline-block">candidates?</span>{" "}
          <span className="inline-block text-blue-600 font-bold">Hire&nbsp;Smarter.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed">
         HireSkill caters to end-to-end hiring.<br />
        <strong>-from AI screening to interviews —</strong>making recruitment 3× faster and smarter.
         </p>
        <p className="mt-3 text-sm opacity-70">4 Steps: Define the Role · AI Interviews · AI Feedback · Dashboard Insights</p>
      </div>
    </section>
  )
}

