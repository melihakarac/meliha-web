'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SKILLS } from '@/content'
import { ANIMATION, SECTION_IDS, VIEWPORT } from '@/constants'

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: VIEWPORT.inViewMarginSection })

  return (
    <section id={SECTION_IDS.skills} className="py-section-y md:py-section-y-lg bg-bg">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: ANIMATION.sectionFadeDistance }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: ANIMATION.sectionFadeDuration }}
          className="mb-12 md:mb-16"
        >
          <p className="font-body text-eyebrow text-text-lo uppercase mb-4">{SKILLS.eyebrow}</p>
          <h2 className="font-display font-black text-display-lg text-text-hi max-w-3xl break-words">
            {SKILLS.headline}
          </h2>
        </motion.div>

        <div className="divide-y divide-border">
          {SKILLS.groups.map((group, gi) => (
            <motion.div
              key={group.area}
              initial={{ opacity: 0, y: ANIMATION.skillsRowDistance }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: ANIMATION.skillsRowDuration,
                delay: gi * ANIMATION.skillsRowStagger + ANIMATION.skillsRowDelayBase,
              }}
              className="py-10 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-5 md:gap-12 items-start"
            >
              <p
                className="font-display font-bold text-xs tracking-[0.18em] uppercase"
                style={{ color: group.accent }}
              >
                {group.area}
              </p>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      delay:
                        gi * ANIMATION.skillsRowStagger +
                        si * ANIMATION.skillsChipStagger +
                        ANIMATION.skillsChipDelayBase,
                    }}
                    className="px-4 py-2 font-body text-sm text-text-mid border border-border rounded-full hover:border-text-lo hover:text-text-hi transition-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
