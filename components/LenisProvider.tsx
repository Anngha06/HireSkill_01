"use client"
import { ReactNode, useEffect } from "react"
import Lenis from "@studio-freight/lenis"

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 0.9, smoothWheel: true })
    const raf = (t: number) => { lenis.raf(t); requestAnimationFrame(raf) }
    const id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
  return <>{children}</>
}
