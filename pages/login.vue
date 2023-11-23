<script setup lang="ts">
import GoogleIcon from "@/components/icons/GoogleIcon.vue";
import FacebookIcon from "@/components/icons/FacebookIcon.vue";
import AppleIcon from "@/components/icons/AppleIcon.vue";

const supabase = useSupabaseClient();

const signInWithOtp = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/confirm`,
    },
  });
  if (error) console.log(error);
};
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Salon image with gradient -->
    <div class="relative w-full h-screen lg:max-w-5xl lg:mx-auto">
      <!-- Фоновое изображение с классами Tailwind для обложки и центрирования -->
      <div
        class="absolute inset-0 w-full bg-salon-image bg-center bg-cover h-[640px] lg:h-screen"
      >
        <!-- <video playsinline autoplay loop muted disablepictureinpicture>
          <source
            src="~/assets/video/waiter.mp4"
            type="video/mp4"
            controls
            muted
          />
          Your browser does not support the video tag.
        </video> -->
      </div>

      <!-- Черный градиент поверх изображения -->
      <div
        class="absolute inset-0"
        :style="{
          background:
            'linear-gradient(to top, rgba(0,0,0,1) 25%, rgba(0,0,0,0.7) 35%, transparent 100%)',
        }"
      ></div>

      <!-- Контент, который начинается после изображения с градиентом -->
      <div class="absolute bottom-0 w-full p-4 md:p-8 rounded-t-3xl shadow-lg">
        <h1
          class="text-4xl md:text-3xl text-center text-white font-sora font-semibold"
        >
          Just make<br />
          an appointment<br />
          with e-service
        </h1>
        <p class="text-gray-400 my-4 text-center font-sora">
          Choice, booking, service — all in your rhythm,<br />
          with no excess noise.
        </p>
        <hr class="my-3 border-gray-300 w-5/6 mx-auto" />
        <div
          class="text-center mb-4 font-semibold text-base font-sora text-white"
        >
          Connect with
        </div>
        <!-- Social icons -->
        <div class="flex justify-center space-x-7 mb-3">
          <button
            class="w-14 h-14 rounded-[12px] bg-white flex items-center justify-center"
            @click="signInWithOtp"
          >
            <GoogleIcon />
          </button>
          <button
            class="w-14 h-14 rounded-[12px] bg-white flex items-center justify-center"
          >
            <FacebookIcon />
          </button>

          <button
            class="w-14 h-14 bg-white rounded-[12px] flex items-center justify-center"
          >
            <AppleIcon />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-salon-image {
  max-height: 100vh;
  overflow: hidden;
  /* background-image:  "url('~/assets/img/salon.jpg')"; */
  background-color: black !important;
}

.bg-salon-image video {
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media (max-width: 768px) {
  .bg-salon-image video {
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
