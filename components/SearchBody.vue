<template>
  <div class="p-6">
    <!-- <div>{{ salons }}</div> -->
    <ul>
      <li
        v-for="salon in businessStore.business.data"
        :key="salon.id"
        class="border-b last:border-b-0"
      >
        <a
          href="#"
          class="text-white block p-4 rounded hover:bg-gray-50 hover:text-black"
        >
          <p class="font-semibold">{{ salon.name }}</p>
          <!-- <p class="text-sm text-gray-600">{{ salon.address }}</p> -->
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
const businessStore = useBusinessStore();

watchEffect(() => {
  //   console.log(data.value);
});
</script>
