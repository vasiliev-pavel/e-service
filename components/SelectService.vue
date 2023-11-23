<template>
  <div
    class="select-services bg-gray-800 rounded-lg flex justify-start cursor-pointer hover:bg-gray-600"
    style="width: 150px; height: 150px"
  >
    <div class="text-white text-lg pl-4 pt-4">
      <span>{{ label }}</span>
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
