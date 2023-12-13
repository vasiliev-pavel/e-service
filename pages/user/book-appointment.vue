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
      <CalendarShow2 />
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
import CalendarShow2 from "~/components/appointment/CalendarShow2.vue";
// Импортируем остальной необходимый код
import { useUserStore } from "~/stores/user";
const userStore = useUserStore();
const specialistName = userStore.selectedSpecialist.name;
const supabase = useSupabaseClient();

// Данные для вкладок
const tabsItems = [
  { slot: "tab1", label: specialistName },
  { slot: "tab2", label: "Все доступные" },
];
let appointmentChanges;

onMounted(() => {
  // Инициализация подписки на события
  appointmentChanges = supabase
    .channel("schema-db-changes")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "appointments" },
      (payload) => {
        console.log("New appointment added:", payload);
      }
    )
    .subscribe();
});

onBeforeUnmount(() => {
  // Отписка от событий при уходе со страницы
  if (appointmentChanges) {
    // console.log("Отписался от событий");
    supabase.removeChannel(appointmentChanges);
  }
});
</script>

<style>
.custom-tabs .tab {
  color: #ff0000; /* Задайте нужный вам цвет текста */
}
</style>
