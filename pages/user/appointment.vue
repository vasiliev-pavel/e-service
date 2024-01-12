<template>
  <div class="max-w-sm mx-auto p-6 bg-transparent">
    <!-- Conditional rendering based on whether the data is loaded -->

    <div>
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center">
          <img
            v-if="displaySpecialistName !== 'Any specialist'"
            class="h-12 w-12 rounded-full mr-2"
            alt="Avatar"
          />
          <div>
            <div class="font-bold text-lg">
              {{ displaySpecialistName }}
            </div>
            <div class="text-sm text-gray-600">
              {{ userStore.selectedSpecialist.type }}
            </div>
          </div>
        </div>
        <!-- The 'Edit' button seems not to be in the provided design -->
      </div>

      <div class="mb-4">
        <div class="text-gray-700 font-semibold">{{ selectedDate }}</div>
        <div class="text-gray-500 text-sm">{{ timeRangeAndDuration }}</div>
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
      </div>

      <div class="flex items-center justify-between">
        <div class="text-xl font-semibold">
          {{ Object.keys(selectedServices).length }} service
        </div>
        <div class="text-xl font-semibold">{{ totalSum }} $</div>
      </div>

      <div class="mt-4">
        <button
          v-if="isUserLoggedIn"
          class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="confirmAppointment"
        >
          Confirm appointment
        </button>
        <button
          v-else
          class="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Login to Confirm
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
const route = useRoute();
const user = useSupabaseUser();
const isUserLoggedIn = computed(() => {
  return user.value !== null; // Проверяем, авторизован ли пользователь
});
// const specialistName = ref(userStore.selectedSpecialist.name);
// const specialistType = ref(userStore.selectedSpecialist.type);
// const specialistId = ref(userStore.selectedSpecialist.id);

const selectedDateTime = computed(() => moment(userStore.selectedDateAndTime));

const selectedServices = ref(userStore.selectedServices);
const categoriesById = businessStore.selectedBusiness.categoriesById || {};

// Извлечение даты и времени
const selectedDate = selectedDateTime.value.format("D MMMM, dddd"); // Форматирование даты
// const selectedTime = selectedDateTime.value.format("HH:mm"); //
const appointmentObject = ref([]);

const displaySpecialistName = computed(() => {
  if (
    userStore.availableSpecialistIds.length > 1 &&
    businessStore.selectedTab === 1
  ) {
    return "Any specialist";
  } else {
    return userStore.selectedSpecialist.name;
  }
});

const timeRangeAndDuration = computed(() => {
  const startTime = selectedDateTime.value;

  // Calculate the total duration of all services in minutes
  const totalDurationMinutes = Object.values(selectedServices.value).reduce(
    (sum, service) => {
      return sum + durationToMinutes(service.duration);
    },
    0
  );
  // Calculate end time by adding total duration to start time
  const endTime = startTime.clone().add(totalDurationMinutes, "minutes");

  // Formatting start and end time
  const formattedStartTime = startTime.format("HH:mm");
  const formattedEndTime = endTime.format("HH:mm");

  // Calculate hours and minutes for duration
  const durationHours = Math.floor(totalDurationMinutes / 60);
  const durationMinutes = totalDurationMinutes % 60;

  // Constructing the formatted duration string
  const formattedDurationParts = [];
  if (durationHours > 0) formattedDurationParts.push(`${durationHours} h`);
  if (durationMinutes > 0)
    formattedDurationParts.push(`${durationMinutes} min`);

  // Join the parts with space (if both hours and minutes are present)
  const formattedDuration = formattedDurationParts.join(" ");

  return `${formattedStartTime}–${formattedEndTime}, ${formattedDuration}`;
});

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

const totalSum = computed(() => {
  return Object.values(selectedServices.value).reduce((sum, service) => {
    return sum + service.price;
  }, 0);
});

watchEffect(() => {
  // Проверяем, авторизован ли пользователь
  if (user.value) {
    const serviceStartTimes = calculateStartTimes();

    let chosenSpecialistId = userStore.selectedSpecialist.id;
    if (
      userStore.availableSpecialistIds.length > 1 &&
      businessStore.selectedTab === 1
    ) {
      const randomIndex = Math.floor(
        Math.random() * userStore.selectedAvailableSpecialistsIds.length
      );
      chosenSpecialistId =
        userStore.selectedAvailableSpecialistsIds[randomIndex];
    }

    appointmentObject.value = Object.keys(selectedServices.value).map(
      (serviceId) => {
        const service = selectedServices.value[serviceId];
        const startTime = serviceStartTimes[serviceId];

        return {
          client_id: user.value.id,
          specialist_id: chosenSpecialistId,
          service_id: serviceId,
          date_time: moment(startTime).utc().toISOString(),
          category_id: service.category_id,
          business_id: userStore.selectedSalon.id,
        };
      }
    );
    userStore.setAppointObject(appointmentObject.value);
  } else {
    // Очищаем appointmentObject, если пользователь не авторизован
    appointmentObject.value = [];
  }
});

const confirmAppointment = async () => {
  try {
    // Запрашиваем сессию Stripe для оплаты
    const { data: session } = await useFetch(`/api/user/payment`, {
      method: "post",
      body: {
        line_items: createLineItems(selectedServices.value),
      },
    });

    // Перенаправляем пользователя на Stripe
    if (session && session.value.url) {
      navigateTo(`${session.value.url}`, { external: true });
    } else {
      console.error("Ошибка: URL сессии Stripe не получен");
    }
  } catch (error) {
    console.error("Ошибка при инициации сессии оплаты:", error);
  }
};

onMounted(async () => {
  const sessionId = route.query.session_id;
  console.log(sessionId);

  if (sessionId) {
    try {
      // Запрос к серверу для проверки статуса оплаты
      const { data: paymentStatus } = await useFetch(
        `/api/user/payment/${sessionId}`
      );

      // console.log("paymentStatus", paymentStatus);
      if (paymentStatus && paymentStatus.value.status === "paid") {
        // Отправка данных о назначении в базу данных
        // try {
        //   await $fetch(`/api/user/appointments/post`, {
        //     method: "post",
        //     body: appointmentObject.value,
        //   });
        //   router.push("/"); // Перенаправление пользователя на главную страницу
        // } catch (error) {
        //   console.error("Ошибка при отправке данных o назначении:", error);
        // }
      } else {
        // Обработка неудачной оплаты
        console.error("Оплата не удалась или статус оплаты неизвестен");
      }
    } catch (error) {
      console.error("Ошибка при проверке статуса оплаты:", error);
    }
  }
});

const createLineItems = (selectedServices) => {
  return Object.values(selectedServices).map((service) => ({
    price: service.price_id,
    quantity: 1,
  }));
};
</script>
