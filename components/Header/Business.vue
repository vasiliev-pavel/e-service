<script setup>

const profileStore = useProfileStore();
const isOpenCreate = ref(false);
const isOpenSelect = ref(false);
const toggleModalCreate = () => { isOpenCreate.value = !isOpenCreate.value; };
const toggleModaSelect = () => { isOpenSelect.value = !isOpenSelect.value; };

const businessName = computed(() => {
    return profileStore.currentBusiness ? profileStore.currentBusiness.name : 'Create Business';
})

</script>

<template>
    <UButton class="flex my-4 p-4" @click="toggleModaSelect" v-if="profileStore.currentBusiness">
        <i class="i-heroicons-building-storefront-20-solid"></i>
        {{ businessName }}
    </UButton>
    <UButton class="text-3xl my-4" @click="toggleModalCreate" v-if="!profileStore.currentBusiness">
        <i class="i-heroicons-plus-20-solid"></i>Create Business
    </UButton>
    <ModalCreateBusiness :is-open-create="isOpenCreate" @update:isOpenCreate="isOpenCreate = $event" />
    <ModalSelectBusiness :is-open-select="isOpenSelect" @update:isOpenSelect="isOpenSelect = $event" />
</template>