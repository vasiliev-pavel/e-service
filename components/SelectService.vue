<template>
  <div
    class="select-services w-150 h-200 bg-blue-500 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-600"
  >
    <div>
      <span class="text-white text-lg">{{ label }}</span>
      <i class="fas fa-chevron-right text-white text-lg ml-2"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "Select services",
    },
  },
};
</script>
<style scoped>
/* Ensure the width and height are set to 150x200 pixels if not defined in Tailwind's config */
.w-150 {
  width: 150px;
}
.h-200 {
  height: 200px;
}
</style>
