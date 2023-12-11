<template>
    <div v-if="isLoading" class="wrapper_loader">
        <div class="loader"></div>
    </div>
</template>
  
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    isLoading: Boolean
});
</script>
  
<style scoped>
.wrapper_loader {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
}

.loader {
    display: flex;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
  