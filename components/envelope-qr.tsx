"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { X } from "lucide-react"

type Phase = "idle" | "envelope" | "flap" | "qr" | "exit"

export function EnvelopeQR() {
  const [phase, setPhase] = useState<Phase>("idle")

  const open = () => {
    setPhase("envelope")
    setTimeout(() => setPhase("flap"), 350)
    setTimeout(() => setPhase("qr"),   950)
  }

  const close = () => {
    setPhase("exit")
    setTimeout(() => setPhase("idle"), 500)
  }

  useEffect(() => {
    if (phase === "idle") return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [phase])

  const envelopeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = envelopeRef.current
    if (!el) return

    const bounce = () => {
      el.animate([
        { transform: "translateY(0)     rotate(0deg)  scale(1)"    },
        { transform: "translateY(-16px) rotate(-4deg) scale(1.06)" },
        { transform: "translateY(0px)   rotate(4deg)  scale(1)"    },
        { transform: "translateY(-10px) rotate(-2deg) scale(1.03)" },
        { transform: "translateY(0px)   rotate(2deg)  scale(1)"    },
        { transform: "translateY(-5px)  rotate(-1deg) scale(1.01)" },
        { transform: "translateY(0)     rotate(0deg)  scale(1)"    },
      ], { duration: 900, easing: "ease-in-out" })
    }

    bounce()
    const id = setInterval(bounce, 2000)
    return () => clearInterval(id)
  }, [])

  const mounted  = phase !== "idle"
  const visible  = phase !== "exit" && phase !== "idle"
  const flapOpen = phase === "flap" || phase === "qr"
  const qrUp     = phase === "qr"

  return (
    <>
      {/* ── Trigger section ───────────────────────── */}
      <section className="py-24 md:py-32 text-center bg-secondary/20 relative overflow-hidden">

        {/* ── Botanical decoration layer ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">

          {/* Left large botanical branch — desktop only */}
          <div
            className="hidden md:block absolute left-0 top-0 h-full w-72 text-primary/[0.14]"
            style={{ animation: "float-slow 16s ease-in-out infinite" }}
          >
            <svg viewBox="0 0 210 560" fill="currentColor" className="w-full h-full">
              <path d="M22,555 Q42,460 56,385 Q70,310 60,248 Q50,185 74,120 Q96,58 138,10"
                fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.45" />
              <path d="M105,52 C74,35 15,24 8,0 C60,8 100,36 105,52Z" />
              <path d="M82,132 C105,103 162,88 174,52 C130,80 79,108 82,132Z" opacity="0.8" />
              <path d="M65,222 C43,198 4,188 0,158 C33,170 63,198 65,222Z" opacity="0.7" />
              <path d="M62,305 C80,279 132,272 143,246 C108,265 60,289 62,305Z" opacity="0.63" />
              <path d="M42,398 C21,378 4,363 2,338 C23,350 42,376 42,398Z" opacity="0.5" />
              <path d="M60,165 C48,150 58,129 69,123 C63,137 57,153 60,165Z" opacity="0.38" />
              <circle cx="138" cy="10" r="5" opacity="0.52" />
              <circle cx="174" cy="52" r="3.5" opacity="0.46" />
              <circle cx="143" cy="246" r="3" opacity="0.42" />
            </svg>
          </div>

          {/* Right large botanical branch (mirrored) — desktop only */}
          <div
            className="hidden md:block absolute right-0 top-0 h-full w-72 text-primary/[0.14]"
            style={{ animation: "float 18s ease-in-out 2.5s infinite" }}
          >
            <svg viewBox="0 0 210 560" fill="currentColor" className="w-full h-full"
                 style={{ transform: "scaleX(-1)" }}>
              <path d="M22,555 Q42,460 56,385 Q70,310 60,248 Q50,185 74,120 Q96,58 138,10"
                fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.45" />
              <path d="M105,52 C74,35 15,24 8,0 C60,8 100,36 105,52Z" />
              <path d="M82,132 C105,103 162,88 174,52 C130,80 79,108 82,132Z" opacity="0.8" />
              <path d="M65,222 C43,198 4,188 0,158 C33,170 63,198 65,222Z" opacity="0.7" />
              <path d="M62,305 C80,279 132,272 143,246 C108,265 60,289 62,305Z" opacity="0.63" />
              <path d="M42,398 C21,378 4,363 2,338 C23,350 42,376 42,398Z" opacity="0.5" />
              <path d="M60,165 C48,150 58,129 69,123 C63,137 57,153 60,165Z" opacity="0.38" />
              <circle cx="138" cy="10" r="5" opacity="0.52" />
              <circle cx="174" cy="52" r="3.5" opacity="0.46" />
              <circle cx="143" cy="246" r="3" opacity="0.42" />
            </svg>
          </div>

          {/* Small scattered petals — desktop only */}
          <div className="hidden md:block absolute top-[18%] left-[17%] w-7 h-7 text-primary/[0.13]"
               style={{ animation: "float 8s ease-in-out 2s infinite" }}>
            <svg viewBox="0 0 28 28" fill="currentColor">
              <ellipse cx="14" cy="7" rx="4" ry="7" />
              <ellipse cx="21" cy="18" rx="4" ry="7" transform="rotate(60 21 18)" />
              <ellipse cx="7"  cy="18" rx="4" ry="7" transform="rotate(-60 7 18)" />
            </svg>
          </div>
          <div className="hidden md:block absolute top-[65%] right-[16%] w-6 h-6 text-primary/[0.11]"
               style={{ animation: "float-slow 10s ease-in-out 5s infinite" }}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,1 Q15,6 12,12 Q9,6 12,1 M12,12 Q15,18 12,23 Q9,18 12,12 M1,12 Q6,9 12,12 Q6,15 1,12 M12,12 Q18,9 23,12 Q18,15 12,12" />
            </svg>
          </div>
          <div className="hidden md:block absolute top-[44%] left-[8%] w-5 h-5 text-primary/[0.10]"
               style={{ animation: "float 7s ease-in-out 1s infinite" }}>
            <svg viewBox="0 0 20 20" fill="currentColor">
              <ellipse cx="10" cy="5" rx="3" ry="5" />
              <ellipse cx="15" cy="14" rx="3" ry="5" transform="rotate(60 15 14)" />
              <ellipse cx="5"  cy="14" rx="3" ry="5" transform="rotate(-60 5 14)" />
            </svg>
          </div>
          <div className="hidden md:block absolute top-[28%] right-[18%] w-8 h-8 text-primary/[0.12]"
               style={{ animation: "float-slow 9s ease-in-out 4s infinite" }}>
            <svg viewBox="0 0 30 30" fill="currentColor">
              <ellipse cx="15" cy="7" rx="4" ry="7" />
              <ellipse cx="22" cy="19" rx="4" ry="7" transform="rotate(60 22 19)" />
              <ellipse cx="8"  cy="19" rx="4" ry="7" transform="rotate(-60 8 19)" />
            </svg>
          </div>

          {/* Mobile corner accents — small botanical corners, mobile only */}
          <div className="block md:hidden absolute top-0 left-0 w-24 h-24 text-primary/[0.18]"
               style={{ animation: "float-slow 12s ease-in-out infinite" }}>
            <svg viewBox="0 0 96 96" fill="currentColor" className="w-full h-full">
              <path d="M0,96 Q18,60 22,30 Q26,10 40,0 C32,12 20,32 18,55 Q14,72 0,96Z" opacity="0.7" />
              <path d="M40,0 C28,5 10,20 0,40 C8,28 22,16 40,0Z" opacity="0.5" />
              <circle cx="40" cy="0" r="3.5" opacity="0.5" />
            </svg>
          </div>
          <div className="block md:hidden absolute top-0 right-0 w-24 h-24 text-primary/[0.18]"
               style={{ animation: "float 14s ease-in-out 2s infinite" }}>
            <svg viewBox="0 0 96 96" fill="currentColor" className="w-full h-full"
                 style={{ transform: "scaleX(-1)" }}>
              <path d="M0,96 Q18,60 22,30 Q26,10 40,0 C32,12 20,32 18,55 Q14,72 0,96Z" opacity="0.7" />
              <path d="M40,0 C28,5 10,20 0,40 C8,28 22,16 40,0Z" opacity="0.5" />
              <circle cx="40" cy="0" r="3.5" opacity="0.5" />
            </svg>
          </div>
          <div className="block md:hidden absolute bottom-0 left-0 w-20 h-20 text-primary/[0.15]"
               style={{ animation: "float-slow 13s ease-in-out 3s infinite" }}>
            <svg viewBox="0 0 80 80" fill="currentColor" className="w-full h-full"
                 style={{ transform: "scaleY(-1)" }}>
              <path d="M0,80 Q14,50 18,24 Q22,8 32,0 C26,10 16,26 14,44 Q11,58 0,80Z" opacity="0.65" />
              <path d="M32,0 C22,4 8,16 0,32 C6,22 18,12 32,0Z" opacity="0.45" />
            </svg>
          </div>
          <div className="block md:hidden absolute bottom-0 right-0 w-20 h-20 text-primary/[0.15]"
               style={{ animation: "float 11s ease-in-out 1s infinite" }}>
            <svg viewBox="0 0 80 80" fill="currentColor" className="w-full h-full"
                 style={{ transform: "scale(-1,-1)" }}>
              <path d="M0,80 Q14,50 18,24 Q22,8 32,0 C26,10 16,26 14,44 Q11,58 0,80Z" opacity="0.65" />
              <path d="M32,0 C22,4 8,16 0,32 C6,22 18,12 32,0Z" opacity="0.45" />
            </svg>
          </div>

          {/* Top wave ornament */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-48 text-primary/[0.22]">
            <svg viewBox="0 0 192 22" fill="none" stroke="currentColor" strokeWidth="0.9">
              <path d="M96,11 Q78,2 60,11 Q42,20 24,11 Q12,5 0,11" opacity="0.65" />
              <path d="M96,11 Q114,2 132,11 Q150,20 168,11 Q180,5 192,11" opacity="0.65" />
              <circle cx="96" cy="11" r="2.5" fill="currentColor" opacity="0.55" />
            </svg>
          </div>

          {/* Bottom wave ornament */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-48 text-primary/[0.22]">
            <svg viewBox="0 0 192 22" fill="none" stroke="currentColor" strokeWidth="0.9">
              <path d="M96,11 Q78,20 60,11 Q42,2 24,11 Q12,17 0,11" opacity="0.65" />
              <path d="M96,11 Q114,20 132,11 Q150,2 168,11 Q180,17 192,11" opacity="0.65" />
              <circle cx="96" cy="11" r="2.5" fill="currentColor" opacity="0.55" />
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Small floral ornament above label */}
          <div className="flex justify-center mb-3 text-primary/40">
            <svg viewBox="0 0 40 20" fill="currentColor" className="w-10 h-5">
              <ellipse cx="20" cy="6" rx="3" ry="6" />
              <ellipse cx="29" cy="13" rx="3" ry="6" transform="rotate(60 29 13)" />
              <ellipse cx="11" cy="13" rx="3" ry="6" transform="rotate(-60 11 13)" />
              <circle cx="20" cy="11" r="1.5" opacity="0.6" />
            </svg>
          </div>

          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-16 bg-primary/30" />
            <p className="text-muted-foreground text-[10px] tracking-[0.5em]">DIGITAL ENVELOPE</p>
            <div className="h-px w-16 bg-primary/30" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground font-light mb-4">ซองดิจิทัล</h2>
          <p className="text-muted-foreground text-sm mb-12 max-w-sm mx-auto leading-relaxed">
            หากท่านประสงค์จะร่วมสมทบทุน<br />สามารถกดซองเพื่อสแกน QR โอนได้เลย
          </p>

          {/* Envelope button */}
          <button
            onClick={open}
            className="group inline-flex flex-col items-center gap-2 focus:outline-none"
            aria-label="เปิดซอง"
          >
            <div ref={envelopeRef} className="relative w-44 h-32">
              <div className="absolute inset-0 bg-card border border-primary/30 shadow-md group-hover:shadow-lg transition-shadow duration-300" />
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 176 128">
                <line x1="0"   y1="128" x2="88" y2="74" stroke="oklch(0.78 0.05 145)" strokeWidth="0.8" opacity="0.6" />
                <line x1="176" y1="128" x2="88" y2="74" stroke="oklch(0.78 0.05 145)" strokeWidth="0.8" opacity="0.6" />
                <circle cx="88" cy="104" r="10" fill="none" stroke="oklch(0.45 0.12 145)" strokeWidth="0.7" opacity="0.35" />
                <circle cx="88" cy="104" r="4"  fill="oklch(0.45 0.12 145)" opacity="0.2" />
              </svg>
              {/* Flap on trigger button */}
              <div
                className="absolute top-0 left-0 right-0"
                style={{
                  height: "55%",
                  clipPath: "polygon(0% 0%, 100% 0%, 50% 78%)",
                  background: "oklch(0.91 0.025 145)",
                  borderBottom: "0.8px solid oklch(0.80 0.045 145)",
                }}
              />
            </div>
            <span className="font-serif text-base text-primary tracking-wide group-hover:text-primary/70 transition-colors duration-200">
              กดเปิดซอง
            </span>
            <span className="text-muted-foreground/50 text-[9px] tracking-[0.35em]">TAP TO OPEN</span>
          </button>
        </div>
      </section>

      {/* ── Modal ─────────────────────────────────── */}
      {mounted && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            backgroundColor: visible ? "rgba(0,0,0,0.65)" : "rgba(0,0,0,0)",
            backdropFilter: visible ? "blur(6px)" : "none",
            transition: "background-color 0.45s ease, backdrop-filter 0.45s ease",
          }}
          onClick={close}
        >
          <button
            className="absolute top-3 right-2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            onClick={close}
            aria-label="ปิด"
          >
            <X className="w-5 h-5 text-white/70" />
          </button>

          {/*
           * Stack: envelope wrapper first in DOM (painted below by default),
           * QR card second in DOM (painted on top by default).
           * Envelope solid body covers QR card while it's still "inside".
           * Once QR card rises above envelope top edge, it's fully visible.
           */}
          <div
            className="flex flex-col items-center"
            style={{ perspective: "1100px" }}
            onClick={e => e.stopPropagation()}
          >
            {/* QR card — normal flow, centered with envelope as a stack */}
            <div
              style={{
                transform: qrUp ? "translateY(0)" : "translateY(50px)",
                opacity: qrUp ? 1 : 0,
                transition: "transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.1s, opacity 0.5s ease 0.1s",
                marginBottom: "-28px",
                position: "relative",
                zIndex: 10,
              }}
            >
              <div className="bg-white px-8 pt-8 pb-5 shadow-2xl text-center">
                <Image
                  src="/gateqr.png"
                  alt="QR โอนเงินของขวัญ"
                  width={300}
                  height={300}
                  style={{ width: 270, height: 270, display: "block" }}
                  priority
                />
                <div className="mt-4 flex items-center justify-center gap-3">
                  <div className="h-px w-8 bg-gray-200" />
                  <p className="text-gray-400 text-[9px] tracking-[0.45em]">SCAN TO GIFT</p>
                  <div className="h-px w-8 bg-gray-200" />
                </div>
                <p className="text-gray-400 text-xs mt-1">สแกนเพื่อโอนเงินของขวัญ</p>
              </div>
            </div>

            {/* Envelope — after QR in DOM so it naturally paints on top of the overlap area */}
            <div
              className="relative"
              style={{
                width: "356px",
                height: "200px",
                zIndex: 2,
                transform: visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.96)",
                opacity: visible ? 1 : 0,
                transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease",
              }}
            >
              <div
                className="absolute inset-0 border border-primary/30"
                style={{ background: "oklch(0.97 0.01 145)" }}
              />
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 356 200">
                <line x1="0"   y1="200" x2="178" y2="112" stroke="oklch(0.80 0.045 145)" strokeWidth="0.8" />
                <line x1="356" y1="200" x2="178" y2="112" stroke="oklch(0.80 0.045 145)" strokeWidth="0.8" />
                <circle cx="178" cy="168" r="14"  fill="none" stroke="oklch(0.45 0.12 145)" strokeWidth="0.7" opacity="0.4" />
                <circle cx="178" cy="168" r="5.5" fill="oklch(0.45 0.12 145)" opacity="0.18" />
              </svg>
              <div
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: "56%",
                  transformOrigin: "top center",
                  transform: flapOpen ? "rotateX(-172deg)" : "rotateX(0deg)",
                  transition: "transform 0.65s cubic-bezier(0.4,0,0.2,1)",
                  transformStyle: "preserve-3d",
                  WebkitTransformStyle: "preserve-3d",
                  zIndex: 2,
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: "polygon(0% 0%, 100% 0%, 50% 82%)",
                    background: "oklch(0.91 0.025 145)",
                    borderBottom: "0.8px solid oklch(0.80 0.045 145)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: "polygon(0% 100%, 100% 100%, 50% 18%)",
                    background: "oklch(0.95 0.015 145)",
                    transform: "rotateX(180deg)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
