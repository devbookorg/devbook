import { useState } from 'react';

export const useToggle = () => {
  const [isOff, setIsOff] = useState<boolean>(true);

  const handleToggle = (value?: boolean) => {
    setIsOff((prev) => !value ?? !prev);
  };

  return { isOff, handleToggle };
};
