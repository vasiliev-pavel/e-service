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
      <!-- Footer with Sign in button -->
      <footer class="p-4 shadow-t">
        <button
          class="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold text-lg block text-center"
        >
          Sign in with Google
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBusinessStore } from "~/stores/business";

const route = useRoute();
const router = useRouter();
const businessStore = useBusinessStore();

onMounted(() => {
  const id = route.query.id as string;
  if (id && route.path === "/") {
    businessStore.subscribeToBusiness(id);
  }
  console.log(id);
});

onUnmounted(() => {
  // businessStore.unsubscribeFromBusiness();
});

// Функция для входа через Google
</script>
