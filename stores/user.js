import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    selectedCheckboxes: {},
    totalSum: 0,
  }),
  actions: {
    toggleCheckbox(id, price) {
      if (this.selectedCheckboxes[id]) {
        this.totalSum -= price;
        delete this.selectedCheckboxes[id];
      } else {
        this.totalSum += price;
        this.selectedCheckboxes[id] = true;
      }
    },
  },
});
