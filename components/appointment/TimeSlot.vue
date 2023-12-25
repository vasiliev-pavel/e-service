<!-- //TimeSlot.vue -->

<template>
  <div class="flex flex-col items-center justify-center text-gray-300">
    <!-- {{ loaderStore.hide }} -->
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
const isLoading = computed(() => userStore.isLoading); // начальное состояние загрузки

const availability = ref(userStore.selectedSpecialist?.availability || {});
const categoriesById = businessStore.selectedBusiness.categoriesById || {};

const props = defineProps({
  selectedDate: Object, // Добавляем prop для выбранной даты
});

// вычисление общей длительности выбранных услуг
const getTotalDuration = () => {
  return Object.values(userStore.selectedServices).reduce((total, service) => {
    return total + durationToMinutes(service.duration);
  }, 0);
};

// Функция для генерации слотов времени
const generateTimeSlots = (startTime, endTime) => {
  const slots = [];
  let currentTime = moment(props.selectedDate).set({
    hour: moment(startTime, "HH:mm").hour(),
    minute: moment(startTime, "HH:mm").minute(),
  });
  const endMoment = moment(props.selectedDate).set({
    hour: moment(endTime, "HH:mm").hour(),
    minute: moment(endTime, "HH:mm").minute(),
  });

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
  return Object.values(userStore.specialistAppointments)
    .filter((appointment) => {
      const appointmentDate = moment(appointment.date_time);
      return appointmentDate.isSame(props.selectedDate, "day");
    })
    .map((appointment) => {
      const category = categoriesById[appointment.category_id];
      if (!category) {
        console.error("Category not found for appointment", appointment);
        return null;
      }
      const service = category.servicesById[appointment.service_id];
      if (!service) {
        console.error("Service not found for appointment", appointment);
        return null;
      }

      const durationStr = service.duration;
      const durationInMinutes = durationToMinutes(durationStr);
      return {
        start: moment(appointment.date_time),
        end: moment(appointment.date_time).add(durationInMinutes, "minutes"),
      };
    })
    .filter((slot) => slot !== null);
};

const filteredPeriods = computed(() => {
  // console.log(userStore.specialistAppointments);
  const occupiedSlots = getOccupiedSlots();
  const totalDuration = getTotalDuration();
  const periods = { Morning: [], Afternoon: [], Evening: [] };
  const now = moment();
  console.log("occupiedSlots:", occupiedSlots);

  // Определяем последний слот рабочего дня
  const lastWorkingHourSlot = workingHours.value[workingHours.value.length - 1];
  const endOfWorkingDay = moment(props.selectedDate)
    .set({
      hour: moment(lastWorkingHourSlot, "HH:mm").hour(),
      minute: moment(lastWorkingHourSlot, "HH:mm").minute(),
    })
    .add(15, "minutes");

  for (const slot of workingHours.value) {
    const slotMoment = moment(props.selectedDate).set({
      hour: moment(slot, "HH:mm").hour(),
      minute: moment(slot, "HH:mm").minute(),
    });

    const isToday = moment(props.selectedDate).isSame(now, "day"); // Является ли выбранная дата сегодняшним днем

    const endOfServiceMoment = slotMoment.clone().add(totalDuration, "minutes");
    let isAvailable = true;

    // Проверка на текущий день и время, которое уже прошло
    if (isToday && slotMoment.isBefore(now)) {
      continue; // Пропускаем прошедшие слоты для текущего дня
    }

    // Проверка на окончание услуги до конца рабочего дня
    if (endOfServiceMoment.isAfter(endOfWorkingDay)) {
      continue; // Пропускаем слоты, которые завершаются после конца рабочего дня
    }

    // Проверка на пересечение с занятыми слотами
    for (const occupied of occupiedSlots) {
      if (
        slotMoment.isBefore(occupied.end) &&
        endOfServiceMoment.isAfter(occupied.start)
      ) {
        console.log("tyt3");
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

  return Object.keys(periods)
    .filter((period) => periods[period].length > 0)
    .map((period) => ({ label: period, times: periods[period] }));
});
</script>
