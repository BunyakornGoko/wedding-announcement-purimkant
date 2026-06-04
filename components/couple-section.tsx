"use client"

import { useEffect, useRef, useState } from "react"
import { Heart } from "lucide-react"

function DrawLine({ isVisible, delay = 0, reverse = false }: { isVisible: boolean; delay?: number; reverse?: boolean }) {
  return (
    <div className="h-px flex-1 max-w-28 relative overflow-hidden bg-primary/10">
      <div
        className={`absolute inset-0 bg-gradient-to-r ${reverse ? "from-transparent to-primary/50" : "from-primary/50 to-transparent"}`}
        style={{
          transform: isVisible ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: reverse ? "right" : "left",
          transition: `transform 0.9s ease ${delay}ms`,
        }}
      />
    </div>
  )
}

export function CoupleSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.12 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const person = (
    initial: string,
    firstName: string,
    lastName: string,
    bio: string,
    badge: string,
    side: "left" | "right",
    delay: number,
  ) => (
    <div
      className="text-center"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : `translateX(${side === "left" ? "-40px" : "40px"})`,
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {/* Photo circle with spinning outer ring */}
      <div className="relative mb-10 inline-block">
        {/* Slow-spinning decorative ring */}
        <div
          className="absolute inset-0 rounded-full border border-dashed border-primary/20"
          style={{
            inset: "-12px",
            borderRadius: "50%",
            animation: isVisible ? `spin-slow ${side === "left" ? 30 : 40}s linear infinite ${side === "right" ? "reverse" : ""}` : "none",
          }}
        />
        {/* Static ring */}
        <div className="w-52 h-52 md:w-64 md:h-64 rounded-full border border-primary/18 flex items-center justify-center">
          <div
            className="w-44 h-44 md:w-56 md:h-56 rounded-full bg-secondary/60 border border-primary/10 flex items-center justify-center"
            style={{
              transform: isVisible ? "scale(1)" : "scale(0.85)",
              transition: `transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay + 200}ms`,
            }}
          >
            <span className="font-serif text-6xl md:text-7xl text-primary/45 font-light select-none">
              {initial}
            </span>
          </div>
        </div>
        {/* Badge */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-1 text-[9px] tracking-[0.35em] whitespace-nowrap">
          {badge}
        </div>
      </div>

      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(14px)",
          transition: `opacity 0.7s ease ${delay + 350}ms, transform 0.7s ease ${delay + 350}ms`,
        }}
      >
        <h3 className="font-serif text-2xl md:text-3xl text-foreground font-light mb-1">{firstName}</h3>
        <p className="font-serif text-lg md:text-xl text-primary mb-4">{lastName}</p>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">{bio}</p>
      </div>
    </div>
  )

  return (
    <section id="couple" ref={sectionRef} className="py-24 md:py-36">
      <div className="container mx-auto px-4">

        {/* Section header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-4">
            <DrawLine isVisible={isVisible} delay={0} />
            <p
              className="text-muted-foreground text-[9px] tracking-[0.55em] shrink-0"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.7s ease 0.3s",
              }}
            >
              THE BRIDE & GROOM
            </p>
            <DrawLine isVisible={isVisible} delay={100} reverse />
          </div>
          <div className="overflow-hidden pt-4 -mt-4 pb-4 -mb-4">
            <h2
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground font-light"
              style={{
                transform: isVisible ? "translateY(0)" : "translateY(100%)",
                opacity: isVisible ? 1 : 0,
                transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s, opacity 0.8s ease 0.2s",
              }}
            >
              เจ้าบ่าว & เจ้าสาว
            </h2>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 max-w-5xl mx-auto items-center">
          {person("ป", "นายปุริมพัฒน์", "เจียรสุนันท์", "บุตรชายคนโตของครอบครัวเจียรสุนันท์\nผู้เปี่ยมด้วยความรักและความมุ่งมั่น", "GROOM", "left", 200)}

          {/* Center divider */}
          <div
            className="flex flex-col items-center gap-5"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: "opacity 0.8s ease 0.5s",
            }}
          >
            <div
              className="w-px hidden md:block bg-gradient-to-b from-transparent via-primary/25 to-transparent"
              style={{
                height: isVisible ? "100px" : "0px",
                transition: "height 1s ease 0.6s",
              }}
            />
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-primary/15" style={{ animation: isVisible ? "ripple-out 2.4s ease-out infinite" : "none" }} />
              <span className="absolute inset-0 rounded-full bg-primary/10" style={{ animation: isVisible ? "ripple-out 2.4s ease-out 0.9s infinite" : "none" }} />
              <div className="w-14 h-14 rounded-full border border-primary/20 flex items-center justify-center relative z-10 bg-background">
                <Heart className="w-6 h-6 text-primary/55 fill-primary/15" />
              </div>
            </div>
            <div
              className="w-px hidden md:block bg-gradient-to-b from-transparent via-primary/25 to-transparent"
              style={{
                height: isVisible ? "100px" : "0px",
                transition: "height 1s ease 0.6s",
              }}
            />
          </div>

          {person("ก", "นางสาวกานต์ธิดา", "พรสมบัติไพบูลย์", "ธิดาสุดที่รักของครอบครัวพรสมบัติไพบูลย์\nผู้มีหัวใจอ่อนโยนและงดงาม", "BRIDE", "right", 300)}
        </div>

        {/* Quote */}
        <div
          className="mt-24 text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease 0.7s, transform 0.8s ease 0.7s",
          }}
        >
          <div className="max-w-2xl mx-auto relative px-10">
            <span className="absolute top-0 left-2 font-serif text-7xl text-primary/18 leading-none select-none">"</span>
            <blockquote className="font-serif text-xl md:text-2xl text-foreground/70 italic leading-relaxed pt-5 pb-3">
              ความรักที่แท้จริงไม่ได้มาจากการค้นหาคนที่สมบูรณ์แบบ
              แต่มาจากการเรียนรู้ที่จะมองเห็นความสมบูรณ์แบบในคนที่ไม่สมบูรณ์แบบ
            </blockquote>
            <span className="absolute bottom-0 right-2 font-serif text-7xl text-primary/18 leading-none select-none">"</span>
          </div>
        </div>
      </div>
    </section>
  )
}
