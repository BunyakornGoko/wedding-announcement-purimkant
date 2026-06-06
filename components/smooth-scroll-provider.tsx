'use client'

import Lenis from 'lenis'
import { createContext, useContext, useEffect, useRef } from 'react'

const LenisContext = createContext<{ stop: () => void; start: () => void } | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    })
    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <LenisContext.Provider value={{
      stop:  () => lenisRef.current?.stop(),
      start: () => lenisRef.current?.start(),
    }}>
      {children}
    </LenisContext.Provider>
  )
}
