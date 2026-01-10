import React from 'react';
import { Section } from './common';
import { useScrollReveal } from '../hooks';
import { t } from '../i18n';
import SkillsTree from './SkillsTree';
import './Skills.css';

const Skills = () => {
  const treeRef = useScrollReveal();

  return (
    <Section
      id="skills"
      subtitle={t('skills.subtitle')}
      title={t('skills.title')}
      className="skills-section"
    >
      <div ref={treeRef} className="skills-tree-wrapper scroll-reveal">
        <SkillsTree />
      </div>
    </Section>
  );
};

export default Skills;
