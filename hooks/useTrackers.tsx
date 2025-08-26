import React, { useCallback, useState } from 'react';

const useTracker = () => {
  const [displayComponents, setDisplayComponents] = useState('0');
  const handleDisplayComponent = useCallback((id: string) => {
    setDisplayComponents((prev) => (prev === id ? '' : id));
  }, []);
  return {
    displayComponents,
    handleDisplayComponent,
  };
};

export default useTracker;
