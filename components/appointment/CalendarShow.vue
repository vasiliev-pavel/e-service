<template>
  <div class="flex flex-col items-center m-5">
    <div class="flex w-full justify-between items-center mb-2">
      <div class="flex-grow text-left font-bold">
        <span v-if="visibleMonths.length === 1">{{ visibleMonths[0] }}</span>
        <span v-else>{{ visibleMonths.join(" - ") }}</span>
      </div>
      <div class="flex-grow-0">
        <button
          @click="scroll(-1)"
          :disabled="isPrevDisabled"
          class="p-2 disabled:opacity-50"
        >
          <span>&lt;</span>
        </button>
        <button
          @click="scroll(1)"
          :disabled="isNextDisabled"
          class="p-2 disabled:opacity-50"
        >
          <span>&gt;</span>
        </button>
      </div>
    </div>
    <div class="flex justify-center">
      <div
        v-for="date in visibleDates"
        :key="date.toString()"
        @click="selectDate(date)"
        class="flex flex-col items-center mx-1 bg-gray-700 rounded-lg w-9 px-1 py-1 cursor-pointer hover:bg-gray-600 hover:shadow-lg transition-all duration-300 ease-in-out"
      >
        <div class="text-white text-xs">
          {{ date.toLocaleDateString("en", { weekday: "short" }) }}
        </div>
        <div class="flex items-center justify-center h-7">
          {{ date.getDate() }}
        </div>
      </div>
    </div>
  </div>

  <TimeSlot
    v-if="!isWeekend && !showUnavailableAlert && hasAvailableTimeSlots"
    :filteredPeriods="filteredPeriods"
    :selectedDate="selectedDate"
  />
  <UnavailableDateAlert
    v-if="
      (showUnavailableAlert && !isWeekend) ||
      (!hasAvailableTimeSlots && !isWeekend)
    "
    :selectedDay="dayNumber"
  />
  <SpecUnavNotification v-else-if="isWeekend" :selectedDay="dayNumber" />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "~/stores/user";
import { useBusinessStore } from "~/stores/business";
import {
  generateDates,
  parseTime,
  createTimeSlots,
  getServiceDuration,
  getWorkingHoursEnd,
  isToday,
  isSameDay,
  processPeriods,
} from "~/utils/appointmentUtils";
// const MINUTE_IN_MS = 60000;

const now = ref(new Date());
const currentTime = ref(new Date());
const defaultSelectDay = now.value
  .toLocaleString("en", { weekday: "long" })
  .toLowerCase();

const weekdaySelect = ref(defaultSelectDay);
const isWeekend = ref(true);

const selectedDate = ref(now);
onMounted(() => {
  console.log(selectedDate.value);
});
const allDates = ref(generateDates());
const visibleCount = 7;
const startIndex = ref(0);
const endIndex = ref(visibleCount);

const userStore = useUserStore();
const businessStore = useBusinessStore();
const specialistId = userStore.selectedSpecialist.id;
const selectedService = userStore.selectedServices;
const selectedServiceId = Object.keys(selectedService)[0];
const categories = businessStore.businessData.categories;
const selectedServiceDuration = ref(
  getServiceDuration(Number(selectedServiceId), categories)
);
const hasAvailableTimeSlots = ref(false);

// Assuming useAsyncData is a custom hook for async data fetching
const { data, pending, error } = await useAsyncData("data", () =>
  $fetch(`http://192.168.1.123:8000/specialist/${specialistId}/schedule`)
);

async function fetchData() {
  try {
    const response = await $fetch(
      `http://192.168.1.123:8000/specialist/${specialistId}/schedule`
    );
    // Обновление реактивных свойств на основе полученных данных
    availability.value = response.availability;
    appointment.value = response.appointments;
  } catch (error) {
    console.error("Ошибка при загрузке данных: ", error);
  }
}

const availability = ref(data.value.availability);
const appointment = ref(data.value.appointments);

const dayNumber = ref({
  day: now.value.getDate(),
  month: now.value.toLocaleString("en-EN", { month: "long" }),
});

const visibleDates = computed(() =>
  allDates.value.slice(startIndex.value, endIndex.value)
);

const visibleMonths = computed(() => {
  const months = visibleDates.value.map((date) =>
    date.toLocaleString("en-EN", { month: "long", year: "numeric" })
  );
  return [...new Set(months)];
});

const isPrevDisabled = computed(() => startIndex.value === 0);
const isNextDisabled = computed(() => endIndex.value >= allDates.value.length);

