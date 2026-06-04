import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Geist, Mitr } from 'next/font/google'
import './globals.css'
import { ScrollProgress } from '@/components/scroll-progress'
import { FallingPetals } from '@/components/falling-petals'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
})

const mitr = Mitr({
  subsets: ['thai', 'latin'],
  weight: ['200', '300', '400'],
  variable: '--font-thai',
})

export const metadata: Metadata = {
  title: 'ปุริมพัฒน์ & กานต์ธิดา | Wedding Invitation',
  description: 'ขอเรียนเชิญร่วมเป็นเกียรติในงานมงคลสมรส ปุริมพัฒน์ & กานต์ธิดา วันที่ 19 ธันวาคม 2026 ณ Haus Garden',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#4a7c59',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th" className={`${cormorant.variable} ${geist.variable} ${mitr.variable} bg-background`}>
      <body className="font-sans antialiased">
        <ScrollProgress />
        <FallingPetals />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
