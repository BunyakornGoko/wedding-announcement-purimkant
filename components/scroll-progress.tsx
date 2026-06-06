"use client"

import { useEffect, useRef } from "react"

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      if (!barRef.current) return
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const pct = scrollable > 0 ? Math.min((window.scrollY / scrollable) * 100, 100) : 0
      barRef.current.style.width = `${pct}%`
    }
    window.addEventListener("scroll", update, { passive: true })
    update()
    return () => window.removeEventListener("scroll", update)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-primary/50 via-primary to-primary/50"
        style={{ width: "0%" }}
      />
    </div>
  )
}
