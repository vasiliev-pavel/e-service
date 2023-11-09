<template>
  <section class="bg-white shadow-md rounded-lg overflow-hidden my-1">
    <h2
      class="text-lg font-semibold text-gray-800 px-3 py-2 cursor-pointer hover:bg-gray-100"
      @click="isListOpen = !isListOpen"
    >
      {{ title }}
    </h2>
    <ul v-show="isListOpen" class="px-6 py-2 bg-gray-50">
      <li
        v-for="item in items"
        :key="item.id"
        class="flex items-center justify-between py-1"
      >
        <label :for="item.id" class="flex items-center cursor-pointer">
          <input
            type="checkbox"
            :id="item.id"
            class="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            :checked="store.selectedServices[item.id]"
            @change="() => store.toggleCheckbox(item.id, item.price)"
          />
          <span class="ml-2 text-gray-700"
            >{{ item.label }} - {{ item.price }} ₽</span
          >
        </label>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";

const props = defineProps({
  title: String,
  items: Array,
});

const store = useUserStore();
const isListOpen = ref(false);
</script>
