'use client'

import { motion } from 'framer-motion'
import { BubbleBackground } from '@/components/animate-ui/components/backgrounds/bubble'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.3 } },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-bg"
    >
      {/* Animated background — sits below all content, click-through */}
      <div className="absolute inset-0 pointer-events-none">
        {/* opacity: dim the bubbles so headline contrast holds. pointer-events:auto on the inner so the interactive bubble responds */}
        <div className="absolute inset-0 opacity-60 pointer-events-auto">
          <BubbleBackground interactive className="absolute inset-0" />
        </div>
        {/* Vignette layers — protect headline contrast against the saturated bg */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-bg/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/60 via-transparent to-bg/30" />
      </div>

      {/* Content — max-w-6xl matches global container; nav offset accounted for via pt-28 */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-12 w-full pt-28 pb-24 relative">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl">

          {/* Eyebrow — uses fontSize.eyebrow token from tailwind config */}
          <motion.p
            variants={item}
            className="font-body text-eyebrow text-text-lo uppercase mb-6"
          >
            Software Engineer · Remote
          </motion.p>

          {/* Display name — uses display-xl fluid type token */}
          <motion.h1
            variants={item}
            className="font-display font-black uppercase text-display-xl text-text-hi"
          >
            Meliha
            <br />
            <span className="gradient-text">Karac</span>
          </motion.h1>

          {/* Tagline — sized down from headline; sets up senior signal in one line */}
          <motion.p
            variants={item}
            className="mt-8 font-display font-semibold text-display-md text-text-mid max-w-2xl"
          >
            I ship features end-to-end.{' '}
            <span className="text-text-lo">Frontend-deep, full-stack capable, comfortable in regulated production.</span>
          </motion.p>

          {/* Stack — small, secondary, scannable */}
          <motion.p
            variants={item}
            className="mt-5 font-body text-sm tracking-wide text-text-lo"
          >
            React · Next.js · TypeScript · Node.js · PostgreSQL
          </motion.p>

          {/* CTAs — 44px+ touch targets via py-3 + line-height */}
          <motion.div variants={item} className="mt-10 flex flex-wrap gap-3">
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-body font-medium text-sm rounded-full transition-default"
            >
              View work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:border-text-lo text-text-mid hover:text-text-hi font-body font-medium text-sm rounded-full transition-default"
            >
              Get in touch
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint — hidden on mobile (no point in vertically tight hero) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-10"
      >
        <span className="font-body text-[10px] tracking-[0.2em] uppercase text-text-lo">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="block w-px h-8 bg-gradient-to-b from-text-lo to-transparent"
        />
      </motion.div>
    </section>
  )
}
