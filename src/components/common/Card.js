import React from 'react';
import './Card.css';

const Card = ({ children, className = '', hover = false, ...props }) => {
  const classes = `card ${hover ? 'card-hover' : ''} ${className}`.trim();
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;
