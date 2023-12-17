<script setup>

const isOpen = ref(false);
const services = ref([]);

const toggleModal = () => {
    isOpen.value = !isOpen.value;
};
</script>
<template>
    <div class="flex flex-col">
        <UBadge class="my-4" color="primary" variant="subtle" size="lg">Specialists</UBadge>
        <UButton class="my-2" size="lg" @click="toggleModal">Create</UButton>
    </div>
    <ModalCreateSpecialist :is-open="isOpen" @update:isOpen="isOpen = $event" />
</template>