'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const socials = [
  { label: 'GitHub', href: 'https://github.com/melihakarac' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/melihakarac/' },
]

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="py-section-y md:py-section-y-lg bg-surface relative overflow-hidden">
      {/* Single soft glow at base — visual anchor, no decoration creep */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-violet-700/8 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-12 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-body text-eyebrow text-text-lo uppercase mb-4">Contact</p>

          <h2 className="font-display font-black text-display-lg text-text-hi mb-6">
            Let&apos;s talk.
          </h2>

          {/* Body — comfortable reading column */}
          <p className="font-body text-text-mid text-lg mb-10 max-w-xl leading-relaxed">
            Open to senior frontend or full-stack roles, remote.
            Email is the fastest way to reach me — I read everything.
          </p>

          {/* Email link — large, hover-shifted, primary affordance */}
          <motion.a
            href="mailto:meliha.karacc@gmail.com"
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="inline-flex items-center gap-3 font-display font-bold text-xl md:text-2xl text-text-hi hover:text-violet-400 transition-default mb-10 group"
          >
            meliha.karacc@gmail.com
            <span className="text-text-lo group-hover:text-violet-400 transition-default">→</span>
          </motion.a>

          {/* CTA row — primary + secondary, 44px+ touch targets */}
          <div className="flex flex-wrap gap-3 mb-12">
            <a
              href="mailto:meliha.karacc@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-body font-medium text-sm rounded-full transition-default"
            >
              Get in touch
            </a>
            <a
              href="https://github.com/melihakarac"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:border-text-lo text-text-mid hover:text-text-hi font-body font-medium text-sm rounded-full transition-default"
            >
              View my GitHub
            </a>
          </div>

          {/* Social links — bumped padding for 44px touch height */}
          <div className="flex flex-wrap gap-2">
            {socials.map((s) => (
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
