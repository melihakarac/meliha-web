import React from 'react';
import ReactDOM from 'react-dom';

const Toast = ({ type, message, isHiding }) => {
  return ReactDOM.createPortal(
    <p className={`form-status form-status--${type} ${isHiding ? 'hiding' : ''}`}>{message}</p>,
    document.body
  );
};

export default Toast;
