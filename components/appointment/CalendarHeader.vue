<template>
  <header class="flex w-full justify-between items-center mb-2">
    <h1 class="text-left font-bold">
      <span v-if="visibleMonths.length === 1">{{ visibleMonths[0] }}</span>
      <span v-else>{{ visibleMonths.join(" - ") }}</span>
    </h1>
    <nav>
      <button
        @click="$emit('scroll', -1)"
        :disabled="isPrevDisabled"
        class="p-2 disabled:opacity-50"
      >
        &lt;
      </button>
      <button
        @click="$emit('scroll', 1)"
        :disabled="isNextDisabled"
        class="p-2 disabled:opacity-50"
      >
        &gt;
      </button>
    </nav>
  </header>
</template>

<script setup>
defineProps(["visibleMonths", "isPrevDisabled", "isNextDisabled"]);
</script>
