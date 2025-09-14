 // app/components/HorizontalStory.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

type Slide = { title: string; sub: string; img: string }
const USE_CASES: UseCase[] = [
  {
    key: 'corporate',
    title: 'Corporate Hiring',
    summary:
      'Win the talent race. Every time. Eliminate delays, resume inflation, and bias with AI-driven shortlisting, screening, and interviews.',
    bullets: [
      'Boost recruiter efficiency — AI surfaces only the top candidates, saving hours of manual work.',
      'Faster hiring, less drop-off — Instant scheduling and structured feedback keep talent engaged.',
      'Fair, skill-first evaluations — Every candidate is judged on skills—not resumes.',
    ],
  },
  {
    key: 'high-volume',
    title: 'High-Volume Hiring',
    summary:
      'Hire at scale. Without losing quality. Process thousands of applicants seamlessly with AI automation and proctoring.',
    bullets: [
      'AI handles the load — AI shortlisting, screening, interview and scoring in one place.',
      'Keep candidates engaged — Real-time evaluation reduces ghosting and delays.',
      'Consistent, bias-free results — Standardised skill-based evaluations every time.',
    ],
  },
  {
    key: 'ops',
    title: 'Recruiting Operations',
    summary:
      'AI does the grind. You check the end result. Free recruiters from manual tasks so they can focus on outcomes.',
    bullets: [
      'Supercharge efficiency — AI shortlisting, screening, interview and scoring in one place.',
      'Only interview-ready candidates — Filter out proxies and inflated resumes, with interviews upfront.',
      'Insights from every stage — Analytics turn interactions into actionable hiring intelligence.',
    ],
  },
  {
    key: 'ta-leaders',
    title: 'Talent Acquisition Leaders',
    summary:
      'Lead with data. Build with skills. Get full visibility, speed, and fairness across your hiring funnel.',
    bullets: [
      'Real-time analytics — Dashboards track drop-offs, funnel health, and ROI.',
      'Skill-first strategy — Bias-free, data-backed decisions build long-term trust.',
      'Brand advantage — Deliver fair and transparent hiring that strengthens reputation.',
    ],
  },
  {
    key: 'candidates',
    title: 'Candidates',
    summary:
      'A fair shot for every candidate. Always. No bias. No shortcuts. Just skills, evaluated with integrity.',
    bullets: [
      'Transparent process — Clear scoring and real-time feedback at every stage.',
      'Fair evaluations — AI ensures equal opportunity for all candidates.',
      'Confidence in integrity — Proctoring keeps the process secure and trustworthy.',
    ],
  },
];


