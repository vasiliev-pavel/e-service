<template>
  <header class="flex justify-between items-center mb-2 w-full px-1">
    <h1 class="text-left font-bold">
      <span v-if="visibleMonths.length === 1">{{ visibleMonths[0] }}</span>
      <span v-else>{{ visibleMonths.join(" - ") }}</span>
    </h1>
    <nav>
      <button
        @click="$emit('scroll', -1)"
        :disabled="isPrevDisabled"
        class="pr-2 disabled:opacity-50"
      >
        <BackIcon />
      </button>
      <button
        @click="$emit('scroll', 1)"
        :disabled="isNextDisabled"
        class="pl-2 disabled:opacity-50"
      >
        <ForwardIcon />
      </button>
    </nav>
  </header>
</template>

<script setup>
import BackIcon from "@/components/icons/BackIcon.vue";
import ForwardIcon from "@/components/icons/ForwardIcon.vue";
defineProps(["visibleMonths", "isPrevDisabled", "isNextDisabled"]);
</script>
