<template>
  <UTabs
    :items="tabsItems"
    :ui="{
      list: { background: 'bg-transparent dark:bg-gray-700' },
    }"
    class="flex flex-col items-center justify-center p-3 max-w-sm mx-auto"
  >
    <template v-slot:tab1>
      <!-- Содержимое для вкладки конкретного специалиста -->
      <CalendarShow />
    </template>

    <template v-slot:tab2>
      <!-- Содержимое для вкладки со всеми специалистами -->
      <!-- <AllSpecialistsCalendar /> -->
      <div>pupup</div>
    </template>
  </UTabs>
</template>

<script setup>
import { ref, computed } from "vue";
// Импортируем остальной необходимый код
import { useUserStore } from "~/stores/user";
const userStore = useUserStore();
const specialistName = userStore.selectedSpecialist.name;

// Данные для вкладок
const tabsItems = [
  { slot: "tab1", label: specialistName },
  { slot: "tab2", label: "Все специалисты" },
];

// Компоненты SpecialistCalendar и AllSpecialistsCalendar - это компоненты, которые вы должны создать или импортировать.
</script>

<style>
.custom-tabs .tab {
  color: #ff0000; /* Задайте нужный вам цвет текста */
}
</style>
