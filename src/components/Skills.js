import React from 'react';
import Section from './common/Section';
import Card from './common/Card';
import useScrollReveal from '../hooks/useScrollReveal';
import './Skills.css';

const Skills = () => {
  const gridRef = useScrollReveal();
  
  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'CSS', 'HTML']
    },
    {
      title: 'Backend & Tools',
      skills: ['Node.js', 'MongoDB', 'Git', 'Shopify', 'Material UI', 'Amplitude']
    },
    {
      title: 'Development Practices',
      skills: ['Agile Development', 'Performance Tuning', 'SEO Optimization', 'Problem-Solving']
    },
    {
      title: 'Soft Skills',
      skills: ['Teamwork', 'Adaptability', 'Creativity', 'Communication', 'Collaboration']
    }
  ];

  return (
    <Section 
      id="skills" 
      subtitle="My Skills" 
      title="Technologies & Tools I Work With"
      className="skills-section"
    >
      <div ref={gridRef} className="skills-grid scroll-reveal">
        {skillCategories.map((category, index) => (
          <Card key={index} hover className="skill-category stagger-item" style={{ transitionDelay: `${index * 0.1}s` }}>
            <h3 className="skill-category-title">{category.title}</h3>
            <div className="skill-tags">
              {category.skills.map((skill, skillIndex) => (
                <span 
                  key={skillIndex} 
                  className="skill-tag stagger-item" 
                  style={{ transitionDelay: `${(index * 0.1) + (skillIndex * 0.05)}s` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Skills;
