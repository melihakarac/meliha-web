'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * Three groups, scannable, no filler. CV-anchored — only tech actually
 * shipped in production lives here.
 */
const groups = [
  {
    area: 'Frontend',
    accent: '#7c3aed',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'React Native', 'HTML', 'CSS'],
  },
  {
    area: 'Backend',
    accent: '#06b6d4',
    skills: ['Node.js', 'REST APIs', '.NET integration', 'PostgreSQL', 'MongoDB'],
  },
  {
    area: 'Infra & Tooling',
    accent: '#d946ef',
    skills: ['AWS', 'CI/CD', 'Shopify / Liquid'],
  },
]

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-section-y md:py-section-y-lg bg-bg">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <p className="font-body text-eyebrow text-text-lo uppercase mb-4">Stack</p>
          <h2 className="font-display font-black text-display-lg text-text-hi max-w-3xl">
            What I work with.
          </h2>
        </motion.div>

        {/* Hairline-divided rows; 200px sticky-feel label column on desktop */}
        <div className="divide-y divide-border">
          {groups.map((group, gi) => (
            <motion.div
              key={group.area}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: gi * 0.1 + 0.2 }}
              /* py-10 = 40px vertical rhythm between skill groups */
              className="py-10 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-5 md:gap-12 items-start"
            >
              <p
                className="font-display font-bold text-xs tracking-[0.18em] uppercase"
                style={{ color: group.accent }}
              >
                {group.area}
              </p>

              {/* Tag row — consistent pill height (~36px), 8px gap */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: gi * 0.1 + si * 0.04 + 0.3 }}
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
