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
import webpush from "web-push";

const client = useSupabaseClient();
const user = useSupabaseUser();
const businessStore = useBusinessStore();
const { data } = await useFetch("/api/business");
const VAPID_PUBLIC_KEY =
  "BO7QziEK_cUB-ZBrx5aSfcwidid6FOQckMWdnbTA6XFAnZzl-KGF3IBI1hviD7qmX1Hw-822wDAZ_Cm35x5ZylY";

const notification = JSON.stringify({
  title: "Hello, Notifications123!",
  options: {
    body: `ID: ${Math.floor(Math.random() * 100)}`,
  },
});

let vapidDetails = {
  publicKey: "",
  privateKey: "",
  subject: "",
};

const options = {
  TTL: 10000,
  vapidDetails: vapidDetails,
};

onMounted(async () => {
  if (process.client) {
    vapidDetails.publicKey = process.env.VAPID_PUBLIC_KEY!;
    vapidDetails.privateKey = process.env.VAPID_PRIVATE_KEY!;
    vapidDetails.subject = process.env.VAPID_SUBJECT!;
    webpush.setVapidDetails(
      vapidDetails.subject,
      vapidDetails.publicKey,
      vapidDetails.privateKey
    );
  }

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
      applicationServerKey: urlB64ToUint8Array(VAPID_PUBLIC_KEY),
    });

    console.log("tyt3");
    console.log("Subscription:", subscription);

    if (user.value) {
      await $fetch("/api/notification/addSubscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: [
          {
            user_id: user.value.id,
            endpoint: subscription.endpoint,
          },
        ],
      });
    }
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
  function arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  const registration = await navigator.serviceWorker.getRegistration();

  console.log("Registration:", registration);
  if (registration) {
    const subscription = await registration.pushManager.getSubscription();

    console.log("Subscription:", subscription);
    if (subscription) {
      const p256dhKey = subscription.getKey("p256dh");
      const authKey = subscription.getKey("auth");
      const transformedSubscription = {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: p256dhKey ? arrayBufferToBase64(p256dhKey) : "",
          auth: authKey ? arrayBufferToBase64(authKey) : "",
        },
      };
      await webpush.sendNotification(
        transformedSubscription,
        notification,
        options
      );

      // await $fetch("/api/notification/sendNotification", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ endpoint: subscription.endpoint }),
      // });
    }
  }
};
</script>
