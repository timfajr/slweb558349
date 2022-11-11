/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mainblue': '#234899',
        'mainyellow': '#FCC139',
        'fontwhite': '#F2F2F2',
      },
    },
  },
  plugins: [],
}