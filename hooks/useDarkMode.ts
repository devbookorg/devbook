import { themeState } from '@/recoil/theme';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useRecoilState(themeState);
  useEffect(() => {
    const currentLocalTheme = localStorage.getItem('theme');

    if (currentLocalTheme === 'dark') {
      setIsDarkMode(true);
      localStorage.theme = 'dark';
      document.documentElement.classList.add('dark');
      document.documentElement.dataset.theme = 'dark';
    }
  }, []);

  const handleDarkMode = () => {
    const currentTheme = localStorage.theme;
    if (currentTheme !== 'dark') {
      setIsDarkMode(true);
      localStorage.theme = 'dark';
      document.documentElement.classList.add('dark');
      document.documentElement.dataset.theme = 'dark';
    } else {
      setIsDarkMode(false);
      localStorage.theme = 'light';
      document.documentElement.classList.remove('dark');
      document.documentElement.dataset.theme = '';
    }
  };

  return { isDarkMode, handleDarkMode };
};
