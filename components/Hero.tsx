'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false })

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.3 },
  },
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
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-[40%] left-[15%] -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-violet-700/10 blur-[140px]" />
        <div className="absolute top-[50%] right-[10%] -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/6 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-24 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* ─── Text column ─── */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="font-body text-xs tracking-[0.22em] uppercase text-text-lo mb-7"
          >
            Software Developer · Remote
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display font-black uppercase leading-[0.95] tracking-tight text-[clamp(4rem,9vw,7.5rem)] text-text-hi"
          >
            Meliha
            <br />
            <span className="gradient-text">Karac</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 font-display font-semibold text-[clamp(1.1rem,2.2vw,1.5rem)] text-text-mid"
          >
            Senior Software Developer
          </motion.p>

          <motion.p
            variants={item}
            className="mt-4 font-body text-text-mid text-base leading-relaxed max-w-[460px]"
          >
            I work across the stack, but the frontend is where I leave fingerprints.
          </motion.p>

          <motion.p
            variants={item}
            className="mt-3 font-body text-text-lo text-sm leading-relaxed max-w-[460px]"
          >
            React · Next.js · TypeScript · Node.js · AWS
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-3">
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-body font-medium text-sm rounded-full transition-colors duration-200"
            >
              View Work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:border-text-lo text-text-mid hover:text-text-hi font-body font-medium text-sm rounded-full transition-all duration-200"
            >
              Contact
            </a>
          </motion.div>
        </motion.div>

        {/* ─── 3D Blob column ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
          className="hidden lg:block w-full aspect-square max-w-[520px] mx-auto"
        >
          <HeroScene />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
