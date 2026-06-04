"use client"

import { useEffect, useRef, useState } from "react"
import { Heart } from "lucide-react"

export function HeroSection() {
  const [phase, setPhase] = useState(0) // 0=hidden, 1=ornament, 2=subtitle, 3=name1, 4=name2, 5=date
  const flora1 = useRef<HTMLDivElement>(null)
  const flora2 = useRef<HTMLDivElement>(null)
  const flora3 = useRef<HTMLDivElement>(null)
  const flora4 = useRef<HTMLDivElement>(null)
  const rafId = useRef<number>(0)

  // Staggered entrance
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 500),
      setTimeout(() => setPhase(3), 900),
      setTimeout(() => setPhase(4), 1200),
      setTimeout(() => setPhase(5), 1500),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  // Mouse parallax with lerp — no state updates, direct DOM
  useEffect(() => {
    let tx = 0, ty = 0, cx = 0, cy = 0

    const onMouse = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth  - 0.5) * 36
      ty = (e.clientY / window.innerHeight - 0.5) * 24
    }

    const tick = () => {
      cx += (tx - cx) * 0.045
      cy += (ty - cy) * 0.045

      if (flora1.current) flora1.current.style.transform = `translate(${cx * 0.6}px, ${cy * 0.4}px)`
      if (flora2.current) flora2.current.style.transform = `translate(${-cx * 0.45}px, ${cy * 0.3}px)`
      if (flora3.current) flora3.current.style.transform = `translate(${cx * 0.3}px, ${-cy * 0.5}px)`
      if (flora4.current) flora4.current.style.transform = `translate(${-cx * 0.5}px, ${-cy * 0.35}px)`

      rafId.current = requestAnimationFrame(tick)
    }

    window.addEventListener("mousemove", onMouse, { passive: true })
    rafId.current = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("mousemove", onMouse)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-secondary/50 via-secondary/15 to-background">

      {/* ── Botanical corners (parallax-wrapped in outer div, float-animated in inner) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        <div ref={flora1} className="absolute -top-10 -left-10 w-72 h-72 will-change-transform">
          <div className="w-full h-full text-primary/22" style={{ animation: "float 9s ease-in-out infinite" }}>
            <svg viewBox="0 0 200 200" fill="currentColor">
              <path d="M80,190 C80,190 10,128 36,64 C62,0 132,26 106,92 C80,158 80,190 80,190Z" />
              <path d="M112,172 C112,172 162,110 146,55 C130,0 70,32 92,87 C114,142 112,172 112,172Z" opacity="0.6" />
              <path d="M56,146 C56,146 2,95 22,48 C42,1 96,36 76,80 C56,124 56,146 56,146Z" opacity="0.38" />
              <circle cx="84" cy="194" r="4" opacity="0.4" />
              <circle cx="114" cy="176" r="3" opacity="0.35" />
            </svg>
          </div>
        </div>

        <div ref={flora2} className="absolute -top-10 -right-10 w-80 h-80 will-change-transform">
          <div className="w-full h-full text-primary/18" style={{ animation: "float 12s ease-in-out 2s infinite" }}>
            <svg viewBox="0 0 200 200" fill="currentColor">
              <ellipse cx="100" cy="55" rx="22" ry="52" />
              <ellipse cx="52"  cy="78" rx="18" ry="48" transform="rotate(-38 52 78)" />
              <ellipse cx="148" cy="78" rx="18" ry="48" transform="rotate(38 148 78)" />
              <ellipse cx="25"  cy="125" rx="13" ry="32" transform="rotate(-60 25 125)" opacity="0.45" />
              <ellipse cx="175" cy="125" rx="13" ry="32" transform="rotate(60 175 125)" opacity="0.45" />
              <circle cx="100" cy="114" r="5" />
            </svg>
          </div>
        </div>

        <div ref={flora3} className="absolute -bottom-10 -left-10 w-64 h-64 will-change-transform">
          <div className="w-full h-full text-primary/18" style={{ animation: "float-slow 11s ease-in-out 4s infinite" }}>
            <svg viewBox="0 0 200 200" fill="currentColor">
              <path d="M100,10 C100,10 168,78 144,148 C120,218 55,188 78,118 C101,48 100,10 100,10Z" />
              <path d="M72,32 C72,32 15,98 42,160 C69,222 128,186 102,122 C76,58 72,32 72,32Z" opacity="0.52" />
              <circle cx="100" cy="6" r="4" opacity="0.4" />
            </svg>
          </div>
        </div>

        <div ref={flora4} className="absolute -bottom-10 -right-10 w-72 h-72 will-change-transform">
          <div className="w-full h-full text-primary/22" style={{ animation: "float 10s ease-in-out 1s infinite" }}>
            <svg viewBox="0 0 200 200" fill="currentColor">
              <path d="M100,10 Q132,52 100,105 Q68,52 100,10 M100,105 Q132,148 100,195 Q68,148 100,105 M48,58 Q100,82 152,58 Q100,102 48,58 M48,138 Q100,118 152,138 Q100,165 48,138" />
              <circle cx="100" cy="105" r="5" opacity="0.4" />
            </svg>
          </div>
        </div>

        {/* Small scattered petals */}
        <div className="absolute top-[28%] left-[14%] w-10 h-10 text-primary/12" style={{ animation: "float 7s ease-in-out 3s infinite" }}>
          <svg viewBox="0 0 40 40" fill="currentColor">
            <ellipse cx="20" cy="10" rx="6" ry="10" />
            <ellipse cx="30" cy="26" rx="6" ry="10" transform="rotate(60 30 26)" />
            <ellipse cx="10" cy="26" rx="6" ry="10" transform="rotate(-60 10 26)" />
          </svg>
        </div>
        <div className="absolute top-[62%] right-[11%] w-8 h-8 text-primary/10" style={{ animation: "float-slow 8s ease-in-out 6s infinite" }}>
          <svg viewBox="0 0 40 40" fill="currentColor">
            <path d="M20,4 Q26,12 20,22 Q14,12 20,4 M20,22 Q26,30 20,38 Q14,30 20,22" />
          </svg>
        </div>
        <div className="absolute top-[42%] right-[19%] w-7 h-7 text-primary/10" style={{ animation: "float 6.5s ease-in-out 1.5s infinite" }}>
          <svg viewBox="0 0 30 30" fill="currentColor">
            <ellipse cx="15" cy="8" rx="4" ry="8" />
            <ellipse cx="22" cy="18" rx="4" ry="8" transform="rotate(60 22 18)" />
            <ellipse cx="8"  cy="18" rx="4" ry="8" transform="rotate(-60 8 18)" />
          </svg>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full">

        {/* Top ornament */}
        <div
          className="flex items-center justify-center gap-4 mb-8"
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? "translateY(0)" : "translateY(-12px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div
            className="h-px bg-gradient-to-r from-transparent to-primary/50"
            style={{
              width: phase >= 1 ? "64px" : "0px",
              transition: "width 0.8s ease 0.2s",
            }}
          />
          <svg className="w-6 h-6 text-primary/50 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,3 Q14,7 12,12 Q10,7 12,3 M12,12 Q14,16 12,22 Q10,16 12,12 M3,12 Q7,10 12,12 Q7,14 3,12 M12,12 Q17,10 22,12 Q17,14 12,12" />
          </svg>
          <div
            className="h-px bg-gradient-to-l from-transparent to-primary/50"
            style={{
              width: phase >= 1 ? "64px" : "0px",
              transition: "width 0.8s ease 0.2s",
            }}
          />
        </div>

        {/* Invitation subtitle */}
        <div className="overflow-hidden mb-10">
          <p
            className="text-muted-foreground text-xs md:text-sm tracking-[0.35em] uppercase"
            style={{
              transform: phase >= 2 ? "translateY(0)" : "translateY(110%)",
              opacity: phase >= 2 ? 1 : 0,
              transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.7s ease",
            }}
          >
            ขอเรียนเชิญร่วมเป็นเกียรติในงานมงคลสมรส
          </p>
        </div>

        {/* Name 1 */}
        <div className="overflow-hidden pt-6 -mt-6 pb-4 -mb-4">
          <h1
            className="font-serif text-6xl md:text-8xl lg:text-[7.5rem] font-light text-foreground tracking-wider leading-none"
            style={{
              transform: phase >= 3 ? "translateY(0)" : "translateY(110%)",
              opacity: phase >= 3 ? 1 : 0,
              transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease",
            }}
          >
            ปุริมพัฒน์
          </h1>
        </div>

        {/* Heart divider */}
        <div
          className="flex items-center justify-center gap-6 my-7"
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transition: "opacity 0.7s ease 0.3s",
          }}
        >
          <div
            className="h-px bg-gradient-to-r from-transparent to-primary/40"
            style={{
              width: phase >= 3 ? "96px" : "0px",
              transition: "width 0.8s ease 0.5s",
            }}
          />
          {/* Ripple heart */}
          <div className="relative shrink-0">
            <span
              className="absolute inset-0 rounded-full bg-primary/15"
              style={{ animation: phase >= 3 ? "ripple-out 2.2s ease-out 1s infinite" : "none" }}
            />
            <span
              className="absolute inset-0 rounded-full bg-primary/10"
              style={{ animation: phase >= 3 ? "ripple-out 2.2s ease-out 1.6s infinite" : "none" }}
            />
            <Heart className="w-6 h-6 text-primary fill-primary/25 relative z-10" />
          </div>
          <div
            className="h-px bg-gradient-to-l from-transparent to-primary/40"
            style={{
              width: phase >= 3 ? "96px" : "0px",
              transition: "width 0.8s ease 0.5s",
            }}
          />
        </div>

        {/* Name 2 */}
        <div className="overflow-hidden pt-6 -mt-6 pb-4 -mb-4">
          <h1
            className="font-serif text-6xl md:text-8xl lg:text-[7.5rem] font-light text-foreground tracking-wider leading-none"
            style={{
              transform: phase >= 4 ? "translateY(0)" : "translateY(110%)",
              opacity: phase >= 4 ? 1 : 0,
              transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease",
            }}
          >
            กานต์ธิดา
          </h1>
        </div>

        {/* Date box with animated border */}
        <div
          className="mt-14 inline-block relative px-12 py-6"
          style={{
            opacity: phase >= 5 ? 1 : 0,
            transform: phase >= 5 ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
            transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* Corner brackets animate in */}
          {(["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"] as const).map((cls, i) => (
            <span
              key={i}
              className={`absolute border-primary/45 transition-all duration-500 ${cls}`}
              style={{
                width: phase >= 5 ? "20px" : "0px",
                height: phase >= 5 ? "20px" : "0px",
                transitionDelay: `${i * 80}ms`,
              }}
            />
          ))}

          <p className="font-serif text-2xl md:text-3xl text-primary mb-1">19 ธันวาคม 2569</p>
          <p className="text-muted-foreground text-xs tracking-[0.35em] mb-3">DECEMBER 19, 2026</p>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-6 bg-primary/30" />
            <p className="text-muted-foreground text-xs tracking-widest">HAUS GARDEN · BANGKOK</p>
            <div className="h-px w-6 bg-primary/30" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{
          opacity: phase >= 5 ? 1 : 0,
          transition: "opacity 1s ease 0.5s",
        }}
      >
        <p className="text-muted-foreground/35 text-[9px] tracking-[0.5em]">SCROLL</p>
        <div className="w-px h-10 relative overflow-hidden bg-primary/10">
          <div
            className="absolute inset-x-0 top-0 bg-primary/60"
            style={{ animation: "scroll-drip 1.8s ease-in-out infinite" }}
          />
        </div>
      </div>
    </section>
  )
}
