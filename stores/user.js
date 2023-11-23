import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    selectedSalon: {},
    firstPageVisited: null,
    selectedServices: {},
    totalSum: 0,
    selectedSpecialist: null,
  }),

  actions: {
    setSelectedSalon(salon) {
      this.selectedSalon = salon;
    },

    setFirstPageVisited(page) {
      if (!this.firstPageVisited) {
        // Установить только если не было установлено ранее
        this.firstPageVisited = page;
      }
    },

    toggleCheckbox(id, price) {
      if (this.selectedServices[id]) {
        this.totalSum -= price;
        delete this.selectedServices[id];
      } else {
        this.totalSum += price;
        this.selectedServices[id] = true;
      }
    },
    resetSelectedServices() {
      this.selectedServices = {};
      this.totalSum = 0;
    },

    setSelectedSpecialist(specialist) {
      this.selectedSpecialist = specialist;
    },
    resetSelectedSpecialist() {
      this.selectedSpecialist = null;
    },
  },
});
