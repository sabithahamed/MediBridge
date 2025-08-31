// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'neumorphic-light': '9px 9px 16px #a3b1c6, -9px -9px 16px #ffffff',
        'neumorphic-inset': 'inset 5px 5px 10px #a3b1c6, inset -5px -5px 10px #ffffff',
        'neumorphic-raised': '6px 6px 12px #a3b1c6, -6px -6px 12px #ffffff',
        'neumorphic-pressed': 'inset 4px 4px 8px #a3b1c6, inset -4px -4px 8px #ffffff',
      },
    },
  },
  plugins: [],
}