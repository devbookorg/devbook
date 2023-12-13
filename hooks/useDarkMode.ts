import { themeState } from '@/recoil/theme';
import { useRecoilState } from 'recoil';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useRecoilState(themeState);

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
