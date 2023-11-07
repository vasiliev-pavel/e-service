/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
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
