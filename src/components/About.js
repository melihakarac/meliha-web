import React from 'react';
import Section from './common/Section';
import useScrollReveal from '../hooks/useScrollReveal';
import './About.css';

const About = () => {
  const textRef = useScrollReveal();
  const imageRef = useScrollReveal();
  const highlightsRef = useScrollReveal();

  return (
    <Section id="about" subtitle="About Me" title="Get to Know Me">
      <div className="about-content">
        <div ref={textRef} className="about-text scroll-reveal">
          <p className="about-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex 
            ea commodo consequat.
          </p>
          <p className="about-description">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div ref={highlightsRef} className="about-highlights scroll-reveal-scale">
            <div className="highlight-item hover-lift">
              <h3 className="highlight-number">XX+</h3>
              <p className="highlight-label">Label One</p>
            </div>
            <div className="highlight-item hover-lift">
              <h3 className="highlight-number">XX+</h3>
              <p className="highlight-label">Label Two</p>
            </div>
            <div className="highlight-item hover-lift">
              <h3 className="highlight-number">XX+</h3>
              <p className="highlight-label">Label Three</p>
            </div>
          </div>
        </div>
        <div ref={imageRef} className="about-image scroll-reveal-right">
          <div className="image-placeholder hover-grow">
            <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
              <circle cx="150" cy="150" r="150" fill="#e5e7eb"/>
              <circle cx="150" cy="130" r="40" fill="#9ca3af"/>
              <ellipse cx="150" cy="200" rx="70" ry="50" fill="#9ca3af"/>
            </svg>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
