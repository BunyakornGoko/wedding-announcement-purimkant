"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react"

function formatTime(t: number) {
  if (!isFinite(t)) return "0:00"
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.3

    const onTime = () => setCurrentTime(audio.currentTime)
    const onMeta = () => setDuration(audio.duration)
    const onEnded = () => setIsPlaying(false)

    audio.addEventListener("timeupdate", onTime)
    audio.addEventListener("loadedmetadata", onMeta)
    audio.addEventListener("ended", onEnded)
    return () => {
      audio.removeEventListener("timeupdate", onTime)
      audio.removeEventListener("loadedmetadata", onMeta)
      audio.removeEventListener("ended", onEnded)
    }
  }, [])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }, [isPlaying])

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const t = parseFloat(e.target.value)
    audio.currentTime = t
    setCurrentTime(t)
  }

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const v = parseFloat(e.target.value)
    audio.volume = v
    setVolume(v)
    setIsMuted(v === 0)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isMuted) {
      const v = volume || 0.3
      audio.volume = v
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <>
      <audio ref={audioRef} src="/lovestory.mp4" loop preload="metadata" />

      <div
        className="fixed bottom-6 right-6 z-40 transition-all duration-300 ease-out"
        style={{ width: expanded ? "320px" : "auto" }}
      >
        <div className="bg-foreground/90 backdrop-blur-md text-background rounded-full shadow-2xl overflow-hidden">

          {/* Seek bar — only visible when expanded */}
          {expanded && (
            <div className="px-5 pt-3 pb-0">
              <div className="relative flex items-center gap-2">
                <span className="text-background/40 text-[9px] tabular-nums w-8 shrink-0">{formatTime(currentTime)}</span>
                <div className="relative flex-1 h-1 group">
                  <div className="absolute inset-0 bg-background/15 rounded-full" />
                  <div
                    className="absolute left-0 top-0 h-full bg-primary/80 rounded-full pointer-events-none"
                    style={{ width: `${progress}%` }}
                  />
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    step={0.1}
                    value={currentTime}
                    onChange={handleSeek}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <span className="text-background/40 text-[9px] tabular-nums w-8 text-right shrink-0">{formatTime(duration)}</span>
              </div>
            </div>
          )}

          {/* Main controls row */}
          <div className="flex items-center gap-3 px-4 py-3">

            {/* Music note icon + label (expanded only) */}
            {expanded && (
              <div className="flex items-center gap-1.5 flex-1 min-w-0">
                <Music
                  className="w-3.5 h-3.5 text-primary/70 shrink-0"
                  style={{ animation: isPlaying ? "spin-slow 4s linear infinite" : "none" }}
                />
                <span className="text-background/60 text-[10px] tracking-wider truncate">LOVE STORY</span>
              </div>
            )}

            {/* Collapse toggle (music note when collapsed) */}
            {!expanded && (
              <button
                onClick={() => setExpanded(true)}
                className="text-background/50 hover:text-background/80 transition-colors"
                aria-label="Open player"
              >
                <Music
                  className="w-4 h-4"
                  style={{ animation: isPlaying ? "spin-slow 4s linear infinite" : "none" }}
                />
              </button>
            )}

            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors shrink-0"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying
                ? <Pause  className="w-3.5 h-3.5 text-background" />
                : <Play   className="w-3.5 h-3.5 text-background ml-0.5" />
              }
            </button>

            {/* Volume (expanded only) */}
            {expanded && (
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={toggleMute} className="text-background/50 hover:text-background/80 transition-colors">
                  {isMuted || volume === 0
                    ? <VolumeX className="w-3.5 h-3.5" />
                    : <Volume2 className="w-3.5 h-3.5" />
                  }
                </button>
                <div className="relative w-16 h-1 group">
                  <div className="absolute inset-0 bg-background/15 rounded-full" />
                  <div
                    className="absolute left-0 top-0 h-full bg-primary/70 rounded-full pointer-events-none"
                    style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                  />
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolume}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Collapse button (when expanded) */}
            {expanded && (
              <button
                onClick={() => setExpanded(false)}
                className="text-background/30 hover:text-background/60 transition-colors text-[10px] leading-none shrink-0 ml-1"
                aria-label="Collapse player"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
