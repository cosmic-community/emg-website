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
        'primary-light': '#4A6B4A',
        secondary: '#8FBC8F',
        'secondary-light': '#E8F5E8',
        'secondary-dark': '#7BAD7B',
        accent: '#D2691E',
        'accent-light': '#F4E4D0',
        'accent-dark': '#B8551A',
        earth: '#8B4513',
        sage: '#9CAF88',
        forest: '#355E3B',
        cream: '#F8F6F0',
        'warm-gray': {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            lineHeight: '1.6',
            a: {
              color: '#2F4F2F',
              textDecoration: 'none',
              '&:hover': {
                color: '#1F3F1F',
                textDecoration: 'underline',
              },
            },
            h1: {
              color: '#2F4F2F',
              fontWeight: '700',
              lineHeight: '1.2',
            },
            h2: {
              color: '#2F4F2F',
              fontWeight: '700',
              lineHeight: '1.3',
            },
            h3: {
              color: '#2F4F2F',
              fontWeight: '600',
              lineHeight: '1.4',
            },
            h4: {
              color: '#2F4F2F',
              fontWeight: '600',
            },
            strong: {
              color: '#2F4F2F',
            },
            blockquote: {
              borderLeftColor: '#8FBC8F',
              color: '#57534E',
            },
          },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}