export default function HorizontalStory() {
  const wrap = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<(HTMLButtonElement | null)[]>([])
  const bgSlow = useRef<HTMLDivElement>(null)
  const bgMid  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapEl = wrap.current!, track = trackRef.current!, progress = progressRef.current!
    const panels = gsap.utils.toArray<HTMLElement>(".hpanel")

    const st = gsap.to(track, {
      x: () => -(track.scrollWidth - wrapEl.clientWidth),
      ease: "none",
      scrollTrigger: {
        trigger: wrapEl,
        start: "top top",
        end: () => `+=${track.scrollWidth - wrapEl.clientWidth}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        snap: 1 / (panels.length - 1),
        onUpdate(self) {
          gsap.set(progress, { scaleX: self.progress })
          const s = Math.round(self.progress * (panels.length - 1))
          dotsRef.current.forEach((d, i) => d?.classList.toggle("active", i === s))
        },
      },
    })

    // 3-layer effect: two parallax backgrounds + foreground track
    const total = () => track.scrollWidth - wrapEl.clientWidth
    gsap.to(bgSlow.current, { x: () => -total() * 0.25, ease: "none", scrollTrigger: { trigger: wrapEl, start: "top top", end: () => `+=${total()}`, scrub: true } })
    gsap.to(bgMid.current,  { x: () => -total() * 0.55, ease: "none", scrollTrigger: { trigger: wrapEl, start: "top top", end: () => `+=${total()}`, scrub: true } })

    panels.forEach((p) => {
      gsap.timeline({
        scrollTrigger: { trigger: p, containerAnimation: st, start: "left center", end: "right center", toggleActions: "play none none reverse" },
      })
      .from(p.querySelector(".h-title"), { y: 30, opacity: 0, duration: 0.5, ease: "power2.out" })
      .from(p.querySelector(".h-sub"),   { y: 18, opacity: 0, duration: 0.4 }, "-=0.2")
      .from(p.querySelector(".h-img"),   { scale: 0.95, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
    })

    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener("load", onLoad)
    const ro = new ResizeObserver(() => ScrollTrigger.refresh())
    ro.observe(wrapEl)
    return () => { window.removeEventListener("load", onLoad); ro.disconnect(); ScrollTrigger.getAll().forEach(t=>t.kill()) }
  }, [])

  return (
    <section className="relative px-3 sm:px-6 py-6">
      {/* curved container */}
      <div ref={wrap} className="relative h-[88vh] sm:h-[92vh] overflow-hidden rounded-[44px] md:rounded-[56px] bg-[#f7f7fb] ring-1 ring-black/5">

        {/* layer A: soft radial wash (slow parallax) */}
        <div ref={bgSlow} aria-hidden
          className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(140%_120%_at_0%_0%,#ffffffb3_0%,#f4f5fa_45%,#eef0f8_100%)]" />

        {/* layer B: pill glows (mid parallax) */}
        <div ref={bgMid} aria-hidden className="absolute -z-10 inset-0">
          <div className="absolute -right-24 top-12 w-[55vw] h-[55vw] rounded-[48px] bg-[#c9d1ff] opacity-30 blur-3xl" />
          <div className="absolute left-[-18vw] bottom-10 w-[42vw] h-[42vw] rounded-[48px] bg-[#ffd7d1] opacity-25 blur-3xl" />
        </div>

        {/* layer C: foreground horizontal track */}
        <div ref={trackRef} className="absolute left-0 top-0 h-full flex">
          {SLIDES.map((s, i) => (
            <section
              key={i}
              className="hpanel relative w-screen flex-none h-full grid grid-cols-1 md:grid-cols-2 items-center gap-6 px-8 md:px-16"
            >
              <div className="max-w-xl">
                <h2 className="h-title text-4xl md:text-6xl font-extrabold tracking-tight">{s.title}</h2>
                <p className="h-sub mt-4 text-lg text-[#3d3d55]">{s.sub}</p>
                {/* small typing line */}
                <div className="mt-4 text-sm text-[#5a5a77]">
                  <Typewriter words={["Design →", "Translate →", "Grow →"]} />
                </div>
              </div>
              <div className="h-img relative grid place-items-center">
                <div className="absolute -inset-6 rounded-[36px] bg-white/40 blur-2xl" aria-hidden />
                <img
                  src={s.img}
                  alt=""
                  className="relative rounded-3xl w-[86%] md:w-[520px] aspect-[4/3] object-cover shadow-[0_20px_80px_rgba(0,0,0,.15)]"
                  draggable={false}
                />
              </div>
            </section>
          ))}
        </div>

        {/* progress + dots */}
        <div className="pointer-events-none absolute left-0 right-0 bottom-4 md:bottom-7 px-6 md:px-12">
          <div className="relative mx-auto w-full max-w-5xl">
            <div className="h-1 bg-[#d9d9e6] rounded-full overflow-hidden">
              <div ref={progressRef} className="h-full origin-left scale-x-0 bg-[#6b7bff]" />
            </div>
            <div className="absolute inset-x-0 -top-2 flex justify-between">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  ref={(el) => { dotsRef.current[i] = el }}
                  className="pointer-events-auto grid place-items-center h-6 w-6 -translate-y-1 rounded-full bg-white ring-2 ring-[#6b7bff]/40 shadow transition-transform"
                  onClick={() => {
                    const total = (trackRef.current!.scrollWidth - wrap.current!.clientWidth)
                    const per = i / (SLIDES.length - 1)
                    const target = wrap.current!.offsetTop + total * per
                    window.scrollTo({ top: target, behavior: "smooth" })
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <span className="dot h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .active .dot { transform: scale(1.15); }
      `}</style>
    </section>
  )
}

/* ---------- tiny typewriter (cycles 3 words) ---------- */
function Typewriter({ words, speed = 65, pause = 700 }: { words: string[]; speed?: number; pause?: number }) {
  const [i, setI] = useState(0)
  const [txt, setTxt] = useState("")
  const [del, setDel] = useState(false)

  useEffect(() => {
    let t: any
    const w = words[i]
    if (!del) {
      if (txt.length < w.length) t = setTimeout(() => setTxt(w.slice(0, txt.length + 1)), speed)
      else t = setTimeout(() => setDel(true), pause)
    } else {
      if (txt.length) t = setTimeout(() => setTxt(w.slice(0, txt.length - 1)), speed / 1.6)
      else { setDel(false); setI((i + 1) % words.length) }
    }
    return () => clearTimeout(t)
  }, [txt, del, i, words, speed, pause])

  return (
    <span className="inline-block border-r border-[#6b7bff] pr-1">
      {txt || "\u00A0"}
    </span>
  )
}
