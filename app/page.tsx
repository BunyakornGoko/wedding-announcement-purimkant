import { HeroSection } from "@/components/hero-section"
import { CountdownTimer } from "@/components/countdown-timer"
import { CoupleSection } from "@/components/couple-section"
import { EventDetails } from "@/components/event-details"
import { GuestInfo } from "@/components/guest-info"
import { Footer } from "@/components/footer"

export default function WeddingPage() {
  const weddingDate = new Date("2026-12-19T16:00:00+07:00")

  return (
    <main className="min-h-screen">
      <HeroSection />
      <CountdownTimer targetDate={weddingDate} />
      <CoupleSection />
      <EventDetails />
      <GuestInfo />
      <Footer />
    </main>
  )
}
