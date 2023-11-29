// import webpush from "web-push";
import webpush from "web-push";

const vapidDetails = {
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
  subject: process.env.VAPID_SUBJECT,
};

webpush.setVapidDetails(
  vapidDetails.subject,
  vapidDetails.publicKey,
  vapidDetails.privateKey
);

export default defineEventHandler(async (event) => {
  try {
    const subscription = await readBody(event);
    // const user_id = await readBody(event); // Получение ID пользователя из тела запроса
    // const subscription = await $fetch(`/api/notification/getSubscriptions/`, {
    //   method: "post",
    //   body: user_id,
    // });

    // Создание содержимого уведомления
    const notification = JSON.stringify({
      title: "Hello, Notifications123!",
      options: {
        body: `ID: ${Math.floor(Math.random() * 100)}`,
      },
    });

    const options = {
      TTL: 10000,
      vapidDetails: vapidDetails,
    };

    // Отправка уведомления
    await webpush.sendNotification(subscription, notification, options);

    console.log("success");
    return { success: true };
  } catch (error) {
    console.log("error");
    return { success: false, error: error };
  }
});
