<template>
  <div class="flex flex-col items-center justify-center p-2 max-w-sm mx-auto">
    <div class="font-semibold text-gray-200 text-lg">
      {{ formattedSelectedDay }}
    </div>
    <div class="text-gray-300 text-center mt-1">
      Please select another date or service
    </div>
    <button
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
      @click="navigateToServices"
    >
      Back to Services
    </button>
  </div>
</template>

<script setup>
import moment from "moment";
const props = defineProps({
  selectedDay: String,
});
const businessStore = useBusinessStore();
const router = useRouter();
const userStore = useUserStore();
// Вычисляемое свойство для форматированной даты
const formattedSelectedDay = computed(() => {
  // Убедитесь, что selectedDay действительно передан и является объектом moment
  if (props.selectedDay) {
    return `Unable to book for ${moment(props.selectedDay).format("MMMM Do")}`;
  }
  return "undefined error"; // Запасное сообщение или обработка ошибок
});

const navigateToServices = () => {
  router.push("/user/services"); // Adjust the path to match your route for services.vue
};
</script>
