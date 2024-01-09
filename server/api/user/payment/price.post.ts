import stripe from "./stripe";
import { defineEventHandler, sendError } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body) {
    return { error: "body are required" };
  }
  try {
    const price = await stripe.prices.create({
      currency: "usd",
      unit_amount: body.amount,
      product_data: {
        name: body.serviceName,
      },
    });

    return price;
  } catch (error) {
    // @ts-ignore
    sendError(event, error);
  }
});
