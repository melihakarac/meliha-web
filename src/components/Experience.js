import React from 'react';
import Section from './common/Section';
import Card from './common/Card';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      type: 'work',
      title: 'Senior Web Developer',
      company: 'Tech Company Inc.',
      period: '2022 - Present',
      description: 'Leading development of web applications, mentoring junior developers, and collaborating with cross-functional teams to deliver high-quality products.',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS']
    },
    {
      type: 'work',
      title: 'Web Developer',
      company: 'Digital Agency',
      period: '2020 - 2022',
      description: 'Developed and maintained multiple client websites, implemented responsive designs, and optimized performance for better user experience.',
      skills: ['JavaScript', 'Vue.js', 'PHP', 'MySQL']
    },
    {
      type: 'education',
      title: 'Bachelor of Computer Science',
      company: 'University Name',
      period: '2016 - 2020',
      description: 'Focused on software engineering, web development, and database systems. Graduated with honors.',
      skills: ['Software Engineering', 'Algorithms', 'Data Structures']
    }
  ];

  return (
    <Section 
      id="experience" 
      subtitle="My Journey" 
      title="Experience & Education"
      className="experience-section"
    >
      <div className="experience-timeline">
        {experiences.map((item, index) => (
          <Card key={index} className={`experience-item experience-${item.type}`}>
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
