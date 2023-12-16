<script setup>

const isOpen = ref(false);
const services = ref([]);

const toggleModal = () => {
    isOpen.value = !isOpen.value;
};
</script>
<template>
    <div class="flex flex-col">
        <UBadge class="my-4" color="primary" variant="subtle" size="lg">Categories</UBadge>
        <UButton class="my-2" size="lg" @click="toggleModal">Create</UButton>
    </div>
    <ModalCreateCategory :is-open="isOpen" @update:isOpen="isOpen = $event" />
</template>