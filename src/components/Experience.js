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
      title: 'Job Title',
      company: 'Company Name',
      period: 'XXXX - Present',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      skills: ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4']
    },
    {
      type: 'work',
      title: 'Previous Job Title',
      company: 'Previous Company',
      period: 'XXXX - XXXX',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      skills: ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4']
    },
    {
      type: 'education',
      title: 'Degree Name',
      company: 'Institution Name',
      period: 'XXXX - XXXX',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      skills: ['Subject 1', 'Subject 2', 'Subject 3']
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
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Experience;
