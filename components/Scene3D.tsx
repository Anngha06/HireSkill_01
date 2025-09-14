// app/components/NetworkBG.tsx
"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"

function NetworkPlane() {
  const mat = useRef<THREE.ShaderMaterial>(null)

  useFrame((_, dt) => {
    if (mat.current) mat.current.uniforms.uTime.value += dt
  })

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uColorA: { value: new THREE.Color("#1972e5ff") }, // light blue 100
          uColorB: { value: new THREE.Color("#BFDBFE") }, // light blue 200
          uAlpha: { value: 0.55 }, // lighter overlay
        },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          precision highp float;
          varying vec2 vUv;
          uniform float uTime;
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          uniform float uAlpha;

          float hash(float n){ return fract(sin(n)*43758.5453123); }
          float noise(vec2 x){
            vec2 p = floor(x), f = fract(x);
            f = f*f*(3.0-2.0*f);
            float n = p.x + p.y*57.0;
            float a = hash(n+0.0);
            float b = hash(n+1.0);
            float c = hash(n+57.0);
            float d = hash(n+58.0);
            return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
          }

          float lineGlow(float y, float y0, float w, float blur){
            float d = abs(y - y0);
            return smoothstep(w+blur, w, d);
          }

          void main(){
            vec2 uv = vUv;

            // bright, subtle background (near white)
            vec3 bgTop = vec3(0.965, 0.976, 1.0);
            vec3 bgBot = vec3(1.0, 1.0, 1.0);
            vec3 col = mix(bgTop, bgBot, uv.y);

            // gentle flow
            float t = uTime * 0.35;
            float warp = (noise(uv*3.0 + vec2(0.0,t)) - 0.5) * 0.04;
            uv.y += warp;

            // thin pastel threads
            for(int i=0;i<6;i++){
              float fi = float(i);
              float phase = fi*0.55 + t*0.7;
              float amp = 0.06 + 0.015*fi;
              float freq = 5.5 + fi;
              float yCurve = 0.5 + amp*sin(uv.x*freq + phase) + 0.02*noise(vec2(uv.x*5.0, fi*1.7+t));
              float glow = lineGlow(uv.y, yCurve, 0.006, 0.03);
              vec3 c = mix(uColorA, uColorB, fract(fi*0.21 + uv.x*0.4));
              col += glow * c * 0.55; // lighter contribution
            }

            // soft sparkles
            float nodes = 0.0;
            for(int j=0;j<18;j++){
              float fj = float(j);
              vec2 p = vec2(fract(sin(fj*12.3)*437.0), fract(sin(fj*91.7)*871.0));
              p.x = fract(p.x + t*0.025 + fj*0.007);
              float d = distance(uv, p);
              nodes += smoothstep(0.03, 0.0, d) * 0.35;
            }
            col += nodes * mix(uColorA, uColorB, 0.5) * 0.5;

            gl_FragColor = vec4(col, uAlpha);
          }
        `,
      }),
    []
  )

  return (
    <mesh>
      <planeGeometry args={[2.5, 2.5, 1, 1]} />
      <primitive ref={mat} object={material} attach="material" />
    </mesh>
  )
}

export default function NetworkBG() {
  const [mounted, setMounted] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setMounted(true)
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  if (!mounted || reduced) return null

  const dpr = Math.min(window.devicePixelRatio || 1, 1.75)

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 bg-white">
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={dpr}
        orthographic
        camera={{ position: [0, 0, 1], zoom: 500 }}
      >
        <ambientLight intensity={0.5} />
        <NetworkPlane />
      </Canvas>
    </div>
  )
}
