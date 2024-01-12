<template>
  <div class="confirmation">
    <!-- Сообщение об успешной записи или ошибка -->
    <div v-if="isSuccess">
      Запись успешно создана!
      <button
        class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="toHome"
      >
        ПОНЯЛА
      </button>
    </div>
    <div v-else>Произошла ошибка при создании записи.</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "~/stores/user";

useHead({
  title: "Success",
  meta: [{ name: "description", content: "My amazing site." }],
});

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const isSuccess = ref(true);

const toHome = () => {
  router.push("/");
};

watch(
  () => route.query.session_id,
  async (sessionId) => {
    console.log(userStore.isAppointmentSubmitted);
    if (sessionId && !userStore.isAppointmentSubmitted) {
      try {
        // Запрос к серверу для проверки статуса оплаты
        const { data: session } = await useFetch(
          `/api/user/payment/${sessionId}`
        );

        if (session && session.value.payment_status === "paid") {
          //   Отправка данных о назначении в базу данных
          await $fetch(`/api/user/appointments/post`, {
            method: "post",
            body: userStore.appointObject,
          });

          userStore.isAppointmentSubmitted = true;
          console.log("данные отправились");
          // router.push("/");
        }
      } catch (error) {
        isSuccess.value = false;
        console.error("Ошибка:", error);
      }
    }
  },
  { immediate: true }
);
</script>
