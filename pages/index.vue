<script setup lang="ts"></script>

<template>
  <div class="flex flex-col h-screen bg-gradient-to-tr from-start to-end">
    <!-- Container for content -->
    <div class="flex-grow overflow-auto p-4">
      <!-- Top section with image and text -->
      <div class="text-center mb-6">
        <img
          src="~/assets/img/test.jpg"
          alt="Salon"
          class="w-full object-cover"
          style="max-height: 60vh"
        />
        <h1 class="text-2xl font-semibold my-4">
          Just make an appointment with e-service
        </h1>
        <p class="text-gray-600 mb-4">
          Choice, booking, service — all in your rhythm, with no excess noise.
        </p>
      </div>
      <footer class="p-4 shadow-t">
        <NuxtLink
          to="/booking"
          class="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold text-lg block text-center"
        >
          Get Started
        </NuxtLink>
      </footer>
    </div>
    <!-- Fixed button at the bottom -->
  </div>
</template>

<script setup>
import { useAsyncData } from "nuxt/app";
import { useRoute } from "vue-router";
import { useBusinessStore } from "~/stores/business";

const route = useRoute();
const businessStore = useBusinessStore();

// Функция для загрузки данных о бизнесе
const loadBusinessData = async (id) => {
  // Проверяем, что мы находимся на главной странице и что данные еще не были загружены
  if (!businessStore.businessData) {
    await businessStore.fetchBusiness(id);
  }
};

onMounted(() => {
  const id = route.query.id;
  if (id && route.path === "/") {
    loadBusinessData(id);
  }
});

// Используем useAsyncData для загрузки данных асинхронно
// и устанавливаем ключ, чтобы избежать коллизии, если используется на разных страницах
// const { data, error } = useAsyncData("businessData", () => {
//   const id = route.query.id;
//   // Выполняем запрос только если id существует и мы находимся на главной странице
//   if (id && route.path === "/") {
//     return fetchBusinessData(id);
//   }
// });
</script>
