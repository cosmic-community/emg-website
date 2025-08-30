/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a2e1a', // Dark forest green from images
        'primary-dark': '#0f1a0f',
        'primary-light': '#2d4a2d',
        secondary: '#8FBC8F',
        'secondary-light': '#E8F5E8',
        'secondary-dark': '#7BAD7B',
        accent: '#c55a2c', // Orange accent color from icons
        'accent-light': '#e8a882',
        'accent-dark': '#a04620',
        earth: '#8B4513',
        sage: '#9CAF88',
        forest: '#1a2e1a', // Matching the primary
        cream: '#F8F6F0',
        'dark-overlay': 'rgba(26, 46, 26, 0.9)', // For overlays
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
              color: '#c55a2c',
              textDecoration: 'none',
              '&:hover': {
                color: '#a04620',
                textDecoration: 'underline',
              },
            },
            h1: {
              color: '#1a2e1a',
              fontWeight: '700',
              lineHeight: '1.2',
            },
            h2: {
              color: '#1a2e1a',
              fontWeight: '700',
              lineHeight: '1.3',
            },
            h3: {
              color: '#1a2e1a',
              fontWeight: '600',
              lineHeight: '1.4',
            },
            h4: {
              color: '#1a2e1a',
              fontWeight: '600',
            },
            strong: {
              color: '#1a2e1a',
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
        'glow': '0 0 20px rgba(197, 90, 44, 0.3)',
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #1a2e1a 0%, #0f1a0f 100%)',
        'gradient-overlay': 'linear-gradient(rgba(26, 46, 26, 0.8), rgba(26, 46, 26, 0.9))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}