// app/components/SideRails.tsx
"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

export default function SideRails() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const rails = [leftRef.current, rightRef.current].filter(Boolean) as HTMLDivElement[]
    const contexts: gsap.Context[] = []

    rails.forEach((rail, i) => {
      const ctx = gsap.context(() => {
        const orb = rail.querySelector<HTMLElement>(".orb")
        const glow = Array.from(rail.querySelectorAll<HTMLElement>(".glow"))

        if (orb) {
          gsap.to(orb, { y: -10, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" })
        }

        const targets: HTMLElement[] = orb ? [orb, ...glow] : glow
        if (targets.length) {
          gsap.to(targets, {
            yPercent: i ? -10 : 10,
            ease: "none",
            scrollTrigger: {
              trigger: document.body,
              start: "top top",
              end: "bottom bottom",
              scrub: true
            }
          })
        }
      }, rail)
      contexts.push(ctx)
    })

    return () => {
      contexts.forEach((c) => c.revert())
    }
  }, [])

  return (
    <>
      {/* LEFT */}
      <Rail refEl={leftRef} side="left" />
      {/* RIGHT */}
      <Rail refEl={rightRef} side="right" />

      <style jsx>{`
        .pillar {
          background: linear-gradient(180deg, #2a63ff 0%, #0ac2ff 60%, #0a7cff 100%);
        }
        .orbSkin {
          background:
            radial-gradient(60% 60% at 38% 40%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0) 55%),
            radial-gradient(70% 70% at 60% 65%, rgba(91, 160, 255, 0.35) 0%, rgba(91, 160, 255, 0) 60%),
            radial-gradient(50% 50% at 50% 50%, #2f6bff 0%, #0a2a6a 100%);
        }
      `}</style>
    </>
  )
}

function Rail({ refEl, side }: { refEl: React.RefObject<HTMLDivElement>; side: "left" | "right" }) {
  const align = side === "left" ? "left-3 sm:left-6" : "right-3 sm:right-6"
  return (
    <div
      ref={refEl}
      aria-hidden
      className={`pointer-events-none fixed inset-y-0 ${align} z-[-1] w-[86px] sm:w-[110px]`}
    >
      <div className="relative h-full">
        {/* top pillar */}
        <div className="pillar glow absolute top-0 left-1/2 -translate-x-1/2 w-[56px] sm:w-[72px] h-[34vh] rounded-lg opacity-80 shadow-[0_30px_120px_rgba(42,99,255,.45)]" />
        {/* bottom pillar */}
        <div className="pillar glow absolute bottom-0 left-1/2 -translate-x-1/2 w-[56px] sm:w-[72px] h-[42vh] rounded-lg opacity-80 shadow-[0_30px_120px_rgba(42,99,255,.45)]" />
        {/* central platform */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[52%] w-[76px] sm:w-[92px] h-[64px] rotate-45 bg-white/5 ring-1 ring-white/10 rounded-xl blur-[0.2px]" />
        {/* orb */}
        <div className="orb relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-[92%] h-[66px] w-[66px] sm:h-[78px] sm:w-[78px] rounded-full orbSkin shadow-[0_20px_80px_rgba(42,99,255,.35)]" />
      </div>
    </div>
  )
}
