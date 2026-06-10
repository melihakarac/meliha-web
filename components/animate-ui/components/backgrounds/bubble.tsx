'use client'

import { useEffect, useRef, type ComponentProps, type CSSProperties } from 'react'
import { motion, useMotionValue, useSpring, type SpringOptions } from 'framer-motion'
import './bubble.css'

export interface BubbleColors {
  first?: string
  second?: string
  third?: string
  fourth?: string
  fifth?: string
  sixth?: string
}

export interface BubbleBackgroundProps extends ComponentProps<'div'> {
  /** Whether the background is interactive with mouse movement. */
  interactive?: boolean
  /** Spring transition config for the interactive bubble. */
  transition?: SpringOptions
  /** RGB triplets (e.g. "124,58,237") used for the six animated bubbles. */
  colors?: BubbleColors
}

const DEFAULT_COLORS: Required<BubbleColors> = {
  first: '18,113,255',
  second: '221,74,255',
  third: '0,220,255',
  fourth: '200,50,50',
  fifth: '180,180,50',
  sixth: '140,100,255',
}

const DEFAULT_TRANSITION: SpringOptions = { stiffness: 100, damping: 20 }

export function BubbleBackground({
  interactive = false,
  transition = DEFAULT_TRANSITION,
  colors,
  className = '',
  style,
  ...props
}: BubbleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const palette = { ...DEFAULT_COLORS, ...colors }

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, transition)
  const springY = useSpring(mouseY, transition)

  useEffect(() => {
    if (!interactive) return
    const el = containerRef.current
    if (!el) return

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left - rect.width / 2)
      mouseY.set(e.clientY - rect.top - rect.height / 2)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [interactive, mouseX, mouseY])

  // Palette → CSS custom properties; consumed by bubble.css
  const cssVars = {
    '--bb-color-1': palette.first,
    '--bb-color-2': palette.second,
    '--bb-color-3': palette.third,
    '--bb-color-4': palette.fourth,
    '--bb-color-5': palette.fifth,
    '--bb-color-6': palette.sixth,
  } as CSSProperties

  return (
    <div
      ref={containerRef}
      className={`bubble-bg ${className}`.trim()}
      style={{ ...cssVars, ...style }}
      {...props}
    >
      {/*
       * Goo filter — feGaussianBlur softens the bubble edges, then
       * feColorMatrix sharpens the alpha so overlapping bubbles fuse
       * into a single liquid blob rather than stacking.
       */}
      <svg className="bubble-bg-svg" aria-hidden="true">
        <defs>
          <filter id="bubble-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className="bubble-bg-bubbles">
        <div className="bubble bubble-1" />
        <div className="bubble bubble-2" />
        <div className="bubble bubble-3" />
        <div className="bubble bubble-4" />
        <div className="bubble bubble-5" />
        <div className="bubble bubble-6" />

        {interactive && (
          <motion.div
            className="bubble-interactive"
            style={{ x: springX, y: springY }}
          />
        )}
      </div>
    </div>
  )
}

export default BubbleBackground
