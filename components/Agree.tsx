// components/Agree.tsx
"use client"
import { useState } from "react"

export default function Agree() {
  const [agreed, setAgreed] = useState(false)
  return (
    <label htmlFor="agree" className="flex items-start gap-3 cursor-pointer select-none">
      <input
        id="agree"
        name="agree"
        type="checkbox"
        required
        checked={agreed}
        onChange={(e) => setAgreed(e.target.checked)}
        className="h-5 w-5 accent-[#0A7CFF]"
      />
      <span>I agree to be contacted about relevant roles and events.</span>
    </label>
  )
}
