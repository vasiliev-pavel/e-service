<script setup lang="ts">
import { watch } from "vue";

const user = useSupabaseUser();

const userID = user?.value?.id;
const profileStore = useProfileStore();

const isLoading = ref(false);

watch(
  user,
  async () => {
    isLoading.value = true;
    if (user.value) {
      await profileStore.fetchMyProfile(userID);
      await profileStore.fetchMyBusinesses(userID);
      isLoading.value = false;
      navigateTo("/");
    }
  },
  { immediate: true }
);
</script>


<template>
  <Loader :is-loading="true" />
</template>
