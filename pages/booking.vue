<template>
  <div
    v-show="nameBusiness"
    class="flex flex-col h-screen bg-gradient-to-tr from-start to-end text-white"
  >
    <div class="p-4">
      <h1 class="font-bold text-xl mt-2">{{ nameBusiness }}</h1>
      <h3 class="text-2xl font-semibold mt-4 mb-4">Where do I begin?</h3>
    </div>

    <!-- Update the grid to have 2 columns and adjust the width as necessary -->
    <div class="flex-grow flex flex-col items-center">
      <div class="grid grid-cols-2 gap-4 max-w-md">
        <NuxtLink to="/services">
          <SelectService label="Select services" />
        </NuxtLink>

        <NuxtLink to="/providers">
          <SelectService label="Select provider" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useBusinessStore } from "~/stores/business";

const businessStore = useBusinessStore();

// Создаем вычисляемое свойство
const nameBusiness = computed(() => userStore.selectedSalon.title);
const userStore = useUserStore();

onMounted(() => {
  // if (process.client) {
  //   const storedData = localStorage.getItem("selectedSalon");
  //   if (storedData) {
  //     userStore.setSelectedSalon(JSON.parse(storedData));
  //   }
  // }
});
</script>
