<template>
  <div class="flex flex-col items-center m-5">
    <CalendarHeader
      :visibleMonths="visibleMonths"
      :isPrevDisabled="isPrevDisabled"
      :isNextDisabled="isNextDisabled"
      @scroll="scroll"
    />
    <div class="flex justify-center">
      <DateCell
        v-for="date in visibleDates"
        :key="date.toString()"
        :date="date"
        @click="selectDate(date)"
      />
    </div>
  </div>

  <!-- <TimeSlot
    v-if="!isWeekend && !showUnavailableAlert && hasAvailableTimeSlots"
    :filteredPeriods="filteredPeriods"
    :selectedDate="selectedDate"
  /> -->

  <!-- <UnavailableDateAlert
    v-if="
      (showUnavailableAlert && !isWeekend) ||
      (!hasAvailableTimeSlots && !isWeekend)
    "
    :selectedDay="dayNumber"
  />
  <SpecUnavNotification v-else-if="isWeekend" :selectedDay="dayNumber" /> -->
</template>

<script setup>
import DateCell from "~/components/appointment/DateCell.vue";
import CalendarHeader from "~/components/appointment/CalendarHeader.vue";

import { ref, computed } from "vue";
import moment from "moment";

const userStore = useUserStore();

const now = moment(); // Базовая дата, которая будет использоваться для всех расчетов
const visibleCount = 7;
const startIndex = ref(0);
// Убедимся, что allDates начинается с текущей даты и содержит последовательный набор дат
const allDates = ref([...Array(35)].map((_, i) => now.clone().add(i, "days")));

const visibleDates = computed(() => {
  // Получаем видимые даты на основе startIndex и visibleCount
  return allDates.value.slice(
    startIndex.value,
    startIndex.value + visibleCount
  );
});

const visibleMonths = computed(() => {
  // Получаем месяцы для видимых дат
  const months = visibleDates.value.map((date) => date.format("MMMM YYYY"));
  return [...new Set(months)];
});

const isPrevDisabled = computed(() => startIndex.value === 0);
const isNextDisabled = computed(
  () => startIndex.value + visibleCount >= allDates.value.length
);

function scroll(direction) {
  // Обновляем startIndex, убедившись, что значение не выходит за пределы допустимого диапазона
  const newIndex = startIndex.value + direction * visibleCount;
  if (newIndex >= 0 && newIndex <= allDates.value.length - visibleCount) {
    startIndex.value = newIndex;
  }
}

const selectDate = async (date) => {
  // const { data: availability } = await useFetch(
  //   `/api/availability/${userStore.selectedSpecialist.id}`
  // );
  // // console.log(availability.value);
  // Логика выбора даты...
};
</script>
