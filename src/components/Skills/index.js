import React from 'react';

import { Section } from 'components/common';
import SkillsTree from 'components/SkillsTree';
import { useScrollReveal } from 'hooks';
import { t } from 'i18n';

import './index.css';

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
