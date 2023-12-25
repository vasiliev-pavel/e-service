import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
    const isLoading = ref(true);
    const selectedSalon = ref({});
    const firstPageVisited = ref(null);
    const selectedServices = reactive({});
    const totalSum = ref(0);
    const selectedSpecialist = ref(null);
    const selectedDateAndTime = ref({});
    const specialistAppointments = ref({});

    const removeSelectedServices = (id) => {
      delete selectedServices[id];
    };

    const setSelectedDateTime = (salon) => {
      selectedDateAndTime.value = salon;
    };

    const setSelectedSalon = (salon) => {
      selectedSalon.value = salon;
    };

    const getSpecialistAppointments = async (speciliastId) => {
      isLoading.value = true;
      const { data: appointments } = await useFetch(
        `/api/user/appointments/${speciliastId}`
      );
      // console.log(appointments);
      const appointmentsObject = appointments.value.data.reduce(
        (acc, appointment) => {
          acc[appointment.id] = appointment;
          return acc;
        },
        {}
      );
      // console.log(appointmentsObject);

      specialistAppointments.value = appointmentsObject ?? null;
      isLoading.value = false;
    };

    const setFirstPageVisited = (page) => {
      if (!firstPageVisited.value) {
        firstPageVisited.value = page;
      }
    };

    const toggleCheckbox = (
      id,
      name,
      price,
      duration,
      category,
      category_id
    ) => {
      if (selectedServices[id]) {
        totalSum.value -= price;
        delete selectedServices[id];
      } else {
        totalSum.value += price;
        selectedServices[id] = { name, category, price, duration, category_id };
      }
    };

    const resetSelectedServices = () => {
      Object.keys(selectedServices).forEach((key) => {
        delete selectedServices[key];
      });
      totalSum.value = 0;
    };

    const setSelectedSpecialist = (specialist) => {
      selectedSpecialist.value = specialist;
    };

    const resetSelectedSpecialist = () => {
      selectedSpecialist.value = null;
      specialistAppointments.value = {};
    };

    const resetSelected = () => {
      Object.keys(selectedServices).forEach((key) => {
        delete selectedServices[key];
      });
      totalSum.value = 0;
      selectedSpecialist.value = null;
      selectedSalon.value = null;
      selectedDateAndTime.value = {};
    };

    watch(selectedSpecialist, async (newSpecialist, oldSpecialist) => {
      if (selectedSpecialist)
        if (newSpecialist && newSpecialist !== oldSpecialist) {
          // console.log(newSpecialist.id);
          await getSpecialistAppointments(newSpecialist.id);
        }
    });

    return {
      selectedSalon,
      firstPageVisited,
      selectedServices,
      totalSum,
      selectedSpecialist,
      selectedDateAndTime,
      specialistAppointments,
      isLoading,
      setSelectedSalon,
      setSelectedDateTime,
      setFirstPageVisited,
      toggleCheckbox,
      resetSelectedServices,
      setSelectedSpecialist,
      resetSelectedSpecialist,
      removeSelectedServices,
      resetSelected,
    };
  },
  { persist: true }
);
