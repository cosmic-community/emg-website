/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2F4F2F',
        'primary-dark': '#1F3F1F',
        secondary: '#8FBC8F',
        'secondary-light': '#E8F5E8',
        accent: '#D2691E',
        'accent-light': '#F4E4D0',
        earth: '#8B4513',
        sage: '#9CAF88',
        forest: '#355E3B',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            a: {
              color: '#2F4F2F',
              '&:hover': {
                color: '#1F3F1F',
              },
            },
            h1: {
              color: '#2F4F2F',
            },
            h2: {
              color: '#2F4F2F',
            },
            h3: {
              color: '#2F4F2F',
            },
            h4: {
              color: '#2F4F2F',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}