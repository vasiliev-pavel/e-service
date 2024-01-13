<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
    @click="$emit('update:isOpen', false)"
  >
    <div
      class="fixed inset-x-0 bottom-0 p-5 border shadow-lg bg-white rounded-t-md md:relative md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-auto md:max-w-md md:rounded-md"
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
          @click="signOut"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block w-full my-3"
        >
          Log out
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
      redirectTo: `${window.location.origin}/`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
  if (error) console.log(error);
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.log(error);
};
const props = defineProps({
  isOpen: Boolean,
});
</script>
