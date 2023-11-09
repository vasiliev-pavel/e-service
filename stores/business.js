import { defineStore } from "pinia";

export const useBusinessStore = defineStore("business", {
  state: () => ({
    businessData: null,
  }),
  actions: {
    async fetchBusiness(id) {
      try {
        const response = await fetch(
          `http://192.168.1.123:8000/business/${id}`
        );
        if (!response.ok) throw new Error("Error fetching business data");
        this.businessData = await response.json();
      } catch (error) {
        // Обработка ошибок
        console.error(error);
      }
    },
  },
});
