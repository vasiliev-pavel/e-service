<script setup>

const client = useSupabaseClient();

const logout = async () => {
    await client.auth.signOut();
    navigateTo("/login");
};
</script>
<template>
    <UButton class="flex my-4 p-4 w-full" @click="logout">
        <i class="i-heroicons-arrow-left-on-rectangle-20-solid"></i>Logout
    </UButton>
</template>