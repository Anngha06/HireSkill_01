 // app/components/ContactFaqSection.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useForm, ValidationError } from "@formspree/react"
gsap.registerPlugin(ScrollTrigger)

type Audience = "candidates" | "recruiters"
type FAQ = { q: string; a: string }

const FORM_ID = "xgvldqbj" // ← your Formspree form ID

const FAQS: FAQ[] = [
  { q: "Do you provide demos?", a: "Yes. Share your email and use case. We schedule a 20-minute walkthrough and can enable a sandbox." },
  { q: "How fast is onboarding?", a: "Pilot access is typically granted within 1–3 business days after scoping." },
  { q: "Can you integrate with our stack?", a: "APIs and webhooks available. Common integrations include CRMs, ATS, ticketing, and analytics." },
  { q: "How is data secured?", a: "Encryption in transit/at rest, scoped access, audit trails, and least-privilege operations." },
  { q: "Do you sign SLAs and NDAs?", a: "Yes. NDAs during evaluation and SLAs on paid plans." },
  { q: "What support is included?", a: "Email support for pilots; priority support and a success manager on enterprise plans." },
  { q: "Which regions do you serve?", a: "Global. Data residency options are available for select regions." },
]

const JOB_ROLES = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full-Stack Developer",
  "Data Scientist",
  "ML Engineer",
  "Data Analyst",
  "DevOps Engineer",
  "QA / Test Engineer",
  "UI/UX Designer",
  "Product Manager",
  "Marketing Specialist",
  "Sales Associate",
  "Content Writer",
  "Customer Success",
] as const

