import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const salonId = event.context.params?.salonId;

  if (!salonId) {
    return { error: "Salon ID and Category ID are required" };
  }
  const { data } = await client
    .from("services")
    .select("id,name,category_id,duration,price")
    .eq("business_id", salonId);
  return { data };
});
