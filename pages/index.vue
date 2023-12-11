<template>
  <SearchBody />

  <button
    @click="logout"
    class="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold text-lg block text-center"
  >
    Sign out
  </button>
</template>

<script setup lang="ts">
const client = useSupabaseClient();
const user = useSupabaseUser();
const businessStore = useBusinessStore();
const userStore = useUserStore();
const { data } = await useFetch("/api/user/businesses");

watchEffect(async () => {
  if (user.value) {
    userStore.resetSelected();
    if (data.value) {
      businessStore.setBusiness(data.value);
    }
  }
});

const logout = async () => {
  await client.auth.signOut();
  navigateTo("/login");
};
</script>
