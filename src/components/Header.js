import React, { useState, useEffect, useMemo, useCallback } from 'react';

import { useSmoothScroll } from '../hooks';
import { getNavLinks, UI_CONFIG } from '../constants';
import { t } from '../i18n';

import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { handleScrollClick } = useSmoothScroll();
  const navLinks = useMemo(() => getNavLinks(), []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > UI_CONFIG.SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, UI_CONFIG.INTERSECTION_OBSERVER);

    UI_CONFIG.SECTION_IDS.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleNavClick = (e, sectionId) => {
    handleScrollClick(e, sectionId, () => setIsMenuOpen(false));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div
        className={`menu-overlay ${isMenuOpen ? 'overlay-visible' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
      <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
        <nav className="navbar">
          <div className="navbar-brand">
            <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className="logo">
              <span className="logo-bracket">&lt;</span>
              <span className="logo-letter">M</span>
              <span className="logo-bracket">/&gt;</span>
            </a>
          </div>

          <button
            className={`menu-toggle ${isMenuOpen ? 'menu-open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className="navbar-nav desktop-nav">
            {navLinks.map((link) => (
              <li key={link.id} className="nav-item">
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="nav-link"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="nav-item nav-cta">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="btn btn-primary btn-sm"
              >
                {t('nav.contact')}
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Mobile menu - outside header for proper z-index stacking */}
      <ul className={`mobile-nav ${isMenuOpen ? 'nav-open' : ''}`}>
        {navLinks.map((link) => (
          <li key={link.id} className="nav-item">
            <a
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className={`nav-link ${activeSection === link.id ? 'nav-link-active' : ''}`}
            >
              {link.label}
            </a>
          </li>
        ))}
        <li className="nav-item nav-cta">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="btn btn-primary btn-sm"
          >
            {t('nav.contact')}
          </a>
        </li>
      </ul>
    </>
  );
};

export default Header;
