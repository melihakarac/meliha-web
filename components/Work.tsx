'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * Project copy follows a strict three-sentence pattern:
 *   1. What it is (one sharp sentence)
 *   2. Technical challenge / context
 *   3. Outcome / what was shipped
 *
 * Names are neutral (no client names) since the work is under NDA.
 */
const projects = [
  {
    id: '01',
    name: 'Fintech Platform',
    category: 'Regulated Production',
    year: '2024 — Present',
    description:
      'Next.js platform for a regulated financial product, supporting KYC, deposits, and withdrawals. Frontend integrates a .NET backend through REST, with every flow constrained by regulatory and authentication requirements. Modernized high-traffic pages and shipped compliance-driven UX in live production.',
    tech: ['Next.js', 'TypeScript', 'REST APIs', '.NET'],
  },
  {
    id: '02',
    name: 'Internal Operations Tool',
    category: 'Internal Tooling',
    year: '2022 — 2024',
    description:
      'Internal back-office system that replaced manual operator workflows. Led the MVP end-to-end — UI, API surface, and PostgreSQL data model — on a fixed delivery timeline. Shipped from zero to in-use software, then iterated on operator feedback to harden core flows.',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'REST'],
  },
  {
    id: '03',
    name: 'SDK Configuration Dashboard',
    category: 'Adtech',
    year: '2020 — 2022',
    description:
      'Dashboard for configuring embeddable widgets distributed to publishers via SDK. Built monetization and customization workflows on a Node.js + MongoDB backend, against a revenue-generating system where regressions had real cost. Shipped feature work and performance improvements into live production.',
    tech: ['React', 'Next.js', 'Node.js', 'MongoDB'],
  },
  {
    id: '04',
    name: 'Healthcare Admin System',
    category: 'Healthcare',
    year: '2021 — 2022',
    description:
      'Admin platform used by clinicians, with parity across web and React Native. The same product also exposed a Shopify/Liquid storefront and analytics/SEO instrumentation. Shipped feature work across both client surfaces and the storefront integration.',
    tech: ['React', 'React Native', 'Shopify', 'Liquid'],
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
    setTilt({ x: cx * 3, y: cy * 3 })
  }

  const onMouseLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        style={{ transformStyle: 'preserve-3d', perspective: 800 }}
        /* card: rounded-card token (12px), consistent inner padding 8 (32px) */
        className="group relative bg-surface border border-border rounded-card p-7 md:p-8 hover:border-violet-500/30 transition-default h-full"
      >
        {/* Header — id + category badge */}
        <div className="flex items-start justify-between mb-5">
          <span className="font-display font-black text-4xl text-border select-none leading-none">
            {project.id}
          </span>
          <span className="font-body text-[11px] tracking-wide text-text-lo border border-border px-2.5 py-1 rounded-full">
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-2xl text-text-hi mb-3 group-hover:text-violet-400 transition-default">
          {project.name}
        </h3>

        {/* Description — bumped from text-lo to text-mid for body legibility */}
        <p className="font-body text-text-mid text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Tech tags — consistent pill style with chip tokens */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-body text-[11px] text-text-lo border border-border/60 px-2 py-0.5 rounded-md"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer — year only; NDA = no public links */}
        <div className="flex items-center justify-between mt-auto">
          <span className="font-body text-xs text-text-lo">{project.year}</span>
          <span className="font-body text-xs text-text-lo italic">Under NDA</span>
        </div>

        {/* Hover gradient overlay — subtle */}
        <div className="absolute inset-0 rounded-card opacity-0 group-hover:opacity-100 transition-default pointer-events-none bg-gradient-to-br from-violet-600/5 via-transparent to-cyan-600/5" />
      </motion.div>
    </motion.div>
  )
}

export default function Work() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="work" className="py-section-y md:py-section-y-lg bg-surface">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <p className="font-body text-eyebrow text-text-lo uppercase mb-4">Selected work</p>
          <h2 className="font-display font-black text-display-lg text-text-hi max-w-3xl">
            Four projects, four industries.
          </h2>
        </motion.div>

        {/* 2-col grid on tablet+, single col on mobile; 16px gap between cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
