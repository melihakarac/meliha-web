'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const groups = [
  {
    area: 'Frontend',
    accent: '#7c3aed',
    skills: ['React', 'Next.js', 'TypeScript', 'React Native', 'Tailwind CSS', 'Framer Motion', 'CSS / SCSS', 'HTML5'],
  },
  {
    area: 'Backend',
    accent: '#06b6d4',
    skills: ['Node.js', 'MongoDB', 'REST APIs', 'AWS', 'GraphQL'],
  },
  {
    area: 'Tools',
    accent: '#d946ef',
    skills: ['Git', 'Shopify', 'Amplitude', 'SEO', 'Performance Optimisation', 'Agile / Scrum'],
  },
]

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-32 bg-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-body text-xs tracking-[0.22em] uppercase text-text-lo mb-4">Skills</p>
          <h2 className="font-display font-black text-[clamp(2.4rem,5vw,4.5rem)] text-text-hi leading-[1.05]">
            The Toolkit
          </h2>
        </motion.div>

        <div className="divide-y divide-border">
          {groups.map((group, gi) => (
            <motion.div
              key={group.area}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: gi * 0.12 + 0.2 }}
              className="py-10 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-12 items-start"
            >
              <p
                className="font-display font-bold text-xs tracking-[0.18em] uppercase"
                style={{ color: group.accent }}
              >
                {group.area}
              </p>

              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: gi * 0.1 + si * 0.04 + 0.35 }}
                    className="px-4 py-2 font-body text-sm text-text-mid border border-border rounded-full hover:border-text-lo hover:text-text-hi transition-all duration-200"
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
