import React from 'react';

import { useCountUp } from '../../hooks';

const CountUpNumber = ({ value, duration = 2000, delay = 0, className = '' }) => {
  const { displayValue, ref } = useCountUp(value, {
    duration,
    delay,
    startOnView: true,
  });

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
};

export default CountUpNumber;
