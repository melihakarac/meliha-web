'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ABOUT } from '@/content'
import { ANIMATION, SECTION_IDS, VIEWPORT } from '@/constants'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: ANIMATION.aboutStaggerChildren } },
}

const itemVariants = {
  hidden: { opacity: 0, y: ANIMATION.aboutItemDistance },
  show: { opacity: 1, y: 0, transition: { duration: ANIMATION.aboutItemDuration, ease: 'easeOut' } },
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: VIEWPORT.inViewMarginSection })

  return (
    <section id={SECTION_IDS.about} className="py-section-y md:py-section-y-lg bg-bg">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-12">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <motion.p variants={itemVariants} className="font-body text-eyebrow text-text-lo uppercase mb-4">
            {ABOUT.eyebrow}
          </motion.p>

          <motion.h2
            variants={itemVariants}
            className="font-display font-black text-display-lg text-text-hi mb-12 md:mb-16 max-w-3xl break-words"
          >
            {ABOUT.headlineLead}
            <br />
            <span className="text-text-lo">{ABOUT.headlineMuted}</span>
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16">
            <motion.div variants={itemVariants} className="space-y-5 max-w-prose">
              {ABOUT.bio.map((paragraph, i) => (
                <p
                  key={i}
                  className={`font-body text-text-mid leading-relaxed ${i === 0 ? 'text-lg' : ''}`}
                >
                  {paragraph}
                </p>
              ))}

              <div className="pt-4 flex flex-wrap gap-2">
                {ABOUT.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs font-body border border-border text-text-mid rounded-full hover:border-violet-500/50 hover:text-text-hi transition-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-px bg-border rounded-card overflow-hidden self-start"
            >
              {ABOUT.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-bg p-6 lg:p-7 hover:bg-surface transition-default"
                >
                  <p className="font-display font-black text-3xl lg:text-4xl text-text-hi leading-none">
                    {stat.value}
                  </p>
                  <p className="font-body text-text-lo text-xs lg:text-sm mt-2">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
