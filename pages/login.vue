<script setup lang="ts">
const supabase = useSupabaseClient();

const signInWithOtp = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    // не удалять может пригодится в будушем
    options: {
      redirectTo: `${window.location.origin}/confirm`,

      // redirectTo: "https://e-service-six.vercel.app/confirm",
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
