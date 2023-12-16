<script setup lang="ts">

const isOpen = ref(false);
const user = useSupabaseUser();
const client = useSupabaseClient();
const profileStore = useProfileStore();
const user_role = profileStore?.myProfile?.role;

const logout = async () => {
    await client.auth.signOut();
    navigateTo("/login");
};
</script>

<template>
    <div v-if="user" class="flex justify-between align-center">
        <UButton class="text-3xl my-4 p-4" trailing-icon="i-heroicons-bars-3-20-solid" @click="isOpen = true" />
        <HeaderBusiness v-if="user_role === 'owner'" />
        <span />

        <USlideover v-model="isOpen" side="left">
            <UCard @click="isOpen = false" class="flex flex-col flex-1"
                :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template class="flex flex-col" #header>
                    <div class="flex items-center justify-between">
                        <h3
                            class="flex flex-col capitalize text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            E-Service
                            <UBadge>{{ profileStore?.myProfile?.role }} Dashboard </UBadge>
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="isOpen = false" />
                    </div>
                </template>

                <HeaderMenu />

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
    </div>
</template>