<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
    @click="$emit('update:isOpen', false)"
  >
    <div
      class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
      @click.stop
    >
      <!-- Контент всплывающего окна -->
      <div class="text-center">
        <h3 class="text-lg font-bold">Log in</h3>
        <button
          @click="signInWithGoogle"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded block w-full my-3"
        >
          Log in with Google
        </button>
        <input
          type="text"
          placeholder="Phone Number"
          class="border rounded p-2 w-full"
        />
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block w-full my-3"
        >
          Log in
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import GoogleIcon from "@/components/icons/GoogleIcon.vue";

const supabase = useSupabaseClient();

const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/confirm`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
  if (error) console.log(error);
};

const props = defineProps({
  isOpen: Boolean,
});
</script>
