"use client"

import { useEffect, useState, useRef } from "react"
import { MapPin, Clock, Calendar, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EventDetails() {
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

  const scheduleItems = [
    { time: "14:30", title: "เจ้าบ่าวเจ้าสาวเตรียมพร้อม", titleEn: "Bride & Groom Preparation" },
    { time: "16:00", title: "พิธีแห่ขันหมาก", titleEn: "Khan Mak Procession" },
    { time: "16:10", title: "พิธีสู่ขอ · ปูเรียงสินสอด · สวมแหวนหมั้น", titleEn: "Engagement Ceremony" },
    { time: "16:20", title: "ยกน้ำชา", titleEn: "Tea Ceremony" },
    { time: "17:20", title: "เจ้าบ่าวเจ้าสาวเปลี่ยนชุด", titleEn: "Outfit Change" },
    { time: "18:00", title: "เปิดไลน์อาหาร (บุฟเฟต์)", titleEn: "Buffet Opens" },
    { time: "18:30", title: "เปิดตัวเข้างาน", titleEn: "Grand Entrance" },
    { time: "18:45", title: "สัมภาษณ์พูดคุย", titleEn: "Interview & Speech" },
    { time: "18:50", title: "พิธีรดน้ำต้นไม้", titleEn: "Plant Watering Ceremony" },
    { time: "19:00", title: "โยนช่อดอกไม้", titleEn: "Bouquet Toss" },
    { time: "19:10", title: "เจ้าบ่าวเจ้าสาวกล่าวขอบคุณแขก", titleEn: "Thank You Speech" },
    { time: "19:20 – 22:00", title: "งานเลี้ยงฉลอง", titleEn: "Reception Party" },
  ]

  return (
    <section id="details" ref={sectionRef} className="py-24 md:py-36 bg-secondary/25">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-primary/30" />
            <p className="text-muted-foreground text-[10px] tracking-[0.5em]">EVENT DETAILS</p>
            <div className="h-px w-16 bg-primary/30" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground font-light">
            รายละเอียดงาน
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Venue */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <div className="bg-card border border-border h-full p-8 md:p-10 relative">
              {/* Corner accents */}
              <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/40" />
              <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary/40" />
              <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary/40" />
              <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary/40" />

              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-muted-foreground text-[10px] tracking-[0.4em]">VENUE</p>
                  <h3 className="font-serif text-lg text-foreground">สถานที่จัดงาน</h3>
                </div>
              </div>

              <h4 className="font-serif text-3xl md:text-4xl text-primary mb-3 font-light">
                Haus Garden
              </h4>
              <p className="text-foreground/60 text-sm leading-relaxed mb-8">
                44 Rama II Soi 3, Bang Mot,<br />
                Chom Thong, Bangkok 10150
              </p>

              <div className="space-y-3 mb-10">
                <div className="flex items-center gap-3 text-foreground/60 text-sm">
                  <Calendar className="w-4 h-4 text-primary/70 shrink-0" />
                  <span>วันเสาร์ที่ 19 ธันวาคม 2569</span>
                </div>
                <div className="flex items-center gap-3 text-foreground/60 text-sm">
                  <Clock className="w-4 h-4 text-primary/70 shrink-0" />
                  <span>เริ่มเวลา 14:30 น.</span>
                </div>
              </div>

              <Button
                render={<a href="https://www.google.com/maps/place/Haus+Garden/@13.6786956,100.4859019,17z/data=!3m1!4b1!4m6!3m5!1s0x30e2a333312d259b:0xb489d98f2f36b7a7!8m2!3d13.6786956!4d100.4859019!16s%2Fg%2F11l2_4r6gm!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" />}
                nativeButton={false}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/85 rounded-none h-11 tracking-wider text-xs"
              >
                <Navigation className="w-4 h-4 mr-2" />
                เปิดแผนที่
              </Button>
            </div>
          </div>

          {/* Schedule / Timeline */}
          <div className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <div className="bg-card border border-border h-full p-8 md:p-10 relative">
              <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/40" />
              <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary/40" />
              <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary/40" />
              <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary/40" />

              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-muted-foreground text-[10px] tracking-[0.4em]">SCHEDULE</p>
                  <h3 className="font-serif text-lg text-foreground">กำหนดการ</h3>
                </div>
              </div>

              <div className="space-y-0">
                {scheduleItems.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    {/* Timeline dot + line */}
                    <div className="flex flex-col items-center pt-1 shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary/50 shrink-0" />
                      {index < scheduleItems.length - 1 && (
                        <div className="w-px flex-1 bg-primary/15 my-1 min-h-[20px]" />
                      )}
                    </div>

                    <div className="pb-4 flex-1 min-w-0">
                      <p className="text-primary text-xs font-medium tracking-wide mb-0.5">{item.time} น.</p>
                      <h4 className="font-serif text-base text-foreground leading-snug">{item.title}</h4>
                      <p className="text-muted-foreground/55 text-[10px] tracking-wider">{item.titleEn}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
