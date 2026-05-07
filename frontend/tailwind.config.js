/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Noto Serif"', '"Times New Roman"', 'Georgia', 'serif'],
        body:    ['"Noto Sans"', '"Segoe UI"', 'Arial', 'sans-serif'],
      },
      colors: {
        'gov-blue':     '#1a3a6b',
        'gov-blue-mid': '#1e4d9b',
        'gov-blue-light': '#e8eef8',
        'gov-dark':     '#1a1a1a',
        'saffron':      '#FF6600',
        'india-green':  '#138808',
        'ashoka-blue':  '#000080',
      },
    },
  },
  plugins: [],
}