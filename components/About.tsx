'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '5+', label: 'Years in production' },
  { value: '4', label: 'Industries' },
  { value: '6+', label: 'Projects shipped' },
  { value: 'Remote', label: 'Working model' },
]

const stack = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'MongoDB',
  'React Native',
  'AWS',
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    /* section: 96/128px vertical rhythm — applied consistently across sections */
    <section id="about" className="py-section-y md:py-section-y-lg bg-bg">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-12">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <motion.p variants={itemVariants} className="font-body text-eyebrow text-text-lo uppercase mb-4">
            About
          </motion.p>

          {/* H2 uses display-lg token; tightened bottom margin to keep section rhythm */}
          <motion.h2
            variants={itemVariants}
            className="font-display font-black text-display-lg text-text-hi mb-12 md:mb-16 max-w-4xl"
          >
            Frontend-deep full-stack engineer.
            <br />
            <span className="text-text-lo">Five years shipping production software.</span>
          </motion.h2>

          {/* Two-column on desktop; stacks on mobile/tablet — 2/3 reading column + stat panel */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16">

            {/* Bio — peer-to-peer voice, ownership verbs */}
            <motion.div variants={itemVariants} className="space-y-5 max-w-prose">
              <p className="font-body text-text-mid text-lg leading-relaxed">
                Five years shipping production web apps. React, Next.js, and TypeScript on the frontend;
                Node.js, REST, and PostgreSQL/MongoDB once the work crosses the wire.
              </p>
              <p className="font-body text-text-mid leading-relaxed">
                I work at Ministry of Programming — a consultancy — which means dropping into unfamiliar
                codebases, ramping fast, and shipping under client and compliance pressure. Domains have
                included fintech (KYC, deposits, withdrawals), healthcare admin tooling, adtech SDK
                dashboards, and internal back-office systems.
              </p>
              <p className="font-body text-text-mid leading-relaxed">
                I&apos;m best when I can own a feature end-to-end: API contract, data model, UI. Most of
                my time is in the frontend, but I&apos;d rather understand the full system than throw
                work over the wall.
              </p>
              <p className="font-body text-text-mid leading-relaxed">
                Currently in Bosnia &amp; Herzegovina. Open to remote senior roles.
              </p>

              {/* Stack chips — consistent rounded-full pills, 44px touch height */}
              <div className="pt-4 flex flex-wrap gap-2">
                {stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs font-body border border-border text-text-mid rounded-full hover:border-violet-500/50 hover:text-text-hi transition-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Stats grid — 2x2, hairline-divided, consistent card radius */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-px bg-border rounded-card overflow-hidden self-start"
            >
              {stats.map((stat) => (
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
