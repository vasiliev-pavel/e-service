import { defineStore } from "pinia";
import { ref, watch } from "vue";

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
      const { data: businessData } = await useFetch(
        `/api/user/businesses/${salonId}`
      );
      selectedBusiness.value = businessData.value.data;
    };

    const resetSelected = () => {
      selectedBusiness.value = {};
      selectedSalonId.value = null;
    };

    //Получаем данные записей всех специалистов
    const getSpecialistAppointments = async (businessId) => {
      const { data: appointments } = await useFetch(
        `/api/user/appointments/business/${businessId}`
      );
      // console.log(appointments.value);
      const appointmentsObject = appointments.value.data.reduce(
        (acc, appointment) => {
          // Check if the accumulator already has the specialist_id key
          if (!acc[appointment.specialist_id]) {
            acc[appointment.specialist_id] = {}; // Initialize an empty object for the specialist
          }

          // Add the appointment to the respective specialist's object using the appointment id as the key
          acc[appointment.specialist_id][appointment.id] = appointment;

          return acc;
        },
        {}
      );

      allSpecialistsAppointments.value = appointmentsObject ?? null;
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
  },
  { persist: true }
);
