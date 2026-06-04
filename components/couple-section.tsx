"use client"

import { useEffect, useState, useRef } from "react"
import { Heart } from "lucide-react"

export function CoupleSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="couple" ref={sectionRef} className="py-24 md:py-36">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-primary/30" />
            <p className="text-muted-foreground text-[10px] tracking-[0.5em]">THE BRIDE & GROOM</p>
            <div className="h-px w-16 bg-primary/30" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground font-light">
            เจ้าบ่าว & เจ้าสาว
          </h2>
        </div>

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 max-w-5xl mx-auto items-center">
          {/* Groom */}
          <div className={`text-center transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <div className="relative mb-8 inline-block">
              {/* Outer ring */}
              <div className="w-48 h-48 md:w-60 md:h-60 rounded-full border border-primary/20 flex items-center justify-center">
                {/* Inner circle */}
                <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-secondary/60 border border-primary/10 flex items-center justify-center">
                  <span className="font-serif text-5xl md:text-6xl text-primary/50 font-light">ป</span>
                </div>
              </div>
              {/* Badge */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-1 text-[10px] tracking-[0.3em] whitespace-nowrap">
                GROOM
              </div>
            </div>

            <h3 className="font-serif text-2xl md:text-3xl text-foreground font-light mb-1">
              นายปุริมพัฒน์
            </h3>
            <p className="font-serif text-lg md:text-xl text-primary mb-4">
              เจียรสุนันท์
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
              บุตรชายคนโตของครอบครัวเจียรสุนันท์<br />ผู้เปี่ยมด้วยความรักและความมุ่งมั่น
            </p>
          </div>

          {/* Center divider */}
          <div className={`flex flex-col items-center gap-4 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
            <div className="w-px h-16 md:h-24 bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden md:block" />
            <div className="relative">
              <div className="w-14 h-14 rounded-full border border-primary/25 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary/60 fill-primary/15" />
              </div>
            </div>
            <div className="w-px h-16 md:h-24 bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden md:block" />
          </div>

          {/* Bride */}
          <div className={`text-center transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <div className="relative mb-8 inline-block">
              <div className="w-48 h-48 md:w-60 md:h-60 rounded-full border border-primary/20 flex items-center justify-center">
                <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-secondary/60 border border-primary/10 flex items-center justify-center">
                  <span className="font-serif text-5xl md:text-6xl text-primary/50 font-light">ก</span>
                </div>
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-1 text-[10px] tracking-[0.3em] whitespace-nowrap">
                BRIDE
              </div>
            </div>

            <h3 className="font-serif text-2xl md:text-3xl text-foreground font-light mb-1">
              นางสาวกานต์ธิดา
            </h3>
            <p className="font-serif text-lg md:text-xl text-primary mb-4">
              พรสมบัติไพบูลย์
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
              ธิดาสุดที่รักของครอบครัวพรสมบัติไพบูลย์<br />ผู้มีหัวใจอ่อนโยนและงดงาม
            </p>
          </div>
        </div>

        {/* Quote */}
        <div className={`mt-24 text-center transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="max-w-2xl mx-auto relative px-8">
            <span className="absolute top-0 left-0 font-serif text-6xl text-primary/20 leading-none select-none">"</span>
            <blockquote className="font-serif text-xl md:text-2xl text-foreground/75 italic leading-relaxed pt-4">
              ความรักที่แท้จริงไม่ได้มาจากการค้นหาคนที่สมบูรณ์แบบ
              แต่มาจากการเรียนรู้ที่จะมองเห็นความสมบูรณ์แบบในคนที่ไม่สมบูรณ์แบบ
            </blockquote>
            <span className="absolute bottom-0 right-0 font-serif text-6xl text-primary/20 leading-none select-none">"</span>
          </div>
        </div>
      </div>
    </section>
  )
}
