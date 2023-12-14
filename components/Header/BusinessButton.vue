<script setup>
import { ref } from 'vue';

const toggleModal = () => {
    isOpen.value = !isOpen.value;
};

const isOpen = ref(false);

const profileStore = useProfileStore();

const companyList = computed(() => {
    return profileStore.myBusinesses.value?.map(business => ({
        label: business.name,
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => { /* handle click event */ },
    })) || [];
});

const selectedCompany = computed(() => {
    return companyList.value.length > 0 ? companyList.value[0].label : 'Select a business';
});


const companies = computed(() => [
    [{
        label: 'Find Business',
        icon: 'i-heroicons-magnifying-glass-20-solid'
    }],
    ...companyList.value,
    [{
        label: 'New Business',
        icon: 'i-heroicons-plus-20-solid',
        click: toggleModal
    }]
]);

</script>
<template>
    <UDropdown class="text-3xl my-4" :items="companies" :popper="{ placement: 'bottom-start' }">
        <UButton color="white" :label="selectedCompany.value" trailing-icon="i-heroicons-chevron-up-down-20-solid" />
    </UDropdown>
    <ModalCreateBusiness :is-open="isOpen" @update:isOpen="isOpen = $event" />
</template>