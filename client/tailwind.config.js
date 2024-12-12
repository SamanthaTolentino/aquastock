/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'transparent': 'transparent',
      'white': '#fff',
      'brown-1': '#695D55',
      'tan-1': '#FFF9F0',
      'blue-1': '#CEE9F4',
      'blue-2': '#83C4D5',
      'teal-1': '#D1E9DF',
      'purple-1': '#ADC1E0',
      'purple-2': '#95a7c2',
      'red-1': '#a35b4d',
    },
    borderWidth: {
      '2': '2px',
      '3': '3px',
    },
    extend: {
      fontFamily: {
        regular: ['Regular']
      },
      animation: {
        'bounceFish': 'bounceFish 3s ease-in-out infinite',
        'wiggleLeft': 'wiggleLeft 1s ease-in-out infinite',
        'wiggleRight': 'wiggleRight 1s ease-in-out infinite',
        'bounceDownUp': 'bounceDownUp 3s ease-in-out infinite',
        'bounceUpDown': 'bounceUpDown 3s ease-in-out infinite',
        'fadeInOut': 'fadeInOut 5s ease-in-out forwards',
        'slideUpDown': 'slideUpDown 5s ease-in-out forwards'
      },
      keyframes: {
        bounceFish: {
          '0%, 100%': { transform: 'translateY(-3%)' },
          '50%': { transform: 'translateY(3%)' },
        },
        wiggleLeft: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        wiggleRight: {
          '0%, 100%': { transform: 'rotate(3deg)' },
          '50%': { transform: 'rotate(-3deg)' },
        },
        bounceDownUp: {
          '0%, 100%': { transform: 'translateY(-8%)' },
          '50%': { transform: 'translateY(8%)' },
        },
        bounceUpDown: {
          '0%, 100%': { transform: 'translateY(8%)' },
          '50%': { transform: 'translateY(-8%)' },
        },
        fadeInOut: {
          '0%, 100%': { opacity: 0 },
          '20%, 80%': { opacity: 1 },
        },
        slideUpDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '20%, 80%': { transform: 'translateY(-10%)' }
        },
      }
    },
  },
  plugins: [],
}