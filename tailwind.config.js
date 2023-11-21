/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sora: ["Sora", "sans-serif"],
      },
      colors: {
        "custom-gray-dark": "#313131",
        "custom-gray-darker": "#131313",
      },
      backgroundImage: {
        "gradient-to-tr":
          "linear-gradient(to top right, var(--tw-gradient-stops))",
        "salon-image": "url('~/assets/img/salon.jpg')",
      },
      gradientColorStops: (theme) => ({
        ...theme("colors"),
        start: "#313131",
        end: "#131313",
      }),
    },
  },
  plugins: [],
};
