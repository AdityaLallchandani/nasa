/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nasa-dark': '#1a202c',
        'nasa-blue': '#38BDF8',
        'nasa-gray': '#2D3748',
        'nasa-light': '#4A5568',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(135deg, #1a202c 0%, #2D3748 50%, #4A5568 100%)',
        'hero-space': 'linear-gradient(rgba(26, 32, 44, 0.8), rgba(26, 32, 44, 0.8)), url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2356BDF8\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'1\'/%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'1\'/%3E%3Ccircle cx=\'20\' cy=\'50\' r=\'1\'/%3E%3Ccircle cx=\'50\' cy=\'20\' r=\'1\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}