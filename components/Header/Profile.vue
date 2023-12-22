<script setup>
const profileStore = useProfileStore();
const user_role = profileStore?.myProfile?.role;

// https://heroicons.com/


const menuItems = computed(() => {
    if (user_role === 'admin') {
        return [
            { title: 'Appointments', url: '/panel', icon: 'i-heroicons-bookmark-square-20-solid' },
        ];
    } else if (user_role === 'customer') {
        return [
            { title: 'My Appointments', url: '/user/appointments', icon: 'i-heroicons-bookmark-square-20-solid' },
        ];
    } else if (user_role === 'owner') {
        return [
            { title: 'My Appointments', url: '/panel', icon: 'i-heroicons-bookmark-square-20-solid' },
        ];
    } else if (user_role === 'specialist') {
        return [
            { title: 'My Appointments', url: '/panel', icon: 'i-heroicons-bookmark-square-20-solid' },
        ];
    }
});
</script>
<template>
    <nav class="flex flex-col">
        <UButton class="flex my-4 p-4" v-for="item in menuItems" :key="item.title" :to="item.url">
            <i :class="item.icon"></i> {{ item.title }}
        </UButton>
    </nav>
</template>