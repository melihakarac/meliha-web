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
      title: 'Project One',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.',
      tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4'],
      image: 'https://via.placeholder.com/600x400?text=Project+1',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'Project Two',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
      tags: ['Tag 1', 'Tag 2', 'Tag 3'],
      image: 'https://via.placeholder.com/600x400?text=Project+2',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'Project Three',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.',
      tags: ['Tag 1', 'Tag 2', 'Tag 3'],
      image: 'https://via.placeholder.com/600x400?text=Project+3',
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
