<script setup lang="ts">
const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");
const signInWithOtp = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    // не удалять может пригодится в будушем
    // options: {
    // redirectTo: `${process.env.BASE_URL}/confirm`,

    //   redirectTo: "https://e-service-six.vercel.app/confirm",
    // },
  });
  if (error) console.log(error);
};
</script>
<template>
  <div>
    <button @click="signInWithOtp">Sign In with E-Mail</button>
  </div>
</template>
