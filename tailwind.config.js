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
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        slideUp: "slideUp 0.5s ease-out",
      },
      fontFamily: {
        sora: ["Sora", "ui-sans-serif", "system-ui"],
        // roboto: ["ui-sans-serif", "system-ui", "Roboto"], // other font families...
      },
      colors: {
        "custom-gray-dark": "#313131",
        "custom-gray-darker": "#131313",
      },
      backgroundImage: {
        "gradient-to-tr":
          "linear-gradient(to top right, var(--tw-gradient-stops))",
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
