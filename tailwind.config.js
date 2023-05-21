/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'poppins': ['poppins','sans-serif']
    },
    extend: {
      colors:{
        'primary':'#0D0D0D',
        'secondary':"#282828",
        'tetiary':'#3A3A3A',
        'accent-one':'#3B46F1',
        'accent-two':"#7FFA8A"
      },

    },
  },
  plugins: [],
}