<script setup>
const user = useSupabaseUser();
</script>
<template>
    <footer v-if="user" class="flex justify-between align-center sticky  bottom-0 left-0 right-0">
        <!-- <FooterSelectDate /> -->
    </footer>
</template>