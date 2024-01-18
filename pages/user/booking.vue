<template>
  <div
    v-show="nameBusiness"
    class="flex flex-col h-screen bg-gradient-to-tr from-start to-end text-white"
  >
    <!-- Индикатор загрузки -->
    <div
      v-if="loading.isLoading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <!-- Можете заменить на любой индикатор загрузки -->
      <div class="spinner"></div>
    </div>

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
definePageMeta({
  layout: "user",
});

useHead({
  title: "Booking",
  meta: [{ name: "description", content: "My amazing site." }],
});

import { computed } from "vue";
// import { useBusinessStore } from "~/stores/business";
import moment from "moment";
import SelectService from "~/components/user/SelectService.vue";

const route = useRoute();
const businessId = computed(() => route.query.id || null);
const loading = useLoadingStore();
const businessStore = useBusinessStore();
const userStore = useUserStore();
const nameBusiness = ref("");
let businessData, pending, error;

// const {
//   data: businessData,
//   pending,
//   error,
// } = await useAsyncData("businessInfo", () =>
//   $fetch(`/api/user/businesses/get/${businessId.value}`)
// );

if (!businessStore.selectedSalonId) {
  ({
    data: businessData,
    pending,
    error,
  } = await useAsyncData("businessInfo", () =>
    $fetch(`/api/user/businesses/get/${businessId.value}`)
  ));
}

onMounted(async () => {
  if (businessId.value) {
    nameBusiness.value = businessData.value.data[0].name;
    businessStore.selectedSalonId = businessId.value;
    businessStore.getSpecialistAppointments(businessId.value);
  } else {
    nameBusiness.value = userStore.selectedSalon.title;
    businessStore.getSpecialistAppointments(businessStore.selectedSalonId);
  }
  userStore.setSelectedDay(moment().toISOString());
  userStore.resetSelectedServices();
  userStore.resetSelectedSpecialist();
});

const nuxtApp = useNuxtApp();
nuxtApp.hook("page:start", () => {
  loading.value = true; // Включить индикатор при начале загрузки страницы
});
nuxtApp.hook("page:finish", () => {
  loading.value = false; // Выключить индикатор по окончании загрузки страницы
});

useRouteLeaveGuard();
</script>
<style>
/* Простой спиннер в качестве индикатора загрузки */
.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #fff;
  width: 50px;
  height: 50px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Анимация спиннера */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  } /* Safari */
  100% {
    -webkit-transform: rotate(360deg);
  } /* Safari */
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
