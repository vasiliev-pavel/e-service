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

      <div class="mb-4">
        <div class="font-semibold">Стрижка короткие (комплекс)</div>
        <div class="text-gray-500">900 Р</div>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="col-span-1">
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 mb-2"
            id="name"
            type="text"
            placeholder="Имя"
            value="Павел"
          />
        </div>
        <div class="col-span-1">
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
        <textarea
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100"
          id="comment"
          placeholder="Комментарий"
        >
необязательно</textarea
        >
        <!-- Changed placeholder to content inside textarea -->
      </div>

      <div class="flex items-center justify-between">
        <div class="text-xl font-semibold">1 услуга</div>
        <div class="text-xl font-semibold">{{ sum }}</div>
      </div>

      <div class="mt-4">
        <button
          class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="confirmAppointment"
        >
          Подтвердить запись
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const userStore = useUserStore();
const useBusiness = useBusinessStore();
const router = useRouter();
const supabase = useSupabaseClient();

const specialistName = ref(userStore.selectedSpecialist.name);
const specialistType = ref(userStore.selectedSpecialist.type);
const specialistId = ref(userStore.selectedSpecialist.id);
const sum = ref(userStore.selectedSpecialist.totalSum);
const selectedDateTime = ref(userStore.selectedDateAndTime);
const user = useSupabaseUser();
// Извлечение даты и времени
const selectedDate = selectedDateTime.value.format("D MMMM, dddd"); // Форматирование даты
const selectedTime = selectedDateTime.value.format("HH:mm"); //

const appointmentObject = ref({
  client_id: user.value.id,
  specialist_id: specialistId.value,
  // service_id: "1",
  date_time: selectedDateTime.value.utc().toISOString(),
});

const confirmAppointment = async () => {
  try {
    await $fetch(`/api/appointment/`, {
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
