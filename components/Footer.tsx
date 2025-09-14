 // components/GlassFooter.tsx
"use client"

export default function GlassFooter() {
  return (
    <footer className="relative mt-16">
      {/* soft glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-10 mx-auto h-56 w-[92%] max-w-6xl blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(60% 60% at 30% 40%, #FFFFEB 0%, rgba(255,255,235,0) 70%), radial-gradient(60% 60% at 70% 60%, #cfe0ff 0%, rgba(207,224,255,0) 70%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl bg-white/20 backdrop-blur-md ring-1 ring-white/30 shadow-[0_8px_40px_rgba(11,42,92,.08)] p-6 md:p-8">
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr_1.4fr] items-start">
            {/* brand + address */}
            <div>
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-xl bg-[#2450a6]"></span>
                <span className="text-sm font-extrabold tracking-widest text-[#0b2a5c]">
                  HIRESKILL.AI
                </span>
              </div>
              <p className="mt-4 text-sm text-[#0b2a5c]">
                110/2, First Floor, near Kamla Nehru College,<br />
                Sakkardara, Nagpur, Maharashtra 440024
              </p>
              <p className="mt-2 text-sm text-[#2450a6]">bootcoding@gmail.com • hr@bootcoding.in</p>

              <div className="mt-4 flex gap-3">
                <IconX />
                <IconInsta />
                <IconLinkedIn />
              </div>
            </div>

            {/* links 1 */}
            <nav className="space-y-2">
              <h4 className="text-xs font-bold tracking-wider text-[#0b2a5c]">ABOUT US</h4>
              <FooterLink>About</FooterLink>
              <FooterLink>Careers</FooterLink>
              <FooterLink>Contact</FooterLink>
            </nav>

            {/* links 2 */}
            <nav className="space-y-2">
              <h4 className="text-xs font-bold tracking-wider text-[#0b2a5c]">PRODUCT</h4>
              <FooterLink>How it works</FooterLink>
              <FooterLink>Security</FooterLink>
              <FooterLink>Pricing</FooterLink>
            </nav>

            {/* newsletter */}
            <div>
              <h4 className="text-xs font-bold tracking-wider text-[#0b2a5c]">
                JOIN OUR LIST
              </h4>
              <p className="mt-2 text-sm text-[#2450a6]">
                Monthly updates on features and case studies.
              </p>
              <form className="mt-3 flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Enter your email…"
                  className="flex-1 rounded-xl bg-white/40 placeholder:text-[#5b7ec4] text-[#0b2a5c] px-3 py-2 outline-none ring-1 ring-white/40 focus:ring-[#2450a6]"
                />
                <button
                  type="submit"
                  className="h-10 w-10 grid place-items-center rounded-full bg-[#2450a6] text-white hover:brightness-110"
                  aria-label="Subscribe"
                >
                  <ArrowRightMini />
                </button>
              </form>
            </div>
          </div>

          <div className="mt-6 border-t border-white/30 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-[#2450a6]">© {new Date().getFullYear()} Bootcoding Pvt. Ltd. All rights reserved.</p>
            <div className="flex gap-4 text-xs text-[#2450a6]">
              <a href="#" className="hover:text-[#0b2a5c]">Terms</a>
              <a href="#" className="hover:text-[#0b2a5c]">Privacy</a>
              <a href="#" className="hover:text-[#0b2a5c]">Security</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* helpers */
function FooterLink({ children }: { children: React.ReactNode }) {
  return (
    <a href="#" className="block text-sm text-[#2450a6] hover:text-[#0b2a5c]">
      {children}
    </a>
  )
}

function ArrowRightMini() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h12M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function IconX() {
  return (
    <a aria-label="X" href="#" className="grid h-8 w-8 place-items-center rounded-lg bg-white/25 ring-1 ring-white/40 text-[#0b2a5c] hover:bg-white/35">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/></svg>
    </a>
  )
}
function IconInsta() {
  return (
    <a aria-label="Instagram" href="#" className="grid h-8 w-8 place-items-center rounded-lg bg-white/25 ring-1 ring-white/40 text-[#0b2a5c] hover:bg-white/35">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>
    </a>
  )
}
function IconLinkedIn() {
  return (
    <a aria-label="LinkedIn" href="#" className="grid h-8 w-8 place-items-center rounded-lg bg-white/25 ring-1 ring-white/40 text-[#0b2a5c] hover:bg-white/35">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M7.5 10.5v6M7.5 7.5v.1M11.5 16.5v-3.6a2.4 2.4 0 0 1 4.8 0v3.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
    </a>
  )
}
