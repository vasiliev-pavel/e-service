<template>
  <div
    class="flex flex-col h-screen bg-gradient-to-tr from-start to-end text-white"
  >
    <div class="p-4">
      <h2 class="text-sm uppercase tracking-wide">e-service</h2>
      <h1 class="font-bold text-xl mt-2">{{ nameBusinnes }}</h1>
    </div>
    <div class="flex-grow flex flex-col items-center justify-center">
      <h3 class="text-2xl font-semibold mb-8">Where do I begin?</h3>
      <!-- Update the grid to have 2 columns and adjust the width as necessary -->
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
import { useBusinessStore } from "@/stores/business";

const businessStore = useBusinessStore();
const nameBusinnes = businessStore.businessData.name;
</script>
<style>
/* You might want to add some custom styles or adjust the Tailwind classes to better match your design */
</style>
