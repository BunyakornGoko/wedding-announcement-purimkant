"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-secondary/60 via-secondary/20 to-background">
      {/* Floating botanical corners */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-8 -left-8 w-72 h-72 text-primary/20 animate-[float_9s_ease-in-out_infinite]">
          <svg viewBox="0 0 200 200" fill="currentColor">
            <path d="M80,190 C80,190 10,130 35,65 C60,0 130,25 105,90 C80,155 80,190 80,190Z" />
            <path d="M110,170 C110,170 160,110 145,55 C130,0 70,30 90,85 C110,140 110,170 110,170Z" opacity="0.6" />
            <path d="M55,145 C55,145 0,95 20,48 C40,0 95,35 75,78 C55,120 55,145 55,145Z" opacity="0.4" />
            <circle cx="85" cy="195" r="4" opacity="0.5" />
            <circle cx="112" cy="175" r="3" opacity="0.4" />
          </svg>
        </div>

        <div className="absolute -top-8 -right-8 w-80 h-80 text-primary/18 animate-[float_12s_ease-in-out_2s_infinite]">
          <svg viewBox="0 0 200 200" fill="currentColor">
            <ellipse cx="100" cy="55" rx="22" ry="52" />
            <ellipse cx="52" cy="78" rx="18" ry="48" transform="rotate(-38 52 78)" />
            <ellipse cx="148" cy="78" rx="18" ry="48" transform="rotate(38 148 78)" />
            <ellipse cx="25" cy="125" rx="13" ry="32" transform="rotate(-60 25 125)" opacity="0.5" />
            <ellipse cx="175" cy="125" rx="13" ry="32" transform="rotate(60 175 125)" opacity="0.5" />
            <circle cx="100" cy="115" r="5" />
          </svg>
        </div>

        <div className="absolute -bottom-8 -left-8 w-64 h-64 text-primary/18 animate-[float_10s_ease-in-out_4s_infinite]">
          <svg viewBox="0 0 200 200" fill="currentColor">
            <path d="M100,10 C100,10 168,75 145,145 C122,215 55,188 78,118 C101,48 100,10 100,10Z" />
            <path d="M72,30 C72,30 15,95 42,158 C69,220 128,185 102,122 C76,59 72,30 72,30Z" opacity="0.55" />
            <circle cx="100" cy="5" r="4" opacity="0.5" />
          </svg>
        </div>

        <div className="absolute -bottom-8 -right-8 w-72 h-72 text-primary/22 animate-[float_11s_ease-in-out_1s_infinite]">
          <svg viewBox="0 0 200 200" fill="currentColor">
            <path d="M100,10 Q132,52 100,105 Q68,52 100,10 M100,105 Q132,148 100,195 Q68,148 100,105 M48,58 Q100,82 152,58 Q100,102 48,58 M48,138 Q100,118 152,138 Q100,165 48,138" />
            <circle cx="100" cy="105" r="6" opacity="0.4" />
          </svg>
        </div>

        {/* Scattered small petals */}
        <div className="absolute top-1/4 left-[15%] w-10 h-10 text-primary/12 animate-[float_7s_ease-in-out_3s_infinite]">
          <svg viewBox="0 0 40 40" fill="currentColor">
            <ellipse cx="20" cy="10" rx="6" ry="10" />
            <ellipse cx="30" cy="25" rx="6" ry="10" transform="rotate(60 30 25)" />
            <ellipse cx="10" cy="25" rx="6" ry="10" transform="rotate(-60 10 25)" />
          </svg>
        </div>
        <div className="absolute top-2/3 right-[12%] w-8 h-8 text-primary/10 animate-[float_8s_ease-in-out_6s_infinite]">
          <svg viewBox="0 0 40 40" fill="currentColor">
            <path d="M20,4 Q26,12 20,22 Q14,12 20,4 M20,22 Q26,30 20,38 Q14,30 20,22" />
          </svg>
        </div>
        <div className="absolute top-[40%] right-[20%] w-6 h-6 text-primary/10 animate-[float_6s_ease-in-out_1.5s_infinite]">
          <svg viewBox="0 0 30 30" fill="currentColor">
            <ellipse cx="15" cy="8" rx="4" ry="8" />
            <ellipse cx="22" cy="18" rx="4" ry="8" transform="rotate(60 22 18)" />
            <ellipse cx="8" cy="18" rx="4" ry="8" transform="rotate(-60 8 18)" />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Top ornament */}
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
            <svg className="w-6 h-6 text-primary/50" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,3 Q14,7 12,12 Q10,7 12,3 M12,12 Q14,16 12,22 Q10,16 12,12 M3,12 Q7,10 12,12 Q7,14 3,12 M12,12 Q17,10 22,12 Q17,14 12,12" />
            </svg>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </div>

        {/* Invitation text */}
        <p className={`text-muted-foreground text-xs md:text-sm tracking-[0.35em] uppercase mb-10 transition-all duration-700 delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          ขอเรียนเชิญร่วมเป็นเกียรติในงานมงคลสมรส
        </p>

        {/* Names */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-[7rem] font-light text-foreground tracking-wider leading-none">
            ปุริมพัฒน์
          </h1>

          <div className="flex items-center justify-center gap-6 my-7">
            <div className="h-px flex-1 max-w-28 bg-gradient-to-r from-transparent to-primary/40" />
            <Heart className="w-6 h-6 text-primary fill-primary/25 shrink-0" />
            <div className="h-px flex-1 max-w-28 bg-gradient-to-l from-transparent to-primary/40" />
          </div>

          <h1 className="font-serif text-6xl md:text-8xl lg:text-[7rem] font-light text-foreground tracking-wider leading-none">
            กานต์ธิดา
          </h1>
        </div>

        {/* Date box */}
        <div className={`mt-14 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="inline-block relative px-12 py-6">
            {/* Corner brackets */}
            <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary/50" />
            <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-primary/50" />
            <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-primary/50" />
            <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary/50" />

            <p className="font-serif text-2xl md:text-3xl text-primary mb-1">
              19 ธันวาคม 2569
            </p>
            <p className="text-muted-foreground text-xs tracking-[0.35em] mb-3">
              DECEMBER 19, 2026
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-6 bg-primary/30" />
              <p className="text-muted-foreground text-xs tracking-widest">HAUS GARDEN · BANGKOK</p>
              <div className="h-px w-6 bg-primary/30" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <p className="text-muted-foreground/40 text-[10px] tracking-[0.4em]">SCROLL</p>
        <div className="w-px h-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-transparent animate-[scroll-down_1.8s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  )
}
