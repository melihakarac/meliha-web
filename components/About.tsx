'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '5+', label: 'Years experience' },
  { value: '6+', label: 'Projects shipped' },
  { value: '4', label: 'Industries' },
  { value: 'Remote', label: 'Working style' },
]

const stack = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'AWS',
  'React Native',
  'MongoDB',
  'Tailwind CSS',
  'Shopify',
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-32 bg-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <motion.p variants={itemVariants} className="font-body text-xs tracking-[0.22em] uppercase text-text-lo mb-4">
            About
          </motion.p>

          <motion.h2
            variants={itemVariants}
            className="font-display font-black text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.05] text-text-hi mb-16 max-w-4xl"
          >
            Frontend-leaning full-stack engineer.
            <br />
            <span className="text-text-lo">Open to remote senior roles.</span>
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Bio */}
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="font-body text-text-mid text-lg leading-relaxed">
                I&apos;m a frontend-leaning full-stack engineer based in Bosnia &amp; Herzegovina,
                currently open to remote senior roles.
              </p>
              <p className="font-body text-text-mid leading-relaxed">
                Over the past five years I&apos;ve built production software across fintech,
                healthcare, adtech, and e-commerce — mostly at a consultancy, which means
                I&apos;ve had to get up to speed fast, work across codebases I didn&apos;t write,
                and still ship quality work on deadline.
              </p>
              <p className="font-body text-text-mid leading-relaxed">
                My stack centers around React, Next.js, and TypeScript, with enough
                Node.js and AWS to own a feature end-to-end when needed.
              </p>
              <p className="font-body text-text-mid leading-relaxed">
                I care about the details — performance, accessibility, the gap between
                a design file and what actually renders in a browser.
              </p>

              {/* Stack chips */}
              <div className="pt-2 flex flex-wrap gap-2">
                {stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-body border border-border text-text-lo rounded-full hover:border-violet-500/50 hover:text-text-mid transition-all duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Stats grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-bg p-8 hover:bg-surface transition-colors duration-200">
                  <p className="font-display font-black text-4xl text-text-hi">{stat.value}</p>
                  <p className="font-body text-text-lo text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
