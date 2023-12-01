<template>
  <div class="text-white font-semibold text-lg block text-center">
    Device Info {{ deviceInfo.os }} {{ deviceInfo.browser }}
  </div>
  <SearchBody />

  <button
    @click="logout"
    class="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold text-lg block text-center"
  >
    Sign out
  </button>
  <button
    @click="requestNotificationPermission"
    class="w-full bg-green-500 text-white p-3 rounded-lg font-semibold text-lg block text-center"
  >
    Enable Notifications
  </button>
  <button
    @click="sendUserNotification"
    class="w-full bg-blue-200 text-white p-3 rounded-lg font-semibold text-lg block text-center"
  >
    send notification
  </button>
</template>

<script setup lang="ts">
import { urlB64ToUint8Array } from "~/composables/urlB64ToUint8Array";
// import { detectDeviceInfo } from "~/composables/detectDeviceInfo";

const client = useSupabaseClient();
const user = useSupabaseUser();
const businessStore = useBusinessStore();
const { data } = await useFetch("/api/business");
const VAPID_PUBLIC_KEY =
  "BO7QziEK_cUB-ZBrx5aSfcwidid6FOQckMWdnbTA6XFAnZzl-KGF3IBI1hviD7qmX1Hw-822wDAZ_Cm35x5ZylY";
const notificationPermission = ref("default"); // Инициализируем с 'default' или другим подходящим значением
const deviceInfo = ref({});
onMounted(() => {
  deviceInfo.value = detectDeviceInfo();
});
watchEffect(async () => {
  if (user.value) {
    if (data.value) {
      businessStore.setBusiness(data.value);
    }
  }
  if (notificationPermission.value === "granted") {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      try {
        const serviceWorkerRegistration =
          await navigator.serviceWorker.register("./sw.js");
        console.info(
          "Service worker was registered.",
          serviceWorkerRegistration
        );

        const registration = await navigator.serviceWorker.getRegistration();
        if (!registration) {
          console.error("Service Worker registration not found.");
          return;
        }

        const subscribed = await registration.pushManager.getSubscription();
        if (subscribed) {
          console.info("User is already subscribed.");
        } else {
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array(VAPID_PUBLIC_KEY),
          });

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
                  endpoint: subscription,
                  device: deviceInfo.os,
                  os: deviceInfo.browser,
                },
              ],
            });
          }
        }
      } catch (error) {
        console.error("Error during service worker registration:", error);
      }
    } else {
      console.error(
        "Browser does not support service workers or push messages."
      );
    }
  }
});

const logout = async () => {
  await client.auth.signOut();
  navigateTo("/login");
};

const sendUserNotification = async () => {
  if (!user.value) return;

  try {
    const { data: subscriptionData } = await useFetch(
      `/api/notification/getSubscriptions/query?userId=${user.value.id}&browser=${deviceInfo.value.browser}&os=${deviceInfo.value.os}`
    );

    if (!subscriptionData.value) {
      throw new Error("No subscription data available");
    }

    const subscriptionDetails = JSON.parse(
      subscriptionData.value.data[0].endpoint
    );

    const notificationPayload = {
      endpoint: subscriptionDetails.endpoint,
      keys: {
        p256dh: subscriptionDetails.keys.p256dh,
        auth: subscriptionDetails.keys.auth,
      },
    };

    const serviceWorkerRegistration =
      await navigator.serviceWorker.getRegistration();
    if (!serviceWorkerRegistration)
      throw new Error("Service Worker registration not found");

    const activeSubscription =
      await serviceWorkerRegistration.pushManager.getSubscription();

    if (!activeSubscription) throw new Error("No active subscription found");

    console.log(activeSubscription);
    await $fetch("/api/notification/sendNotification", {
      method: "POST",
      body: notificationPayload,
    });
  } catch (error) {
    console.error("Notification Error:", error);
  }
};

const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.error("This browser does not support desktop notification");
    return;
  }

  try {
    const result = await Notification.requestPermission();
    notificationPermission.value = result;
  } catch (error) {
    console.error("Error requesting notification permission:", error);
  }
};
</script>
