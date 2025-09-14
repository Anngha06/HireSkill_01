"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import gsap from "gsap"

type Phase = { k: string; title: string; img: string; content: React.ReactNode }

const PHASES: Phase[] = [
  {
    k: "water",
    title: "VISION",
    img: "/work/v.svg",
    content: (
      <div className="space-y-3">
        <p className="text-white/75">
          At HireSkill.ai, our vision is to turn hiring from a slow, cost-heavy process into a strategic,
          revenue-enabling function that accelerates business growth and empowers organisations to thrive.
        </p>
        <p className="text-white/75">
          Hiring isn’t just an HR function. It is a growth driver. With us you are shaping your company’s future.
        </p>
      </div>
    ),
  },
  {
    k: "metal",
    title: "MISSION",
    img: "/work/m1.svg",
    content: (
      <div className="space-y-3">
        <p className="text-white/75">
          We eliminate inefficiency, bias, and guesswork by equipping organisations with AI-powered tools that:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-white/80">
        </ul>
        <p className="text-white/75">
          With HireSkill.ai, businesses stop wasting time on outdated processes and start making faster, fairer,
          smarter decisions.
        </p>
      </div>
    ),
  },
  {
    k: "earth",
    title: "OUR APPROACH",
    img: "/work/a1.svg",
    content: (
      <div className="space-y-3">
        <p className="text-white/75">
          By automating repetitive tasks, HireSkill.ai frees recruiters and hiring managers to focus on building
          authentic connections and making confident, strategic decisions.
        </p>
        <p className="text-white/75">
          Our platform automates the full lifecycle — from job posting and
          sourcing to interviews, proctoring, and final selection.
        </p>
      </div>
    ),
  },
]

export default function WuxingStack() {
  const [idx, setIdx] = useState(0)
  const idxRef = useRef(0)
  const wrap = useRef<HTMLDivElement>(null)
  const cards = useRef<HTMLDivElement[]>([])
  const setCardRef = (i: number) => (el: HTMLDivElement | null) => { if (el) cards.current[i] = el }

  const n = PHASES.length
  const positions = useMemo(() => Array.from({ length: n }, (_, i) => i), [n])

  const layout = (active: number, instant = false) => {
    const d = 0.8
    cards.current.forEach((el, i) => {
      if (!el) return
      let o = i - active
      if (o > n / 2) o -= n
      if (o < -n / 2) o += n
      const z = -Math.abs(o)
      const x = o * 60
      const s = 1 - Math.min(Math.abs(o) * 0.08, 0.35)
      const r = o * -4
      const b = Math.min(Math.abs(o) * 6, 12)
      gsap.to(el, {
        x, rotate: r, scale: s, zIndex: 100 + (10 + z),
        filter: `blur(${b}px) brightness(${o === 0 ? 1 : 0.9})`,
        opacity: Math.abs(o) > 2 ? 0 : 1,
        duration: instant ? 0 : d, ease: "power3.out",
      })
      const shadow = el.querySelector(".card-shadow") as HTMLElement | null
      if (shadow) {
        gsap.to(shadow, {
          boxShadow: o === 0 ? "0 40px 120px rgba(0,0,0,.45)" : "0 20px 60px rgba(0,0,0,.25)",
          duration: instant ? 0 : d, ease: "power3.out",
        })
      }
    })
  }

  useEffect(() => {
    const el = wrap.current
    if (!el) return

    idxRef.current = 0
    layout(0, true)

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 24 && Math.abs(e.deltaX) < 24) return
      const dir = e.deltaY > 0 || e.deltaX > 0 ? 1 : -1
      const next = (idxRef.current + dir + n) % n
      idxRef.current = next; setIdx(next); layout(next)
    }

    let startX = 0, dragging = false
    const onDown = (e: PointerEvent) => { dragging = true; startX = e.clientX; try { el.setPointerCapture(e.pointerId) } catch {} }
    const onMove = (e: PointerEvent) => { if (!dragging) return; const dx = e.clientX - startX; cards.current.forEach(c => c && gsap.set(c, { x: "+=" + dx * 0.02 })); startX = e.clientX }
    const onUp = (e: PointerEvent) => {
      if (!dragging) return; dragging = false
      const r = el.getBoundingClientRect()
      const next = (idxRef.current + (e.clientX > r.left + r.width / 2 ? 1 : -1) + n) % n
      idxRef.current = next; setIdx(next); layout(next)
    }

    const onMouse = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const nx = (e.clientX - (r.left + r.width / 2)) / r.width
      const ny = (e.clientY - (r.top + r.height / 2)) / r.height
      const front = cards.current[idxRef.current]; if (!front) return
      gsap.to(front, { rotateY: nx * 6, rotateX: -ny * 6, transformPerspective: 900, transformOrigin: "center", duration: 0.6, ease: "power2.out" })
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return
      const dir = e.key === "ArrowRight" ? 1 : -1
      const next = (idxRef.current + dir + n) % n
      idxRef.current = next; setIdx(next); layout(next)
    }

    el.addEventListener("wheel", onWheel, { passive: true })
    el.addEventListener("pointerdown", onDown)
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerup", onUp)
    window.addEventListener("mousemove", onMouse)
    window.addEventListener("keydown", onKey)

    return () => {
      el.removeEventListener("wheel", onWheel)
      el.removeEventListener("pointerdown", onDown)
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerup", onUp)
      window.removeEventListener("mousemove", onMouse)
      window.removeEventListener("keydown", onKey)
    }
  }, [n])

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-[1.1fr_.9fr] gap-10 items-center">
        <div>
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-blue">Hire Faster. Hire Smarter. Build Stronger Teams</h2>
          <p className="mt-6 text-lg leading-8 text-black/80">
            HireSkill.ai gives recruiters back their time, ensures authenticity, and delivers data-driven hiring — so companies can focus on building great teams, not battling broken processes
          </p>
        </div>

        <div className="relative select-none">
          <div ref={wrap} className="relative h-[420px] md:h-[520px] [perspective:1200px]">
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/[.02] to-black/40 blur-2xl" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative w-[88%] md:w-[520px] h-[92%]">
                {positions.map((i) => {
                  const p = PHASES[i]
                  return (
                    <div
                      key={p.k}
                      ref={setCardRef(i)}
                      className="absolute inset-0 card-shadow rounded-3xl overflow-hidden ring-1 ring-white/10 bg-[#171a1e] text-white"
                      style={{ willChange: "transform, filter" }}
                    >
                      <div className="h-[58%]">
                        <img src={p.img} alt={p.title} className="h-full w-full object-cover" draggable={false} />
                      </div>
                      <div className="p-6">
                        <div className="text-xl tracking-wider opacity-80">{p.title}</div>
                        {p.content}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-3">
            <button
              onClick={() => { const next = (idxRef.current - 1 + n) % n; idxRef.current = next; setIdx(next); layout(next) }}
              className="rounded-md border border-white/20 bg-white/10 text-white px-3 py-1.5 text-sm hover:bg-white/15 active:translate-y-[1px]"
              aria-label="Previous"
            >
              ← Prev
            </button>
            <button
              onClick={() => { const next = (idxRef.current + 1) % n; idxRef.current = next; setIdx(next); layout(next) }}
              className="rounded-md border border-white/20 bg-white/10 text-white px-3 py-1.5 text-sm hover:bg-white/15 active:translate-y-[1px]"
              aria-label="Next"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
