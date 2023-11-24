import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const salonId = event.context.params?.salonId;

  if (!salonId) {
    return { error: "Salon ID and Category ID are required" };
  }
  const { data } = await client
    .from("specialist_services")
    .select("specialist_id,service_id")
    .eq("business_id", salonId);
  // console.log(data);
  return { data };
});
