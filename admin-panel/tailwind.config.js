/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Custom background colors
        'custom-bg': '#022061', // Replace with your desired color
        'primary-bg': '#1f2937', // Example dark background
        'secondary-bg': '#374151', // Example secondary background color

        // Custom text colors
        'custom-text': '#333333', // Replace with your desired text color
        'primary-text': '#ffffff', // Example for white text
        'secondary-text': '#9ca3af', // Example for grayish text
      },
    },
  },
  plugins: [],
};
