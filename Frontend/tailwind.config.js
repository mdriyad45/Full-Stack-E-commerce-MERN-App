/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#EF4444', // Your brand color
      },
      backgroundImage: {
        'gradient-shimmer': 'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)',
      },
      transitionProperty: {
        'shadow': 'box-shadow'
      },
      screens: {
        'hover-hover': {'raw': '(hover: hover)'},
      }
    }
  },
  plugins: [
    require('daisyui'),
  ],
}


