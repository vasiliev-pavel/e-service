// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  css: [
    "~/assets/css/main.css",
    "~/assets/css/icons.css",
    "~/assets/css/fonts.css",
  ],
  devtools: { enabled: true },
  devServer: {
    host: "0.0.0.0",
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/supabase",
  ],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    // redirect: false,
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: [],
    },
    // realtime: {
    //   eventsPerSecond: 2,
    // },
  },
});
