import React from 'react';

import { Section, Card, SkillTag } from 'components/common';
import { useStaggerReveal } from 'hooks';
import { experiences } from 'data';
import { ANIMATION_TIMING } from 'constants';
import { t } from 'i18n';

import './index.css';

const Experience = () => {
  const timelineRef = useStaggerReveal({ staggerDelay: ANIMATION_TIMING.STAGGER_DELAY });

  return (
    <Section
      id="experience"
      subtitle={t('experience.subtitle')}
      title={t('experience.title')}
      className="experience-section"
    >
      <div ref={timelineRef} className="experience-timeline">
        {experiences.map((item, index) => (
          <Card
            key={index}
            className={`experience-item experience-${item.type} stagger-item hover-lift`}
          >
            <div className="experience-header">
              <h3 className="experience-title">{item.title}</h3>
              <span className="experience-company">{item.company}</span>
              <span className="experience-period">{item.period}</span>
            </div>
            <p className="experience-description">{item.description}</p>
            <div className="experience-skills">
              {item.skills.map((skill, skillIndex) => (
                <SkillTag key={skillIndex}>{skill}</SkillTag>
              ))}
            </div>
            {item.projects && (
              <div className="experience-projects">
                <h4 className="projects-label">{t('common.projectsLabel')}</h4>
                {item.projects.map((project, projectIndex) => (
                  <div key={projectIndex} className="experience-project">
                    <div className="project-header">
                      <span className="project-name">{project.name}</span>
                      <span className="project-period">{project.period}</span>
                    </div>
                    <p className="project-description">{project.description}</p>
                    <div className="project-skills">
                      {project.skills.map((skill, skillIndex) => (
                        <SkillTag key={skillIndex} variant="small">
                          {skill}
                        </SkillTag>
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
