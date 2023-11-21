// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    host: "0.0.0.0",
  },
  modules: ["@nuxt/ui", "@pinia/nuxt", "@nuxtjs/supabase"],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: true,
    // не удалять может пригодится в будушем
    // redirectOptions: {
    //   login: "/login",
    //   // callback: "/confirm",
    //   // exclude: [],
    // },
  },
});
