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
      <section className="py-24 md:py-32 text-center bg-secondary/20">
        <div className="container mx-auto px-4">
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
