<template>
  <SearchBody />
  <div>Its index page</div>
  <button
    @click="logout"
    class="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold text-lg block text-center"
  >
    Sign out
  </button>
  <button
    @click="sendNotification"
    class="w-full bg-blue-200 text-white p-3 rounded-lg font-semibold text-lg block text-center"
  >
    send notification
  </button>
</template>

<script setup lang="ts">
import { urlB64ToUint8Array } from "~/composables/urlB64ToUint8Array";

const client = useSupabaseClient();
const user = useSupabaseUser();
const businessStore = useBusinessStore();
const { data } = await useFetch("/api/business");
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;

onMounted(async () => {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    const serviceWorkerRegistration = await navigator.serviceWorker.register(
      "./sw.js"
    );
    console.info("Service worker was registered.", serviceWorkerRegistration);

    const result = await Notification.requestPermission();
    if (result === "denied") {
      console.error("The user explicitly denied the permission request.");
      return;
    }
    if (result === "granted") {
      console.info("The user accepted the permission request.");
    }
    console.log("tyt0");
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) {
      console.error("Service Worker registration not found.");
      return;
    }
    console.log("tyt1");
    const subscribed = await registration.pushManager.getSubscription();
    if (subscribed) {
      console.info("User is already subscribed.");
    }
    console.log("tyt2");

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: VAPID_PUBLIC_KEY,
    });

    console.log("tyt3");
    console.log("Subscription:", subscription);
    if (user.value) console.log("user_id,:", user.value.id);

    // Обновление состояния кнопок
  } else {
    console.error("Browser does not support service workers or push messages.");
  }
});

watchEffect(() => {
  if (user.value) {
    if (data.value) {
      businessStore.setBusiness(data.value);
    }
  }
});

const logout = async () => {
  await client.auth.signOut();
  navigateTo("/login");
};

const sendNotification = async () => {
  // await client.auth.signOut();
  // navigateTo("/login");
};
</script>
