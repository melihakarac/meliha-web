'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CONTACT } from '@/content'
import { ANIMATION, SECTION_IDS, VIEWPORT } from '@/constants'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: VIEWPORT.inViewMarginSection })

  return (
    <section id={SECTION_IDS.contact} className="py-section-y md:py-section-y-lg bg-surface relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-violet-700/8 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-12 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: ANIMATION.contactSectionDistance }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: ANIMATION.contactSectionDuration }}
        >
          <p className="font-body text-eyebrow text-text-lo uppercase mb-4">{CONTACT.eyebrow}</p>

          <h2 className="font-display font-black text-display-lg text-text-hi mb-6 break-words">
            {CONTACT.headline}
          </h2>

          <p className="font-body text-text-mid text-lg mb-10 max-w-xl leading-relaxed">
            {CONTACT.body}
          </p>

          <motion.a
            href={`mailto:${CONTACT.email}`}
            whileHover={{ x: ANIMATION.contactEmailHoverDistance }}
            transition={{
              type: 'spring',
              stiffness: ANIMATION.contactEmailSpringStiffness,
              damping: ANIMATION.contactEmailSpringDamping,
            }}
            className="inline-flex items-center gap-3 font-display font-bold text-xl md:text-2xl text-text-hi hover:text-violet-400 transition-default mb-10 group break-all"
          >
            {CONTACT.email}
            <span aria-hidden="true" className="text-text-lo group-hover:text-violet-400 transition-default">→</span>
          </motion.a>

          <div className="flex flex-wrap gap-3 mb-12">
            <a
              href={CONTACT.primaryCta.href}
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-body font-medium text-sm rounded-full transition-default"
            >
              {CONTACT.primaryCta.label}
            </a>
            <a
              href={CONTACT.secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:border-text-lo text-text-mid hover:text-text-hi font-body font-medium text-sm rounded-full transition-default"
            >
              {CONTACT.secondaryCta.label}
            </a>
          </div>

          <div className="flex flex-wrap gap-2">
            {CONTACT.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-text-lo hover:text-text-hi transition-default px-2 py-2 -mx-2 underline-offset-4 hover:underline"
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
