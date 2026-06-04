"use client"

import { useEffect, useState, useRef } from "react"
import { Heart } from "lucide-react"

interface CountdownTimerProps {
  targetDate: Date
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isWeddingDay, setIsWeddingDay] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const calculate = () => {
      const diff = targetDate.getTime() - Date.now()
      if (diff <= 0) {
        setIsWeddingDay(true)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      } else {
        setTimeLeft({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff / 3600000) % 24),
          minutes: Math.floor((diff / 60000) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        })
      }
    }
    calculate()
    const timer = setInterval(calculate, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const units = [
    { value: timeLeft.days, label: "วัน", labelEn: "DAYS" },
    { value: timeLeft.hours, label: "ชั่วโมง", labelEn: "HOURS" },
    { value: timeLeft.minutes, label: "นาที", labelEn: "MINUTES" },
    { value: timeLeft.seconds, label: "วินาที", labelEn: "SECONDS" },
  ]

  return (
    <section
      id="countdown"
      ref={sectionRef}
      className="py-24 md:py-36 bg-foreground text-background overflow-hidden relative"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="leaf-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M10,2 Q13,6 10,11 Q7,6 10,2 M10,11 Q13,15 10,19 Q7,15 10,11" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {isWeddingDay ? (
          <div className={`text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <Heart className="w-16 h-16 text-background/60 mx-auto mb-8 fill-background/20 animate-pulse" />
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-6">
              วันนี้คือวันพิเศษของเรา
            </h2>
            <p className="text-background/60 tracking-[0.3em] text-sm">
              TODAY IS OUR WEDDING DAY
            </p>
            <p className="font-serif text-xl md:text-2xl text-background/80 mt-6 italic">
              ขอบคุณทุกคนที่มาร่วมแบ่งปันความสุขกับเรา
            </p>
          </div>
        ) : (
          <div className={`text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-background/20" />
              <p className="text-background/40 text-[10px] tracking-[0.5em]">COUNTING DOWN TO</p>
              <div className="h-px w-12 bg-background/20" />
            </div>

            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-16 font-light">
              นับถอยหลังสู่วันแห่งความรัก
            </h2>

            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {units.map((unit, index) => (
                <div
                  key={unit.labelEn}
                  className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  style={{ transitionDelay: `${index * 120 + 200}ms` }}
                >
                  <div className="relative min-w-[88px] md:min-w-[128px]">
                    {/* Outer corner brackets */}
                    <span className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-background/40" />
                    <span className="absolute -top-2 -right-2 w-4 h-4 border-t border-r border-background/40" />
                    <span className="absolute -bottom-2 -left-2 w-4 h-4 border-b border-l border-background/40" />
                    <span className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-background/40" />

                    <div className="border border-background/15 bg-background/5 px-4 py-7 md:py-9 text-center">
                      <span className="font-serif text-5xl md:text-7xl font-light text-background tabular-nums">
                        {String(unit.value).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <p className="mt-5 text-background/40 text-[9px] tracking-[0.4em] text-center">{unit.labelEn}</p>
                  <p className="text-background/60 text-sm mt-1 font-serif text-center">{unit.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-background/15" />
              <Heart className="w-4 h-4 text-background/30 fill-background/10" />
              <div className="h-px w-16 bg-background/15" />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
