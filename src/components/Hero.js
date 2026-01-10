import React from 'react';
import { Container } from './common';
import { useTypewriter, useSmoothScroll } from '../hooks';
import { t } from '../i18n';
import { ChevronDownIcon } from '../assets/icons';
import ParticleBackground from './ParticleBackground';
import './Hero.css';

const Hero = () => {
  const heroText = t('hero.greeting');
  const displayText = useTypewriter(heroText);
  const { handleScrollClick } = useSmoothScroll();

  const renderText = () => {
    const helloLength = 5;
    const melihaStart = 11;

    if (displayText.length <= helloLength) {
      return <i>{displayText}</i>;
    } else if (displayText.length <= melihaStart) {
      return (
        <>
          <i>{displayText.slice(0, helloLength)}</i>
          {displayText.slice(helloLength)}
        </>
      );
    } else {
      return (
        <>
          <i>{displayText.slice(0, helloLength)}</i>
          {displayText.slice(helloLength, melihaStart)}
          <span className="gradient-text">{displayText.slice(melihaStart)}</span>
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
