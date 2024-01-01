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
        <NuxtLink to="/user/services">
          <SelectService label="Select services" />
        </NuxtLink>

        <NuxtLink to="/user/providers">
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
const userStore = useUserStore();

// Создаем вычисляемое свойство
const nameBusiness = ref(userStore.selectedSalon.title);

onMounted(() => {
  if (!process.client) return;
  // console.log(businessStore.selectedSalonId);
  businessStore.getSpecialistAppointments(businessStore.selectedSalonId);
  userStore.resetSelectedServices();
  userStore.resetSelectedSpecialist();
});

useRouteLeaveGuard();
</script>
