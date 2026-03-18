import { useEffect, useRef } from "react"

import { useAudio } from "@/contexts/audio-context"

const BackgroundMusic = () => {
  const { audioRef } = useAudio()
  const didInitRef = useRef(false)

  useEffect(() => {
    const audioEl = audioRef.current
    if (!audioEl) return

    // Prevent double-init in React strict mode / re-renders.
    if (didInitRef.current) return
    didInitRef.current = true

    let unlocked = false

    const tryPlay = async (opts?: { forceUnmute?: boolean }) => {
      if (opts?.forceUnmute) audioEl.muted = false
      try {
        await audioEl.play()
        return true
      } catch {
        return false
      }
    }

    // Autoplay policy friendly:
    // 1) Try immediate audible autoplay.
    // 2) If blocked, try muted autoplay (often allowed) so playback starts "on load".
    // 3) On first user interaction, unmute and keep playing.
    const start = async () => {
      audioEl.loop = true
      audioEl.preload = "auto"

      const audibleOk = await tryPlay()
      if (audibleOk) return

      // Fallback: start muted so it can begin immediately, then unlock on interaction.
      audioEl.muted = true
      const mutedOk = await tryPlay()
      if (!mutedOk) {
        // If even muted playback is blocked, we'll rely on the interaction handler below.
        audioEl.muted = false
      }
    }

    const unlockOnInteraction = async () => {
      if (unlocked) return
      unlocked = true

      // Ensure we become audible after the first genuine user gesture.
      audioEl.muted = false
      await tryPlay({ forceUnmute: true })
    }

    const onVisibilityOrFocus = () => {
      // Some mobile browsers pause/stop audio when backgrounded; try to resume gracefully.
      if (document.visibilityState === "visible") {
        void tryPlay()
      }
    }

    void start()

    // Use capture so clicks on buttons/modals still count as the "unlock" gesture.
    document.addEventListener("pointerdown", unlockOnInteraction, { capture: true, once: true })
    document.addEventListener("keydown", unlockOnInteraction, { capture: true, once: true })
    window.addEventListener("focus", onVisibilityOrFocus)
    document.addEventListener("visibilitychange", onVisibilityOrFocus)

    return () => {
      // Intentionally do NOT pause here; we want music to continue even as UI changes.
      window.removeEventListener("focus", onVisibilityOrFocus)
      document.removeEventListener("visibilitychange", onVisibilityOrFocus)
    }
  }, [audioRef])

  return (
    <audio
      ref={audioRef}
      // Use an encoded URI to avoid issues with spaces/parentheses on some mobile browsers
      src={encodeURI("/music/Oceans Song by Hillsong UNITED (Lyric Video)  Matt Redman & Hillsong Worship.mp3")}
      loop
      preload="auto"
      // playsInline helps iOS treat this as inline media rather than requiring fullscreen behavior
      playsInline
      // Keep element non-visible; playback is initiated on first user interaction
      style={{ display: "none" }}
    />
  )
}

export default BackgroundMusic

