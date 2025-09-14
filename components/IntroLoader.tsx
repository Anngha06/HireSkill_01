 // app/components/IntroLoader.tsx
"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function IntroLoader({
  brand = "HireSkill",
  sub = "AI",
}: {
  brand?: string
  sub?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.display = "none"
      return
    }

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } })

    gsap.set(el, { opacity: 1 })
    gsap.set(".il-wordmark", { y: 10, opacity: 0, filter: "blur(6px)" })
    gsap.set(".il-shimmer", { xPercent: -120, opacity: 0.6 })
    gsap.set(".il-bar-fill", { scaleX: 0, transformOrigin: "0 50%" })
    gsap.set(".il-vignette", { opacity: 0.2 })

    tl.to(".il-vignette", { opacity: 0.4, duration: 0.6 }, 0)
      .to(".il-wordmark", { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7 }, 0.1)
      .to(".il-shimmer", { xPercent: 130, duration: 1.2 }, 0.2)
      .to(".il-bar-fill", { scaleX: 1, duration: 1.2 }, 0.3)
      .to(".il-ring", { opacity: 0.12, scale: 1.02, duration: 0.8 }, 0.3)
      .to(el, { opacity: 0, duration: 0.5, delay: 0.25 })
      .set(el, { display: "none" })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[60] grid place-items-center opacity-0"
      aria-label="Loading"
      role="status"
    >
      {/* background */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_110%_at_50%_30%,#EAF2FF_0%,#FDFEFF_55%,#FFFFFF_90%)]" />
      <div className="il-vignette pointer-events-none absolute inset-0 bg-[radial-gradient(140%_140%_at_50%_50%,transparent_55%,rgba(0,10,40,.18)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(1px_1px_at_15%_20%,rgba(0,0,0,.08),transparent_2px),radial-gradient(1px_1px_at_70%_40%,rgba(0,0,0,.06),transparent_2px),radial-gradient(1px_1px_at_30%_80%,rgba(0,0,0,.05),transparent_2px)] [background-size:140px_140px,180px_180px,160px_160px] animate-[grain_14s_linear_infinite]" />

      {/* card */}
      <div className="relative w-[min(88vw,560px)] rounded-3xl bg-white/65 backdrop-blur-xl ring-1 ring-black/10 shadow-[0_10px_50px_rgba(0,0,0,0.08)] p-8">
        {/* wordmark */}
        <div className="il-wordmark relative mx-auto flex w-max items-center gap-2 select-none">
          <span className="text-[32px] sm:text-[38px] leading-none font-medium text-[#2563ff] tracking-tight">
            {brand}
          </span>
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#2563ff] text-white text-[11px] font-semibold">
            {sub}
          </span>

          {/* shimmer sweep */}
          <div className="il-shimmer pointer-events-none absolute -inset-y-3 -left-6 -right-6 rotate-6 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.9),transparent)] mix-blend-screen" />
        </div>

        {/* progress */}
        <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-black/10">
          <div className="il-bar-fill h-full w-full bg-[#2563ff]" />
        </div>

        {/* hint */}
        <p className="mt-3 text-center text-xs text-slate-600">Preparing your experience…</p>

        {/* soft ring */}
        <div className="il-ring pointer-events-none absolute inset-0 rounded-3xl ring-4 ring-[#2563ff]/10" />
      </div>

      <style jsx>{`
        @keyframes grain {
          0% { background-position: 0 0, 0 0, 0 0; }
          100% { background-position: 140px 160px, -180px 120px, 160px -140px; }
        }
      `}</style>
    </div>
  )
}

 