<template>
  <div
    class="flex flex-col items-center m-5 text-gray-300 first-line:justify-center p-3 max-w-sm mx-auto"
  >
    <!-- <div class="flex items-center w-full"> -->
    <CalendarHeader
      :visibleMonths="visibleMonths"
      :isPrevDisabled="isPrevDisabled"
      :isNextDisabled="isNextDisabled"
      @scroll="scroll"
    />
    <!-- </div> -->
    <div class="flex justify-center items-center w-full">
      <DateCell
        v-for="date in visibleDates"
        :key="date.toString()"
        :date="date"
        :isSelected="date.isSame(selectedDate, 'day')"
        @click="selectDate(date)"
      />
    </div>
  </div>

  <TimeSlot :selectedDate="selectedDate" />
  <!-- <SpecUnavNotification v-else-if="isWeekend" :selectedDay="dayNumber" /> -->
</template>

<script setup>
import DateCell from "~/components/appointment/DateCell.vue";
import TimeSlot from "~/components/appointment/TimeSlot.vue";
import CalendarHeader from "~/components/appointment/CalendarHeader.vue";
import { ref, computed } from "vue";
import moment from "moment";

const userStore = useUserStore();

// const selectedDate = ref(moment());
// Переключение на использование выбранной даты из userStore
const selectedDate = computed(() => userStore.selectedDay);

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
  // selectedDate.value = date;
  userStore.setSelectedDay(date);
};
</script>
