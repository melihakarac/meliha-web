import React from 'react';
import { Section } from './common';
import { useScrollReveal } from '../hooks';
import { highlights } from '../data';
import { t } from '../i18n';
import profileImage from '../assets/images/profile.png';
import './About.css';

const About = () => {
  const textRef = useScrollReveal();
  const imageRef = useScrollReveal();
  const highlightsRef = useScrollReveal();

  const descriptions = t('about.description');

  return (
    <Section id="about" subtitle={t('about.subtitle')} title={t('about.title')}>
      <div className="about-content">
        <div ref={textRef} className="about-text scroll-reveal">
          {descriptions.map((paragraph, index) => (
            <p key={index} className="about-description">
              {paragraph}
            </p>
          ))}
          <div ref={highlightsRef} className="about-highlights scroll-reveal-scale">
            {highlights.map((item, index) => (
              <div key={index} className="highlight-item hover-lift">
                <h3 className="highlight-number">{item.value}</h3>
                <p className="highlight-label">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div ref={imageRef} className="about-image scroll-reveal-right">
          <div className="profile-image-wrapper hover-grow">
            <img
              src={profileImage}
              alt="Meliha Karac - Software Developer specializing in React and Next.js"
              className="profile-image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
