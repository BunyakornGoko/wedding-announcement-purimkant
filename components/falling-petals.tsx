"use client"

import { useEffect, useState } from "react"

interface Petal {
  id: number
  left: number
  delay: number
  duration: number
  size: number
  opacity: number
  path: string
}

const PATHS = [
  "M10,2 Q14,9 10,18 Q6,9 10,2 M10,18 Q13,23 10,28 Q7,23 10,18",
  "M10,3 Q15,9 10,18 Q5,9 10,3 M6,12 Q11,8 16,12 Q11,18 6,12",
  "M10,2 Q16,8 10,16 Q4,8 10,2",
  "M10,1 Q13,7 10,16 Q7,7 10,1 M4,9 Q10,6 16,9 Q10,14 4,9",
]

export function FallingPetals() {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    setPetals(
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: 3 + Math.random() * 94,
        delay: -(Math.random() * 18),
        duration: 14 + Math.random() * 12,
        size: 10 + Math.random() * 14,
        opacity: 0.08 + Math.random() * 0.14,
        path: PATHS[Math.floor(Math.random() * PATHS.length)],
      }))
    )
  }, [])

  if (petals.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute top-0"
          style={{
            left: `${petal.left}%`,
            animation: `petal-fall ${petal.duration}s ease-in-out ${petal.delay}s infinite`,
            opacity: petal.opacity,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.5}
            viewBox="0 0 20 30"
            fill="currentColor"
            className="text-primary"
          >
            <path d={petal.path} />
          </svg>
        </div>
      ))}
    </div>
  )
}
