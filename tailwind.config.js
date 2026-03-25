import { colors } from './src/theme/colors.ts';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        manrope: ['Manrope', 'system-ui', 'sans-serif'],
        raleway: ['Raleway', 'system-ui', 'sans-serif'],
      },
      colors,
    },
  },
  plugins: [],
};
