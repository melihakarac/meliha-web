import React from 'react';
import Container from './Container';
import './Section.css';

const Section = ({ id, children, className = '', title, subtitle }) => {
  return (
    <section id={id} className={`section ${className}`.trim()}>
      <Container>
        {(title || subtitle) && (
          <div className="section-header">
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
