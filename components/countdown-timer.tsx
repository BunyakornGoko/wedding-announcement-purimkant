"use client"

import { useEffect, useRef, useState } from "react"
import { Heart } from "lucide-react"

interface CountdownTimerProps {
  targetDate: Date
}

function FlipUnit({ value, label, labelEn, isVisible, delay }: {
  value: number
  label: string
  labelEn: string
  isVisible: boolean
  delay: number
}) {
  const [displayed, setDisplayed] = useState(value)
  const [flipping, setFlipping] = useState(false)
  const pendingValue = useRef(value)

  useEffect(() => {
    if (value === displayed) return
    pendingValue.current = value
    setFlipping(true)
    const t = setTimeout(() => {
      setDisplayed(pendingValue.current)
      setFlipping(false)
    }, 180)
    return () => clearTimeout(t)
  }, [value, displayed])

  return (
    <div
      className="flex flex-col items-center"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <div className="relative min-w-[88px] md:min-w-[126px]">
        {/* Corner brackets */}
        <span className="absolute -top-2.5 -left-2.5 w-5 h-5 border-t border-l border-background/35" />
        <span className="absolute -top-2.5 -right-2.5 w-5 h-5 border-t border-r border-background/35" />
        <span className="absolute -bottom-2.5 -left-2.5 w-5 h-5 border-b border-l border-background/35" />
        <span className="absolute -bottom-2.5 -right-2.5 w-5 h-5 border-b border-r border-background/35" />

        <div className="border border-background/12 bg-background/4 px-4 py-7 md:py-10 text-center overflow-hidden">
          <span
            key={displayed}
            className="font-serif text-5xl md:text-7xl font-light text-background tabular-nums block"
            style={{
              animation: "number-in 0.25s ease forwards",
              opacity: flipping ? 0 : 1,
              transform: flipping ? "translateY(-8px) scale(0.94)" : "translateY(0) scale(1)",
              transition: "opacity 0.18s ease, transform 0.18s ease",
            }}
          >
            {String(displayed).padStart(2, "0")}
          </span>
        </div>
      </div>

      <p className="mt-5 text-background/38 text-[9px] tracking-[0.45em] text-center">{labelEn}</p>
      <p className="text-background/60 text-sm mt-1 font-serif text-center">{label}</p>
    </div>
  )
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
          days:    Math.floor(diff / 86400000),
          hours:   Math.floor((diff / 3600000) % 24),
          minutes: Math.floor((diff / 60000)   % 60),
          seconds: Math.floor((diff / 1000)    % 60),
        })
      }
    }
    calculate()
    const timer = setInterval(calculate, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const units = [
    { value: timeLeft.days,    label: "วัน",      labelEn: "DAYS"    },
    { value: timeLeft.hours,   label: "ชั่วโมง",  labelEn: "HOURS"   },
    { value: timeLeft.minutes, label: "นาที",     labelEn: "MINUTES" },
    { value: timeLeft.seconds, label: "วินาที",   labelEn: "SECONDS" },
  ]

  return (
    <section
      id="countdown"
      ref={sectionRef}
      className="py-24 md:py-36 bg-foreground text-background overflow-hidden relative"
    >
      {/* Subtle repeating botanical pattern in background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden>
        <svg className="w-full h-full" viewBox="0 0 80 80" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="bg-leaf" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20,4 Q24,12 20,22 Q16,12 20,4 M20,22 Q24,30 20,38 Q16,30 20,22" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg-leaf)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {isWeddingDay ? (
          <div
            className="text-center"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <div className="relative inline-block mb-8">
              <span className="absolute inset-0 rounded-full bg-background/15" style={{ animation: "ripple-out 2s ease-out infinite" }} />
              <span className="absolute inset-0 rounded-full bg-background/10" style={{ animation: "ripple-out 2s ease-out 0.7s infinite" }} />
              <Heart className="w-14 h-14 text-background/50 fill-background/15 relative z-10" />
            </div>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-6 font-light">
              วันนี้คือวันพิเศษของเรา
            </h2>
            <p className="text-background/50 tracking-[0.35em] text-xs">TODAY IS OUR WEDDING DAY</p>
            <p className="font-serif text-xl md:text-2xl text-background/75 mt-8 italic">
              ขอบคุณทุกคนที่มาร่วมแบ่งปันความสุขกับเรา
            </p>
          </div>
        ) : (
          <div className="text-center">
            {/* Section label */}
            <div
              className="flex items-center justify-center gap-4 mb-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.7s ease",
              }}
            >
              <div
                className="h-px bg-background/20"
                style={{
                  width: isVisible ? "48px" : "0px",
                  transition: "width 0.8s ease 0.3s",
                }}
              />
              <p className="text-background/38 text-[9px] tracking-[0.55em]">COUNTING DOWN TO</p>
              <div
                className="h-px bg-background/20"
                style={{
                  width: isVisible ? "48px" : "0px",
                  transition: "width 0.8s ease 0.3s",
                }}
              />
            </div>

            {/* Title */}
            <div className="overflow-hidden pt-4 -mt-4 mb-16">
              <h2
                className="font-serif text-3xl md:text-5xl lg:text-6xl font-light"
                style={{
                  transform: isVisible ? "translateY(0)" : "translateY(100%)",
                  opacity: isVisible ? 1 : 0,
                  transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s, opacity 0.8s ease 0.15s",
                }}
              >
                นับถอยหลังสู่วันแห่งความรัก
              </h2>
            </div>

            {/* Units */}
            <div className="flex flex-wrap justify-center gap-7 md:gap-12">
              {units.map((unit, i) => (
                <FlipUnit
                  key={unit.labelEn}
                  value={unit.value}
                  label={unit.label}
                  labelEn={unit.labelEn}
                  isVisible={isVisible}
                  delay={i * 120 + 300}
                />
              ))}
            </div>

            {/* Bottom ornament */}
            <div
              className="mt-16 flex items-center justify-center gap-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.7s ease 0.8s",
              }}
            >
              <div className="h-px w-16 bg-background/12" />
              <div className="relative">
                <span className="absolute inset-0 rounded-full bg-background/10" style={{ animation: "ripple-out 2.5s ease-out infinite" }} />
                <Heart className="w-4 h-4 text-background/28 fill-background/8 relative z-10" />
              </div>
              <div className="h-px w-16 bg-background/12" />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
