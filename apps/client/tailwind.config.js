/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx,js,jsx}", "../../packages/ui/src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      ...require("../../packages/ui/tailwind.config").theme.extend,
    },
  },
  plugins: [require("tailwindcss-animate")],
};
