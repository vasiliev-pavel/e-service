<template>
  <h2 class="text-gray-200 text-lg mb-3 text-center">Select a date and time</h2>

  <section
    v-if="userStore.availableSpecialistIds.length < 2"
    class="flex flex-col items-center justify-center p-3 max-w-sm mx-auto"
  >
    <CalendarShow2 />
  </section>

  <UTabs
    v-else
    v-model="currentTab"
    :items="tabsItems"
    :ui="{
      list: { background: 'bg-transparent dark:bg-gray-700' },
    }"
    class="flex flex-col items-center justify-center p-3 max-w-sm mx-auto"
  >
    <template v-slot:tab1>
      <CalendarShow2 />
    </template>

    <template v-slot:tab2>
      <CalendarShow2 />
      <div>pupup</div>
    </template>
  </UTabs>
</template>

<script setup>
definePageMeta({
  layout: "user",
});
import { ref, computed } from "vue";
import CalendarShow2 from "~/components/user/appointment/CalendarShow2.vue";
import { useUserStore } from "~/stores/user";

const currentTab = ref(0); // default to the first tab
const userStore = useUserStore();
// const specialistName = userStore.selectedSpecialist.name;
const supabase = useSupabaseClient();
const businessStore = useBusinessStore();

// Данные для вкладок
const tabsItems = computed(() => [
  { slot: "tab1", label: userStore.selectedSpecialist.name },
  {
    slot: "tab2",
    label: "All available",
  },
]);
let appointmentChanges;

const addNewAppointments = (payload) => {
  if (!payload.new) {
    console.error("Payload does not contain new data");
    return null;
  }

  const { date_time, id, service_id, specialist_id, status, category_id } =
    payload.new;

  console.log("Появилась новая запись");

  // userStore.specialistAppointments[id] = {
  //   id: id,
  //   date_time: date_time,
  //   service_id: service_id,
  //   specialist_id: specialist_id,
  //   status: status,
  //   category_id: category_id,
  // };
};

onMounted(() => {
  businessStore.setSelectedTab(0);

  // Инициализация подписки на события
  appointmentChanges = supabase
    .channel("schema-db-changes")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "appointments",
        filter: `specialist_id=eq.${userStore.selectedSpecialist.id}`,
      },
      addNewAppointments
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

watch(currentTab, (newTab, oldTab) => {
  console.log(`Switched from ${oldTab} to ${newTab}`);
  businessStore.setSelectedTab(newTab);
  // Perform any side effects or data fetching here
});
</script>
