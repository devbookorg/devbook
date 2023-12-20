import { themeState } from '@/recoil/theme';
import { useEffect } from 'react';

import { useRecoilState } from 'recoil';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useRecoilState(themeState);

  useEffect(() => {
    const theme = localStorage.theme;
    setIsDarkMode(theme === 'dark');
  }, []);

  const handleDarkMode = () => {
    const currentTheme = localStorage.theme;
    if (currentTheme !== 'dark') {
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
