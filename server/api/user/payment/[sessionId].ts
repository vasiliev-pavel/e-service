import stripe from "./stripe";
import { sendError } from "h3";

export default defineEventHandler(async (event) => {
  const sessionId = event.context.params?.sessionId;
  if (!sessionId) {
    // Обработка ситуации, когда salonId не предоставлен
    return { error: "sessionId ID is required" };
  }
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  } catch (error) {
    setResponseStatus(event, 500);
    // @ts-ignore
    sendError(event, error);
  }
});
