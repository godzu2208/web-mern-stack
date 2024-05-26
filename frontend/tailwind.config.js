/** @type {import('tailwindcss').Config} */
export default {
  // content: ["./index.html", "./src/**/*.{js,jsx,tsx,ts}"],
  content: ["./index.html", "./src/**/*.{js,jsx,tsx,ts}", "./src/components/**/*.{js,jsx,tsx,ts}"],

  theme: {
    extend: {},
    container: {
      padding: "4rem",
    },
  },
  plugins: [],
}

