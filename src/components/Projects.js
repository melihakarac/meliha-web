import React from 'react';
import Section from './common/Section';
import Card from './common/Card';
import Button from './common/Button';
import useScrollReveal from '../hooks/useScrollReveal';
import './Projects.css';

const Projects = () => {
  const gridRef = useScrollReveal();
  
  const projects = [
    {
      id: 1,
      title: 'MultiBank Trading Platform',
      description: 'Maintained and enhanced trading web applications handling sensitive financial data. Implemented new features with robust security and industry compliance.',
      tags: ['React', 'Next.js', 'CSS'],
      image: 'https://via.placeholder.com/600x400?text=MultiBank',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'E-Commerce Back-Office',
      description: 'Developed a React-based back-office application to streamline operations and improve efficiency. Contributed to the MVP and delivered ad hoc features.',
      tags: ['React', 'Next.js', 'Tailwind CSS'],
      image: 'https://via.placeholder.com/600x400?text=E-Commerce',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'Performance Media Platform',
      description: 'Developed and refined web app features to enhance user experience and platform stability. Collaborated with clients to deliver impactful solutions.',
      tags: ['React', 'Material UI', 'MongoDB', 'Next.js'],
      image: 'https://via.placeholder.com/600x400?text=Media+Platform',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 4,
      title: 'BioCertica',
      description: 'Contributed to feature development and bug fixes across multiple web apps. Played a key role in SEO optimization and Shopify app development.',
      tags: ['React', 'CSS', 'Shopify', 'SEO'],
      image: 'https://via.placeholder.com/600x400?text=BioCertica',
      liveUrl: '#',
      githubUrl: '#'
    }
  ];

  return (
    <Section 
      id="projects" 
      subtitle="Portfolio" 
      title="Featured Projects"
    >
      <div ref={gridRef} className="projects-grid scroll-reveal">
        {projects.map((project, index) => (
          <Card 
            key={project.id} 
            hover 
            className="project-card stagger-item hover-lift" 
            style={{ transitionDelay: `${index * 0.15}s` }}
          >
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="project-overlay">
                <Button variant="primary" size="sm" href={project.liveUrl}>
                  Live Demo
                </Button>
                <Button variant="secondary" size="sm" href={project.githubUrl}>
                  GitHub
                </Button>
              </div>
            </div>
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Projects;
