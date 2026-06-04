"use client"

import { useEffect, useState, useRef } from "react"
import { Heart } from "lucide-react"

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.2 }
    )
    if (footerRef.current) observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [])

  const navLinks = [
    { label: "หน้าหลัก", href: "#home" },
    { label: "นับถอยหลัง", href: "#countdown" },
    { label: "คู่บ่าวสาว", href: "#couple" },
    { label: "รายละเอียดงาน", href: "#details" },
    { label: "ข้อมูลแขก", href: "#info" },
  ]

  return (
    <footer ref={footerRef} className="bg-foreground text-background overflow-hidden relative">
      {/* Top botanical divider */}
      <div className="flex items-center justify-center py-8 border-b border-background/10">
        <div className="flex items-center gap-4">
          <div className="h-px w-24 bg-background/15" />
          <svg className="w-8 h-8 text-background/25" viewBox="0 0 40 40" fill="currentColor">
            <path d="M20,4 Q24,10 20,18 Q16,10 20,4 M20,18 Q24,26 20,38 Q16,26 20,18 M4,20 Q10,16 20,20 Q10,24 4,20 M20,20 Q30,16 38,20 Q30,24 20,20" />
          </svg>
          <div className="h-px w-24 bg-background/15" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className={`text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Names */}
          <div className="mb-3">
            <div className="flex items-center justify-center gap-4">
              <span className="font-serif text-4xl md:text-5xl font-light">ปุริมพัฒน์</span>
              <Heart className="w-6 h-6 text-background/40 fill-background/15 shrink-0" />
              <span className="font-serif text-4xl md:text-5xl font-light">กานต์ธิดา</span>
            </div>
          </div>

          <p className="text-background/40 text-xs tracking-[0.4em] mb-12">
            19 · 12 · 2026
          </p>

          {/* Tagline */}
          <p className="font-serif text-lg md:text-2xl text-background/70 italic mb-16 max-w-lg mx-auto">
            ขอบคุณที่มาร่วมแสดงความยินดีและแบ่งปันความสุขกับเรา
          </p>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-16">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-background/40 text-xs tracking-[0.3em] hover:text-background/70 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Bottom line */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-background/10" />
            <svg className="w-5 h-5 text-background/20" viewBox="0 0 30 30" fill="currentColor">
              <ellipse cx="15" cy="8" rx="4" ry="8" />
              <ellipse cx="22" cy="18" rx="4" ry="8" transform="rotate(60 22 18)" />
              <ellipse cx="8" cy="18" rx="4" ry="8" transform="rotate(-60 8 18)" />
            </svg>
            <div className="h-px w-16 bg-background/10" />
          </div>
        </div>
      </div>
    </footer>
  )
}
