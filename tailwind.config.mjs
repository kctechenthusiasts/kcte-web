/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8f4fb',
          100: '#c5e4f5',
          200: '#9ed2ee',
          300: '#77c0e7',
          400: '#4faee0',
          500: '#2293D2',
          600: '#1d7bb1',
          700: '#186490',
          800: '#134d6f',
          900: '#0e364e',
        },
        secondary: {
          50: '#fff0f6',
          100: '#ffe0ed',
          200: '#ffc2db',
          300: '#ff85be',
          400: '#ff4d9f',
          500: '#FF1493',
          600: '#e6007d',
          700: '#c20068',
          800: '#9c0054',
          900: '#780042',
        },
        accent: {
          50: '#fff0f6',
          100: '#ffe0ed',
          200: '#ffc2db',
          300: '#ff85be',
          400: '#ff4d9f',
          500: '#FF1493',
          600: '#e6007d',
          700: '#c20068',
          800: '#9c0054',
          900: '#780042',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        elegant: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
