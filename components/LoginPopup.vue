<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
    @click="$emit('update:isOpen', false)"
  >
    <div
      class="fixed bottom-0 inset-x-0 p-5 border shadow-lg bg-white rounded-t-md animate-slideUp md:animate-none md:relative md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-auto md:max-w-md md:rounded-md w-96 h-60"
      @click.stop
    >
      <div class="text-center">
        <h3 class="text-lg font-bold">Log in</h3>
        <div v-if="!otpSent">
          <button
            @click="signInWithGoogle"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded block w-full my-3"
          >
            Log in with Google
          </button>
          <input
            v-model="phone"
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            placeholder="Phone Number"
            class="border rounded p-2 w-full"
          />
          <button
            @click="signInWithPhone"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block w-full my-3"
          >
            Send OTP
          </button>
        </div>
        <div v-else class="space-y-6">
          <p class="text-sm mb-4">
            Enter 6 digit verification code sent to your phone number
          </p>
          <div class="flex justify-center space-x-2 mb-4">
            <input
              v-for="index in 6"
              :key="index"
              :ref="(el) => (inputRefs[index - 1] = el)"
              v-model="otpCode[index - 1]"
              type="tel"
              inputmode="numeric"
              maxlength="1"
              class="w-10 h-10 border rounded text-center form-input"
              @input="focusNext(index, $event)"
              @keydown="focusPrevious(index, $event)"
              @paste.prevent="handlePaste"
            />
          </div>
          <button
            @click="verifyOtp"
            class="text-blue-500 hover:text-blue-700 text-sm"
          >
            Resend Code
          </button>
          <button
            @click="verifyOtp"
            class="text-blue-500 hover:text-blue-700 text-lg"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { nextTick } from "vue";

import GoogleIcon from "@/components/icons/GoogleIcon.vue";

const supabase = useSupabaseClient();
const props = defineProps({
  isOpen: Boolean,
});
const phone = ref("");
const otpCode = ref(Array(6).fill("")); // Инициализируем массив для 6 цифр OTP
const otpSent = ref(false);
const loggedIn = ref(false);
const inputRefs = ref([]);

onMounted(() => {
  inputRefs.value = inputRefs.value.slice(0, 6); // Обрезаем массив до 6 элементов, если он был изменен
});

const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
  if (error) console.log(error);
};

const addToRefs = (el) => {
  if (el && !inputRefs.value.includes(el)) {
    inputRefs.value.push(el);
  }
};

const signInWithPhone = async () => {
  console.log(phone.value);
  const { error } = await supabase.auth.signInWithOtp({ phone: phone.value });
  if (error) {
    console.error("Error sending OTP:", error);
  } else {
    otpSent.value = true; // Показать поле для ввода OTP
  }
};

const verifyOtp = async () => {
  console.log({
    phone: phone.value,
    token: otpCode.value.join(""),
  });
  // const otpString = otpCode.value.join(""); // Преобразование массива в строку

  const { error } = await supabase.auth.verifyOtp({
    phone: phone.value,
    token: otpCode.value.join(""),
    type: "sms",
  });
  if (error) {
    console.error("Error verifying OTP:", error);
  } else {
    loggedIn.value = true; // Пользователь аутентифицирован
    otpSent.value = false; // Скрыть поле для ввода OTP
  }
};

const focusNext = (index, event) => {
  let value = event.target.value;
  value = value.replace(/\D/g, ""); // Удаляем все нецифровые символы
  if (value.length > 1) {
    value = value[0]; // Оставляем только первую цифру
  }
  otpCode.value[index - 1] = value;

  if (value.length === 1 && index < 6) {
    focusInput(index);
  }
};

const focusPrevious = (index, event) => {
  if (event.key === "Backspace" && otpCode.value[index - 1] === "") {
    if (index > 1) {
      focusInput(index, false);
    }
  }
};

const focusInput = (index, forward = true) => {
  nextTick(() => {
    const targetIndex = forward ? index : index - 2;
    const targetInput = inputRefs.value[targetIndex];
    if (targetInput) targetInput.focus();
  });
};

// Метод для обработки вставки кода
const handlePaste = (event) => {
  const paste = (event.clipboardData || window.clipboardData).getData("text");
  if (paste.length === 6 && /^\d+$/.test(paste)) {
    const digits = paste.split("");
    otpCode.value = digits;
    // Устанавливаем фокус на последний input после вставки
    nextTick(() => {
      const lastInput = inputRefs.value[5];
      if (lastInput) {
        lastInput.focus();
      }
    });
  }
};
//
const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error);
  } else {
    loggedIn.value = false;
  }
};
</script>

<style>
.form-container {
  width: 100%; /* или конкретное значение в px */
  max-width: 400px; /* пример максимальной ширины */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form-container input,
.form-container button {
  width: 90%; /* Процентное значение для внутренних элементов */
  margin: 10px 0; /* Отступы для выравнивания */
}
</style>
