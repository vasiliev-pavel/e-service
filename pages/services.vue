<template>
  <div>
    <DropdownList
      v-for="(items, title) in categories"
      :key="title"
      :title="title"
      :items="items"
    />
    <div>Общая сумма: {{ userStore.totalSum }} ₽</div>
  </div>
</template>

<script setup>
import DropdownList from "~/components/DropdownList.vue";
import { useUserStore } from "~/stores/user";
import { ref } from "vue";
import { useBusinessStore } from "~/stores/business";

const userStore = useUserStore();
const categories = useBusinessStore().businessData.categories;
</script>
