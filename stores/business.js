import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useBusinessStore = defineStore("business", () => {
  const business = ref([]);

  // Функция для обновления данных business
  function updateBusiness(newData) {
    business.value = newData;
    if (process.client) {
      localStorage.setItem("business", JSON.stringify(newData));
    }
  }

  return { business, updateBusiness };
});

// import { defineStore } from 'pinia';

// export const useBusinessStore = defineStore({
//   id: 'business',

//   // Состояние хранилища
//   state: () => ({
//     business: [],
//   }),

//   // Действия для управления состоянием
//   actions: {
//     loadBusiness() {
//       if (process.client) {
//         const storedData = localStorage.getItem('business');
//         if (storedData) {
//           this.business = JSON.parse(storedData);
//         }
//       }
//     },
//     saveBusiness() {
//       if (process.client) {
//         localStorage.setItem('business', JSON.stringify(this.business));
//       }
//     },
//     addBusiness(data) {
//       this.business.push(data);
//       this.saveBusiness();
//     },
//     updateBusiness(index, data) {
//       this.business[index] = data;
//       this.saveBusiness();
//     },
//   },

//   // Прослушиватели изменений состояния
//   watch: {
//     business: {
//       deep: true,
//       handler(newData) {
//         this.saveBusiness();
//       },
//     },
//   },
// });
