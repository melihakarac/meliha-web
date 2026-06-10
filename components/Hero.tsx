'use client'

import { motion } from 'framer-motion'
import { BubbleBackground } from '@/components/animate-ui/components/backgrounds/bubble'
import { HERO } from '@/content'
import { ANIMATION, EASE_OUT_QUART, SECTION_IDS } from '@/constants'

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: ANIMATION.heroStaggerChildren,
      delayChildren: ANIMATION.heroDelayChildren,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: ANIMATION.heroItemDistance },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: ANIMATION.heroItemDuration, ease: EASE_OUT_QUART },
  },
}

export default function Hero() {
  return (
    <section
      id={SECTION_IDS.hero}
      className="relative min-h-screen flex items-center overflow-hidden bg-bg"
    >
      <div className="absolute inset-0 pointer-events-none">
        {/* opacity dims bubbles so headline contrast holds; inner pointer-events:auto keeps the interactive bubble responsive */}
        <div className="absolute inset-0 opacity-60 pointer-events-auto">
          <BubbleBackground interactive className="absolute inset-0" />
        </div>
        {/* Vignette layers protect headline contrast against the saturated bg */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-bg/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/60 via-transparent to-bg/30" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-12 w-full pt-28 pb-24 relative">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl">
          <motion.p
            variants={item}
            className="font-body text-eyebrow text-text-lo uppercase mb-6"
          >
            {HERO.eyebrow}
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display font-black uppercase text-display-xl text-text-hi break-words"
          >
            {HERO.firstName}
            <br />
            <span className="gradient-text">{HERO.lastName}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 font-display font-semibold text-display-md text-text-mid max-w-2xl"
          >
            {HERO.taglineLead}
            <br />
            <span className="text-text-lo">{HERO.taglineMuted}</span>
          </motion.p>

          <motion.p
            variants={item}
            className="mt-5 font-body text-sm tracking-wide text-text-lo"
          >
            {HERO.stack}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-3">
            <a
              href={HERO.primaryCta.href}
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-body font-medium text-sm rounded-full transition-default"
            >
              {HERO.primaryCta.label}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </a>
            <a
              href={HERO.secondaryCta.href}
              className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:border-text-lo text-text-mid hover:text-text-hi font-body font-medium text-sm rounded-full transition-default"
            >
              {HERO.secondaryCta.label}
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: ANIMATION.scrollHintDelay, duration: ANIMATION.scrollHintDuration }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-10"
      >
        <span className="font-body text-[10px] tracking-[0.2em] uppercase text-text-lo">{HERO.scrollLabel}</span>
        <motion.span
          animate={{ y: [...ANIMATION.scrollIndicatorTravel] }}
          transition={{ duration: ANIMATION.scrollIndicatorDuration, repeat: Infinity, ease: 'easeInOut' }}
          className="block w-px h-8 bg-gradient-to-b from-text-lo to-transparent"
        />
      </motion.div>
    </section>
  )
}
