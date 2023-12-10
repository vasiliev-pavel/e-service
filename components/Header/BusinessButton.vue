<script setup>
import { ref } from 'vue';

const toggleModal = () => {
    isOpen.value = !isOpen.value;
};

const isOpen = ref(false);

const profileStore = useProfileStore();

const companies = [
    [{
        label: 'Find Bussiness',
        icon: 'i-heroicons-magnifying-glass-20-solid'
    }],
    [{
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
    },],
    [{
        label: 'New Business',
        icon: 'i-heroicons-plus-20-solid',
        click: toggleModal
    }]
]
</script>
<template>
    <UDropdown :items="companies" :popper="{ placement: 'bottom-start' }">
        <UButton color="white" label="Companies" trailing-icon="i-heroicons-chevron-up-down-20-solid" />
    </UDropdown>
    <ModalCreateBusiness :is-open="isOpen" @update:isOpen="isOpen = $event" />
</template>