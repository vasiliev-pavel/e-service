import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useUserStore = defineStore("user", () => {
  const selectedSalon = ref({});
  const firstPageVisited = ref(null);
  const selectedServices = reactive({});
  const totalSum = ref(0);
  const selectedSpecialist = ref(null);

  const setSelectedSalon = (salon) => {
    selectedSalon.value = salon;
  };

  const setFirstPageVisited = (page) => {
    if (!firstPageVisited.value) {
      firstPageVisited.value = page;
    }
  };

  const toggleCheckbox = (id, price) => {
    if (selectedServices[id]) {
      totalSum.value -= price;
      delete selectedServices[id];
    } else {
      totalSum.value += price;
      selectedServices[id] = true;
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
  };

  const fetchAvailability = async (specialistId) => {
    const { data: availability } = await useFetch(
      `/api/availability/${specialistId}`
    );

    if (availability && availability.value) {
      selectedSpecialist.value.availability = availability.value.data[0];
    }
  };
  // Watcher for selectedSpecialist
  watch(selectedSpecialist, async (newSpecialist, oldSpecialist) => {
    if (
      newSpecialist &&
      newSpecialist.id &&
      (!oldSpecialist || newSpecialist.id !== oldSpecialist.id)
    ) {
      fetchAvailability(newSpecialist.id);
    }
  });

  return {
    selectedSalon,
    firstPageVisited,
    selectedServices,
    totalSum,
    selectedSpecialist,
    setSelectedSalon,
    setFirstPageVisited,
    toggleCheckbox,
    resetSelectedServices,
    setSelectedSpecialist,
    resetSelectedSpecialist,
  };
});
