'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu when a link is clicked
  const closeMenu = () => setOpen(false)

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-default ${
        scrolled || open ? 'blur-backdrop bg-bg/85 border-b border-border' : 'bg-transparent'
      }`}
    >
      {/* Bar — fixed 64px height for predictable layout offset */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-12 flex items-center justify-between h-16">
        <a
          href="#"
          onClick={closeMenu}
          className="font-display font-extrabold text-eyebrow text-text-hi uppercase hover:text-violet-400 transition-default"
          aria-label="Home"
        >
          MK
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-body text-sm text-text-mid hover:text-text-hi transition-default"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="mailto:meliha.karacc@gmail.com"
          className="hidden md:inline-flex items-center text-xs font-body border border-border px-4 py-2 rounded-full text-text-mid hover:border-violet-500/60 hover:text-text-hi transition-default"
        >
          Email
        </a>

        {/* Mobile hamburger — 44x44 touch target */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="md:hidden flex items-center justify-center w-11 h-11 -mr-2 text-text-mid hover:text-text-hi transition-default"
        >
          <span className="relative w-5 h-3.5 flex flex-col justify-between">
            <span
              className={`block h-px w-full bg-current transition-default origin-center ${
                open ? 'translate-y-[6px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-px w-full bg-current transition-default ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block h-px w-full bg-current transition-default origin-center ${
                open ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile sheet — full-bleed below the bar */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="md:hidden border-t border-border"
          >
            <ul className="px-6 py-6 flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block font-display font-semibold text-2xl text-text-hi py-3 hover:text-violet-400 transition-default"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <a
                  href="mailto:meliha.karacc@gmail.com"
                  onClick={closeMenu}
                  className="inline-flex items-center text-sm font-body border border-border px-5 py-3 rounded-full text-text-mid"
                >
                  Email
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
