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

<style>
/* Additional styles can be added here */
</style>
