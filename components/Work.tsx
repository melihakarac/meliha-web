'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const projects = [
  {
    id: '01',
    name: 'Global Fintech Platform',
    category: 'Fintech',
    year: '2024 — Present', // [TODO: replace with real timeframe]
    description:
      'Dashboard and onboarding flows for a financial services platform operating across multiple markets. Built in React + TypeScript, with a focus on form-heavy UX and handling regulatory edge cases cleanly.',
    tech: ['React', 'TypeScript', 'Next.js'],
    link: '#', // [TODO: replace with real URL]
  },
  {
    id: '02',
    name: 'Healthcare SaaS',
    category: 'Healthcare',
    year: '2021 — 2022', // [TODO: replace with real timeframe]
    description:
      'Patient-facing and internal tooling for a health data platform. Worked on data visualization components and a design system used across three separate product surfaces.',
    tech: ['React', 'TypeScript', 'Design Systems'],
    link: '#', // [TODO: replace with real URL]
  },
  {
    id: '03',
    name: 'Adtech Platform',
    category: 'Adtech',
    year: '2022 — 2023', // [TODO: replace with real timeframe]
    description:
      'High-traffic publisher-side tooling. Performance was the main constraint — optimized rendering for components updating on real-time bid data.',
    tech: ['React', 'Next.js', 'Performance'],
    link: '#', // [TODO: replace with real URL]
  },
]

type Project = (typeof projects)[0]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    const cy = -((e.clientX - rect.left - rect.width / 2) / (rect.width / 2))
    setTilt({ x: cx * 4, y: cy * 4 })
  }

  const onMouseLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        style={{ transformStyle: 'preserve-3d', perspective: 800 }}
        className="group relative bg-surface border border-border rounded-2xl p-8 hover:border-violet-500/30 transition-colors duration-300 h-full"
      >
        {/* Number + category */}
        <div className="flex items-start justify-between mb-6">
          <span className="font-display font-black text-5xl text-border select-none">{project.id}</span>
          <span className="font-body text-xs text-text-lo border border-border px-3 py-1 rounded-full">
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-2xl text-text-hi mb-3 group-hover:text-violet-400 transition-colors duration-300">
          {project.name}
        </h3>

        {/* Description */}
        <p className="font-body text-text-lo text-sm leading-relaxed mb-6">{project.description}</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t) => (
            <span key={t} className="font-body text-xs text-text-lo border border-border/50 px-2.5 py-0.5 rounded">
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto">
          <span className="font-body text-xs text-text-lo">{project.year}</span>
          <a
            href={project.link}
            className="font-body text-xs text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100 duration-200"
          >
            View project
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        {/* Hover gradient overlay */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-violet-600/5 via-transparent to-cyan-600/5" />
      </motion.div>
    </motion.div>
  )
}

export default function Work() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="work" className="py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-body text-xs tracking-[0.22em] uppercase text-text-lo mb-4">Work</p>
          <h2 className="font-display font-black text-[clamp(2.4rem,5vw,4.5rem)] text-text-hi leading-[1.05]">
            Featured Projects
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
