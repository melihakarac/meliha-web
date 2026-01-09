import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants/sections';
import Button from './common/Button';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <nav className="navbar">
        <div className="navbar-brand">
          <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')}>
            Meliha
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
          {NAV_LINKS.map((link) => (
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
          <li className="nav-item">
            <Button 
              href="#contact" 
              onClick={(e) => handleNavClick(e, 'contact')}
              variant="primary"
              size="sm"
            >
              Get In Touch
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
