<script setup lang="ts">
import { watch } from "vue";

const isLoading = ref(false);
const user = useSupabaseUser();
const profileStore = useProfileStore();

watch(
  user,
  async () => {
    // Modal
    isLoading.value = true;
    if (user.value) {
      // Fetch Profile Data
      const profile = await profileStore.fetchMyProfile(user.value.id);
      if (profile.role === 'owner') {
        await profileStore.fetchMyBusinesses(user.value.id);
        navigateTo("/panel");
      }
      if (profile.role === 'specialist') {
        await profileStore.fetchMyBusinesses(user.value.id);
        navigateTo("/panel");
      }
      if (profile.role === 'customer') {
        navigateTo("/");
      }
    }
  },
  { immediate: true }
);
</script>


<template>
  <Loader :is-loading="true" />
</template>
