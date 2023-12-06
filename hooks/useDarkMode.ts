import { themeState } from '@/recoil/theme';
import { useSetRecoilState } from 'recoil';

export const useDarkMode = () => {
  const setIsDarkMode = useSetRecoilState(themeState);

  const handleDarkMode = () => {
    const currentTheme = localStorage.theme;
    if (currentTheme === 'light') {
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

  return { handleDarkMode };
};
