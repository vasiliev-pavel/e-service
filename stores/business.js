import { defineStore } from "pinia";
import { ref, watch } from "vue";
import moment from "moment";
import { parse, stringify } from "zipson";

export const useBusinessStore = defineStore(
  "business",
  () => {
    const businesses = ref([]);
    const selectedSalonId = ref(null);

    //обновлённая структура
    const selectedBusiness = ref({});
    const allSpecialistsAppointments = ref({});
    const selectedTab = ref(0);

    const setSelectedTab = (newData) => {
      selectedTab.value = newData;
    };

    // Функция для обновления данных business
    const setBusiness = (newData) => {
      businesses.value = newData;
    };

    const setCategories = (newData) => {
      // categories.value = newData;
    };

    // Получение cпециалистов и услуги которые они выполняют
    const fetchAllData = async (salonId) => {
      try {
        const { data } = await useFetch(`/api/user/businesses/${salonId}`);
        if (data && data.value && data.value.data) {
          selectedBusiness.value = data.value.data;
        } else {
          console.error("Invalid response structure");
          selectedBusiness.value = null;
        }
      } catch (error) {
        console.error("Failed to fetch business data:", error);
        selectedBusiness.value = null;
      }
    };

    const resetSelected = () => {
      selectedBusiness.value = {};
      selectedSalonId.value = null;
    };

    //Получаем данные записей всех специалистов
    const getSpecialistAppointments = async (businessId) => {
      const loading = useLoadingStore();
      const allSpecialistsAppointments = ref(null); // Предполагая, что это ref из Vue Composition API

      // loading.showLoading();
      try {
        const { data } = await useFetch(
          `/api/user/appointments/business/${businessId}`
        );

        if (data && data.data) {
          allSpecialistsAppointments.value = data.data.reduce(
            (acc, { specialist_id, id, ...rest }) => {
              if (!acc[specialist_id]) {
                acc[specialist_id] = {};
              }
              acc[specialist_id][id] = { id, ...rest };
              return acc;
            },
            {}
          );
        } else {
          console.error("Response or response.data is null");
          allSpecialistsAppointments.value = null;
        }
      } catch (error) {
        console.error(error);
        allSpecialistsAppointments.value = null;
      } finally {
        // loading.hideLoading();
      }
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
      allSpecialistsAppointments,
      selectedTab,
      setBusiness,
      setCategories,
      resetSelected,
      getSpecialistAppointments,
      setSelectedTab,
    };
  }
  // {
  //   persist: {
  //     storage: persistedState.cookies,
  //     serializer: {
  //       deserialize: parse,
  //       serialize: stringify,
  //     },
  //   },
  // }
);
