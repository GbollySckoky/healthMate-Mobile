import { useCallback, useState } from 'react';

const useToggles = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = useCallback(() => {
    setToggle((prev) => !prev);
  }, []);
  return {
    toggle,
    handleToggle,
  };
};

export default useToggles;
