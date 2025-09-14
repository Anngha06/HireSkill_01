 // app/components/FounderCard.tsx
"use client"

import Link from "next/link"
import Image from "next/image"

export default function FounderCard() {
  return (
    <section className="px-4">
      <div className="relative mx-auto max-w-5xl rounded-[28px] bg-gradient-to-br from-[#E9F2FF] via-white to-[#F5F9FF] ring-1 ring-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden">
        {/* badges */}
        <div className="absolute left-4 top-4 flex gap-3">
          <span className="inline-flex items-center rounded-full bg-black/20 text-white text-xs font-medium px-3 py-1">
            Founder’s Message
          </span>
          <span className="inline-flex items-center rounded-full bg-black/20 text-white text-xs font-medium px-3 py-1">
            Since 2024
          </span>
        </div>

        {/* body */}
        <div className="grid gap-6 md:grid-cols-[1fr,320px] p-6 md:p-10">
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-slate-900">Laxman Hedaoo</h3>
              <p className="text-slate-600">Co-Founder &amp; CEO, Bootcoding Pvt. Ltd.</p>
            </div>

            <p className="text-slate-700 leading-relaxed">
              With over 15 years of engineering leadership, he has built and scaled enterprise-grade SaaS platforms
              that handle 77M+ API calls per day while reducing infrastructure costs by 30%. His expertise spans
              GenAI, LLMs, RAG, and NLP, backed by proven experience at TomTom, Nuance (Microsoft),
              Persistent Systems, and Synechron Tech.
            </p>

            <blockquote className="text-slate-900/90 font-medium">
              “Hiring decisions have the power to shape business outcomes, fuel growth, and deliver long-term value.
              At HireSkill.ai, our mission is to ensure every hire becomes a win for both companies and candidates.”
            </blockquote>

            <div className="flex items-center gap-3 pt-2">
              <Link
                href="https://www.linkedin.com/in/laxman-hedaoo-b880a01b7/?originalSubdomain=in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex items-center gap-2 rounded-full bg-white/80 ring-1 ring-black/10 px-3 py-2 hover:bg-white transition"
              >
                <LinkedInIcon className="h-4 w-4" />
                <span className="text-sm font-medium text-slate-800">LinkedIn</span>
              </Link>
              <Link
                href="https://www.instagram.com/lhedaoo/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center gap-2 rounded-full bg-white/80 ring-1 ring-black/10 px-3 py-2 hover:bg-white transition"
              >
                <InstagramIcon className="h-4 w-4" />
                <span className="text-sm font-medium text-slate-800">Instagram</span>
              </Link>
            </div>

            <div className="pt-2">
              <Link
                href="https://www.bootcodinglab.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-white text-slate-900 font-semibold h-12 px-5 ring-1 ring-black/10 hover:shadow transition"
              >
                Visit Bootcoding
                <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M7 12h10m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </Link>
            </div>
          </div>

          {/* founder image */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl ring-1 ring-black/10 bg-white/60">
            <Image
              src="/founder.png"      // place founder.png in /public
              alt="Laxman Hedaoo portrait"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* icons */
function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.65 4.78 6.1V21h-4v-4.9c0-1.17-.02-2.67-1.63-2.67-1.64 0-1.89 1.28-1.89 2.59V21H9z" />
    </svg>
  )
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM18 6.8a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
    </svg>
  )
}
