/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend:{
      colors:{
        'exTraGreen': '#62E3AB',
      },
    },
  },
  plugins: [
    '@tailwindcss/forms',
    require('flowbite/plugin'),
  ],
}

