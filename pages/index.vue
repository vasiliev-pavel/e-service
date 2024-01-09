<template>
  <SearchBody />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["no-back-navigation"],
});

const user = useSupabaseUser();
const businessStore = useBusinessStore();
const userStore = useUserStore();

const { data } = await useFetch("/api/user/businesses");

watchEffect(async () => {
  if (user.value) {
    userStore.resetSelected();
  }
  if (data.value) businessStore.setBusiness(data.value);
});
useRouteLeaveGuard();
</script>
