<script setup lang="ts">
const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");
const signInWithOtp = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/confirm",
    },
  });
  if (error) console.log(error);
};
</script>
<template>
  <div>
    <button @click="signInWithOtp">Sign In with E-Mail</button>
  </div>
</template>
