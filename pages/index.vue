<template>
  <SearchBody />
  <div>Its index page</div>
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

watchEffect(() => {
  if (user.value) {
    // console.log(user.value);
    // navigateTo("/booking");
  }
});

const logout = async () => {
  await client.auth.signOut();
  navigateTo("/login");
};
</script>
