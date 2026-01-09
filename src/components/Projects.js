import React from 'react';
import Section from './common/Section';
import Card from './common/Card';
import Button from './common/Button';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with shopping cart, payment integration, and admin dashboard.',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: 'https://via.placeholder.com/600x400?text=Project+1',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates and team collaboration features.',
      tags: ['Vue.js', 'Firebase', 'Tailwind CSS'],
      image: 'https://via.placeholder.com/600x400?text=Project+2',
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'A responsive portfolio website showcasing projects, skills, and experience with modern design.',
      tags: ['React', 'CSS3', 'Framer Motion'],
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
      <div className="projects-grid">
        {projects.map((project) => (
          <Card key={project.id} hover className="project-card">
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
                {project.tags.map((tag, index) => (
                  <span key={index} className="project-tag">{tag}</span>
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
