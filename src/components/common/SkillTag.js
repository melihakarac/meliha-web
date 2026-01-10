import React from 'react';
import './SkillTag.css';

/**
 * Reusable skill tag component
 * @param {Object} props
 * @param {string} props.children - The skill text
 * @param {string} props.variant - 'default' | 'small' | 'accent'
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Inline styles
 */
const SkillTag = ({ children, variant = 'default', className = '', style = {} }) => {
  const classes = ['skill-tag', `skill-tag--${variant}`, className].filter(Boolean).join(' ');

  return (
    <span className={classes} style={style}>
      {children}
    </span>
  );
};

export default SkillTag;
