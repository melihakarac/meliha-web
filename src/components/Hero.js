import React, { useState, useEffect } from 'react';
import Container from './common/Container';
import './Hero.css';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Hello, I'm Meliha";

  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    let timeoutId;
    let intervalId;

    const typeWriter = () => {
      intervalId = setInterval(() => {
        if (!isDeleting) {
          // Typing
          if (currentIndex <= fullText.length) {
            setDisplayText(fullText.slice(0, currentIndex));
            currentIndex++;
          } else {
            // Done typing, wait 6 seconds then start deleting
            clearInterval(intervalId);
            timeoutId = setTimeout(() => {
              isDeleting = true;
              currentIndex = fullText.length;
              typeWriter();
            }, 6000);
          }
        } else {
          // Deleting
          if (currentIndex >= 0) {
            setDisplayText(fullText.slice(0, currentIndex));
            currentIndex--;
          } else {
            // Done deleting, wait a moment then start typing again
            clearInterval(intervalId);
            timeoutId = setTimeout(() => {
              isDeleting = false;
              currentIndex = 0;
              typeWriter();
            }, 500);
          }
        }
      }, isDeleting ? 50 : 100); // Delete faster than typing
    };

    typeWriter();

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Render text with "Hello" in italics and "Meliha" with gradient
  const renderText = () => {
    const helloLength = 5; // "Hello" is 5 characters
    const melihaStart = 11; // "Hello, I'm " is 11 characters

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

  return (
    <section id="hero" className="hero">
      <Container>
        <div className="hero-content">
          <h1 className="hero-name">
            <span className="hero-name-first typewriter">{renderText()}<span className="cursor"></span></span>
          </h1>
          <h2 className="hero-title">
            <span className="hero-title-line">Software Developer</span>
            <span className="hero-title-line">React & Next.js Specialist</span>
          </h2>
          <p className="hero-description">
            Building scalable, user-friendly applications with a focus on performance
            optimization and intuitive design.
          </p>
          <div className="hero-scroll">
            <a href="#about" onClick={(e) => {
              e.preventDefault();
              scrollToSection('about');
            }}>
              <span>Scroll Down</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