export default function ContactFaqSection() {
  const root = useRef<HTMLDivElement>(null)
  const leftCard = useRef<HTMLDivElement>(null)
  const rightCard = useRef<HTMLDivElement>(null)
  const [audience, setAudience] = useState<Audience>("candidates")
  const [open, setOpen] = useState<number | null>(0)

  useEffect(() => {
    const el = root.current
    if (!el) return

    gsap.from(el.querySelectorAll(".c-anim"), {
      opacity: 0,
      y: 26,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: "top 80%" },
    })

    gsap.to(el.querySelectorAll(".glow"), {
      yPercent: (i) => (i % 2 ? -15 : 15),
      ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
    })

    const host = el.querySelector(".tilt-area") as HTMLElement
    const cards = [leftCard.current, rightCard.current].filter(Boolean) as HTMLElement[]
    if (!host || !cards.length) return

    const onMove = (e: MouseEvent) => {
      const r = host.getBoundingClientRect()
      const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
      const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
      cards.forEach((c, i) => {
        const depth = i ? 0.9 : 1
        gsap.to(c, {
          rotateY: nx * 8 * depth,
          rotateX: -ny * 8 * depth,
          x: nx * 6 * depth,
          y: ny * 6 * depth,
          transformPerspective: 1100,
          transformOrigin: "center",
          duration: 0.4,
          ease: "power2.out",
        })
      })
    }
    const onLeave = () => gsap.to(cards, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 0.6, ease: "power2.out" })

    host.addEventListener("mousemove", onMove)
    host.addEventListener("mouseleave", onLeave)
    return () => {
      host.removeEventListener("mousemove", onMove)
      host.removeEventListener("mouseleave", onLeave)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section ref={root} className="relative isolate">
      {/* bg glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="glow absolute -top-10 -left-16 h-72 w-72 rounded-[36px] bg-[#cfe0ff] opacity-60 blur-3xl" />
        <div className="glow absolute -bottom-12 -right-10 h-80 w-80 rounded-[36px] bg-[#ffe3d9] opacity-60 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-6 py-24 md:py-28">
        <div className="mb-10 md:mb-14 text-center c-anim">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Contact us</h2>
          <p className="mt-3 text-base md:text-lg text-[#3d3d55]">Tell us your use case. We reply within one business day.</p>

          <div className="mt-6 inline-flex rounded-2xl p-1 bg-white ring-1 ring-black/10 shadow-sm">
            <ToggleBtn active={audience === "candidates"} onClick={() => setAudience("candidates")} label="Candidates" />
            <ToggleBtn active={audience === "recruiters"} onClick={() => setAudience("recruiters")} label="Recruiters" />
          </div>
        </div>

        <div className="tilt-area [perspective:1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* form card */}
            <div
              ref={leftCard}
              className="c-anim relative rounded-3xl bg-white ring-1 ring-black/10 shadow-[0_30px_120px_rgba(0,0,0,.12)]"
              style={{ transformStyle: "preserve-3d" as any }}
            >
              <div className="pointer-events-none absolute -inset-3 rounded-[34px] bg-white/40 blur-2xl" aria-hidden />
              <div className="relative p-6 md:p-8">
                {audience === "candidates" ? <CandidateForm /> : <RecruiterForm />}
              </div>
            </div>

            {/* FAQs */}
            <div
              ref={rightCard}
              className="c-anim relative rounded-3xl bg-white ring-1 ring-black/10 shadow-[0_30px_120px_rgba(0,0,0,.12)]"
              style={{ transformStyle: "preserve-3d" as any }}
            >
              <div className="pointer-events-none absolute -inset-3 rounded-[34px] bg-white/40 blur-2xl" aria-hidden />
              <div className="relative p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-semibold">FAQs</h3>
                <div className="mt-4 divide-y divide-[#ececf3]">
                  {FAQS.map((f, i) => (
                    <FAQItem
                      key={f.q}
                      i={i}
                      q={f.q}
                      a={f.a}
                      open={open === i}
                      onToggle={() => setOpen(open === i ? null : i)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(.tilt-area > div > div:hover) { box-shadow: 0 40px 140px rgba(0,0,0,0.16); }
      `}</style>
    </section>
  )
}

/* ---------- Formspree-powered forms ---------- */
function CandidateForm() {
  const [state, handleSubmit] = useForm(FORM_ID)

  if (state.succeeded) return <SuccessNote />

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="hidden" name="_subject" value="Candidate contact — HireSkill.ai" />
      <input type="text" name="_gotcha" className="hidden" />

      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Full name *" name="name" placeholder="Your name" required />
        <Field label="Phone *" name="phone" type="tel" placeholder="+91 98765 43210" required />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="College *" name="college" placeholder="Your college" required />
        <Field label="Email *" name="email" type="email" placeholder="you@college.edu" required />
      </div>
      <SelectField label="Job role interested *" name="job_role" options={[...JOB_ROLES]} required />
      <Field as="textarea" label="Message" name="message" placeholder="Portfolio link, experience, notice period…" />

      <ValidationError prefix="Email" field="email" errors={state.errors} />

      <div className="flex items-start gap-3 text-sm text-[#3d3d55] pointer-events-auto">
  <input
    id="consent"
    name="consent"
    type="checkbox"
    required
    className="mt-1 h-5 w-5 accent-[#0b0b14] cursor-pointer"
  />
  <label htmlFor="consent" className="cursor-pointer select-none">
    I agree to be contacted about relevant roles and events.
  </label>
</div>

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0b0b14] text-white px-6 py-3 text-sm font-semibold hover:opacity-90"
      >
        {state.submitting ? "Sending…" : "Submit application"} <ArrowRight />
      </button>
      <p className="text-xs text-[#6b6b85]">By submitting, you agree to our privacy policy.</p>
    </form>
  )
}

function RecruiterForm() {
  const [state, handleSubmit] = useForm(FORM_ID)

  if (state.succeeded) return <SuccessNote />

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="hidden" name="_subject" value="Recruiter contact — HireSkill.ai" />
      <input type="text" name="_gotcha" className="hidden" />

      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Full name *" name="name" placeholder="Your name" required />
        <Field label="Work email *" name="email" type="email" placeholder="you@company.com" required />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Company *" name="company" placeholder="Company name" required />
        <Field label="Phone" name="phone" type="tel" placeholder="Optional" />
      </div>
      <SelectField
        label="Primary interest"
        name="interest"
        options={[
          "Pilot / Demo",
          "High-volume hiring",
          "Skill assessments",
          "Interview automation",
          "Integrations / APIs",
          "Security / Compliance",
        ]}
      />
      <Field as="textarea" label="Message *" name="message" placeholder="Share goals, timeline, target roles, integrations…" required />

      <ValidationError prefix="Email" field="email" errors={state.errors} />

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0b0b14] text-white px-6 py-3 text-sm font-semibold hover:opacity-90"
      >
        {state.submitting ? "Sending…" : "Send message"} <ArrowRight />
      </button>
      <p className="text-xs text-[#6b6b85]">We’ll respond in one business day.</p>
    </form>
  )
}

/* ---------- Reusable UI ---------- */
function ToggleBtn({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "px-4 py-2 text-sm font-semibold rounded-xl transition " +
        (active ? "bg-[#0b0b14] text-white" : "text-[#0b0b14] hover:bg-black/5")
      }
      aria-pressed={active}
    >
      {label}
    </button>
  )
}

function Field({
  label,
  name,
  placeholder,
  as,
  type = "text",
  required = false,
}: {
  label: string
  name: string
  placeholder?: string
  as?: "input" | "textarea"
  type?: string
  required?: boolean
}) {
  const base =
    "w-full bg-transparent outline-none border-0 border-b border-[#d9d9e6] focus:border-[#0b0b14] transition placeholder:text-[#9aa0b6] text-sm md:text-base"
  if (as === "textarea") {
    return (
      <label className="block">
        <span className="block text-xs tracking-wide text-[#5a5a77] mb-2">{label}</span>
        <textarea name={name} placeholder={placeholder} className={`${base} min-h-[140px] resize-y`} required={required} />
      </label>
    )
  }
  return (
    <label className="block">
      <span className="block text-xs tracking-wide text-[#5a5a77] mb-2">{label}</span>
      <input name={name} type={type} placeholder={placeholder} className={base} required={required} />
    </label>
  )
}

function SelectField({
  label,
  name,
  options,
  required = false,
}: {
  label: string
  name: string
  options: string[]
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="block text-xs tracking-wide text-[#5a5a77] mb-2">{label}</span>
      <select
        name={name}
        className="w-full bg-transparent outline-none border-0 border-b border-[#d9d9e6] focus:border-[#0b0b14] transition text-sm md:text-base"
        required={required}
        defaultValue=""
      >
        <option value="" disabled>
          Choose one
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}

function FAQItem({
  i,
  q,
  a,
  open,
  onToggle,
}: {
  i: number
  q: string
  a: string
  open: boolean
  onToggle: () => void
}) {
  return (
    <div>
      <button
        className="w-full py-4 text-left flex items-center gap-3"
        aria-expanded={open}
        aria-controls={`faq-panel-${i}`}
        id={`faq-btn-${i}`}
        onClick={onToggle}
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#0b0b14] text-white text-xs font-bold">
          {i + 1}
        </span>
        <span className="flex-1 font-medium">{q}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={`text-[#0b0b14] transition-transform ${open ? "rotate-180" : ""}`} aria-hidden>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        id={`faq-panel-${i}`}
        role="region"
        aria-labelledby={`faq-btn-${i}`}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className="pb-4 text-sm md:text-base text-[#3d3d55]">{a}</p>
        </div>
      </div>
    </div>
  )
}

function SuccessNote() {
  return (
    <div className="text-center py-16">
      <h3 className="text-2xl font-semibold">Thanks — we got your message.</h3>
      <p className="mt-2 text-[#3d3d55]">We’ll reply within one business day.</p>
    </div>
  )
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h12M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

