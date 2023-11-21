import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "userData",
  state: () => ({
    user: null,
    profile: null,
    session: null,
  }),
});
