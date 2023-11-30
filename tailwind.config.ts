import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      white: '#fff',
      lightGray: '#D6D6D6',
      gray: '#878484',
      black: '#1C1C1C',
      green: '#A7D6B7',
      deepGreen: '#31854D',
      red: '#E34646',
    },
    fontSize: {
      xs: '0.75rem' /* 12px */,
      sm: '0.875rem' /* 14px */,
      base: '1rem' /* 16px */,
      lg: '1.125rem' /* 20px */,
      xl: '1.5rem' /* 24px */,
      '2xl': '2.25rem' /*3 6px */,
    },
    extend: {},
  },
  plugins: [],
};
export default config;
