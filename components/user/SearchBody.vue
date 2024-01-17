<template>
  <div class="p-6">
    <ul>
      <li
        v-for="salon in businessStore.businesses.data"
        :key="salon.id"
        class="border-b last:border-b-0"
      >
        <!-- Add an @click handler to save the selected salon and navigate -->
        <a
          @click="selectSalon(salon)"
          class="text-white block p-4 rounded hover:bg-gray-50 hover:text-black"
        >
          <p class="font-semibold">{{ salon.name }}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const businessStore = useBusinessStore();
const router = useRouter();
const user = useUserStore();
</script>
