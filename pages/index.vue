<template>
  <SearchBody />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["no-back-navigation"],
});

// const client = useSupabaseClient();
const user = useSupabaseUser();
const businessStore = useBusinessStore();
const userStore = useUserStore();
const profileStore = useProfileStore();
const { data } = await useFetch("/api/user/businesses");

watchEffect(async () => {
  if (user.value) {
    userStore.resetSelected();
    profileStore.resetProfile();
  }
  if (data.value) businessStore.setBusiness(data.value);
});
useRouteLeaveGuard();
</script>
