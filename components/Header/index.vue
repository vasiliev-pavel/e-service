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

const logout = async () => {
    profileStore.resetProfile();
    await client.auth.signOut();
    navigateTo("/login");
};
</script>

<template>
    <header v-if="user" class="flex justify-between align-center sticky top-0 left-0 right-0">
        <UButton class="text-3xl my-4 p-4" trailing-icon="i-heroicons-bars-3-20-solid" @click="isMenuOpen = true" />
        <HeaderBusiness v-if="isOwner" />
        <UButton class="text-3xl my-4 p-4" trailing-icon="i-heroicons-user-20-solid" @click="isProfileOpen = true" />

        <USlideover v-model="isMenuOpen" side="left">
            <UCard @click="isMenuOpen = false" class="flex flex-col flex-1"
                :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template class="flex flex-col" #header>
                    <div class="flex items-center justify-between">
                        <h3
                            class="flex flex-col capitalize text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            E-Service
                            <UBadge>{{ profileStore?.myProfile?.role }} Dashboard </UBadge>
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="isMenuOpen = false" />
                    </div>
                </template>

                <HeaderMenu />

                <template class="flex flex-col" #footer>
                    <UButton class="flex my-4 p-4 w-full" to="/settings">
                        <i class="i-heroicons-presentation-chart-line-20-solid" />Statistics
                    </UButton>
                    <UButton class="flex my-4 p-4 w-full" to="/settings">
                        <i class="i-heroicons-lifebuoy-20-solid" />Help Center
                    </UButton>
                </template>
            </UCard>
        </USlideover>
        <USlideover v-model="isProfileOpen" side="right">
            <UCard @click="isProfileOpen = false" class="flex flex-col flex-1"
                :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template class="flex flex-col" #header>
                    <div class="flex items-center justify-between">
                        <h3
                            class="flex flex-col capitalize text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            {{ profileStore?.myProfile?.full_name }}
                            <UBadge>{{ profileStore?.myProfile?.role }}</UBadge>
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="isProfileOpen = false" />
                    </div>
                </template>

                <HeaderProfile />

                <template class="flex flex-col" #footer>
                    <UButton class="flex my-4 p-4 w-full" to="/settings">
                        <i class="i-heroicons-cog-6-tooth-20-solid"></i>Settings
                    </UButton>
                    <UButton class="flex my-4 p-4 w-full" @click="logout">
                        <i class="i-heroicons-arrow-left-on-rectangle-20-solid"></i>Logout
                    </UButton>
                </template>
            </UCard>
        </USlideover>
    </header>
</template>