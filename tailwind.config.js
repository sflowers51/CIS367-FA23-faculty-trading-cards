/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      width:{
        '92':'92%',
      },

      fontSize: {
        'notSmall': '0.875rem',
        'smallish':'0.77rem', 
      },

      lineHeight:{
        'smallish':'0.5rem',
      },
      height:{
        'cardHeight':'34.25rem',
        'fifty':'50%',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'poppins': ['Poppins', 'sans'],
        'mill':['Sorts Mill Goudy', 'serif'],
        'goudy':['EB Garamond', 'serif'],
      },
    },
  },
  plugins: [],
}

