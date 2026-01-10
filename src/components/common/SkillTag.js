import React from 'react';

import './SkillTag.css';

const SkillTag = ({ children, variant = 'default', className = '', style = {} }) => {
  const classes = ['skill-tag', `skill-tag--${variant}`, className].filter(Boolean).join(' ');

  return (
    <span className={classes} style={style}>
      {children}
    </span>
  );
};

export default SkillTag;
