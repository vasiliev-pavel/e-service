import { defineStore } from "pinia";
// import { onValue, ref as firebaseRef } from "firebase/database";
// import { database } from "~/firebaseInit"; // Импорт database

export const useBusinessStore = defineStore("business", {
  state: () => ({
    businessData: null,
    unsubscribe: null, // Для хранения функции отписки
  }),
  // actions: {
  //   async subscribeToBusiness(id) {
  //     const businessRef = firebaseRef(database, `business_data/${id}`);

  //     this.unsubscribe = onValue(
  //       businessRef,
  //       (snapshot) => {
  //         this.businessData = snapshot.val();
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );
  //   },
  //   unsubscribeFromBusiness() {
  //     if (this.unsubscribe) {
  //       this.unsubscribe();
  //     }
  //   },
  // },
});
