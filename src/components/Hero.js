import React from 'react';
import Container from './common/Container';
import Button from './common/Button';
import './Hero.css';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="hero">
      <Container>
        <div className="hero-content">
          <p className="hero-greeting">Hello, I'm</p>
          <h1 className="hero-name">
            <span className="hero-name-first">Meliha</span>
            <span className="hero-name-last">Lastname</span>
          </h1>
          <h2 className="hero-title">
            <span className="hero-title-line">Your Title Here</span>
            <span className="hero-title-line">& Another Title</span>
          </h2>
          <p className="hero-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="hero-buttons">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => scrollToSection('projects')}
            >
              View My Work
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => scrollToSection('contact')}
            >
              Get In Touch
            </Button>
          </div>
          <div className="hero-scroll">
            <a href="#about" onClick={(e) => {
              e.preventDefault();
              scrollToSection('about');
            }}>
              <span>Scroll Down</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
