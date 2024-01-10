import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import moment from "moment";
import { parse, stringify } from "zipson";

export const useUserStore = defineStore(
  "user",
  () => {
    const selectedDay = ref(null);
    const selectedSalon = ref({});
    const firstPageVisited = ref(null);
    const selectedServices = reactive({});
    const totalSum = ref(0);
    const selectedSpecialist = ref(null);
    const selectedDateAndTime = ref(null);
    const specialistAppointments = ref({});
    const availableSpecialistIds = ref([]);
    const selectedAvailableSpecialistsIds = ref([]);

    const setSelectedDay = (day) => {
      selectedDay.value = day;
    };

    const removeSelectedServices = (id) => {
      delete selectedServices[id];
    };

    const setSelectedAvailableSpecialistsIds = (newIds) => {
      selectedAvailableSpecialistsIds.value = newIds;
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
      category_id,
      price_id
    ) => {
      if (selectedServices[id]) {
        totalSum.value -= price;
        delete selectedServices[id];
      } else {
        totalSum.value += price;
        selectedServices[id] = {
          name,
          category,
          price,
          duration,
          category_id,
          price_id,
        };
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

    const resetForButton = () => {
      Object.keys(selectedServices).forEach((key) => {
        delete selectedServices[key];
      });
      totalSum.value = 0;
      selectedSpecialist.value = null;
      availableSpecialistIds.value = [];
      selectedAvailableSpecialistsIds.value = [];
      selectedDateAndTime.value = null;
    };

    const resetSelected = () => {
      Object.keys(selectedServices).forEach((key) => {
        delete selectedServices[key];
      });
      totalSum.value = 0;
      selectedSpecialist.value = null;
      availableSpecialistIds.value = [];
      selectedAvailableSpecialistsIds.value = [];
      selectedSalon.value = null;
      selectedDateAndTime.value = null;
      selectedDay.value = null;
    };

    watch(selectedSpecialist, async (newSpecialist, oldSpecialist) => {
      if (selectedSpecialist)
        if (newSpecialist && newSpecialist !== oldSpecialist) {
          // console.log(newSpecialist.id);
          await getSpecialistAppointments(newSpecialist.id);
        }
    });

    return {
      selectedDay,
      selectedSalon,
      firstPageVisited,
      selectedServices,
      totalSum,
      selectedSpecialist,
      selectedDateAndTime,
      specialistAppointments,
      availableSpecialistIds,
      selectedAvailableSpecialistsIds,
      resetForButton,
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
      setSelectedDay,
      setSelectedAvailableSpecialistsIds,
    };
  },
  {
    persist: {
      storage: persistedState.cookies,
      serializer: {
        deserialize: parse,
        serialize: stringify,
      },
    },
  }
);
