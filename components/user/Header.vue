<template>
  <header class="flex justify-between items-center p-4">
    <!-- Левая часть: Название -->
    <h1 class="text-xl font-bold">AVTALE</h1>

    <!-- Правая часть: Кнопки -->
    <div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Home
      </button>
      <button
        @click="toggleLoginPopup"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Log in
      </button>
      <button
        @click="logOut"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Log out
      </button>
    </div>
    <LoginPopup
      :isOpen="isLoginPopupOpen"
      @update:isOpen="isLoginPopupOpen = $event"
    />
  </header>
</template>

<script setup>
import { ref } from "vue";
import LoginPopup from "~/components/LoginPopup.vue";
const supabase = useSupabaseClient();

const isLoginPopupOpen = ref(false);

const toggleLoginPopup = () => {
  isLoginPopupOpen.value = !isLoginPopupOpen.value;
};

const logOut = async () => {
  const { error } = await supabase.auth.signOut();
};
</script>
