import React, { useRef, useEffect } from 'react';

import { PARTICLE_CONFIG } from 'config';
import './index.css';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null });
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;

    const resizeCanvas = () => {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / PARTICLE_CONFIG.DENSITY);
      particlesRef.current = [];

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * PARTICLE_CONFIG.VELOCITY_MULTIPLIER,
          vy: (Math.random() - 0.5) * PARTICLE_CONFIG.VELOCITY_MULTIPLIER,
          radius:
            Math.random() * (PARTICLE_CONFIG.MAX_RADIUS - PARTICLE_CONFIG.MIN_RADIUS) +
            PARTICLE_CONFIG.MIN_RADIUS,
          color: PARTICLE_CONFIG.COLORS[Math.floor(Math.random() * PARTICLE_CONFIG.COLORS.length)],
        });
      }
    };

    const drawParticle = (particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    };

    const drawConnections = (particle, index) => {
      for (let i = index + 1; i < particlesRef.current.length; i++) {
        const other = particlesRef.current[i];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < PARTICLE_CONFIG.CONNECTION_DISTANCE) {
          const opacity =
            (1 - distance / PARTICLE_CONFIG.CONNECTION_DISTANCE) *
            PARTICLE_CONFIG.CONNECTION_OPACITY_MULTIPLIER;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(${PARTICLE_CONFIG.CONNECTION_COLOR_RGB}, ${opacity})`;
          ctx.lineWidth = PARTICLE_CONFIG.CONNECTION_LINE_WIDTH;
          ctx.stroke();
        }
      }

      if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
        const dx = particle.x - mouseRef.current.x;
        const dy = particle.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < PARTICLE_CONFIG.MOUSE_DISTANCE) {
          const opacity =
            (1 - distance / PARTICLE_CONFIG.MOUSE_DISTANCE) *
            PARTICLE_CONFIG.MOUSE_CONNECTION_OPACITY_MULTIPLIER;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = `rgba(${PARTICLE_CONFIG.MOUSE_CONNECTION_COLOR_RGB}, ${opacity})`;
          ctx.lineWidth = PARTICLE_CONFIG.MOUSE_LINE_WIDTH;
          ctx.stroke();
        }
      }
    };

    const updateParticle = (particle) => {
      if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < PARTICLE_CONFIG.MOUSE_DISTANCE && distance > 0) {
          const force =
            ((PARTICLE_CONFIG.MOUSE_DISTANCE - distance) / PARTICLE_CONFIG.MOUSE_DISTANCE) *
            PARTICLE_CONFIG.MOUSE_FORCE;
          particle.vx += (dx / distance) * force;
          particle.vy += (dy / distance) * force;
        }
      }

      particle.vx *= PARTICLE_CONFIG.FRICTION;
      particle.vy *= PARTICLE_CONFIG.FRICTION;

      const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
      if (speed > PARTICLE_CONFIG.MAX_SPEED) {
        particle.vx = (particle.vx / speed) * PARTICLE_CONFIG.MAX_SPEED;
        particle.vy = (particle.vy / speed) * PARTICLE_CONFIG.MAX_SPEED;
      }

      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        updateParticle(particle);
        drawConnections(particle, index);
        drawParticle(particle);
      });

      if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
        const gradient = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          PARTICLE_CONFIG.MOUSE_GRADIENT_RADIUS
        );
        gradient.addColorStop(
          0,
          `rgba(${PARTICLE_CONFIG.MOUSE_GRADIENT_COLOR_RGB}, ${PARTICLE_CONFIG.MOUSE_GRADIENT_MAX_OPACITY})`
        );
        gradient.addColorStop(1, `rgba(${PARTICLE_CONFIG.MOUSE_GRADIENT_COLOR_RGB}, 0)`);
        ctx.beginPath();
        ctx.arc(
          mouseRef.current.x,
          mouseRef.current.y,
          PARTICLE_CONFIG.MOUSE_GRADIENT_RADIUS,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);
    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-background" />;
};

export default ParticleBackground;
