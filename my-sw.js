// Service Worker
import { clientsClaim } from "workbox-core";
import {
  precacheAndRoute,
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
} from "workbox-precaching";
import { registerRoute, NavigationRoute } from "workbox-routing";

self.skipWaiting();
clientsClaim();
// precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

//You can remove this code if you aren't precaching anything, or leave it in and live with the warning message
// try {
//   const handler = createHandlerBoundToURL("/");
//   const route = new NavigationRoute(handler);
//   registerRoute(route);
// } catch (error) {
//   console.warn("Error while registering cache route", { error });
// }
self.addEventListener("push", (event) => {
  let data = {};
  // Проверка наличия данных в push-событии
  if (event.data) {
    data = event.data.json();
  }

  const title = data.title || "Новое уведомление";
  const options = {
    body: data.options?.body || "У вас новое уведомление",
    // icon: "https://your-icon-url.png",
    // badge: "https://your-badge-url.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  // Обрабатывает клик по уведомлению
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === "/" && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow("/");
      }
    })
  );
});
