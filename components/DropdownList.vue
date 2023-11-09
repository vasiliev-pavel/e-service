<template>
  <section>
    <h2 @click="isListOpen = !isListOpen">{{ title }}</h2>
    <ul v-show="isListOpen">
      <li v-for="item in items" :key="item.id">
        <input
          type="checkbox"
          :id="item.id"
          :checked="store.selectedServices[item.id]"
          @change="() => store.toggleCheckbox(item.id, item.price)"
        />
        <label :for="item.id">{{ item.label }} - {{ item.price }} ₽</label>
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
