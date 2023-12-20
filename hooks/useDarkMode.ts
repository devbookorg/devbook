import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(null);

  useEffect(() => {
    setIsDarkMode(localStorage.theme === 'dark');
  }, []);

  const handleDarkMode = () => {
    if (!isDarkMode) {
      setIsDarkMode(true);
      localStorage.theme = 'dark';
      document.documentElement.dataset.theme = 'dark';
    } else {
      setIsDarkMode(false);
      localStorage.theme = 'light';
      document.documentElement.dataset.theme = '';
    }
  };

  return { isDarkMode, handleDarkMode };
};
