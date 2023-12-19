<template>
  <div class="max-w-sm mx-auto p-6 bg-transparent">
    <!-- Conditional rendering based on whether the data is loaded -->

    <div>
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center">
          <img class="h-12 w-12 rounded-full mr-2" alt="Avatar" />
          <div>
            <div class="font-bold text-lg">{{ specialistName }}</div>
            <div class="text-sm text-gray-600">{{ specialistType }}</div>
          </div>
        </div>
        <!-- The 'Edit' button seems not to be in the provided design -->
      </div>

      <div class="mb-4">
        <div class="text-gray-700 font-semibold">{{ selectedDate }}</div>
        <div class="text-gray-500 text-sm">{{ selectedTime }}</div>
      </div>

      <SelectedServices :selectedServices="selectedServices" />

      <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="col-span-1">
          <div class="font-bold mb-1 text-base">Name</div>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 mb-2"
            id="name"
            type="text"
            placeholder="Имя"
            value="Павел"
          />
        </div>
        <div class="col-span-1">
          <div class="font-bold text-base mb-1">Phone-number</div>

          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 mb-2"
            id="phone"
            type="text"
            inputmode="numeric"
            placeholder="Телефон"
            value="+0 000 000 00 00"
          />
        </div>
      </div>

      <div class="mb-4">
        <div class="font-bold text-base mb-1">Comment</div>
        <textarea
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100"
          id="comment"
          placeholder="Optional"
        ></textarea>
        <!-- Changed placeholder to content inside textarea -->
      </div>

      <div class="flex items-center justify-between">
        <div class="text-xl font-semibold">
          {{ Object.keys(selectedServices).length }} service
        </div>
        <div class="text-xl font-semibold">{{ totalSum }} $</div>
      </div>

      <div class="mt-4">
        <button
          class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="confirmAppointment"
        >
          Confirm appointment
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { durationToMinutes } from "~/utils/appointmentUtils";
import SelectedServices from "~/components/appointment/SelectedServices.vue";
import moment from "moment";

definePageMeta({
  middleware: ["no-back-navigation"],
});
const userStore = useUserStore();
const businessStore = useBusinessStore();
const router = useRouter();

const specialistName = ref(userStore.selectedSpecialist.name);
const specialistType = ref(userStore.selectedSpecialist.type);
const specialistId = ref(userStore.selectedSpecialist.id);
const sum = ref();

const selectedDateTime = ref(userStore.selectedDateAndTime);
const selectedServices = ref(userStore.selectedServices);
const categoriesById = businessStore.selectedBusiness.categoriesById || {};

const user = useSupabaseUser();

// Извлечение даты и времени
const selectedDate = selectedDateTime.value.format("D MMMM, dddd"); // Форматирование даты
const selectedTime = selectedDateTime.value.format("HH:mm"); //
const appointmentObject = ref([]);

const calculateStartTimes = () => {
  let currentTime = selectedDateTime.value.clone();
  const serviceStartTimes = {};

  Object.keys(selectedServices.value).forEach((serviceId) => {
    const serviceDuration = durationToMinutes(
      selectedServices.value[serviceId].duration
    );
    serviceStartTimes[serviceId] = currentTime.format();
    currentTime = currentTime.add(serviceDuration, "minutes");
  });

  return serviceStartTimes;
};

const serviceStartTimes = calculateStartTimes();

const totalSum = computed(() => {
  return Object.values(selectedServices.value).reduce((sum, service) => {
    return sum + service.price;
  }, 0);
});

watchEffect(() => {
  const serviceStartTimes = calculateStartTimes();
  appointmentObject.value = Object.keys(selectedServices.value).map(
    (serviceId) => {
      const service = selectedServices.value[serviceId];
      const startTime = serviceStartTimes[serviceId];

      return {
        client_id: user.value.id,
        specialist_id: specialistId.value,
        service_id: serviceId,
        date_time: moment(startTime).utc().toISOString(),
        category_id: service.category_id,
        business_id: userStore.selectedSalon.id,
      };
    }
  );
});

const confirmAppointment = async () => {
  try {
    await $fetch(`/api/user/appointments/post`, {
      method: "post",
      body: appointmentObject.value,
    });
    // Обработка ответа от сервера
  } catch (error) {
    console.error(error);
  }
  router.push("/");
};
</script>
