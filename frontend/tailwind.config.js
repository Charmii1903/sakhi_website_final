/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    animation: {
      'motion': 'motion 2s ease-in-out infinite',
      'road': 'roadMotion 5s linear infinite',
      'spin': 'spin 2s linear infinite',
    },
  },
  plugins: [],
}