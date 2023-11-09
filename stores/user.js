import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    selectedServices: {},
    totalSum: 0,
  }),
  actions: {
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
  },
});
