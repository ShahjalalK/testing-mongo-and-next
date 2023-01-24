/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/index.jsx",
    "./src/pages/header.jsx",
    "./src/pages/login.jsx",
    "./src/pages/signup.jsx",
    "./src/pages/account.jsx",
    "./src/pages/todo.jsx",
    "./src/pages/todos/[id].js",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}