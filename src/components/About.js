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
            Software Developer specializing in React and Next.js, with a focus on 
            building scalable, user-friendly applications. Skilled in performance 
            optimization, troubleshooting, and intuitive design.
          </p>
          <p className="about-description">
            Adept at bridging technical and business needs to deliver high-quality, 
            innovative solutions. Experienced in agile methodologies and collaborative 
            cross-functional team environments.
          </p>
          <div ref={highlightsRef} className="about-highlights scroll-reveal-scale">
            <div className="highlight-item hover-lift">
              <h3 className="highlight-number">5+</h3>
              <p className="highlight-label">Years Experience</p>
            </div>
            <div className="highlight-item hover-lift">
              <h3 className="highlight-number">6+</h3>
              <p className="highlight-label">Projects Delivered</p>
            </div>
            <div className="highlight-item hover-lift">
              <h3 className="highlight-number">100%</h3>
              <p className="highlight-label">Client Satisfaction</p>
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
