import React from 'react';
import Section from './common/Section';
import Card from './common/Card';
import './Skills.css';

const Skills = () => {
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
      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <Card key={index} hover className="skill-category">
            <h3 className="skill-category-title">{category.title}</h3>
            <div className="skill-tags">
              {category.skills.map((skill, skillIndex) => (
                <span key={skillIndex} className="skill-tag">
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
