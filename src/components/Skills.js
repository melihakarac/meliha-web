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
      skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vue.js', 'TypeScript']
    },
    {
      title: 'Backend Development',
      skills: ['Node.js', 'Express', 'Python', 'PHP', 'MySQL', 'MongoDB']
    },
    {
      title: 'Tools & Technologies',
      skills: ['Git', 'Webpack', 'Docker', 'AWS', 'Figma', 'Adobe XD']
    },
    {
      title: 'Design',
      skills: ['UI/UX Design', 'Responsive Design', 'Wireframing', 'Prototyping', 'Branding']
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
