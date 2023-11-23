<!-- не удалять может пригодится в будушем -->

<script setup lang="ts">
const user = useSupabaseUser();
watch(
  user,
  async () => {
    const businessStore = useBusinessStore();

    if (user.value) {
      // Загрузка данных бизнеса
      const { data } = await useFetch("/api/business");
      if (data.value) {
        businessStore.updateBusiness(data.value);
      }
      // Перенаправление на главную страницу
      navigateTo("/");
    }
  },
  { immediate: true }
);
</script>

<template>
  <div>Waiting for login...</div>
</template>
