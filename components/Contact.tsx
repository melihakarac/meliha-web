'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const socials = [
  { label: 'GitHub', href: 'https://github.com/melihakarac' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/melihakarac/' },
  { label: 'Telegram', href: 'https://t.me/melihakarac' },
]

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="py-32 bg-surface relative overflow-hidden">
      {/* Bottom glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-violet-700/8 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-body text-xs tracking-[0.22em] uppercase text-text-lo mb-4">Contact</p>

          <h2 className="font-display font-black text-[clamp(3rem,6.5vw,5.5rem)] text-text-hi leading-[1.03] mb-8">
            Let&apos;s
            <br />
            <span className="gradient-text">talk.</span>
          </h2>

          <p className="font-body text-text-mid text-lg mb-12 max-w-xl leading-relaxed">
            I&apos;m currently exploring new roles. If you&apos;re building something interesting
            and need someone who takes the frontend seriously — let&apos;s talk.
          </p>

          <motion.a
            href="mailto:meliha.karacc@gmail.com"
            whileHover={{ x: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="inline-flex items-center gap-3 font-display font-bold text-xl text-text-hi hover:text-violet-400 transition-colors duration-200 mb-12 group"
          >
            meliha.karacc@gmail.com
            <span className="text-text-lo group-hover:text-violet-400 transition-colors duration-200">→</span>
          </motion.a>

          <div className="flex flex-wrap gap-3 mb-12">
            <a
              href="mailto:meliha.karacc@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-body font-medium text-sm rounded-full transition-colors duration-200"
            >
              Get in touch
            </a>
            <a
              href="https://github.com/melihakarac"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:border-text-lo text-text-mid hover:text-text-hi font-body font-medium text-sm rounded-full transition-all duration-200"
            >
              View my GitHub
            </a>
          </div>

          <div className="flex flex-wrap gap-8">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-text-lo hover:text-text-hi transition-colors duration-200 underline-offset-4 hover:underline"
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
