import React from 'react';

import Container from './Container';
import { useScrollReveal } from '../../hooks';

import './Section.css';

const Section = ({ id, children, className = '', title, subtitle }) => {
  const headerRef = useScrollReveal();

  return (
    <section id={id} className={`section ${className}`.trim()}>
      <Container>
        {(title || subtitle) && (
          <div ref={headerRef} className="section-header scroll-reveal">
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
            {title && <h2 className="section-title">{title}</h2>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
};

export default Section;
