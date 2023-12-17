import { defineStore } from 'pinia';

export const useLoaderStore = defineStore('loader', {
  state: () => ({
    isLoading: false,
    timer: null
  }),
  actions: {
    show() {
      this.clearTimer(); // Очистить предыдущий таймер, если он существует
      this.isLoading = true;
      this.timer = setTimeout(() => {
        this.isLoading = false;
      }, 5000); // Установить таймер на 5 секунд
    },
    hide() {
      this.clearTimer();
      this.isLoading = false;
    },
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    }
  }
});
