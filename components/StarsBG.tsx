 // app/components/StarsBG.tsx
"use client"

import { Canvas } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import { Suspense } from "react"

export default function StarsBG() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 1.75) : 1}
        camera={{ position: [0, 0, 6], fov: 55 }}
      >
        <ambientLight intensity={0.4} />
        <Suspense fallback={null}>
          {/* Floating star field */}
          <Stars
            radius={90}     // star field size
            depth={40}      // z-depth
            count={2400}    // number of stars
            factor={3}      // star size factor
            saturation={0}  // white stars
            fade            // fade at edges
            speed={0.6}     // float/rotation speed
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
