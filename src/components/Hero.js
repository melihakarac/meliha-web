import React from 'react';

import { Container } from './common';
import ParticleBackground from './ParticleBackground';
import { useTypewriter, useSmoothScroll } from '../hooks';
import { ChevronDownIcon } from '../assets/icons';
import { HERO_TEXT_BREAKPOINTS } from '../utils';
import { t } from '../i18n';

import './Hero.css';

const Hero = () => {
  const heroText = t('hero.greeting');
  const displayText = useTypewriter(heroText);
  const { handleScrollClick } = useSmoothScroll();

  const renderText = () => {
    const { HELLO_LENGTH, MELIHA_START } = HERO_TEXT_BREAKPOINTS;

    if (displayText.length <= HELLO_LENGTH) {
      return <i>{displayText}</i>;
    } else if (displayText.length <= MELIHA_START) {
      return (
        <>
          <i>{displayText.slice(0, HELLO_LENGTH)}</i>
          {displayText.slice(HELLO_LENGTH)}
        </>
      );
    } else {
      return (
        <>
          <i>{displayText.slice(0, HELLO_LENGTH)}</i>
          {displayText.slice(HELLO_LENGTH, MELIHA_START)}
          <span className="gradient-text">{displayText.slice(MELIHA_START)}</span>
        </>
      );
    }
  };

  const titleLines = t('hero.title');

  return (
    <section id="hero" className="hero">
      <ParticleBackground />
      <Container>
        <div className="hero-content">
          <h1 className="hero-name">
            <span className="hero-name-first typewriter">
              {renderText()}
              <span className="cursor"></span>
            </span>
          </h1>
          <h2 className="hero-title">
            {titleLines.map((line, index) => (
              <span key={index} className="hero-title-line">
                {line}
              </span>
            ))}
          </h2>
          <p className="hero-description">{t('hero.description')}</p>
          <div className="hero-scroll">
            <a href="#about" onClick={(e) => handleScrollClick(e, 'about')}>
              <span>{t('common.scrollDown')}</span>
              <ChevronDownIcon />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
