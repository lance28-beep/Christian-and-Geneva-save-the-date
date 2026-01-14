import React, { createContext, useContext, useRef, ReactNode } from "react"

interface AudioContextType {
  audioRef: React.RefObject<HTMLAudioElement>
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(null)

  return (
    <AudioContext.Provider value={{ audioRef }}>
      {children}
    </AudioContext.Provider>
  )
}

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}

