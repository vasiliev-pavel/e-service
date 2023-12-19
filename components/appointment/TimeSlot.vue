<!-- //TimeSlot.vue -->

<template>
  <div class="flex flex-col items-center justify-center text-gray-300">
    <div v-for="period in filteredPeriods" :key="period.label" class="mb-4">
      <div class="font-bold mb-2">{{ period.label }}</div>
      <div class="grid grid-cols-4 gap-2">
        <button
          v-for="time in period.times"
          :key="time"
          @click="selectTime(time)"
          class="py-2 px-4 border rounded text-center cursor-pointer hover:bg-gray-200 hover:text-gray-600"
        >
          {{ time }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import moment from "moment";
import { durationToMinutes } from "~/utils/appointmentUtils";
const businessStore = useBusinessStore();
const userStore = useUserStore();
const router = useRouter();

const availability = ref(userStore.selectedSpecialist?.availability || {});
const specialistAppointments = ref(userStore.specialistAppointments || {});
const categoriesById = businessStore.selectedBusiness.categoriesById || {};

// const servicesById = ref(businessStore.selectedBusiness.servicesById || {});

const props = defineProps({
  selectedDate: Object, // Добавляем prop для выбранной даты
});

// Функция для генерации слотов времени
const generateTimeSlots = (startTime, endTime) => {
  const slots = [];
  let currentTime = moment(startTime, "HH:mm");
  const endMoment = moment(endTime, "HH:mm");

  while (currentTime.isBefore(endMoment)) {
    slots.push(currentTime.format("HH:mm"));
    currentTime.add(15, "minutes");
  }

  return slots;
};

// Вычисляемое свойство для определения рабочих часов специалиста в выбранный день
const workingHours = computed(() => {
  const dayOfWeek = moment(props.selectedDate).format("dddd").toLowerCase();
  // Используйте опциональную цепочку для безопасного доступа к свойствам

  const hours = availability.value?.[dayOfWeek];
  if (hours && hours !== "Closed") {
    const [start, end] = hours.split("-");
    console.log(hours);
    return generateTimeSlots(start.trim(), end.trim());
  }
  return [];
});

// Слоты времени делятся на периоды дня
const filteredPeriods = computed(() => {
  const occupiedSlots = getOccupiedSlots();
  console.log(occupiedSlots);
  const periods = {
    Morning: [],
    Afternoon: [],
    Evening: [],
  };

  for (const slot of workingHours.value) {
    const slotMoment = moment(slot, "HH:mm");
    let isAvailable = true;

    for (const occupied of occupiedSlots) {
      // Проверяем, начинается ли слот во время выполнения услуги
      if (
        slotMoment.isSameOrAfter(occupied.start) &&
        slotMoment.isBefore(occupied.end)
      ) {
        isAvailable = false;
        break;
      }
    }

    if (isAvailable) {
      const hour = slotMoment.hour();
      if (hour < 12) {
        periods["Morning"].push(slot);
      } else if (hour >= 12 && hour < 18) {
        periods["Afternoon"].push(slot);
      } else {
        periods["Evening"].push(slot);
      }
    }
  }

  // Возвращаем только те периоды, которые имеют слоты
  return Object.keys(periods)
    .filter((period) => periods[period].length > 0)
    .map((period) => ({ label: period, times: periods[period] }));
});

const selectTime = (time) => {
  // Создаем объект moment с выбранной датой и временем
  const selectedDateTime = moment(props.selectedDate).set({
    hour: moment(time, "HH:mm").get("hour"),
    minute: moment(time, "HH:mm").get("minute"),
    second: 0,
  });
  // Сохранение выбранного времени в userStore
  userStore.setSelectedDateTime(selectedDateTime);

  // Программный переход на страницу appointment
  router.push("/user/appointment");
};

const getOccupiedSlots = () => {
  return Object.values(specialistAppointments.value)
    .filter((appointment) => {
      // console.log(appointment);
      const appointmentDate = moment(appointment.date_time);
      // console.log(appointmentDate);
      return appointmentDate.isSame(props.selectedDate, "day");
    })
    .map((appointment) => {
      const durationStr =
        categoriesById[appointment.category_id].servicesById[
          appointment.service_id
        ].duration;
      const durationInMinutes = durationToMinutes(durationStr);
      return {
        start: moment(appointment.date_time),
        end: moment(appointment.date_time).add(durationInMinutes, "minutes"),
      };
    });
};
</script>
