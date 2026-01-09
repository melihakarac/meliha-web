import React from 'react';
import Section from './common/Section';
import './About.css';

const About = () => {
  return (
    <Section id="about" subtitle="About Me" title="Get to Know Me">
      <div className="about-content">
        <div className="about-text">
          <p className="about-description">
            I'm a passionate web developer and designer with a love for creating 
            beautiful, functional, and user-centered digital experiences. With a 
            keen eye for detail and a drive for excellence, I bring ideas to life 
            through code and design.
          </p>
          <p className="about-description">
            My journey in web development started with a curiosity about how 
            websites work, and it has evolved into a career focused on crafting 
            meaningful digital solutions. I enjoy working on projects that challenge 
            me to grow and learn new technologies.
          </p>
          <div className="about-highlights">
            <div className="highlight-item">
              <h3 className="highlight-number">50+</h3>
              <p className="highlight-label">Projects Completed</p>
            </div>
            <div className="highlight-item">
              <h3 className="highlight-number">3+</h3>
              <p className="highlight-label">Years Experience</p>
            </div>
            <div className="highlight-item">
              <h3 className="highlight-number">20+</h3>
              <p className="highlight-label">Happy Clients</p>
            </div>
          </div>
        </div>
        <div className="about-image">
          <div className="image-placeholder">
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
