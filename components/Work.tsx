'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { WORK } from '@/content'
import { ANIMATION, EASE_OUT_QUART, SECTION_IDS, VIEWPORT } from '@/constants'

type Project = (typeof WORK.projects)[number]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: VIEWPORT.inViewMarginCard })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    const cy = -((e.clientX - rect.left - rect.width / 2) / (rect.width / 2))
    setTilt({ x: cx * ANIMATION.workCardTiltMaxDeg, y: cy * ANIMATION.workCardTiltMaxDeg })
  }

  const onMouseLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: ANIMATION.workCardDistance }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: ANIMATION.workCardDuration,
        delay: index * ANIMATION.workCardStagger,
        ease: EASE_OUT_QUART,
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{
          type: 'spring',
          stiffness: ANIMATION.workCardTiltStiffness,
          damping: ANIMATION.workCardTiltDamping,
        }}
        style={{ transformStyle: 'preserve-3d', perspective: ANIMATION.workCardPerspective }}
        className="group relative bg-surface border border-border rounded-card p-7 md:p-8 hover:border-violet-500/30 transition-default h-full"
      >
        <div className="flex items-start justify-between mb-5 gap-3">
          <span className="font-display font-black text-4xl text-border select-none leading-none">
            {project.id}
          </span>
          <span className="font-body text-[11px] tracking-wide text-text-lo border border-border px-2.5 py-1 rounded-full">
            {project.category}
          </span>
        </div>

        <h3 className="font-display font-bold text-2xl text-text-hi mb-3 group-hover:text-violet-400 transition-default break-words">
          {project.name}
        </h3>

        <p className="font-body text-text-mid text-sm leading-relaxed mb-6">
          {project.description}
        </p>

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

        <div className="flex items-center justify-between mt-auto gap-3">
          <span className="font-body text-xs text-text-lo">{project.year}</span>
          <span className="font-body text-xs text-text-lo italic">{WORK.ndaLabel}</span>
        </div>

        <div className="absolute inset-0 rounded-card opacity-0 group-hover:opacity-100 transition-default pointer-events-none bg-gradient-to-br from-violet-600/5 via-transparent to-cyan-600/5" />
      </motion.div>
    </motion.div>
  )
}

export default function Work() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: VIEWPORT.inViewMarginSection })

  return (
    <section id={SECTION_IDS.work} className="py-section-y md:py-section-y-lg bg-surface">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: ANIMATION.sectionFadeDistance }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: ANIMATION.sectionFadeDuration }}
          className="mb-12 md:mb-16"
        >
          <p className="font-body text-eyebrow text-text-lo uppercase mb-4">{WORK.eyebrow}</p>
          <h2 className="font-display font-black text-display-lg text-text-hi max-w-3xl break-words">
            {WORK.headline}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {WORK.projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
