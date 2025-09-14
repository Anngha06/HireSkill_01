// app/components/Header.tsx
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

type Tab = { label: string; href: string; external?: boolean }

const TABS: Tab[] = [
  { label: "Home",    href: "/#home" },
  { label: "Explore", href: "https://bootcoding.hireskilldev.com/", external: true },
  { label: "About",   href: "/#founder" },      // Founder's Message section
  { label: "Contact", href: "/#contact" },      // Contact + FAQs section
  { label: "Cases",   href: "/#cases" },        // HorizontalStory section
]

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>("Home")

  // Observe in-page sections (home only)
  useEffect(() => {
    if (pathname !== "/") return
    const ids = ["home", "founder", "contact", "cases"]
    const els = ids.map((id) => document.getElementById(id)).filter((n): n is HTMLElement => !!n)

    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter(e => e.isIntersecting).sort((a,b)=> b.intersectionRatio - a.intersectionRatio)[0]
        if (!vis) return
        const map: Record<string, string> = {
          home: "Home",
          founder: "About",
          contact: "Contact",
          cases: "Cases",
        }
        setActive(map[vis.target.id])
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0.1, 0.25, 0.5, 0.75] }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  // Smooth-scroll handler for hash links (home only)
  const onNavClick = (href: string, external?: boolean) => (e: React.MouseEvent) => {
    if (external) return // allow normal nav to external site
    if (!href.startsWith("/#")) return
    if (pathname !== "/") return // let Next route to "/#id"
    e.preventDefault()
    const id = href.split("#")[1]
    const el = document.getElementById(id)
    if (el) {
      window.history.pushState(null, "", href)
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      setOpen(false)
    }
  }

  // Smooth-scroll on hash load (home)
  useEffect(() => {
    if (pathname !== "/") return
    const id = window.location.hash.slice(1)
    if (!id) return
    const el = document.getElementById(id)
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 0)
  }, [pathname])

  const tabClass = (on: boolean) =>
    "inline-flex items-center rounded-2xl px-3.5 py-2 text-sm font-medium transition-colors " +
    (on
      ? "bg-[#2563ff]/12 text-[#2563ff] ring-1 ring-[#2563ff]/25"
      : "text-[#111] hover:bg-black/5")

  return (
    <header className="sticky top-3 z-50 px-3">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-full bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/55 ring-1 ring-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
          <div className="h-14 md:h-16 flex items-center gap-3 px-3 md:px-4">
            {/* Wordmark */}
            <Link href="/" className="shrink-0 flex items-center gap-2 select-none" onClick={() => setOpen(false)}>
              <span className="text-[26px] md:text-[30px] leading-none font-medium text-[#2563ff]">HireSkill</span>
              <span className="ml-1 grid h-6 w-6 place-items-center rounded-lg bg-[#2563ff] text-white text-[11px] font-bold">AI</span>
            </Link>

            {/* Desktop nav */}
            <nav className="mx-auto hidden md:flex items-center gap-2">
              {TABS.map((t) =>
                t.external ? (
                  <a
                    key={t.label}
                    href={t.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={tabClass(active === t.label)}
                  >
                    {t.label}
                  </a>
                ) : (
                  <Link
                    key={t.label}
                    href={t.href}
                    onClick={onNavClick(t.href, t.external)}
                    className={tabClass(active === t.label)}
                    aria-current={active === t.label ? "page" : undefined}
                  >
                    {t.label}
                  </Link>
                )
              )}
            </nav>

            {/* Mobile toggle */}
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen(v => !v)}
              className="md:hidden ml-auto inline-grid place-items-center h-10 w-10 rounded-full ring-1 ring-black/10 bg-white/70"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Mobile drawer */}
          {open && (
            <div className="md:hidden px-3 pb-3">
              <div className="grid gap-2">
                {TABS.map((t) =>
                  t.external ? (
                    <a
                      key={t.label}
                      href={t.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={"rounded-xl px-3 py-2 text-sm font-medium " + (active === t.label ? "bg-[#2563ff]/12 text-[#2563ff]" : "text-[#111] hover:bg-black/5")}
                    >
                      {t.label}
                    </a>
                  ) : (
                    <Link
                      key={t.label}
                      href={t.href}
                      onClick={(e) => { onNavClick(t.href, t.external)(e); setOpen(false) }}
                      className={"rounded-xl px-3 py-2 text-sm font-medium " + (active === t.label ? "bg-[#2563ff]/12 text-[#2563ff]" : "text-[#111] hover:bg-black/5")}
                      aria-current={active === t.label ? "page" : undefined}
                    >
                      {t.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
