import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useUserStore = defineStore("user", () => {
  const useBusiness = useBusinessStore();

  const selectedSalon = ref({});
  const firstPageVisited = ref(null);
  const selectedServices = reactive({});
  const totalSum = ref(0);
  const selectedSpecialist = ref(null);
  const selectedDateAndTime = ref({});

  const removeSelectedServices = (id) => {
    delete selectedServices[id];
  };

  const setSelectedDateTime = (salon) => {
    selectedDateAndTime.value = salon;
  };

  const setSelectedSalon = (salon) => {
    selectedSalon.value = salon;
  };

  const setFirstPageVisited = (page) => {
    if (!firstPageVisited.value) {
      firstPageVisited.value = page;
    }
  };

  const toggleCheckbox = (id, name, price, duration, category) => {
    if (selectedServices[id]) {
      totalSum.value -= price;
      delete selectedServices[id];
    } else {
      totalSum.value += price;
      selectedServices[id] = { name, category, price, duration };
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
    // const { data: availability } = await useFetch(
    //   `/api/availability/${specialistId}`
    // );
    const specialistAvailability = useBusiness.availabilitySpecialist.find(
      (specialist) => specialist.specialist_id === specialistId
    );

    if (specialistAvailability) {
      selectedSpecialist.value.availability = specialistAvailability;
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
    selectedDateAndTime,
    setSelectedSalon,
    setSelectedDateTime,
    setFirstPageVisited,
    toggleCheckbox,
    resetSelectedServices,
    setSelectedSpecialist,
    resetSelectedSpecialist,
    removeSelectedServices,
  };
});