function scroll(direction) {
  const increment = visibleCount * direction;
  startIndex.value = Math.max(startIndex.value + increment, 0);
  endIndex.value = Math.min(endIndex.value + increment, allDates.value.length);
}

function selectDate(date) {
  fetchData();

  const dayOfWeek = date
    .toLocaleDateString("en", { weekday: "long" })
    .toLowerCase();

  weekdaySelect.value = dayOfWeek;

  dayNumber.value = {
    day: date.getDate(),
    month: date.toLocaleString("en-EN", { month: "long" }),
  };

  currentTime.value = new Date();

  selectedDate.value = new Date(date);
}

//logic for time slots
//
//

const getAvailableTimeSlots = (dailyAvailability) => {
  const periods = { Утро: [], День: [], Вечер: [] };
  const [hours] = Object.values(dailyAvailability);

  if (hours === "weekend") {
    isWeekend.value = true;
    return null;
  }

  if (typeof hours === "string" && hours.includes("-")) {
    isWeekend.value = false;
    const [start, end] = hours.split("-").map(parseTime);

    createTimeSlots(start, end).forEach((timeSlot) => {
      const slotTime = parseTime(timeSlot);
      if (slotTime < parseTime("12:00")) periods["Утро"].push(timeSlot);
      else if (slotTime < parseTime("18:00")) periods["День"].push(timeSlot);
      else periods["Вечер"].push(timeSlot);
    });
  } else {
    console.error("Invalid format for hours in availability", hours);
  }
  return periods;
};

const removeBookedSlots = (
  periods,
  appointments,
  serviceDuration,
  workingHoursEnd,
  selectedDate
) => {
  const selectedDayDetails = {
    day: selectedDate.getDate(),
    month: selectedDate.getMonth(),
    year: selectedDate.getFullYear(),
  };

  appointments.forEach(({ date_time, service_id }) => {
    const appointmentStartTime = new Date(date_time);
    const appointmentEndTime = new Date(
      appointmentStartTime.getTime() +
        getServiceDuration(service_id, categories) * 60000
    );

    if (isSameDay(appointmentStartTime, selectedDayDetails)) {
      processPeriods(
        periods,
        serviceDuration,
        selectedDate,
        (slotTime, slotEndTime) => {
          return (
            (slotTime >= appointmentStartTime &&
              slotTime < appointmentEndTime) ||
            (slotEndTime > appointmentStartTime &&
              slotEndTime <= appointmentEndTime)
          );
        }
      );
    }

    processPeriods(
      periods,
      serviceDuration,
      selectedDate,
      (slotTime, slotEndTime) => {
        return slotEndTime > workingHoursEnd;
      }
    );
  });
};

const filteredPeriods = ref([]);
const workingHoursEnd = computed(() =>
  getWorkingHoursEnd(
    availability.value[weekdaySelect.value],
    selectedDate.value
  )
);

const availablePeriods = computed(() =>
  getAvailableTimeSlots({
    [weekdaySelect.value]: availability.value[weekdaySelect.value],
  })
);

watchEffect(() => {
  hasAvailableTimeSlots.value = false; // Reset to false each time

  if (availablePeriods.value) {
    removeBookedSlots(
      availablePeriods.value,
      appointment.value,
      selectedServiceDuration.value,
      workingHoursEnd.value,
      selectedDate.value
    );
    let periodsToFilter = ["Утро", "День", "Вечер"]
      .map((label) => ({
        label,
        times: availablePeriods.value[label],
      }))
      .filter((period) => period.times && period.times.length > 0);

    // Filter based on current time if it's the current day
    if (isToday(selectedDate.value)) {
      periodsToFilter = periodsToFilter
        .map((period) => ({
          ...period,
          times: period.times.filter((time) => {
            const [hours, minutes] = time.split(":").map(Number);
            return hours + minutes / 60 >= currentTime;
          }),
        }))
        .filter((period) => period.times.length > 0);
    }

    filteredPeriods.value = periodsToFilter;
  }

  Object.values(filteredPeriods.value).forEach((period) => {
    if (period.times.length > 0) {
      hasAvailableTimeSlots.value = true;
    }
  });
});

const showUnavailableAlert = computed(() => {
  return isToday(selectedDate.value) && isCurrentTimePastWorkingHours.value;
});

const isCurrentTimePastWorkingHours = computed(() => {
  if (workingHoursEnd.value && currentTime.value > workingHoursEnd.value) {
    return true;
  }
  return false;
});
</script>
