/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-50': '#F6F6F8',
        'primary-100': '#E9EAF0',
        'primary-200': '#D9DBE4',
        'primary-300': '#BEC1D2',
        'primary-400': '#9FA3BB',
        'primary-600': '#75759B',
        'primary-700': '#6B698C',
        'primary-800': '#54526B',
        'primary-900': '#4B4A5E',
        'primary-950': '#2B273F',
        'neutral-0': '#FDFDFD',
        'secondary-50': '#FFF7EC',
        'secondary-600': '#FF5D01',
        'error-50': '#FFF1F2',
        'error-500': '#F83B48',
      },
      maxWidth: {
        main: '1220px',
      },
    },
  },
  plugins: [],
};
