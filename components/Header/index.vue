<script setup lang="ts">

const isMenuOpen = ref(false);
const isProfileOpen = ref(false);
const user = useSupabaseUser();
const client = useSupabaseClient();
const profileStore = useProfileStore();

const isOwner = computed(() => {
    if (profileStore?.myProfile?.role === 'owner')
        return true;
    return false;
})

const toPanel = () => {
    navigateTo("/panel");
}

const logout = async () => {
    profileStore.resetProfile();
    await client.auth.signOut();
    navigateTo("/login");
};
</script>

<template>
    <header v-if="user" class="flex justify-between align-center sticky top-0 left-0 right-0">
        <UButton class="text-3xl my-4 p-4" trailing-icon="i-heroicons-squares-2x2-20-solid" title="Dasboard"
            @click="toPanel" />
        <HeaderBusiness v-if="isOwner" />
        <UButton class="text-3xl my-4 p-4" trailing-icon="i-heroicons-arrow-left-on-rectangle-20-solid" @click="logout"
            title="Logout" />
    </header>
</template>