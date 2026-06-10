'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { CURSOR } from '@/constants'

export default function CustomCursor() {
  // Only render on devices with a real pointer (hover-capable, fine pointer).
  // Skipping on touch devices avoids weird drag artefacts and saves work.
  const [enabled, setEnabled] = useState(false)

  const mouseX = useMotionValue<number>(CURSOR.offscreen)
  const mouseY = useMotionValue<number>(CURSOR.offscreen)

  const dotX = useSpring(mouseX, { damping: CURSOR.dotSpringDamping, stiffness: CURSOR.dotSpringStiffness })
  const dotY = useSpring(mouseY, { damping: CURSOR.dotSpringDamping, stiffness: CURSOR.dotSpringStiffness })

  const ringX = useSpring(mouseX, { damping: CURSOR.ringSpringDamping, stiffness: CURSOR.ringSpringStiffness })
  const ringY = useSpring(mouseY, { damping: CURSOR.ringSpringDamping, stiffness: CURSOR.ringSpringStiffness })

  useEffect(() => {
    const mq = window.matchMedia(CURSOR.pointerMediaQuery)
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
        style={{ translateX: dotX, translateY: dotY, x: CURSOR.dotOffset, y: CURSOR.dotOffset }}
      />
      <motion.div
        className="fixed z-[9998] top-0 left-0 w-8 h-8 rounded-full border border-violet-500/50 pointer-events-none"
        style={{ translateX: ringX, translateY: ringY, x: CURSOR.ringOffset, y: CURSOR.ringOffset }}
      />
    </>
  )
}
