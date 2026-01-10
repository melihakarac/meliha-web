import React, { useState, useEffect, useMemo } from 'react';

import { Button } from './common';
import { useSmoothScroll } from '../hooks';
import { getNavLinks } from '../constants';
import { t } from '../i18n';

import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { handleScrollClick } = useSmoothScroll();
  const navLinks = useMemo(() => getNavLinks(), []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, sectionId) => {
    handleScrollClick(e, sectionId, () => setIsMenuOpen(false));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
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
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar-nav ${isMenuOpen ? 'nav-open' : ''}`}>
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
            <Button
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              variant="primary"
              size="sm"
            >
              {t('nav.contact')}
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
