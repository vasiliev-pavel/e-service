<!-- не удалять может пригодится в будушем -->

<script setup lang="ts">
const user = useSupabaseUser();
watch(
  user,
  async () => {
    if (user.value) {
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
