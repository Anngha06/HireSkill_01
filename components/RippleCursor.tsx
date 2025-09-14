 // app/components/RippleCursor.tsx
"use client"

import { useEffect, useRef } from "react"

export default function RippleCursor() {
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return

    let last = 0
    const mk = (x: number, y: number, size = 34) => {
      const s = document.createElement("span")
      s.className = "ripple"
      s.style.setProperty("--x", `${x}px`)
      s.style.setProperty("--y", `${y}px`)
      s.style.setProperty("--size", `${size}px`)
      layer.appendChild(s)
      s.addEventListener("animationend", () => s.remove(), { once: true })
    }

    const onMove = (e: PointerEvent) => {
      const now = performance.now()
      if (now - last < 90) return
      last = now
      mk(e.clientX, e.clientY, 26)
    }
    const onDown = (e: PointerEvent) => mk(e.clientX, e.clientY, 42)

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onDown, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onDown)
    }
  }, [])

  return <div id="ripple-layer" ref={layerRef} />
}
