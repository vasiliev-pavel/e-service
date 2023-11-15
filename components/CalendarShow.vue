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
        class="flex flex-col items-center mx-1 bg-gray-700 rounded-lg w-9 px-4 py-1 cursor-pointer hover:bg-gray-600 hover:shadow-lg transition-all duration-300 ease-in-out"
      >
        <div class="text-white text-xs">
          {{ date.toLocaleDateString("en", { weekday: "short" }) }}
        </div>
        <div class="flex items-center justify-center h-6">
          {{ date.getDate() }}
        </div>
      </div>
    </div>
  </div>

  <TimeSlot
    v-if="!isWeekend"
    :filteredPeriods="filteredPeriods"
    :selectedDate="selectedDate"
  />
  <SpecUnavNotification v-else :selectedDay="dayNumber" />
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
} from "~/utils/appointmentUtils";

const now = ref(new Date());
const defaultSelectDay = now.value
  .toLocaleString("en", { weekday: "long" })
  .toLowerCase();
const weekdaySelect = ref(defaultSelectDay);
const isWeekend = ref(true);
const selectedDate = ref(now);
const allDates = ref(generateDates());
const visibleCount = 7;
const startIndex = ref(0);
const endIndex = ref(visibleCount);

// Assuming useUserStore and useBusinessStore are part of a Vue composition API
const userStore = useUserStore();
const businessStore = useBusinessStore();
const specialistId = userStore.selectedSpecialist.id;
const categories = businessStore.businessData.categories;

// Assuming useAsyncData is a custom hook for async data fetching
const { data, pending, error } = await useAsyncData("data", () =>
  $fetch(`http://192.168.1.123:8000/specialist/${specialistId}/schedule`)
);

const availability = data.value.availability;
const appointment = data.value.appointments;

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
  const dayOfWeek = date
    .toLocaleDateString("en", { weekday: "long" })
    .toLowerCase();
  selectedDate.value = new Date(date);
  weekdaySelect.value = dayOfWeek;

  dayNumber.value = {
    day: date.getDate(),
    month: date.toLocaleString("en-EN", { month: "long" }),
  };
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

const removeBookedSlots = (periods, appointments) => {
  appointments.forEach((appointment) => {
    const appointmentDate = new Date(appointment.date_time);
    if (
      appointmentDate.getDate() === dayNumber.value.day &&
      appointmentDate.toLocaleString("en-EN", { month: "long" }) ===
        dayNumber.value.month
    ) {
      const serviceDuration = getServiceDuration(
        appointment.service_id,
        categories
      );
      const endTime = new Date(
        appointmentDate.getTime() + serviceDuration * 60000
      );
      Object.values(periods).forEach((period) => {
        createTimeSlots(appointmentDate, endTime).forEach((slot) => {
          const index = period.indexOf(slot);
          if (index > -1) period.splice(index, 1);
        });
      });
    }
  });
};

const availablePeriods = computed(() =>
  getAvailableTimeSlots({
    [weekdaySelect.value]: availability[weekdaySelect.value],
  })
);
const filteredPeriods = ref([]);

watchEffect(() => {
  if (availablePeriods.value) {
    removeBookedSlots(availablePeriods.value, appointment);
    filteredPeriods.value = ["Утро", "День", "Вечер"]
      .map((label) => ({
        label,
        times: availablePeriods.value[label],
      }))
      .filter((period) => period.times && period.times.length > 0); // Фильтрация блоков без доступных слотов
  }
});
</script>
