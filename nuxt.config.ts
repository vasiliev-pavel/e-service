// https://nuxt.com/docs/api/configuration/nuxt-config
import { firebaseConfig } from "./firebaseConfig";
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    host: "0.0.0.0",
  },
  modules: ["@nuxt/ui", "@pinia/nuxt", "nuxt-vuefire"],
  vuefire: {
    auth: {
      enabled: true,
      // sessionCookie: true,
    },
    config: firebaseConfig,
  },
});
