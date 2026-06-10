'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV, CONTACT_EMAIL } from '@/content'
import { ANIMATION, ROUTES, VIEWPORT } from '@/constants'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > VIEWPORT.navScrollThreshold)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setOpen(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <motion.nav
      initial={{ y: -ANIMATION.navEnterOffset, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: ANIMATION.navEnterDuration, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-default ${
        scrolled || open ? 'blur-backdrop bg-bg/85 border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-12 flex items-center justify-between h-16">
        <a
          href={ROUTES.home}
          onClick={closeMenu}
          className="font-display font-extrabold text-eyebrow text-text-hi uppercase hover:text-violet-400 transition-default"
          aria-label={NAV.homeAriaLabel}
        >
          {NAV.logoLabel}
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {NAV.links.map((link) => (
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

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="hidden md:inline-flex items-center text-xs font-body border border-border px-4 py-2 rounded-full text-text-mid hover:border-violet-500/60 hover:text-text-hi transition-default"
        >
          {NAV.ctaLabel}
        </a>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? NAV.closeMenuLabel : NAV.openMenuLabel}
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -ANIMATION.navMobileSheetOffset }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -ANIMATION.navMobileSheetOffset }}
            transition={{ duration: ANIMATION.navMobileSheetDuration, ease: 'easeOut' }}
            className="md:hidden border-t border-border"
          >
            <ul className="px-6 py-6 flex flex-col gap-1">
              {NAV.links.map((link) => (
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
                  href={`mailto:${CONTACT_EMAIL}`}
                  onClick={closeMenu}
                  className="inline-flex items-center text-sm font-body border border-border px-5 py-3 rounded-full text-text-mid"
                >
                  {NAV.ctaLabel}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
