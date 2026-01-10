import React from 'react';
import { Section, Card, SkillTag } from './common';
import { useScrollReveal } from '../hooks';
import { skillCategories } from '../data';
import { t } from '../i18n';
import './Skills.css';

const Skills = () => {
  const gridRef = useScrollReveal();

  return (
    <Section
      id="skills"
      subtitle={t('skills.subtitle')}
      title={t('skills.title')}
      className="skills-section"
    >
      <div ref={gridRef} className="skills-grid scroll-reveal">
        {skillCategories.map((category, index) => (
          <Card
            key={index}
            hover
            className="skill-category stagger-item"
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <h3 className="skill-category-title">{category.title}</h3>
            <div className="skill-tags">
              {category.skills.map((skill, skillIndex) => (
                <SkillTag
                  key={skillIndex}
                  variant="gradient"
                  className="stagger-item"
                  style={{ transitionDelay: `${index * 0.1 + skillIndex * 0.05}s` }}
                >
                  {skill}
                </SkillTag>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Skills;
