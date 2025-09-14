 // app/components/BackgroundVideo.tsx
"use client"

import { useEffect, useRef } from "react"

export default function BackgroundVideo({
  src = "/bgg.mp4",
  poster,
}: { src?: string; poster?: string }) {
  const vRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = vRef.current
    if (!v) return
    const play = () => v.play().catch(() => {})
    play()
    const onVis = () => (document.visibilityState === "visible" ? play() : v.pause())
    document.addEventListener("visibilitychange", onVis)
    return () => document.removeEventListener("visibilitychange", onVis)
  }, [])

  return (
    <div className="bg-video" aria-hidden>
      <video ref={vRef} src={src} poster={poster} muted loop playsInline autoPlay />
    </div>
  )
}
