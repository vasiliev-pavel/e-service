import stripe from "./stripe";
import { defineEventHandler, sendError } from "h3";

export default defineEventHandler(async (event) => {
  const sessionId = event.context.params?.sessionId;
  if (!sessionId) {
    // Обработка ситуации, когда salonId не предоставлен
    return { error: "sessionId ID is required" };
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return {
      session: session,
      status: session.payment_status,
      customer_email: session.customer_details.email,
    };
  } catch (error) {
    // @ts-ignore
    sendError(event, error);
  }
});
