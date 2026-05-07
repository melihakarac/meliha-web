'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  // Only render on devices with a real pointer (hover-capable, fine pointer).
  // Skipping on touch devices avoids weird drag artefacts and saves work.
  const [enabled, setEnabled] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const dotX = useSpring(mouseX, { damping: 25, stiffness: 700 })
  const dotY = useSpring(mouseY, { damping: 25, stiffness: 700 })

  const ringX = useSpring(mouseX, { damping: 20, stiffness: 180 })
  const ringY = useSpring(mouseY, { damping: 20, stiffness: 180 })

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setEnabled(mq.matches)
    const listener = (e: MediaQueryListEvent) => setEnabled(e.matches)
    mq.addEventListener('change', listener)
    return () => mq.removeEventListener('change', listener)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [enabled, mouseX, mouseY])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="fixed z-[9999] top-0 left-0 w-2 h-2 rounded-full bg-violet-400 pointer-events-none mix-blend-difference"
        style={{ translateX: dotX, translateY: dotY, x: -4, y: -4 }}
      />
      <motion.div
        className="fixed z-[9998] top-0 left-0 w-8 h-8 rounded-full border border-violet-500/50 pointer-events-none"
        style={{ translateX: ringX, translateY: ringY, x: -16, y: -16 }}
      />
    </>
  )
}
