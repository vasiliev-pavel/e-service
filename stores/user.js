import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
    const selectedSalon = ref({});
    const firstPageVisited = ref(null);
    const selectedServices = reactive({});
    const totalSum = ref(0);
    const selectedSpecialist = ref(null);
    const selectedDateAndTime = ref({});
    const specialistAppointments = ref({});
    const availableSpecialistIds = ref([]);

    const removeSelectedServices = (id) => {
      delete selectedServices[id];
    };

    const setSelectedDateTime = (date) => {
      selectedDateAndTime.value = date;
    };

    const setAvailableSpecialistIds = (ids) => {
      availableSpecialistIds.value = ids;
    };

    const setSelectedSalon = (salon) => {
      selectedSalon.value = salon;
    };

    const getSpecialistAppointments = async (speciliastId) => {
      const { data: appointments } = await useFetch(
        `/api/user/appointments/${speciliastId}`
      );
      const appointmentsObject = appointments.value.data.reduce(
        (acc, appointment) => {
          acc[appointment.id] = appointment;
          return acc;
        },
        {}
      );

      specialistAppointments.value = appointmentsObject ?? null;
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
      availableSpecialistIds,
      setSelectedSalon,
      setAvailableSpecialistIds,
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
