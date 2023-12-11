<script setup lang="ts">
import { watch } from "vue";

const user = useSupabaseUser();

const userID = user?.value?.id;
const profileStore = useProfileStore();
// asd
watch(
  user,
  async () => {
    if (user.value) {
      await profileStore.fetchMyProfile(userID);
      await profileStore.fetchMyBusinesses(userID);

      navigateTo("/");
    }
  },
  { immediate: true }
);
</script>

<template>
  <div>Waiting for login...</div>
</template>
