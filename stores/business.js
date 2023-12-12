import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useBusinessStore = defineStore(
  "business",
  () => {
    const businesses = ref([]);
    const selectedSalonId = ref(null);

    //обновлённая структура
    const selectedBusiness = ref({});

    // Функция для обновления данных business
    const setBusiness = (newData) => {
      businesses.value = newData;
    };

    const setCategories = (newData) => {
      // categories.value = newData;
    };
    // Получение cпециалистов и услуги которые они выполняют
    const fetchAllData = async (salonId) => {
      const { data: businessData } = await useFetch(
        `/api/user/businesses/${salonId}`
      );
      selectedBusiness.value = businessData.value.data;
    };

    const resetSelected = () => {
      selectedBusiness.value = {};
      selectedSalonId.value = null;
    };

    //следим за выбранным пользователем салоном
    //и если он выбрал новый, то обновляем данные
    watch(selectedSalonId, async (newId, oldId) => {
      if (newId && newId !== oldId) {
        await fetchAllData(newId);
      }
    });

    return {
      businesses,
      selectedBusiness,
      selectedSalonId,
      setBusiness,
      setCategories,
      resetSelected,
    };
  },
  { persist: true }
);
