import React from 'react';
import Section from './common/Section';
import Card from './common/Card';
import useScrollReveal from '../hooks/useScrollReveal';
import './Experience.css';

const Experience = () => {
  const timelineRef = useScrollReveal();
  
  const experiences = [
    {
      type: 'work',
      title: 'Software Developer',
      company: 'Ministry of Programming',
      period: '2021 - Present',
      description: 'Designed and optimized React-based user interfaces, enhancing overall user experience. Collaborated with cross-functional teams to deliver scalable, high-quality solutions using agile methodologies.',
      skills: ['React', 'Next.js', 'TypeScript', 'CSS'],
      projects: [
        {
          name: 'MultiBank',
          period: '2024 - Present',
          description: 'Maintained and enhanced trading web applications handling sensitive financial data. Implemented new features with robust security and industry compliance.',
          skills: ['React', 'Next.js', 'CSS']
        },
        {
          name: 'E-Commerce Project',
          period: '2023 - 2024',
          description: 'Developed a React-based back-office application to streamline operations and improve efficiency. Contributed to the MVP and delivered ad hoc features.',
          skills: ['React', 'Next.js', 'Tailwind CSS']
        },
        {
          name: 'Performance Media Project',
          period: '2022 - 2023',
          description: 'Developed and refined web app features to enhance user experience and platform stability. Built custom SDKs to streamline integrations and collaborated with clients to deliver impactful solutions.',
          skills: ['React', 'Material UI', 'MongoDB', 'Next.js', 'SDK Development']
        },
        {
          name: 'BioCertica',
          period: '2021 - 2022',
          description: 'Contributed to feature development and bug fixes across multiple web apps. Played a key role in SEO optimization and Shopify app development.',
          skills: ['React', 'CSS', 'Amplitude', 'Shopify', 'SEO']
        }
      ]
    },
    {
      type: 'work',
      title: 'Freelance Software Developer',
      company: 'Upwork',
      period: '2022',
      description: 'Contributed to a billing platform by enhancing the user interface with React, resulting in a more seamless and intuitive billing process. Collaborated within a remote team setting.',
      skills: ['React', 'Node.js', 'Tailwind CSS']
    },
    {
      type: 'work',
      title: 'Freelance Web Developer',
      company: 'Upwork',
      period: '2020 - 2021',
      description: 'Designed and delivered custom UI solutions for German clients, focusing on responsive, user-friendly interfaces. Ensured smooth project execution through agile collaboration.',
      skills: ['React', 'CSS', 'Tailwind CSS']
    },
    {
      type: 'education',
      title: 'Software Development',
      company: '"Džemal Bijedić" University of Mostar',
      period: '2017 - 2021',
      description: 'Studied at the Faculty of Information Technologies, focusing on software development fundamentals, algorithms, and modern programming practices.',
      skills: ['Computer Science', 'Software Engineering', 'Problem Solving']
    }
  ];

  return (
    <Section 
      id="experience" 
      subtitle="My Journey" 
      title="Experience & Education"
      className="experience-section"
    >
      <div ref={timelineRef} className="experience-timeline scroll-reveal">
        {experiences.map((item, index) => (
          <Card 
            key={index} 
            className={`experience-item experience-${item.type} stagger-item hover-lift`}
            style={{ transitionDelay: `${index * 0.2}s` }}
          >
            <div className="experience-header">
              <h3 className="experience-title">{item.title}</h3>
              <span className="experience-company">{item.company}</span>
              <span className="experience-period">{item.period}</span>
            </div>
            <p className="experience-description">{item.description}</p>
            <div className="experience-skills">
              {item.skills.map((skill, skillIndex) => (
                <span key={skillIndex} className="experience-skill">{skill}</span>
              ))}
            </div>
            {item.projects && (
              <div className="experience-projects">
                <h4 className="projects-label">Projects:</h4>
                {item.projects.map((project, projectIndex) => (
                  <div key={projectIndex} className="experience-project">
                    <div className="project-header">
                      <span className="project-name">{project.name}</span>
                      <span className="project-period">{project.period}</span>
                    </div>
                    <p className="project-description">{project.description}</p>
                    <div className="project-skills">
                      {project.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="project-skill">{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Experience;
