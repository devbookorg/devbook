import { useEffect, useState } from 'react';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(null);

  useEffect(() => {
    setIsDarkMode(document.cookie.includes('theme=dark'));
  }, []);

  const handleDarkMode = () => {
    if (!isDarkMode) {
      setIsDarkMode(true);
      document.cookie = 'theme=dark';
      document.documentElement.dataset.theme = 'dark';
    } else {
      setIsDarkMode(false);
      document.cookie = 'theme=';
      document.documentElement.dataset.theme = '';
    }
  };

  return { isDarkMode, handleDarkMode };
};
