'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'blur-backdrop bg-bg/80 border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        <a
          href="#"
          className="font-display font-extrabold text-sm tracking-[0.2em] text-text-hi uppercase hover:text-violet-400 transition-colors duration-200"
        >
          MK
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-body text-sm text-text-mid hover:text-text-hi transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="mailto:meliha.karacc@gmail.com"
          className="hidden md:inline-flex text-xs font-body border border-border px-4 py-1.5 rounded-full text-text-mid hover:border-violet-500/60 hover:text-text-hi transition-all duration-200"
        >
          Hire me
        </a>

        {/* Mobile: just show email icon */}
        <a
          href="mailto:meliha.karacc@gmail.com"
          className="md:hidden text-text-lo hover:text-text-hi transition-colors"
          aria-label="Email"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </a>
      </div>
    </motion.nav>
  )
}
