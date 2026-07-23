import React, { useCallback, useState } from 'react';

const useToggle = () => {
  const [isToggle, setIsToggle] = useState('');
  const handleToggle = useCallback((id: string) => {
    setIsToggle((prev) => (prev === id ? '' : id));
  }, []);
  return {
    isToggle,
    handleToggle,
  };
};

export default useToggle;
