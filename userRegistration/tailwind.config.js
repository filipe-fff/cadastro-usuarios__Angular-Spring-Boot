/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html, js}"
  ],
  safelist:[
    "bg-indigo-600", "hover:bg-indigo-500",
    "bg-green-600", "hover:bg-green-500",
    "bg-red-600", "hover:bg-red-500",
    "bg-slate-600", "hover:bg-slate-500",

    "rounded-md", "px-3", "py-2", "text-lg", "font-medium", "leading-5", "text-white"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// npm i -D tailwindcss postcss autoprefixer
// npx tailwindcss init
// @tailwind base;
// @tailwind components;
// @tailwind utilities;