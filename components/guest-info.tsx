"use client"

import { useEffect, useState, useRef } from "react"
import { Shirt, Camera, Gift, Car } from "lucide-react"

export function GuestInfo() {
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

  const infoItems = [
    {
      icon: Shirt,
      title: "การแต่งกาย",
      titleEn: "DRESS CODE",
      description: "Formal / Semi-formal สีขาว เขียว หรือสีพาสเทล",
    },
    {
      icon: Camera,
      title: "แฮชแท็ก",
      titleEn: "HASHTAG",
      description: "#PurimKantWedding2026",
    },
    {
      icon: Gift,
      title: "ของขวัญ",
      titleEn: "GIFT",
      description: "การมาร่วมงานของท่านคือของขวัญที่ดีที่สุดสำหรับเรา",
    },
    {
      icon: Car,
      title: "ที่จอดรถ",
      titleEn: "PARKING",
      description: "มีที่จอดรถภายในสถานที่จัดงาน",
    },
  ]

  return (
    <section id="info" ref={sectionRef} className="py-24 md:py-36">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-primary/30" />
            <p className="text-muted-foreground text-[10px] tracking-[0.5em]">GUEST INFORMATION</p>
            <div className="h-px w-16 bg-primary/30" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground font-light">
            ข้อมูลสำหรับแขก
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {infoItems.map((item, index) => (
            <div
              key={index}
              className={`group transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              <div className="relative bg-card border border-border p-8 h-full text-center hover:border-primary/40 transition-colors duration-300">
                {/* Corner accents on hover */}
                <span className="absolute top-0 left-0 w-0 h-0 border-t-2 border-l-2 border-primary/60 transition-all duration-300 group-hover:w-5 group-hover:h-5" />
                <span className="absolute top-0 right-0 w-0 h-0 border-t-2 border-r-2 border-primary/60 transition-all duration-300 group-hover:w-5 group-hover:h-5" />
                <span className="absolute bottom-0 left-0 w-0 h-0 border-b-2 border-l-2 border-primary/60 transition-all duration-300 group-hover:w-5 group-hover:h-5" />
                <span className="absolute bottom-0 right-0 w-0 h-0 border-b-2 border-r-2 border-primary/60 transition-all duration-300 group-hover:w-5 group-hover:h-5" />

                <div className="w-14 h-14 rounded-full bg-primary/8 border border-primary/15 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/15 transition-colors duration-300">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>

                <p className="text-muted-foreground/60 text-[9px] tracking-[0.4em] mb-2">{item.titleEn}</p>
                <h3 className="font-serif text-xl text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
